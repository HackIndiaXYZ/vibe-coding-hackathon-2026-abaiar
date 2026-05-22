import os
import io
import base64
import time
import logging
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageFilter, ImageOps
import torch
import torch.nn.functional as F
from model import MNISTNet

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'mnist_model.pth')

device = None
model = None
model_info = {}


def load_model():
    global device, model, model_info

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    logger.info(f"推理设备: {device}")

    if torch.cuda.is_available():
        logger.info(f"GPU: {torch.cuda.get_device_name(0)}")
        gpu_props = torch.cuda.get_device_properties(0)
        logger.info(f"GPU显存: {gpu_props.total_memory / 1024**3:.1f} GB")

    model = MNISTNet().to(device)

    if os.path.exists(MODEL_PATH):
        checkpoint = torch.load(MODEL_PATH, map_location=device, weights_only=True)
        model.load_state_dict(checkpoint['model_state_dict'])
        model_info = {
            'accuracy': checkpoint.get('accuracy', 'unknown'),
            'epoch': checkpoint.get('epoch', 'unknown')
        }
        logger.info(f"模型加载成功 - 准确率: {model_info.get('accuracy')}%, Epoch: {model_info.get('epoch')}")
    else:
        logger.warning("未找到预训练模型，请先运行 train.py 训练模型")
        logger.info("正在自动训练模型...")
        from train import train_model
        acc = train_model(epochs=5)
        checkpoint = torch.load(MODEL_PATH, map_location=device, weights_only=True)
        model.load_state_dict(checkpoint['model_state_dict'])
        model_info = {
            'accuracy': checkpoint.get('accuracy', acc),
            'epoch': checkpoint.get('epoch', 5)
        }

    model.eval()

    if torch.cuda.is_available():
        torch.cuda.empty_cache()
        logger.info("GPU缓存已清理")


def preprocess_image(image_data):
    try:
        if ',' in image_data:
            image_data = image_data.split(',')[1]

        img_bytes = base64.b64decode(image_data)
        img = Image.open(io.BytesIO(img_bytes))

        if img.mode == 'RGBA':
            background = Image.new('RGB', img.size, (0, 0, 0))
            background.paste(img, mask=img.split()[3])
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        img = ImageOps.grayscale(img)

        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)

        max_dim = max(img.size)
        if max_dim > 0:
            ratio = 20.0 / max_dim
            new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
            img = img.resize(new_size, Image.LANCZOS)

        new_img = Image.new('L', (28, 28), 0)
        offset = ((28 - img.size[0]) // 2, (28 - img.size[1]) // 2)
        new_img.paste(img, offset)
        img = new_img

        img_array = np.array(img, dtype=np.float32) / 255.0
        logger.info(f"预处理图像统计 - 原始像素: min={img_array.min():.3f}, max={img_array.max():.3f}, mean={img_array.mean():.3f}, nonzero={np.count_nonzero(img_array)}/{img_array.size}")
        img_array = (img_array - 0.1307) / 0.3081
        logger.info(f"预处理图像统计 - 归一化后: min={img_array.min():.3f}, max={img_array.max():.3f}, mean={img_array.mean():.3f}")

        tensor = torch.from_numpy(img_array).unsqueeze(0).unsqueeze(0)

        return tensor
    except Exception as e:
        logger.error(f"图像预处理失败: {e}")
        raise


def image_to_base64(img, max_size=200, min_size=None):
    if min_size and min(img.size) < min_size:
        ratio = min_size / min(img.size)
        new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
        img = img.resize(new_size, Image.NEAREST)
    elif max_size and max(img.size) > max_size:
        ratio = max_size / max(img.size)
        new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
        img = img.resize(new_size, Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    return base64.b64encode(buf.getvalue()).decode('utf-8')


def apply_green_colormap(arr_2d):
    normalized = (arr_2d - arr_2d.min()) / (arr_2d.max() - arr_2d.min() + 1e-8)
    r = np.clip(normalized * 180 + (1 - normalized) * 12, 0, 255).astype(np.uint8)
    g = np.clip(normalized * 249 + (1 - normalized) * 12, 0, 255).astype(np.uint8)
    b = np.clip(normalized * 160 + (1 - normalized) * 30, 0, 255).astype(np.uint8)
    return np.stack([r, g, b], axis=-1)


def create_feature_grid(feature_tensor, num_channels=6, channel_size=56):
    arr = feature_tensor[0].cpu().numpy()
    channel_means = np.abs(arr).mean(axis=(1, 2))
    top_indices = channel_means.argsort()[-num_channels:][::-1]

    cols = 3
    rows = 2
    gap = 4
    grid_w = cols * channel_size + (cols - 1) * gap
    grid_h = rows * channel_size + (rows - 1) * gap
    grid = np.full((grid_h, grid_w, 3), [12, 12, 30], dtype=np.uint8)

    for i, idx in enumerate(top_indices):
        ch = arr[idx]
        rgb = apply_green_colormap(ch)
        ch_img = Image.fromarray(rgb, mode='RGB')
        ch_img = ch_img.resize((channel_size, channel_size), Image.NEAREST)
        ch_arr = np.array(ch_img)

        r_idx, c_idx = i // cols, i % cols
        y1 = r_idx * (channel_size + gap)
        x1 = c_idx * (channel_size + gap)
        grid[y1:y1 + channel_size, x1:x1 + channel_size] = ch_arr

    grid_img = Image.fromarray(grid, mode='RGB')
    buf = io.BytesIO()
    grid_img.save(buf, format='PNG')
    return base64.b64encode(buf.getvalue()).decode('utf-8')


def preprocess_image_with_steps(image_data):
    steps = []

    if ',' in image_data:
        image_data_clean = image_data.split(',')[1]
    else:
        image_data_clean = image_data

    img_bytes = base64.b64decode(image_data_clean)
    img = Image.open(io.BytesIO(img_bytes))

    original_b64 = image_to_base64(img.convert('RGB'), max_size=200)
    steps.append({
        'id': 'input',
        'name': '图像采集',
        'phase': 'preprocessing',
        'description': '用户在画板上手写数字，系统将画板内容捕获为数字图像',
        'principle': '手写板使用Canvas技术记录笔迹轨迹，黑色背景上白色笔画，模拟纸笔书写效果。画板尺寸为280×280像素，支持鼠标和触摸输入。',
        'image': original_b64,
        'shape_info': f'{img.size[0]}×{img.size[1]}'
    })

    if img.mode == 'RGBA':
        background = Image.new('RGB', img.size, (0, 0, 0))
        background.paste(img, mask=img.split()[3])
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    img = ImageOps.grayscale(img)
    grayscale_b64 = image_to_base64(img.convert('RGB'), max_size=200)
    steps.append({
        'id': 'grayscale',
        'name': '灰度转换',
        'phase': 'preprocessing',
        'description': '将彩色图像转换为灰度图像，去除颜色信息',
        'principle': '手写数字识别不需要颜色信息。灰度转换将RGB三通道合并为单通道，减少数据量的同时保留笔迹的形状和明暗特征，让模型更专注于关键信息。',
        'image': grayscale_b64,
        'shape_info': f'{img.size[0]}×{img.size[1]} (灰度)'
    })

    bbox = img.getbbox()
    if bbox:
        img_cropped = img.crop(bbox)
    else:
        img_cropped = img.copy()
    crop_b64 = image_to_base64(img_cropped.convert('RGB'), max_size=200)
    steps.append({
        'id': 'crop',
        'name': '裁剪空白',
        'phase': 'preprocessing',
        'description': '自动检测并裁剪数字周围的空白区域，只保留有效笔迹部分',
        'principle': '裁剪空白让数字占据更大的图像比例，去除无关背景区域，减少噪声干扰，让模型更专注于数字本身的特征。',
        'image': crop_b64,
        'shape_info': f'{img_cropped.size[0]}×{img_cropped.size[1]}'
    })

    max_dim = max(img_cropped.size)
    if max_dim > 0:
        ratio = 20.0 / max_dim
        new_size = (int(img_cropped.size[0] * ratio), int(img_cropped.size[1] * ratio))
        img_resized = img_cropped.resize(new_size, Image.LANCZOS)
    else:
        img_resized = img_cropped.copy()
    resize_b64 = image_to_base64(img_resized.convert('RGB'), max_size=200, min_size=100)
    steps.append({
        'id': 'resize',
        'name': '等比缩放',
        'phase': 'preprocessing',
        'description': '将图像等比缩放，使最长边为20像素，保持数字不变形',
        'principle': 'MNIST数据集中数字被放置在20×20的区域内，四周留出边距。将手写图像缩放到相同尺寸，确保与训练数据分布一致，提高识别准确率。使用LANCZOS算法保证缩放质量。',
        'image': resize_b64,
        'shape_info': f'{img_resized.size[0]}×{img_resized.size[1]}'
    })

    new_img = Image.new('L', (28, 28), 0)
    offset = ((28 - img_resized.size[0]) // 2, (28 - img_resized.size[1]) // 2)
    new_img.paste(img_resized, offset)
    img = new_img
    center_b64 = image_to_base64(img.convert('RGB'), max_size=200, min_size=140)
    steps.append({
        'id': 'center',
        'name': '居中放置',
        'phase': 'preprocessing',
        'description': '将缩放后的数字居中放置在28×28的黑色画布上',
        'principle': '居中放置确保数字位于图像中央，与MNIST数据集格式完全一致。28×28是MNIST标准尺寸，四周留出约4像素边距，让数字与训练样本分布对齐。',
        'image': center_b64,
        'shape_info': '28×28'
    })

    img_array = np.array(img, dtype=np.float32) / 255.0
    before_stats = {
        'min': round(float(img_array.min()), 3),
        'max': round(float(img_array.max()), 3),
        'mean': round(float(img_array.mean()), 3)
    }
    img_array = (img_array - 0.1307) / 0.3081
    after_stats = {
        'min': round(float(img_array.min()), 3),
        'max': round(float(img_array.max()), 3),
        'mean': round(float(img_array.mean()), 3)
    }

    norm_vis = ((img_array - img_array.min()) / (img_array.max() - img_array.min() + 1e-8) * 255).astype(np.uint8)
    norm_img = Image.fromarray(norm_vis, mode='L')
    norm_b64 = image_to_base64(norm_img.convert('RGB'), max_size=200, min_size=140)

    steps.append({
        'id': 'normalize',
        'name': '像素归一化',
        'phase': 'preprocessing',
        'description': '将像素值从[0, 255]范围归一化到标准化范围，使数据分布与训练时一致',
        'principle': '归一化分两步：①将像素值除以255，映射到[0, 1]范围；②使用MNIST数据集的均值(0.1307)和标准差(0.3081)进行Z-score标准化。标准化使数据以0为中心分布，有助于模型更快收敛、更准确识别。',
        'image': norm_b64,
        'shape_info': '1×1×28×28',
        'stats': {'before': before_stats, 'after': after_stats}
    })

    tensor = torch.from_numpy(img_array).unsqueeze(0).unsqueeze(0)
    return tensor, steps


@app.route('/api/digit/recognize', methods=['POST'])
def recognize():
    global model, device

    if model is None:
        return jsonify({'error': '模型未加载'}), 503

    try:
        data = request.get_json()
        image_data = data.get('image', '')

        if not image_data:
            return jsonify({'error': '未提供图像数据'}), 400

        start_time = time.time()
        input_tensor = preprocess_image(image_data)
        input_tensor = input_tensor.to(device, non_blocking=True)

        with torch.no_grad():
            if torch.cuda.is_available():
                torch.cuda.synchronize()
            inference_start = time.time()
            output, features = model.forward_with_features(input_tensor)
            if torch.cuda.is_available():
                torch.cuda.synchronize()
            inference_time = (time.time() - inference_start) * 1000

            probabilities = F.softmax(output, dim=1)
            probs = probabilities.cpu().numpy()[0].tolist()
            predicted = int(probabilities.argmax(dim=1).item())
            confidence = float(probabilities[0][predicted].item() * 100)

        total_time = (time.time() - start_time) * 1000

        gpu_info = {}
        if torch.cuda.is_available():
            gpu_info = {
                'device': torch.cuda.get_device_name(0),
                'memory_allocated_mb': round(torch.cuda.memory_allocated(0) / 1024**2, 2),
                'memory_reserved_mb': round(torch.cuda.memory_reserved(0) / 1024**2, 2),
            }

        response = {
            'digit': predicted,
            'confidence': round(confidence, 2),
            'probabilities': [round(p * 100, 2) for p in probs],
            'inference_time_ms': round(inference_time, 2),
            'total_time_ms': round(total_time, 2),
            'device': str(device),
            'gpu_info': gpu_info,
            'model_info': model_info
        }

        logger.info(f"识别结果: {predicted} (置信度: {confidence:.1f}%, 推理耗时: {inference_time:.1f}ms, 设备: {device})")

        return jsonify(response)

    except Exception as e:
        logger.error(f"识别失败: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/digit/explain', methods=['POST'])
def explain():
    global model, device

    if model is None:
        return jsonify({'error': '模型未加载'}), 503

    try:
        data = request.get_json()
        image_data = data.get('image', '')

        if not image_data:
            return jsonify({'error': '未提供图像数据'}), 400

        input_tensor, steps = preprocess_image_with_steps(image_data)
        input_tensor = input_tensor.to(device, non_blocking=True)

        with torch.no_grad():
            output, features = model.forward_with_features(input_tensor)
            probabilities = F.softmax(output, dim=1)
            probs = probabilities.cpu().numpy()[0].tolist()
            predicted = int(probabilities.argmax(dim=1).item())
            confidence = float(probabilities[0][predicted].item() * 100)

        conv_configs = [
            {
                'id': 'conv1',
                'name': '卷积层1 · 低级特征提取',
                'phase': 'feature_extraction',
                'description': '第一层卷积提取图像的低级特征，如边缘、线条和简单纹理模式',
                'principle': '32个3×3的卷积核在图像上滑动，每个卷积核检测一种特定的视觉模式（如横线、竖线、对角线等）。BatchNorm稳定训练过程，ReLU激活函数引入非线性，MaxPool2×2将特征图尺寸减半并保留最显著的特征。',
                'feature_key': 'conv1',
                'output_shape': '32×14×14'
            },
            {
                'id': 'conv2',
                'name': '卷积层2 · 中级特征提取',
                'phase': 'feature_extraction',
                'description': '第二层卷积在低级特征基础上提取更复杂的中级特征，如角点、交叉和简单形状',
                'principle': '64个卷积核组合第一层的低级特征，形成更复杂的模式识别能力。例如，将横线和竖线的特征组合，可以检测出直角或交叉点。池化后特征图尺寸降为7×7。',
                'feature_key': 'conv2',
                'output_shape': '64×7×7'
            },
            {
                'id': 'conv3',
                'name': '卷积层3 · 高级特征提取',
                'phase': 'feature_extraction',
                'description': '第三层卷积提取高级特征，识别数字的局部结构和部件模式',
                'principle': '128个卷积核进一步组合中级特征，形成对数字局部结构的识别能力。例如圆弧、直线段组合、笔画交叉等高级模式。池化后特征图尺寸降为3×3，信息高度浓缩。',
                'feature_key': 'conv3',
                'output_shape': '128×3×3'
            }
        ]

        for config in conv_configs:
            feat = features[config['feature_key']]
            grid_b64 = create_feature_grid(feat, num_channels=6, channel_size=56)
            steps.append({
                'id': config['id'],
                'name': config['name'],
                'phase': config['phase'],
                'description': config['description'],
                'principle': config['principle'],
                'image': grid_b64,
                'shape_info': config['output_shape'],
                'feature_channels': int(feat.shape[1])
            })

        flat = features['flattened']
        steps.append({
            'id': 'flatten',
            'name': '展平向量',
            'phase': 'classification',
            'description': '将三维特征图展平为一维向量，准备输入全连接层',
            'principle': '卷积层输出的128×3×3三维特征图被"展开"为1152个数值组成的一维向量。这一步是连接卷积特征提取和全连接分类的桥梁，保留了所有特征信息但改变了数据组织形式。',
            'shape_info': str(flat.shape[1]),
            'activation_stats': {
                'min': round(float(flat.min()), 3),
                'max': round(float(flat.max()), 3),
                'mean': round(float(flat.mean()), 3),
                'nonzero': int((flat != 0).sum()),
                'total': int(flat.numel())
            }
        })

        fc1 = features['fc1']
        fc1_top = fc1[0].topk(10)
        steps.append({
            'id': 'fc1',
            'name': '全连接层1',
            'phase': 'classification',
            'description': '第一层全连接将1152维特征压缩到256维，学习特征间的全局关系',
            'principle': '全连接层的每个神经元都与上一层所有神经元相连，能够学习特征之间的任意组合关系。从1152维压缩到256维，在保留关键信息的同时去除冗余。Dropout(0.25)随机屏蔽25%的神经元防止过拟合。',
            'shape_info': '256',
            'top_activations': [
                {'index': int(idx), 'value': round(float(val), 3)}
                for idx, val in zip(fc1_top.indices.cpu().numpy(), fc1_top.values.cpu().numpy())
            ]
        })

        fc2 = features['fc2']
        fc2_top = fc2[0].topk(10)
        steps.append({
            'id': 'fc2',
            'name': '全连接层2',
            'phase': 'classification',
            'description': '第二层全连接将256维特征进一步压缩到128维，提炼最关键的分类信息',
            'principle': '继续压缩特征表示，提取对分类最有用的信息。Dropout(0.5)随机屏蔽50%的神经元，强制模型不依赖特定神经元，提高泛化能力。',
            'shape_info': '128',
            'top_activations': [
                {'index': int(idx), 'value': round(float(val), 3)}
                for idx, val in zip(fc2_top.indices.cpu().numpy(), fc2_top.values.cpu().numpy())
            ]
        })

        logits = features['output'][0].cpu().numpy().tolist()
        steps.append({
            'id': 'output',
            'name': '输出层',
            'phase': 'classification',
            'description': '输出10个原始分数（logits），分别对应数字0-9',
            'principle': '每个输出值代表对应数字的"得分"，值越大表示模型认为输入是该数字的可能性越高。这些原始分数可以是任意实数，还需要经过Softmax转换为概率。',
            'shape_info': '10',
            'logits': [round(v, 3) for v in logits]
        })

        steps.append({
            'id': 'softmax',
            'name': 'Softmax概率转换',
            'phase': 'output',
            'description': '将原始分数转换为0-100%的概率分布，便于理解',
            'principle': 'Softmax函数将任意实数转换为概率值：每个分数先取指数（放大差异），再除以所有指数之和（归一化）。转换后所有概率之和为100%，最高概率对应的数字即为预测结果。',
            'probabilities': [round(p * 100, 2) for p in probs]
        })

        steps.append({
            'id': 'result',
            'name': '预测结果',
            'phase': 'output',
            'description': f'识别结果为数字 {predicted}，置信度 {confidence:.1f}%',
            'principle': '选择概率最高的数字作为最终预测结果。置信度表示模型对该预测的确定程度，越高表示模型越确信。置信度受输入图像质量、与训练数据的相似度等因素影响。',
            'digit': predicted,
            'confidence': round(confidence, 2),
            'probabilities': [round(p * 100, 2) for p in probs]
        })

        return jsonify({
            'steps': steps,
            'result': {
                'digit': predicted,
                'confidence': round(confidence, 2),
                'probabilities': [round(p * 100, 2) for p in probs]
            }
        })

    except Exception as e:
        logger.error(f'详解生成失败: {e}')
        return jsonify({'error': str(e)}), 500


@app.route('/api/digit/status', methods=['GET'])
def status():
    gpu_info = {}
    if torch.cuda.is_available():
        gpu_info = {
            'available': True,
            'device_name': torch.cuda.get_device_name(0),
            'cuda_version': torch.version.cuda,
            'memory_total_gb': round(torch.cuda.get_device_properties(0).total_memory / 1024**3, 1),
            'memory_allocated_mb': round(torch.cuda.memory_allocated(0) / 1024**2, 2),
            'memory_reserved_mb': round(torch.cuda.memory_reserved(0) / 1024**2, 2),
        }
    else:
        gpu_info = {'available': False}

    return jsonify({
        'status': 'running',
        'model_loaded': model is not None,
        'device': str(device) if device else 'not initialized',
        'model_info': model_info,
        'gpu_info': gpu_info,
        'pytorch_version': torch.__version__
    })


@app.route('/api/digit/train', methods=['POST'])
def trigger_training():
    try:
        data = request.get_json() or {}
        epochs = data.get('epochs', 5)
        epochs = min(max(1, epochs), 20)

        from train import train_model
        acc = train_model(epochs=epochs)

        load_model()

        return jsonify({
            'message': '训练完成',
            'accuracy': acc,
            'model_info': model_info
        })
    except Exception as e:
        logger.error(f"训练失败: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    load_model()
    app.run(host='0.0.0.0', port=5005, debug=False)

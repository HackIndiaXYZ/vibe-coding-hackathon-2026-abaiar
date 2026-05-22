const knowledgeNodes = [
  {
    id: 'python_basics',
    name: 'Python基础',
    category: 'foundation',
    level: 1,
    importance: 5,
    description: 'Python是AI领域最主流的编程语言，掌握Python基础语法是学习AI的第一步。涵盖变量、数据类型、控制流、函数、面向对象编程等核心概念。',
    subTopics: ['变量与数据类型', '控制流语句', '函数与模块', '面向对象编程', '文件操作', '异常处理'],
    prerequisites: [],
    relatedNodes: ['numpy', 'pandas', 'data_visualization'],
    videos: [
      { platform: 'bilibili', title: 'Python基础入门完整版', url: 'https://www.bilibili.com/video/BV1qW4y1a7fU' },
      { platform: 'bilibili', title: 'Python从零开始学', url: 'https://www.bilibili.com/video/BV1AP41137a7' },
      { platform: 'bilibili', title: 'Python核心编程', url: 'https://www.bilibili.com/video/BV1mW4y1M7vF' }
    ]
  },
  {
    id: 'math_foundation',
    name: '数学基础',
    category: 'foundation',
    level: 1,
    importance: 5,
    description: 'AI算法的数学基础，包括线性代数、微积分、概率论与数理统计。这些数学工具是理解机器学习和深度学习算法的基石。',
    subTopics: ['线性代数', '微积分', '概率论', '数理统计', '优化理论', '信息论基础'],
    prerequisites: [],
    relatedNodes: ['machine_learning_basics', 'deep_learning_basics', 'numpy'],
    videos: [
      { platform: 'bilibili', title: '线性代数完整课程', url: 'https://www.bilibili.com/video/BV1aW4y1G7Qe' },
      { platform: 'bilibili', title: '概率论与数理统计', url: 'https://www.bilibili.com/video/BV1ot411y7mU' },
      { platform: 'bilibili', title: '微积分本质', url: 'https://www.bilibili.com/video/BV1nx41187tZ' }
    ]
  },
  {
    id: 'numpy',
    name: 'NumPy数值计算',
    category: 'tool',
    level: 2,
    importance: 4,
    description: 'NumPy是Python科学计算的基础库，提供高效的多维数组对象和矩阵运算功能，是数据处理和机器学习的基础工具。',
    subTopics: ['ndarray数组', '数组运算', '索引与切片', '广播机制', '线性代数运算', '随机数生成'],
    prerequisites: ['python_basics'],
    relatedNodes: ['pandas', 'math_foundation', 'machine_learning_basics'],
    videos: [
      { platform: 'bilibili', title: 'NumPy入门教程', url: 'https://www.bilibili.com/video/BV1ex4y1V7F7' },
      { platform: 'bilibili', title: 'NumPy数据分析基础', url: 'https://www.bilibili.com/video/BV1Uv4y1s7gR' },
      { platform: 'bilibili', title: 'Python科学计算NumPy', url: 'https://www.bilibili.com/video/BV1cx4y1V7xt' }
    ]
  },
  {
    id: 'pandas',
    name: 'Pandas数据处理',
    category: 'tool',
    level: 2,
    importance: 4,
    description: 'Pandas是Python数据分析的核心库，提供DataFrame和Series数据结构，支持数据清洗、转换、聚合等操作，是数据科学工作流的必备工具。',
    subTopics: ['Series与DataFrame', '数据读取与存储', '数据清洗', '数据转换', '分组聚合', '时间序列'],
    prerequisites: ['python_basics', 'numpy'],
    relatedNodes: ['data_visualization', 'feature_engineering', 'data_mining'],
    videos: [
      { platform: 'bilibili', title: 'Pandas数据分析入门', url: 'https://www.bilibili.com/video/BV1Uv4y1s7gR' },
      { platform: 'bilibili', title: 'Pandas实战教程', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' },
      { platform: 'bilibili', title: '数据分析Pandas篇', url: 'https://www.bilibili.com/video/BV1vV4y1s7Z4' }
    ]
  },
  {
    id: 'data_visualization',
    name: '数据可视化',
    category: 'tool',
    level: 2,
    importance: 3,
    description: '数据可视化是将数据转化为直观图形的过程，使用Matplotlib、Seaborn等工具创建图表，帮助理解数据特征和模型结果。',
    subTopics: ['Matplotlib基础', 'Seaborn统计图', '折线图与散点图', '柱状图与饼图', '热力图', '交互式可视化'],
    prerequisites: ['python_basics', 'numpy'],
    relatedNodes: ['pandas', 'eda', 'feature_engineering'],
    videos: [
      { platform: 'bilibili', title: 'Matplotlib可视化教程', url: 'https://www.bilibili.com/video/BV1ht4y1k7sR' },
      { platform: 'bilibili', title: 'Seaborn数据可视化', url: 'https://www.bilibili.com/video/BV1V54y1B7K3' },
      { platform: 'bilibili', title: 'Python数据可视化实战', url: 'https://www.bilibili.com/video/BV1qA411w7aR' }
    ]
  },
  {
    id: 'eda',
    name: '探索性数据分析',
    category: 'skill',
    level: 3,
    importance: 4,
    description: '探索性数据分析(EDA)是在建模前对数据进行初步探索的过程，通过统计方法和可视化手段发现数据中的模式、异常和关系。',
    subTopics: ['数据概览', '分布分析', '相关性分析', '异常值检测', '缺失值处理', '特征关系探索'],
    prerequisites: ['pandas', 'data_visualization'],
    relatedNodes: ['feature_engineering', 'data_mining', 'statistical_analysis'],
    videos: [
      { platform: 'bilibili', title: 'EDA探索性数据分析', url: 'https://www.bilibili.com/video/BV1vV4y1s7Z4' },
      { platform: 'bilibili', title: '数据分析实战EDA', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' },
      { platform: 'bilibili', title: 'Python EDA完整流程', url: 'https://www.bilibili.com/video/BV1Uv4y1s7gR' }
    ]
  },
  {
    id: 'machine_learning_basics',
    name: '机器学习基础',
    category: 'core',
    level: 3,
    importance: 5,
    description: '机器学习是AI的核心领域，学习监督学习、无监督学习和强化学习的基本概念、算法原理和应用场景，为深入理解AI奠定基础。',
    subTopics: ['监督学习', '无监督学习', '强化学习', '模型评估', '过拟合与欠拟合', '偏差方差权衡'],
    prerequisites: ['python_basics', 'math_foundation', 'numpy'],
    relatedNodes: ['supervised_learning', 'unsupervised_learning', 'deep_learning_basics'],
    videos: [
      { platform: 'bilibili', title: '机器学习吴恩达课程', url: 'https://www.bilibili.com/video/BV164411b7dx' },
      { platform: 'bilibili', title: '机器学习白板推导', url: 'https://www.bilibili.com/video/BV1aE411o7qd' },
      { platform: 'bilibili', title: '李宏毅机器学习', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'supervised_learning',
    name: '监督学习算法',
    category: 'core',
    level: 4,
    importance: 5,
    description: '监督学习是最常用的机器学习范式，包括线性回归、逻辑回归、决策树、随机森林、SVM等经典算法，用于分类和回归任务。',
    subTopics: ['线性回归', '逻辑回归', '决策树', '随机森林', '支持向量机', 'K近邻'],
    prerequisites: ['machine_learning_basics', 'math_foundation'],
    relatedNodes: ['ensemble_methods', 'feature_engineering', 'model_evaluation'],
    videos: [
      { platform: 'bilibili', title: '监督学习算法详解', url: 'https://www.bilibili.com/video/BV164411b7dx' },
      { platform: 'bilibili', title: 'Scikit-learn机器学习', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: '经典ML算法实现', url: 'https://www.bilibili.com/video/BV1aE411o7qd' }
    ]
  },
  {
    id: 'unsupervised_learning',
    name: '无监督学习算法',
    category: 'core',
    level: 4,
    importance: 4,
    description: '无监督学习从无标签数据中发现模式，包括聚类算法(K-Means、DBSCAN)、降维方法(PCA、t-SNE)和关联规则挖掘等。',
    subTopics: ['K-Means聚类', 'DBSCAN', '层次聚类', 'PCA降维', 't-SNE可视化', '关联规则'],
    prerequisites: ['machine_learning_basics'],
    relatedNodes: ['data_mining', 'feature_engineering', 'deep_learning_basics'],
    videos: [
      { platform: 'bilibili', title: '无监督学习算法', url: 'https://www.bilibili.com/video/BV164411b7dx' },
      { platform: 'bilibili', title: '聚类算法详解', url: 'https://www.bilibili.com/video/BV1aE411o7qd' },
      { platform: 'bilibili', title: '降维与特征提取', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'feature_engineering',
    name: '特征工程',
    category: 'skill',
    level: 3,
    importance: 4,
    description: '特征工程是机器学习中最重要的环节之一，通过特征选择、特征构造和特征变换来提升模型性能，直接影响AI系统的效果。',
    subTopics: ['特征选择', '特征构造', '特征缩放', '编码转换', '特征交叉', '自动化特征工程'],
    prerequisites: ['pandas', 'machine_learning_basics'],
    relatedNodes: ['supervised_learning', 'eda', 'model_evaluation'],
    videos: [
      { platform: 'bilibili', title: '特征工程实战', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: '特征工程完全指南', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' },
      { platform: 'bilibili', title: '数据特征处理', url: 'https://www.bilibili.com/video/BV1vV4y1s7Z4' }
    ]
  },
  {
    id: 'model_evaluation',
    name: '模型评估与调优',
    category: 'skill',
    level: 4,
    importance: 4,
    description: '模型评估与调优是机器学习工作流的关键步骤，包括交叉验证、超参数调优、模型选择和性能度量指标的选择与应用。',
    subTopics: ['交叉验证', '超参数调优', '网格搜索', '性能指标', 'ROC与AUC', '模型选择策略'],
    prerequisites: ['supervised_learning', 'machine_learning_basics'],
    relatedNodes: ['ensemble_methods', 'supervised_learning', 'auto_ml'],
    videos: [
      { platform: 'bilibili', title: '模型评估与选择', url: 'https://www.bilibili.com/video/BV164411b7dx' },
      { platform: 'bilibili', title: '超参数调优实战', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: 'ML模型调参指南', url: 'https://www.bilibili.com/video/BV1aE411o7qd' }
    ]
  },
  {
    id: 'ensemble_methods',
    name: '集成学习方法',
    category: 'core',
    level: 5,
    importance: 4,
    description: '集成学习通过组合多个基学习器来提升预测性能，包括Bagging、Boosting和Stacking三大类方法，是竞赛和工业应用中的利器。',
    subTopics: ['Bagging', 'Boosting', 'Stacking', 'XGBoost', 'LightGBM', 'CatBoost'],
    prerequisites: ['supervised_learning', 'model_evaluation'],
    relatedNodes: ['kaggle_competition', 'supervised_learning'],
    videos: [
      { platform: 'bilibili', title: '集成学习详解', url: 'https://www.bilibili.com/video/BV1aE411o7qd' },
      { platform: 'bilibili', title: 'XGBoost实战教程', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: 'LightGBM入门到精通', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' }
    ]
  },
  {
    id: 'deep_learning_basics',
    name: '深度学习基础',
    category: 'core',
    level: 4,
    importance: 5,
    description: '深度学习是机器学习的前沿分支，基于人工神经网络构建多层模型，自动学习数据的层次化表示，在图像、语音、NLP等领域取得突破性成果。',
    subTopics: ['感知机与神经网络', '激活函数', '前向传播', '反向传播', '损失函数', '优化器'],
    prerequisites: ['machine_learning_basics', 'math_foundation', 'numpy'],
    relatedNodes: ['cnn', 'rnn', 'transformer', 'pytorch'],
    videos: [
      { platform: 'bilibili', title: '深度学习吴恩达课程', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: '李宏毅深度学习', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: '3Blue1Brown神经网络', url: 'https://www.bilibili.com/video/BV1bx411M7Zx' }
    ]
  },
  {
    id: 'pytorch',
    name: 'PyTorch框架',
    category: 'tool',
    level: 4,
    importance: 5,
    description: 'PyTorch是目前最流行的深度学习框架之一，以动态计算图和Python风格API著称，广泛应用于学术研究和工业实践。',
    subTopics: ['张量操作', '自动微分', 'nn模块', '数据加载', 'GPU加速', '模型保存与加载'],
    prerequisites: ['python_basics', 'deep_learning_basics', 'numpy'],
    relatedNodes: ['cnn', 'rnn', 'transformer', 'gan'],
    videos: [
      { platform: 'bilibili', title: 'PyTorch官方教程', url: 'https://www.bilibili.com/video/BV1HE411t7RN' },
      { platform: 'bilibili', title: 'PyTorch深度学习实战', url: 'https://www.bilibili.com/video/BV1YK4y1r7Ez' },
      { platform: 'bilibili', title: 'PyTorch入门到精通', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' }
    ]
  },
  {
    id: 'cnn',
    name: '卷积神经网络',
    category: 'core',
    level: 5,
    importance: 5,
    description: '卷积神经网络(CNN)是处理图像数据的核心架构，通过卷积层提取空间特征，在计算机视觉任务中表现卓越，如图像分类、目标检测等。',
    subTopics: ['卷积操作', '池化层', '经典架构(LeNet/AlexNet/VGG)', 'ResNet', '迁移学习', '目标检测基础'],
    prerequisites: ['deep_learning_basics', 'pytorch'],
    relatedNodes: ['computer_vision', 'image_classification', 'object_detection'],
    videos: [
      { platform: 'bilibili', title: 'CNN卷积神经网络详解', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: '计算机视觉与CNN', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'PyTorch CNN实战', url: 'https://www.bilibili.com/video/BV1HE411t7RN' }
    ]
  },
  {
    id: 'rnn',
    name: '循环神经网络',
    category: 'core',
    level: 5,
    importance: 4,
    description: '循环神经网络(RNN)及其变体(LSTM、GRU)是处理序列数据的核心架构，广泛应用于自然语言处理、时间序列预测等领域。',
    subTopics: ['RNN基础', 'LSTM', 'GRU', '双向RNN', '序列到序列模型', '注意力机制雏形'],
    prerequisites: ['deep_learning_basics', 'pytorch'],
    relatedNodes: ['nlp_basics', 'transformer', 'time_series'],
    videos: [
      { platform: 'bilibili', title: 'RNN/LSTM详解', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: '李宏毅RNN课程', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'LSTM原理与实现', url: 'https://www.bilibili.com/video/BV1HE411t7RN' }
    ]
  },
  {
    id: 'transformer',
    name: 'Transformer架构',
    category: 'core',
    level: 6,
    importance: 5,
    description: 'Transformer是基于自注意力机制的革命性架构，彻底改变了NLP领域，并扩展到CV、语音等多模态任务，是大语言模型的基础。',
    subTopics: ['自注意力机制', '多头注意力', '位置编码', '编码器-解码器', 'BERT', 'GPT系列'],
    prerequisites: ['deep_learning_basics', 'rnn', 'pytorch'],
    relatedNodes: ['nlp_basics', 'llm', 'multimodal_ai'],
    videos: [
      { platform: 'bilibili', title: 'Transformer详解', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
      { platform: 'bilibili', title: '李宏毅Transformer', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'Attention Is All You Need', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' }
    ]
  },
  {
    id: 'nlp_basics',
    name: '自然语言处理基础',
    category: 'domain',
    level: 4,
    importance: 4,
    description: '自然语言处理(NLP)是AI的重要分支，研究如何让计算机理解和生成人类语言，涵盖文本预处理、词向量、文本分类等核心技术。',
    subTopics: ['文本预处理', '分词技术', '词向量(Word2Vec/GloVe)', '文本分类', '情感分析', '命名实体识别'],
    prerequisites: ['machine_learning_basics', 'python_basics'],
    relatedNodes: ['rnn', 'transformer', 'llm'],
    videos: [
      { platform: 'bilibili', title: 'NLP自然语言处理', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'NLP入门实战', url: 'https://www.bilibili.com/video/BV1HE411t7RN' },
      { platform: 'bilibili', title: '文本挖掘与NLP', url: 'https://www.bilibili.com/video/BV1tt4y1177u' }
    ]
  },
  {
    id: 'computer_vision',
    name: '计算机视觉',
    category: 'domain',
    level: 5,
    importance: 4,
    description: '计算机视觉让机器"看见"世界，包括图像分类、目标检测、图像分割、人脸识别等任务，是AI应用最广泛的领域之一。',
    subTopics: ['图像分类', '目标检测', '语义分割', '实例分割', '人脸识别', 'OCR文字识别'],
    prerequisites: ['cnn', 'deep_learning_basics'],
    relatedNodes: ['object_detection', 'image_classification', 'gan'],
    videos: [
      { platform: 'bilibili', title: '计算机视觉入门', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: 'CV实战教程', url: 'https://www.bilibili.com/video/BV1HE411t7RN' },
      { platform: 'bilibili', title: '深度学习与计算机视觉', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'llm',
    name: '大语言模型',
    category: 'frontier',
    level: 7,
    importance: 5,
    description: '大语言模型(LLM)是基于Transformer的大规模预训练模型，如GPT、LLaMA等，具备强大的文本生成、推理和知识理解能力，是当前AI最热门的方向。',
    subTopics: ['预训练与微调', 'Prompt Engineering', 'RLHF', 'LoRA与QLoRA', 'RAG检索增强', 'Agent智能体'],
    prerequisites: ['transformer', 'nlp_basics', 'deep_learning_basics'],
    relatedNodes: ['transformer', 'prompt_engineering', 'ai_agent'],
    videos: [
      { platform: 'bilibili', title: '大语言模型原理', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
      { platform: 'bilibili', title: 'LLM微调实战', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'ChatGPT原理剖析', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' }
    ]
  },
  {
    id: 'prompt_engineering',
    name: '提示词工程',
    category: 'skill',
    level: 5,
    importance: 4,
    description: '提示词工程是与大语言模型交互的核心技能，通过设计有效的提示词来引导模型输出高质量结果，是AI时代的新兴关键能力。',
    subTopics: ['基础提示词', '少样本学习', '思维链提示', '角色扮演提示', '结构化输出', '提示词优化策略'],
    prerequisites: ['llm', 'nlp_basics'],
    relatedNodes: ['llm', 'ai_agent', 'ai_application'],
    videos: [
      { platform: 'bilibili', title: 'Prompt Engineering教程', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
      { platform: 'bilibili', title: '提示词工程实战', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'ChatGPT提示词技巧', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' }
    ]
  },
  {
    id: 'ai_agent',
    name: 'AI智能体',
    category: 'frontier',
    level: 7,
    importance: 4,
    description: 'AI智能体是能够自主感知环境、做出决策并执行行动的AI系统，结合LLM与工具调用能力，实现复杂任务的自动化处理。',
    subTopics: ['Agent架构', '工具调用', '规划与推理', '记忆机制', '多Agent协作', 'LangChain框架'],
    prerequisites: ['llm', 'prompt_engineering', 'python_basics'],
    relatedNodes: ['llm', 'prompt_engineering', 'ai_application'],
    videos: [
      { platform: 'bilibili', title: 'AI Agent入门', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
      { platform: 'bilibili', title: 'LangChain实战教程', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: '构建你的AI Agent', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' }
    ]
  },
  {
    id: 'gan',
    name: '生成对抗网络',
    category: 'core',
    level: 6,
    importance: 3,
    description: '生成对抗网络(GAN)由生成器和判别器组成，通过对抗训练生成逼真数据，在图像生成、风格迁移、数据增强等方面应用广泛。',
    subTopics: ['GAN原理', 'DCGAN', 'StyleGAN', 'CycleGAN', '条件GAN', 'Diffusion模型对比'],
    prerequisites: ['deep_learning_basics', 'cnn', 'pytorch'],
    relatedNodes: ['computer_vision', 'diffusion_model', 'image_generation'],
    videos: [
      { platform: 'bilibili', title: 'GAN生成对抗网络', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: 'GAN实战教程', url: 'https://www.bilibili.com/video/BV1HE411t7RN' },
      { platform: 'bilibili', title: '图像生成技术', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'diffusion_model',
    name: '扩散模型',
    category: 'frontier',
    level: 7,
    importance: 4,
    description: '扩散模型是当前最先进的生成模型，通过逐步去噪过程生成高质量图像，Stable Diffusion、DALL-E等均基于此技术。',
    subTopics: ['扩散过程', '去噪网络', '条件生成', 'Stable Diffusion', 'ControlNet', 'LoRA微调'],
    prerequisites: ['deep_learning_basics', 'cnn', 'gan'],
    relatedNodes: ['gan', 'image_generation', 'multimodal_ai'],
    videos: [
      { platform: 'bilibili', title: '扩散模型原理', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
      { platform: 'bilibili', title: 'Stable Diffusion教程', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: 'AI绘画技术', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'reinforcement_learning',
    name: '强化学习',
    category: 'core',
    level: 6,
    importance: 3,
    description: '强化学习是智能体通过与环境交互学习最优策略的方法，在游戏AI、机器人控制、推荐系统等领域有重要应用。',
    subTopics: ['马尔可夫决策过程', 'Q-Learning', 'DQN', '策略梯度', 'Actor-Critic', 'PPO算法'],
    prerequisites: ['machine_learning_basics', 'deep_learning_basics', 'math_foundation'],
    relatedNodes: ['ai_agent', 'game_ai', 'robotics'],
    videos: [
      { platform: 'bilibili', title: '强化学习入门', url: 'https://www.bilibili.com/video/BV164411b7dx' },
      { platform: 'bilibili', title: 'RL实战教程', url: 'https://www.bilibili.com/video/BV1aE411o7qd' },
      { platform: 'bilibili', title: '深度强化学习', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'data_mining',
    name: '数据挖掘',
    category: 'domain',
    level: 4,
    importance: 3,
    description: '数据挖掘是从大量数据中发现有价值模式的过程，结合统计学、机器学习和数据库技术，应用于推荐系统、欺诈检测等场景。',
    subTopics: ['频繁模式挖掘', '关联规则', '异常检测', '推荐系统基础', '社交网络分析', 'Web挖掘'],
    prerequisites: ['machine_learning_basics', 'pandas', 'statistical_analysis'],
    relatedNodes: ['unsupervised_learning', 'eda', 'big_data'],
    videos: [
      { platform: 'bilibili', title: '数据挖掘导论', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: '数据挖掘实战', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' },
      { platform: 'bilibili', title: '推荐系统算法', url: 'https://www.bilibili.com/video/BV1vV4y1s7Z4' }
    ]
  },
  {
    id: 'statistical_analysis',
    name: '统计分析方法',
    category: 'skill',
    level: 3,
    importance: 3,
    description: '统计分析是数据科学的基础方法论，包括假设检验、回归分析、方差分析等，为数据驱动决策提供科学依据。',
    subTopics: ['描述性统计', '假设检验', '回归分析', '方差分析', '贝叶斯统计', '非参数检验'],
    prerequisites: ['math_foundation', 'python_basics'],
    relatedNodes: ['eda', 'data_mining', 'machine_learning_basics'],
    videos: [
      { platform: 'bilibili', title: '统计学入门', url: 'https://www.bilibili.com/video/BV1ot411y7mU' },
      { platform: 'bilibili', title: 'Python统计分析', url: 'https://www.bilibili.com/video/BV1Uv4y1s7gR' },
      { platform: 'bilibili', title: '应用统计分析', url: 'https://www.bilibili.com/video/BV1tt4y1177u' }
    ]
  },
  {
    id: 'ai_ethics',
    name: 'AI伦理与安全',
    category: 'domain',
    level: 5,
    importance: 4,
    description: 'AI伦理与安全关注人工智能发展中的道德规范和安全问题，包括算法偏见、隐私保护、可解释性和AI治理等重要议题。',
    subTopics: ['算法偏见与公平性', '隐私保护', '可解释AI', 'AI安全', 'AI治理', '负责任AI'],
    prerequisites: ['machine_learning_basics'],
    relatedNodes: ['ai_application', 'llm', 'ai_agent'],
    videos: [
      { platform: 'bilibili', title: 'AI伦理导论', url: 'https://www.bilibili.com/video/BV164411b7dx' },
      { platform: 'bilibili', title: '可解释AI教程', url: 'https://www.bilibili.com/video/BV1aE411o7qd' },
      { platform: 'bilibili', title: 'AI安全与治理', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'ai_application',
    name: 'AI应用开发',
    category: 'domain',
    level: 5,
    importance: 4,
    description: 'AI应用开发是将AI模型部署为实际产品的过程，涵盖模型服务化、API开发、前端集成、性能优化等工程化实践。',
    subTopics: ['模型部署', 'API开发', 'Gradio/Streamlit', 'Docker容器化', '性能优化', 'MLOps基础'],
    prerequisites: ['machine_learning_basics', 'deep_learning_basics', 'python_basics'],
    relatedNodes: ['ai_agent', 'llm', 'prompt_engineering'],
    videos: [
      { platform: 'bilibili', title: 'AI应用开发实战', url: 'https://www.bilibili.com/video/BV1HE411t7RN' },
      { platform: 'bilibili', title: '模型部署教程', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: 'Gradio快速开发', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' }
    ]
  },
  {
    id: 'multimodal_ai',
    name: '多模态AI',
    category: 'frontier',
    level: 7,
    importance: 4,
    description: '多模态AI融合文本、图像、语音等多种信息模态，实现跨模态理解与生成，是AI发展的重要趋势，如GPT-4V、Gemini等。',
    subTopics: ['视觉-语言模型', 'CLIP模型', '图文生成', '语音识别与合成', '视频理解', '跨模态检索'],
    prerequisites: ['transformer', 'cnn', 'nlp_basics'],
    relatedNodes: ['llm', 'computer_vision', 'diffusion_model'],
    videos: [
      { platform: 'bilibili', title: '多模态AI入门', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
      { platform: 'bilibili', title: 'CLIP模型详解', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: '多模态大模型', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'kaggle_competition',
    name: 'Kaggle竞赛实战',
    category: 'practice',
    level: 5,
    importance: 3,
    description: 'Kaggle是全球最大的数据科学竞赛平台，通过参与竞赛实践完整的机器学习工作流，提升数据处理、模型构建和团队协作能力。',
    subTopics: ['竞赛流程', '数据探索', '特征工程实战', '模型融合', '提交策略', 'Top方案复现'],
    prerequisites: ['supervised_learning', 'feature_engineering', 'ensemble_methods'],
    relatedNodes: ['ensemble_methods', 'model_evaluation', 'ai_application'],
    videos: [
      { platform: 'bilibili', title: 'Kaggle竞赛入门', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: 'Kaggle金牌方案', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' },
      { platform: 'bilibili', title: '数据竞赛实战', url: 'https://www.bilibili.com/video/BV1vV4y1s7Z4' }
    ]
  }
]

const categoryConfig = {
  foundation: { name: '基础入门', color: '#667eea' },
  tool: { name: '工具框架', color: '#43e97b' },
  skill: { name: '核心技能', color: '#fa709a' },
  core: { name: '算法理论', color: '#f093fb' },
  domain: { name: '应用领域', color: '#f5af19' },
  frontier: { name: '前沿技术', color: '#667eea' },
  practice: { name: '实践项目', color: '#43e97b' }
}

export { knowledgeNodes, categoryConfig }

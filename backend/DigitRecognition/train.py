import torch
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from model import MNISTNet
import os
import time

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'mnist_model.pth')


def train_model(epochs=10, batch_size=128, lr=0.001):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"[训练] 使用设备: {device}")
    if torch.cuda.is_available():
        print(f"[训练] GPU: {torch.cuda.get_device_name(0)}")
        print(f"[训练] GPU显存: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")

    transform_train = transforms.Compose([
        transforms.RandomRotation(10),
        transforms.RandomAffine(degrees=0, translate=(0.1, 0.1)),
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
    ])

    transform_test = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
    ])

    data_dir = os.path.join(os.path.dirname(__file__), 'data')
    os.makedirs(data_dir, exist_ok=True)

    print("[训练] 下载MNIST数据集...")
    train_dataset = torchvision.datasets.MNIST(
        root=data_dir, train=True, download=True, transform=transform_train)
    test_dataset = torchvision.datasets.MNIST(
        root=data_dir, train=False, download=True, transform=transform_test)

    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=2, pin_memory=True)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False, num_workers=2, pin_memory=True)

    model = MNISTNet().to(device)
    criterion = torch.nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)
    scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=3, gamma=0.5)

    best_acc = 0.0
    start_time = time.time()

    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for batch_idx, (images, labels) in enumerate(train_loader):
            images, labels = images.to(device, non_blocking=True), labels.to(device, non_blocking=True)

            optimizer.zero_grad(set_to_none=True)
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()

            if batch_idx % 100 == 0:
                print(f"  Epoch [{epoch+1}/{epochs}] Batch [{batch_idx}/{len(train_loader)}] "
                      f"Loss: {loss.item():.4f} Acc: {100.*correct/total:.2f}%")

        scheduler.step()

        model.eval()
        test_correct = 0
        test_total = 0
        test_loss = 0.0

        with torch.no_grad():
            for images, labels in test_loader:
                images, labels = images.to(device, non_blocking=True), labels.to(device, non_blocking=True)
                outputs = model(images)
                loss = criterion(outputs, labels)
                test_loss += loss.item()
                _, predicted = outputs.max(1)
                test_total += labels.size(0)
                test_correct += predicted.eq(labels).sum().item()

        test_acc = 100. * test_correct / test_total
        train_acc = 100. * correct / total

        print(f"Epoch [{epoch+1}/{epochs}] "
              f"Train Loss: {running_loss/len(train_loader):.4f} Train Acc: {train_acc:.2f}% "
              f"Test Loss: {test_loss/len(test_loader):.4f} Test Acc: {test_acc:.2f}%")

        if test_acc > best_acc:
            best_acc = test_acc
            torch.save({
                'model_state_dict': model.state_dict(),
                'accuracy': test_acc,
                'epoch': epoch + 1
            }, MODEL_PATH)
            print(f"  ✓ 模型已保存 (准确率: {test_acc:.2f}%)")

    elapsed = time.time() - start_time
    print(f"\n[训练] 训练完成! 最佳准确率: {best_acc:.2f}%, 耗时: {elapsed:.1f}s")
    print(f"[训练] 模型保存路径: {MODEL_PATH}")

    return best_acc


if __name__ == '__main__':
    train_model(epochs=10)

import torch
import torch.nn as nn
import torch.nn.functional as F


class MNISTNet(nn.Module):
    def __init__(self):
        super(MNISTNet, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.bn3 = nn.BatchNorm2d(128)
        self.pool = nn.MaxPool2d(2, 2)
        self.dropout1 = nn.Dropout(0.25)
        self.dropout2 = nn.Dropout(0.5)
        self.fc1 = nn.Linear(128 * 3 * 3, 256)
        self.fc2 = nn.Linear(256, 128)
        self.fc3 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.pool(F.relu(self.bn1(self.conv1(x))))
        x = self.pool(F.relu(self.bn2(self.conv2(x))))
        x = self.pool(F.relu(self.bn3(self.conv3(x))))
        x = x.view(-1, 128 * 3 * 3)
        x = self.dropout1(x)
        x = F.relu(self.fc1(x))
        x = self.dropout2(x)
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

    def forward_with_features(self, x):
        features = {}
        x = self.pool(F.relu(self.bn1(self.conv1(x))))
        features['conv1'] = x
        x = self.pool(F.relu(self.bn2(self.conv2(x))))
        features['conv2'] = x
        x = self.pool(F.relu(self.bn3(self.conv3(x))))
        features['conv3'] = x
        x = x.view(-1, 128 * 3 * 3)
        features['flattened'] = x
        x = self.dropout1(x)
        x = F.relu(self.fc1(x))
        features['fc1'] = x
        x = self.dropout2(x)
        x = F.relu(self.fc2(x))
        features['fc2'] = x
        x = self.fc3(x)
        features['output'] = x
        return x, features

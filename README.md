<p align="center">
  <h1 align="center">🧠 OmniAI Edu</h1>
</p>

<p align="center">
  <strong>AI 通识教育一站式实践平台</strong>
</p>

<p align="center">
  学知识 · 看效果 · 动手做 · 得反馈
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue 3"/>
  <img src="https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/PyTorch-2.11-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" alt="PyTorch"/>
  <img src="https://img.shields.io/badge/LangChain-1.0-1C3C3C?style=flat-square" alt="LangChain"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Flask-3.1-000000?style=flat-square&logo=flask&logoColor=white" alt="Flask"/>
  <img src="https://img.shields.io/badge/MongoDB-7.x-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <br/>
  <img src="https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square" alt="Status"/>
</p>

<p align="center">
  <a href="./README.md">简体中文</a> | <a href="./README_EN.md">English</a>
</p>

---

## 🏆 HackIndia Vibe Coding Hackathon 2026

| 项目 | 信息 |
|------|------|
| **黑客松** | HackIndia Vibe Coding Hackathon 2026 |
| **团队** | Abaiar |
| **赛道** | 🎓 Student Innovation（学生创新） |
| **时长** | 10 天（2026 年 6 月 1 日 – 6 月 10 日） |
| **形式** | 线上 |
| **提交仓库** | [vibe-coding-hackathon-2026-abaiar](https://github.com/HackIndiaXYZ/vibe-coding-hackathon-2026-abaiar) |

### 为什么本项目符合学生创新赛道

OmniAI Edu 直击教育领域的**真实痛点**：缺乏面向学生的易用、实践型 AI 通识教育平台。传统 AI 教育依赖被动听讲和理论内容——学生很少能在统一环境中**体验、实践和获取反馈**。我们的平台通过构建完整的**学知识 → 看效果 → 动手做 → 得反馈**闭环，让 AI 教育变得互动化、可量化和个性化。

---

## 📖 项目概述

**OmniAI Edu** 是一款面向人工智能通识教育的一站式实践平台，围绕 **学知识、看效果、动手做、得反馈** 四大核心模块构建完整的学习闭环。平台深度集成 [OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) 多智能体互动课堂引擎，并内置手写数字识别、AI 智能出题与判分、学习数据分析等功能，为 AI 通识教育提供从理论到实践的全链路支持。

### 🌟 核心亮点

- 🎓 **多智能体互动课堂** — 深度集成 OpenMAIC，一键生成 AI 教师 + AI 同学的沉浸式课堂
- 🔢 **手写数字识别** — 基于 CNN 的 MNIST 识别，支持 GPU 加速，逐层可视化推理过程
- 📝 **AI 智能出题与判分** — 支持选择题、代码理解题、简答题，AI 自动生成与评分
- 🤖 **智能助教「师小助」** — 基于 LangChain 的 Tool-Calling 智能体，可查询学习数据并个性化辅导
- 🔑 **统一 API 管理** — 一站式管理 15+ LLM 服务商的 API Key，自动同步环境变量
- 🌙 **暗色模式** — 全平台支持明暗主题切换

---

## 🔥 如何回应评审标准

### 💡 创新性

OmniAI Edu 引入了现有 AI 教育平台所缺乏的**四模块闭环学习模型**（学知识 → 看效果 → 动手做 → 得反馈）。核心创新包括：

- **逐层 CNN 可视化** — 学生不只看到结果，而是逐步观察整个推理流水线（预处理 → 卷积 → 分类 → 输出），让 AI 的"黑盒"变得透明。
- **LangChain Tool-Calling AI 助教** — "师小助"不是简单的聊天机器人，而是一个工具调用智能体，能查询实时学习统计、练习历史、错题和排行榜数据，提供上下文感知的个性化指导。
- **统一 API 管理** — 单一界面配置 15+ AI 服务商，覆盖 LLM、TTS、ASR、图像生成、视频生成、PDF 解析和网络搜索，消除碎片化配置体验。

### ⚡ 执行速度

本项目完全使用 **Vibe Coding** 方式，借助 AI 辅助开发工具（Trae AI、ChatGPT、Claude）在黑客松期间设计并实现了包含 5 个后端服务和 12+ 前端组件的全栈平台。架构展示了快速原型能力：

- **5 个独立微服务**并行运行，配备统一启动器
- **12+ Vue 3 组件**，统一设计语言，支持暗色模式
- **完整 CRUD 操作**，MongoDB 持久化 + 内存回退
- **实时 GPU 推理**，自动 CPU 回退

### 🧠 AI 使用

AI 不只是功能——它是平台的**核心引擎**：

| AI 用途 | 描述 |
|---------|------|
| **Vibe Coding** | 整个项目使用 AI 编程工具构建（Trae AI、ChatGPT、Claude） |
| **LLM 驱动出题** | 通义千问大模型生成选择题、代码理解题和简答题，自动调节难度 |
| **AI 评分与报告** | LLM 评估开放性答案，生成个性化学习报告，分析薄弱环节 |
| **LangChain Tool-Calling 智能体** | "师小助" AI 助教使用 LangChain 工具调用范式查询实时数据并提供上下文响应 |
| **CNN 推理** | PyTorch CNN 模型实现手写数字识别，支持 GPU 加速 |
| **OpenMAIC 多智能体课堂** | AI 教师 + AI 同学智能体提供互动式课程，含幻灯片、测验和模拟实验 |

### 💡 问题解决

**问题：** AI 通识教育面临三大鸿沟：
1. **理论-实践鸿沟** — 学生学习 AI 概念但无法体验或应用
2. **反馈鸿沟** — 缺乏个性化、数据驱动的学习进度反馈
3. **可及性鸿沟** — AI 工具碎片化，学生需要多个平台才能学习、练习和获取反馈

**解决方案：** OmniAI Edu 的四模块闭环：
1. **学知识** — 系统化知识路线图，从 Python 基础到前沿 AI 研究（30+ 知识节点）
2. **看效果** — 交互式 AI 演示（手写数字识别，真实 CNN 模型 + 逐步可视化）
3. **动手做** — AI 生成测验，3 种题型 × 5 级难度，自动评分
4. **得反馈** — 五维能力雷达图、AI 学习报告、错题追踪、排行榜

### 🎤 演示与路演

**现场演示流程：**
1. **登录** → 进入平台
2. **学知识** → 浏览 AI 知识路线图，探索知识节点的前置知识和关联主题
3. **看效果** → 在画板书写数字 → 观看实时 CNN 识别与逐层可视化 → 查看 GPU 加速信息
4. **动手做** → 生成 AI 驱动的练习题 → 作答选择题、代码理解题和简答题
5. **得反馈** → 查看 AI 分析的测验报告 → 检查五维雷达图 → 复习错题 → 查看排行榜
6. **AI 助教** → 向"师小助"提问如"什么是 Transformer？"或"查看我的学习统计" → 获取实时数据支撑的回答
7. **智慧课堂** → 启动 OpenMAIC → 生成 AI 驱动的互动课程

---

## ✨ 功能特性

### 🎓 智慧课堂（OpenMAIC）

集成 OpenMAIC 多智能体互动课堂引擎，支持：

| 功能 | 说明 |
|------|------|
| **一键生成课堂** | 描述主题或上传文档，AI 自动生成完整课堂 |
| **幻灯片讲解** | AI 教师配合聚光灯和激光笔进行语音讲解 |
| **交互式测验** | 单选 / 多选 / 简答，AI 实时判分 |
| **交互式模拟** | HTML 交互实验，可视化动手学习 |
| **项目制学习 (PBL)** | 选择角色与 AI 协作完成结构化项目 |
| **白板 & 语音** | 智能体实时绘制图表、书写公式、语音讲解 |
| **导出** | 支持导出 `.pptx` 幻灯片和交互式 `.html` |

### 📚 学知识

- 系统化 AI 知识路线图，从基础到进阶
- 知识点详情页，深度解析核心概念
- 支持多种知识分类与检索

### 👁️ 看效果

- **手写数字识别演示** — 在画板上书写数字，实时识别并逐层可视化 CNN 推理过程
  - 图像采集 → 灰度转换 → 裁剪空白 → 等比缩放 → 居中放置 → 像素归一化
  - 卷积层特征图可视化（低级 → 中级 → 高级特征提取）
  - 全连接层激活值分析
  - Softmax 概率分布展示
  - GPU/CPU 自动切换，支持 CUDA 加速推理

### ✏️ 动手做

- **AI 智能出题** — 基于通义千问大模型，支持三种题型：
  - 📋 选择题 — 4 选项单选，AI 自动生成
  - 💻 代码理解题 — 分析 Python/AI 代码功能或输出
  - ✍️ 简答题 — 开放式作答，AI 智能评分
- **5 级难度体系** — 从入门到专家，循序渐进
- **错题本** — 自动收集错题，支持重做与掌握标记
- **练习历史** — 完整的练习记录与成绩追踪

### 📊 得反馈

- **五维能力雷达图** — 算法理解 / 代码实现 / 问题分析 / 模型应用 / 创新思维
- **AI 学习报告** — 自动分析薄弱知识点，给出个性化改进建议
- **排行榜** — 总榜与周榜，激励持续学习
- **智能助教「师小助」** — 基于 LangChain Tool-Calling 的 AI 助教，可实时查询：
  - 用户学习统计与五维能力值
  - 练习历史与成绩趋势
  - 排行榜排名与差距
  - 错题信息与掌握状态
  - 系统整体概览数据

### 🔑 统一 API 管理

一站式管理所有 AI 服务商配置，支持 **15+ LLM 服务商**：

| 类别 | 支持的服务商 |
|------|-------------|
| **LLM** | OpenAI、Anthropic、Google Gemini、DeepSeek、通义千问 (Qwen)、Kimi、MiniMax、智谱 (GLM)、SiliconFlow、豆包 (Doubao)、OpenRouter、Grok (xAI)、腾讯混元、小米、Ollama |
| **TTS** | OpenAI TTS、Azure TTS、GLM TTS、Qwen TTS、VoxCPM、Doubao TTS、ElevenLabs、MiniMax TTS |
| **ASR** | OpenAI Whisper、Qwen ASR |
| **图像生成** | OpenAI DALL-E、SeedReam、Qwen Image、MiniMax Image |
| **视频生成** | SeedAnce、Kling、Veo、Sora、MiniMax Video |
| **PDF 解析** | UnPDF、MinerU、MinerU Cloud |
| **网络搜索** | Tavily |

---

## 🏗️ 项目架构

```
OmniAI Edu/
├── frontend/                    # Vue 3 前端应用
│   ├── src/
│   │   ├── components/          #   Vue 组件
│   │   │   ├── Index.vue        #     首页（四大模块入口）
│   │   │   ├── Login.vue        #     登录/注册
│   │   │   ├── LearnRoadmap.vue #     知识路线图
│   │   │   ├── KnowledgeDetail.vue #  知识点详情
│   │   │   ├── DemoShowcase.vue #     效果展示
│   │   │   ├── DigitRecognizer.vue #  手写数字识别
│   │   │   ├── RecognitionExplanation.vue # CNN 逐步可视化
│   │   │   ├── PracticePage.vue #     练习页面
│   │   │   ├── QuizPage.vue     #     答题页面
│   │   │   ├── QuizReport.vue   #     答题报告
│   │   │   ├── FeedbackPage.vue #     反馈页面
│   │   │   ├── FloatingAgent.vue#     悬浮智能助教
│   │   │   └── api-management.vue #   API 统一管理
│   │   ├── router/              #   路由配置
│   │   ├── store/               #   Pinia 状态管理
│   │   └── data/                #   知识库数据
│   └── static/                  #   静态资源
│
├── backend/                     # Python 后端服务
│   ├── main.py                  #   统一服务启动脚本
│   ├── Login/                   #   登录服务 (Flask, :5000)
│   ├── OpenMAIC/                #   OpenMAIC 智能课堂 (Next.js, :5006)
│   ├── DigitRecognition/        #   手写数字识别服务 (Flask, :5005)
│   ├── PracticeService/         #   练习反馈服务 (Flask, :5011)
│   └── API_management/          #   API 统一管理服务 (Flask, :5010)
│
└── .env.example                 # 环境变量示例
```

### 服务端口一览

| 服务 | 端口 | 技术栈 | 说明 |
|------|------|--------|------|
| 登录服务 | 5000 | Flask + MongoDB | 用户注册/登录，支持内存回退模式 |
| 手写数字识别 | 5005 | Flask + PyTorch | CNN 推理，GPU 加速，逐层可视化 |
| OpenMAIC 智能课堂 | 5006 | Next.js + React | 多智能体互动课堂引擎 |
| API 统一管理 | 5010 | Flask | 15+ 服务商 API Key 管理，自动同步 |
| 练习反馈服务 | 5011 | Flask + LangChain | AI 出题/判分/报告，智能助教 |

---

## 🚀 安装指南

### 环境要求

- **Python** >= 3.12
- **Node.js** >= 20
- **pnpm** >= 10
- **MongoDB** >= 7.0（可选，不支持时自动回退到内存模式）
- **CUDA**（可选，用于 GPU 加速数字识别）

### 1. 克隆项目

```bash
git clone https://github.com/HackIndiaXYZ/vibe-coding-hackathon-2026-abaiar.git
cd vibe-coding-hackathon-2026-abaiar
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env`，至少配置一个 LLM 服务商的 API Key：

```env
DASHSCOPE_API_KEY="你的通义千问API Key"
ALI_MODEL_NAME=qwen-plus
```

### 3. 安装后端依赖

```bash
cd backend
pip install -r requirements.txt
```

### 4. 安装前端依赖

```bash
cd frontend
npm install
```

### 5. 安装 OpenMAIC 依赖

```bash
cd backend/OpenMAIC
pnpm install
```

---

## 🎮 使用方法

### 启动所有服务（推荐）

```bash
cd backend
python main.py
```

这将并行启动所有 5 个后端服务，并通过统一日志管理器监控运行状态。

可选参数：

```bash
python main.py --log-level DEBUG    # 启用调试日志
python main.py --sequential          # 顺序启动（默认并行）
```

### 单独启动服务

<details>
<summary>点击展开各服务单独启动命令</summary>

**登录服务：**
```bash
cd backend/Login
python login.py
```

**手写数字识别服务：**
```bash
cd backend/DigitRecognition
python app.py
```

**OpenMAIC 智能课堂：**
```bash
cd backend/OpenMAIC
pnpm dev --port 5006
```

**API 统一管理服务：**
```bash
cd backend/API_management
python app.py --host 0.0.0.0 --port 5010
```

**练习反馈服务：**
```bash
cd backend/PracticeService
python app.py
```

</details>

### 启动前端

```bash
cd frontend
npm run dev
```

打开浏览器访问前端页面即可使用。

### API 统一管理

启动后访问 API 管理界面，配置各服务商的 API Key：

- 界面入口：前端导航栏 → API 管理
- API 端点：`http://127.0.0.1:5010/api/config`
- 配置完成后自动同步到环境变量文件

---

## 📡 API 参考

### 登录服务 (`:5000`)

| 方法 | 端点 | 说明 |
|------|------|------|
| POST | `/register` | 用户注册 |
| POST | `/login` | 用户登录 |
| GET | `/health` | 健康检查 |

### 手写数字识别 (`:5005`)

| 方法 | 端点 | 说明 |
|------|------|------|
| POST | `/api/digit/recognize` | 识别手写数字 |
| POST | `/api/digit/explain` | 识别并返回逐层可视化详解 |
| GET | `/api/digit/status` | 获取模型与 GPU 状态 |
| POST | `/api/digit/train` | 触发模型重新训练 |

### API 统一管理 (`:5010`)

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/providers` | 获取服务商注册表 |
| GET | `/api/config` | 获取全部配置 |
| GET | `/api/config/{category}/{provider}` | 获取指定服务商配置 |
| PUT | `/api/config/{category}/{provider}` | 更新指定服务商配置 |
| DELETE | `/api/config/{category}/{provider}` | 重置指定服务商配置 |
| PUT | `/api/config/global` | 更新全局设置 |
| POST | `/api/test-connection` | 测试 API 连接 |
| GET | `/api/config/status` | 获取配置状态概览 |
| POST | `/api/config/sync-to-env` | 手动同步配置到环境变量 |
| GET | `/api/openmaic/providers` | 获取 OpenMAIC 可用服务商 |
| POST | `/api/openmaic/resolve-key` | 解析服务商 API Key |
| GET | `/api/theme` | 获取主题设置 |
| POST | `/api/theme` | 更新主题设置 |

### 练习反馈服务 (`:5011`)

| 方法 | 端点 | 说明 |
|------|------|------|
| POST | `/api/practice/generate` | AI 生成练习题 |
| POST | `/api/practice/submit` | 提交答案并获取评分 |
| GET | `/api/practice/history` | 获取练习历史 |
| GET | `/api/practice/history/{id}` | 获取练习详情 |
| GET | `/api/practice/wrong-questions` | 获取错题列表 |
| POST | `/api/practice/wrong-questions/{id}/retry` | 重做错题 |
| POST | `/api/practice/wrong-questions/export` | 导出错题 |
| GET | `/api/practice/stats` | 获取用户统计数据 |
| GET | `/api/practice/radar` | 获取五维能力雷达图数据 |
| GET | `/api/practice/leaderboard` | 获取排行榜 |
| POST | `/api/agent/chat` | 智能助教对话 |
| POST | `/api/agent/chat/stream` | 智能助教流式对话 (SSE) |

### OpenMAIC 智能课堂 (`:5006`)

OpenMAIC 提供完整的 RESTful API，详见 [OpenMAIC 文档](https://github.com/THU-MAIC/OpenMAIC)。

---

## 🛠️ 技术栈

| 层级 | 技术 | 用途 |
|------|------|------|
| **前端** | Vue 3 + Pinia | SPA 响应式状态管理 |
| **前端** | ECharts | 雷达图与数据可视化 |
| **前端** | Marked + highlight.js + KaTeX | AI 对话中的 Markdown 渲染 |
| **后端** | Flask | REST API 服务 |
| **后端** | PyTorch + CUDA | CNN 推理与 GPU 加速 |
| **后端** | LangChain | Tool-Calling AI 智能体 |
| **后端** | MongoDB | 数据持久化，支持内存回退 |
| **课堂** | Next.js 16 + React 19 | OpenMAIC 多智能体课堂 |
| **通信** | SSE (Server-Sent Events) | AI 对话流式响应 |
| **AI 模型** | Qwen、OpenAI、Anthropic 等 | 出题、评分、辅导 |

---

## 🤝 贡献指南

我们欢迎各种形式的贡献！

### 贡献流程

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

### 开发建议

- 后端 Python 服务遵循 Flask 蓝图模式，新增服务请在 `backend/` 下创建独立目录
- 前端组件遵循 Vue 3 Composition API 风格
- API 管理服务新增服务商需在 `PROVIDER_REGISTRY` 中注册
- 提交前请确保所有服务可正常启动

---

## 📄 许可证

本项目基于 [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html) 开源。

其中 OpenMAIC 模块同样遵循 AGPL-3.0 协议，商业授权请联系：**thu_maic@tsinghua.edu.cn**

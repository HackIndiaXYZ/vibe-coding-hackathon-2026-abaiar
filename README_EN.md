<p align="center">
  <h1 align="center">🧠 OmniAI Edu</h1>
</p>

<p align="center">
  <strong>All-in-One AI Literacy Education Practice Platform</strong>
</p>

<p align="center">
  Learn · Experience · Practice · Feedback
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

| Detail | Information |
|--------|-------------|
| **Hackathon** | HackIndia Vibe Coding Hackathon 2026 |
| **Team** | Abaiar |
| **Track** | 🎓 Student Innovation |
| **Duration** | 10 Days (June 1 – June 10, 2026) |
| **Format** | Online |
| **Repository** | [vibe-coding-hackathon-2026-abaiar](https://github.com/HackIndiaXYZ/vibe-coding-hackathon-2026-abaiar) |

### Why This Project Fits the Student Innovation Track

OmniAI Edu directly addresses a **real-world problem in education**: the lack of accessible, hands-on AI literacy platforms for students. Traditional AI education relies on passive lectures and theoretical content — students rarely get to **experience, practice, and receive feedback** on AI concepts in an integrated environment. Our platform solves this by creating a complete **Learn → Experience → Practice → Feedback** loop, making AI education interactive, measurable, and personalized.

---

## 📖 Overview

**OmniAI Edu** is an all-in-one practice platform for AI literacy education, built around four core modules: **Learn, Experience, Practice, and Feedback** — forming a complete learning loop. The platform deeply integrates the [OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) multi-agent interactive classroom engine and includes built-in handwritten digit recognition, AI-powered quiz generation and grading, learning data analytics, and more — providing end-to-end support from theory to practice in AI education.

### 🌟 Highlights

- 🎓 **Multi-Agent Interactive Classroom** — Deep integration with OpenMAIC for one-click generation of immersive AI teacher + AI classmate classrooms
- 🔢 **Handwritten Digit Recognition** — CNN-based MNIST recognition with GPU acceleration and layer-by-layer visualization of the inference process
- 📝 **AI-Powered Quiz Generation & Grading** — Supports multiple-choice, code comprehension, and short-answer questions with automatic AI generation and scoring
- 🤖 **AI Teaching Assistant "Shi Xiao Zhu"** — LangChain-based Tool-Calling agent that queries learning data and provides personalized tutoring
- 🔑 **Unified API Management** — One-stop management of 15+ LLM provider API keys with automatic environment variable synchronization
- 🌙 **Dark Mode** — Full platform support for light/dark theme switching

---

## 🔥 How We Address the Judging Criteria

### 💡 Innovation

OmniAI Edu introduces a **4-module closed-loop learning model** (Learn → Experience → Practice → Feedback) that is absent from existing AI education platforms. Key innovations include:

- **Layer-by-layer CNN visualization** — Students don't just see a result; they watch the entire inference pipeline unfold step by step (preprocessing → convolution → classification → output), making the "black box" of AI transparent.
- **LangChain Tool-Calling AI Tutor** — "Shi Xiao Zhu" is not a simple chatbot; it's a tool-calling agent that can query real-time learning statistics, practice history, wrong questions, and leaderboard data to provide context-aware, personalized guidance.
- **Unified API Management** — A single interface to configure 15+ AI providers across LLM, TTS, ASR, image generation, video generation, PDF parsing, and web search — eliminating the fragmented configuration experience.

### ⚡ Execution Speed

Built entirely using **Vibe Coding** with AI-assisted development tools (Trae AI, ChatGPT, Claude), this full-stack platform with 5 backend services and 12+ frontend components was designed and implemented within the hackathon timeframe. The architecture demonstrates rapid prototyping with:

- **5 independent microservices** running in parallel with a unified launcher
- **12+ Vue 3 components** with consistent design language and dark mode support
- **Full CRUD operations** with MongoDB persistence and in-memory fallback
- **Real-time GPU inference** with automatic CPU fallback

### 🧠 Use of AI

AI is not just a feature — it's the **core engine** of the platform:

| AI Usage | Description |
|----------|-------------|
| **Vibe Coding** | Entire project built using AI-powered coding tools (Trae AI, ChatGPT, Claude) |
| **LLM-Powered Quiz Generation** | Qwen LLM generates multiple-choice, code comprehension, and short-answer questions with automatic difficulty scaling |
| **AI Grading & Reports** | LLM evaluates open-ended answers and generates personalized learning reports with weak-area analysis |
| **LangChain Tool-Calling Agent** | "Shi Xiao Zhu" AI tutor uses LangChain's tool-calling paradigm to query real-time data and provide contextual responses |
| **CNN Inference** | PyTorch CNN model for handwritten digit recognition with GPU acceleration |
| **OpenMAIC Multi-Agent Classroom** | AI teacher + AI classmate agents deliver interactive lessons with slides, quizzes, and simulations |

### 💡 Problem Solving

**Problem:** AI literacy education suffers from three gaps:
1. **Theory-Practice Gap** — Students learn AI concepts but can't experience or apply them
2. **Feedback Gap** — No personalized, data-driven feedback on learning progress
3. **Accessibility Gap** — AI tools are fragmented; students need multiple platforms to learn, practice, and get feedback

**Solution:** OmniAI Edu's 4-module closed loop:
1. **Learn** — Systematic knowledge roadmap from Python basics to frontier AI research (30+ knowledge nodes)
2. **Experience** — Interactive AI demos (handwritten digit recognition with real CNN model and step-by-step visualization)
3. **Practice** — AI-generated quizzes across 3 question types and 5 difficulty levels, with automatic grading
4. **Feedback** — 5-dimensional ability radar chart, AI learning reports, wrong question tracking, and leaderboard

### 🎤 Demo & Pitch

**Live Demo Flow:**
1. **Login** → Enter the platform
2. **Learn** → Browse the AI knowledge roadmap, explore knowledge nodes with prerequisites and related topics
3. **Experience** → Write a digit on the canvas → Watch real-time CNN recognition with layer-by-layer visualization → See GPU acceleration stats
4. **Practice** → Generate AI-powered quizzes → Answer multiple-choice, code comprehension, and short-answer questions
5. **Feedback** → View quiz report with AI analysis → Check 5-dimensional radar chart → Review wrong questions → See leaderboard
6. **AI Tutor** → Ask "Shi Xiao Zhu" questions like "What is a Transformer?" or "View my learning stats" → Get real-time, data-backed responses
7. **Smart Classroom** → Launch OpenMAIC → Generate an AI-powered interactive lesson

---

## ✨ Features

### 🎓 Smart Classroom (OpenMAIC)

Integrated OpenMAIC multi-agent interactive classroom engine with support for:

| Feature | Description |
|---------|-------------|
| **One-Click Lesson Generation** | Describe a topic or upload a document, and AI generates a complete lesson |
| **Slide Lectures** | AI teacher delivers lectures with spotlight and laser pointer animations |
| **Interactive Quizzes** | Single / multiple choice, short answer with real-time AI grading |
| **Interactive Simulations** | HTML-based interactive experiments for visual, hands-on learning |
| **Project-Based Learning (PBL)** | Choose a role and collaborate with AI agents on structured projects |
| **Whiteboard & TTS** | Agents draw diagrams, write formulas, and explain out loud in real time |
| **Export** | Export to `.pptx` slides or interactive `.html` pages |

### 📚 Learn

- Systematic AI knowledge roadmap from basics to advanced
- Knowledge detail pages with in-depth concept explanations
- Multiple knowledge categories and search capabilities

### 👁️ Experience

- **Handwritten Digit Recognition Demo** — Write digits on the canvas and watch real-time recognition with layer-by-layer CNN visualization
  - Image capture → Grayscale conversion → Crop whitespace → Proportional scaling → Center placement → Pixel normalization
  - Convolutional layer feature map visualization (low-level → mid-level → high-level feature extraction)
  - Fully connected layer activation analysis
  - Softmax probability distribution display
  - Automatic GPU/CPU switching with CUDA acceleration support

### ✏️ Practice

- **AI-Powered Quiz Generation** — Powered by Qwen LLM, supporting three question types:
  - 📋 Multiple Choice — 4-option single choice, auto-generated by AI
  - 💻 Code Comprehension — Analyze Python/AI code functionality or output
  - ✍️ Short Answer — Open-ended responses with AI-powered scoring
- **5-Level Difficulty System** — From beginner to expert, progressive learning
- **Wrong Question Book** — Automatically collects incorrect answers, supports retry and mastery tracking
- **Practice History** — Complete practice records and score tracking

### 📊 Feedback

- **5-Dimensional Ability Radar Chart** — Algorithm understanding / Code implementation / Problem analysis / Model application / Innovative thinking
- **AI Learning Report** — Automatically analyzes weak points and provides personalized improvement suggestions
- **Leaderboard** — Total and weekly rankings to motivate continuous learning
- **AI Teaching Assistant "Shi Xiao Zhu"** — LangChain Tool-Calling agent that can query in real time:
  - User learning statistics and 5-dimensional ability scores
  - Practice history and score trends
  - Leaderboard rankings and gaps
  - Wrong question info and mastery status
  - System overview data

### 🔑 Unified API Management

One-stop management for all AI provider configurations, supporting **15+ LLM providers**:

| Category | Supported Providers |
|----------|-------------------|
| **LLM** | OpenAI, Anthropic, Google Gemini, DeepSeek, Qwen, Kimi, MiniMax, GLM (Zhipu), SiliconFlow, Doubao, OpenRouter, Grok (xAI), Tencent Hunyuan, Xiaomi, Ollama |
| **TTS** | OpenAI TTS, Azure TTS, GLM TTS, Qwen TTS, VoxCPM, Doubao TTS, ElevenLabs, MiniMax TTS |
| **ASR** | OpenAI Whisper, Qwen ASR |
| **Image Generation** | OpenAI DALL-E, SeedReam, Qwen Image, MiniMax Image |
| **Video Generation** | SeedAnce, Kling, Veo, Sora, MiniMax Video |
| **PDF Parsing** | UnPDF, MinerU, MinerU Cloud |
| **Web Search** | Tavily |

---

## 🏗️ Project Architecture

```
OmniAI Edu/
├── frontend/                    # Vue 3 frontend application
│   ├── src/
│   │   ├── components/          #   Vue components
│   │   │   ├── Index.vue        #     Home page (4 module entries)
│   │   │   ├── Login.vue        #     Login/Register
│   │   │   ├── LearnRoadmap.vue #     Knowledge roadmap
│   │   │   ├── KnowledgeDetail.vue #  Knowledge detail
│   │   │   ├── DemoShowcase.vue #     Demo showcase
│   │   │   ├── DigitRecognizer.vue #  Handwritten digit recognition
│   │   │   ├── RecognitionExplanation.vue # CNN step-by-step visualization
│   │   │   ├── PracticePage.vue #     Practice page
│   │   │   ├── QuizPage.vue     #     Quiz page
│   │   │   ├── QuizReport.vue   #     Quiz report
│   │   │   ├── FeedbackPage.vue #     Feedback page
│   │   │   ├── FloatingAgent.vue#     Floating AI assistant
│   │   │   └── api-management.vue #   Unified API management
│   │   ├── router/              #   Route configuration
│   │   ├── store/               #   Pinia state management
│   │   └── data/                #   Knowledge base data
│   └── static/                  #   Static assets
│
├── backend/                     # Python backend services
│   ├── main.py                  #   Unified service launcher
│   ├── Login/                   #   Login service (Flask, :5000)
│   ├── OpenMAIC/                #   OpenMAIC smart classroom (Next.js, :5006)
│   ├── DigitRecognition/        #   Digit recognition service (Flask, :5005)
│   ├── PracticeService/         #   Practice & feedback service (Flask, :5011)
│   └── API_management/          #   Unified API management service (Flask, :5010)
│
└── .env.example                 # Environment variable template
```

### Service Ports

| Service | Port | Stack | Description |
|---------|------|-------|-------------|
| Login Service | 5000 | Flask + MongoDB | User registration/login with memory fallback |
| Digit Recognition | 5005 | Flask + PyTorch | CNN inference, GPU acceleration, layer-by-layer visualization |
| OpenMAIC Classroom | 5006 | Next.js + React | Multi-agent interactive classroom engine |
| API Management | 5010 | Flask | 15+ provider API key management, auto-sync |
| Practice Service | 5011 | Flask + LangChain | AI quiz generation/grading/reports, AI assistant |

---

## 🚀 Installation

### Prerequisites

- **Python** >= 3.12
- **Node.js** >= 20
- **pnpm** >= 10
- **MongoDB** >= 7.0 (optional — falls back to in-memory mode if unavailable)
- **CUDA** (optional, for GPU-accelerated digit recognition)

### 1. Clone the Repository

```bash
git clone https://github.com/HackIndiaXYZ/vibe-coding-hackathon-2026-abaiar.git
cd vibe-coding-hackathon-2026-abaiar
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and configure at least one LLM provider API key:

```env
DASHSCOPE_API_KEY="your-dashscope-api-key"
ALI_MODEL_NAME=qwen-plus
```

### 3. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 5. Install OpenMAIC Dependencies

```bash
cd backend/OpenMAIC
pnpm install
```

---

## 🎮 Usage

### Start All Services (Recommended)

```bash
cd backend
python main.py
```

This launches all 5 backend services in parallel and monitors their status through a unified log manager.

Optional arguments:

```bash
python main.py --log-level DEBUG    # Enable debug logging
python main.py --sequential          # Start services sequentially (default: parallel)
```

### Start Services Individually

<details>
<summary>Click to expand individual service startup commands</summary>

**Login Service:**
```bash
cd backend/Login
python login.py
```

**Digit Recognition Service:**
```bash
cd backend/DigitRecognition
python app.py
```

**OpenMAIC Smart Classroom:**
```bash
cd backend/OpenMAIC
pnpm dev --port 5006
```

**API Management Service:**
```bash
cd backend/API_management
python app.py --host 0.0.0.0 --port 5010
```

**Practice & Feedback Service:**
```bash
cd backend/PracticeService
python app.py
```

</details>

### Start Frontend

```bash
cd frontend
npm run dev
```

Open your browser and navigate to the frontend page to start using the platform.

### API Management

After launching, access the API management interface to configure provider API keys:

- UI entry: Frontend navigation bar → API Management
- API endpoint: `http://127.0.0.1:5010/api/config`
- Configuration is automatically synced to environment variable files

---

## 📡 API Reference

### Login Service (`:5000`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | User registration |
| POST | `/login` | User login |
| GET | `/health` | Health check |

### Digit Recognition (`:5005`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/digit/recognize` | Recognize handwritten digit |
| POST | `/api/digit/explain` | Recognize and return layer-by-layer visualization |
| GET | `/api/digit/status` | Get model and GPU status |
| POST | `/api/digit/train` | Trigger model retraining |

### API Management (`:5010`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/providers` | Get provider registry |
| GET | `/api/config` | Get all configurations |
| GET | `/api/config/{category}/{provider}` | Get specific provider config |
| PUT | `/api/config/{category}/{provider}` | Update specific provider config |
| DELETE | `/api/config/{category}/{provider}` | Reset specific provider config |
| PUT | `/api/config/global` | Update global settings |
| POST | `/api/test-connection` | Test API connection |
| GET | `/api/config/status` | Get configuration status overview |
| POST | `/api/config/sync-to-env` | Manually sync config to env files |
| GET | `/api/openmaic/providers` | Get OpenMAIC available providers |
| POST | `/api/openmaic/resolve-key` | Resolve provider API key |
| GET | `/api/theme` | Get theme settings |
| POST | `/api/theme` | Update theme settings |

### Practice Service (`:5011`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/practice/generate` | AI-generate practice questions |
| POST | `/api/practice/submit` | Submit answers and get grading |
| GET | `/api/practice/history` | Get practice history |
| GET | `/api/practice/history/{id}` | Get practice detail |
| GET | `/api/practice/wrong-questions` | Get wrong questions list |
| POST | `/api/practice/wrong-questions/{id}/retry` | Retry wrong question |
| POST | `/api/practice/wrong-questions/export` | Export wrong questions |
| GET | `/api/practice/stats` | Get user statistics |
| GET | `/api/practice/radar` | Get 5-dimensional radar chart data |
| GET | `/api/practice/leaderboard` | Get leaderboard |
| POST | `/api/agent/chat` | AI assistant chat |
| POST | `/api/agent/chat/stream` | AI assistant streaming chat (SSE) |

### OpenMAIC Smart Classroom (`:5006`)

OpenMAIC provides a comprehensive RESTful API. See the [OpenMAIC documentation](https://github.com/THU-MAIC/OpenMAIC) for details.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Vue 3 + Pinia | SPA with reactive state management |
| **Frontend** | ECharts | Radar charts and data visualization |
| **Frontend** | Marked + highlight.js + KaTeX | Markdown rendering in AI chat |
| **Backend** | Flask | REST API services |
| **Backend** | PyTorch + CUDA | CNN inference with GPU acceleration |
| **Backend** | LangChain | Tool-Calling AI agent |
| **Backend** | MongoDB | Data persistence with in-memory fallback |
| **Classroom** | Next.js 16 + React 19 | OpenMAIC multi-agent classroom |
| **Communication** | SSE (Server-Sent Events) | Streaming AI chat responses |
| **AI Models** | Qwen, OpenAI, Anthropic, etc. | Quiz generation, grading, tutoring |

---

## 🤝 Contributing

We welcome contributions of all kinds!

### Contribution Workflow

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Backend Python services follow the Flask pattern; create a new directory under `backend/` for new services
- Frontend components follow Vue 3 Composition API conventions
- New API providers must be registered in the `PROVIDER_REGISTRY`
- Ensure all services start correctly before submitting

---

## 📄 License

This project is licensed under the [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html).

The OpenMAIC module is also licensed under AGPL-3.0. For commercial licensing inquiries, contact: **thu_maic@tsinghua.edu.cn**

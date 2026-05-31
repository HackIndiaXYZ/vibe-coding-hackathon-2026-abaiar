const knowledgeNodes = [
  {
    id: 'python_basics',
    name: 'Python Basics',
    category: 'foundation',
    level: 1,
    importance: 5,
    description: 'Python is the most mainstream programming language in AI. Mastering Python basics is the first step in learning AI, covering variables, data types, control flow, functions, and object-oriented programming.',
    subTopics: ['Variables & Data Types', 'Control Flow Statements', 'Functions & Modules', 'Object-Oriented Programming', 'File Operations', 'Exception Handling'],
    prerequisites: [],
    relatedNodes: ['numpy', 'pandas', 'data_visualization'],
    videos: [
      { platform: 'bilibili', title: 'Python Basics Complete Course', url: 'https://www.bilibili.com/video/BV1qW4y1a7fU' },
      { platform: 'bilibili', title: 'Python from Scratch', url: 'https://www.bilibili.com/video/BV1AP41137a7' },
      { platform: 'bilibili', title: 'Python Core Programming', url: 'https://www.bilibili.com/video/BV1mW4y1M7vF' }
    ]
  },
  {
    id: 'math_foundation',
    name: 'Mathematics Foundations',
    category: 'foundation',
    level: 1,
    importance: 5,
    description: 'The mathematical foundations of AI algorithms, including linear algebra, calculus, probability theory, and mathematical statistics. These mathematical tools are the cornerstone for understanding machine learning and deep learning algorithms.',
    subTopics: ['Linear Algebra', 'Calculus', 'Probability Theory', 'Mathematical Statistics', 'Optimization Theory', 'Information Theory Basics'],
    prerequisites: [],
    relatedNodes: ['machine_learning_basics', 'deep_learning_basics', 'numpy'],
    videos: [
      { platform: 'bilibili', title: 'Linear Algebra Complete Course', url: 'https://www.bilibili.com/video/BV1aW4y1G7Qe' },
      { platform: 'bilibili', title: 'Probability and Statistics', url: 'https://www.bilibili.com/video/BV1ot411y7mU' },
      { platform: 'bilibili', title: 'Essence of Calculus', url: 'https://www.bilibili.com/video/BV1nx41187tZ' }
    ]
  },
  {
    id: 'numpy',
    name: 'NumPy Computing',
    category: 'tool',
    level: 2,
    importance: 4,
    description: 'NumPy is the foundational library for scientific computing in Python, providing efficient multi-dimensional array objects and matrix operations, serving as the base tool for data processing and machine learning.',
    subTopics: ['ndarray Arrays', 'Array Operations', 'Indexing & Slicing', 'Broadcasting', 'Linear Algebra Operations', 'Random Number Generation'],
    prerequisites: ['python_basics'],
    relatedNodes: ['pandas', 'math_foundation', 'machine_learning_basics'],
    videos: [
      { platform: 'bilibili', title: 'NumPy Beginner Tutorial', url: 'https://www.bilibili.com/video/BV1ex4y1V7F7' },
      { platform: 'bilibili', title: 'NumPy Data Analysis Basics', url: 'https://www.bilibili.com/video/BV1Uv4y1s7gR' },
      { platform: 'bilibili', title: 'Python Scientific Computing with NumPy', url: 'https://www.bilibili.com/video/BV1cx4y1V7xt' }
    ]
  },
  {
    id: 'pandas',
    name: 'Pandas Data Processing',
    category: 'tool',
    level: 2,
    importance: 4,
    description: 'Pandas is the core library for data analysis in Python, providing DataFrame and Series data structures, supporting data cleaning, transformation, and aggregation — an essential tool for data science workflows.',
    subTopics: ['Series & DataFrame', 'Data I/O', 'Data Cleaning', 'Data Transformation', 'Groupby & Aggregation', 'Time Series'],
    prerequisites: ['python_basics', 'numpy'],
    relatedNodes: ['data_visualization', 'feature_engineering', 'data_mining'],
    videos: [
      { platform: 'bilibili', title: 'Pandas Data Analysis Intro', url: 'https://www.bilibili.com/video/BV1Uv4y1s7gR' },
      { platform: 'bilibili', title: 'Pandas Practical Tutorial', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' },
      { platform: 'bilibili', title: 'Data Analysis with Pandas', url: 'https://www.bilibili.com/video/BV1vV4y1s7Z4' }
    ]
  },
  {
    id: 'data_visualization',
    name: 'Data Visualization',
    category: 'tool',
    level: 2,
    importance: 3,
    description: 'Data visualization is the process of transforming data into intuitive graphics, using tools like Matplotlib and Seaborn to create charts that help understand data characteristics and model results.',
    subTopics: ['Matplotlib Basics', 'Seaborn Statistical Charts', 'Line & Scatter Plots', 'Bar & Pie Charts', 'Heatmaps', 'Interactive Visualization'],
    prerequisites: ['python_basics', 'numpy'],
    relatedNodes: ['pandas', 'eda', 'feature_engineering'],
    videos: [
      { platform: 'bilibili', title: 'Matplotlib Visualization Tutorial', url: 'https://www.bilibili.com/video/BV1ht4y1k7sR' },
      { platform: 'bilibili', title: 'Seaborn Data Visualization', url: 'https://www.bilibili.com/video/BV1V54y1B7K3' },
      { platform: 'bilibili', title: 'Python Data Visualization Practice', url: 'https://www.bilibili.com/video/BV1qA411w7aR' }
    ]
  },
  {
    id: 'eda',
    name: 'Exploratory Data Analysis',
    category: 'skill',
    level: 3,
    importance: 4,
    description: 'Exploratory Data Analysis (EDA) is the process of preliminary data exploration before modeling, using statistical methods and visualization to discover patterns, anomalies, and relationships in the data.',
    subTopics: ['Data Overview', 'Distribution Analysis', 'Correlation Analysis', 'Outlier Detection', 'Missing Value Treatment', 'Feature Relationship Exploration'],
    prerequisites: ['pandas', 'data_visualization'],
    relatedNodes: ['feature_engineering', 'data_mining', 'statistical_analysis'],
    videos: [
      { platform: 'bilibili', title: 'EDA Exploratory Data Analysis', url: 'https://www.bilibili.com/video/BV1vV4y1s7Z4' },
      { platform: 'bilibili', title: 'Data Analysis Practice with EDA', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' },
      { platform: 'bilibili', title: 'Python EDA Complete Workflow', url: 'https://www.bilibili.com/video/BV1Uv4y1s7gR' }
    ]
  },
  {
    id: 'machine_learning_basics',
    name: 'Machine Learning Basics',
    category: 'core',
    level: 3,
    importance: 5,
    description: 'Machine learning is the core field of AI, covering the basic concepts, algorithm principles, and application scenarios of supervised, unsupervised, and reinforcement learning, laying the foundation for deeper understanding of AI.',
    subTopics: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Model Evaluation', 'Overfitting & Underfitting', 'Bias-Variance Tradeoff'],
    prerequisites: ['python_basics', 'math_foundation', 'numpy'],
    relatedNodes: ['supervised_learning', 'unsupervised_learning', 'deep_learning_basics'],
    videos: [
      { platform: 'bilibili', title: 'Andrew Ng Machine Learning Course', url: 'https://www.bilibili.com/video/BV164411b7dx' },
      { platform: 'bilibili', title: 'Machine Learning Whiteboard Derivations', url: 'https://www.bilibili.com/video/BV1aE411o7qd' },
      { platform: 'bilibili', title: 'Li Hongyi Machine Learning', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'supervised_learning',
    name: 'Supervised Learning Algorithms',
    category: 'core',
    level: 4,
    importance: 5,
    description: 'Supervised learning is the most commonly used machine learning paradigm, including classic algorithms such as linear regression, logistic regression, decision trees, random forests, and SVM, used for classification and regression tasks.',
    subTopics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'Support Vector Machines', 'K-Nearest Neighbors'],
    prerequisites: ['machine_learning_basics', 'math_foundation'],
    relatedNodes: ['ensemble_methods', 'feature_engineering', 'model_evaluation'],
    videos: [
      { platform: 'bilibili', title: 'Supervised Learning Algorithms Explained', url: 'https://www.bilibili.com/video/BV164411b7dx' },
      { platform: 'bilibili', title: 'Scikit-learn Machine Learning', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: 'Classic ML Algorithm Implementation', url: 'https://www.bilibili.com/video/BV1aE411o7qd' }
    ]
  },
  {
    id: 'unsupervised_learning',
    name: 'Unsupervised Learning Algorithms',
    category: 'core',
    level: 4,
    importance: 4,
    description: 'Unsupervised learning discovers patterns from unlabeled data, including clustering algorithms (K-Means, DBSCAN), dimensionality reduction methods (PCA, t-SNE), and association rule mining.',
    subTopics: ['K-Means Clustering', 'DBSCAN', 'Hierarchical Clustering', 'PCA Dimensionality Reduction', 't-SNE Visualization', 'Association Rules'],
    prerequisites: ['machine_learning_basics'],
    relatedNodes: ['data_mining', 'feature_engineering', 'deep_learning_basics'],
    videos: [
      { platform: 'bilibili', title: 'Unsupervised Learning Algorithms', url: 'https://www.bilibili.com/video/BV164411b7dx' },
      { platform: 'bilibili', title: 'Clustering Algorithms Explained', url: 'https://www.bilibili.com/video/BV1aE411o7qd' },
      { platform: 'bilibili', title: 'Dimensionality Reduction & Feature Extraction', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'feature_engineering',
    name: 'Feature Engineering',
    category: 'skill',
    level: 3,
    importance: 4,
    description: 'Feature engineering is one of the most important steps in machine learning, improving model performance through feature selection, construction, and transformation, directly impacting the effectiveness of AI systems.',
    subTopics: ['Feature Selection', 'Feature Construction', 'Feature Scaling', 'Encoding & Transformation', 'Feature Crossing', 'Automated Feature Engineering'],
    prerequisites: ['pandas', 'machine_learning_basics'],
    relatedNodes: ['supervised_learning', 'eda', 'model_evaluation'],
    videos: [
      { platform: 'bilibili', title: 'Feature Engineering Practice', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: 'Feature Engineering Complete Guide', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' },
      { platform: 'bilibili', title: 'Data Feature Processing', url: 'https://www.bilibili.com/video/BV1vV4y1s7Z4' }
    ]
  },
  {
    id: 'model_evaluation',
    name: 'Model Evaluation & Tuning',
    category: 'skill',
    level: 4,
    importance: 4,
    description: 'Model evaluation and tuning are key steps in the machine learning workflow, including cross-validation, hyperparameter tuning, model selection, and the choice and application of performance metrics.',
    subTopics: ['Cross-Validation', 'Hyperparameter Tuning', 'Grid Search', 'Performance Metrics', 'ROC & AUC', 'Model Selection Strategies'],
    prerequisites: ['supervised_learning', 'machine_learning_basics'],
    relatedNodes: ['ensemble_methods', 'supervised_learning', 'auto_ml'],
    videos: [
      { platform: 'bilibili', title: 'Model Evaluation & Selection', url: 'https://www.bilibili.com/video/BV164411b7dx' },
      { platform: 'bilibili', title: 'Hyperparameter Tuning Practice', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: 'ML Model Tuning Guide', url: 'https://www.bilibili.com/video/BV1aE411o7qd' }
    ]
  },
  {
    id: 'ensemble_methods',
    name: 'Ensemble Methods',
    category: 'core',
    level: 5,
    importance: 4,
    description: 'Ensemble learning improves prediction performance by combining multiple base learners, including Bagging, Boosting, and Stacking — powerful tools in competitions and industrial applications.',
    subTopics: ['Bagging', 'Boosting', 'Stacking', 'XGBoost', 'LightGBM', 'CatBoost'],
    prerequisites: ['supervised_learning', 'model_evaluation'],
    relatedNodes: ['kaggle_competition', 'supervised_learning'],
    videos: [
      { platform: 'bilibili', title: 'Ensemble Learning Explained', url: 'https://www.bilibili.com/video/BV1aE411o7qd' },
      { platform: 'bilibili', title: 'XGBoost Practical Tutorial', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: 'LightGBM from Beginner to Advanced', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' }
    ]
  },
  {
    id: 'deep_learning_basics',
    name: 'Deep Learning Basics',
    category: 'core',
    level: 4,
    importance: 5,
    description: 'Deep learning is a cutting-edge branch of machine learning, building multi-layer models based on artificial neural networks that automatically learn hierarchical representations of data, achieving breakthroughs in image, speech, and NLP domains.',
    subTopics: ['Perceptrons & Neural Networks', 'Activation Functions', 'Forward Propagation', 'Backpropagation', 'Loss Functions', 'Optimizers'],
    prerequisites: ['machine_learning_basics', 'math_foundation', 'numpy'],
    relatedNodes: ['cnn', 'rnn', 'transformer', 'pytorch'],
    videos: [
      { platform: 'bilibili', title: 'Andrew Ng Deep Learning Course', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: 'Li Hongyi Deep Learning', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: '3Blue1Brown Neural Networks', url: 'https://www.bilibili.com/video/BV1bx411M7Zx' }
    ]
  },
  {
    id: 'pytorch',
    name: 'PyTorch Framework',
    category: 'tool',
    level: 4,
    importance: 5,
    description: 'PyTorch is one of the most popular deep learning frameworks, known for its dynamic computation graph and Pythonic API, widely used in academic research and industrial practice.',
    subTopics: ['Tensor Operations', 'Autograd', 'nn Module', 'Data Loading', 'GPU Acceleration', 'Model Saving & Loading'],
    prerequisites: ['python_basics', 'deep_learning_basics', 'numpy'],
    relatedNodes: ['cnn', 'rnn', 'transformer', 'gan'],
    videos: [
      { platform: 'bilibili', title: 'PyTorch Official Tutorial', url: 'https://www.bilibili.com/video/BV1HE411t7RN' },
      { platform: 'bilibili', title: 'PyTorch Deep Learning Practice', url: 'https://www.bilibili.com/video/BV1YK4y1r7Ez' },
      { platform: 'bilibili', title: 'PyTorch from Beginner to Advanced', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' }
    ]
  },
  {
    id: 'cnn',
    name: 'Convolutional Neural Networks',
    category: 'core',
    level: 5,
    importance: 5,
    description: 'Convolutional Neural Networks (CNN) are the core architecture for processing image data, extracting spatial features through convolutional layers and excelling in computer vision tasks such as image classification and object detection.',
    subTopics: ['Convolution Operations', 'Pooling Layers', 'Classic Architectures (LeNet/AlexNet/VGG)', 'ResNet', 'Transfer Learning', 'Object Detection Basics'],
    prerequisites: ['deep_learning_basics', 'pytorch'],
    relatedNodes: ['computer_vision', 'image_classification', 'object_detection'],
    videos: [
      { platform: 'bilibili', title: 'CNN Convolutional Neural Networks Explained', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: 'Computer Vision & CNN', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'PyTorch CNN Practice', url: 'https://www.bilibili.com/video/BV1HE411t7RN' }
    ]
  },
  {
    id: 'rnn',
    name: 'Recurrent Neural Networks',
    category: 'core',
    level: 5,
    importance: 4,
    description: 'Recurrent Neural Networks (RNN) and their variants (LSTM, GRU) are the core architecture for processing sequential data, widely applied in natural language processing, time series forecasting, and other domains.',
    subTopics: ['RNN Basics', 'LSTM', 'GRU', 'Bidirectional RNN', 'Sequence-to-Sequence Models', 'Early Attention Mechanisms'],
    prerequisites: ['deep_learning_basics', 'pytorch'],
    relatedNodes: ['nlp_basics', 'transformer', 'time_series'],
    videos: [
      { platform: 'bilibili', title: 'RNN/LSTM Explained', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: 'Li Hongyi RNN Course', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'LSTM Principles & Implementation', url: 'https://www.bilibili.com/video/BV1HE411t7RN' }
    ]
  },
  {
    id: 'transformer',
    name: 'Transformer Architecture',
    category: 'core',
    level: 6,
    importance: 5,
    description: 'Transformer is a revolutionary architecture based on the self-attention mechanism, fundamentally transforming NLP and extending to CV, speech, and other multimodal tasks — the foundation of large language models.',
    subTopics: ['Self-Attention Mechanism', 'Multi-Head Attention', 'Positional Encoding', 'Encoder-Decoder', 'BERT', 'GPT Series'],
    prerequisites: ['deep_learning_basics', 'rnn', 'pytorch'],
    relatedNodes: ['nlp_basics', 'llm', 'multimodal_ai'],
    videos: [
      { platform: 'bilibili', title: 'Transformer Explained', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
      { platform: 'bilibili', title: 'Li Hongyi Transformer', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'Attention Is All You Need', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' }
    ]
  },
  {
    id: 'nlp_basics',
    name: 'NLP Basics',
    category: 'domain',
    level: 4,
    importance: 4,
    description: 'Natural Language Processing (NLP) is an important branch of AI, studying how to enable computers to understand and generate human language, covering text preprocessing, word vectors, text classification, and other core technologies.',
    subTopics: ['Text Preprocessing', 'Tokenization', 'Word Vectors (Word2Vec/GloVe)', 'Text Classification', 'Sentiment Analysis', 'Named Entity Recognition'],
    prerequisites: ['machine_learning_basics', 'python_basics'],
    relatedNodes: ['rnn', 'transformer', 'llm'],
    videos: [
      { platform: 'bilibili', title: 'NLP Natural Language Processing', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'NLP Beginner Practice', url: 'https://www.bilibili.com/video/BV1HE411t7RN' },
      { platform: 'bilibili', title: 'Text Mining & NLP', url: 'https://www.bilibili.com/video/BV1tt4y1177u' }
    ]
  },
  {
    id: 'computer_vision',
    name: 'Computer Vision',
    category: 'domain',
    level: 5,
    importance: 4,
    description: 'Computer vision enables machines to "see" the world, including image classification, object detection, image segmentation, face recognition, and other tasks — one of the most widely applied areas of AI.',
    subTopics: ['Image Classification', 'Object Detection', 'Semantic Segmentation', 'Instance Segmentation', 'Face Recognition', 'OCR Text Recognition'],
    prerequisites: ['cnn', 'deep_learning_basics'],
    relatedNodes: ['object_detection', 'image_classification', 'gan'],
    videos: [
      { platform: 'bilibili', title: 'Computer Vision Introduction', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: 'CV Practical Tutorial', url: 'https://www.bilibili.com/video/BV1HE411t7RN' },
      { platform: 'bilibili', title: 'Deep Learning & Computer Vision', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'llm',
    name: 'Large Language Models',
    category: 'frontier',
    level: 7,
    importance: 5,
    description: 'Large Language Models (LLM) are large-scale pre-trained models based on Transformer, such as GPT and LLaMA, possessing powerful text generation, reasoning, and knowledge understanding capabilities — the hottest direction in AI today.',
    subTopics: ['Pre-training & Fine-tuning', 'Prompt Engineering', 'RLHF', 'LoRA & QLoRA', 'RAG Retrieval Augmentation', 'Agent Systems'],
    prerequisites: ['transformer', 'nlp_basics', 'deep_learning_basics'],
    relatedNodes: ['transformer', 'prompt_engineering', 'ai_agent'],
    videos: [
      { platform: 'bilibili', title: 'Large Language Model Principles', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
      { platform: 'bilibili', title: 'LLM Fine-tuning Practice', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'ChatGPT Principles Analyzed', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' }
    ]
  },
  {
    id: 'prompt_engineering',
    name: 'Prompt Engineering',
    category: 'skill',
    level: 5,
    importance: 4,
    description: 'Prompt engineering is the core skill for interacting with large language models, designing effective prompts to guide models toward high-quality outputs — an emerging critical capability in the AI era.',
    subTopics: ['Basic Prompts', 'Few-Shot Learning', 'Chain-of-Thought Prompting', 'Role-Playing Prompts', 'Structured Output', 'Prompt Optimization Strategies'],
    prerequisites: ['llm', 'nlp_basics'],
    relatedNodes: ['llm', 'ai_agent', 'ai_application'],
    videos: [
      { platform: 'bilibili', title: 'Prompt Engineering Tutorial', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
      { platform: 'bilibili', title: 'Prompt Engineering Practice', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'ChatGPT Prompt Tips', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' }
    ]
  },
  {
    id: 'ai_agent',
    name: 'AI Agents',
    category: 'frontier',
    level: 7,
    importance: 4,
    description: 'AI agents are AI systems capable of autonomously perceiving their environment, making decisions, and executing actions, combining LLMs with tool-calling capabilities to automate complex task processing.',
    subTopics: ['Agent Architecture', 'Tool Calling', 'Planning & Reasoning', 'Memory Mechanisms', 'Multi-Agent Collaboration', 'LangChain Framework'],
    prerequisites: ['llm', 'prompt_engineering', 'python_basics'],
    relatedNodes: ['llm', 'prompt_engineering', 'ai_application'],
    videos: [
      { platform: 'bilibili', title: 'AI Agent Introduction', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
      { platform: 'bilibili', title: 'LangChain Practical Tutorial', url: 'https://www.bilibili.com/video/BV1JE411g7XF' },
      { platform: 'bilibili', title: 'Build Your Own AI Agent', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' }
    ]
  },
  {
    id: 'gan',
    name: 'Generative Adversarial Networks',
    category: 'core',
    level: 6,
    importance: 3,
    description: 'Generative Adversarial Networks (GAN) consist of a generator and discriminator, generating realistic data through adversarial training, widely applied in image generation, style transfer, and data augmentation.',
    subTopics: ['GAN Principles', 'DCGAN', 'StyleGAN', 'CycleGAN', 'Conditional GAN', 'Comparison with Diffusion Models'],
    prerequisites: ['deep_learning_basics', 'cnn', 'pytorch'],
    relatedNodes: ['computer_vision', 'diffusion_model', 'image_generation'],
    videos: [
      { platform: 'bilibili', title: 'GAN Generative Adversarial Networks', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: 'GAN Practical Tutorial', url: 'https://www.bilibili.com/video/BV1HE411t7RN' },
      { platform: 'bilibili', title: 'Image Generation Technology', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'diffusion_model',
    name: 'Diffusion Models',
    category: 'frontier',
    level: 7,
    importance: 4,
    description: 'Diffusion models are the most advanced generative models today, generating high-quality images through a progressive denoising process. Stable Diffusion, DALL-E, and others are based on this technology.',
    subTopics: ['Diffusion Process', 'Denoising Networks', 'Conditional Generation', 'Stable Diffusion', 'ControlNet', 'LoRA Fine-tuning'],
    prerequisites: ['deep_learning_basics', 'cnn', 'gan'],
    relatedNodes: ['gan', 'image_generation', 'multimodal_ai'],
    videos: [
      { platform: 'bilibili', title: 'Diffusion Model Principles', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
      { platform: 'bilibili', title: 'Stable Diffusion Tutorial', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: 'AI Image Generation Technology', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'reinforcement_learning',
    name: 'Reinforcement Learning',
    category: 'core',
    level: 6,
    importance: 3,
    description: 'Reinforcement learning is a method where agents learn optimal policies through interaction with the environment, with important applications in game AI, robotics control, and recommendation systems.',
    subTopics: ['Markov Decision Processes', 'Q-Learning', 'DQN', 'Policy Gradients', 'Actor-Critic', 'PPO Algorithm'],
    prerequisites: ['machine_learning_basics', 'deep_learning_basics', 'math_foundation'],
    relatedNodes: ['ai_agent', 'game_ai', 'robotics'],
    videos: [
      { platform: 'bilibili', title: 'Reinforcement Learning Introduction', url: 'https://www.bilibili.com/video/BV164411b7dx' },
      { platform: 'bilibili', title: 'RL Practical Tutorial', url: 'https://www.bilibili.com/video/BV1aE411o7qd' },
      { platform: 'bilibili', title: 'Deep Reinforcement Learning', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'data_mining',
    name: 'Data Mining',
    category: 'domain',
    level: 4,
    importance: 3,
    description: 'Data mining is the process of discovering valuable patterns from large datasets, combining statistics, machine learning, and database technologies, applied in recommendation systems, fraud detection, and other scenarios.',
    subTopics: ['Frequent Pattern Mining', 'Association Rules', 'Anomaly Detection', 'Recommendation System Basics', 'Social Network Analysis', 'Web Mining'],
    prerequisites: ['machine_learning_basics', 'pandas', 'statistical_analysis'],
    relatedNodes: ['unsupervised_learning', 'eda', 'big_data'],
    videos: [
      { platform: 'bilibili', title: 'Data Mining Introduction', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: 'Data Mining Practice', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' },
      { platform: 'bilibili', title: 'Recommendation System Algorithms', url: 'https://www.bilibili.com/video/BV1vV4y1s7Z4' }
    ]
  },
  {
    id: 'statistical_analysis',
    name: 'Statistical Analysis Methods',
    category: 'skill',
    level: 3,
    importance: 3,
    description: 'Statistical analysis is the foundational methodology of data science, including hypothesis testing, regression analysis, and analysis of variance, providing a scientific basis for data-driven decision making.',
    subTopics: ['Descriptive Statistics', 'Hypothesis Testing', 'Regression Analysis', 'Analysis of Variance', 'Bayesian Statistics', 'Non-parametric Tests'],
    prerequisites: ['math_foundation', 'python_basics'],
    relatedNodes: ['eda', 'data_mining', 'machine_learning_basics'],
    videos: [
      { platform: 'bilibili', title: 'Statistics Introduction', url: 'https://www.bilibili.com/video/BV1ot411y7mU' },
      { platform: 'bilibili', title: 'Python Statistical Analysis', url: 'https://www.bilibili.com/video/BV1Uv4y1s7gR' },
      { platform: 'bilibili', title: 'Applied Statistical Analysis', url: 'https://www.bilibili.com/video/BV1tt4y1177u' }
    ]
  },
  {
    id: 'ai_ethics',
    name: 'AI Ethics & Safety',
    category: 'domain',
    level: 5,
    importance: 4,
    description: 'AI ethics and safety address moral standards and safety issues in AI development, including algorithmic bias, privacy protection, explainability, and AI governance — important topics for responsible AI.',
    subTopics: ['Algorithmic Bias & Fairness', 'Privacy Protection', 'Explainable AI', 'AI Safety', 'AI Governance', 'Responsible AI'],
    prerequisites: ['machine_learning_basics'],
    relatedNodes: ['ai_application', 'llm', 'ai_agent'],
    videos: [
      { platform: 'bilibili', title: 'AI Ethics Introduction', url: 'https://www.bilibili.com/video/BV164411b7dx' },
      { platform: 'bilibili', title: 'Explainable AI Tutorial', url: 'https://www.bilibili.com/video/BV1aE411o7qd' },
      { platform: 'bilibili', title: 'AI Safety & Governance', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'ai_application',
    name: 'AI Application Development',
    category: 'domain',
    level: 5,
    importance: 4,
    description: 'AI application development is the process of deploying AI models as real-world products, covering model serving, API development, frontend integration, performance optimization, and other engineering practices.',
    subTopics: ['Model Deployment', 'API Development', 'Gradio/Streamlit', 'Docker Containerization', 'Performance Optimization', 'MLOps Basics'],
    prerequisites: ['machine_learning_basics', 'deep_learning_basics', 'python_basics'],
    relatedNodes: ['ai_agent', 'llm', 'prompt_engineering'],
    videos: [
      { platform: 'bilibili', title: 'AI Application Development Practice', url: 'https://www.bilibili.com/video/BV1HE411t7RN' },
      { platform: 'bilibili', title: 'Model Deployment Tutorial', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: 'Gradio Rapid Development', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' }
    ]
  },
  {
    id: 'multimodal_ai',
    name: 'Multimodal AI',
    category: 'frontier',
    level: 7,
    importance: 4,
    description: 'Multimodal AI fuses text, image, speech, and other information modalities to achieve cross-modal understanding and generation — an important trend in AI development, exemplified by GPT-4V, Gemini, and others.',
    subTopics: ['Vision-Language Models', 'CLIP Model', 'Image-Text Generation', 'Speech Recognition & Synthesis', 'Video Understanding', 'Cross-Modal Retrieval'],
    prerequisites: ['transformer', 'cnn', 'nlp_basics'],
    relatedNodes: ['llm', 'computer_vision', 'diffusion_model'],
    videos: [
      { platform: 'bilibili', title: 'Multimodal AI Introduction', url: 'https://www.bilibili.com/video/BV1pu411o7BE' },
      { platform: 'bilibili', title: 'CLIP Model Explained', url: 'https://www.bilibili.com/video/BV1FT4y1E74V' },
      { platform: 'bilibili', title: 'Multimodal Large Models', url: 'https://www.bilibili.com/video/BV1JE411g7XF' }
    ]
  },
  {
    id: 'kaggle_competition',
    name: 'Kaggle Competition Practice',
    category: 'practice',
    level: 5,
    importance: 3,
    description: 'Kaggle is the world\'s largest data science competition platform. Participating in competitions provides practice with the complete machine learning workflow, improving data processing, model building, and teamwork skills.',
    subTopics: ['Competition Workflow', 'Data Exploration', 'Feature Engineering Practice', 'Model Ensembling', 'Submission Strategies', 'Top Solution Reproduction'],
    prerequisites: ['supervised_learning', 'feature_engineering', 'ensemble_methods'],
    relatedNodes: ['ensemble_methods', 'model_evaluation', 'ai_application'],
    videos: [
      { platform: 'bilibili', title: 'Kaggle Competition Introduction', url: 'https://www.bilibili.com/video/BV1tt4y1177u' },
      { platform: 'bilibili', title: 'Kaggle Gold Medal Solutions', url: 'https://www.bilibili.com/video/BV1hh4y1s7YD' },
      { platform: 'bilibili', title: 'Data Competition Practice', url: 'https://www.bilibili.com/video/BV1vV4y1s7Z4' }
    ]
  }
]

const categoryConfig = {
  foundation: { name: 'Fundamentals', color: '#667eea' },
  tool: { name: 'Tools & Frameworks', color: '#43e97b' },
  skill: { name: 'Core Skills', color: '#fa709a' },
  core: { name: 'Algorithm Theory', color: '#f093fb' },
  domain: { name: 'Application Domains', color: '#f5af19' },
  frontier: { name: 'Frontier Technology', color: '#667eea' },
  practice: { name: 'Practice Projects', color: '#43e97b' }
}

export { knowledgeNodes, categoryConfig }

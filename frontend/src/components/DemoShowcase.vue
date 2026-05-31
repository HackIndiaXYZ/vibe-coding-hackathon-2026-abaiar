<template>
  <div class="demo-showcase" :class="{ 'dark-mode': isDark }">
    <div class="showcase-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 1024 1024" width="20" height="20">
          <path d="M669.6 849.6L368.8 548.8c-12-12-12-32 0-44l300.8-300.8c12-12 32-12 44 0s12 32 0 44L436 526.8l277.6 278.8c12 12 12 32 0 44-6 6-14 8.4-22 8.4s-16-2.8-22-8.4z" fill="currentColor"/>
        </svg>
        Back to Home
      </button>
      <h1 class="page-title">Experience</h1>
      <p class="page-subtitle">Experience the power of AI technology firsthand — interactive demos for intuitive understanding</p>
    </div>

    <div class="demos-grid">
      <div class="demo-card featured" @click="goToDemo('digit-recognizer')">
        <div class="demo-visual digit-visual">
          <div class="digit-animation">
            <svg viewBox="0 0 80 100" class="digit-svg">
              <path d="M25 15 Q40 5 55 15 Q65 25 55 40 Q45 55 30 70 L60 70 Q65 70 65 75 L65 85 Q65 90 60 90 L20 90 Q15 90 15 85 L15 75 Q15 65 25 55 Q40 40 45 30 Q50 20 40 15 Q30 10 25 20" 
                fill="none" stroke="#43e97b" stroke-width="3" stroke-linecap="round"
                class="digit-path"/>
            </svg>
            <div class="digit-result">
              <span class="digit-label">Recognition Result</span>
              <span class="digit-value">3</span>
            </div>
          </div>
        </div>
        <div class="demo-info">
          <div class="demo-badge digit-badge">Computer Vision · GPU Accelerated</div>
          <h2 class="demo-title">Handwritten Digit Recognition</h2>
          <p class="demo-desc">Write digits on the canvas and AI recognizes them in real-time. Based on CNN convolutional neural network, trained on MNIST dataset, with NVIDIA RTX 3090 GPU-accelerated inference.</p>
          <div class="demo-tags">
            <span class="demo-tag">CNN</span>
            <span class="demo-tag">MNIST</span>
            <span class="demo-tag">GPU Accelerated</span>
            <span class="demo-tag">Real-time Interactive</span>
          </div>
          <div class="demo-tech-stack">
            <span class="tech-item">PyTorch</span>
            <span class="tech-item">CUDA</span>
            <span class="tech-item">Flask</span>
          </div>
        </div>
        <div class="demo-arrow">
          <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M365.3 197.3l285.4 285.4c12 12 12 32 0 44L365.3 812.1c-12 12-32 12-44 0s-12-32 0-44L584.7 504.7 321.3 241.3c-12-12-12-32 0-44s32-12 44 0z" fill="currentColor"/></svg>
        </div>
      </div>
    </div>

    <div class="coming-soon-section">
      <h3 class="section-title">More demos coming soon</h3>
      <div class="coming-grid">
        <div class="coming-card">
          <span class="coming-icon">🖼️</span>
          <span class="coming-name">Image Style Transfer</span>
          <span class="coming-status">In Development</span>
        </div>
        <div class="coming-card">
          <span class="coming-icon">🧠</span>
          <span class="coming-name">Neural Network Visualization</span>
          <span class="coming-status">In Development</span>
        </div>
        <div class="coming-card">
          <span class="coming-icon">🗣️</span>
          <span class="coming-name">Speech Recognition</span>
          <span class="coming-status">Planned</span>
        </div>
      </div>
    </div>

    <div class="tips-section">
      <h3 class="tips-title">Usage Tips</h3>
      <div class="tips-grid">
        <div class="tip-item">
          <span class="tip-icon">💡</span>
          <span>Handwritten digit recognition uses a real CNN model with GPU-accelerated inference</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🎯</span>
          <span>Write in the center of the canvas for best results with clear strokes</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">📚</span>
          <span>Demos include principle explanations to help you understand AI technology</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoShowcase',
  data() {
    return {
      isDark: false
    }
  },
  methods: {
    checkDarkMode() {
      this.isDark = document.documentElement.classList.contains('Dark') || document.documentElement.getAttribute('data-theme') === 'Dark'
    },
    goBack() {
      this.$router.push('/')
    },
    goToDemo(demoType) {
      this.$router.push(`/demo/${demoType}`)
    }
  },
  mounted() {
    this.checkDarkMode()
    this._darkObserver = new MutationObserver(() => { this.checkDarkMode() })
    this._darkObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
  },
  beforeUnmount() {
    if (this._darkObserver) this._darkObserver.disconnect()
  }
}
</script>

<style scoped>
.demo-showcase {
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #0d0d2b 100%);
  padding: 20px;
  color: #fff;
}

.showcase-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  color: #ccc;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.5);
  color: #fff;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #f093fb, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.page-subtitle {
  color: #999;
  font-size: 15px;
}

.demos-grid {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 28px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.demo-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #43e97b, transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.demo-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(67, 233, 123, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.demo-card:hover::before {
  opacity: 1;
}

.demo-visual {
  width: 160px;
  height: 130px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.digit-visual {
  background: linear-gradient(135deg, rgba(67, 233, 123, 0.15), rgba(56, 249, 215, 0.15));
}

.digit-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.digit-svg {
  width: 50px;
  height: 60px;
}

.digit-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: drawDigit 3s ease-in-out infinite;
}

@keyframes drawDigit {
  0% { stroke-dashoffset: 200; }
  50% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -200; }
}

.digit-result {
  display: flex;
  align-items: center;
  gap: 6px;
}

.digit-label {
  font-size: 10px;
  color: #43e97b80;
}

.digit-value {
  font-size: 22px;
  font-weight: 700;
  color: #43e97b;
  animation: resultPop 3s ease-in-out infinite;
}

@keyframes resultPop {
  0%, 40% { opacity: 0; transform: scale(0.5); }
  60% { opacity: 1; transform: scale(1.1); }
  80%, 100% { opacity: 1; transform: scale(1); }
}

.demo-info {
  flex: 1;
  min-width: 0;
}

.demo-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 8px;
}

.digit-badge {
  background: rgba(67, 233, 123, 0.2);
  color: #43e97b;
}

.demo-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #eee;
}

.demo-desc {
  font-size: 14px;
  color: #999;
  line-height: 1.6;
  margin-bottom: 12px;
}

.demo-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.demo-tag {
  padding: 3px 10px;
  border-radius: 8px;
  font-size: 12px;
  background: rgba(67, 233, 123, 0.1);
  color: #43e97b;
  border: 1px solid rgba(67, 233, 123, 0.2);
}

.demo-tech-stack {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tech-item {
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  background: rgba(255, 255, 255, 0.06);
  color: #aaa;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.demo-arrow {
  color: #555;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.demo-card:hover .demo-arrow {
  color: #43e97b;
  transform: translateX(4px);
}

.coming-soon-section {
  max-width: 900px;
  margin: 40px auto 0;
}

.section-title {
  font-size: 16px;
  color: #666;
  margin-bottom: 14px;
  text-align: center;
}

.coming-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.coming-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  opacity: 0.5;
}

.coming-icon {
  font-size: 20px;
}

.coming-name {
  font-size: 13px;
  color: #888;
  flex: 1;
}

.coming-status {
  font-size: 11px;
  color: #555;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
}

.tips-section {
  max-width: 900px;
  margin: 30px auto 0;
}

.tips-title {
  font-size: 16px;
  color: #888;
  margin-bottom: 14px;
  text-align: center;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  font-size: 13px;
  color: #999;
}

.tip-icon {
  font-size: 18px;
}

@media (max-width: 768px) {
  .demo-card {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .demo-visual {
    width: 100%;
    height: 80px;
  }

  .demo-arrow {
    display: none;
  }

  .demo-tags, .demo-tech-stack {
    justify-content: center;
  }

  .coming-grid {
    grid-template-columns: 1fr;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 26px;
  }

  .back-btn {
    position: static;
    margin-bottom: 12px;
    display: inline-flex;
  }
}

.demo-showcase:not(.dark-mode) {
  background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%);
  color: #1a1a2e;
}

.demo-showcase:not(.dark-mode) .back-btn {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
  color: #4a4a6a;
}

.demo-showcase:not(.dark-mode) .back-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  color: #1a1a2e;
}

.demo-showcase:not(.dark-mode) .page-subtitle {
  color: #6b7280;
}

.demo-showcase:not(.dark-mode) .demo-card {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

.demo-showcase:not(.dark-mode) .demo-card:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(67, 233, 123, 0.4);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.demo-showcase:not(.dark-mode) .demo-title {
  color: #1a1a2e;
}

.demo-showcase:not(.dark-mode) .demo-desc {
  color: #6b7280;
}

.demo-showcase:not(.dark-mode) .demo-tag {
  background: rgba(67, 233, 123, 0.08);
  color: #2d9a5e;
  border-color: rgba(67, 233, 123, 0.2);
}

.demo-showcase:not(.dark-mode) .tech-item {
  background: rgba(0, 0, 0, 0.04);
  color: #6b7280;
  border-color: rgba(0, 0, 0, 0.08);
}

.demo-showcase:not(.dark-mode) .demo-arrow {
  color: #aaa;
}

.demo-showcase:not(.dark-mode) .section-title {
  color: #6b7280;
}

.demo-showcase:not(.dark-mode) .coming-card {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(0, 0, 0, 0.06);
}

.demo-showcase:not(.dark-mode) .coming-name {
  color: #4a4a6a;
}

.demo-showcase:not(.dark-mode) .coming-status {
  color: #6b7280;
  background: rgba(0, 0, 0, 0.04);
}

.demo-showcase:not(.dark-mode) .tips-title {
  color: #6b7280;
}

.demo-showcase:not(.dark-mode) .tip-item {
  background: rgba(255, 255, 255, 0.6);
  border-color: rgba(0, 0, 0, 0.06);
  color: #4a4a6a;
}

.demo-showcase:not(.dark-mode) .digit-visual {
  background: linear-gradient(135deg, rgba(67, 233, 123, 0.1), rgba(56, 249, 215, 0.1));
}

.demo-showcase:not(.dark-mode) .digit-badge {
  background: rgba(67, 233, 123, 0.12);
  color: #2d9a5e;
}
</style>

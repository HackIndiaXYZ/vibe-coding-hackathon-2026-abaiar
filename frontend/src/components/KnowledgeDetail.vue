<template>
  <div class="knowledge-detail" :class="{ 'dark-mode': isDark }" v-if="nodeData">
    <div class="detail-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 1024 1024" width="20" height="20">
          <path d="M669.6 849.6L368.8 548.8c-12-12-12-32 0-44l300.8-300.8c12-12 32-12 44 0s12 32 0 44L436 526.8l277.6 278.8c12 12 12 32 0 44-6 6-14 8.4-22 8.4s-16-2.8-22-8.4z" fill="currentColor"/>
        </svg>
        Back to Roadmap
      </button>
    </div>

    <div class="detail-content">
      <div class="detail-hero" :style="{ background: `linear-gradient(135deg, ${levelColor}30, ${levelColor}10)` }">
        <div class="hero-badge" :style="{ backgroundColor: levelColor }">
          Stage {{ nodeData.level }}
        </div>
        <h1 class="hero-title">{{ nodeData.name }}</h1>
        <div class="hero-meta">
          <span class="category-badge" :style="{ backgroundColor: categoryColor + '25', color: categoryColor, borderColor: categoryColor + '50' }">
            {{ categoryName }}
          </span>
          <span class="importance-badge">
            <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= nodeData.importance }">★</span>
            <span class="importance-text">Importance {{ nodeData.importance }}/5</span>
          </span>
        </div>
      </div>

      <div class="detail-body">
        <div class="detail-main">
          <section class="detail-section">
            <h2 class="section-heading">
              <svg viewBox="0 0 1024 1024" width="20" height="20"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="currentColor"/><path d="M464 336a48 48 0 1 1 96 0 48 48 0 1 1-96 0z m72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" fill="currentColor"/></svg>
              Knowledge Overview
            </h2>
            <p class="description-text">{{ nodeData.description }}</p>
          </section>

          <section class="detail-section">
            <h2 class="section-heading">
              <svg viewBox="0 0 1024 1024" width="20" height="20"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136V232h752v560z" fill="currentColor"/><path d="M610.3 476h123.4c1.3 0 2.3-3.6 2.3-8v-48c0-4.4-1-8-2.3-8H610.3c-1.3 0-2.3 3.6-2.3 8v48c0 4.4 1 8 2.3 8z" fill="currentColor"/></svg>
              Sub-topics
            </h2>
            <div class="sub-topics">
              <div
                v-for="(topic, index) in nodeData.subTopics"
                :key="index"
                class="sub-topic-item"
                :style="{ animationDelay: `${index * 0.05}s` }"
              >
                <span class="topic-index">{{ index + 1 }}</span>
                <span class="topic-name">{{ topic }}</span>
              </div>
            </div>
          </section>

          <section class="detail-section">
            <h2 class="section-heading">
              <svg viewBox="0 0 1024 1024" width="20" height="20"><path d="M512 128c-212.1 0-384 171.9-384 384s171.9 384 384 384 384-171.9 384-384-171.9-384-384-384z m0 704c-176.7 0-320-143.3-320-320s143.3-320 320-320 320 143.3 320 320-143.3 320-320 320z" fill="currentColor"/><path d="M512 256c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256-114.6-256-256-256z m0 448c-106 0-192-86-192-192s86-192 192-192 192 86 192 192-86 192-192 192z" fill="currentColor"/></svg>
              Related Knowledge
            </h2>
            <div class="relations-grid">
              <div class="relation-group" v-if="prerequisiteNodes.length > 0">
                <h3 class="relation-label prerequisite-label">Prerequisites</h3>
                <div class="relation-tags">
                  <button
                    v-for="pre in prerequisiteNodes"
                    :key="pre.id"
                    class="relation-tag prerequisite-tag"
                    @click="navigateToNode(pre.id)"
                  >
                    {{ pre.name }}
                  </button>
                </div>
              </div>
              <div class="relation-group" v-if="relatedNodeData.length > 0">
                <h3 class="relation-label related-label">Related Topics</h3>
                <div class="relation-tags">
                  <button
                    v-for="rel in relatedNodeData"
                    :key="rel.id"
                    class="relation-tag related-tag"
                    @click="navigateToNode(rel.id)"
                  >
                    {{ rel.name }}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section class="detail-section">
            <h2 class="section-heading">
              <svg viewBox="0 0 1024 1024" width="20" height="20"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136V232h752v560z" fill="currentColor"/><path d="M610.3 476h123.4c1.3 0 2.3-3.6 2.3-8v-48c0-4.4-1-8-2.3-8H610.3c-1.3 0-2.3 3.6-2.3 8v48c0 4.4 1 8 2.3 8z m-220.8-8v-48c0-4.4 1-8 2.3-8h123.4c1.3 0 2.3 3.6 2.3 8v48c0 4.4-1 8-2.3 8H391.8c-1.3 0-2.3-3.6-2.3-8z" fill="currentColor"/></svg>
              Recommended Video Resources
            </h2>
            <div class="video-list">
              <a
                v-for="(video, index) in nodeData.videos"
                :key="index"
                :href="video.url"
                target="_blank"
                rel="noopener noreferrer"
                class="video-card"
                :style="{ animationDelay: `${index * 0.08}s` }"
              >
                <div class="video-platform-icon" :class="video.platform">
                  <svg v-if="video.platform === 'bilibili'" viewBox="0 0 1024 1024" width="20" height="20">
                    <path d="M777.2 274.2H649.4l47.6-47.6c6.4-6.4 6.4-16.8 0-23.2s-16.8-6.4-23.2 0l-70.8 70.8H421l-70.8-70.8c-6.4-6.4-16.8-6.4-23.2 0s-6.4 16.8 0 23.2l47.6 47.6H246.8c-50.4 0-91.2 40.8-91.2 91.2v317.2c0 50.4 40.8 91.2 91.2 91.2h530.4c50.4 0 91.2-40.8 91.2-91.2V365.4c0-50.4-40.8-91.2-91.2-91.2z m34 408.4c0 18.8-15.2 34-34 34H246.8c-18.8 0-34-15.2-34-34V365.4c0-18.8 15.2-34 34-34h530.4c18.8 0 34 15.2 34 34v317.2z" fill="currentColor"/>
                    <path d="M420 440m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z" fill="currentColor"/>
                    <path d="M604 440m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z" fill="currentColor"/>
                  </svg>
                </div>
                <div class="video-info">
                  <div class="video-title">{{ video.title }}</div>
                  <div class="video-platform-name">{{ getPlatformName(video.platform) }}</div>
                </div>
                <div class="video-arrow">
                  <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M365.3 197.3l285.4 285.4c12 12 12 32 0 44L365.3 812.1c-12 12-32 12-44 0s-12-32 0-44L584.7 504.7 321.3 241.3c-12-12-12-32 0-44s32-12 44 0z" fill="currentColor"/></svg>
                </div>
              </a>
            </div>
          </section>
        </div>

        <aside class="detail-sidebar">
          <div class="sidebar-card learning-path-card">
            <h3 class="sidebar-title">Learning Path</h3>
            <div class="path-steps">
              <div
                v-for="(pre, index) in prerequisiteNodes"
                :key="'pre-' + pre.id"
                class="path-step"
                :style="{ borderLeftColor: getLevelColor(pre.level) }"
                @click="navigateToNode(pre.id)"
              >
                <div class="step-connector" v-if="index < prerequisiteNodes.length"></div>
                <span class="step-name">{{ pre.name }}</span>
                <span class="step-level">Stage {{ pre.level }}</span>
              </div>
              <div class="path-step current-step" :style="{ borderLeftColor: levelColor }">
                <div class="step-connector"></div>
                <span class="step-name">{{ nodeData.name }}</span>
                <span class="step-level current-level">Current</span>
              </div>
              <div
                v-for="(rel, index) in nextNodes"
                :key="'next-' + rel.id"
                class="path-step"
                :style="{ borderLeftColor: getLevelColor(rel.level) }"
                @click="navigateToNode(rel.id)"
              >
                <div class="step-connector" v-if="index === 0"></div>
                <span class="step-name">{{ rel.name }}</span>
                <span class="step-level">Stage {{ rel.level }}</span>
              </div>
            </div>
          </div>

          <div class="sidebar-card">
            <h3 class="sidebar-title">Quick Jump</h3>
            <div class="quick-links">
              <button
                v-for="node in allNodes.slice(0, 10)"
                :key="node.id"
                class="quick-link"
                :class="{ active: node.id === nodeData.id }"
                @click="navigateToNode(node.id)"
              >
                {{ node.name }}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>

  <div class="not-found" :class="{ 'dark-mode': isDark }" v-else>
    <div class="not-found-content">
      <h2>Knowledge Point Not Found</h2>
      <p>Please check if the URL is correct</p>
      <button class="back-btn" @click="$router.push('/learn')">Back to Roadmap</button>
    </div>
  </div>
</template>

<script>
import { knowledgeNodes, categoryConfig } from '../data/knowledgeData'

const levelColors = {
  1: '#43e97b',
  2: '#38f9d7',
  3: '#667eea',
  4: '#f093fb',
  5: '#f5af19',
  6: '#fa709a',
  7: '#e44d26'
}

export default {
  name: 'KnowledgeDetail',
  data() {
    return {
      allNodes: knowledgeNodes,
      categoryConfig,
      isDark: false
    }
  },
  computed: {
    nodeId() {
      return this.$route.params.id
    },
    nodeData() {
      return knowledgeNodes.find(n => n.id === this.nodeId)
    },
    levelColor() {
      return levelColors[this.nodeData?.level] || '#667eea'
    },
    categoryColor() {
      return categoryConfig[this.nodeData?.category]?.color || '#667eea'
    },
    categoryName() {
      return categoryConfig[this.nodeData?.category]?.name || this.nodeData?.category
    },
    prerequisiteNodes() {
      if (!this.nodeData) return []
      return this.nodeData.prerequisites
        .map(id => knowledgeNodes.find(n => n.id === id))
        .filter(Boolean)
    },
    relatedNodeData() {
      if (!this.nodeData) return []
      return this.nodeData.relatedNodes
        .map(id => knowledgeNodes.find(n => n.id === id))
        .filter(Boolean)
    },
    nextNodes() {
      if (!this.nodeData) return []
      return knowledgeNodes.filter(n => n.prerequisites.includes(this.nodeId))
    }
  },
  methods: {
    checkDarkMode() {
      this.isDark = document.documentElement.classList.contains('Dark') || document.documentElement.getAttribute('data-theme') === 'Dark'
    },
    goBack() {
      this.$router.push('/learn')
    },
    navigateToNode(id) {
      this.$router.push(`/learn/knowledge/${id}`)
    },
    getLevelColor(level) {
      return levelColors[level] || '#667eea'
    },
    getPlatformName(platform) {
      const names = { bilibili: 'Bilibili', youtube: 'YouTube', mooc: 'Chinese University MOOC' }
      return names[platform] || platform
    }
  },
  watch: {
    nodeId() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  mounted() {
    this.checkDarkMode()
    this._darkObserver = new MutationObserver(() => { this.checkDarkMode() })
    this._darkObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    window.scrollTo({ top: 0 })
  },
  beforeUnmount() {
    if (this._darkObserver) this._darkObserver.disconnect()
  }
}
</script>

<style scoped>
.knowledge-detail {
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #0d0d2b 100%);
  color: #fff;
}

.detail-header {
  padding: 16px 20px;
}

.back-btn {
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

.detail-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.detail-hero {
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.hero-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.category-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  border: 1px solid;
}

.importance-badge {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star {
  color: #444;
  font-size: 16px;
  transition: color 0.2s;
}

.star.filled {
  color: #f5af19;
}

.importance-text {
  color: #999;
  font-size: 12px;
  margin-left: 6px;
}

.detail-body {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
}

.detail-main {
  min-width: 0;
}

.detail-section {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 20px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #ddd;
  margin-bottom: 16px;
}

.section-heading svg {
  color: #667eea;
}

.description-text {
  color: #bbb;
  line-height: 1.8;
  font-size: 15px;
}

.sub-topics {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.sub-topic-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  animation: fadeInUp 0.4s ease forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.topic-index {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.topic-name {
  color: #ccc;
  font-size: 14px;
}

.relations-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.relation-label {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
}

.prerequisite-label {
  color: #43e97b;
}

.related-label {
  color: #f093fb;
}

.relation-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.relation-tag {
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid;
}

.prerequisite-tag {
  background: rgba(67, 233, 123, 0.1);
  border-color: rgba(67, 233, 123, 0.3);
  color: #43e97b;
}

.prerequisite-tag:hover {
  background: rgba(67, 233, 123, 0.2);
  border-color: rgba(67, 233, 123, 0.5);
}

.related-tag {
  background: rgba(240, 147, 251, 0.1);
  border-color: rgba(240, 147, 251, 0.3);
  color: #f093fb;
}

.related-tag:hover {
  background: rgba(240, 147, 251, 0.2);
  border-color: rgba(240, 147, 251, 0.5);
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.video-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s ease;
  animation: fadeInUp 0.4s ease forwards;
  opacity: 0;
}

.video-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateX(4px);
}

.video-platform-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.video-platform-icon.bilibili {
  background: rgba(0, 161, 214, 0.2);
  color: #00a1d6;
}

.video-info {
  flex: 1;
  min-width: 0;
}

.video-title {
  font-size: 14px;
  font-weight: 500;
  color: #ddd;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video-platform-name {
  font-size: 12px;
  color: #888;
  margin-top: 2px;
}

.video-arrow {
  color: #666;
  flex-shrink: 0;
}

.detail-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 20px;
}

.sidebar-title {
  font-size: 15px;
  font-weight: 600;
  color: #ddd;
  margin-bottom: 14px;
}

.path-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.path-step {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-left: 3px solid;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.path-step:hover {
  background: rgba(255, 255, 255, 0.06);
}

.step-name {
  font-size: 13px;
  color: #ccc;
}

.step-level {
  font-size: 11px;
  color: #888;
  padding: 2px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
}

.current-step {
  background: rgba(102, 126, 234, 0.1);
}

.current-level {
  background: rgba(102, 126, 234, 0.3);
  color: #667eea;
}

.step-connector {
  position: absolute;
  top: -4px;
  left: -1px;
  width: 1px;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
}

.quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.quick-link {
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #aaa;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-link:hover {
  background: rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
  color: #ccc;
}

.quick-link.active {
  background: rgba(102, 126, 234, 0.25);
  border-color: rgba(102, 126, 234, 0.5);
  color: #667eea;
}

.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #0d0d2b 100%);
}

.not-found-content {
  text-align: center;
  color: #fff;
}

.not-found-content h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.not-found-content p {
  color: #999;
  margin-bottom: 20px;
}

@media (max-width: 900px) {
  .detail-body {
    grid-template-columns: 1fr;
  }

  .detail-sidebar {
    order: -1;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 24px;
  }

  .detail-hero {
    padding: 20px;
  }

  .detail-section {
    padding: 16px;
  }

  .sub-topics {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 20px;
  }

  .hero-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

.knowledge-detail:not(.dark-mode) {
  background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%);
  color: #1a1a2e;
}

.knowledge-detail:not(.dark-mode) .back-btn {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
  color: #4a4a6a;
}

.knowledge-detail:not(.dark-mode) .back-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  color: #1a1a2e;
}

.knowledge-detail:not(.dark-mode) .detail-hero {
  border-color: rgba(0, 0, 0, 0.08);
}

.knowledge-detail:not(.dark-mode) .hero-title {
  color: #1a1a2e;
}

.knowledge-detail:not(.dark-mode) .importance-text {
  color: #6b7280;
}

.knowledge-detail:not(.dark-mode) .detail-section {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
}

.knowledge-detail:not(.dark-mode) .section-heading {
  color: #1a1a2e;
}

.knowledge-detail:not(.dark-mode) .description-text {
  color: #4a4a6a;
}

.knowledge-detail:not(.dark-mode) .sub-topic-item {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
}

.knowledge-detail:not(.dark-mode) .topic-name {
  color: #4a4a6a;
}

.knowledge-detail:not(.dark-mode) .video-card {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
  color: #1a1a2e;
}

.knowledge-detail:not(.dark-mode) .video-card:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(102, 126, 234, 0.3);
}

.knowledge-detail:not(.dark-mode) .video-title {
  color: #1a1a2e;
}

.knowledge-detail:not(.dark-mode) .video-platform-name {
  color: #6b7280;
}

.knowledge-detail:not(.dark-mode) .video-arrow {
  color: #999;
}

.knowledge-detail:not(.dark-mode) .sidebar-card {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
}

.knowledge-detail:not(.dark-mode) .sidebar-title {
  color: #1a1a2e;
}

.knowledge-detail:not(.dark-mode) .step-name {
  color: #4a4a6a;
}

.knowledge-detail:not(.dark-mode) .step-level {
  color: #6b7280;
  background: rgba(0, 0, 0, 0.05);
}

.knowledge-detail:not(.dark-mode) .path-step:hover {
  background: rgba(0, 0, 0, 0.04);
}

.knowledge-detail:not(.dark-mode) .quick-link {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.08);
  color: #4a4a6a;
}

.knowledge-detail:not(.dark-mode) .quick-link:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  color: #1a1a2e;
}

.not-found:not(.dark-mode) {
  background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%);
}

.not-found:not(.dark-mode) .not-found-content {
  color: #1a1a2e;
}

.not-found:not(.dark-mode) .not-found-content p {
  color: #6b7280;
}

.knowledge-detail:not(.dark-mode) .star {
  color: #ddd;
}
</style>

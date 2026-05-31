<template>
  <div class="learn-roadmap" :class="{ 'dark-mode': isDark }">
    <div class="roadmap-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 1024 1024" width="20" height="20">
          <path d="M669.6 849.6L368.8 548.8c-12-12-12-32 0-44l300.8-300.8c12-12 32-12 44 0s12 32 0 44L436 526.8l277.6 278.8c12 12 12 32 0 44-6 6-14 8.4-22 8.4s-16-2.8-22-8.4z" fill="currentColor"/>
        </svg>
        Back to Home
      </button>
      <h1 class="page-title">AI Learning Roadmap</h1>
      <p class="page-subtitle">A complete knowledge system from zero to advanced AI algorithms</p>
    </div>

    <div class="category-filter">
      <button
        v-for="(config, key) in categoryConfig"
        :key="key"
        class="filter-btn"
        :class="{ active: activeCategory === key }"
        :style="activeCategory === key ? { backgroundColor: config.color, borderColor: config.color } : { color: config.color, borderColor: config.color + '60' }"
        @click="toggleCategory(key)"
      >
        {{ config.name }}
      </button>
      <button
        class="filter-btn reset-btn"
        :class="{ active: activeCategory === null }"
        @click="activeCategory = null"
      >
        Show All
      </button>
    </div>

    <div class="chart-container" ref="chartContainer"></div>

    <div class="level-legend">
      <div class="legend-title">Learning Stages</div>
      <div class="legend-items">
        <div class="legend-item" v-for="level in levelConfig" :key="level.value">
          <span class="legend-dot" :style="{ backgroundColor: level.color }"></span>
          <span class="legend-text">{{ level.label }}</span>
        </div>
      </div>
    </div>

    <div class="node-list-section">
      <h2 class="section-title">Knowledge Index</h2>
      <div class="node-grid">
        <div
          v-for="node in filteredNodes"
          :key="node.id"
          class="node-card"
          :style="{ borderLeftColor: categoryConfig[node.category]?.color || '#667eea' }"
          @click="goToDetail(node.id)"
        >
          <div class="node-card-header">
            <span class="node-name">{{ node.name }}</span>
            <span class="node-importance">
              <span v-for="i in node.importance" :key="i" class="star">★</span>
            </span>
          </div>
          <div class="node-card-body">
            <span class="node-category-tag" :style="{ backgroundColor: (categoryConfig[node.category]?.color || '#667eea') + '20', color: categoryConfig[node.category]?.color || '#667eea' }">
              {{ categoryConfig[node.category]?.name || node.category }}
            </span>
            <span class="node-level-tag">Stage {{ node.level }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { knowledgeNodes, categoryConfig } from '../data/knowledgeData'

export default {
  name: 'LearnRoadmap',
  data() {
    return {
      activeCategory: null,
      isDark: false,
      categoryConfig,
      chart: null,
      levelConfig: [
        { value: 1, label: 'Fundamentals', color: '#43e97b' },
        { value: 2, label: 'Tool Mastery', color: '#38f9d7' },
        { value: 3, label: 'Core Skills', color: '#667eea' },
        { value: 4, label: 'Advanced Algorithms', color: '#f093fb' },
        { value: 5, label: 'Advanced Applications', color: '#f5af19' },
        { value: 6, label: 'Frontier Research', color: '#fa709a' },
        { value: 7, label: 'Cutting Edge', color: '#e44d26' }
      ]
    }
  },
  computed: {
    filteredNodes() {
      if (!this.activeCategory) return knowledgeNodes
      return knowledgeNodes.filter(n => n.category === this.activeCategory)
    }
  },
  watch: {
    isDark() {
      this.updateChart()
    }
  },
  methods: {
    checkDarkMode() {
      this.isDark = document.documentElement.classList.contains('Dark') || document.documentElement.getAttribute('data-theme') === 'Dark'
    },
    goBack() {
      this.$router.push('/')
    },
    goToDetail(nodeId) {
      this.$router.push(`/learn/knowledge/${nodeId}`)
    },
    toggleCategory(key) {
      this.activeCategory = this.activeCategory === key ? null : key
      this.updateChart()
    },
    getLevelColor(level) {
      const cfg = this.levelConfig.find(l => l.value === level)
      return cfg ? cfg.color : '#667eea'
    },
    initChart() {
      const container = this.$refs.chartContainer
      if (!container) return

      this.chart = echarts.init(container)
      this.updateChart()

      this.chart.on('click', (params) => {
        if (params.data && params.data.id) {
          this.goToDetail(params.data.id)
        }
      })

      window.addEventListener('resize', this.handleResize)
    },
    handleResize() {
      if (this.chart) {
        this.chart.resize()
      }
    },
    updateChart() {
      if (!this.chart) return

      const filteredIds = this.activeCategory
        ? knowledgeNodes.filter(n => n.category === this.activeCategory).map(n => n.id)
        : null

      const nodes = knowledgeNodes.map(node => {
        const isVisible = !filteredIds || filteredIds.includes(node.id)
        const color = this.getLevelColor(node.level)
        const size = 20 + node.importance * 8

        return {
          id: node.id,
          name: node.name,
          symbolSize: size,
          itemStyle: {
            color: isVisible ? color : color + '30',
            borderColor: isVisible ? (this.isDark ? '#fff' : '#1a1a2e') : (this.isDark ? '#fff3' : 'rgba(26, 26, 46, 0.2)'),
            borderWidth: 2,
            shadowBlur: isVisible ? 10 : 0,
            shadowColor: color + '80'
          },
          label: {
            show: isVisible,
            fontSize: 12,
            color: isVisible ? (this.isDark ? '#fff' : '#1a1a2e') : (this.isDark ? '#fff8' : 'rgba(26, 26, 46, 0.5)'),
            fontWeight: 'bold',
            textShadowBlur: 4,
            textShadowColor: this.isDark ? '#00000080' : 'rgba(255, 255, 255, 0.8)'
          },
          data: node,
          category: node.level - 1
        }
      })

      const links = []
      knowledgeNodes.forEach(node => {
        if (filteredIds && !filteredIds.includes(node.id)) return
        node.prerequisites.forEach(preId => {
          if (filteredIds && !filteredIds.includes(preId)) return
          links.push({
            source: preId,
            target: node.id,
            lineStyle: {
              color: this.isDark ? '#ffffff30' : 'rgba(0, 0, 0, 0.15)',
              width: 1.5,
              curveness: 0.2
            }
          })
        })
        node.relatedNodes.forEach(relId => {
          if (filteredIds && !filteredIds.includes(relId)) return
          const exists = links.find(l =>
            (l.source === relId && l.target === node.id) ||
            (l.source === node.id && l.target === relId)
          )
          if (!exists) {
            links.push({
              source: node.id,
              target: relId,
              lineStyle: {
                color: this.isDark ? '#ffffff15' : 'rgba(0, 0, 0, 0.08)',
                width: 1,
                curveness: 0.3,
                type: 'dashed'
              }
            })
          }
        })
      })

      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: this.isDark ? 'rgba(20, 20, 40, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: this.isDark ? '#667eea60' : 'rgba(102, 126, 234, 0.2)',
          borderWidth: 1,
          padding: [12, 16],
          textStyle: {
            color: this.isDark ? '#fff' : '#1a1a2e',
            fontSize: 13
          },
          formatter: (params) => {
            if (params.dataType === 'node' && params.data.data) {
              const d = params.data.data
              const stars = '★'.repeat(d.importance) + '☆'.repeat(5 - d.importance)
              const catName = categoryConfig[d.category]?.name || d.category
              return `<div style="max-width:280px">
                <div style="font-size:16px;font-weight:bold;margin-bottom:8px;color:${this.getLevelColor(d.level)}">${d.name}</div>
                <div style="margin-bottom:6px">${stars}</div>
                <div style="color:${this.isDark ? '#aaa' : '#6b7280'};margin-bottom:6px">Category: ${catName} | Stage: ${d.level}</div>
                <div style="color:${this.isDark ? '#ccc' : '#888'};line-height:1.5">${d.description.substring(0, 80)}...</div>
                <div style="color:#667eea;margin-top:8px">Click for details →</div>
              </div>`
            }
            return ''
          }
        },
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          type: 'graph',
          layout: 'force',
          data: nodes,
          links: links,
          categories: this.levelConfig.map(l => ({ name: l.label })),
          roam: true,
          draggable: true,
          force: {
            repulsion: 350,
            gravity: 0.08,
            edgeLength: [80, 200],
            friction: 0.6
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: { width: 3, color: '#667eea' },
            itemStyle: {
              shadowBlur: 20,
              shadowColor: '#667eea80'
            }
          },
          lineStyle: { opacity: 0.9 },
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: [0, 8],
          label: {
            position: 'bottom',
            distance: 5
          }
        }]
      }

      this.chart.setOption(option, true)
    }
  },
  mounted() {
    this.checkDarkMode()
    this._darkObserver = new MutationObserver(() => { this.checkDarkMode() })
    this._darkObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeUnmount() {
    if (this._darkObserver) this._darkObserver.disconnect()
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.learn-roadmap {
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #0d0d2b 100%);
  padding: 20px;
  color: #fff;
}

.roadmap-header {
  text-align: center;
  margin-bottom: 20px;
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
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.page-subtitle {
  color: #999;
  font-size: 14px;
}

.category-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid;
  color: #ccc;
}

.filter-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.filter-btn.active {
  color: #fff;
}

.reset-btn {
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: #aaa !important;
}

.reset-btn.active {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  color: #fff !important;
}

.chart-container {
  width: 100%;
  height: 600px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 30px;
}

.level-legend {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.legend-title {
  font-size: 14px;
  color: #999;
  margin-right: 8px;
}

.legend-items {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-text {
  font-size: 12px;
  color: #bbb;
}

.node-list-section {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #ddd;
  text-align: center;
}

.node-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}

.node-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 3px solid;
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.node-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.node-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.node-name {
  font-size: 15px;
  font-weight: 600;
  color: #eee;
}

.star {
  color: #f5af19;
  font-size: 12px;
}

.node-card-body {
  display: flex;
  align-items: center;
  gap: 8px;
}

.node-category-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
}

.node-level-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: #aaa;
}

@media (max-width: 768px) {
  .learn-roadmap {
    padding: 12px;
  }

  .page-title {
    font-size: 22px;
  }

  .chart-container {
    height: 400px;
  }

  .back-btn {
    position: static;
    margin-bottom: 12px;
    display: inline-flex;
  }

  .roadmap-header {
    text-align: center;
  }

  .node-grid {
    grid-template-columns: 1fr;
  }

  .level-legend {
    gap: 10px;
  }

  .legend-items {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .chart-container {
    height: 300px;
  }

  .category-filter {
    gap: 6px;
  }

  .filter-btn {
    padding: 4px 10px;
    font-size: 12px;
  }
}

.learn-roadmap:not(.dark-mode) {
  background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%);
  color: #1a1a2e;
}

.learn-roadmap:not(.dark-mode) .back-btn {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
  color: #4a4a6a;
}

.learn-roadmap:not(.dark-mode) .back-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  color: #1a1a2e;
}

.learn-roadmap:not(.dark-mode) .page-subtitle {
  color: #6b7280;
}

.learn-roadmap:not(.dark-mode) .filter-btn {
  background: rgba(0, 0, 0, 0.03);
  color: #4a4a6a;
}

.learn-roadmap:not(.dark-mode) .filter-btn:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.learn-roadmap:not(.dark-mode) .reset-btn {
  border-color: rgba(0, 0, 0, 0.15) !important;
  color: #6b7280 !important;
}

.learn-roadmap:not(.dark-mode) .reset-btn.active {
  background: rgba(0, 0, 0, 0.08) !important;
  border-color: rgba(0, 0, 0, 0.2) !important;
  color: #1a1a2e !important;
}

.learn-roadmap:not(.dark-mode) .chart-container {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

.learn-roadmap:not(.dark-mode) .legend-title {
  color: #6b7280;
}

.learn-roadmap:not(.dark-mode) .legend-text {
  color: #4a4a6a;
}

.learn-roadmap:not(.dark-mode) .section-title {
  color: #1a1a2e;
}

.learn-roadmap:not(.dark-mode) .node-card {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

.learn-roadmap:not(.dark-mode) .node-card:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.learn-roadmap:not(.dark-mode) .node-name {
  color: #1a1a2e;
}

.learn-roadmap:not(.dark-mode) .node-level-tag {
  background: rgba(0, 0, 0, 0.05);
  color: #6b7280;
}
</style>

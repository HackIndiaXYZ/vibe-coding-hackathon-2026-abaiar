<template>
  <div class="quiz-report" :class="{ 'dark-mode': isDark }">
    <div class="report-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 1024 1024" width="20" height="20">
          <path d="M669.6 849.6L368.8 548.8c-12-12-12-32 0-44l300.8-300.8c12-12 32-12 44 0s12 32 0 44L436 526.8l277.6 278.8c12 12 12 32 0 44-6 6-14 8.4-22 8.4s-16-2.8-22-8.4z" fill="currentColor"/>
        </svg>
        Back to Practice
      </button>
      <h1 class="page-title">Quiz Report</h1>
      <p class="page-subtitle">AI-powered analysis of your learning performance for continuous improvement</p>
    </div>

    <div class="report-content" v-if="results">
      <div class="score-section">
        <div class="score-circle-wrapper">
          <svg class="score-circle-svg" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color: #43e97b" />
                <stop offset="100%" style="stop-color: #38f9d7" />
              </linearGradient>
            </defs>
            <circle class="score-bg" cx="100" cy="100" r="85" />
            <circle
              class="score-progress"
              cx="100" cy="100" r="85"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashOffset"
              stroke="url(#scoreGradient)"
            />
          </svg>
          <div class="score-text">
            <span class="score-percent">{{ percentage }}%</span>
            <span class="score-label">Score Rate</span>
          </div>
        </div>
        <div class="score-details">
          <div class="score-fraction">
            <span class="fraction-value">{{ results.score }}</span>
            <span class="fraction-divider">/</span>
            <span class="fraction-total">{{ results.max_score }}</span>
          </div>
          <div class="score-stats">
            <div class="stat-item">
              <span class="stat-icon correct-icon">✓</span>
              <span class="stat-text">Correct <strong>{{ correctCount }}</strong> / {{ results.questions ? results.questions.length : 0 }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-icon accuracy-icon">%</span>
              <span class="stat-text">Accuracy <strong>{{ percentage }}%</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div class="ai-report-section" v-if="report">
        <h2 class="section-heading">
          <svg viewBox="0 0 1024 1024" width="22" height="22">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="currentColor"/>
            <path d="M512 256c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256-114.6-256-256-256z m0 448c-106 0-192-86-192-192s86-192 192-192 192 86 192 192-86 192-192 192z" fill="currentColor"/>
            <path d="M464 336a48 48 0 1 1 96 0 48 48 0 1 1-96 0z m72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" fill="currentColor"/>
          </svg>
          AI Learning Report
        </h2>

        <div class="report-summary" v-if="report.summary">
          <p class="summary-text">{{ report.summary }}</p>
        </div>

        <div class="report-cards">
          <div class="report-card weak-points" v-if="report.weak_points && report.weak_points.length">
            <h3 class="card-title">
              <span class="card-indicator red"></span>
              Weak Areas
            </h3>
            <ul class="card-list">
              <li v-for="(item, index) in report.weak_points" :key="'weak-' + index">{{ item }}</li>
            </ul>
          </div>

          <div class="report-card suggestions" v-if="report.suggestions && report.suggestions.length">
            <h3 class="card-title">
              <span class="card-indicator green"></span>
              Improvement Suggestions
            </h3>
            <ul class="card-list">
              <li v-for="(item, index) in report.suggestions" :key="'sug-' + index">{{ item }}</li>
            </ul>
          </div>

          <div class="report-card knowledge-gaps" v-if="report.knowledge_gaps && report.knowledge_gaps.length">
            <h3 class="card-title">
              <span class="card-indicator yellow"></span>
              Knowledge Gaps
            </h3>
            <ul class="card-list">
              <li v-for="(item, index) in report.knowledge_gaps" :key="'gap-' + index">{{ item }}</li>
            </ul>
          </div>

          <div class="report-card next-steps" v-if="report.next_steps && report.next_steps.length">
            <h3 class="card-title">
              <span class="card-indicator blue"></span>
              Next Steps
            </h3>
            <ul class="card-list">
              <li v-for="(item, index) in report.next_steps" :key="'step-' + index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="detailed-results-section" v-if="results.questions && results.questions.length">
        <h2 class="section-heading">
          <svg viewBox="0 0 1024 1024" width="22" height="22">
            <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z" fill="currentColor"/>
            <path d="M492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" fill="currentColor"/>
            <path d="M492 544h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" fill="currentColor"/>
            <path d="M340 400h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" fill="currentColor"/>
            <path d="M340 544h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" fill="currentColor"/>
          </svg>
          Detailed Results
        </h2>

        <div class="question-list">
          <div
            v-for="(q, index) in results.questions"
            :key="'q-' + index"
            class="question-card"
            :class="{ incorrect: !isCorrect(q) }"
          >
            <div class="question-header" @click="toggleExpand(index)">
              <div class="question-left">
                <span class="question-number">{{ index + 1 }}</span>
                <span class="question-type-badge" :class="getTypeClass(q.type)">{{ getTypeLabel(q.type) }}</span>
                <span class="question-text">{{ truncateText(q.question, 60) }}</span>
              </div>
              <div class="question-right">
                <span class="question-score" :class="{ 'score-full': isCorrect(q) }">
                  {{ q.score || 0 }}/{{ q.max_score || 0 }}
                </span>
                <span class="question-indicator" :class="isCorrect(q) ? 'indicator-correct' : 'indicator-incorrect'">
                  <svg v-if="isCorrect(q)" viewBox="0 0 1024 1024" width="18" height="18">
                    <path d="M432 726.4l-225.6-225.6 56.8-56.8L432 612.8l328.8-328.8 56.8 56.8z" fill="currentColor"/>
                  </svg>
                  <svg v-else viewBox="0 0 1024 1024" width="18" height="18">
                    <path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" fill="currentColor"/>
                  </svg>
                </span>
                <span class="expand-icon" :class="{ expanded: expandedQuestions[index] }">
                  <svg viewBox="0 0 1024 1024" width="16" height="16">
                    <path d="M365.3 197.3l285.4 285.4c12 12 12 32 0 44L365.3 812.1c-12 12-32 12-44 0s-12-32 0-44L584.7 504.7 321.3 241.3c-12-12-12-32 0-44s32-12 44 0z" fill="currentColor"/>
                  </svg>
                </span>
              </div>
            </div>

            <transition name="expand">
              <div class="question-detail" v-if="expandedQuestions[index]">
                <div class="detail-row">
                  <span class="detail-label">Question</span>
                  <span class="detail-value question-full-text">{{ q.question }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Your Answer</span>
                  <span class="detail-value" :class="isCorrect(q) ? 'answer-correct' : 'answer-incorrect'">{{ q.user_answer || 'Not Answered' }}</span>
                </div>
                <div class="detail-row" v-if="!isCorrect(q)">
                  <span class="detail-label">Correct Answer</span>
                  <span class="detail-value answer-correct">{{ q.correct_answer }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Score</span>
                  <span class="detail-value">{{ q.score || 0 }} / {{ q.max_score || 0 }}</span>
                </div>
                <div class="detail-row explanation-row" v-if="q.explanation">
                  <span class="detail-label">Explanation</span>
                  <span class="detail-value explanation-text">{{ q.explanation }}</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div class="wrong-summary-section" v-if="wrongQuestions.length > 0">
        <h2 class="section-heading">
          <svg viewBox="0 0 1024 1024" width="22" height="22">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="currentColor"/>
            <path d="M464 336a48 48 0 1 1 96 0 48 48 0 1 1-96 0z m72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" fill="currentColor"/>
          </svg>
          Incorrect Questions Summary
          <span class="wrong-count">{{ wrongQuestions.length }} questions</span>
        </h2>

        <div class="wrong-list">
          <div
            v-for="(q, index) in wrongQuestions"
            :key="'wrong-' + index"
            class="wrong-item"
          >
            <div class="wrong-item-header">
              <span class="wrong-number">{{ q.index + 1 }}</span>
              <span class="wrong-text">{{ truncateText(q.question, 80) }}</span>
            </div>
            <div class="wrong-item-body">
              <div class="wrong-answer-row">
                <span class="wrong-label">Your Answer: </span>
                <span class="wrong-user-answer">{{ q.user_answer || 'Not Answered' }}</span>
              </div>
              <div class="wrong-answer-row">
                <span class="wrong-label">Correct Answer: </span>
                <span class="wrong-correct-answer">{{ q.correct_answer }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button class="action-btn practice-btn" @click="$router.push('/practice')">
          <svg viewBox="0 0 1024 1024" width="18" height="18">
            <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z" fill="currentColor"/>
            <path d="M492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" fill="currentColor"/>
            <path d="M340 400h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" fill="currentColor"/>
          </svg>
          Try Again
        </button>
        <button class="action-btn feedback-btn" @click="$router.push('/feedback')">
          <svg viewBox="0 0 1024 1024" width="18" height="18">
            <path d="M512 128c-212.1 0-384 171.9-384 384s171.9 384 384 384 384-171.9 384-384-171.9-384-384-384z m0 704c-176.7 0-320-143.3-320-320s143.3-320 320-320 320 143.3 320 320-143.3 320-320 320z" fill="currentColor"/>
            <path d="M464 384a48 48 0 1 1 96 0 48 48 0 1 1-96 0z m72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V504c0-4.4-3.6-8-8-8z" fill="currentColor"/>
          </svg>
          View Feedback
        </button>
        <button class="action-btn home-btn" @click="$router.push('/')">
          <svg viewBox="0 0 1024 1024" width="18" height="18">
            <path d="M946.5 505L534.6 93.4c-12.5-12.5-32.7-12.5-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.6 63.9 63.9 63.9h42.5V880c0 17.7 14.3 32 32 32h186.7c17.7 0 32-14.3 32-32v-186h161.3v186c0 17.7 14.3 32 32 32h186.7c17.7 0 32-14.3 32-32V614.2H901.4c35.3 0 63.9-28.6 63.9-63.9 0-17-6.7-33.3-18.8-45.3z" fill="currentColor"/>
          </svg>
          Back to Home
        </button>
      </div>
    </div>

    <div class="no-data" v-else>
      <div class="no-data-content">
        <svg viewBox="0 0 1024 1024" width="64" height="64">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="currentColor"/>
          <path d="M464 336a48 48 0 1 1 96 0 48 48 0 1 1-96 0z m72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" fill="currentColor"/>
        </svg>
        <h2>No quiz data available</h2>
        <p>Please complete a quiz first</p>
        <button class="back-btn" @click="$router.push('/practice')">Go to Practice</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizReport',
  data() {
    return {
      results: null,
      report: null,
      expandedQuestions: {},
      circumference: 2 * Math.PI * 85,
      animatedScore: 0,
      isDark: false
    }
  },
  computed: {
    percentage() {
      if (!this.results || !this.results.max_score) return 0
      return Math.round((this.results.score / this.results.max_score) * 100)
    },
    dashOffset() {
      const progress = this.animatedScore / 100
      return this.circumference * (1 - progress)
    },
    correctCount() {
      if (!this.results || !this.results.questions) return 0
      return this.results.questions.filter(q => this.isCorrect(q)).length
    },
    wrongQuestions() {
      if (!this.results || !this.results.questions) return []
      return this.results.questions
        .map((q, index) => ({ ...q, index }))
        .filter(q => !this.isCorrect(q))
    }
  },
  methods: {
    goBack() {
      this.$router.push('/practice')
    },
    checkDarkMode() {
      this.isDark = document.documentElement.classList.contains('Dark') || document.documentElement.getAttribute('data-theme') === 'Dark'
    },
    isCorrect(question) {
      if (question.is_correct !== undefined) return question.is_correct
      return question.score >= question.max_score
    },
    truncateText(text, maxLength) {
      if (!text) return ''
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
    },
    toggleExpand(index) {
      this.expandedQuestions[index] = !this.expandedQuestions[index]
    },
    getTypeLabel(type) {
      const labels = {
        choice: 'Choice',
        code_understanding: 'Code',
        short_answer: 'Short Answer',
        fill: 'Fill-in',
        code: 'Programming',
        true_false: 'True/False'
      }
      return labels[type] || type || 'Question'
    },
    getTypeClass(type) {
      const classes = {
        choice: 'type-choice',
        code_understanding: 'type-code',
        short_answer: 'type-short',
        fill: 'type-fill',
        code: 'type-code',
        true_false: 'type-tf'
      }
      return classes[type] || 'type-choice'
    },
    parseResults() {
      try {
        const data = this.$route.query.data
        if (data) {
          const parsed = JSON.parse(decodeURIComponent(data))
          this.results = parsed
          this.report = parsed.report || null
          if (this.results && this.results.questions) {
            this.results.questions = this.results.questions.map(q => {
              const grading = q.grading || {}
              return {
                ...q,
                correct_answer: q.correct_answer || grading.correct_answer || '',
                explanation: q.explanation || grading.explanation || ''
              }
            })
          }
        }
      } catch (e) {
        console.error('Failed to parse quiz data:', e)
      }
    },
    animateScore() {
      const target = this.percentage
      const duration = 1500
      const startTime = performance.now()
      const startValue = 0

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        this.animatedScore = Math.round(startValue + (target - startValue) * eased)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  },
  mounted() {
    this.checkDarkMode()
    this._darkObserver = new MutationObserver(() => { this.checkDarkMode() })
    this._darkObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] })
    this.parseResults()
    this.$nextTick(() => {
      this.animateScore()
    })
    window.scrollTo({ top: 0 })
  },
  beforeUnmount() {
    if (this._darkObserver) this._darkObserver.disconnect()
  }
}
</script>

<style scoped>
.quiz-report {
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #0d0d2b 100%);
  padding: 20px;
  color: #fff;
}

.report-header {
  text-align: center;
  margin-bottom: 30px;
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
  background: linear-gradient(135deg, #43e97b, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.page-subtitle {
  color: #999;
  font-size: 15px;
}

.report-content {
  max-width: 1000px;
  margin: 0 auto;
}

.score-section {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
}

.score-circle-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
  flex-shrink: 0;
}

.score-circle-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.score-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.06);
  stroke-width: 10;
}

.score-progress {
  fill: none;
  stroke-width: 10;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
}

.score-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-percent {
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, #43e97b, #38f9d7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.score-label {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

.score-details {
  flex: 1;
}

.score-fraction {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 20px;
}

.fraction-value {
  font-size: 48px;
  font-weight: 700;
  color: #43e97b;
  line-height: 1;
}

.fraction-divider {
  font-size: 28px;
  color: #555;
}

.fraction-total {
  font-size: 28px;
  color: #888;
}

.score-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}

.correct-icon {
  background: rgba(67, 233, 123, 0.2);
  color: #43e97b;
}

.accuracy-icon {
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
}

.stat-text {
  font-size: 15px;
  color: #bbb;
}

.stat-text strong {
  color: #eee;
  font-weight: 600;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
  color: #ddd;
  margin-bottom: 16px;
}

.section-heading svg {
  color: #667eea;
}

.ai-report-section {
  margin-bottom: 30px;
}

.report-summary {
  padding: 18px 22px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  margin-bottom: 16px;
  backdrop-filter: blur(10px);
}

.summary-text {
  color: #ccc;
  font-size: 15px;
  line-height: 1.8;
}

.report-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.report-card {
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.report-card:hover {
  background: rgba(255, 255, 255, 0.07);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #ddd;
  margin-bottom: 12px;
}

.card-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.card-indicator.red {
  background: #ff6b6b;
  box-shadow: 0 0 8px rgba(255, 107, 107, 0.5);
}

.card-indicator.green {
  background: #43e97b;
  box-shadow: 0 0 8px rgba(67, 233, 123, 0.5);
}

.card-indicator.yellow {
  background: #f5af19;
  box-shadow: 0 0 8px rgba(245, 175, 25, 0.5);
}

.card-indicator.blue {
  background: #667eea;
  box-shadow: 0 0 8px rgba(102, 126, 234, 0.5);
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-list li {
  position: relative;
  padding: 6px 0 6px 16px;
  font-size: 13px;
  color: #bbb;
  line-height: 1.6;
}

.card-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 13px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.weak-points .card-list li::before {
  background: #ff6b6b;
}

.suggestions .card-list li::before {
  background: #43e97b;
}

.knowledge-gaps .card-list li::before {
  background: #f5af19;
}

.next-steps .card-list li::before {
  background: #667eea;
}

.detailed-results-section {
  margin-bottom: 30px;
}

.question-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.question-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.question-card:hover {
  background: rgba(255, 255, 255, 0.06);
}

.question-card.incorrect {
  border-left: 3px solid #ff6b6b;
}

.question-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  cursor: pointer;
  gap: 12px;
}

.question-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.question-number {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.question-type-badge {
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.type-choice {
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
}

.type-fill {
  background: rgba(67, 233, 123, 0.2);
  color: #43e97b;
}

.type-short {
  background: rgba(240, 147, 251, 0.2);
  color: #f093fb;
}

.type-code {
  background: rgba(245, 175, 25, 0.2);
  color: #f5af19;
}

.type-tf {
  background: rgba(56, 249, 215, 0.2);
  color: #38f9d7;
}

.question-text {
  font-size: 14px;
  color: #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.question-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.question-score {
  font-size: 13px;
  color: #888;
  font-weight: 500;
}

.question-score.score-full {
  color: #43e97b;
}

.question-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.indicator-correct {
  background: rgba(67, 233, 123, 0.2);
  color: #43e97b;
}

.indicator-incorrect {
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
}

.expand-icon {
  color: #666;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.question-detail {
  padding: 0 18px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: 0;
}

.detail-row {
  display: flex;
  padding: 8px 0;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 13px;
  color: #888;
  flex-shrink: 0;
  width: 60px;
}

.detail-value {
  font-size: 13px;
  color: #ccc;
  flex: 1;
  word-break: break-all;
}

.question-full-text {
  line-height: 1.6;
  white-space: pre-wrap;
}

.answer-correct {
  color: #43e97b;
}

.answer-incorrect {
  color: #ff6b6b;
}

.explanation-row {
  flex-direction: column;
  gap: 6px;
}

.explanation-text {
  color: #aaa;
  line-height: 1.7;
  background: rgba(102, 126, 234, 0.06);
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.wrong-summary-section {
  margin-bottom: 30px;
}

.wrong-count {
  font-size: 13px;
  color: #ff6b6b;
  font-weight: 400;
  margin-left: 8px;
  padding: 2px 8px;
  background: rgba(255, 107, 107, 0.15);
  border-radius: 10px;
}

.wrong-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wrong-item {
  padding: 16px 18px;
  background: rgba(255, 107, 107, 0.04);
  border: 1px solid rgba(255, 107, 107, 0.12);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.wrong-item:hover {
  background: rgba(255, 107, 107, 0.07);
}

.wrong-item-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.wrong-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.wrong-text {
  font-size: 14px;
  color: #ccc;
  flex: 1;
}

.wrong-item-body {
  padding-left: 34px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.wrong-answer-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 13px;
}

.wrong-label {
  color: #888;
  flex-shrink: 0;
}

.wrong-user-answer {
  color: #ff6b6b;
}

.wrong-correct-answer {
  color: #43e97b;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
  padding-bottom: 40px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  position: relative;
  overflow: hidden;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
}

.action-btn:hover::before {
  width: 300%;
  height: 300%;
}

.practice-btn {
  background: linear-gradient(135deg, #43e97b, #38f9d7);
  color: #0c0c1d;
  box-shadow: 0 4px 20px rgba(67, 233, 123, 0.3);
}

.practice-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(67, 233, 123, 0.45);
}

.practice-btn svg {
  fill: #0c0c1d;
}

.feedback-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.feedback-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 28px rgba(102, 126, 234, 0.45);
}

.feedback-btn svg {
  fill: #fff;
}

.home-btn {
  background: rgba(255, 255, 255, 0.08);
  color: #ccc;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.home-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  transform: translateY(-2px);
}

.home-btn svg {
  fill: currentColor;
}

.no-data {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-data-content {
  text-align: center;
  color: #fff;
}

.no-data-content svg {
  color: #444;
  margin-bottom: 16px;
}

.no-data-content h2 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #888;
}

.no-data-content p {
  color: #666;
  margin-bottom: 20px;
}

.no-data-content .back-btn {
  position: static;
  display: inline-flex;
}

@media (max-width: 900px) {
  .report-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .quiz-report {
    padding: 12px;
  }

  .page-title {
    font-size: 26px;
  }

  .back-btn {
    position: static;
    margin-bottom: 12px;
    display: inline-flex;
  }

  .report-header {
    text-align: center;
  }

  .score-section {
    flex-direction: column;
    text-align: center;
    padding: 20px;
    gap: 24px;
  }

  .score-circle-wrapper {
    width: 150px;
    height: 150px;
  }

  .score-percent {
    font-size: 28px;
  }

  .fraction-value {
    font-size: 36px;
  }

  .fraction-total {
    font-size: 22px;
  }

  .score-stats {
    align-items: center;
  }

  .report-cards {
    grid-template-columns: 1fr;
  }

  .question-header {
    flex-wrap: wrap;
  }

  .question-text {
    white-space: normal;
    width: 100%;
    order: 3;
    margin-top: 6px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .action-btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .score-circle-wrapper {
    width: 120px;
    height: 120px;
  }

  .score-percent {
    font-size: 22px;
  }

  .score-label {
    font-size: 10px;
  }

  .fraction-value {
    font-size: 28px;
  }

  .fraction-divider {
    font-size: 20px;
  }

  .fraction-total {
    font-size: 18px;
  }

  .section-heading {
    font-size: 17px;
  }

  .question-left {
    flex-wrap: wrap;
  }

  .wrong-item-body {
    padding-left: 0;
  }

  .wrong-answer-row {
    flex-direction: column;
    gap: 2px;
  }
}

.quiz-report:not(.dark-mode) {
  background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%);
  color: #1a1a2e;
}

.quiz-report:not(.dark-mode) .back-btn {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
  color: #4a4a6a;
}

.quiz-report:not(.dark-mode) .back-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  color: #1a1a2e;
}

.quiz-report:not(.dark-mode) .page-subtitle {
  color: #6b7280;
}

.quiz-report:not(.dark-mode) .score-section {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
}

.quiz-report:not(.dark-mode) .score-bg {
  stroke: rgba(0, 0, 0, 0.08);
}

.quiz-report:not(.dark-mode) .score-label {
  color: #6b7280;
}

.quiz-report:not(.dark-mode) .fraction-divider {
  color: #ccc;
}

.quiz-report:not(.dark-mode) .fraction-total {
  color: #6b7280;
}

.quiz-report:not(.dark-mode) .stat-text {
  color: #4a4a6a;
}

.quiz-report:not(.dark-mode) .stat-text strong {
  color: #1a1a2e;
}

.quiz-report:not(.dark-mode) .section-heading {
  color: #1a1a2e;
}

.quiz-report:not(.dark-mode) .report-summary {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
}

.quiz-report:not(.dark-mode) .summary-text {
  color: #4a4a6a;
}

.quiz-report:not(.dark-mode) .report-card {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
}

.quiz-report:not(.dark-mode) .report-card:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.quiz-report:not(.dark-mode) .card-title {
  color: #1a1a2e;
}

.quiz-report:not(.dark-mode) .card-list li {
  color: #4a4a6a;
}

.quiz-report:not(.dark-mode) .question-card {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
}

.quiz-report:not(.dark-mode) .question-card:hover {
  background: rgba(255, 255, 255, 0.9);
}

.quiz-report:not(.dark-mode) .question-text {
  color: #4a4a6a;
}

.quiz-report:not(.dark-mode) .question-score {
  color: #6b7280;
}

.quiz-report:not(.dark-mode) .question-detail {
  border-top-color: rgba(0, 0, 0, 0.06);
}

.quiz-report:not(.dark-mode) .detail-row {
  border-bottom-color: rgba(0, 0, 0, 0.04);
}

.quiz-report:not(.dark-mode) .detail-label {
  color: #6b7280;
}

.quiz-report:not(.dark-mode) .detail-value {
  color: #4a4a6a;
}

.quiz-report:not(.dark-mode) .explanation-text {
  color: #4a4a6a;
  background: rgba(102, 126, 234, 0.04);
  border-color: rgba(102, 126, 234, 0.08);
}

.quiz-report:not(.dark-mode) .wrong-item {
  background: rgba(255, 107, 107, 0.03);
  border-color: rgba(255, 107, 107, 0.1);
}

.quiz-report:not(.dark-mode) .wrong-item:hover {
  background: rgba(255, 107, 107, 0.06);
}

.quiz-report:not(.dark-mode) .wrong-text {
  color: #4a4a6a;
}

.quiz-report:not(.dark-mode) .wrong-label {
  color: #6b7280;
}

.quiz-report:not(.dark-mode) .home-btn {
  background: rgba(0, 0, 0, 0.05);
  color: #4a4a6a;
  border-color: rgba(0, 0, 0, 0.1);
}

.quiz-report:not(.dark-mode) .home-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #1a1a2e;
}

.quiz-report:not(.dark-mode) .no-data-content {
  color: #1a1a2e;
}

.quiz-report:not(.dark-mode) .no-data-content svg {
  color: #ccc;
}

.quiz-report:not(.dark-mode) .no-data-content h2 {
  color: #6b7280;
}

.quiz-report:not(.dark-mode) .no-data-content p {
  color: #999;
}

.quiz-report:not(.dark-mode) .expand-icon {
  color: #999;
}
</style>

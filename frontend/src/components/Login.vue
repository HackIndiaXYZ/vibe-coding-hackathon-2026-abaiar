<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <div class="logo-container">
          <div class="logo-bg" style="background-image: url('../../static/img/touxiang.png');"></div>
          <img src="../../static/img/logokuang.png" alt="Logo" class="logo-frame">
        </div>
        <h2>AI Teaching Assistant System</h2>
        <p class="subtitle">{{ isLoginMode ? 'Sign In' : 'Sign Up' }}</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="form.username" 
            placeholder="Enter your username"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password" 
            placeholder="Enter your password"
            required
          >
        </div>

        <div class="form-group" v-if="!isLoginMode">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="form.confirmPassword" 
            placeholder="Enter your password again"
            required
          >
        </div>
        
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        
        <button type="submit" class="login-button" :disabled="isLoading">
          {{ isLoading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Sign Up') }}
        </button>
      </form>
      
      <div class="toggle-mode">
        <span v-if="isLoginMode">
          Don't have an account? <a href="#" @click.prevent="toggleMode">Sign Up</a>
        </span>
        <span v-else>
          Already have an account? <a href="#" @click.prevent="toggleMode">Sign In</a>
        </span>
      </div>

      <div class="login-footer">
        <p>AI Teaching Assistant System © 2026</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import axios from 'axios'
import { getServiceUrl } from '../config/api'

const router = useRouter()
const userStore = useUserStore()

const LOGIN_BASE_URL = ''

const isLoginMode = ref(true)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  errorMessage.value = ''
  successMessage.value = ''
  form.password = ''
  form.confirmPassword = ''
}

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  if (!isLoginMode.value && form.password !== form.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  isLoading.value = true

  const formData = new FormData()
  formData.append('username', form.username)
  formData.append('password', form.password)

  const url = isLoginMode.value ? `${LOGIN_BASE_URL}/login` : `${LOGIN_BASE_URL}/register`

  try {
    const response = await axios.post(url, formData)
    
    if (response.data.success) {
      if (isLoginMode.value) {
        console.log('Login successful:', response.data.user)
        userStore.login(response.data.user)
        router.push('/') 
      } else {
        successMessage.value = 'Registration successful! Please sign in.'
        setTimeout(() => {
          toggleMode()
          form.password = ''
        }, 1000)
      }
    }
  } catch (error) {
    console.error('Request failed:', error)
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message || 'Operation Failed'
    } else {
      errorMessage.value = 'Network connection error. Please check if the backend service is running'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Keep original styles, add auxiliary styles */
.login-container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Use your background image */
  background-image: url('../../assets/background.jpg'); 
  background-size: cover;
  background-position: center;
}

.login-box {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
  backdrop-filter: blur(5px);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.logo-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem auto;
}

.logo-bg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.logo-frame {
  position: absolute;
  top: -15%;
  left: -10%;
  width: 120%;
  aspect-ratio: 1/1;
  pointer-events: none;
}

.login-header h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #4a5568;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-group input {
  padding: 0.8rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.error-message {
  color: #e53e3e;
  font-size: 0.9rem;
  text-align: center;
  background-color: #fff5f5;
  padding: 0.5rem;
  border-radius: 6px;
}

.success-message {
  color: #38a169;
  font-size: 0.9rem;
  text-align: center;
  background-color: #f0fff4;
  padding: 0.5rem;
  border-radius: 6px;
}

.login-button {
  background-color: #42b983;
  color: white;
  padding: 0.9rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;
}

.login-button:hover {
  background-color: #3aa876;
}

.login-button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.toggle-mode {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.95rem;
  color: #718096;
}

.toggle-mode a {
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
}

.toggle-mode a:hover {
  text-decoration: underline;
}

.login-footer {
  text-align: center;
  margin-top: 2rem;
  color: #a0aec0;
  font-size: 0.85rem;
}
</style>

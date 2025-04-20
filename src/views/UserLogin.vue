<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h1 class="title">Welcome Back</h1>
      <p class="subtitle">請登入以繼續</p>
      <form @submit.prevent="handleLogin" class="login-form">
        <input v-model="username" type="text" placeholder="帳號" required />
        <div class="password-wrapper">
          <input 
            v-model="password" 
            :type="passwordVisible ? 'text' : 'password'" 
            placeholder="密碼" 
            required 
          />
          <span class="eye-icon" @click="togglePasswordVisibility">
            <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>
        <div class="remember-me">
          <input type="checkbox" v-model="rememberMe" id="rememberMe" />
          <label for="rememberMe">記住我</label>
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? '登入中...' : '登入' }}
        </button>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const rememberMe = ref(false)
const passwordVisible = ref(false) // 控制密碼顯示/隱藏
const router = useRouter()
const authStore = useAuthStore()

// 檢查是否有保存的帳號資訊
onMounted(() => {
  const savedUsername = localStorage.getItem('username')
  if (savedUsername) {
    username.value = savedUsername
    rememberMe.value = true
  }
})

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''

  try {
    await authStore.login(username.value, password.value)
    // 記住帳號
    if (rememberMe.value) {
      localStorage.setItem('username', username.value)
    } else {
      localStorage.removeItem('username')
    }
    router.push('/')
  } catch (err) {
    errorMsg.value = '登入失敗，請確認帳號密碼'
  } finally {
    loading.value = false
  }
}

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f2f2f7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
}

.login-card {
  background: #ffffff;
  padding: 48px 40px;
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  text-align: center;
  transition: all 0.3s ease;
}

.title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1d1d1f;
}

.subtitle {
  font-size: 16px;
  color: #6e6e73;
  margin-bottom: 32px;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.login-form input,
.login-form button {
  width: 100%;
  padding: 14px;
  margin-bottom: 18px;
  border-radius: 12px;
  font-size: 16px;
}

.login-form input {
  border: 1px solid #d1d1d6;
  background-color: #f9f9f9;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.login-form input:focus {
  outline: none;
  border-color: #007aff;
  background-color: #fff;
}

.login-form button {
  background: linear-gradient(135deg, #007aff, #0051a8);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  box-sizing: border-box;
}

.login-form button:disabled {
  background: #bcd7f6;
  cursor: not-allowed;
}

.remember-me {
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-start;
}

.remember-me input {
  margin-right: 8px;
  margin-left: 0;
}

.remember-me label {
  font-size: 14px;
  color: #6e6e73;
}

.error {
  color: #e53935;
  font-size: 14px;
  margin-top: 16px;
}

.password-wrapper {
  position: relative;
}

.password-wrapper .eye-icon {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  cursor: pointer;
}

.password-wrapper input {
  padding-right: 36px;
}

@media (max-width: 768px) {
  .login-wrapper {
    padding: 20px;
  }

  .login-card {
    padding: 36px 28px;
    max-width: 100%;
  }

  .title {
    font-size: 24px;
  }

  .subtitle {
    font-size: 14px;
  }

  .login-form input,
  .login-form button {
    padding: 12px 14px;
    font-size: 14px;
  }
}
</style>

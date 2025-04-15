<template>
    <div class="login-container">
        <h2>登入</h2>
        <form @submit.prevent="handleLogin">
            <input v-model="username" type="text" placeholder="帳號" required />
            <input v-model="password" type="password" placeholder="密碼" required />
            <button type="submit" :disabled="loading">
                {{ loading ? '登入中...' : '登入' }}
            </button>
            <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
    loading.value = true
    errorMsg.value = ''

    try {
        await authStore.login(username.value, password.value)
        router.push('/')
    } catch (err) {
        errorMsg.value = '登入失敗，請確認帳號密碼'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-container {
    max-width: 300px;
    margin: 80px auto;
    text-align: center;
}

input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
}

button {
    width: 100%;
    padding: 10px;
    background: #42b983;
    color: white;
    border: none;
    cursor: pointer;
}

button:disabled {
    background: #a5d6a7;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
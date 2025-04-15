<template>
    <div class="register-container">
        <h2>註冊</h2>
        <form @submit.prevent="handleRegister">
            <input v-model="username" type="text" placeholder="帳號" required />
            <input v-model="password" type="password" placeholder="密碼" required />
            <button type="submit" :disabled="loading">
                {{ loading ? '註冊中...' : '註冊' }}
            </button>
            <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const router = useRouter()

const handleRegister = async () => {
    loading.value = true
    errorMsg.value = ''

    try {
        await axios.post('http://localhost:8080/api/auth/register', {
            username: username.value,
            password: password.value
        })
        router.push('/login')
    } catch (err) {
        errorMsg.value = '註冊失敗，請檢查資料'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.register-container {
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
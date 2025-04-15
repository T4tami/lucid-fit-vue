import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || ''
    }),
    actions: {
        async login(username, password) {
            const res = await axios.post('http://localhost:8080/api/auth/login', {
                username, password
            })

            this.token = res.data.token
            localStorage.setItem('token', this.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        },
        logout() {
            this.token = ''
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
        }
    }
})

import axios from 'axios'

const API_URL = 'https://你的後端網址/api/auth'

export function login(username, password) {
    return axios.post(`${API_URL}/login`, { username, password })
}

export function register(username, password) {
    return axios.post(`${API_URL}/register`, { username, password })
}

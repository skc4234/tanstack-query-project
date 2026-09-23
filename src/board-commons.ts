import axios, { AxiosInstance } from 'axios'
// Node.js => 임의로 포트 설정 가능
const boardClient = axios.create({
    baseURL: "http://localhost:3355",
    headers: {
        "Content-Type": "application/json"
    }
})

export default boardClient
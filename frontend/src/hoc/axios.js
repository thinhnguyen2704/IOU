import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://13.211.212.209:5000'
})

export default instance;
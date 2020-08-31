import axios from 'axios'
import { api } from '@/config'

const axiosAPI = axios.create({ baseURL: api })

export default axiosAPI

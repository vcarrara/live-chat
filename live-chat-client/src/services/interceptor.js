import axios from 'axios'
import store from '@/store'
import { removeToken } from '@/store/actions'

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 403) {
            console.log('JWT token removed from local storage')
            store.dispatch(removeToken())
        }
        return Promise.reject(error)
    }
)

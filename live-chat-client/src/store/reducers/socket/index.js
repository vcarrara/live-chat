import io from 'socket.io-client'
import { LOG_IN, LOG_OUT } from '@/store/constants/action-types'
import { api } from '@/config'

const INITIAL_SOCKET_STATE = null

const socket = (state = INITIAL_SOCKET_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            return io(`${api}/conversation`, { query: { token: action.token } })
        case LOG_OUT:
            return INITIAL_SOCKET_STATE
        default:
            return state
    }
}

export default socket

import { LOG_IN, LOG_OUT } from '@/store/constants/action-types'

const INITIAL_TOKEN_STATE = null

const token = (state = INITIAL_TOKEN_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            return action.token
        case LOG_OUT:
            return INITIAL_TOKEN_STATE
        default:
            return state
    }
}

export default token

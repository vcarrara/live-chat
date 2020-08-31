import { LOG_IN, LOG_OUT, SET_LAST_MESSAGE, ADD_CONVERSATION, REMOVE_CONVERSATION } from '@/store/constants/action-types'

const INITIAL_USER_STATE = {}

const user = (state = INITIAL_USER_STATE, action) => {
    switch (action.type) {
        case LOG_IN:
            return { ...action.user }
        case LOG_OUT:
            return INITIAL_USER_STATE
        case SET_LAST_MESSAGE:
            let updatedUser = { ...state }
            updatedUser.conversations.find((conversation) => conversation.room === action.room).messages = [action.message]
            return updatedUser
        case ADD_CONVERSATION:
            return { ...state, conversations: [...state.conversations, action.conversation] }
        case REMOVE_CONVERSATION:
            const conversations = state.conversations.filter((conversation) => conversation.room !== action.conversation.room)
            return { ...state, conversations }
        default:
            return state
    }
}

export default user

import { combineReducers } from 'redux'
// import { LOG_IN, LOG_OUT, SET_TOKEN, REMOVE_TOKEN, SET_USER, REMOVE_USER, ADD_CONVERSATION, REMOVE_CONVERSATION } from '@/store/constants/action-types'

import user from '@/store/reducers/user'
import token from '@/store/reducers/token'
import socket from '@/store/reducers/socket'
import modals from '@/store/reducers/modals'

// const token = (state = INITIAL_TOKEN_STATE, action) => {
//     switch (action.type) {
//         case SET_TOKEN:
//             return action.token
//         case REMOVE_TOKEN:
//             return null
//         default:
//             return state
//     }
// }

// const token = (state = null, action) => {
//     switch (action.type) {
//         case LOG_IN:
//             return action.token
//         case LOG_OUT:
//             return null
//         default:
//             return state
//     }
// }

// const user = (state = {}, action) => {
//     switch (action.type) {
//         case SET_USER:
//             return action.user
//         case REMOVE_USER:
//             return {}
//         case ADD_CONVERSATION:
//             return { ...state, conversations: [...state.conversations, action.conversation] }
//         case REMOVE_CONVERSATION:
//             const conversations = state.conversations.filter((conversation) => conversation.room !== action.conversation.room)
//             return { ...state, conversations: conversations }
//         default:
//             return state
//     }
// }

export default combineReducers({ token, user, socket, modals })

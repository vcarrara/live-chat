import { SET_TOKEN, REMOVE_TOKEN, LOG_IN, LOG_OUT, SET_USER } from '@/store/constants/action-types'
import { tokenKey } from '@/config'

// const localStorageMiddleware = (store) => (next) => (action) => {
//     switch (action.type) {
//         case SET_TOKEN:
//             localStorage.setItem(tokenKey, action.token)
//             break
//         case REMOVE_TOKEN:
//             localStorage.removeItem(tokenKey)
//             break
//     }
//     return next(action)
// }

const localStorageMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
        case LOG_IN:
            localStorage.setItem(tokenKey, action.token)
            break
        case LOG_OUT:
            localStorage.removeItem(tokenKey)
            break
    }
    return next(action)
}

// const updateUnknownRef = (store) => (next) => (action) => {
//     if (action.type === SET_USER) {
//         let { user } = action
//         user.conversations.forEach((conversation) => {
//             conversation.messages.forEach((message) => {
//                 if (message.user === null) {
//                     message.user = { username: 'Unknown' }
//                 }
//             })
//         })
//         return next({ ...action, user })
//     }
//     return next(action)
// }

export { localStorageMiddleware }

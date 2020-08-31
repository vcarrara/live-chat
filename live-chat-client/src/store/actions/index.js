import {
    LOG_IN,
    LOG_OUT,
    SET_LAST_MESSAGE,
    SET_TOKEN,
    REMOVE_TOKEN,
    SET_USER,
    REMOVE_USER,
    ADD_CONVERSATION,
    REMOVE_CONVERSATION,
    TOGGLE_MODAL,
    OPEN_MODAL,
    CLOSE_MODAL,
} from '@/store/constants/action-types'

const logIn = (user, token) => ({ type: LOG_IN, user, token })
const logOut = () => ({ type: LOG_OUT })
const setLastMessage = (room, message) => ({ type: SET_LAST_MESSAGE, room, message })

const setToken = (token) => ({ type: SET_TOKEN, token })
const removeToken = () => ({ type: REMOVE_TOKEN })

const setUser = (user) => ({ type: SET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const addConversation = (conversation) => ({ type: ADD_CONVERSATION, conversation })
const removeConversation = (conversation) => ({ type: REMOVE_CONVERSATION, conversation })

const toggleModal = (modal) => ({ type: TOGGLE_MODAL, modal })
const openModal = (modal, params = {}) => ({ type: OPEN_MODAL, modal, params })
const closeModal = (modal) => ({ type: CLOSE_MODAL, modal })

export { logIn, logOut, setLastMessage, setToken, removeToken, setUser, removeUser, addConversation, removeConversation, toggleModal, openModal, closeModal }

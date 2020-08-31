import api from '@/services/axiosAPI'
import store from '@/store'
import { addConversation, removeConversation } from '@/store/actions'

/**
 * This method creates a new chat room on the server. The store dispatches the new room if it succeeds.
 * @param {String} room
 */
const create = (room) =>
    new Promise((resolve, reject) => {
        api.post(
            `api/conversation/${room}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${store.getState().token}`,
                },
            }
        )
            .then((res) => {
                store.dispatch(addConversation(res.data))
                resolve(res)
            })
            .catch(reject)
    })

/**
 * This method removes an existing chat room on the server. The store dispatches that the room has been deleted if it succeeds.
 * @param {String} room
 */
const remove = (room) =>
    new Promise((resolve, reject) => {
        api.delete(`api/conversation/${room}`, {
            headers: {
                Authorization: `Bearer ${store.getState().token}`,
            },
        })
            .then((res) => {
                store.dispatch(removeConversation(store.getState().user.conversations.find((conversation) => conversation.room === room)))
                resolve(res)
            })
            .catch(reject)
    })

/**
 * This method returns the information (messages, owner, members, ...) of an existing room.
 * @param {*} room
 */
const get = (room) =>
    new Promise((resolve, reject) => {
        api.get(`api/conversation/${room}`, {
            headers: {
                Authorization: `Bearer ${store.getState().token}`,
            },
        })
            .then(resolve)
            .catch(reject)
    })

export { create, remove, get }

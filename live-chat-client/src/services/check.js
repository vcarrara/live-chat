import api from '@/services/axiosAPI'

const checkUniqueUsername = (username) =>
    new Promise((resolve, reject) => {
        console.log('get')
        api.get(`api/check/unique-username/${username}`).then(resolve).catch(reject)
    })

/**
 * This method checks that the given room is available
 * @param {String} room
 */
const checkRoomAvailable = (room) =>
    new Promise((resolve, reject) => {
        api.get(`api/check/room-available/${room}`).then(resolve).catch(reject)
    })

export { checkUniqueUsername, checkRoomAvailable }

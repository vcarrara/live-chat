import api from '@/services/axiosAPI'
import { tokenKey } from '@/config'
import store from '@/store'
import { setToken, setUser, removeToken, removeUser, logIn, logOut } from '@/store/actions'

/**
 * This method registers a new user on the server. The promise is rejected if it fails.
 * @param {String} username
 * @param {String} password
 * @param {String} firstName
 * @param {String} lastName
 */
const register = (username, password, firstName, lastName) =>
    new Promise((resolve, reject) => {
        api.post('api/account/register', JSON.stringify({ username, password, firstName, lastName }), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    })

/**
 * This method logs in the user. If it succeeds, the store dispatchs the JWT token and the user information ( same as @see getUserInformation ).
 * @param {String} username
 * @param {String} password
 */
const login = (username, password) =>
    new Promise((resolve, reject) => {
        api.post('api/account/login', JSON.stringify({ username, password }), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // console.log(res)
                const { user, token } = res.data
                // store.dispatch(setToken(token))
                // store.dispatch(setUser(user))
                store.dispatch(logIn(user, token))
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    })

/**
 * This method tries to gather user information from the server.
 * If no token is available, the promise is rejected. If the server responds an error, the promise is rejected too.
 * Otherwise if the response is OK, the redux store dispatchs the token (to make it available by React Components) and the user information. And finally the promise is resolved.
 */
const getUserInformation = () =>
    new Promise((resolve, reject) => {
        const token = localStorage.getItem(tokenKey)

        if (!token) {
            return reject(new Error('User can not be authenticated.'))
        }

        api.get('api/account', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                // store.dispatch(setToken(token))
                // store.dispatch(setUser(res.data))
                store.dispatch(logIn(res.data, token))
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    })

/**
 * This method logs out the user and removes the JWT token and the user from the store.
 */
const logout = () =>
    new Promise((resolve) => {
        // store.dispatch(removeToken())
        // store.dispatch(removeUser())
        store.dispatch(logOut())
        resolve()
    })

/**
 * This method removes the user from the server. If it succeeds, the user is automatically logged out.
 */
const remove = () =>
    new Promise((resolve, reject) => {
        const token = localStorage.getItem(tokenKey)
        api.delete('api/account', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                logout().then(resolve)
            })
            .catch((e) => reject(e))
    })

/**
 * This method updates the user information on the server
 * @param {Object} data
 */
const patch = (data) =>
    new Promise((resolve, reject) => {
        api.patch('api/account', JSON.stringify(data), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(resolve)
            .catch(reject)
    })

export { register, login, logout, getUserInformation, remove, patch }

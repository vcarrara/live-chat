import { AVATAR_MODAL, CREATE_ROOM_MODAL, DELETE_ROOM_MODAL } from '@/components/modals/constants'
import { TOGGLE_MODAL, OPEN_MODAL, CLOSE_MODAL } from '@/store/constants/action-types'

const INITIAL_MODALS_STATE = [AVATAR_MODAL, CREATE_ROOM_MODAL, DELETE_ROOM_MODAL].reduce(
    (accumulator, curr) => ({ ...accumulator, [curr]: { visible: false, params: {} } }),
    {}
)

console.log(INITIAL_MODALS_STATE)

const modals = (state = INITIAL_MODALS_STATE, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return { ...state, [action.modal]: { visible: !state[action.modal], params: {} } }
        case OPEN_MODAL:
            return { ...state, [action.modal]: { visible: true, params: action.params } }
        case CLOSE_MODAL:
            return { ...state, [action.modal]: { visible: false, params: {} } }
        default:
            return state
    }
}

export default modals

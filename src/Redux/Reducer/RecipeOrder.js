import * as rc from '../ReduxConstant'

export const orders = (state = {}, action) => {

    switch (action.type) {
        case rc.LOAD_ORDER:
            return action.data
        case rc.ADD_ORDER:
            return [action.data, ...state]
        default:
            return state
    }
}

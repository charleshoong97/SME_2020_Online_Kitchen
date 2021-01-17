import * as rc from '../ReduxConstant'

export const orders = (state = {}, action) => {

    switch (action.type) {
        case rc.LOAD_ORDER:
            return action.data
        case rc.ADD_ORDER:
            return [action.data, ...state]
        case rc.UPDATE_ORDER:
            let orderList = state.filter((order) => order._id !== action.data._id ? order : null)
            return [...orderList, action.data]
        default:
            return state
    }
}

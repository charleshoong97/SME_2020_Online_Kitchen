import * as rc from '../ReduxConstant'

export const loadOrder = (data) => {
    return {
        type: rc.LOAD_ORDER,
        data,
    }
}

export const addOrder = (data) => {
    return {
        type: rc.ADD_ORDER,
        data,
    }
}

export const updateOrder = (data) => {
    return {
        type: rc.UPDATE_ORDER,
        data,
    }
}

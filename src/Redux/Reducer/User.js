import * as rc from '../ReduxConstant'

export const user = (state = {}, action) => {

    switch (action.type) {
        case rc.LOGIN:
            return action.data
        default:
            return state
    }
}

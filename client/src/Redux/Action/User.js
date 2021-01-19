import * as rc from '../ReduxConstant'

export const login = (data) => {
    return {
        type: rc.LOGIN,
        data,
    }
}

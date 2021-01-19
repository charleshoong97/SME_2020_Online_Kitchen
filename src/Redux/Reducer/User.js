import * as rc from '../ReduxConstant'

export const user = (state = {}, action) => {
  switch (action.type) {
    case rc.LOGIN:
      return action.data
    case rc.clearRedux:
      return {}
    default:
      return state
  }
}

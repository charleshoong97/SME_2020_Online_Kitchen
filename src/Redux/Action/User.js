import * as rc from '../ReduxConstant'

export const login = (data) => {
  return {
    type: rc.LOGIN,
    data,
  }
}

export const clearRedux = () => {
  return {
    type: rc.clearRedux,
  }
}

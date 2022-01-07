import { Dispatch } from '@reduxjs/toolkit'

import { currentUser, ACCESS_TOKEN_KEY } from './slice'

export const logout = () => (dispatch: Dispatch) => {
  dispatch(currentUser.actions.setAccessToken(''))
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

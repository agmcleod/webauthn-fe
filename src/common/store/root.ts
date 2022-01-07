import { combineReducers } from 'redux'

import { currentUser } from './currentUser'

export const rootReducer = combineReducers({
  currentUser: currentUser.reducer,
})

export type State = ReturnType<typeof rootReducer>

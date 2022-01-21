import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import decode from 'jwt-decode'

import { State } from '../root'

export const ACCESS_TOKEN_KEY = 'accessToken'
export type TokenData = { [key: string]: any }

export const currentUser = createSlice({
  name: 'currentUser',
  initialState: {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
    error: '',
    loading: false,
  },
  reducers: {
    setAccessToken(state, { payload }: PayloadAction<string>) {
      state.accessToken = payload
      state.error = ''
      state.loading = false
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload
      state.loading = false
    },
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
  },
})

const getAccessToken = (state: State) => state.currentUser.accessToken

export const selectors = {
  getAccessToken,
  isLoading: (state: State) => state.currentUser.loading,
  getError: (state: State) => state.currentUser.error,
  getTokenData: createSelector(getAccessToken, (token: string) => {
    if (!token) {
      return null
    }

    return decode(token) as TokenData
  }),
}

---
to: src/common/store/<%= name %>/slice.ts
---

import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '../root'

export const <%= name %> = createSlice({
  name: '<%= name %>',
  initialState: {
  },
  reducers: {
  },
})

export const selectors = {
}

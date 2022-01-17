import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { RequireAuth } from './RequireAuth'
import { Home } from './Unauthorized/Home'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<RequireAuth></RequireAuth>} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from './Authorized/Dashboard'
import { RequireAuth } from './RequireAuth'
import { Login } from './Unauthorized/Login'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

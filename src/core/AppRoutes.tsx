import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { RequireAuth } from './RequireAuth'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/dashboard'
          element={
            <RequireAuth>
              <ExampleAuthRequiredComponent />
            </RequireAuth>
          }
        />
        <Route path='/' element={<ExampleHomeComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'

function rapp() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
    </Routes>
    </BrowserRouter>
  )
}

export default rapp
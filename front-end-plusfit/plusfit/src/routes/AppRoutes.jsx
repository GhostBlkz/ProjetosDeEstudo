import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import CustomTraingPage from '../Pages/CustomTraingPage'
import CustomerEnrollmentPage from '../Pages/CustomerEnrollmentPage'
import LoginPage from '../Pages/LoginPage'


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/criar_ficha" element={ <CustomTraingPage /> } />
      <Route path="/cadastrar_cliente" element={ <CustomerEnrollmentPage /> } />
      <Route path="/login" element={ <LoginPage /> } />
      
    </Routes>
  )
}
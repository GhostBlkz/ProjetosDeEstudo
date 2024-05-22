import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import CustomTraingPage from '../Pages/CustomTraingPage'
import CustomerEnrollmentPage from '../Pages/CustomerEnrollmentPage'
import LoginPage from '../Pages/LoginPage'
import AdminList from '../Pages/AdminList'
import CustomerList from '../Pages/CustomerList'
import ContactUpdatePage from '../Pages/ContacUpdatePage'
import EnrollmentUpdate from '../Pages/EnrollmentUpdate'


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <HomePage /> } />
      <Route path="/criar_ficha" element={ <CustomTraingPage /> } />
      <Route path="/cadastrar_cliente" element={ <CustomerEnrollmentPage /> } />
      <Route path="/cadastrar_cliente/:id" element={ <CustomerEnrollmentPage /> } />
      <Route path='/atualizar_contatos/:id' element={ <ContactUpdatePage /> } />
      <Route path='/atualizar_matricula/:id' element={ <EnrollmentUpdate /> } />
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/clientes" element={ <CustomerList /> } />
      <Route path="/admins" element={ <AdminList /> } />


    </Routes>
  )
}
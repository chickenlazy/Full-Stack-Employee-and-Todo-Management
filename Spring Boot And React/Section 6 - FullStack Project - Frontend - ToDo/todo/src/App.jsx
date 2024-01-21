import { useState } from 'react'
import './App.css'
import ListToDo from './components/ListToDo'
import Header from './components/Header'
import Footer from './components/Footer'
import ToDo from './components/ToDo'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {

  return (
    <>
      
      <BrowserRouter>
      <Header />
      <Routes>
        {/* http://localhost:8080 */}
        <Route path='/' element = {<ListToDo />} />
        {/* http://localhost:8080/todos */}
        <Route path='/todos' element = {<ListToDo />} />
        {/* http://localhost:8080/add-todo */}
        <Route path='/add-todo' element = {<ToDo />} />
        {/* http://localhost:8080/update-todo/1 */}
        <Route path='/update-todo/:id' element = {<ToDo />} />
        {/* http://localhost:8080/register */}
        <Route path='/register' element = {<Register />} />
        {/* http://localhost:8080/login */}
        <Route path='/login' element = {<Login />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App

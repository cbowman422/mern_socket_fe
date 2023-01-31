import React from 'react'
import {Routes, Route} from 'react-router-dom'
import LoginForm from '../components/AuthForms/LoginForm'
import RegisterForm from '../components/AuthForms/RegisterForm'
import Chat from '../components/Chat/Chat'
import Show from '../components/Chat/Show'

// passing signup, login, and user through app
const Main = ({signup, login, user, socket}) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Chat socket={socket} user={user} />}/>
        <Route path="/chat/:id" element={<Show/>}/>
        <Route path="/register/" element={<RegisterForm signup={signup}/>}/>
        <Route path="/login/" element={<LoginForm login={login}/>}/>
      </Routes>
    </div>
  )
}

export default Main
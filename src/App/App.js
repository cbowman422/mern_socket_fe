import './App.css';
import React from 'react'
import {useState} from 'react'
import {getUserToken, setUserToken, clearUserToken} from '../utils/authToken'
import Main from '../pages/Main';

// Connecting Socket.io server to React App
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

function App() {

  // import start for the current user object and for isAuthenticated
  const [currentUser, setCurrentUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [currentProfile, setCurrentProfile] = useState({})




  const registerProfile = async(data) =>{
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Authorization': `bearer ${getUserToken()}`,
          "Content-Type": "application/json",
        },
      }
      const newProfile = await fetch(
        "http://localhost:4000/profile/",
        configs
      )

      const createdProfile = await newProfile.json()
      console.log(newProfile)
      // put the returned user object in state for CurrentUser
      setCurrentProfile(createdProfile)
      return createdProfile
    } catch (err) {
      console.log(err)
    }
  }



  // fetch new user JSON from register POST and return it as parsedUser
  const registerUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
      const newUser = await fetch(
        "http://localhost:4000/auth/register",
        configs
      )

      const parsedUser = await newUser.json()
  

  // sets local storage
      setUserToken(parsedUser.token)
  // put the returned user object in state for CurrentUser
      setCurrentUser(parsedUser.user)
  // adds a boolean cast of the responses isLoggedIn prop
      setIsAuthenticated(parsedUser.isLoggedIn)

      return parsedUser
    } catch (err) {
      console.log(err)
      clearUserToken();
      setIsAuthenticated(false);
    }
  }


  // fetch user JSON from login POST and return it as user
  const loginUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
      const response = await fetch(
        "http://localhost:4000/auth/login",
        configs
      )
      const user = await response.json()
      //console.log(user)

  // sets local storage
      setUserToken(user.token)
  // put the returned user object in state for CurrentUser
      setCurrentUser(user.user)
      console.log(user.user)
      return user
    } catch (err) {
      clearUserToken()
      setIsAuthenticated(false)
    }
  }

const signOutHandler = () => 
{
  localStorage.clear();
  localStorage.removeItem('Token');
  
  // window.location.reload()
}


return (
  <div>
    < Main login={loginUser} user={currentUser} signup={registerUser} socket={socket} createProfile={registerProfile} />
    <button onClick={signOutHandler}>signout</button>
  </div>
);
}

export default App;

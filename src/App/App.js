import './App.css';

import React from 'react'
import {useState, useEffect} from 'react'
import {getUserToken, setUserToken, clearUserToken} from '../utils/authToken'


function App() {

// import start for the current user object and for isAuthenticated.
const [currentUser, setCurrentUser] = useState({})
const [isAuthenticated, setIsAuthenticated] = useState(false)

// State for current Profile and follow.
const [currentProfile, setCurrentProfile] = useState({})
const [currentFollow, setCurrentFollow] = useState({})


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
      "http://localhost:4000/profile/auth/register",
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
      "http://localhost:4000/profile/auth/login",
      configs
    )
    const user = await response.json()

    // sets local storage
    setUserToken(user.token)
    // put the returned user object in state for CurrentUser
    setCurrentUser(user.user)

    setIsAuthenticated(user.isLoggedIn)

    window.localStorage.setItem('name', user.user.username);

    return user
  } catch (err) {
    clearUserToken()
    setIsAuthenticated(false)
  }
}

const signOutHandler = () => 
{
  if(isAuthenticated){
    setIsAuthenticated(current => !current)
    setCurrentUser({})
  }
}


return (
  <div>
    <h1> Hello world</h1>
  </div>
);
}

export default App;

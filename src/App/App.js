import './App.css';

import React from 'react'
import {useState, useEffect} from 'react'
import {getUserToken, setUserToken, clearUserToken} from '../utils/authToken'

import LoginForm from '../components/AuthForms/LoginForm';
import RegisterForm from '../components/AuthForms/RegisterForm';

function App() {

// import start for the current user object and for isAuthenticated.
const [currentUser, setCurrentUser] = useState({})
const [isAuthenticated, setIsAuthenticated] = useState(false)

// State for current Profile and follow.
const [currentProfile, setCurrentProfile] = useState({})
const [currentFollow, setCurrentFollow] = useState({})


// const registerProfile = async(data) =>{
//   try {
//     const configs = {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         'Authorization': `bearer ${getUserToken()}`,
//         "Content-Type": "application/json",
//       },
//     }
//     const newProfile = await fetch(
//       "http://localhost:4000/profile/",
//       configs
//     )

//     const createdProfile = await newProfile.json()
//     // put the returned user object in state for CurrentUser
//     setCurrentProfile(createdProfile)
//     return createdProfile
//   } catch (err) {
//     console.log(err)
//   }
// }



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
      console.log(parsedUser)

  // sets local storage
      setUserToken(parsedUser.token)
  // put the returned user object in state for CurrentUser
      setCurrentUser(parsedUser.currentUser)
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
      setCurrentUser(user.currentUser)

      return user
    } catch (err) {
      clearUserToken()
      setIsAuthenticated(false)
    }
  }


const signOutHandler = () => 
{
  localStorage.clear();
  // if(isAuthenticated){
  //   setIsAuthenticated(current => !current)
  //   setCurrentUser({})
  // }
}


return (
  <div>
    <LoginForm login={loginUser} user={currentUser}/>
    <RegisterForm signup={registerUser}/>
    <button onClick={signOutHandler}>signout</button>
  </div>
);
}

export default App;

import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

const Rooms = () => {

   
  const [room, setRoom] = useState()

    // API BASE URL to mongodb backend 
    const BASE_URL= "http://localhost:4000/profile";

    // useEffect to store Chat JSON as setChat state
    const getProfile= async()=>
    {
      try
      {
        const res= await fetch(BASE_URL)
        const allProfile= await res.json()
        setRoom(allProfile)
      }catch(err)
      {
        console.log(err)
      }
    }
  

    useEffect(()=>{getProfile();}, [])

  return (
      <>
      <h2> Rooms </h2>
  {room?.map((roomMap) =>
  {
    return(
      <div key={roomMap._id}>
        <Link to={`/room/${roomMap.usernameProfile}`}>
        <p>{roomMap.usernameProfile}</p>
        </Link>
      </div>
    )
  }
  )
  } 
      </>
    )

  
}

export default Rooms
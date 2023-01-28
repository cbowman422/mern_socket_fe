import React from 'react'
import { useState, useEffect } from "react"
import { Navigate, useParams, useNavigate } from "react-router-dom"
import { getUserToken } from '../../utils/authToken'



const Show= (props)=>
{
  //set state for chat details and form changes for UPDATE ROUTE
  const [chat, setChat]= useState(null);
  const [editForm, setEditForm] = useState(chat);

  // take in the ID parameter from router URL linked from chat.jsx
  const {id} = useParams();

  // useNavigate returns an imperative method that you can use for changing location.
  const navigate = useNavigate();

  // sets chat show route URL as variable and dependent ID from useParams
  const URL = `http://localhost:4000/chat/${id}`;

  // event handler for when UPDATE name and title are changed
  const handleChange= (e)=>
  {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  // function to fetch show chat details for useEffect - and set chat detail JSON to setChat and setEditForm State
  const getChat= async()=>
  {
    try
    {
      const response = await fetch(URL);// fetch
      const foundChat = await response.json();
      setChat(foundChat); // set state to Chat detail result
      setEditForm(foundChat);
    }catch(err)
    {
      console.log(err);
    }
  }
  
  // Update Chat function with Authorization header - UPDATE
  const updateChat= async(e)=>
  {

   // prevent default (event object method)
    e.preventDefault()
    


    try
    { 
      const options = {
        method: "PUT",
        headers: {
          'Authorization': `bearer ${getUserToken()}`,
          "Content-Type": "application/json"},
        body: JSON.stringify(editForm)
      }
      
      const response= await fetch(URL, options);
      const updatedChat= await response.json();
      console.log(updatedChat)
      setChat(updatedChat);
      setEditForm(updatedChat);
    }catch(err)
    { 
      console.log(err)
      navigate(URL)
    }
  }

  // Remove Chat function with Authorization header - DELETE
  const removeChat= async(e)=>
  {
    try
    {
      const options= 
      {
        method: "DELETE",
        headers: {
          'Authorization': `bearer ${getUserToken()}`},
          "Content-Type": "application/json"
      }
      const response= await fetch(URL, options);
      const deletedChat= await response.json();
      // console.log(deletedChat);
      navigate("/");
    }catch(err)
    {
      console.log(err)
      navigate(URL)
    }
  }

  // useEffect to get fire getChat function on page load
  useEffect(()=>{getChat()}, [])

  // Show Details Loaded function and JSX
  const loaded= ()=>
  {
    return(
      <>
      <section>
        <div className="chat">
          <h1>Show Page</h1>
          <h2>{chat.textChat}</h2>
          <div>
            <button className="delete" onClick={removeChat}>
              Remove Chat
            </button>
          </div>
        </div>
      </section>
      <section>
        <h2>Edit this Chat</h2>
        <form onSubmit={updateChat}>
          <input
              type="text"
              value={editForm.textChat}
              name="textChat"
              placeholder="textChat"
              onChange={handleChange}
          />
          <input type="submit" value="Update Chat" />
        </form> 
      </section>
      </>
    )
  }

  // Show Loading and JSX
  const loading= ()=>
  {
    return(
      <section className="loading">
        <h1>
          Loading...
          <span>
            <img
              className="spinner"
              src="https://freesvg.org/img/1544764567.png"
            />{" "}
          </span>
        </h1>
      </section>
    )
  }

  // returned conditional functions and JSX
  return chat ? loaded() : loading()
}

export default Show
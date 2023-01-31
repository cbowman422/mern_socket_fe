import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";

import { getUserToken } from '../../utils/authToken';


const Chat= ({socket, user})=> 
{

  const { id } = useParams()

  // defining state for Chat and for a new chat form input
  const [chat, setChat] = useState([]);
  const [newForm, setNewForm] = useState({
    textChat: "",
    chatRoomUserTwo: `${id}`,
  });



  const [socketState, setSocketState] = useState('')

  // API BASE URL to mongodb backend 
  const BASE_URL= "http://localhost:4000/chat";

  // useEffect to store Chat JSON as setChat state
  const getChat= async()=>
  {
    try
    {
      const res= await fetch(BASE_URL)
      const allChat= await res.json()
      setChat(allChat)
    }catch(err)
    {
      console.log(err)
    }
  }

  // event handler to setNewForm state to inputs when inputs are changed
  const handleChange= (e)=>
  {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };



  // event handler to POST a chat with newForm State input
  const handleSubmit= async(e)=>
  {
  // 0. prevent default (event object method)
    e.preventDefault()

  // setting currentState variable as newForm state input after submit
    const currentState = {...newForm}


    // TODO this is for sockets -------------------------
  
    // console.log(currentState)
    // console.log(socket)

    // currentState ? socket.emit('message', {
    //   text: currentState.textChat,
    //   // TODO add username to sockets here
    //   id: `${socket.id}${Math.random()}`,
    //   socketID: socket.id,
    // }) : console.log("passing socket isnt working");





  // 1. check any fields for property data types / truthy value (function call - stretch)
    try{
        const requestOptions = {
            method: "POST", 
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                "Content-Type": "application/json"},
            body: JSON.stringify(currentState)
        } 
        // 2. specify request method , headers, Content-Type
        // 3. make fetch to BE - sending data (requestOptions)
        // 3a fetch sends the data to API - (mongo)
        const response = await fetch(BASE_URL, requestOptions);
        // 4. check our response - 
        // 5. parse the data from the response into JS (from JSON) 
        const createdChat = await response.json()

        // update local state with response (json from be)
        setChat([...chat, createdChat])
        // reset newForm state so that our form empties out
        setNewForm({
            textChat: "",
            chatRoomUserTwo: `${id}`,
        })

    }catch(err) {
        console.log(err)
    }
  }

// TODO old loaded function with out socket
  // // Loaded chat function
  // const loaded = () =>
  // {

  //   // JSX for creating a new Chat when Chat is loaded
  //   return (
  //     <>
  //     <section>
  //       <h2>Create a new Chat</h2>
  //       <form onSubmit={handleSubmit}>
  //         <label>
  //           chat!
  //           <input 
  //             type='text' 
  //             name='textChat' 
  //             placeholder="text"
  //             value={newForm.textChat}
  //             onChange={handleChange}
  //           />
  //         </label>
  //         <input type="submit" value="Create Chat" />
  //       </form>
  //     </section>
  //     <section className='chat-list'>
  //       {chat?.map((chat) =>
  //         {
  //           return(
  //             <div key={chat._id} className='chat-card'>
  //               <Link to={`/chat/${chat._id}`}>

  //               <h3>{chat.textChat}</h3>

  //               </Link>
                
  //              </div>
  //           );
  //         })
  //       }
  //     </section>
  //     </>
  //   )
  // };

  // / JSX for creating a new chat when chat is loading
  
  
  const loading = () => (
    <section className="loading">
        <h2>...Searching for messages</h2>
    </section>
  );


  const [messages, setMessages] = useState([{}]);

  // Loaded chat function
  const loaded = () =>
  {
    // JSX for creating a new Chat when Chat is loaded
    return (
      <>

  {chat?.map((chatMap) =>
  { if ((chatMap.chatRoomUserTwo === id || chatMap.chatRoomUserTwo ===  user.username) && (chatMap.owner.username === id || chatMap.owner.username === user.username)){

    return(
      <div key={chatMap._id}>
        <Link to={`/chat/${chatMap._id}`}>
        <p>{chatMap.owner.username}: {chatMap.textChat}</p>
        </Link>
      </div>
    )

  }
  
  }
  )
  } 

      </>
    )
  };
  



        // {messages?.map((messagesMap) =>
        //   {
        //     return(
        //       <div key={messagesMap._id} className='chat-card'>
        //       <Link to={`/chat/${messagesMap._id}`}> 
            
      
        //         <p>{messagesMap.textChat}</p>
      
        //         </Link>
                
        //        </div>
        //     );
        //   })
        // }


  // // useEffect to call getChat function on page load
  // useEffect(()=>{getChat()}, [])
  


  useEffect(() => {
    getChat()
    socket.on('messageResponse', (data) => setMessages([data]));
    //console.log(messages)
  }, [socket, messages]);



  // conditional return to return loading and loaded JSX depending on 
  return (
    <div>
 <section className="loading">
        <section>
        <h2>Create a new Chat</h2>
        <form onSubmit={handleSubmit}>
          <label>
            chat!
            <input 
              type='text' 
              name='textChat' 
              placeholder="text"
              value={newForm.textChat}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Create Chat" />
        </form>
      </section>
    </section>
      <section className="chat-list">{chat && chat.length ? loaded() : loading()}</section>
    </div>
  );
}

export default Chat
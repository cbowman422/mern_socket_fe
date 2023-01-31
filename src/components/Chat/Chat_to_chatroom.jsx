// import React from 'react'
// import {useState, useEffect} from 'react'
// import { Link } from "react-router-dom";

// import { getUserToken } from '../../utils/authToken';
// import UserTwo from '../UserTwo/UserTwo';

// const Chat= ({socket, user})=> 
// {
//   // defining state for Chat and for a new chat form input
//   const [chat, setChat] = useState([]);
//   const [newForm, setNewForm] = useState({
//     textChatRoom: [""],
//     chatRoomUserTwo: "63d522170736728d8d927abe",
//     owner: `${user._id}`,
//   });


//   // API BASE URL to mongodb backend 
//   const BASE_URL= "http://localhost:4000/chatroom";

//   // useEffect to store Chat JSON as setChat state
//   const getChat= async()=>
//   {
//     try
//     {
//       const res= await fetch(BASE_URL)
//       const allChat= await res.json()
//       setChat(allChat)
//     }catch(err)
//     {
//       console.log(err)
//     }
//   }

//   // event handler to setNewForm state to inputs when inputs are changed
//   const handleChange= (e)=>
//   {
//     setNewForm({ ...newForm, [e.target.name]: e.target.value });
//   };



//   // event handler to POST a chat with newForm State input
//   const handleSubmit= async(e)=>
//   {
//   // 0. prevent default (event object method)
//     e.preventDefault()

//   // setting currentState variable as newForm state input after submit
//     const currentState = {...newForm}

//   // 1. check any fields for property data types / truthy value (function call - stretch)
//     try{
//         const requestOptions = {
//             method: "POST", 
//             headers: {
//                 // 'Authorization': `bearer ${getUserToken()}`,
//                 "Content-Type": "application/json"},
//             body: JSON.stringify(currentState)
//         } 
//         // 2. specify request method , headers, Content-Type
//         // 3. make fetch to BE - sending data (requestOptions)
//         // 3a fetch sends the data to API - (mongo)
//         const response = await fetch(BASE_URL, requestOptions);
//         // 4. check our response - 
//         // 5. parse the data from the response into JS (from JSON) 
//         const createdChat = await response.json()

//         // update local state with response (json from be)
//         setChat([...chat, createdChat])
//         // reset newForm state so that our form empties out
//         setNewForm({
//             textChatRoom: [""],
//             chatRoomUserTwo: "63d522170736728d8d927abe",
//             owner: `${user._id}`,
//         })

//     }catch(err) {
//         console.log(err)
//     }
//   }

  
  
//   const loading = () => (
//     <section className="loading">
//         <h2>...Searching for messages</h2>
//     </section>
//   );


//   const [messages, setMessages] = useState([{}]);

//   // Loaded chat function
//   const loaded = () =>
//   {
//     // JSX for creating a new Chat when Chat is loaded
//     return (
//       <>

//       {messages?.map((messagesMap) =>
//         {
//           return(
//             <div key={messagesMap._id} className='chat-card'>
//             <Link to={`/chat/${messagesMap._id}`}> 
          
    
//               <p>{messagesMap.textChat}</p>
    
//               </Link>
              
//              </div>
//           );
//         })
//       }
//       </>
//     )
//   };
 

//   useEffect(() => {
//     // getChat()
//     socket.on('messageResponse', (data) => setMessages({...messages, data}));
//     console.log(messages)
//   }, [socket, messages]);



//   // conditional return to return loading and loaded JSX depending on 
//   return (
//     <div>
//  <section className="loading">
//         <section>
//         <h2>Create a new Chat</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             chat!
//             <input 
//               type='text' 
//               name='textChatRoom' 
//               placeholder="text"
//               value={newForm.textChatRoom}
//               onChange={handleChange}
//             />
//           </label>
//           <input type="submit" value="Create Chat" />
//         </form>
//       </section>
//     </section>
//       <section className="chat-list">{chat && chat.length ? loaded() : loading()}</section>
//     </div>
//   );
// }

// export default Chat
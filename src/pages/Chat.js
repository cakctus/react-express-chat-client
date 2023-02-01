import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import APIRoutes from "../utils/Api"
import Contacts from "../components/Contacts"
import ChatContainer from "../components/ChatContainer"
import Welcome from "../components/Welcome"
import { io } from "socket.io-client"

const Chat = () => {
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)

  const [currentChat, setCurrentChat] = useState(undefined)

  const socket = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login")
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")))
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(
              `${APIRoutes.allUsersRoute}/${currentUser.id}`
            )
            setContacts(data.data)
          } else {
            navigate("/setAvatar")
          }
        }
      } catch (error) {}
    }

    fetchData()
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      socket.current = io(APIRoutes.host)
      socket.current.emit("add-user", currentUser.id)
    }
  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  // console.log(currentChat)
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`

export default Chat

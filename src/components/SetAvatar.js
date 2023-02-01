import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import APIRoute from "../utils/Api"
import { useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import loader from "../assets/loader.gif"
import { Buffer } from "buffer"

const SetAvatar = () => {
  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)
  const api = "https://api.multiavatar.com"
  const navigate = useNavigate()

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/")
    }
  }, [])

  const SetProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions)
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"))

      const data = await axios
        .post(`${APIRoute.setAvatarRoute}/${user.id}`, {
          image: avatars[selectedAvatar],
        })
        .then((res) => {
          if (res.data.isSet === true) {
            user.isAvatarImageSet = true
            user.avatarImage = res.data.image
            localStorage.setItem("chat-app-user", JSON.stringify(user))
            navigate("/")
          }
        })
        .catch((error) => console.log(error))

      //   if (data.isSet) {
      //     ;(user.isAvatarImageSet = true),
      //       (user.avatarImage = data.image),
      //       localStorage.setItem("chat-app-user", JSON.stringify(user))

      //     return navigate("/")
      //   }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = []
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 100)}`
        )
        const buffer = new Buffer.from(image.data)
        console.log(buffer)
        data.push(buffer.toString("base64"))
      }
      setAvatars(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              )
            })}
          </div>
          <button onClick={SetProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`
export default SetAvatar

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Logo from "../assets/logo.svg"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import RegisterRoute from "../utils/Api"
import { useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const navigate = useNavigate()

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/")
    }
  }, [])

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values
    // if (password !== confirmPassword) {
    //   toast.error("Password and confirm password should be same.", toastOptions)
    //   return false
    // } else if (username.length < 3) {
    //   toast.error("Username should be greater than 3 characters.", toastOptions)
    //   return false
    // } else if (password.length < 6) {
    //   toast.error(
    //     "Password should be equal or greater than 8 characters.",
    //     toastOptions
    //   )
    //   return false
    // } else if (email === "") {
    //   toast.error("Email is required.", toastOptions)
    //   return false
    // }

    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (handleValidation()) {
      const { username, email, password } = values

      const data = await axios
        .post(RegisterRoute.RegisterRoute, {
          username,
          email,
          password,
        })
        .then((res) => {
          if (res.data.status === true) {
            localStorage.setItem("chat-app-user", JSON.stringify(res.data.user))
          }
          navigate("/login")
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            toast.error(error.response.data.msg, toastOptions)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message)
          }
          console.log(error.config)
        })
    }
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit">Register</button>
          <span>
            already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`

export default Register

import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import "react-toastify/dist/ReactToastify.css"
import ApiRoute from "../utils/Api"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" })

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

  const validateForm = () => {
    const { email, password } = values
    if (email === "") {
      toast.error("Email or Password is required.", toastOptions)
      return false
    } else if (password === "") {
      toast.error("Email or Password is required.", toastOptions)
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateForm()) {
      const { email, password } = values
      const data = await axios
        .post(ApiRoute.LoginRoute, {
          email,
          password,
        })
        .then((res) => {
          console.log(res)
          if (res.data.status === true) {
            localStorage.setItem("chat-app-user", JSON.stringify(res.data.user))
          }
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

      // if (data.status === false) {
      //   toast.error(data.msg, toastOptions)
      // }
      // if (data.status === true) {
      //   localStorage.setItem("chat-app-user", JSON.stringify(data.user))

      //   navigate("/")
      // }
    }
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
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
    padding: 5rem;
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

export default Login

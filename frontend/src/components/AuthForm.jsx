import { useState } from "react"
import axios from "axios"

const AuthForm = ({ darkMode }) => {

  const [isLogin, setIsLogin] = useState(true)

  const [username, setUsername] = useState("")

  const [password, setPassword] = useState("")

  const handleSubmit = async () => {

    try {

      const formData = new FormData()

      formData.append(
        "username",
        username
      )

      formData.append(
        "password",
        password
      )

      const endpoint = isLogin
        ? "login"
        : "signup"

      const response = await axios.post(
        `http://127.0.0.1:8000/${endpoint}`,
        formData
      )

      if (response.data.access_token) {

        localStorage.setItem(
          "token",
          response.data.access_token
        )

        localStorage.setItem(
          "username",
          response.data.username
        )

        alert("Login successful")

        window.location.reload()
      }

      if (response.data.message) {

        alert(response.data.message)
      }

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.error ||
        "Authentication failed"
      )
    }
  }

  return (

    <div
      className={
        darkMode
          ? `
            bg-slate-800
            text-white
            p-8
            rounded-3xl
            shadow-2xl
            border
            border-slate-700
            max-w-md
            mx-auto
          `
          : `
            bg-white
            text-black
            p-8
            rounded-3xl
            shadow-2xl
            border
            border-slate-200
            max-w-md
            mx-auto
          `
      }
    >

      <p
        className="
          text-slate-500
          text-center
          mb-2
        "
      >
        Access your AI Resume Dashboard
      </p>

      <h2
        className="
          text-4xl
          font-bold
          mb-6
          text-center
        "
      >
        {isLogin
          ? "Login"
          : "Signup"}
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className={
  darkMode
    ? `
        w-full
        border
        border-slate-600
        bg-slate-700
        text-white
        placeholder:text-slate-400
        p-4
        rounded-2xl
      `
    : `
        w-full
        border
        p-4
        rounded-2xl
        text-black
      `
}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className={
  darkMode
    ? `
        w-full
        border
        border-slate-600
        bg-slate-700
        text-white
        placeholder:text-slate-400
        p-4
        rounded-2xl
      `
    : `
        w-full
        border
        p-4
        rounded-2xl
        text-black
      `
}
        />

        <button
          onClick={handleSubmit}
          className="
            w-full
            bg-gradient-to-r
            from-blue-600
            to-indigo-700
            text-white
            py-4
            rounded-2xl
            font-semibold
            hover:scale-105
            transition-all
          "
        >
          {isLogin
            ? "Login"
            : "Signup"}
        </button>

        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className={
  darkMode
    ? "text-blue-400 font-medium"
    : "text-blue-600 font-medium"
}
        >
          {isLogin
            ? "Create account"
            : "Already have account?"}
        </button>

      </div>

    </div>
  )
}

export default AuthForm
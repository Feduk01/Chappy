import React from 'react'
import '../style/login.css'

const LoginPage: React.FC = () => {
  return (
    <div className="page-container">
      <form action="" className="login-container">
        <h2>Chappy</h2>
        <label className="label-username">
          Username
          <input type="text" />
        </label>
        <label className="label-password">
          Password
          <input type="password" />
        </label>
        <div className="button-container">
          <button>Login</button>
          <button>Register</button>
        </div>
        <button className="guest-button">Continue as guest</button>
      </form>
    </div>
  )
}

export default LoginPage

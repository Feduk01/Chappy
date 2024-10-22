import React from 'react'

const Login: React.FC = () => {
  return (
    <div className="page-container">
      <form action="" className="login-container">
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <div className="button-container">
          <button>Login</button>
          <button>Register</button>
          <button>Continue as guest</button>
        </div>
      </form>
    </div>
  )
}

export default Login

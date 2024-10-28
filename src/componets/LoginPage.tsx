import React, { useState } from 'react'
import '../style/login.css'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token)
        console.log('Login successful')
      } else {
        console.log('Login failed')
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <div className="page-container">
      <form onSubmit={handleLogin} className="login-container">
        <h2>Chappy</h2>
        <label className="label-username">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="label-password">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="button-container">
          <button type="submit">Login</button>
          <button type="button">Register</button>
        </div>
        <button type="button" className="guest-button">
          Continue as guest
        </button>
      </form>
    </div>
  )
}

export default LoginPage

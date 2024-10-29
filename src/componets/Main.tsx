import React from 'react'
import DirectMessagePage from './DM/DirectMessagePage'
import ChannelPage from './Channels/ChannelPage'
import '../style/main.css'


const Main: React.FC = () => {
  return (
    <div>

      <div className="main-page-container">
        <main className="main-container">
          <header className="header-container">
            <h2>Chappy</h2>
            <div className="profile-container">
              <div className="profile-name">alice_wonder</div>
              <button className="logout-button">Logout</button>
            </div>
          </header>
          <div className="main-content">

          <DirectMessagePage />
      <ChannelPage />
          </div>
        </main>
      </div>


      
    </div>
  )
}

export default Main

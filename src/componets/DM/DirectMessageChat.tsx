import React from 'react'
import '../../style/dm.css'
import { useParams } from 'react-router-dom'

const DirectMessageChat: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  console.log('Chat med: ', userId)

  return (
    <div className="dm-chat-container">
      <header className="dm-chat-header">
        <h2 className="dm-chat-header-rubric">Chat with user ...</h2>
      </header>

      <main className="dm-chat-main">
        <ul className="dm-chat-conversation">
          <li className="dm-chat-message-container">
            <h3 className="dm-chat-message-username">alice_wonder</h3>
            <p className="dm-chat-message">Hej vännen!</p>
          </li>

          <li className="dm-chat-message-container">
            <h3 className="dm-chat-message-username">jane_smith</h3>
            <p className="dm-chat-message">Hej vännen!</p>
          </li>

          <li className="dm-chat-message-container">
            <h3 className="dm-chat-message-username">jane_smith</h3>
            <p className="dm-chat-message">Hej vännen!</p>
          </li>
        </ul>
      </main>

      <form className="dm-chat-input-container">
        <input
          className="dm-chat-input"
          type="text"
          placeholder="Type your message here..."
        />
      </form>
    </div>
  )
}

export default DirectMessageChat

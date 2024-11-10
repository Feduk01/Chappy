import React, { useEffect, useState } from 'react'
import '../../style/dm.css'
import { useParams } from 'react-router-dom'
import { Message } from '../../stores/messages'
import { useUserStore } from '../../stores/login'
import { useNavigate } from 'react-router-dom'

const DirectMessageChat: React.FC = () => {
  const [messageList, setMessageList] = useState<Message[]>([])
  const { userId } = useParams<{ userId: string }>()
  const currentUserId = localStorage.getItem('currentUserId')
  const users = useUserStore((state) => state.users)
  const [newMessage, setNewMessage] = useState('')

  const userMap = users.reduce((map: { [key: string]: string }, user) => {
    map[user._id.toString()] = user.username
    return map
  }, {} as { [key: string]: string })

  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }

  const chatWithUsername = userId ? userMap[userId] : 'Unknown user'

  useEffect(() => {
    const fetchDmChat = async () => {
      try {
        const response = await fetch(
          `/api/messages/contacts?userId=${currentUserId}&otherUserId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        if (!response.ok) {
          throw new Error('Failed to fetch Dm Chat')
        }
        const data = await response.json()
        setMessageList(data)
      } catch (error) {
        console.log('Error is: ', error)
      }
    }
    fetchDmChat()
  }, [userId, currentUserId])
  console.log(`userId=${currentUserId}, otherUserId=${userId}`)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    if (!currentUserId || !userId) return

    const messageData = {
      content: newMessage,
      senderId: currentUserId,
      recipientId: userId,
      isDirectMessage: true,
    }

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(messageData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const { messageId } = await response.json()
      const message: Message = { _id: messageId, ...messageData }
      setMessageList((prev) => [...prev, message])

      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className="dm-chat-container">
      <header className="dm-chat-header">
        <button onClick={handleBack} className="back-button">
          ← Back
        </button>
        <h2 className="dm-chat-header-rubric">Chat with {chatWithUsername}</h2>
      </header>

      <main className="dm-chat-main">
        <ul className="dm-chat-conversation">
          {messageList.map((message) => (
            <li
              key={message._id.toString()}
              className={`dm-chat-message-container ${
                message.senderId.toString() === currentUserId
                  ? 'sent'
                  : 'received'
              }`}
            >
              <h3 className="dm-chat-message-username">
                {userMap[message.senderId.toString()]}
              </h3>
              <p className="dm-chat-message">{message.content}</p>
            </li>
          ))}
        </ul>
      </main>

      <form className="dm-chat-input-container" onSubmit={handleSendMessage}>
        <div className="input-wrapper">
          <input
            className="dm-chat-input"
            type="text"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default DirectMessageChat

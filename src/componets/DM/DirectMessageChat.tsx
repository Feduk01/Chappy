import React, { useEffect, useState } from 'react'
import '../../style/dm.css'
import { useParams } from 'react-router-dom'
import { Message } from '../../../backendSrc/models/message'
import { useUserStore } from '../../stores/login'

const DirectMessageChat: React.FC = () => {
  const [messageList, setMessageList] = useState<Message[]>([])
  const { userId } = useParams<{ userId: string }>()
  const currentUserId = localStorage.getItem('currentUserId')
  const users = useUserStore((state) => state.users)

  const userMap = users.reduce((map: { [key: string]: string }, user) => {
    map[user._id.toString()] = user.username
    return map
  }, {} as { [key: string]: string })

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

  return (
    <div className="dm-chat-container">
      <header className="dm-chat-header">
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

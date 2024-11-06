import React, { useEffect, useState } from 'react'
import '../../style/channel.css'
import { useParams } from 'react-router-dom'
import { Message } from '../../../backendSrc/models/message'
import { useUserStore } from '../../stores/login'
import { useChannelStore } from '../../stores/channels'

const ChannelChat: React.FC = () => {
  const [messageList, setMessageList] = useState<Message[]>([])
  const { channelId } = useParams<{ channelId: string }>()
  const currentUserId = localStorage.getItem('currentUserId')
  const users = useUserStore((state) => state.users)
  const channels = useChannelStore((state) => state.channels)
  const isGuest = useUserStore((state) => state.isGuest)

  const userMap = users.reduce((map: { [key: string]: string }, user) => {
    map[user._id.toString()] = user.username
    return map
  }, {})

  const channelMap = channels.reduce(
    (map: { [key: string]: string }, channel) => {
      map[channel._id.toString()] = channel.name
      return map
    },
    {}
  )

  const channelName = channelId ? channelMap[channelId] : 'Unknown channel'

  useEffect(() => {
    const fetchChannelMessages = async () => {
      try {
        const response = await fetch(`/api/channels/${channelId}/messages`, {
          headers: isGuest
            ? {}
            : {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch channel messages')
        }
        const data = await response.json()
        setMessageList(data)
      } catch (error) {
        console.error('Error fetching channel messages:', error)
      }
    }
    fetchChannelMessages()
  }, [channelId, currentUserId])

  return (
    <div className="channel-chat-container">
      <header className="channel-chat-header">
        <h2 className="channel-chat-header-rubric">
          Welcome to {channelName} Channel
        </h2>
      </header>

      <main className="channel-chat-main">
        <ul className="channel-chat-conversation">
          {messageList.map((message) => (
            <li
              key={message._id.toString()}
              className={`channel-chat-message-container ${
                message.senderId.toString() === currentUserId
                  ? 'sent'
                  : 'received'
              }`}
            >
              <h3 className="channel-chat-message-username">
                {userMap[message.senderId.toString()] || 'Unknown User'}
              </h3>
              <p className="channel-chat-message">{message.content}</p>
            </li>
          ))}
        </ul>
      </main>

      <form className="channel-chat-input-container">
        <input
          className="channel-chat-input"
          type="text"
          placeholder="Type your message here..."
        />
      </form>
    </div>
  )
}

export default ChannelChat

import React, { useEffect, useState } from 'react'
import { Channel } from '../../../backendSrc/models/channel'
import { useUserStore } from '../../stores/login'

const ChannelPage: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([])
  const { isGuest } = useUserStore()

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          isGuest ? '/api/channels?guest=true' : '/api/channels',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        if (!response.ok) {
          throw new Error('Failed to fetch channels')
        }
        const data = await response.json()
        setChannels(data)
      } catch (error) {
        console.log('Error is: ', error)
      }
    }
    fetchChannels()
  }, [])

  return (
    <div className="channel-container">
      <h3> Channels</h3>
      <ul className="channel-list">
        {channels.map((channel) => (
          <li key={channel._id.toString()} className="channel-list-item">
            {channel.name} {channel.isPrivate ? false : true}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChannelPage

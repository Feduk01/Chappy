import React, { useEffect, useState } from 'react'
import { User } from '../../../backendSrc/models/user'
import { useUserStore } from '../../stores/login'
import { useNavigate } from 'react-router-dom';
import { ObjectId } from 'mongodb';


const DirectMessagePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const isGuest = useUserStore((state) => state.isGuest);
  const navigate = useNavigate()

  const handleDirectMessage = (userId:ObjectId) => {
    navigate(`/dm-chat/${userId.toString()}`)
  }


  if(isGuest){
    return null
  } else {

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('/api/users', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          if (!response.ok) {
            throw new Error('Failed to fetch channels')
          }
          const data = await response.json()
          setUsers(data)
        } catch (error) {
          console.log('Error is: ', error)
        }
      }
      fetchUsers()
    }, [])
  }

  return (
    <div className="dm-container">
      <h3>Direct Messages</h3>
      <ul className="dm-list">
        {users.map((user) => (
          <li onClick={() => handleDirectMessage(user._id)} key={user.username} className="dm-list-item">
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DirectMessagePage

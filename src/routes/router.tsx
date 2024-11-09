import { createBrowserRouter, Navigate } from 'react-router-dom'
import Root from './Root'
import LoginPage from '../componets/LoginPage'
import Main from '../componets/Main'
import DirectMessagePage from '../componets/DM/DirectMessagePage'
import ChannelPage from '../componets/Channels/ChannelPage'
import DirectMessageChat from '../componets/DM/DirectMessageChat'
import ChannelChat from '../componets/Channels/ChannelChat'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'dm',
        element: <DirectMessagePage />,
      },
      {
        path: 'channel',
        element: <ChannelPage />,
      },
      {
        path: 'channel-chat/:channelId',
        element: <ChannelChat />,
      },
      {
        path: 'dm-chat/:userId',
        element: <DirectMessageChat />,
      },
    ],
  },
])

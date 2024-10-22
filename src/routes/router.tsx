import { createBrowserRouter, Navigate } from 'react-router-dom'
import Root from './Root'
import LoginPage from '../componets/LoginPage'
import Main from '../componets/Main'
import DirectMessagePage from '../componets/DirectMessagePage'
import ChannelPage from '../componets/ChannelPage'

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
    ],
  },
])

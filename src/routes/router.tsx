import { createBrowserRouter, Navigate } from 'react-router-dom'
import Root from './Root'
import Login from '../componets/Login'
import Main from '../componets/Main'
import DirectMassanger from '../componets/Dm'
import Channel from '../componets/Channel'

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
        element: <Login />,
      },
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'dm',
        element: <DirectMassanger />,
      },
      {
        path: 'channel',
        element: <Channel />,
      },
    ],
  },
])

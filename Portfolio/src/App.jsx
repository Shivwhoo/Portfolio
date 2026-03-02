import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { RouterProvider } from 'react-router-dom'
import router from './routes/AppRoutes'
import useLenis from './hooks/useLenis'
import useTheme from './hooks/useTheme'

function App() {
  useLenis()
  useTheme()
  return <RouterProvider router={router}/>
}

export default App

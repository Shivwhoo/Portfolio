import { RouterProvider } from 'react-router-dom'
import router from './routes/AppRoutes'
import useTheme from './hooks/useTheme'

function App() {
  useTheme()
  return <RouterProvider router={router}/>
}

export default App

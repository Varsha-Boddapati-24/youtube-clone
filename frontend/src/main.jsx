import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignIn from './pages/SignIn.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Register from './pages/Register.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/signin',
        element: <SignIn/>
      },{
        path:"/register",
        element:<Register/>
      }


    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>

  </StrictMode>,
)

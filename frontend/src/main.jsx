import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignIn from './pages/SignIn.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import VideoPlayer from './pages/VideoPlayer.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index:true,
        element:<Home/>

      },
      {
        path: 'signin',
        element: <SignIn/>
      },{
        path:"register",
        element:<Register/>
      },{
        path:"/search",
        element:<Search/>
      },{
        path:"/video/:id",
        element:<VideoPlayer/>

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

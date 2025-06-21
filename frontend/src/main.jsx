import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Spinner from './components/Spinner.jsx'
import './index.css'
// import App from './App.jsx'
// import SignIn from './pages/SignIn.jsx'

// import Register from './pages/Register.jsx'
// import Home from './pages/Home.jsx'
// import Search from './pages/Search.jsx'
// import VideoPlayer from './pages/VideoPlayer.jsx'
// import ViewChannel from './pages/ViewChannel.jsx'
import { lazy,Suspense } from 'react';

const App = lazy(() => import('./App.jsx'));
const SignIn = lazy(() => import('./pages/SignIn.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const Search = lazy(() => import('./pages/Search.jsx'));
const VideoPlayer = lazy(() => import('./pages/VideoPlayer.jsx'));
const ViewChannel = lazy(() => import('./pages/ViewChannel.jsx'));


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index:true,
        element:<Suspense fallback={<Spinner/>}><Home/></Suspense>

      },
      {
        path: 'signin',
        element: <Suspense fallback={<Spinner/>}><SignIn/></Suspense>
      },{
        path:"register",
        element:<Suspense fallback={<Spinner/>}><Register/></Suspense>
      },{
        path:"/search",
        element:<Suspense fallback={<Spinner/>}><Search/></Suspense>
      },{
        path:"/video/:id",
        element:<Suspense fallback={<Spinner/>}><VideoPlayer/></Suspense>

      },
      {
        path:"/channel/:id",
        element:<Suspense fallback={<Spinner/>}><ViewChannel/></Suspense>

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

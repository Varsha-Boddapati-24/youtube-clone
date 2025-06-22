import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Spinner from './components/Spinner.jsx'
import './index.css'
import { lazy,Suspense } from 'react';
// Lazy load all major components/pages to optimize performance
const App = lazy(() => import('./App.jsx'));
const SignIn = lazy(() => import('./pages/SignIn.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const Search = lazy(() => import('./pages/Search.jsx'));
const VideoPlayer = lazy(() => import('./pages/VideoPlayer.jsx'));
const ViewChannel = lazy(() => import('./pages/ViewChannel.jsx'));
const NotFound=lazy(() => import('./pages/NotFound.jsx'));

// Define the routes for the application using React Router's createBrowserRouter
const appRouter = createBrowserRouter([
  {
    path: "/", // Base path
    element: <Suspense fallback={<Spinner/>}><App/></Suspense>,   // App component is the layout wrapper (contains header/sidebar/etc.)
    children: [      // Nested routes rendered via <Outlet /> in App
      {
        index:true,  // Default route at "/"
        element:<Suspense fallback={<Spinner/>}><Home/></Suspense>

      },
      {
        path: 'signin', // Route for login page
        element: <Suspense fallback={<Spinner/>}><SignIn/></Suspense>
      },{
        path:"register",
        element:<Suspense fallback={<Spinner/>}><Register/></Suspense>
      },{
        path:"/search",
        element:<Suspense fallback={<Spinner/>}><Search/></Suspense>
      },{
        path:"/video/:id",  // Dynamic route for individual video player
        element:<Suspense fallback={<Spinner/>}><VideoPlayer/></Suspense>

      },
      {
        path:"/channel/:id", // Dynamic route to view a specific channel page
        element:<Suspense fallback={<Spinner/>}><ViewChannel/></Suspense>

      }


    ],
     // Render this component for unmatched routes (404 Not Found)
       errorElement:<Suspense fallback={<Spinner/>}><NotFound/></Suspense>
      
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/* Provide the router configuration to the app */}
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>

  </StrictMode>,
)

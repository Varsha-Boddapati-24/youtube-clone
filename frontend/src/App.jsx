import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>

    </>
  )
}

export default App

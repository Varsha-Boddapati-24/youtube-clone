import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";

// Create the authentication context
const authContext = createContext()
// Custom hook to use the AuthContext in other components
export const useAuth = () => useContext(authContext);
// AuthProvider component to wrap around the app and provide auth-related state
export const AuthProvider = (props) => {
  // State to hold the current user object
  const [user, setUser] = useState(null);
   // State to hold any error related to authentication
  const [error, setError] = useState(null);
    // State to track loading while fetching user info initially
  const [loading, setLoading] = useState(true);
    // Function to fetch the currently logged-in us
  async function fetchUser() {
    try {
      setError(null);
         // Call the backend to get the user data
      const res = await axios.get("https://youtube-clone-vkhx.onrender.com/user", { withCredentials: true });// Include cookies for authentication
      setUser(res.data.user);// Save user data to state
    } catch (err) {
      if (err.response?.status === 401) {
        console.log("User not signed in");
        setUser(null);
      } else {
        console.log("error", err);
        setUser(null);
        setError(err.response?.data?.error || "Failed to fetch user");
      }
    }
    finally {
      setLoading(false);
    }

  }
 // Fetch user when the provider first mounts
  useEffect(() => {
    fetchUser();
  }, []);

  // Function to handle signout
  async function signout() {
    try {
      await axios.post("https://youtube-clone-vkhx.onrender.com/user/signout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to signout");
    }
  }
    // Provide the auth values to all children components
  return (
    <authContext.Provider value={{ user,setUser, fetchUser, signout , loading,error }}>
      {props.children}
    </authContext.Provider>
  );


}
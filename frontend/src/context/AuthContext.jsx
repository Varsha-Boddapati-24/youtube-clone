import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";

const authContext = createContext()
export const useAuth = () => useContext(authContext);
export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  async function fetchUser() {
    try {
      setError(null);
      const res = await axios.get("http://localhost:5000/user", { withCredentials: true });
      console.log("res", res)
      setUser(res.data.user);
    } catch (err) {
      console.log("error", err)
      setUser(null);
      setError(err.response?.data?.error || "Failed to fetch user");
    }

  }

  useEffect(() => {
    fetchUser();
  }, []);
  async function signout() {
    try {
      await axios.post("http://localhost:5000/user/signout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to signout");
    }
  }
  return (
    <authContext.Provider value={{ user, fetchUser,signout }}>
      {props.children}
    </authContext.Provider>
  );


}
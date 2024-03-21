import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";
import http from "../service/httpService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    try {
      const response = await axios.post(
        "https://jeroccia.omishtujoy.com/api/login",
        data
      );
      setUser(response.data);
      setError(null); // Reset error state on successful login
      console.log(user);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid credentials. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  // call this function to sign out logged in user
  const logout = async () => {
    const userID={
      user_id:`${user.user.id}`
    }
    try {
      const response = await axios.post(

        "https://jeroccia.omishtujoy.com/api/logout",
        userID,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUser(null);
      navigate("/login", { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid credentials. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const value = useMemo(
    () => ({
      user,
      error, // Include error state in the context value
      login,
      logout,
    }),
    [user, error] // Update when user or error changes
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

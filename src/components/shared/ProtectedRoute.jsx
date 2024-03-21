import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProtectedRoute = () => {
  const { user, checkTokenExpiration } = useAuth();
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    const checkExpiration = async () => {
      // Assuming checkTokenExpiration is a function that checks if the token is expired
      // const tokenIsValid = await checkTokenExpiration(); // Replace with your token expiration check logic
      // setIsTokenValid(tokenIsValid);
    };

    checkExpiration();
  }, [checkTokenExpiration]);

  if (!user || !isTokenValid) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="">
      <Outlet />
    </div>
  );
};

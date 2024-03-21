import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";

export const PermissionRoute = ({ requiredPermissions}) => {
  const { user } = useAuth();

  // Check if any required permission matches the user's permissions
  if (
    requiredPermissions &&
    !requiredPermissions.some((permission) => user.user.permissions.includes(permission))
  ) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="">
      <Outlet/>
    </div>
  );
};

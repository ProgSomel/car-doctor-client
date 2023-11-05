import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();
//   console.log(location.pathname);



  if (loading) {
    return (
      <>
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span>
      </>
    );
  }

  if (user?.email) {
    return children;
  }
  return (
    <div>
      return <Navigate state={location.pathname} to="/login" replace></Navigate>
    </div>
  );
};

export default PrivateRoute;

import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  function getToken() {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    console.log(userToken);
    return userToken?.access_token;
  }

  return getToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

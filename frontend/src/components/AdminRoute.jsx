import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import AdminLogin from "../Pages/admin/AdminLogin";

const AdminRoute = ({ children }) => {
  const { admin, authLoading } = useContext(AppContext);

  if (authLoading) return <p>Loading...</p>;

  if (!admin) return <AdminLogin />;

  return children;
};

export default AdminRoute;
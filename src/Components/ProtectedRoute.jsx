import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { getMeApi } from "../api/adminApi";

function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getMeApi();

        if (res.data.success) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;

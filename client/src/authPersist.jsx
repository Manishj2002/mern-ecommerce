// src/authPersist.jsx   ← create this file
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "@/store/authSlice";   // ← this thunk already exists!

export default function AuthPersist({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // This single line does everything!
    dispatch(checkAuth());
    // It will:
    // → call /auth/check-auth
    // → if cookie valid → set user + isAuthenticated = true
    // → if not → set user = null + isAuthenticated = false
  }, [dispatch]);

  return <>{children}</>;
}
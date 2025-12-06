// src/authPersist.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/auth-slice";    // ← ADD .js (or .ts if you use TypeScript)

export default function AuthPersist({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <>{children}</>;
}
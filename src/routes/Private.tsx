import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";


export function Private({ children }: { children: ReactNode }) {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <div>Carregando...</div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
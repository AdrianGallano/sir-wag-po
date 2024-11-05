import dataFetch from "@/services/data-service";
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  success: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("Error during login:");
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    const payload = { username, password };

    try {
      //for debugging
      console.log("Sending login payload:", payload);

      const response = await dataFetch(
        "/api/auth/jwt/create/",
        "POST",
        payload
      );

      const token = response.access;

      if (!token) {
        throw new Error("Token not found in response");
      }

      setToken(token);
      sessionStorage.setItem("token", token);
      setSuccess(true);
    } catch (err) {
      console.error("Error during login:", err);
      setSuccess(false);
      setError("Login failed. Please check your username and password.");
    }
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, success, error }}>
      {children}
    </AuthContext.Provider>
  );
};

import dataFetch from "@/services/data-service";
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
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
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState<string | null>(null);
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
      console.log("Parsed response data access:", token);

      if (!token) {
        throw new Error("Token not found in response");
      }

      setToken(token);
      localStorage.setItem("token", token);
      console.log("Login successful, token saved:", token);

      navigate("/analytics");
    } catch (err) {
      console.error("Error during login:", err);
      setError("Login failed. Please check your username and password.");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

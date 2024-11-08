import dataFetch from "@/services/data-service";
import { decodeToken } from "@/utils/decoder";
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  success: boolean;
  id: number;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [id, setId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    const payload = { username, password };
    setError(null); // Reset error state on each login attempt

    try {
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

      const decodedToken = decodeToken(token);
      console.log("Decoded token:", decodedToken);
      const userId = decodedToken?.user_id;
      console.log("User ID:", userId);

      if (!userId) {
        throw new Error("User ID not found in token");
      }

      setId(userId);
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
    setSuccess(false); // Reset success state on logout
    setId(0); // Reset id on logout
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, success, id, error }}>
      {children}
    </AuthContext.Provider>
  );
};

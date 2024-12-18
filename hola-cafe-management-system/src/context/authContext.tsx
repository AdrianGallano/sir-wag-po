import dataFetch from "@/services/data-service";
import { decodeToken } from "@/utils/decoder";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  success: boolean;
  id: number;
  error: string | null;
  isManager: boolean;
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
  const initialToken = sessionStorage.getItem("token");
  const initialId = initialToken ? decodeToken(initialToken)?.user_id : 0;

  const [token, setToken] = useState(initialToken);
  const [id, setId] = useState<number>(initialId!);
  const [isManager, setIsManager] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchManagerStatus();
    }
  }, [token]);

  const fetchManagerStatus = async () => {
    try {
      const response = await dataFetch(
        "api/user/manager/me/",
        "GET",
        {},
        token!
      );
      setIsManager(response.is_manager);
      console.log("Manager status:", response.is_manager);
    } catch (error) {
      console.error("Error fetching manager status:", error);
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const payload = { username, password };
    setError(null);

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
      const userId = decodedToken?.user_id;

      if (!userId) {
        throw new Error("User ID not found in token");
      }

      setId(userId);
      setToken(token);
      sessionStorage.setItem("token", token);
      setSuccess(true);
      return true;
    } catch (err) {
      console.error("Error during login:", err);
      setSuccess(false);
      setError("Login failed. Please check your username and password.");
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
    setSuccess(false);
    setId(0);
    setIsManager(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, success, id, error, isManager }}
    >
      {children}
    </AuthContext.Provider>
  );
};

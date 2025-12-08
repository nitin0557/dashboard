import React, { createContext, useState, useCallback, ReactNode } from "react";

type User = {
  role: "Admin";
  username: string;
} | null;

interface AuthContextType {
  user: User;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = React.memo(
  ({ children }) => {
    const [user, setUser] = useState<User>(() => {
      const saved = localStorage.getItem("user");
      if (!saved) return null;
      try {
        return JSON.parse(saved) as User;
      } catch (e) {
        console.warn("Failed to parse user from localStorage:", e);
        localStorage.removeItem("user"); 
        return null;
      }
    });

    const login = useCallback((username: string, password: string) => {
      if (username === "admin" && password === "123456") {
        const userData: User = { role: "Admin", username };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
      return false;
    }, []);

    const logout = () => {
      setUser(null);
      localStorage.removeItem("user");
    };

    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
);

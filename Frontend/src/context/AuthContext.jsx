import React, { createContext, useContext, useState } from "react";
import {
  loginUser,
  registerUser,
  logoutRequest,
  updatePasswordRequest,
  updateProfileRequest,
} from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      const authToken = data.accessToken || data.token;
      if (!authToken) {
        toast.error(data.message || "Login failed");
        return false;
      }
      localStorage.setItem("token", authToken);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(data.user || { email }));
      setUser(data.user || { email });
      toast.success("Welcome back!");
      return true;
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await registerUser({ name, email, password });
      const authToken = data.accessToken || data.token;
      if (!authToken) {
        toast.error(data.message || "Registration failed");
        return false;
      }
      localStorage.setItem("token", authToken);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(data.user || { name, email }));
      setUser(data.user || { name, email });
      toast.success("Account created!");
      return true;
    } catch (err) {
      toast.error("Registration failed. Try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      await logoutRequest(storedRefreshToken);
    } catch (e) {
      // ignore network errors on logout
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logged out");
    }
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const data = await updateProfileRequest(profileData, token);

      if (!data.user) {
        toast.error(data.message || "Failed to update profile");
        return false;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Profile updated");
      return true;
    } catch (err) {
      toast.error("Failed to update profile");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (passwordData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const data = await updatePasswordRequest(passwordData, token);

      if (data.message !== "Password updated") {
        toast.error(data.message || "Failed to update password");
        return false;
      }

      toast.success("Password updated");
      return true;
    } catch (err) {
      toast.error("Failed to update password");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { JournalProvider } from "./context/JournalContext";
import ProtectedRoute from "./components/ui/ProtectedRoute";

import Homepage from "./pages/Homepage";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Journals from "./pages/Journals";
import JournalEditor from "./pages/JournalEditor";
import JournalDetail from "./pages/JournalDetail";  
import Insights from "./pages/Insight";
import Settings from "./pages/Setting";
import NutritionAnalyzer from "./pages/NutritionAnalyzer";
import Billing from "./pages/Billing";

export default function App() {
  return (
    <AuthProvider>
      <JournalProvider>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1c1c28",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#eaeaf2",
                fontSize: "13px",
                borderRadius: "12px",
              },
              success: { iconTheme: { primary: "#4e8c7c", secondary: "#0a0a0f" } },
              error: { iconTheme: { primary: "#d4697b", secondary: "#0a0a0f" } },
            }}
          />
          <Routes>
            {/* Public */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Auth />} />

            {/* Protected */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/journals" element={<ProtectedRoute><Journals /></ProtectedRoute>} />
            <Route path="/journals/new" element={<ProtectedRoute><JournalEditor /></ProtectedRoute>} />
            <Route path="/journals/:id" element={<ProtectedRoute><JournalDetail /></ProtectedRoute>} />
            <Route path="/journals/:id/edit" element={<ProtectedRoute><JournalEditor /></ProtectedRoute>} />
            <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
            <Route path="/nutrition" element={<ProtectedRoute><NutritionAnalyzer /></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </JournalProvider>
    </AuthProvider>
  );
}

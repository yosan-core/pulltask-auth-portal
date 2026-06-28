import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "@pages/authLayout";
import { LoginPage } from "@pages/login";
import { RegisterPage } from "@pages/register";
import { ProtectedRoute } from "@pages/protectedRoute";

function App() {
  return (
    <Routes>
      {/* AuthLayout se monta una vez — el panel izquierdo nunca parpadea */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="flex items-center justify-center h-screen">
              <p className="text-gray-500">Bienvenido a PullTask</p>
            </div>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

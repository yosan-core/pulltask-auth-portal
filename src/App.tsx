import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "@pages/authLayout";
import { LoginPage } from "@pages/login";
import { RegisterPage } from "@pages/register";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

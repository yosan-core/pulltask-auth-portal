import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@services/login";
import { useAuthContext } from "@context/authContext";
import { LoginRequest } from "@domain/auth";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (request: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await login(request);
      signIn({
        token: response.token,
        expiresAt: response.expiresAt,
        userAccountId: response.userAccountId,
        userAccountRole: response.userAccountRole,
      });
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
}

import { useState } from "react";
import { login } from "@services/login";
import { useAuthContext } from "@context/authContext";
import { environment } from "@config/environment";
import type { LoginRequest } from "@domain/auth";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuthContext();

  const handleLogin = async (request: Omit<LoginRequest, "callbackUrl">) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await login({
        ...request,
        callbackUrl: environment.KANBAN_PORTAL_URL,
      });
      signIn({
        token: response.token,
        expiresAt: response.expiresAt,
        userAccountId: response.userAccountId,
        userAccountRole: response.userAccountRole,
      });
      window.location.href = response.callbackUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
}

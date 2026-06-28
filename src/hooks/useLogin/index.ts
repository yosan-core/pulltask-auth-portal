import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { login } from "@services/login";
import type { LoginRequest } from "@domain/auth";

type Credentials = Pick<LoginRequest, "userAccount" | "authenticationCredential">;

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [searchParams]            = useSearchParams();

  const handleLogin = async (credentials: Credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const codeChallenge = searchParams.get("codeChallenge") ?? "";
      const callbackUrl   = searchParams.get("callbackUrl")   ?? "";
      const state         = searchParams.get("state")         ?? "";

      const response = await login({
        ...credentials,
        codeChallenge,
        callbackUrl,
        state,
      });

      const params = new URLSearchParams({
        code:  response.authenticationCode,
        state: response.state,
      });
      window.location.href = `${response.callbackUrl}?${params.toString()}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
}

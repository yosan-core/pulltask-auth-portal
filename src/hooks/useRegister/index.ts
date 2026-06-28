import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@services/register";
import { RegisterRequest } from "@domain/auth";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (request: RegisterRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await register(request);
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRegister, isLoading, error };
}

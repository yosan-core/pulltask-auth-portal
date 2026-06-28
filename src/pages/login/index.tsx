import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useLogin } from "@hooks/useLogin";
import { environment } from "@config/environment";
import { LoginUI } from "./interface";

const loginSchema = z.object({
  userAccount:              z.string().email("Enter a valid email"),
  authenticationCredential: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const [searchParams]                    = useSearchParams();
  const { handleLogin, isLoading, error } = useLogin();

  // If the user lands here directly (without PKCE params from the kanban portal),
  // redirect them to the kanban portal so it can initiate the proper OAuth flow.
  useEffect(() => {
    const callbackUrl = searchParams.get("callbackUrl");
    if (!callbackUrl) {
      window.location.href = environment.KANBAN_PORTAL_URL;
    }
  }, [searchParams]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { userAccount: "", authenticationCredential: "" },
  });

  return (
    <LoginUI
      form={form}
      onSubmit={(values) => handleLogin(values)}
      isLoading={isLoading}
      serverError={error}
    />
  );
}

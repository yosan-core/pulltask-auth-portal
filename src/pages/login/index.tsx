import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "@hooks/useLogin";
import { LoginUI } from "./interface";

const loginSchema = z.object({
  userAccount: z.string().email("Enter a valid email"),
  authenticationCredential: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { handleLogin, isLoading, error } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { userAccount: "", authenticationCredential: "" },
  });

  const onSubmit = (values: LoginFormValues) => {
    handleLogin(values);
  };

  return (
    <LoginUI
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      serverError={error}
    />
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegister } from "@hooks/useRegister";
import { RegisterUI } from "./interface";

const registerSchema = z.object({
  names: z.string().min(1, "Names are required"),
  surnames: z.string().min(1, "Surnames are required"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit"),
  accountName: z.string().min(1, "Account name is required"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const { handleRegister, isLoading, error } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      names: "",
      surnames: "",
      email: "",
      password: "",
      accountName: "",
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    handleRegister(values);
  };

  return (
    <RegisterUI
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      serverError={error}
    />
  );
}

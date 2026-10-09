import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { RegisterFormValues } from "./index";

interface RegisterUIProps {
  form: UseFormReturn<RegisterFormValues>;
  onSubmit: SubmitHandler<RegisterFormValues>;
  isLoading: boolean;
  serverError: string | null;
}

interface FieldProps {
  id: keyof RegisterFormValues;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

const fields: FieldProps[] = [
  { id: "names",          label: "Nombre(s)",          placeholder: "Yohan" },
  { id: "surnames",       label: "Apellido(s)",         placeholder: "Cardona" },
  { id: "email",          label: "Correo electrónico",  type: "email",    placeholder: "example@gmail.com",                       autoComplete: "email" },
  { id: "password",       label: "Contraseña",          type: "password", placeholder: "Mín. 8 chars, 1 mayúscula, 1 número", autoComplete: "new-password" },
  { id: "accountName",    label: "Nombre de usuario",   placeholder: "ycardona" },
];

export function RegisterUI({ form, onSubmit, isLoading, serverError }: RegisterUIProps) {
  const { search } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="w-full max-w-sm py-8 auth-form-panel">
      {/* Logo mobile */}
      <div className="md:hidden mb-8 text-center">
        <span className="text-4xl font-black text-slate-600">pull</span>
        <span className="text-4xl font-black text-brand-500">Task</span>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Crear cuenta</h2>
        <p className="mt-1 text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link
            to={`/login${search}`}
            className="text-brand-500 font-medium hover:text-brand-600 hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map(({ id, label, type = "text", placeholder, autoComplete }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              {label}
            </label>
            <input
              id={id}
              type={type}
              autoComplete={autoComplete}
              placeholder={placeholder}
              {...register(id)}
              disabled={isLoading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                         disabled:bg-slate-100 transition"
            />
            {errors[id] && (
              <p className="mt-1 text-xs text-red-600">{errors[id]?.message}</p>
            )}
          </div>
        ))}

        {serverError && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm text-red-700">{serverError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white
                     hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
        >
          {isLoading ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}

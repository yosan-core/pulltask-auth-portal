import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

interface LoginFormValues {
  userAccount: string;
  authenticationCredential: string;
}

interface LoginUIProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: SubmitHandler<LoginFormValues>;
  isLoading: boolean;
  serverError: string | null;
}

export function LoginUI({ form, onSubmit, isLoading, serverError }: LoginUIProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="w-full max-w-sm auth-form-panel">
      {/* Logo mobile */}
      <div className="md:hidden mb-8 text-center">
        <span className="text-4xl font-black text-slate-600">pull</span>
        <span className="text-4xl font-black text-brand-500">Task</span>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Iniciar sesión</h2>
        <p className="mt-1 text-sm text-slate-500">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-brand-500 font-medium hover:text-brand-600 hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            htmlFor="userAccount"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Correo electrónico
          </label>
          <input
            id="userAccount"
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            {...register("userAccount")}
            disabled={isLoading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                       disabled:bg-slate-100 transition"
          />
          {errors.userAccount && (
            <p className="mt-1 text-xs text-red-600">{errors.userAccount.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="authenticationCredential"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Contraseña
          </label>
          <input
            id="authenticationCredential"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            {...register("authenticationCredential")}
            disabled={isLoading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                       disabled:bg-slate-100 transition"
          />
          {errors.authenticationCredential && (
            <p className="mt-1 text-xs text-red-600">
              {errors.authenticationCredential.message}
            </p>
          )}
        </div>

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
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

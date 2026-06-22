import { Outlet } from "react-router-dom";
import logoUrl from "@assets/logo.png";

export function AuthLayout() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Panel izquierdo — permanece montado mientras se navega entre login y registro */}
      <div className="hidden md:flex flex-col items-center justify-center gap-8 bg-slate-800 p-12">
        <div className="flex flex-col items-center gap-3">
          <img src={logoUrl} alt="pullTask" className="w-40 h-auto" />
          <div className="text-center">
            <div className="text-7xl font-black tracking-tight leading-none select-none">
              <span className="text-slate-400">pull</span>
              <span className="text-brand-500">Task</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">Scrum for All</p>
          <p className="mt-1 text-base text-white/60">Trabajo ágil para todos</p>
        </div>
      </div>

      {/* Panel derecho — solo esta parte cambia entre rutas */}
      <div className="flex items-center justify-center p-8 bg-white overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

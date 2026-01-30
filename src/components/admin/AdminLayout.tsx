"use client";

import { useRouter } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import { logoutAction } from "@/app/gerenciar/login/actions";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/gerenciar/login");
  };

  return (
    <div className="min-h-screen bg-[var(--color-lighter)]">
      <AdminSidebar onLogout={handleLogout} />
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

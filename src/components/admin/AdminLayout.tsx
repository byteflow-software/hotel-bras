"use client";

import { useRouter } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear auth cookie and localStorage
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("admin_auth");
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

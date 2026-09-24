import AdminSidebar from "@/components/navigation/AdminSidebar";
import { requireAdmin } from "@/lib/auth/authorization";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGate>{children}</AdminGate>;
}

async function AdminGate({ children }: { children: React.ReactNode }) {
  try {
    await requireAdmin();
  } catch {
    redirect("/auth?error=admin_required");
  }

  return (
    <>
      <AdminSidebar />
      <div
        className="
        md:pl-[84px]
        pb-20
        md:pb-0
        transition-all
        duration-500
        "
      >
        {children}
      </div>
    </>
  );
}

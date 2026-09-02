import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

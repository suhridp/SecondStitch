export const metadata = { title: "Admin – Second Stitch" };
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container py-10">{children}</main>;
}

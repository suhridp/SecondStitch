// src/app/admin/page.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";

export default async function AdminHome() {
  const sb = await supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!isAdmin(user?.email)) return <p>Not authorized.</p>;

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/donations" className="card p-5">
          Donations
        </Link>
        <Link href="/admin/orders" className="card p-5">
          Orders
        </Link>
        <Link href="/admin/products/new" className="card p-5">
          New Product
        </Link>
      </div>
    </div>
  );
}

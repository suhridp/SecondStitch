import { supabaseServer } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/admin";

export const metadata = { title: "Admin – Orders" };

export default async function AdminOrdersPage() {
  const sb = supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!isAdmin(user?.email)) return <p>Not authorized.</p>;

  const { data: orders } = await sb
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">Orders</h1>
      <div className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="p-3">When</th>
              <th className="p-3">User</th>
              <th className="p-3">Subtotal</th>
              <th className="p-3">Redeemed pts</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {(orders || []).map((o: any) => (
              <tr key={o.id} className="border-t border-[var(--border)]">
                <td className="p-3">
                  {new Date(o.created_at).toLocaleString()}
                </td>
                <td className="p-3">{o.user_id ?? "—"}</td>
                <td className="p-3">${(o.subtotal_cents / 100).toFixed(2)}</td>
                <td className="p-3">{o.points_redeemed}</td>
                <td className="p-3">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// src/app/donate/table.tsx
"use client";
import * as React from "react";

export default function DonateTable() {
  const load = React.useCallback(async () => {
    // fetch donations for this user
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="card p-4">
      {/* render your rows */}
      <p className="text-sm text-slate-600">Donations will appear here.</p>
    </div>
  );
}

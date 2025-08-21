import * as React from "react";

export function ContactForm() {
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  async function onSubmit(formData: FormData) {
    try {
      setStatus("sending");
      const r = await fetch("/api/contact", { method: "POST", body: formData });
      if (!r.ok) throw new Error("Failed");
      setStatus("sent");
    } catch (e) {
      setStatus("error");
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="name"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Your name"
        />
        <input
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          placeholder="Email"
        />
      </div>
      <input
        name="subject"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        placeholder="What would you like to upcycle?"
      />
      <textarea
        name="message"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 h-36 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        placeholder="Share sizes, colors, patterns, vibes…"
      />
      <button
        disabled={status === "sending"}
        className="rounded-xl bg-emerald-500 text-white px-5 py-3 text-sm font-medium shadow-sm hover:shadow-md transition"
      >
        {status === "sending"
          ? "Sending…"
          : status === "sent"
          ? "Sent!"
          : "Send request"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

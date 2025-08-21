import * as React from "react";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`container py-16 md:py-24 ${className}`}>
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl md:text-4xl font-semibold mt-2">{title}</h2>
        {subtitle && <p className="copy mt-4">{subtitle}</p>}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

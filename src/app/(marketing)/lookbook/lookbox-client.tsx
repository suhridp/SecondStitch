// src/app/(marketing)/lookbook/lookbox-client.tsx
"use client";
import * as React from "react";

export default function Lookbox({ children }: { children: React.ReactNode }) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [src, setSrc] = React.useState<string | null>(null);

  // click within this component only
  const onContainerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const fig = target.closest("figure");
    if (!fig) return;
    const img = fig.querySelector("img");
    const s = img?.getAttribute("src");
    if (!s) return;
    setSrc(s);
    dialogRef.current?.showModal();
  };

  // ESC to close
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dialogRef.current?.close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div ref={containerRef} onClick={onContainerClick}>
        {children}
      </div>

      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/50 rounded-2xl p-0 overflow-hidden"
      >
        <button
          className="absolute right-3 top-3 text-white/80"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close"
        >
          ✕
        </button>

        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt="Expanded view"
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />
        )}
      </dialog>
    </>
  );
}

"use client";
import * as React from "react";

export default function Lookbox({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const [src, setSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    const el = document.body;
    function onClick(e: MouseEvent) {
      const t = e.target as HTMLElement;
      const fig = t.closest("figure");
      if (!fig) return;
      const img = fig.querySelector("img");
      if (!img || !img.src) return;
      setSrc(img.getAttribute("src"));
      ref.current?.showModal();
    }
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {children}
      <dialog
        ref={ref}
        className="backdrop:bg-black/50 rounded-2xl p-0 overflow-hidden"
      >
        <button
          className="absolute right-3 top-3 text-white/80"
          onClick={() => ref.current?.close()}
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

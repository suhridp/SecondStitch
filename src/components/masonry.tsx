import Image from "next/image";

export function Masonry({
  images,
  caption,
}: {
  images: { src: string; w: number; h: number; alt: string }[];
  caption?: string;
}) {
  return (
    <div>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        <>
          {images.map((g) => (
            <figure
              key={g.src}
              className="mb-4 break-inside-avoid card overflow-hidden"
            >
              <Image
                src={g.src}
                alt={g.alt}
                width={g.w}
                height={g.h}
                className="w-full h-auto object-cover"
              />
            </figure>
          ))}
        </>
      </div>
      {caption && (
        <p className="text-center text-xs text-slate-500 mt-2">{caption}</p>
      )}
    </div>
  );
}

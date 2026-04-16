import { useState } from "react";
import { mediaUrl } from "../../api/client";

export default function ImagePreview({ src, label, recommended, className = "h-36" }) {
  const [size, setSize] = useState(null);

  if (!src) {
    return (
      <div className={`${className} flex items-center justify-center rounded-lg border border-sky-300/10 bg-white/10 text-sm font-semibold text-slate-400`}>
        Sem imagem
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <img
        src={mediaUrl(src)}
        alt=""
        className={`${className} w-full rounded-lg border border-sky-300/10 object-cover`}
        onLoad={(event) => {
          setSize({
            width: event.currentTarget.naturalWidth,
            height: event.currentTarget.naturalHeight
          });
        }}
      />
      <div className="rounded-lg border border-sky-300/10 bg-slate-950/40 px-3 py-2 text-xs leading-5 text-slate-300">
        {label && <p className="font-bold text-sky-200">{label}</p>}
        {recommended && <p>Recomendado: {recommended}</p>}
        {size && <p>Imagem atual: {size.width} x {size.height} px</p>}
      </div>
    </div>
  );
}

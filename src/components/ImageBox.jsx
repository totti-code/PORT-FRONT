import { mediaUrl } from "../api/client";

export default function ImageBox({ src, alt, className = "h-56" }) {
  const url = mediaUrl(src);
  if (!url) {
    return (
      <div className={`${className} flex items-center justify-center rounded-lg border border-sky-300/10 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.24),transparent_34%),linear-gradient(135deg,#0f2747,#07162a)] text-sm font-semibold text-slate-300`}>
        Imagem em breve
      </div>
    );
  }
  return <img src={url} alt={alt} className={`${className} w-full rounded-lg object-cover`} />;
}

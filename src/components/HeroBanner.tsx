import type { Movie } from '../types/movie';
import { getPosterSrc } from '../utils/poster';

interface HeroBannerProps {
  movie: Movie;
  onPlay: (id: string) => void;
  onInfo: (id: string) => void;
}

export default function HeroBanner({ movie, onPlay, onInfo }: HeroBannerProps) {
  return (
    <div className="relative w-full h-[75vh] max-h-[700px] min-h-[400px] mb-8 overflow-hidden
      max-[480px]:h-[65vh] max-[480px]:min-h-[350px]
      min-[1024px]:h-[80vh] min-[1024px]:max-h-[800px]">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        <img
          src={getPosterSrc(movie)}
          alt={movie.title}
          className="w-full h-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-black via-black/50 to-transparent
          [background:linear-gradient(to_top,#000_0%,rgba(0,0,0,0.5)_35%,transparent_65%),linear-gradient(to_right,rgba(0,0,0,0.6)_0%,transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0
        px-[var(--content-pad)] pb-10 pt-12
        max-w-[1400px] mx-auto
        max-[480px]:pb-6 max-[480px]:pt-6
        min-[1024px]:pb-[60px] min-[1024px]:pt-[72px]">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-gold/15 border border-gold/30
          rounded-full px-4 py-1.5 text-[11px] font-semibold text-gold uppercase tracking-widest
          mb-4 backdrop-blur-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>Destaque da Curadoria</span>
        </div>

        <h2 className="font-display text-[42px] font-bold leading-[1.1] mb-2
          drop-shadow-[0_2px_30px_rgba(0,0,0,0.8)] max-w-[600px]
          max-[480px]:text-[28px]
          min-[768px]:text-[52px]
          min-[1024px]:text-[60px] min-[1024px]:max-w-[700px]">
          {movie.title}
        </h2>

        <p className="text-[15px] text-text-secondary mb-2.5
          max-[480px]:text-[13px] min-[1024px]:text-base">
          {movie.year} · {movie.genres.join(', ')} · {movie.duration}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-base font-bold text-gold">{movie.rating}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold tracking-wide">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.5 9H22L16 13.5L18 21L12 17L6 21L8 13.5L2 9H9.5L12 2Z" fill="#D4AF37" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="12" cy="12" r="4" fill="#000" stroke="#D4AF37" strokeWidth="1" />
              <text x="12" y="14" textAnchor="middle" fill="#D4AF37" fontSize="6" fontWeight="bold">F</text>
            </svg>
            Curadoria
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onPlay(movie.id)}
            className="flex items-center gap-2 px-9 py-3.5 bg-gold text-bg-black text-[15px] font-bold
              rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.3)]
              hover:bg-gold-light hover:scale-[1.03] hover:shadow-[0_6px_28px_rgba(212,175,55,0.4)]
              active:scale-[0.97] transition-all duration-150
              max-[480px]:px-6 max-[480px]:py-3 max-[480px]:text-[13px]
              min-[1024px]:px-11 min-[1024px]:py-4 min-[1024px]:text-base"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z" /></svg>
            Assistir
          </button>
          <button
            onClick={() => onInfo(movie.id)}
            className="flex items-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-xl text-[15px]
              font-medium rounded-xl border border-white/15
              hover:bg-white/18 hover:border-white/25 transition-all duration-150
              max-[480px]:px-4.5 max-[480px]:py-3 max-[480px]:text-[13px]
              min-[1024px]:px-8 min-[1024px]:py-4 min-[1024px]:text-base"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
            </svg>
            Saiba Mais
          </button>
        </div>
      </div>
    </div>
  );
}

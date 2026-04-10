import type { Movie } from '../types/movie';
import { getPosterSrc } from '../utils/poster';

interface MovieCardProps {
  movie: Movie;
  onClick: (id: string) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div
      className="flex-none w-[170px] cursor-pointer transition-transform duration-150
        hover:scale-[1.04] active:scale-[0.97]
        snap-start
        max-[480px]:w-[130px]
        min-[1400px]:w-[220px]
        min-[1024px]:w-[200px]"
      onClick={() => onClick(movie.id)}
    >
      <div className="w-full aspect-[2/3] rounded-xl overflow-hidden relative mb-2.5 bg-surface
        max-[480px]:rounded-lg">
        <img
          src={getPosterSrc(movie)}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 rounded-xl border border-white/6 pointer-events-none" />
        <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-sm px-2 py-0.5 rounded-md
          text-xs font-bold text-gold flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#D4AF37">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {movie.rating}
        </div>
      </div>
      <h4 className="text-[13px] font-semibold leading-tight text-text-primary
        line-clamp-2 mb-0.5 min-[1024px]:text-sm">
        {movie.title}
      </h4>
      <p className="text-xs text-text-tertiary min-[1024px]:text-[13px]">
        {movie.year} · {movie.genres[0]}
      </p>
    </div>
  );
}

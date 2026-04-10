import { useNavigate } from 'react-router-dom';
import { MOVIES, getMovieById, USER_PROFILE } from '../data/movies';
import HeroBanner from '../components/HeroBanner';
import MovieShelf from '../components/MovieShelf';
import PageTransition from '../components/PageTransition';
import { useApp } from '../context/AppContext';
import { getPosterSrc } from '../utils/poster';

export default function HomePage() {
  const navigate = useNavigate();
  const { recentIds } = useApp();

  const handleMovieClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  const handlePlay = (id: string) => {
    navigate(`/player/${id}`);
  };

  const keepWatching = recentIds.map(id => getMovieById(id)).slice(0, 6);

  return (
    <PageTransition>
      <div className="min-h-screen pb-24">
        {/* Header */}
        <header className="flex justify-between items-center px-[var(--content-pad)] py-4
          sticky top-0 z-50 bg-gradient-to-b from-bg-black via-black/85 to-transparent backdrop-blur-xl
          max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="#D4AF37" strokeWidth="1.5" />
              <path d="M2 8h20M2 16h20M8 4v16M16 4v16" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
              <circle cx="12" cy="12" r="3" fill="#D4AF37" opacity="0.8" />
            </svg>
            <h1 className="font-display text-[28px] font-bold text-gold tracking-wide min-[1024px]:text-[32px]">
              Filmeflix
            </h1>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => navigate('/search')}
              className="w-[42px] h-[42px] flex items-center justify-center rounded-full
                hover:bg-white/8 transition-colors"
              aria-label="Buscar"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-gold to-gold-dark
                flex items-center justify-center text-sm font-bold text-bg-black"
              aria-label="Perfil"
            >
              {USER_PROFILE.avatar}
            </button>
          </div>
        </header>

        {/* Hero */}
        <HeroBanner movie={MOVIES.hero} onPlay={handlePlay} onInfo={handleMovieClick} />

        <div className="max-w-[1400px] mx-auto">
          {/* Continuar Assistindo */}
          {keepWatching.length > 0 && (
            <div className="px-[var(--content-pad)] mt-8 mb-4">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Continuar Assistindo
              </h3>
              
              <div className="shelf-scroll flex gap-4 overflow-x-auto overflow-y-hidden pb-4 -my-2 py-2">
                {keepWatching.map(movie => (
                  <div 
                    key={movie.id}
                    onClick={() => handlePlay(movie.id)}
                    className="flex-none w-[240px] cursor-pointer group min-[768px]:w-[280px]"
                  >
                    <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-surface relative mb-2.5">
                      <img src={getPosterSrc(movie)} alt={movie.title} className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:border-gold transition-all">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                      {/* Progress Bar Fixed at 50% */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div className="h-full bg-gold rounded-r-md" style={{ width: '50%' }} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <p className="text-sm font-semibold line-clamp-1 group-hover:text-gold transition-colors">{movie.title}</p>
                      <p className="text-[11px] text-text-tertiary">Restam 53 min</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {MOVIES.shelves.map(shelf => (
            <MovieShelf
              key={shelf.id}
              title={shelf.title}
              icon={shelf.icon}
              movies={shelf.movieIds.map(id => getMovieById(id))}
              onMovieClick={handleMovieClick}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

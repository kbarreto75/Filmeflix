import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_PROFILE, getMovieById } from '../data/movies';
import { getPosterSrc } from '../utils/poster';
import PageTransition from '../components/PageTransition';
import MovieShelf from '../components/MovieShelf';
import { useApp } from '../context/AppContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { myListIds, recentIds } = useApp();

  const myList = myListIds.map(id => getMovieById(id));
  const recent = recentIds.map(id => getMovieById(id));

  // Stable progress values — computed once, not on every re-render
  const [progressMap] = useState(() => {
    const map: Record<string, number> = {};
    recentIds.forEach((id, i) => {
      // Deterministic "random" based on index
      map[id] = [78, 45, 92, 63, 31][i] ?? 50;
    });
    return map;
  });



  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-black pb-24">
      {/* Header Gradient */}
      <div className="relative h-[200px] overflow-hidden min-[768px]:h-[240px]">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-gold-dark/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-black to-transparent" />
        {/* Decorative Film Strip */}
        <div className="absolute top-4 right-8 opacity-10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="#D4AF37" strokeWidth="0.5" />
            <path d="M2 8h20M2 16h20M8 4v16M16 4v16" stroke="#D4AF37" strokeWidth="0.3" />
          </svg>
        </div>
      </div>

      <div className="px-[var(--content-pad)] max-w-[900px] mx-auto -mt-28 relative z-10">
        {/* Avatar + User Info */}
        <div className="flex flex-col items-center mb-8 min-[768px]:flex-row min-[768px]:items-end min-[768px]:gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-gold-dark
            flex items-center justify-center text-4xl font-bold text-bg-black
            shadow-[0_4px_24px_rgba(212,175,55,0.4)] border-4 border-bg-black
            min-[768px]:w-28 min-[768px]:h-28 min-[768px]:text-5xl">
            {USER_PROFILE.avatar}
          </div>
          <div className="text-center mt-4 min-[768px]:text-left min-[768px]:mt-0 min-[768px]:mb-1">
            <h1 className="text-2xl font-bold min-[768px]:text-3xl">{USER_PROFILE.name}</h1>
            <p className="text-sm text-text-secondary mt-1">{USER_PROFILE.email}</p>
            <div className="flex items-center justify-center gap-3 mt-2 min-[768px]:justify-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15
                text-gold text-xs font-semibold border border-gold/25">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {USER_PROFILE.plan}
              </span>
              <span className="text-xs text-text-tertiary">Membro desde {USER_PROFILE.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-10 min-[768px]:gap-4">
          {[
            { value: USER_PROFILE.moviesWatched, label: 'Filmes Assistidos', icon: '🎬' },
            { value: `${USER_PROFILE.hoursWatched}h`, label: 'Horas Assistidas', icon: '⏱️' },
            { value: myList.length, label: 'Minha Lista', icon: '📋' },
          ].map(stat => (
            <div key={stat.label} className="bg-surface rounded-2xl p-5 text-center border border-white/4
              hover:border-gold/20 transition-colors group">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-xl font-bold text-gold group-hover:scale-105 transition-transform
                min-[768px]:text-2xl">{stat.value}</p>
              <p className="text-[11px] text-text-tertiary mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* My List */}
        <MovieShelf
          title="Minha Lista"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
          }
          movies={myList}
          onMovieClick={(id) => navigate(`/movie/${id}`)}
          hideViewAll={true}
        />

        {/* Recent History */}
        <section className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 min-[768px]:text-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            Histórico Recente
          </h2>
          <div className="flex flex-col gap-2">
            {recent.map(movie => (
              <div
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="flex items-center gap-4 p-3 rounded-xl bg-surface/50 border border-white/4
                  cursor-pointer hover:bg-surface hover:border-gold/10 transition-all group"
              >
                <div className="w-14 h-[84px] rounded-lg overflow-hidden shrink-0 bg-surface">
                  <img src={getPosterSrc(movie)} alt={movie.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold line-clamp-1 group-hover:text-gold transition-colors">{movie.title}</p>
                  <p className="text-xs text-text-tertiary mt-1">{movie.year} · {movie.genres[0]} · {movie.duration}</p>
                  <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full" style={{ width: `${progressMap[movie.id] ?? 50}%` }} />
                  </div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"
                  className="shrink-0 group-hover:stroke-gold transition-colors">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            ))}
          </div>
        </section>

        {/* View Settings Button */}
        <section className="mb-8">
          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center justify-between p-5 rounded-2xl bg-surface border border-white/5
              hover:bg-surface-hover hover:border-gold/30 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-[16px] font-bold text-white group-hover:text-gold transition-colors">Configurações Avançadas</h3>
                <p className="text-[13px] text-text-tertiary">Gerenciar conta, streaming, downloads e legendas</p>
              </div>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-tertiary group-hover:translate-x-1 group-hover:text-gold transition-all">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </section>
        {/* App Version */}
        <p className="text-center text-xs text-text-tertiary pb-4">
          Filmeflix v1.0.0
        </p>
      </div>
    </div>
    </PageTransition>
  );
}



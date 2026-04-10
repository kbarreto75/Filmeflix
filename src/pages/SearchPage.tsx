import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOVIES } from '../data/movies';
import { getPosterSrc } from '../utils/poster';
import PageTransition from '../components/PageTransition';

const FILTERS = ['Todos', 'Diretor', 'Década', 'País', 'Gênero'] as const;

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('Todos');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MOVIES.all.filter(m => {
      const matchesText =
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.genres.some(g => g.toLowerCase().includes(q)) ||
        m.cast.some(c => c.name.toLowerCase().includes(q));
      if (!matchesText) return false;
      if (activeFilter === 'Todos') return true;
      if (activeFilter === 'Diretor') return m.director.toLowerCase().includes(q);
      if (activeFilter === 'Década') return String(m.year).includes(q);
      if (activeFilter === 'País') return m.country.toLowerCase().includes(q);
      if (activeFilter === 'Gênero') return m.genres.some(g => g.toLowerCase().includes(q));
      return true;
    });
  }, [query, activeFilter]);

  const handleTrendingClick = useCallback((title: string) => {
    const movie = MOVIES.all.find(m => m.title.toLowerCase().includes(title.toLowerCase()));
    if (movie) navigate(`/movie/${movie.id}`);
  }, [navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/92 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1000px] mx-auto px-[var(--content-pad)] py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-surface hover:bg-white/10 transition-colors"
            aria-label="Voltar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 flex items-center gap-3 bg-surface rounded-2xl px-5 py-3.5
            border border-white/10 transition-all focus-within:border-gold focus-within:shadow-[0_0_0_4px_rgba(212,175,55,0.1)] focus-within:bg-surface-hover">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" className="shrink-0">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar filmes, diretores, gêneros..."
              className="flex-1 text-[15px] font-medium text-text-primary bg-transparent outline-none caret-gold placeholder:text-text-tertiary"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')} className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors" aria-label="Limpar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips inside Header so they blur together */}
        <div className="max-w-[1000px] mx-auto px-[var(--content-pad)] pb-4">
          <div className="shelf-scroll flex gap-2.5 overflow-x-auto">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-none px-5 py-2 rounded-full text-sm font-semibold border transition-all whitespace-nowrap
                  ${activeFilter === f
                    ? 'bg-gold text-bg-black border-gold shadow-[0_2px_12px_rgba(212,175,55,0.3)]'
                    : 'bg-surface text-text-secondary border-white/6 hover:bg-surface-hover hover:text-text-primary'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-[var(--content-pad)]">
        {/* Suggestions (no query) */}
        {!query.trim() && (
          <div className="py-8 animate-fade-in">
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
              </svg>
              Tendências
            </h3>
            <div className="grid gap-3 min-[768px]:grid-cols-2">
              {MOVIES.trending.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleTrendingClick(item.title)}
                  className="flex items-center gap-4 py-4 px-5 border border-white/5 bg-surface/30 cursor-pointer
                    rounded-2xl hover:bg-surface hover:border-white/10 transition-all group"
                >
                  <span className="text-xl font-extrabold text-gold/80 w-6 text-center group-hover:text-gold transition-colors">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-[16px] font-bold text-text-primary group-hover:text-gold transition-colors">{item.title}</p>
                    <p className="text-[13px] text-text-tertiary mt-1">{item.meta}</p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"
                    className="group-hover:stroke-gold group-hover:translate-x-1 transition-all">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-5 mt-12 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
              Explorar Gêneros
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 min-[768px]:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
              {MOVIES.genres.map(genre => (
                <div
                  key={genre.name}
                  onClick={() => setQuery(genre.name)}
                  className="pt-12 pb-5 px-5 rounded-2xl relative overflow-hidden cursor-pointer
                    hover:-translate-y-1 hover:shadow-xl transition-all bg-surface border border-white/5"
                >
                  <span className="text-[16px] font-bold relative z-10 text-white/90">{genre.name}</span>
                  <div className="absolute inset-0 opacity-20 transition-opacity hover:opacity-30"
                    style={{ background: `linear-gradient(135deg, ${genre.color} 0%, transparent 80%)` }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query.trim() && (
          <div className="py-6 animate-fade-in">
            <p className="py-2 mb-4 text-sm text-text-secondary font-medium">
              Encontrados <span className="text-gold font-bold">{results.length}</span> resultado{results.length !== 1 ? 's' : ''}
              {activeFilter !== 'Todos' && <> em <span className="text-white">{activeFilter}</span></>}
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-5
              max-[480px]:grid-cols-2 min-[1024px]:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] mb-12">
              {results.map(movie => (
                <div
                  key={movie.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="cursor-pointer group flex flex-col h-full"
                >
                  <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden mb-3 bg-surface relative">
                    <img src={getPosterSrc(movie)} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
                  </div>
                  <p className="text-[14px] font-semibold line-clamp-2 leading-tight group-hover:text-gold transition-colors">{movie.title}</p>
                  <p className="text-[12px] text-text-tertiary mt-1 font-medium">{movie.year} · <span className="text-text-secondary font-bold">{movie.rating}</span></p>
                </div>
              ))}
            </div>
            {results.length === 0 && (
              <div className="text-center py-20 bg-surface/30 rounded-3xl border border-white/5 mt-8">
                <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <h3 className="text-text-primary text-xl font-bold">Puts... nada encontrado!</h3>
                <p className="text-text-tertiary text-sm mt-2 max-w-[300px] mx-auto">
                  Não achamos nenhum filme com o termo "{query}". Que tal tentar outro nome ou usar os filtros?
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </PageTransition>
  );
}

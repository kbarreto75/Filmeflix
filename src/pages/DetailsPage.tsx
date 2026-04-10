import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getMovieById, MOVIES } from '../data/movies';
import { getPosterSrc } from '../utils/poster';
import { useToast, Toast } from '../components/Toast';
import PageTransition from '../components/PageTransition';
import { useApp } from '../context/AppContext';

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = getMovieById(id || '');
  const [activeTab, setActiveTab] = useState<'elenco' | 'mais-info' | 'similares'>('elenco');
  const { toast, showToast } = useToast();
  const { myListIds, toggleMyList } = useApp();

  const isMyList = myListIds.includes(movie.id);

  const similar = MOVIES.all
    .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
    .slice(0, 6);

  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-black pb-24 relative overflow-hidden">
        {/* Ambilight Effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.16] z-0 transition-colors duration-1000"
          style={{ background: `radial-gradient(circle at top, ${movie.colorAccent} 0%, transparent 60%)` }}
        />

      {/* Backdrop */}
      <div className="relative w-full h-[50vh] max-h-[500px] min-h-[280px] overflow-hidden z-0">
        <img src={getPosterSrc(movie)} alt="" className="w-full h-full object-cover object-[center_30%]" />
        <div className="absolute inset-0
          [background:linear-gradient(to_top,#0a0a0a_0%,rgba(10,10,10,0.6)_50%,transparent_80%),linear-gradient(to_bottom,rgba(0,0,0,0.4)_0%,transparent_25%)]" />
      </div>

      {/* Back Button */}
      <button
        onClick={() => window.location.hash = '#/'}
        className="fixed top-5 left-5 z-50 w-11 h-11 flex items-center justify-center rounded-full
          bg-black/50 backdrop-blur-xl hover:bg-black/70 hover:scale-105 transition-all"
        aria-label="Voltar"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative z-10 -mt-24 px-[var(--content-pad)] pb-24 max-w-[900px] mx-auto
        min-[1024px]:max-w-[1000px]">
        {/* Poster + Info */}
        <div className="flex gap-6 mb-7 max-[480px]:gap-3.5 min-[768px]:gap-6">
          <img
            src={getPosterSrc(movie)}
            alt={movie.title}
            className="w-[160px] h-[240px] rounded-xl object-cover shadow-2xl border border-white/8 shrink-0
              max-[480px]:w-[110px] max-[480px]:h-[165px]
              min-[768px]:w-[200px] min-[768px]:h-[300px]"
          />
          <div className="flex flex-col justify-end flex-1 min-w-0">
            <h2 className="font-display text-[32px] font-bold leading-[1.15] mb-1.5
              max-[480px]:text-[22px] min-[768px]:text-[38px]">{movie.title}</h2>
            <p className="text-[15px] text-text-secondary mb-2.5">{movie.year} · {movie.genres.join(', ')} · {movie.duration}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[17px] font-bold text-gold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {movie.rating}
              </div>
              <div className="flex items-center gap-2 cursor-default">
                <div className="animate-seal-pulse flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="7" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
                    <text x="12" y="15" textAnchor="middle" fill="#D4AF37" fontSize="8" fontWeight="700">F</text>
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-gold uppercase tracking-wider">Selo Editorial</span>
              </div>
            </div>
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={() => navigate(`/player/${movie.id}`)}
          className="flex items-center justify-center gap-2.5 w-full max-w-[500px] py-4 bg-gold text-bg-black
            text-base font-bold rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.3)] mb-6
            hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(212,175,55,0.4)]
            active:translate-y-px active:scale-[0.98] transition-all"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z" /></svg>
          Assistir Agora
        </button>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-8">
          {[
            { 
              icon: isMyList 
                ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>, 
              label: 'Minha Lista' 
            },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>, label: 'Download', message: 'Iniciando o download...' },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>, label: 'Compartilhar', message: 'Link copiado para a área de transferência!' },
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>, label: 'Avaliar', message: 'Que bom que você avaliou o filme!' },
          ].map(action => (
            <button
              key={action.label}
              onClick={() => {
                if (action.label === 'Minha Lista') {
                  toggleMyList(movie.id);
                  showToast(isMyList ? 'Removido da sua lista!' : 'Adicionado à sua lista!');
                } else {
                  showToast(action.message || '');
                }
              }}
              className="flex flex-col items-center gap-1.5 text-xs text-text-secondary px-5 py-3 rounded-xl
                hover:bg-white/5 hover:text-gold transition-all"
            >
              {action.icon}
              <span className={action.label === 'Minha Lista' && isMyList ? 'text-white font-medium' : ''}>{action.label}</span>
            </button>
          ))}
        </div>

        {/* Synopsis */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3">Sinopse</h3>
          <p className="text-[15px] leading-relaxed text-text-secondary max-w-[700px]">{movie.synopsis}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/8 mb-6">
          {(['elenco', 'mais-info', 'similares'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3.5 text-sm font-semibold relative transition-colors
                ${activeTab === tab ? 'text-gold' : 'text-text-tertiary hover:text-text-secondary'}`}
            >
              {tab === 'elenco' ? 'Elenco' : tab === 'mais-info' ? 'Mais Informações' : 'Similares'}
              {activeTab === tab && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-gold rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'elenco' && (
            <div className="shelf-scroll flex gap-5 overflow-x-auto overflow-y-hidden py-2 -my-2">
              {movie.cast.map(member => (
                <div key={member.name} className="flex-none w-[90px] text-center">
                  <div className="w-[72px] h-[72px] rounded-full mx-auto mb-2 bg-surface-light
                    flex items-center justify-center text-2xl font-bold text-gold border-2 border-gold/20">
                    {member.name[0]}
                  </div>
                  <p className="text-xs font-semibold leading-tight line-clamp-2 mb-0.5">{member.name}</p>
                  <p className="text-[11px] text-text-tertiary">{member.role}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'mais-info' && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 min-[768px]:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
              {[
                { label: 'Diretor', value: movie.director },
                { label: 'Duração', value: movie.duration },
                { label: 'País', value: movie.country },
                { label: 'Idioma', value: movie.language },
                { label: 'Estúdio', value: movie.studio },
                { label: 'Ano', value: String(movie.year) },
              ].map(item => (
                <div key={item.label} className="p-4 bg-surface rounded-xl border border-white/4">
                  <p className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider mb-1.5">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'similares' && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 min-[1024px]:grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
              {similar.map(m => (
                <div
                  key={m.id}
                  onClick={() => navigate(`/movie/${m.id}`)}
                  className="rounded-xl overflow-hidden cursor-pointer aspect-[2/3] bg-surface
                    hover:scale-[1.04] transition-transform"
                >
                  <img src={getPosterSrc(m)} alt={m.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Toast {...toast} />
      </div>
    </PageTransition>
  );
}

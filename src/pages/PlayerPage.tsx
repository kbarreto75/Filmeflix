import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getMovieById } from '../data/movies';
import { getPosterSrc } from '../utils/poster';
import { useApp } from '../context/AppContext';

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>();
  const movie = getMovieById(id || '');
  const { addToRecent } = useApp();

  const [controlsVisible, setControlsVisible] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    addToRecent(movie.id);
  }, [movie.id, addToRecent]);

  const showControlsTemporarily = useCallback(() => {
    setControlsVisible(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setControlsVisible(false), 3000);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => { if (hideTimeout.current) clearTimeout(hideTimeout.current); };
  }, []);

  const goBack = () => {
    window.location.href = import.meta.env.BASE_URL + '#/';
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div
        className="fixed inset-0 z-[500] bg-bg-black flex items-center justify-center overflow-hidden"
        onClick={() => setControlsVisible(v => !v)}
        onMouseMove={showControlsTemporarily}
      >
        {/* Ambilight Effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.25] z-0 transition-colors duration-1000 mix-blend-screen"
          style={{ background: `radial-gradient(circle at center, ${movie.colorAccent} 0%, transparent 70%)` }}
        />

        {/* Poster Background */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm brightness-[0.4]"
          style={{ backgroundImage: `url(${getPosterSrc(movie)})` }}
        />
        {/* Film Grain */}
        <div className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`
          }}
        />

        {/* Controls Overlay */}
        <div
          className={`absolute inset-0 flex flex-col justify-between px-8 py-6 bg-black/40
            transition-opacity duration-300 z-10
            min-[1024px]:px-12 min-[1024px]:py-8
            ${controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Top */}
          <div className="flex justify-between items-center">
            <button onClick={goBack} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all active:scale-90" aria-label="Voltar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <div className="text-base font-semibold text-center flex-1 px-4 drop-shadow-sm">{movie.title}</div>
            <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all" aria-label="Configurações">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
            </button>
          </div>

          {/* Center */}
          <div className="flex items-center justify-center gap-14">
            <button className="w-12 h-12 flex items-center justify-center rounded-full opacity-80 hover:bg-white/10 transition-all active:scale-90" aria-label="Retroceder 10s">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" /><text x="12" y="16" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">10</text></svg>
            </button>
            <button
              onClick={() => setShowDisclaimer(true)}
              className="w-20 h-20 flex items-center justify-center rounded-full bg-white/12 backdrop-blur-xl
                border-2 border-white/20 hover:bg-white/20 hover:border-white/30 transition-all active:scale-90"
              aria-label="Play/Pause"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full opacity-80 hover:bg-white/10 transition-all active:scale-90" aria-label="Avançar 10s">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M18 13c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2z" transform="scale(-1,1) translate(-24,0)" /><text x="12" y="16" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">10</text></svg>
            </button>
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-medium text-white/80 min-w-[56px] text-center tabular-nums">00:00</span>
              <div className="flex-1 h-1 bg-white/20 rounded-full relative cursor-pointer group hover:h-1.5 transition-all">
                <div className="h-full bg-gold rounded-full transition-all" style={{ width: '0%' }} />
              </div>
              <span className="text-[13px] font-medium text-white/80 min-w-[56px] text-center tabular-nums">{movie.duration}</span>
            </div>
            <div className="flex justify-end gap-2">
              <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all" aria-label="Legendas">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 12h2M10 12h8M6 16h8M16 16h2" /></svg>
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all" aria-label="Velocidade">
                <span className="text-sm font-bold">1x</span>
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-all" aria-label="Tela cheia">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer Modal */}
        {showDisclaimer && (
          <div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="mx-6 max-w-[420px] w-full bg-surface rounded-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Icone */}
              <div className="flex justify-center pt-8 pb-4">
                <div className="w-16 h-16 rounded-full bg-gold/15 border-2 border-gold/30 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 9v4M12 17h.01" />
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                </div>
              </div>

              {/* Texto */}
              <div className="px-6 pb-2 text-center">
                <h3 className="text-lg font-bold text-text-primary mb-2">Conteúdo Indisponível</h3>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                  Este é um <span className="text-gold font-semibold">protótipo acadêmico</span> desenvolvido para a disciplina de Avaliação de Interfaces. 
                  O Filmeflix não possui direitos de reprodução sobre os filmes exibidos.
                </p>
                <p className="text-[13px] text-text-tertiary leading-relaxed mt-3">
                  A reprodução ou distribuição não autorizada de conteúdo protegido por direitos autorais é crime previsto na 
                  <span className="text-text-secondary font-medium"> Lei nº 9.610/98</span>.
                </p>
              </div>

              {/* Botões */}
              <div className="p-5 flex flex-col gap-2.5">
                <button
                  onClick={goBack}
                  className="w-full py-3.5 bg-gold text-bg-black font-bold text-[15px] rounded-xl
                    hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98] transition-all
                    shadow-[0_4px_16px_rgba(212,175,55,0.3)]"
                >
                  Voltar ao Início
                </button>
                <button
                  onClick={() => setShowDisclaimer(false)}
                  className="w-full py-3 bg-transparent text-text-tertiary font-medium text-[13px] rounded-xl
                    hover:text-text-secondary hover:bg-white/5 transition-all"
                >
                  Explorar Interface do Player
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { getMovieById } from '../data/movies';
import { getPosterSrc } from '../utils/poster';
import { useToast, Toast } from '../components/Toast';

export default function DownloadsPage() {
  const navigate = useNavigate();
  const { toast, showToast } = useToast();
  
  // Usar alguns filmes do banco fake para simular downloads
  const [downloads, setDownloads] = useState([
    { ...getMovieById('parasite'), size: '2.1 GB', status: 'Baixado' },
    { ...getMovieById('fight-club'), size: '1.8 GB', status: 'Baixado' },
    { ...getMovieById('shining'), size: '2.4 GB', status: 'Baixando... 45%' },
  ]);

  const [smartDownloads, setSmartDownloads] = useState(true);

  const removeDownload = (id: string, title: string) => {
    setDownloads(prev => prev.filter(m => m.id !== id));
    showToast(`"${title}" removido dos downloads`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-bg-black pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/92 backdrop-blur-xl px-[var(--content-pad)] py-5">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Meus Downloads
        </h1>
      </div>

      <div className="px-[var(--content-pad)] max-w-[900px] mx-auto pt-4">
        {/* Smart Downloads Toggle */}
        <div className="flex items-center justify-between p-4 mb-6 rounded-2xl bg-surface border border-white/6 cursor-pointer"
             onClick={() => setSmartDownloads(!smartDownloads)}>
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
              ${smartDownloads ? 'bg-gold/15 text-gold' : 'bg-white/5 text-white/50'}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
                <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
                <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
                <path d="M6 18a4 4 0 0 1-1.967-.516"/>
                <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Otimização Inteligente</h3>
              <p className="text-[11px] text-text-tertiary mt-0.5">Baixa recomendados e apaga assistidos</p>
            </div>
          </div>
          {/* Switch */}
          <div className={`relative w-[44px] h-[24px] rounded-full transition-colors duration-200 shrink-0
            ${smartDownloads ? 'bg-gold' : 'bg-white/15'}`}>
            <span
              className="absolute top-[2px] w-[20px] h-[20px] rounded-full bg-white shadow-md transition-all duration-200"
              style={{ left: smartDownloads ? '22px' : '2px' }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        {downloads.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-text-secondary">Seus filmes baixados</span>
            <button className="text-xs text-text-tertiary hover:text-gold transition-colors flex items-center gap-1.5"
                onClick={() => {
                  setDownloads([]);
                  showToast('Todos os downloads foram removidos');
                }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
              Excluir Tudo
            </button>
          </div>
        )}

        {/* Download List */}
        <div className="flex flex-col gap-3">
          {downloads.length > 0 ? (
            downloads.map(movie => (
              <div key={movie.id} className="group flex items-center gap-4 p-3 rounded-xl bg-surface/40 border border-white/4
                hover:bg-surface hover:border-gold/20 transition-all cursor-pointer relative overflow-hidden">
                
                {/* Imagem do Poster */}
                <div 
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="w-20 h-28 max-[480px]:w-16 max-[480px]:h-24 rounded-lg overflow-hidden shrink-0 bg-surface relative"
                >
                  <img src={getPosterSrc(movie)} alt={movie.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Informações */}
                <div className="flex-1 min-w-0 py-1" onClick={() => navigate(`/movie/${movie.id}`)}>
                  <p className="text-[15px] font-bold text-text-primary line-clamp-1 group-hover:text-gold transition-colors">
                    {movie.title}
                  </p>
                  <p className="text-[12px] text-text-tertiary mt-1">
                    {movie.year} · {movie.duration}
                  </p>
                  <p className="text-[12px] font-medium text-text-secondary mt-1">
                    {movie.size}
                  </p>

                  {/* Barra de Progresso caso esteja baixando */}
                  {movie.status.includes('Baixando') && (
                    <div className="mt-2.5 h-[3px] bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '45%' }} />
                    </div>
                  )}
                </div>

                {/* Status / Ações */}
                <div className="flex flex-col items-end gap-3 shrink-0 pr-1">
                  {movie.status === 'Baixado' ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gold/10 border border-gold/20">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5">
                       <polyline points="20 6 9 17 4 12" />
                     </svg>
                     <span className="text-[10px] uppercase font-bold text-gold tracking-wider">Baixado</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" className="animate-bounce">
                       <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                     </svg>
                    </div>
                  )}
                  
                  {/* Botão de Excluir */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeDownload(movie.id, movie.title); }}
                    className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors group/btn"
                    aria-label="Remover"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                         className="text-text-tertiary group-hover/btn:text-red-400">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center text-center py-20 px-8">
              <div className="w-24 h-24 mb-6 rounded-full bg-surface-light border-4 border-surface shadow-[0_0_40px_rgba(255,255,255,0.03)] flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-3">Nenhum download ainda</h2>
              <p className="text-sm text-text-tertiary max-w-[280px]">
                Filmes e séries que você baixar aparecerão aqui para você assistir offline.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="mt-8 px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform"
              >
                Encontrar Filmes
              </button>
            </div>
          )}
        </div>
      </div>

      <Toast {...toast} />
    </div>
    </PageTransition>
  );
}

import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieShelfProps {
  title: string;
  icon: string | React.ReactNode;
  movies: Movie[];
  onMovieClick: (id: string) => void;
  hideViewAll?: boolean;
}

export default function MovieShelf({ title, icon, movies, onMovieClick, hideViewAll }: MovieShelfProps) {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const clientWidth = scrollRef.current.clientWidth;
    const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="mb-10 w-full relative group/shelf">
      <div className="flex justify-between items-center px-[var(--content-pad)] mb-4">
        <h3 className="flex items-center gap-2.5 text-xl font-bold tracking-tight
          max-[480px]:text-[17px] min-[1024px]:text-2xl">
          <span className="flex items-center text-lg">{icon}</span>
          {title}
        </h3>
        {!hideViewAll && (
          <button 
            onClick={() => navigate('/search')}
            className="text-sm text-gold font-semibold hover:text-gold-light transition-colors active:scale-95"
          >
            Ver tudo
          </button>
        )}
      </div>
      
      <div className="relative">
        {/* Left Chevron */}
        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-bg-black via-bg-black/80 to-transparent
              flex items-center justify-start px-2 opacity-0 group-hover/shelf:opacity-100 transition-opacity
              max-[1024px]:hidden"
            aria-label="Rolar para esquerda"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="drop-shadow-lg hover:scale-125 transition-transform"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
        )}

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="shelf-scroll flex gap-4 px-[var(--content-pad)] overflow-x-auto overflow-y-hidden
          py-2 -my-2 min-[768px]:gap-5 min-[1400px]:gap-6 scroll-smooth"
        >
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
          ))}
        </div>

        {/* Right Chevron */}
        {showRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-bg-black via-bg-black/80 to-transparent
              flex items-center justify-end px-2 opacity-0 group-hover/shelf:opacity-100 transition-opacity
              max-[1024px]:hidden"
            aria-label="Rolar para direita"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="drop-shadow-lg hover:scale-125 transition-transform"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        )}
      </div>
    </section>
  );
}

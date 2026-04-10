import { NavLink } from 'react-router-dom';

const navItems = [
  {
    to: '/',
    label: 'Início',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    to: '/search',
    label: 'Buscar',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    to: '/downloads',
    label: 'Downloads',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Perfil',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[200] w-full
      flex justify-around items-center px-1 pt-3 pb-[max(env(safe-area-inset-bottom,16px),12px)]
      bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl
      min-[480px]:justify-center min-[480px]:gap-2 min-[480px]:px-0 min-[480px]:pt-0 min-[480px]:pb-0">
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1.5 px-2 text-[10px] font-medium w-[68px]
            transition-colors duration-150 relative 
            min-[480px]:w-auto min-[480px]:py-2.5 min-[480px]:px-7 min-[480px]:text-[11px]
            ${isActive ? 'text-gold' : 'text-text-tertiary hover:text-text-secondary'}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gold rounded-full" />
              )}
              {item.icon}
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

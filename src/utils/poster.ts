import type { Movie } from '../types/movie';

const POSTER_IMAGES: Record<string, string> = {
  'godfather': '/posters/godfather.png',
  'pulp-fiction': '/posters/pulp-fiction.png',
  'blade-runner': '/posters/blade-runner.png',
  'spirited-away': '/posters/spirited-away.png',
  'parasite': '/posters/parasite.png',
  'fight-club': '/posters/fight-club.png',
  'cidade-de-deus': '/posters/cidade-de-deus.png',
  'clockwork': '/posters/clockwork.png',
  'taxi-driver': '/posters/taxi-driver.png',
  'eternal-sunshine': '/posters/eternal-sunshine.png',
  '2001': '/posters/2001.png',
  'shining': '/posters/shining.png',
  'se7en': '/posters/se7en.png',
  'amelie': '/posters/amelie.png',
  'stalker': '/posters/stalker.png',
  'mulholland': '/posters/mulholland.png',
  'hate': '/posters/hate.png',
  'psycho': '/posters/psycho.png',
  'mood': '/posters/mood.png',
  'rashomon': '/posters/rashomon.png',
};

export function getPosterSrc(movie: Movie): string {
  if (POSTER_IMAGES[movie.id]) {
    return import.meta.env.BASE_URL + POSTER_IMAGES[movie.id].replace(/^\//, '');
  }
  return generatePosterSVG(movie);
}

export function generatePosterSVG(movie: Movie, width = 260, height = 390): string {
  const color = movie.colorAccent || '#D4AF37';
  const title = movie.title.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#0a0a0a"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <rect x="0" y="0" width="${width}" height="${height}" fill="#121212" opacity="0.6"/>
    <text x="${width / 2}" y="${height / 2 - 10}" text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="Inter, sans-serif">
      <tspan x="${width / 2}" dy="0">${title.length > 20 ? title.substring(0, 20) : title}</tspan>
      ${title.length > 20 ? `<tspan x="${width / 2}" dy="22">${title.substring(20, 40)}</tspan>` : ''}
    </text>
    <text x="${width / 2}" y="${height / 2 + 30}" text-anchor="middle" fill="${color}" font-size="12" font-family="Inter, sans-serif">${movie.year}</text>
    <rect x="${width / 2 - 16}" y="${height - 50}" width="32" height="24" rx="4" fill="none" stroke="${color}" stroke-width="1" opacity="0.4"/>
    <rect x="${width / 2 - 9}" y="${height - 46}" width="18" height="9" rx="2" fill="${color}" opacity="0.3"/>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  genres: string[];
  rating: number;
  synopsis: string;
  director: string;
  duration: string;
  country: string;
  language: string;
  studio: string;
  colorAccent?: string;
  cast: CastMember[];
}

export interface CastMember {
  name: string;
  role: string;
}

export interface Shelf {
  id: string;
  title: string;
  icon: string;
  movieIds: string[];
}

export interface MovieData {
  hero: Movie;
  all: Movie[];
  shelves: Shelf[];
  genres: Genre[];
  trending: TrendingItem[];
}

export interface Genre {
  name: string;
  color: string;
}

export interface TrendingItem {
  title: string;
  meta: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
  plan: string;
  moviesWatched: number;
  hoursWatched: number;
  myListIds: string[];
  recentIds: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: string;
  subtitles: boolean;
  videoQuality: string;
  notifications: boolean;
  autoplay: boolean;
  downloadQuality: string;
}

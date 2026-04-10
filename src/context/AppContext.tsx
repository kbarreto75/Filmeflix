/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { USER_PROFILE } from '../data/movies';

interface AppContextType {
  myListIds: string[];
  recentIds: string[];
  toggleMyList: (id: string) => void;
  addToRecent: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [myListIds, setMyListIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('@filmeflix:myList');
    return saved ? JSON.parse(saved) : USER_PROFILE.myListIds;
  });

  const [recentIds, setRecentIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('@filmeflix:recent');
    return saved ? JSON.parse(saved) : USER_PROFILE.recentIds;
  });

  useEffect(() => {
    localStorage.setItem('@filmeflix:myList', JSON.stringify(myListIds));
  }, [myListIds]);

  useEffect(() => {
    localStorage.setItem('@filmeflix:recent', JSON.stringify(recentIds));
  }, [recentIds]);

  const toggleMyList = (id: string) => {
    setMyListIds(prev => 
      prev.includes(id) ? prev.filter(movieId => movieId !== id) : [id, ...prev]
    );
  };

  const addToRecent = (id: string) => {
    setRecentIds(prev => {
      const filtered = prev.filter(movieId => movieId !== id);
      return [id, ...filtered].slice(0, 10); // Keep max 10
    });
  };

  return (
    <AppContext.Provider value={{ myListIds, recentIds, toggleMyList, addToRecent }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

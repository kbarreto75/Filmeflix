/* eslint-disable react-refresh/only-export-components */
import { useState, useCallback } from 'react';

interface ToastState {
  message: string;
  visible: boolean;
}

let toastTimeout: ReturnType<typeof setTimeout> | null = null;

export function Toast({ message, visible }: ToastState) {
  return (
    <div
      className={`fixed bottom-20 left-1/2 -translate-x-1/2 bg-surface-light text-text-primary
        px-7 py-3 rounded-full text-sm font-medium shadow-lg border border-white/8 z-[1000]
        whitespace-nowrap transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24 pointer-events-none'}`}
    >
      {message}
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });

  const showToast = useCallback((message: string) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    setToast({ message, visible: true });
    toastTimeout = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2500);
  }, []);

  return { toast, showToast };
}

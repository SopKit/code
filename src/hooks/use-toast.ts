'use client';

import { useCallback } from 'react';

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const toast = useCallback((props: ToastProps) => {
    // For now, just use a simple alert
    // In a real app, you'd use a proper toast system
    if (props.variant === 'destructive') {
      alert(`Error: ${props.title}\n${props.description || ''}`);
    } else {
      alert(`${props.title}\n${props.description || ''}`);
    }
  }, []);

  return { toast };
}

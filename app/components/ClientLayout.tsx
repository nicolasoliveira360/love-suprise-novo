"use client";

import { useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Aqui podemos adicionar qualquer lógica do lado do cliente que precisarmos
  }, []);

  return children;
} 
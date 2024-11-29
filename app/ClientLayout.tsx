"use client";

import { useEffect } from 'react';
import { Inter } from 'next/font/google';

interface ClientLayoutProps {
  children: React.ReactNode;
  inter: ReturnType<typeof Inter>;
}

export default function ClientLayout({ children, inter }: ClientLayoutProps) {
  useEffect(() => {
    document.body.classList.add(inter.className, 'overflow-y-scroll', 'min-h-screen');
  }, [inter.className]);

  return children;
} 
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await supabase.auth.signOut();
        router.push('/');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
        router.push('/');
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Saindo...</p>
      </div>
    </div>
  );
} 
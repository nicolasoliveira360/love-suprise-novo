"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useUser } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';
import SettingsPanel from './SettingsPanel';
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function DashboardHeader() {
  const { user } = useUser();
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-navy-900/80 backdrop-blur-sm z-40 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo com link para home */}
          <Link 
            href="/" 
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text hover:opacity-80 transition-opacity">
              LoveSurprise
            </span>
          </Link>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <span className="text-gray-300">{user?.user_metadata?.name || user?.email}</span>
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 p-2 rounded-full hover:bg-navy-800/50 transition-colors">
                <UserCircleIcon className="w-6 h-6 text-gray-400" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-navy-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setIsSettingsOpen(true)}
                        className={`${
                          active ? 'bg-navy-700' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                      >
                        Configurações
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={`${
                          active ? 'bg-navy-700' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                      >
                        Sair
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </header>
  );
}
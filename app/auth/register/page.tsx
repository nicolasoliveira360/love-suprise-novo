"use client";

import type { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { EnvelopeIcon, KeyIcon, UserIcon, ArrowLeftIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';
import { useSurprise } from '@/hooks/useSurprise';
import { supabase } from '@/lib/supabase';
import { tempStorage } from '@/utils/storage';

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams?.get('returnUrl') || '/dashboard';
  const [focused, setFocused] = useState<'name' | 'email' | 'password' | 'confirmPassword' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { signUp, loading, error } = useAuth();
  const { createSurprise } = useSurprise();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    try {
      const data = await signUp(formData.email, formData.password, formData.name);
      
      if (data) {
        // Aguardar a autenticação ser completamente estabelecida
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Se houver uma surpresa temporária e estiver indo para pagamento
        const tempSurpriseStr = localStorage.getItem('tempSurprise');
        
        if (tempSurpriseStr) {
          try {
            // Verificar novamente a autenticação antes de criar a surpresa
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
              console.log('Sessão não estabelecida, aguardando...');
              await new Promise(resolve => setTimeout(resolve, 2000));
              
              const { data: { session: retrySession } } = await supabase.auth.getSession();
              if (!retrySession?.user) {
                throw new Error('Sessão não estabelecida após retry');
              }
            }

            const tempSurprise = JSON.parse(tempSurpriseStr);
            console.log('Dados temporários encontrados:', tempSurprise);

            // Recuperar arquivos do IndexedDB
            const photos = await tempStorage.getFiles(tempSurprise.fileIds);
            
            const surprise = await createSurprise({
              coupleName: tempSurprise.coupleName,
              startDate: tempSurprise.startDate,
              message: tempSurprise.message,
              youtubeLink: tempSurprise.youtubeLink || '',
              plan: tempSurprise.plan || 'basic',
              photos: photos,
              status: 'draft'
            });
            
            if (surprise) {
              console.log('Surpresa criada com sucesso:', surprise.id);
              localStorage.removeItem('tempSurprise');
              await tempStorage.clearAll(); // Limpar arquivos temporários
              router.push(`/payment?surpriseId=${surprise.id}`);
              return;
            }
          } catch (err) {
            console.error('Erro ao criar surpresa após registro:', err);
            router.push('/create');
            return;
          }
        }
        
        router.push(returnUrl);
      }
    } catch (err) {
      console.error('Erro no registro:', err);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: keyof typeof formData) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white hover:text-pink-500 transition-colors mb-8"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <div className="bg-navy-800 rounded-2xl p-6 sm:p-8 shadow-neon-pink">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Criar Conta</h1>
            <p className="text-gray-400">Comece a criar suas surpresas</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div className={`relative transition-all ${
              focused === 'name' ? 'scale-105' : ''
            }`}>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-12 pr-4 py-3 bg-navy-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className={`relative transition-all ${
              focused === 'email' ? 'scale-105' : ''
            }`}>
              <div className="relative">
                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-12 pr-4 py-3 bg-navy-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div className={`relative transition-all ${
              focused === 'password' ? 'scale-105' : ''
            }`}>
              <div className="relative">
                <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
                <input
                  type="password"
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={(e) => handleInputChange(e, 'password')}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-12 pr-4 py-3 bg-navy-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Confirmar Senha */}
            <div className={`relative transition-all ${
              focused === 'confirmPassword' ? 'scale-105' : ''
            }`}>
              <div className="relative">
                <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
                <input
                  type="password"
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange(e, 'confirmPassword')}
                  onFocus={() => setFocused('confirmPassword')}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-12 pr-4 py-3 bg-navy-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white transition-all"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <ExclamationCircleIcon className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:opacity-90 transition-all shadow-neon-pink"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  <span>Criando conta...</span>
                </div>
              ) : (
                'Criar conta'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/auth/login" 
              className="text-pink-500 hover:text-pink-400 transition-colors text-sm"
            >
              Já tem uma conta? Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
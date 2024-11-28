"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { QrCodeIcon, LinkIcon, CheckIcon, CheckCircleIcon, SparklesIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import QRCode from 'qrcode';
import { useSurprise } from '@/hooks/useSurprise';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import Link from 'next/link';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isValidSession, setIsValidSession] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [shareableUrl, setShareableUrl] = useState<string>('');
  const [copied, copyToClipboard] = useCopyToClipboard();
  const { updateSurpriseStatus } = useSurprise();
  const [error, setError] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const validateAndUpdateSession = async () => {
      const sessionId = searchParams.get('session_id');
      const surpriseId = searchParams.get('surprise_id');

      if (!sessionId || !surpriseId) {
        router.push('/');
        return;
      }

      try {
        // Atualizar o status da surpresa para 'active'
        const success = await updateSurpriseStatus(surpriseId, 'active');
        if (!success) {
          throw new Error('Falha ao atualizar status da surpresa');
        }
        
        // Gerar URL compartilhável
        const baseUrl = window.location.origin;
        const url = `${baseUrl}/s/${surpriseId}`;
        setShareableUrl(url);
        
        // Gerar QR Code
        const qrCode = await QRCode.toDataURL(url);
        setQrCodeUrl(qrCode);
        
        setIsValidSession(true);
      } catch (error) {
        console.error('Erro ao atualizar status:', error);
        setError(error instanceof Error ? error.message : 'Erro ao processar pagamento');
        router.push('/');
      }
    };

    validateAndUpdateSession();
  }, [searchParams, router, updateSurpriseStatus]);

  const handleCopyLink = async () => {
    if (!shareableUrl) {
      console.error('URL compartilhável não disponível');
      return;
    }

    try {
      await copyToClipboard(shareableUrl);
    } catch (err) {
      console.error('Erro ao copiar:', err);
      // Fallback: Mostrar modal com o link
      alert(`Por favor, copie este link manualmente:\n${shareableUrl}`);
    }
  };

  const handleDownloadQR = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode-surpresa.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-pink-500 hover:text-pink-400"
          >
            Voltar para dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Processando pagamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mx-auto w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
        >
          <CheckCircleIcon className="w-12 h-12 text-green-500" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Surpresa Criada!</h1>
          <p className="text-gray-400">
            Seu presente especial está pronto para ser compartilhado
          </p>
        </div>

        <div className="bg-navy-800 rounded-2xl p-6 space-y-6 shadow-neon-pink">
          {/* QR Code */}
          <div className="space-y-4">
            <div ref={qrRef} className="bg-white p-4 rounded-lg mx-auto w-fit">
              <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
            </div>
            <button
              onClick={handleDownloadQR}
              className="text-sm text-pink-500 hover:text-pink-400 transition-colors"
            >
              Baixar QR Code
            </button>
          </div>

          {/* Link compartilhável */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-4 bg-navy-900 rounded-lg">
              <div className="flex-1 truncate text-sm text-gray-400">
                {shareableUrl}
              </div>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-full bg-navy-800 hover:bg-navy-700 transition-colors"
              >
                {copied ? (
                  <CheckIcon className="w-5 h-5 text-green-500" />
                ) : (
                  <LinkIcon className="w-5 h-5 text-pink-500" />
                )}
              </button>
            </div>
          </div>

          {/* Botões de navegação */}
          <div className="pt-6 border-t border-gray-700 space-y-4">
            {/* Botão para Dashboard */}
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:opacity-90 transition-all shadow-neon-pink"
              >
                Ir para Dashboard
              </motion.button>
            </Link>

            {/* Link para Home */}
            <Link href="/" className="block text-sm text-gray-400 hover:text-white transition-colors">
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
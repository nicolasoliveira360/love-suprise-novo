"use client";

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { HomeIcon, EllipsisVerticalIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { useSurprise } from '@/hooks/useSurprise';
import TimeCounter from '@/app/create/components/TimeCounter';
import HeartRain from '@/app/create/components/HeartRain';
import ImageSlideshow from '@/components/ImageSlideshow';
import ShareModal from './components/ShareModal';
import { createNotification } from '@/lib/notifications';
import { extractYoutubeVideoId } from '@/utils/youtube';

interface SurpriseData {
  id: string;
  couple_name: string;
  start_date: string;
  message: string;
  youtube_link?: string;
  surprise_photos: Array<{
    id: string;
    photo_url: string;
    order_index: number;
  }>;
}

export default function SurprisePage() {
  const params = useParams();
  const { getSurpriseWithPhotos } = useSurprise();
  const [surprise, setSurprise] = useState<SurpriseData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const loadSurprise = useCallback(async () => {
    if (!params.id || hasLoaded) return;
    
    try {
      setIsLoading(true);
      console.log('Carregando surpresa:', params.id);
      
      const data = await getSurpriseWithPhotos(params.id as string);
      
      if (!data) {
        setError('Surpresa não encontrada ou ocorreu um erro ao carregar');
        return;
      }

      console.log('Surpresa carregada:', {
        id: data.id,
        photosCount: data.surprise_photos?.length || 0
      });

      // Criar notificação de visualização apenas se houver user_id
      try {
        if (data.user_id) {
          await createNotification({
            userId: data.user_id,
            surpriseId: data.id,
            type: 'viewed',
            message: `Sua surpresa "${data.couple_name}" foi visualizada!`
          });
        }
      } catch (notificationError) {
        // Se houver erro na notificação, apenas logamos e continuamos
        console.warn('Erro ao criar notificação:', notificationError);
      }

      setSurprise(data as SurpriseData);
      setHasLoaded(true);
    } catch (err) {
      console.error('Erro ao carregar surpresa:', err);
      setError('Erro ao carregar surpresa. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [params.id, getSurpriseWithPhotos, hasLoaded]);

  useEffect(() => {
    loadSurprise();
  }, [loadSurprise]);

  const paginate = useCallback((newDirection: number) => {
    if (!surprise?.surprise_photos) return;
    
    setDirection(newDirection);
    setCurrentImageIndex((prev) => {
      let next = prev + newDirection;
      if (next >= surprise.surprise_photos.length) next = 0;
      if (next < 0) next = surprise.surprise_photos.length - 1;
      return next;
    });
  }, [surprise?.surprise_photos]);

  const handleShare = async (platform: 'whatsapp' | 'facebook' | 'instagram') => {
    const url = window.location.href;
    const text = `Veja essa surpresa especial: ${surprise?.couple_name}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'instagram':
        // Instagram não tem API de compartilhamento direta, 
        // então vamos copiar o link para a área de transferência
        try {
          await navigator.clipboard.writeText(url);
          alert('Link copiado! Você pode compartilhar no Instagram.');
        } catch (err) {
          console.error('Erro ao copiar link:', err);
        }
        break;
    }
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-navy-900 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando surpresa...</p>
        </div>
      </motion.div>
    );
  }

  if (error || !surprise) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-navy-900 flex items-center justify-center"
      >
        <div className="text-center">
          <HeartIcon className="w-12 h-12 text-pink-500/20 mx-auto mb-4" />
          <p className="text-gray-400">{error || 'Surpresa não encontrada'}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 via-purple-900/20 to-navy-900">
      <HeartRain />
      
      {/* Navbar não-fixa */}
      <div className="bg-navy-900/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <button className="p-2 rounded-full bg-navy-800/80 hover:bg-navy-700 transition-colors">
                <HomeIcon className="w-5 h-5 text-white" />
              </button>
            </Link>

            <Menu as="div" className="relative">
              <Menu.Button className="p-2 rounded-full bg-navy-800/80 hover:bg-navy-700 transition-colors">
                <EllipsisVerticalIcon className="w-5 h-5 text-white" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-navy-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setIsShareModalOpen(true)}
                        className={`${
                          active ? 'bg-navy-700' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                      >
                        Compartilhar
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/create"
                        className={`${
                          active ? 'bg-navy-700' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                      >
                        Criar minha surpresa
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4">
        <div className="max-w-[375px] mx-auto space-y-8">
          {/* Nome do casal e contador */}
          <div className="text-center space-y-4">
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text px-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ 
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto'
              }}
            >
              {surprise.couple_name}
            </motion.h1>
            <TimeCounter startDate={surprise.start_date} />
          </div>

          {/* Galeria de fotos */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            <div className="relative w-full aspect-[9/16] bg-navy-900 rounded-2xl overflow-hidden">
              {surprise.surprise_photos?.length > 0 ? (
                <ImageSlideshow 
                  images={surprise.surprise_photos.map(photo => photo.photo_url)}
                  autoPlay={true}
                  interval={7000}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <HeartIcon className="w-12 h-12 text-pink-500/20" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Mensagem */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center space-y-6 px-4"
          >
            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
              {surprise.message}
            </p>
            
            {surprise.youtube_link && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <p className="text-sm text-pink-500 font-medium italic">
                  ✨ Essa música me faz lembrar de você ✨
                </p>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${extractYoutubeVideoId(surprise.youtube_link)}?autoplay=1&rel=0&showinfo=0&modestbranding=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Marca d'água */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center pt-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-900/50 backdrop-blur-sm rounded-full">
              <HeartIcon className="w-4 h-4 text-pink-500" />
              <p className="text-xs font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                Criado com LoveSurprise
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal de compartilhamento */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShare={handleShare}
      />
    </div>
  );
} 
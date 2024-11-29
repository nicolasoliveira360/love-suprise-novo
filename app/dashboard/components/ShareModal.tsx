"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon, 
  QrCodeIcon, 
  LinkIcon, 
  SparklesIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import QRCodeDownload from '@/components/QRCodeDownload';

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  surpriseId: string | null;
};

export default function ShareModal({ isOpen, onClose, surpriseId }: ShareModalProps) {
  const [copied, copyToClipboard] = useCopyToClipboard();
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (surpriseId) {
      const url = `${window.location.origin}/s/${surpriseId}`;
      setShareUrl(url);
    }
  }, [surpriseId]);

  const handleCopyLink = async () => {
    try {
      await copyToClipboard(shareUrl);
      toast.success('Link copiado!');
    } catch (err) {
      console.error('Erro ao copiar:', err);
      toast.error('Erro ao copiar link');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-navy-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    Compartilhar Surpresa
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-navy-700 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-400" />
                  </button>
                </Dialog.Title>

                <div className="space-y-6">
                  {/* QR Code */}
                  <QRCodeDownload 
                    url={shareUrl} 
                    size={300}
                    id={surpriseId || undefined}
                  />

                  {/* Link */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Link da Surpresa
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="flex-1 px-4 py-2 bg-navy-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                      />
                      <motion.button
                        onClick={handleCopyLink}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-2 bg-navy-900 rounded-lg hover:bg-navy-700 transition-colors"
                      >
                        <LinkIcon className="w-5 h-5 text-gray-400" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
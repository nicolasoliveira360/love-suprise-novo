"use client";

import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';
import QRCode from 'qrcode';

interface QRCodeDownloadProps {
  url: string;
  size?: number;
  id?: string;
}

export default function QRCodeDownload({ url, size = 300, id }: QRCodeDownloadProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    try {
      // Gerar QR Code em alta resolução usando qrcode
      const highResQR = await QRCode.toDataURL(url, {
        width: 1200,
        margin: 1,
        errorCorrectionLevel: 'H',
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });

      // Criar novo documento PDF A4
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: false // Desabilitar compressão para melhor qualidade
      });

      // Tamanho da página A4 em mm
      const pageWidth = 210;
      const pageHeight = 297;

      // Tamanho desejado do QR Code (100mm x 100mm)
      const qrSize = 100;

      // Calcular posição central
      const xPosition = (pageWidth - qrSize) / 2;
      const yPosition = (pageHeight - qrSize) / 2;

      // Configurar fonte
      pdf.setFont('helvetica', 'bold');

      // Adicionar título
      pdf.setFontSize(24);
      pdf.setTextColor(0, 0, 0);
      pdf.text('LoveSurprise', pageWidth / 2, 30, { align: 'center' });

      // Adicionar subtítulo
      pdf.setFontSize(16);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Escaneie o QR Code para acessar sua surpresa', pageWidth / 2, 45, { align: 'center' });

      // Adicionar QR Code em alta resolução
      pdf.addImage(highResQR, 'PNG', xPosition, yPosition, qrSize, qrSize, undefined, 'FAST');

      // Adicionar URL abaixo do QR Code
      pdf.setFontSize(12);
      pdf.setTextColor(51, 51, 51);
      pdf.text('Link direto:', pageWidth / 2, yPosition + qrSize + 15, { align: 'center' });
      pdf.setTextColor(0, 102, 204);
      pdf.text(url, pageWidth / 2, yPosition + qrSize + 25, { align: 'center' });

      // Adicionar rodapé
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      const today = new Date().toLocaleDateString('pt-BR');
      pdf.text(`Gerado em ${today}`, pageWidth / 2, pageHeight - 20, { align: 'center' });

      // Salvar PDF com configurações otimizadas
      pdf.save(`lovesurprise-qrcode${id ? `-${id}` : ''}.pdf`);
      toast.success('QR Code baixado com sucesso!');

    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      toast.error('Erro ao gerar PDF do QR Code');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        ref={qrRef}
        className="p-4 bg-white rounded-xl"
      >
        <QRCodeCanvas 
          value={url}
          size={size}
          level="H"
          includeMargin={true}
          style={{ 
            width: '100%', 
            height: '100%',
            imageRendering: 'pixelated'
          }}
        />
      </div>
      <motion.button
        onClick={handleDownloadPDF}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2 bg-navy-900 text-white rounded-full text-sm hover:bg-navy-700 transition-colors"
      >
        <QrCodeIcon className="w-5 h-5" />
        Baixar QR Code (PDF)
      </motion.button>
    </div>
  );
} 
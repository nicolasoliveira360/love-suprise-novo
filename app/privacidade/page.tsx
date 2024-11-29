"use client";

import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';

export default function PoliticaPrivacidade() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-navy-900 via-purple-900/20 to-navy-900">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
            <ArrowLeftIcon className="w-4 h-4" />
            Voltar para home
          </Link>

          <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>

          <div className="prose prose-invert">
            <h2>1. Informações Coletadas</h2>
            <p>
              Coletamos as seguintes informações:
            </p>
            <ul>
              <li>Nome e e-mail para cadastro</li>
              <li>Fotos enviadas para as surpresas</li>
              <li>Mensagens e textos das surpresas</li>
              <li>Informações de pagamento (processadas de forma segura)</li>
            </ul>

            <h2>2. Uso das Informações</h2>
            <p>
              Suas informações são usadas para:
            </p>
            <ul>
              <li>Criar e gerenciar sua conta</li>
              <li>Processar pagamentos</li>
              <li>Exibir seu conteúdo nas surpresas</li>
              <li>Melhorar nossos serviços</li>
            </ul>

            <h2>3. Proteção de Dados</h2>
            <p>
              Utilizamos medidas de segurança para proteger suas informações. Os dados são armazenados em servidores seguros e criptografados.
            </p>

            <h2>4. Compartilhamento</h2>
            <p>
              Não vendemos suas informações pessoais. Compartilhamos dados apenas:
            </p>
            <ul>
              <li>Com seu consentimento explícito</li>
              <li>Para processar pagamentos</li>
              <li>Quando exigido por lei</li>
            </ul>

            <h2>5. Cookies</h2>
            <p>
              Usamos cookies para melhorar sua experiência e manter você conectado. Você pode desativá-los nas configurações do navegador.
            </p>

            <h2>6. Seus Direitos</h2>
            <p>
              Você tem direito a:
            </p>
            <ul>
              <li>Acessar seus dados</li>
              <li>Corrigir informações incorretas</li>
              <li>Solicitar exclusão de dados</li>
              <li>Exportar suas informações</li>
            </ul>

            <h2>7. Contato</h2>
            <p>
              Para questões sobre privacidade, entre em contato através do e-mail: privacy@lovesurprise.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 
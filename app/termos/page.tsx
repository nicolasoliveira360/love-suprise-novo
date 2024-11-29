"use client";

import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';

export default function TermosDeUso() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-navy-900 via-purple-900/20 to-navy-900">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
            <ArrowLeftIcon className="w-4 h-4" />
            Voltar para home
          </Link>

          <h1 className="text-3xl font-bold mb-8">Termos de Uso</h1>

          <div className="prose prose-invert">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar o LoveSurprise, você concorda com estes termos de uso. Se você não concordar com qualquer parte destes termos, não use nosso serviço.
            </p>

            <h2>2. Uso do Serviço</h2>
            <p>
              O LoveSurprise permite que você crie páginas personalizadas com conteúdo romântico. Você é responsável por todo o conteúdo que enviar.
            </p>

            <h2>3. Conteúdo do Usuário</h2>
            <p>
              Você mantém todos os direitos sobre o conteúdo que enviar, mas nos concede uma licença para exibi-lo em nossa plataforma.
            </p>

            <h2>4. Restrições</h2>
            <p>
              Não é permitido:
            </p>
            <ul>
              <li>Enviar conteúdo ilegal ou ofensivo</li>
              <li>Violar direitos autorais</li>
              <li>Usar a plataforma para spam</li>
              <li>Tentar acessar áreas restritas do sistema</li>
            </ul>

            <h2>5. Pagamentos</h2>
            <p>
              Os pagamentos são processados de forma segura. Reembolsos podem ser solicitados em até 7 dias após a compra.
            </p>

            <h2>6. Cancelamento</h2>
            <p>
              Você pode cancelar sua conta a qualquer momento. O conteúdo associado será removido após 30 dias.
            </p>

            <h2>7. Alterações nos Termos</h2>
            <p>
              Podemos atualizar estes termos ocasionalmente. Continuando a usar o serviço após as alterações, você concorda com os novos termos.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 
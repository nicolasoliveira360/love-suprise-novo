"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeartIcon, CheckIcon } from '@heroicons/react/24/outline';
import HeartRain from '@/app/create/components/HeartRain';
import Navbar from '@/components/Navbar';

// Dados dos planos
const PLANS = [
  {
    name: 'Básico',
    price: 'R$29',
    features: [
      '1 mês de acesso',
      '3 fotos',
      'Sem música'
    ]
  },
  {
    name: 'Premium',
    price: 'R$49',
    tag: 'MAIS ESCOLHIDO',
    features: [
      'Pra sempre',
      '7 fotos',
      'Com música'
    ]
  }
];

// Depoimentos com avatares da Unsplash
const TESTIMONIALS = [
  {
    name: 'João Silva',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    text: 'Minha namorada amou a surpresa! Foi um momento super especial.'
  },
  {
    name: 'Maria Santos',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    text: 'Nunca imaginei que seria tão fácil criar algo tão bonito!'
  },
  {
    name: 'Pedro Costa',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    text: 'A reação dela quando viu o QR Code foi incrível! Recomendo muito.'
  },
  {
    name: 'Ana Lima',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    text: 'Melhor presente que já dei. Vale muito a pena!'
  }
];

// Perguntas frequentes
const FAQS = [
  {
    question: 'O que é o LoveSurprise?',
    answer: ''
  },
  {
    question: 'Como recebo minha página personalizada após o pagamento?',
    answer: ''
  },
  {
    question: 'A página personalizada tem validade?',
    answer: ''
  },
  {
    question: 'Posso editar minha página depois de criada?',
    answer: ''
  },
  {
    question: 'Quais são as formas de pagamento?',
    answer: ''
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-navy-900 via-purple-900/20 to-navy-900">
      <HeartRain />
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
          >
            O presente perfeito para surpreender seu amor
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400"
          >
            Crie uma página repleta de emoção e significado, onde cada detalhe expressa todo o seu afeto. Uma experiência inesquecível que fortalecerá sua conexão.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/create">
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:opacity-90 transition-all shadow-neon-pink">
                Quero fazer meu site
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="container mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-center mb-12">Como funciona</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-navy-800/50 p-6 rounded-2xl space-y-4"
          >
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <h3 className="font-semibold">Preencha os dados</h3>
            <p className="text-gray-400">Insira as informações do seu relacionamento</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-navy-800/50 p-6 rounded-2xl space-y-4"
          >
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <h3 className="font-semibold">Faça o pagamento</h3>
            <p className="text-gray-400">Escolha o plano que mais combina com você</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-navy-800/50 p-6 rounded-2xl space-y-4"
          >
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <h3 className="font-semibold">Receba o seu site</h3>
            <p className="text-gray-400">Seu QR Code chegará no e-mail</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-navy-800/50 p-6 rounded-2xl space-y-4"
          >
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              4
            </div>
            <h3 className="font-semibold">Surpreenda</h3>
            <p className="text-gray-400">Compartilhe o amor de forma única</p>
          </motion.div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="container mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-center mb-12">O que dizem sobre nós</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-navy-800/50 p-6 rounded-2xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                <span className="font-medium">{testimonial.name}</span>
              </div>
              <p className="text-gray-400 text-sm">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Preços */}
      <section className="container mx-auto px-4 pb-20" id="precos">
        <h2 className="text-2xl font-bold text-center mb-12">Preços</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2 }}
              className={`bg-navy-800/50 p-8 rounded-3xl space-y-6 ${
                plan.tag ? 'border-2 border-pink-500' : ''
              }`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  {plan.price}
                </p>
                {plan.tag && (
                  <span className="inline-block px-3 py-1 bg-pink-500 text-xs text-white rounded-full mt-2">
                    {plan.tag}
                  </span>
                )}
              </div>

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-pink-500" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/create">
                <button className={`w-full py-3 rounded-full font-medium transition-colors ${
                  plan.tag 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90'
                    : 'bg-navy-900 text-white border border-pink-500/30 hover:border-pink-500'
                }`}>
                  Quero fazer meu site
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 pb-20" id="faq">
        <h2 className="text-2xl font-bold text-center mb-12">FAQ</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, index) => (
            <motion.details
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group bg-navy-800/50 rounded-2xl"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-medium">{faq.question}</span>
                <span className="text-pink-500 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400">
                {faq.answer}
              </div>
            </motion.details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-gray-400">
        <p>Feito com ❤️ para todos os apaixonados</p>
        <div className="mt-4 space-x-4">
          <Link href="/termos" className="hover:text-white">Termos de uso</Link>
          <Link href="/privacidade" className="hover:text-white">Política de privacidade</Link>
        </div>
      </footer>
    </main>
  );
}
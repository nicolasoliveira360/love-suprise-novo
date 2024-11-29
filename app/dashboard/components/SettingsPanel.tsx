"use client";

import { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

type SettingsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface FormData {
  name: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { user, refreshUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Carregar dados do usuário quando o painel abrir
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.user_metadata?.name || ''
      }));
    }
  }, [user, isOpen]);

  const validateForm = () => {
    // Sempre requer senha atual para qualquer alteração
    if (!formData.currentPassword) {
      setError("Digite sua senha atual para confirmar as alterações");
      return false;
    }

    // Se estiver alterando a senha, valida a confirmação
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return false;
    }

    // Se nenhuma alteração foi feita
    if (formData.name === user?.user_metadata?.name && !formData.newPassword) {
      setError("Nenhuma alteração foi feita");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Primeiro verifica a senha atual
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: formData.currentPassword
      });

      if (signInError) {
        throw new Error("Senha atual incorreta");
      }

      // Se houver alteração de senha
      if (formData.newPassword) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: formData.newPassword
        });
        if (passwordError) throw passwordError;
        toast.success('Senha atualizada com sucesso!');
      }

      // Atualizar nome nos metadados
      if (formData.name !== user?.user_metadata?.name) {
        const { error: updateError } = await supabase.auth.updateUser({
          data: { name: formData.name }
        });
        if (updateError) throw updateError;
        toast.success('Nome atualizado com sucesso!');
      }

      // Atualizar dados do usuário no contexto
      await refreshUser();
      
      setIsEditing(false);
      // Limpar campos de senha
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      setError(error.message || 'Erro ao atualizar perfil. Tente novamente.');
      toast.error(error.message || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
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
                    Configurações da Conta
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-navy-700 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-400" />
                  </button>
                </Dialog.Title>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500">
                    <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 bg-navy-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {isEditing && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Senha Atual
                        </label>
                        <input
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-4 py-2 bg-navy-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                          placeholder="Digite sua senha atual para confirmar as alterações"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Nova Senha (opcional)
                        </label>
                        <input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-4 py-2 bg-navy-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                          placeholder="Deixe em branco para não alterar"
                        />
                      </div>

                      {formData.newPassword && (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Confirmar Nova Senha
                          </label>
                          <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full px-4 py-2 bg-navy-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                          />
                        </div>
                      )}
                    </>
                  )}

                  {!isEditing ? (
                    <motion.button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:opacity-90 transition-all shadow-neon-pink"
                    >
                      Editar Perfil
                    </motion.button>
                  ) : (
                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setError("");
                          setFormData({
                            name: user?.user_metadata?.name || '',
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          });
                        }}
                        className="flex-1 py-3 bg-navy-900 text-white rounded-full font-semibold border border-gray-700 hover:border-pink-500 transition-all"
                      >
                        Cancelar
                      </motion.button>
                      
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold hover:opacity-90 transition-all shadow-neon-pink disabled:opacity-50"
                      >
                        {loading ? 'Salvando...' : 'Salvar'}
                      </motion.button>
                    </div>
                  )}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
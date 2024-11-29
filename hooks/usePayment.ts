import { supabase } from '@/lib/supabase';

export function usePayment() {
  const checkPaymentStatus = async (surpriseId: string) => {
    try {
      const { data, error } = await supabase
        .from('surprises')
        .select('status')
        .eq('id', surpriseId)
        .single();

      if (error) throw error;

      const lastPayment = localStorage.getItem('lastPaymentId');
      if (lastPayment === surpriseId) {
        return false;
      }

      return data?.status === 'active';
    } catch (err) {
      console.error('Erro ao verificar status do pagamento:', err);
      return false;
    }
  };

  const setLastPayment = (surpriseId: string) => {
    localStorage.setItem('lastPaymentId', surpriseId);
  };

  const clearLastPayment = () => {
    localStorage.removeItem('lastPaymentId');
  };

  return { checkPaymentStatus, setLastPayment, clearLastPayment };
} 
import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShieldCheck, Laptop, Smartphone, CreditCard } from 'lucide-react';

const CheckoutForm = ({ amount, onSuccess, onCancel, customerDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsProcessing(false);
      return;
    }

    try {
      // 1. Create Payment Intent on the server
      const { data: { clientSecret } } = await axios.post('/api/payment/create-intent', {
        amount: amount,
        name: customerDetails?.name,
        email: customerDetails?.email
      });

      // 2. Confirm the payment with PaymentElement
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/orders`, 
        },
        redirect: 'if_required', // Avoid redirect if possible (e.g. for card without 3DS)
      });

      if (error) {
        setErrorMessage(error.message);
        toast.error(error.message);
      } else {
        toast.success("Payment Received! Your order is being processed.");
        onSuccess();
      }
    } catch (err) {
      toast.error("An error occurred during payment processing.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[var(--bg-secondary)] p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-[var(--border-color)] mt-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--text-accent)]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3 text-[var(--text-primary)]">
          <Smartphone size={18} className="text-[var(--text-secondary)]" />
          <h3 className="text-sm font-black uppercase tracking-widest italic">Digital Settlement</h3>
        </div>
        <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[8px] font-black text-[var(--text-primary)] rounded-lg uppercase tracking-widest shadow-sm">Encrypted Protocol</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        <div className="p-6 border border-[var(--border-color)] rounded-3xl bg-[var(--bg-primary)] shadow-inner">
          <PaymentElement options={{ 
            layout: 'tabs',
            business: { name: 'Pre-See-Jan Luxury' },
            theme: 'night'
          }} />
        </div>

        {errorMessage && (
          <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
            {errorMessage}
          </div>
        )}

        <div className="flex items-center gap-3 text-[10px] text-[var(--text-secondary)] font-medium uppercase tracking-wider mb-6">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>India Express Gateway: UPI, GPay & Cards Secured.</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-8 py-5 border border-[var(--border-color)] rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all"
          >
            Abort
          </button>
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className={`flex-1 px-8 py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
          >
            {isProcessing ? 'Authenticating...' : `Authorize ₹${amount.toLocaleString("en-IN")}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;

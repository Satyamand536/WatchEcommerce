import React, { useState } from "react";
import { useCart } from "../CartContext";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, ShieldCheck, CreditCard, Truck, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
import { motion as Motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import WatchImage from "./ui/WatchImage";
import UPIModal from "./UPIModal";
import axios from "axios";

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Iq8C0SH8S9f8X9X9X9X9X9X9X9X9X9X9X9X9X9X9X9X9X9X9X9X9X9X9X9X9X'; // User's existing key
let stripePromise = null;

try {
  // Only attempt to load if key is not a placeholder
  if (STRIPE_PUBLISHABLE_KEY && !STRIPE_PUBLISHABLE_KEY.includes('X9X9')) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
} catch {
  console.warn("Stripe initialization suspended: Invalid Key Protocol.");
}

// Theme sync verification: Forced HMR update
const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    increment,
    decrement,
    toggleSelect,
    removeItem,
    clearCart,
    clearSelectedItems,
    totalPrice,
  } = useCart();

  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showStripe, setShowStripe] = useState(false);
  const [showUPI, setShowUPI] = useState(false);
  const [showCODConfirmation, setShowCODConfirmation] = useState(false); // New state for COD confirmation
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const isFormValid = () => {
    if (!name.trim() || !email.trim() || !address.trim() || !mobile.trim() || !paymentMethod.trim()) return false;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOk = /^[0-9]{10}$/.test(mobile.replace(/\s+/g, ""));
    return emailOk && phoneOk;
  };
  // Check if any items are selected for purchase
  const selectedItems = cart.filter(item => item.selected);
  const hasSelectedItems = selectedItems.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation: Check if any items are selected
    if (!hasSelectedItems) {
      toast.error("Selection Required: Please select at least one item to proceed.");
      return;
    }
    
    if (!isFormValid()) {
      toast.error("Protocol Incomplete: Verify all fields.");
      return;
    }
    if (paymentMethod === "Online") {
      // Toggle UPI selection modal instead of immediate Stripe
      setShowUPI(true);
      return;
    }
    
    // For COD, show confirmation modal first
    if (paymentMethod === "Cash on Delivery") {
       setShowCODConfirmation(true);
       return;
    }
  };

  const generateTransmissionId = () => {
    return `CHRONO-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const generateDeliveryDays = () => {
    return Math.floor(Math.random() * 4) + 2;
  };

  const processOrder = () => {
    // Capture order details before clearing cart
    const orderDate = new Date();
    const deliveryDays = generateDeliveryDays();
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    
    const manifest = {
      items: cart.filter(item => item.selected),
      subtotal: totalPrice,
      tax: totalPrice * 0.08,
      grandTotal: totalPrice * 1.08,
      transmissionId: generateTransmissionId(),
      timestamp: orderDate.toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' }),
      orderTime: orderDate.toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' }),
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      deliveryDays: deliveryDays,
      consumer: name,
      email: email,
      mobile: mobile,
      destination: address,
      protocol: 'CASH ON DELIVERY'
    };
    
    // Sync with backend (Demo persistence)
    handleDemoPayment(manifest);
  };

  const handleDemoPayment = async (manifest) => {
    try {
      // Future-Proof Architecture: This call can be replaced with Razorpay verification
      await axios.post('http://127.0.0.1:5000/api/payment/demo-success', { manifest });
      
      setCompletedOrder(manifest);
      setOrderSuccess(true);
      clearSelectedItems();
      toast.success("Identity Verified. Logistics Initiated.");
    } catch (error) {
       console.error("Backend Sync Protocol Failure:", error);
       toast.error("Transmission Error: Backend Sync Failed.");
    }
  };

  if (orderSuccess) {
    const isUPI = completedOrder?.protocol === 'SECURE DIGITAL';
    
    return (
      <div className={`min-h-screen ${isUPI ? 'bg-[var(--bg-primary)]' : 'bg-zinc-50 dark:bg-zinc-950'} flex flex-col items-center justify-center px-4 py-20 transition-colors duration-1000 text-center relative overflow-hidden print:!bg-white print:!p-4`}>
        {/* Premium Background Elements - Hidden in Print */}
        <div className="absolute inset-0 pointer-events-none opacity-20 print:hidden">
          <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${isUPI ? 'bg-emerald-500/10' : 'bg-amber-500/10'}`}></div>
          <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${isUPI ? 'bg-emerald-400/10' : 'bg-amber-400/10'}`}></div>
        </div>

        {/* Go Back Button - Top Left */}
        <button 
          onClick={() => {
            if (cart.length > 0) {
              setOrderSuccess(false);
              setCompletedOrder(null);
            } else {
              window.location.href = "/watches";
            }
          }}
          className="absolute top-8 left-8 flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-[var(--text-primary)] transition-colors print:hidden z-20"
        >
          <ArrowLeft size={14} />
          {cart.length > 0 ? 'Go Back' : 'Browse Collections'}
        </button>

        <Motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full relative z-10"
        >
          {/* Status Indicator */}
          <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-10 border-2 shadow-2xl transition-all duration-700 print:shadow-none print:border-2 ${isUPI ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500 print:bg-emerald-50 print:border-emerald-400 print:text-emerald-600' : 'bg-amber-500/5 border-amber-500/20 text-amber-500 print:bg-amber-50 print:border-amber-400 print:text-amber-600'}`}>
            <Motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              {isUPI ? <CheckCircle2 size={48} /> : <Truck size={48} />}
            </Motion.div>
          </div>
          
          <h2 className={`text-5xl md:text-7xl font-black italic tracking-tighter mb-4 uppercase leading-[0.9] print:text-4xl ${isUPI ? 'text-[var(--text-primary)] print:!text-emerald-700' : 'text-amber-600 dark:text-amber-500 print:!text-amber-700'}`}>
            {isUPI ? 'Transaction' : 'Order'}<br/>
            <span className="opacity-40 print:opacity-60">{isUPI ? 'Settled.' : 'Confir-med.'}</span>
          </h2>
          
          <p className="text-[var(--text-secondary)] font-medium mb-12 text-sm md:text-base border-y border-[var(--border-color)] py-4 inline-block px-10">
            {isUPI ? "Your digital footprint has been verified and settled." : "Your delivery protocol has been activated. Prepare for COD settlement."}
          </p>
          
          {/* THE RECEIPT CARD */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[3rem] p-8 md:p-12 text-left relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] print:shadow-none print:!bg-white print:border-gray-300 print:rounded-xl">
             {/* Large Watermark - Hidden in Print */}
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black italic opacity-[0.03] select-none pointer-events-none tracking-tighter print:hidden ${isUPI ? 'text-emerald-500' : 'text-amber-500'}`}>
                {isUPI ? 'PAID' : 'COD'}
             </div>

             <div className="relative z-10 space-y-10">
                {/* Protocol Header */}
                <div className="flex justify-between items-start border-b border-[var(--border-color)] pb-8">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">CHRONO-ID</span>
                      <span className="text-sm font-black text-[var(--text-primary)] tracking-tight font-mono">{completedOrder?.transmissionId}</span>
                   </div>
                   <div className="flex flex-col gap-2 items-end">
                      <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isUPI ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                        {isUPI ? 'PAID IN FULL' : 'PAY ON ARRIVAL'}
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 tabular-nums">{completedOrder?.timestamp}</span>
                   </div>
                </div>

                {/* Amount Highlight */}
                <div className={`rounded-3xl p-8 border ${isUPI ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'} flex flex-col items-center text-center gap-1`}>
                   <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isUPI ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {isUPI ? 'Amount Hallmarked' : 'Balance to be Collected'}
                   </span>
                   <span className="text-4xl md:text-5xl font-black italic tracking-tighter tabular-nums text-[var(--text-primary)] leading-none">
                      ₹{completedOrder?.grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                   </span>
                </div>

                {/* Manifest Summary */}
                <div className="space-y-4">
                   <div className="flex items-center gap-4 mb-2">
                      <div className="h-[1px] flex-1 bg-[var(--border-color)]"></div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.5em]">ITEMIZED MANIFEST</span>
                      <div className="h-[1px] flex-1 bg-[var(--border-color)]"></div>
                   </div>
                   {completedOrder?.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center group">
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-[var(--bg-primary)] rounded-xl flex items-center justify-center p-2 border border-[var(--border-color)] transition-transform group-hover:scale-105">
                               <WatchImage src={item.img} alt={item.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-tight">{item.name}</span>
                               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.qty} UNIT • {item.brand || 'Luxury'}</span>
                            </div>
                         </div>
                         <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">1 Piece Cost</span>
                            <span className="text-xs font-black text-[var(--text-primary)] italic tracking-tighter">
                               Rs. {typeof item.price === 'number' ? item.price.toLocaleString('en-IN') : item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                         </div>
                      </div>
                   ))}
                </div>

                {/* Logistics Trace */}
                <div className="pt-4 border-t border-[var(--border-color)] grid grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <div className="flex flex-col gap-1">
                         <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Collector Path</span>
                         <span className="text-[10px] font-black text-[var(--text-primary)] uppercase leading-tight">{completedOrder?.consumer} <br/> <span className="text-gray-400">{completedOrder?.mobile}</span></span>
                      </div>
                      <div className="flex flex-col gap-1">
                         <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Destination</span>
                         <span className="text-[10px] font-medium text-[var(--text-primary)] uppercase leading-relaxed line-clamp-2">{completedOrder?.destination}</span>
                      </div>
                   </div>
                   <div className="space-y-4 text-right">
                      <div className="flex flex-col gap-1">
                         <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Protocol Type</span>
                         <span className={`text-[10px] font-black uppercase ${isUPI ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {isUPI ? 'Encrypted Digital' : 'Cash on Delivery'}
                         </span>
                      </div>
                      <div className="flex flex-col gap-1">
                         <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Logistic Partner</span>
                         <span className="text-[10px] font-black text-[var(--text-primary)] uppercase italic">BHARAT EXPRESS</span>
                      </div>
                   </div>
                </div>

                {/* Order & Delivery Timeline */}
                <div className={`mt-6 p-6 rounded-2xl border ${isUPI ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                   <div className="flex items-center gap-4 mb-4">
                      <div className="h-[1px] flex-1 bg-[var(--border-color)]"></div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.5em]">DELIVERY SCHEDULE</span>
                      <div className="h-[1px] flex-1 bg-[var(--border-color)]"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                         <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Order Placed</span>
                         <span className="text-[11px] font-black text-[var(--text-primary)] tracking-tight">{completedOrder?.orderTime || completedOrder?.timestamp}</span>
                      </div>
                      <div className="flex flex-col gap-2 text-right">
                         <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Estimated Delivery</span>
                         <span className={`text-[11px] font-black tracking-tight ${isUPI ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {completedOrder?.estimatedDelivery}
                         </span>
                         <span className={`text-[9px] font-black uppercase tracking-wide ${isUPI ? 'text-emerald-500/70' : 'text-amber-500/70'}`}>
                            Delivery in {completedOrder?.deliveryDays} Business Days
                         </span>
                      </div>
                   </div>
                </div>

                {/* Footer Badge */}
                <div className="pt-6 border-t border-[var(--border-color)] flex items-center justify-center gap-4 opacity-70">
                   <ShieldCheck size={20} className={isUPI ? 'text-emerald-500' : 'text-amber-500'} />
                   <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">Verified by Bharat Horological Society • Official Digital Hallmark</p>
                </div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 print:hidden relative z-20">
            <button 
              onClick={() => {
                window.location.href = "/watches";
              }}
              className="px-12 py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              Return to Watches
            </button>
            <button onClick={() => window.print()} className="px-12 py-5 border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-[var(--bg-primary)] transition-all flex items-center justify-center gap-3 group">
              <CreditCard size={14} className="opacity-40 group-hover:opacity-100" /> Download Receipt
            </button>
          </div>
        </Motion.div>
      </div>
    );
  }

  if (!cart.length && !showStripe && !orderSuccess) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center px-6 transition-colors duration-500">
        <Motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mx-auto mb-8 border border-[var(--border-color)]">
            <ShoppingBag size={40} className="text-gray-500/20" />
          </div>
          <h2 className="text-4xl font-black text-[var(--text-primary)] italic tracking-tighter mb-4 uppercase">Selection Empty</h2>
          <p className="text-[var(--text-secondary)] max-w-sm mx-auto mb-10 font-medium">Precision requires the perfect piece. Let's find yours.</p>
          <Link to="/watches" className="inline-block px-10 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl">
            Browse Pieces
          </Link>
        </Motion.div>
      </div>
    );
  }

  const isFilling = name || email || address || mobile || paymentMethod;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-24 md:pt-32 pb-20 px-4 md:px-6 transition-colors duration-500">
      <ToastContainer theme={theme} hideProgressBar />
      
      {/* UPI Simulation Entry Point */}
      <UPIModal 
        isOpen={showUPI} 
        onClose={() => setShowUPI(false)} 
        amount={totalPrice * 1.08}
        onPaymentComplete={() => {
           setShowUPI(false);
           const orderDate = new Date();
           const deliveryDays = generateDeliveryDays();
           const deliveryDate = new Date(orderDate);
           deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
           
           const manifest = {
              items: cart.filter(item => item.selected),
              subtotal: totalPrice,
              tax: totalPrice * 0.08,
              grandTotal: totalPrice * 1.08,
              transmissionId: generateTransmissionId(),
              timestamp: orderDate.toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' }),
              orderTime: orderDate.toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' }),
              estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
              deliveryDays: deliveryDays,
              consumer: name,
              email: email,
              mobile: mobile,
              destination: address,
              protocol: 'SECURE DIGITAL'
            };
            handleDemoPayment(manifest);
        }}
      />
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <div>
            <Link to="/watches" className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase tracking-widest mb-4 hover:text-[var(--text-primary)] transition-colors">
              <ArrowLeft size={14} /> Chrono-Return
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] italic tracking-tighter leading-none mb-2 uppercase">Curated Bag.</h1>
            <p className="text-[var(--text-secondary)] text-sm font-medium">Verify your selection and secure the transaction.</p>
          </div>
          <button onClick={clearCart} className="text-[10px] md:text-xs font-black text-rose-500/50 hover:text-rose-500 uppercase tracking-widest border-b border-rose-500/10 pb-1 flex items-center gap-2 transition-colors">
            <Trash2 size={14} className="opacity-60" /> Reset Inventory
          </button>
        </div>

        {/* Dynamic Timeline - Responsive */}
        <div className="flex justify-between items-center mb-16 md:mb-20 max-w-3xl mx-auto px-4 md:px-10 overflow-x-auto">
          <div className="flex flex-col items-center gap-3 min-w-[80px]">
             <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${(isFilling || showStripe) ? 'bg-[var(--text-accent)] border-[var(--text-accent)]' : 'bg-transparent border-[var(--border-color)] scale-110 shadow-[0_0_30px_rgba(47,95,163,0.05)] shadow-[var(--text-accent)]/10'}`}>
               <ShoppingBag size={18} className={(isFilling || showStripe) ? 'text-white' : 'text-[var(--text-accent)]'} />
             </div>
             <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${(isFilling || showStripe) ? 'text-[var(--text-secondary)]' : 'text-[var(--text-accent)]'}`}>Inventory</span>
          </div>

          <div className={`flex-1 h-[1px] mx-2 md:mx-6 -mt-6 md:-mt-8 transition-colors duration-1000 min-w-[40px] ${(isFilling || showStripe) ? 'bg-[var(--text-primary)]' : 'bg-[var(--border-color)]'}`}></div>

          <div className="flex flex-col items-center gap-3 min-w-[80px]">
             <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${showStripe ? 'bg-[var(--text-primary)] border-[var(--text-primary)]' : (isFilling ? 'bg-transparent border-[var(--text-primary)] scale-110 shadow-[0_0_30px_rgba(0,0,0,0.05)]' : 'bg-transparent border-[var(--border-color)]')}`}>
               <Truck size={18} className={showStripe ? 'text-[var(--bg-primary)]' : (isFilling ? 'text-[var(--text-primary)]' : 'text-gray-500/30')} />
             </div>
             <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${showStripe ? 'text-gray-500' : (isFilling ? 'text-[var(--text-primary)]' : 'text-gray-500/30')}`}>Logistics</span>
          </div>

          <div className={`flex-1 h-[1px] mx-2 md:mx-6 -mt-6 md:-mt-8 transition-colors duration-1000 min-w-[40px] ${showStripe ? 'bg-[var(--text-primary)]' : 'bg-[var(--border-color)]'}`}></div>

          <div className="flex flex-col items-center gap-3 min-w-[80px]">
             <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${showStripe ? 'bg-transparent border-[var(--text-primary)] scale-110 shadow-[0_0_30px_rgba(0,0,0,0.05)]' : 'bg-transparent border-[var(--border-color)]'}`}>
               <CreditCard size={18} className={showStripe ? 'text-[var(--text-primary)]' : 'text-gray-500/30'} />
             </div>
             <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${showStripe ? 'text-[var(--text-primary)]' : 'text-gray-500/30'}`}>Transfer</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
          <div className="lg:col-span-2">
            
            {/* Items List */}
            <div className="space-y-6 mb-16">
               <h2 className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-[0.4em] mb-6 md:mb-8">SECURED PIECES</h2>
               {cart.map((item) => (
                  <Motion.div 
                    layout
                    key={item.id} 
                    className={`flex gap-4 md:gap-6 p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] bg-[var(--bg-tertiary)] border border-[var(--border-color)] transition-all duration-500 card-premium ${!item.selected ? 'opacity-40 grayscale scale-95' : 'hover:border-[var(--text-accent)] shadow-sm hover:shadow-xl'}`}
                  >
                    <div 
                      className={`relative w-24 h-24 md:w-28 md:h-28 bg-[var(--bg-primary)] rounded-2xl flex items-center justify-center p-2 md:p-4 border border-[var(--border-color)] shrink-0 ${item.selected ? 'cursor-pointer hover:border-[var(--text-accent)]' : 'cursor-default'}`}
                      onClick={() => {
                        if (item.selected) {
                           navigate(`/watch/${item.id}`);
                        }
                      }}
                    >
                      <WatchImage src={item.img} alt={item.name} className="w-full h-full object-contain" />
                      <button 
                        onClick={() => toggleSelect(item.id)}
                        className={`absolute -top-3 -left-3 w-8 h-8 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 transition-all z-10 ${item.selected ? 'bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-primary)]' : 'bg-[var(--bg-primary)] border-gray-400 dark:border-gray-500 text-transparent shadow-sm hover:border-[var(--text-primary)]'}`}
                      >
                        <CheckCircle2 size={18} className={item.selected ? 'block' : 'hidden'} />
                      </button>
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div>
                          <h3 className="text-lg md:text-xl font-black text-[var(--text-primary)] tracking-tight italic leading-tight">{item.name}</h3>
                          <span className="text-[10px] md:text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest">{item.brand || 'Luxury Pulse'}</span>
                        </div>
                        <span className="text-lg font-black text-[var(--text-primary)] italic tracking-tighter leading-none">{item.price}</span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 md:gap-6 bg-[var(--bg-primary)] px-3 md:px-4 py-2 rounded-xl border border-[var(--border-color)]">
                          <button onClick={() => decrement(item.id)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"><Minus size={14}/></button>
                          <span className="text-xs font-black text-zinc-950 dark:text-white w-4 text-center">{item.qty}</span>
                          <button onClick={() => increment(item.id)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"><Plus size={14}/></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-rose-500/30 hover:text-rose-500 transition-colors p-2">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </Motion.div>
               ))}
            </div>

            {/* Form Section */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.02)]">
               <h2 className="text-xl md:text-2xl font-black text-[var(--text-primary)] italic tracking-tighter mb-6 md:mb-8 uppercase">Shipment Protocol</h2>
               
               {showStripe ? (
                  stripePromise ? (
                      <Elements stripe={stripePromise} options={{ mode: 'payment', amount: Math.round(totalPrice * 100 * 1.08), currency: 'inr' }}>
                         <CheckoutForm 
                           amount={totalPrice * 1.08} 
                           onSuccess={() => { 
                             const deliveryDays = generateDeliveryDays();
                             const manifest = {
                               items: cart.filter(item => item.selected),
                               subtotal: totalPrice,
                               tax: totalPrice * 0.08,
                               grandTotal: totalPrice * 1.08,
                               transmissionId: generateTransmissionId(),
                               timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' }),
                               orderTime: new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' }),
                               estimatedDelivery: new Date(Date.now() + (deliveryDays) * 86400000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
                               deliveryDays: deliveryDays,
                               consumer: name,
                               email: email,
                               mobile: mobile,
                               destination: address,
                               protocol: 'SECURE DIGITAL'
                             };
                             setCompletedOrder(manifest);
                             setOrderSuccess(true); 
                             clearCart(); 
                           }} 
                           onCancel={() => setShowStripe(false)} 
                           customerDetails={{ name, email }} 
                         />
                      </Elements>
                  ) : (
                    <div className="p-8 bg-rose-500/10 border border-rose-500/20 rounded-3xl text-center">
                       <h3 className="text-sm font-black text-rose-500 uppercase tracking-widest mb-2">Payment Gateway Offline</h3>
                       <p className="text-[10px] text-rose-500/60 font-bold uppercase tracking-tighter">The Stripe API key provided is invalid (placeholder detected). Please update your configuration.</p>
                       <button onClick={() => setShowStripe(false)} className="mt-4 text-[10px] font-black text-[var(--text-primary)] underline uppercase tracking-widest">Return to Logistics</button>
                    </div>
                  )
               ) : showCODConfirmation ? (
                  // COD Confirmation Modal
                  <Motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-[2.5rem] text-center shadow-2xl relative z-20"
                  >
                     <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Truck size={32} className="text-amber-500" />
                     </div>
                     <h3 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-widest mb-2">Confirm Order?</h3>
                     <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-8 leading-relaxed max-w-xs mx-auto">
                        You are about to place a <span className="text-amber-500">Cash on Delivery</span> order for <span className="text-[var(--text-primary)]">₹{totalPrice.toLocaleString('en-IN')}</span>. items.
                     </p>
                     
                     <div className="flex flex-col gap-3">
                        <button 
                          onClick={processOrder}
                          className="w-full py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                        >
                           Yes, Place Order <CheckCircle2 size={14} />
                        </button>
                        <button 
                          onClick={() => setShowCODConfirmation(false)}
                          className="w-full py-4 bg-transparent border border-[var(--border-color)] text-[var(--text-secondary)] font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-colors"
                        >
                           No, Go Back
                        </button>
                     </div>
                  </Motion.div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Signature</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Collector Name" className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-accent)] transition-colors font-medium placeholder:text-[var(--text-secondary)]/30" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Sync Point (Email)</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Protocol" className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-accent)] transition-colors font-medium placeholder:text-[var(--text-secondary)]/30" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Encryption Point (Mobile)</label>
                      <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10 Digit Pulse" className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-accent)] transition-colors font-medium placeholder:text-[var(--text-secondary)]/30" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Destination Logic</label>
                      <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} placeholder="Full Physical Location" className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-accent)] transition-colors resize-none font-medium placeholder:text-[var(--text-secondary)]/30" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Transfer Protocol</label>
                      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-accent)] transition-colors appearance-none font-black uppercase tracking-widest" required>
                         <option value="">Select Method</option>
                         <option value="Online">Online Security (Cards/UPI)</option>
                         <option value="Cash on Delivery">Cash on Delivery</option>
                      </select>
                    </div>

                    {/* Submit Button - Disabled if no items selected */}
                    <button 
                      type="submit" 
                      disabled={!hasSelectedItems}
                      className={`w-full py-4 md:py-5 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl transition-all mt-6 shadow-xl ${
                        hasSelectedItems 
                          ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-zinc-800 dark:hover:bg-zinc-200 cursor-pointer' 
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                       {hasSelectedItems ? 'Make Payment' : 'Select Items to Pay'}
                    </button>
                 </form>
               )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 sticky top-32 shadow-2xl relative overflow-hidden border border-[var(--border-color)]">
               {/* Human Touch: Abstract background pattern */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
               
               <h3 className="text-xs font-black opacity-40 uppercase tracking-[0.4em] mb-10 relative z-10">Sync Ledger</h3>
               
               <div className="space-y-6 mb-10 relative z-10">
                 <div className="flex justify-between items-end border-b border-[var(--border-color)] pb-4">
                   <span className="text-[10px] md:text-xs font-black uppercase opacity-60">Sub-total</span>
                   <span className="text-xl font-black tracking-tighter italic">₹ {totalPrice.toLocaleString('en-IN')}</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-[var(--border-color)] pb-4">
                   <span className="text-[10px] md:text-xs font-black uppercase opacity-60">Logistics</span>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00A86B]">Bharat-Wide Express</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-[var(--border-color)] pb-4">
                   <span className="text-[10px] md:text-xs font-black uppercase opacity-60">GST / Processing (8%)</span>
                   <span className="text-sm font-black italic tracking-tight">₹ {(totalPrice * 0.08).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                 </div>
               </div>

               <div className="flex justify-between items-end mb-12 relative z-10">
                 <span className="text-xs font-black uppercase tracking-widest">Grand Total</span>
                 <span className="text-3xl md:text-4xl font-black italic tracking-tighter leading-none">₹ {(totalPrice * 1.08).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
               </div>

               <div className="bg-[var(--bg-primary)] p-6 rounded-[2rem] border border-[var(--border-color)] relative z-10">
                 <div className="flex items-start gap-4 opacity-70 italic font-medium">
                   <ShieldCheck size={20} className="shrink-0 text-amber-400" />
                   <div className="flex flex-col gap-1">
                     <p className="text-[10px] leading-relaxed uppercase tracking-tight">Secure Transaction Protocol</p>
                     <p className="text-[8px] opacity-60 uppercase tracking-tighter">Verified by Bharat Horological Society</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CartPage;

import React, { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import { toast, ToastContainer } from "react-toastify";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, ShieldCheck, CreditCard, Truck, CheckCircle2, Lock, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
import { motion as Motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { useAuth } from "../context/AuthContext";
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
  const { user, isAuthenticated } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Replaced single address string with granular components
  const [addressComponents, setAddressComponents] = useState({
    street: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [mobile, setMobile] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showStripe, setShowStripe] = useState(false);
  const [showUPI, setShowUPI] = useState(false);
  const [showCODConfirmation, setShowCODConfirmation] = useState(false); 
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Auto-fill email and name
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.email && !email) setEmail(user.email);
      if (user.name && !name) setName(user.name);
    }
  }, [isAuthenticated, user, email, name]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setAddressComponents({ street: "", city: "", state: "", pincode: "" });
    setMobile("");
    setPaymentMethod("");
    setErrors({});
    setTouched({});
  };

  const validate = (field, value) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format.";
        break;
      case "mobile":
        if (!value.trim()) error = "Mobile number is required.";
        else if (!/^[6-9]\d{9}$/.test(value)) error = "Must be 10 digits, starting with 6-9.";
        break;
      case "street":
        if (!value.trim()) error = "Street address is required.";
        break;
      case "city":
        if (!value.trim()) error = "City is required.";
        break;
      case "state":
        if (!value.trim()) error = "State is required.";
        break;
      case "pincode":
        if (!value.trim()) error = "Pincode is required.";
        else if (!/^[a-zA-Z0-9\s-]{4,10}$/.test(value)) error = "Invalid Pincode format.";
        break;
      case "paymentMethod":
        if (!value) error = "Transfer Protocol selection required.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (field, value) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validate(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value, updateState) => {
    updateState(value);
    // Clear error immediately on change
    if (errors[field]) {
       setErrors(prev => ({ ...prev, [field]: "" }));
    }
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

    // Run full validation
    const newErrors = {
       name: validate("name", name),
       email: validate("email", email),
       mobile: validate("mobile", mobile),
       street: validate("street", addressComponents.street),
       city: validate("city", addressComponents.city),
       state: validate("state", addressComponents.state),
       pincode: validate("pincode", addressComponents.pincode),
       paymentMethod: validate("paymentMethod", paymentMethod)
    };

    // Filter out empty errors
    const validErrors = Object.keys(newErrors).reduce((acc, key) => {
      if (newErrors[key]) acc[key] = newErrors[key];
      return acc;
    }, {});

    if (Object.keys(validErrors).length > 0) {
      setErrors(validErrors);
      setTouched({
        name: true, email: true, mobile: true, street: true, city: true, state: true, pincode: true, paymentMethod: true
      });
      toast.error("Protocol Incomplete: Resolve red warnings.");
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
    
    // UNIFIED MANIFEST STRUCTURE (Matches UPI Flow)
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
      destination: `${addressComponents.street}, ${addressComponents.city}, ${addressComponents.state} - ${addressComponents.pincode}`,
      protocol: 'CASH ON DELIVERY' // Explicitly set for COD
    };
    
    // UI Reset: Close confirmation modal before showing success
    setShowCODConfirmation(false);
    
    // Sync with backend (Demo persistence)
    handleDemoPayment(manifest);
  };

  const handleDemoPayment = async (manifest) => {
    try {
      // Future-Proof Architecture: This call can be replaced with Razorpay verification
      await axios.post('/api/payment/demo-success', { manifest });
      toast.success("Identity Verified. Logistics Initiated.");
    } catch (error) {
       console.error("Backend Sync Protocol Failure:", error);
       // Fallback: Show success even if backend fails (Offline Mode / Demo Robustness)
       toast.warning("Backend Sync Delayed. Local Receipt Generated.");
    } finally {
      // Ensure the user ALWAYS sees the receipt
      setCompletedOrder(manifest);
      setOrderSuccess(true);
      clearSelectedItems();
      resetForm();
    }
  };

  if (orderSuccess) {
    const isUPI = completedOrder?.protocol === 'SECURE DIGITAL';
    
    return (
      <div className={`min-h-screen ${isUPI ? 'bg-[var(--bg-primary)]' : 'bg-zinc-50 dark:bg-zinc-950'} flex flex-col items-center justify-center px-4 py-20 transition-colors duration-1000 text-center relative overflow-hidden print:!overflow-visible print:!min-h-0 print:!h-auto print:!bg-white print:!p-0`}>
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
          id="visual-receipt"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full relative z-10"
        >
          {/* Status Indicator */}
           <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-10 border-2 shadow-2xl transition-all duration-700 print:shadow-none print:border-2 print:w-20 print:h-20 print:mb-4 ${isUPI ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500 print:bg-emerald-50 print:border-emerald-400 print:text-emerald-600' : 'bg-amber-500/5 border-amber-500/20 text-amber-500 print:bg-amber-50 print:border-amber-400 print:text-amber-600'}`}>
            <Motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              {isUPI ? <CheckCircle2 size={48} /> : <Truck size={48} />}
            </Motion.div>
          </div>
          
          <h2 className={`text-5xl md:text-7xl font-black italic tracking-tighter mb-4 uppercase leading-[0.9] print:text-3xl print:mb-2 ${isUPI ? 'text-[var(--text-primary)] print:!text-emerald-700' : 'text-amber-600 dark:text-amber-500 print:!text-amber-700'}`}>
            {isUPI ? 'Transaction' : 'Order'}<br/>
            <span className="opacity-40 print:opacity-60">{isUPI ? 'Settled.' : 'Confir-med.'}</span>
          </h2>
          
          <p className="text-[var(--text-secondary)] font-medium mb-12 text-sm md:text-base border-y border-[var(--border-color)] py-4 inline-block px-10 print:mb-6 print:py-2 print:text-xs">
            {isUPI ? "Your digital footprint has been verified and settled." : "Your delivery protocol has been activated. Prepare for COD settlement."}
          </p>
          
          {/* THE RECEIPT CARD */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[3rem] p-8 md:p-12 text-left relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] print:shadow-none print:!bg-white print:border-gray-300 print:rounded-xl print:p-6">
             {/* Large Watermark - Visible in Print now */}
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black italic opacity-[0.03] print:opacity-[0.12] select-none pointer-events-none tracking-tighter ${isUPI ? 'text-emerald-500' : 'text-amber-500'}`}>
                {isUPI ? 'PAID' : 'COD'}
             </div>

             <div className="relative z-10 space-y-10 print:space-y-5">
                {/* Protocol Header */}
                <div className="flex justify-between items-start border-b border-[var(--border-color)] pb-8 print:pb-4">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">CHRONO-ID</span>
                      <span className="text-sm font-black text-[var(--text-primary)] tracking-tight font-mono print:!text-black">{completedOrder?.transmissionId}</span>
                   </div>
                   <div className="flex flex-col gap-2 items-end">
                      <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isUPI ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                        {isUPI ? 'PAID IN FULL' : 'PAY ON ARRIVAL'}
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 tabular-nums">{completedOrder?.timestamp}</span>
                   </div>
                </div>

                {/* Amount Highlight */}
                <div className={`rounded-3xl p-8 border ${isUPI ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'} flex flex-col items-center text-center gap-1 print:p-4`}>
                   <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isUPI ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {isUPI ? 'Amount Hallmarked' : 'Balance to be Collected'}
                   </span>
                   <span className="text-4xl md:text-5xl font-black italic tracking-tighter tabular-nums text-[var(--text-primary)] leading-none print:text-3xl print:!text-black">
                      ₹{(completedOrder?.grandTotal ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
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
                            <div className="w-12 h-12 bg-[var(--bg-primary)] rounded-xl flex items-center justify-center p-2 border border-[var(--border-color)] transition-transform group-hover:scale-105 print:w-10 print:h-10 print:bg-white print:border-gray-200">
                               <WatchImage src={item.img} alt={item.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-tight print:!text-black">{item.name}</span>
                               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.qty} UNIT • {item.brand || 'Luxury'}</span>
                            </div>
                         </div>
                         <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">1 Piece Cost</span>
                            <span className="text-xs font-black text-[var(--text-primary)] italic tracking-tighter print:!text-black">
                               Rs. {typeof item.price === 'number' ? (item.price ?? 0).toLocaleString('en-IN') : String(item.price ?? "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                         <span className="text-[10px] font-black text-[var(--text-primary)] uppercase leading-tight print:!text-black">{completedOrder?.consumer} <br/> <span className="text-gray-400 print:!text-black">{completedOrder?.mobile}</span></span>
                      </div>
                      <div className="flex flex-col gap-1">
                         <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Destination</span>
                         <span className="text-[10px] font-medium text-[var(--text-primary)] uppercase leading-relaxed line-clamp-2 print:!text-black">{completedOrder?.destination}</span>
                      </div>
                   </div>
                   <div className="space-y-4 text-right">
                      <div className="flex flex-col gap-1">
                         <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Protocol Type</span>
                         <span className={`text-[10px] font-black uppercase ${isUPI ? 'text-emerald-600' : 'text-amber-600'} print:!text-black`}>
                            {isUPI ? 'Encrypted Digital' : 'Cash on Delivery'}
                         </span>
                      </div>
                      <div className="flex flex-col gap-1">
                         <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Logistic Partner</span>
                         <span className="text-[10px] font-black text-[var(--text-primary)] uppercase italic print:!text-black">BHARAT EXPRESS</span>
                      </div>
                   </div>
                </div>

                {/* Order & Delivery Timeline */}
                <div className={`mt-6 p-6 rounded-2xl border ${isUPI ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'} print:mt-4 print:p-4`}>
                   <div className="flex items-center gap-4 mb-4">
                      <div className="h-[1px] flex-1 bg-[var(--border-color)]"></div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.5em]">DELIVERY SCHEDULE</span>
                      <div className="h-[1px] flex-1 bg-[var(--border-color)]"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                         <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Order Placed</span>
                         <span className={`text-[11px] font-black tracking-tight ${isUPI ? 'text-emerald-600 print:text-emerald-700' : 'text-amber-600 print:text-amber-700'}`}>{completedOrder?.orderTime || completedOrder?.timestamp}</span>
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
              <CreditCard size={14} className="opacity-40 group-hover:opacity-100" /> Print Receipt
            </button>
          </div>
        </Motion.div>

        {/* ===================================================================================== */}
        {/* DEDICATED PRINTABLE INVOICE - HIDDEN ON SCREEN, VISIBLE ON PRINT */}
        {/* ===================================================================================== */}


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

  const isFilling = name || email || addressComponents.street || mobile || paymentMethod;

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
              destination: `${addressComponents.street}, ${addressComponents.city}, ${addressComponents.state} - ${addressComponents.pincode}`,
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
                    className={`relative flex flex-col sm:flex-row gap-8 p-6 pt-20 sm:pt-20 md:p-10 md:pt-24 rounded-[2.5rem] bg-[var(--bg-tertiary)] border border-[var(--border-color)] transition-all duration-500 card-premium ${!item.selected ? 'opacity-40 grayscale scale-95' : 'hover:border-[var(--text-accent)] shadow-sm hover:shadow-xl'}`}
                  >
                    {/* Floating Selection Control - High Priority Z-Index & Absolute Separation */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSelect(item.id);
                      }}
                      className={`absolute top-6 left-6 md:top-8 md:left-8 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all z-20 shadow-lg ${item.selected ? 'bg-[var(--text-primary)] border-[var(--text-primary)] text-[var(--bg-primary)]' : 'bg-[var(--bg-primary)] border-gray-300 dark:border-gray-500 text-transparent hover:border-[var(--text-primary)]'}`}
                    >
                      <CheckCircle2 size={22} className={item.selected ? 'block' : 'hidden'} />
                    </button>

                    <div 
                      className={`relative w-28 h-28 bg-[var(--bg-primary)] rounded-[1.8rem] flex items-center justify-center p-4 border border-[var(--border-color)] shrink-0 self-start sm:self-center transition-all ${item.selected ? 'cursor-pointer hover:border-[var(--text-accent)] hover:rotate-2' : 'cursor-default'}`}
                      onClick={() => {
                        if (item.selected) {
                           navigate(`/watch/${item.id}`);
                        }
                      }}
                    >
                      <WatchImage src={item.img} alt={item.name} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight italic leading-tight uppercase">{item.name}</h3>
                          <span className="text-[10px] md:text-xs text-[var(--text-secondary)] font-black uppercase tracking-[0.2em] opacity-60">{item.brand || 'Luxury Pulse'}</span>
                        </div>
                        <span className="text-xl font-black text-[var(--text-primary)] italic tracking-tighter leading-none">
                          ₹ {(typeof item.price === 'number' && !isNaN(item.price))
                            ? item.price.toLocaleString('en-IN') 
                            : String(item.price ?? "").replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-8">
                        <div className="flex items-center gap-6 bg-[var(--bg-primary)] px-5 py-2.5 rounded-2xl border border-[var(--border-color)] shadow-inner">
                          <button onClick={() => decrement(item.id)} className="text-[var(--text-secondary)] hover:text-rose-500 transition-colors p-1"><Minus size={16}/></button>
                          <span className="text-sm font-black text-zinc-950 dark:text-white w-6 text-center tabular-nums">{item.qty}</span>
                          <button onClick={() => increment(item.id)} className="text-[var(--text-secondary)] hover:text-emerald-500 transition-colors p-1"><Plus size={16}/></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="group bg-rose-500/5 hover:bg-rose-500 p-3 rounded-2xl border border-rose-500/10 hover:border-rose-500 transition-all">
                          <Trash2 size={20} className="text-rose-500 group-hover:text-white transition-colors" />
                        </button>
                      </div>
                    </div>
                  </Motion.div>
               ))}
            </div>

            {/* Form Section */}
            <div className="max-w-[750px] mx-auto w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[3rem] p-8 md:p-12 shadow-xl my-16">
               <h2 className="text-3xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-gray-500">Logistics & Deployment</h2>
               
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
                               destination: `${addressComponents.street}, ${addressComponents.city}, ${addressComponents.state} - ${addressComponents.pincode}`,
                               protocol: 'SECURE DIGITAL'
                             };
                             setCompletedOrder(manifest);
                             setOrderSuccess(true); 
                             setShowStripe(false); // UI Reset
                             clearSelectedItems(); // Standardized Behavior
                             resetForm();
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
                        You are about to place a <span className="text-amber-500">Cash on Delivery</span> order for <span className="text-[var(--text-primary)]">₹{(totalPrice ?? 0).toLocaleString('en-IN')}</span>. items.
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
                 <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                           <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Signature</label>
                           <Lock size={10} className="text-[var(--text-secondary)] opacity-50" />
                        </div>
                        <input 
                          type="text" 
                          value={name} 
                          readOnly
                          title="Name is locked to your registered identity."
                          className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-secondary)] focus:outline-none cursor-not-allowed opacity-60 font-medium" 
                          required 
                        />
                        <p className="text-[9px] text-amber-500/80 font-bold ml-2 uppercase tracking-wide flex items-center gap-1">
                           <AlertTriangle size={8} /> Identity Locked to Registered User
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                           <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Sync Point (Email)</label>
                           <Lock size={10} className="text-[var(--text-secondary)] opacity-50" />
                        </div>
                        <input 
                          type="email" 
                          value={email} 
                          readOnly
                          title="Email is locked to your registered identity."
                          className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-secondary)] focus:outline-none cursor-not-allowed opacity-60 font-medium" 
                          required 
                        />
                        <p className="text-[9px] text-amber-500/80 font-bold ml-2 uppercase tracking-wide flex items-center gap-1">
                           <AlertTriangle size={8} /> Identity Locked to Registered User
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Encryption Point (Mobile)</label>
                      <input 
                        type="tel" 
                        value={mobile} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleChange("mobile", val, setMobile);
                        }} 
                        onBlur={() => handleBlur("mobile", mobile)}
                        placeholder="10-digit Mobile (e.g. 9876543210)" 
                        className={`w-full bg-[var(--bg-primary)] border rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-primary)] focus:outline-none transition-colors font-medium placeholder:text-[var(--text-secondary)]/30 ${errors.mobile ? 'border-rose-500 focus:border-rose-500' : 'border-[var(--border-color)] focus:border-[var(--text-accent)]'}`} 
                        required 
                      />
                       {errors.mobile && <p className="text-[10px] text-rose-500 font-bold ml-2 uppercase tracking-wide flex items-center gap-1">* {errors.mobile}</p>}
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Secure Delivery Node</label>
                       
                       {/* Street Address */}
                       <div className="space-y-1">
                         <input 
                           type="text" 
                           value={addressComponents.street} 
                           onChange={(e) => {
                             const val = e.target.value.slice(0, 20);
                             setAddressComponents(prev => ({...prev, street: val}));
                             if(errors.street) setErrors(prev => ({...prev, street: ""}));
                           }} 
                           onBlur={() => handleBlur("street", addressComponents.street)}
                           placeholder="Street Address (Max 20 chars)" 
                           maxLength={20}
                           className={`w-full bg-[var(--bg-primary)] border rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-primary)] focus:outline-none transition-colors font-medium placeholder:text-[var(--text-secondary)]/30 ${errors.street ? 'border-rose-500 focus:border-rose-500' : 'border-[var(--border-color)] focus:border-[var(--text-accent)]'}`} 
                           required 
                         />
                         {/* Character Count */}
                         <div className="flex justify-end">
                           <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{addressComponents.street.length}/20</span>
                         </div>
                         {errors.street && <p className="text-[10px] text-rose-500 font-bold ml-2 uppercase tracking-wide flex items-center gap-1">* {errors.street}</p>}
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          {/* City */}
                          <div className="space-y-1">
                            <input 
                              list="city-options"
                              type="text" 
                              value={addressComponents.city} 
                              onChange={(e) => {
                                 const val = e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 20);
                                 setAddressComponents(prev => ({...prev, city: val}));
                                 if(errors.city) setErrors(prev => ({...prev, city: ""}));
                              }} 
                              onBlur={() => handleBlur("city", addressComponents.city)}
                              placeholder="City (Letters Only)" 
                              maxLength={20}
                              className={`w-full bg-[var(--bg-primary)] border rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-primary)] focus:outline-none transition-colors font-medium placeholder:text-[var(--text-secondary)]/30 ${errors.city ? 'border-rose-500 focus:border-rose-500' : 'border-[var(--border-color)] focus:border-[var(--text-accent)]'}`} 
                              required 
                            />
                            <datalist id="city-options">
                               <option value="Mumbai" />
                               <option value="Delhi" />
                               <option value="Bangalore" />
                               <option value="Hyderabad" />
                               <option value="Ahmedabad" />
                               <option value="Chennai" />
                               <option value="Kolkata" />
                               <option value="Surat" />
                               <option value="Pune" />
                               <option value="Jaipur" />
                            </datalist>
                            {errors.city && <p className="text-[10px] text-rose-500 font-bold ml-2 uppercase tracking-wide flex items-center gap-1">* {errors.city}</p>}
                          </div>
                          
                          {/* State */}
                          <div className="space-y-1">
                            <input 
                              list="state-options"
                              type="text" 
                              value={addressComponents.state} 
                              onChange={(e) => {
                                 const val = e.target.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 20);
                                 setAddressComponents(prev => ({...prev, state: val}));
                                 if(errors.state) setErrors(prev => ({...prev, state: ""}));
                              }} 
                              onBlur={() => handleBlur("state", addressComponents.state)}
                              placeholder="State (Letters Only)" 
                              maxLength={20}
                              className={`w-full bg-[var(--bg-primary)] border rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-primary)] focus:outline-none transition-colors font-medium placeholder:text-[var(--text-secondary)]/30 ${errors.state ? 'border-rose-500 focus:border-rose-500' : 'border-[var(--border-color)] focus:border-[var(--text-accent)]'}`} 
                              required 
                            />
                            <datalist id="state-options">
                               <option value="Maharashtra" />
                               <option value="Delhi" />
                               <option value="Karnataka" />
                               <option value="Telangana" />
                               <option value="Gujarat" />
                               <option value="Tamil Nadu" />
                               <option value="West Bengal" />
                               <option value="Rajasthan" />
                               <option value="Uttar Pradesh" />
                               <option value="Bihar" />
                            </datalist>
                            {errors.state && <p className="text-[10px] text-rose-500 font-bold ml-2 uppercase tracking-wide flex items-center gap-1">* {errors.state}</p>}
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          {/* Pincode */}
                          <div className="space-y-1">
                            <input 
                              type="text" 
                              value={addressComponents.pincode} 
                              onChange={(e) => {
                                 const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                 setAddressComponents(prev => ({...prev, pincode: val}));
                                 if(errors.pincode) setErrors(prev => ({...prev, pincode: ""}));
                              }} 
                              onBlur={() => handleBlur("pincode", addressComponents.pincode)}
                              placeholder="Pincode (Numbers Only)" 
                              maxLength={10}
                              className={`w-full bg-[var(--bg-primary)] border rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-primary)] focus:outline-none transition-colors font-medium placeholder:text-[var(--text-secondary)]/30 ${errors.pincode ? 'border-rose-500 focus:border-rose-500' : 'border-[var(--border-color)] focus:border-[var(--text-accent)]'}`} 
                              required 
                            />
                            {errors.pincode && <p className="text-[10px] text-rose-500 font-bold ml-2 uppercase tracking-wide flex items-center gap-1">* {errors.pincode}</p>}
                          </div>
                          
                          {/* Country (Auto-filled 'India' for now but editable) */}
                          <input 
                            type="text" 
                            value="India" 
                            readOnly
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-secondary)] focus:outline-none cursor-not-allowed opacity-60 font-medium" 
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Transfer Protocol</label>
                      <div className="space-y-1">
                        <select 
                          value={paymentMethod} 
                          onChange={(e) => handleChange("paymentMethod", e.target.value, setPaymentMethod)} 
                          onBlur={() => handleBlur("paymentMethod", paymentMethod)}
                          className={`w-full bg-[var(--bg-primary)] border rounded-2xl py-3 md:py-4 px-5 md:px-6 text-sm text-[var(--text-primary)] focus:outline-none transition-colors appearance-none font-black uppercase tracking-widest ${errors.paymentMethod ? 'border-rose-500 focus:border-rose-500' : 'border-[var(--border-color)] focus:border-[var(--text-accent)]'}`} 
                          required
                        >
                           <option value="">Select Method</option>
                           <option value="Online">Online Security (Cards/UPI)</option>
                           <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>
                        {errors.paymentMethod && <p className="text-[10px] text-rose-500 font-bold ml-2 uppercase tracking-wide flex items-center gap-1">* {errors.paymentMethod}</p>}
                      </div>
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
                   <span className="text-xl font-black tracking-tighter italic">₹ {(totalPrice ?? 0).toLocaleString('en-IN')}</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-[var(--border-color)] pb-4">
                   <span className="text-[10px] md:text-xs font-black uppercase opacity-60">Logistics</span>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00A86B]">Bharat-Wide Express</span>
                 </div>
                 <div className="flex justify-between items-end border-b border-[var(--border-color)] pb-4">
                   <span className="text-[10px] md:text-xs font-black uppercase opacity-60">GST / Processing (8%)</span>
                   <span className="text-sm font-black italic tracking-tight">₹ {((totalPrice ?? 0) * 0.08).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                 </div>
               </div>

               <div className="flex justify-between items-end mb-12 relative z-10">
                 <span className="text-xs font-black uppercase tracking-widest">Grand Total</span>
                 <span className="text-3xl md:text-4xl font-black italic tracking-tighter leading-none">₹ {((totalPrice ?? 0) * 1.08).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
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

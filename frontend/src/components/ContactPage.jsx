import React, { useState, useContext } from 'react';
import { User, Mail, Phone, Clock, ShoppingCart, IndianRupee, Send, AlertCircle, Check, MapPin, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

// Input with an icon on left
function InputWithIcon({ icon, label, name, value, onChange, placeholder, error, required }) {
  return (
    <label className="block space-y-2">
      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
        {label}{required && <span className="text-rose-500 ml-1">*</span>}
      </span>
      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--text-primary)] transition-colors">
          {icon}
        </div>
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-[var(--bg-secondary)] border ${error ? 'border-rose-500/50' : 'border-[var(--border-color)]'} rounded-2xl py-4 pl-14 pr-6 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-all font-medium placeholder:text-gray-500/30`}
        />
      </div>
      {error && (
        <p className="text-[10px] text-rose-500 font-bold flex items-center gap-1 mt-1 ml-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </label>
  );
}

// Select with icon
function SelectWithIcon({ icon, label, name, value, onChange, options = [], error, required }) {
  return (
    <label className="block space-y-2">
      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
        {label}{required && <span className="text-rose-500 ml-1">*</span>}
      </span>
      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--text-primary)] transition-colors pointer-events-none">
          {icon}
        </div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full bg-[var(--bg-secondary)] border ${error ? 'border-rose-500/50' : 'border-[var(--border-color)]'} rounded-2xl py-4 pl-14 pr-6 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-all font-black uppercase tracking-widest appearance-none cursor-pointer`}
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
    </label>
  );
}

const ContactPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const WHATSAPP_NUMBER = "918299431275";

  const initialForm = {
    name: "",
    email: "",
    phone: "",
    product: "General Inquiry",
    budget: "",
    contactMethod: "WhatsApp",
    message: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);

  const products = [
    "General Inquiry",
    "Norqain Independence",
    "Zenith Chronomaster",
    "Jacob & Co. Epic X",
    "Bvlgari Octo",
    "H. Moser Endeavour",
  ];

  function showToast(text, kind = "info") {
    setToast({ text, kind });
    setTimeout(() => setToast(null), 3000);
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Protocol Identification Required";
    if (!form.email.trim()) e.email = "Sync Point Required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid Logic";
    if (!form.phone.trim()) e.phone = "Pulse Link Required";
    if (!form.message.trim()) e.message = "Encryption Payload Required";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      showToast("Verification Failed", "error");
      return;
    }

    setSending(true);
    const message = `Hello! I am *${form.name}*.\n\n` +
      `*Interest:* ${form.product}\n` +
      `*Budget:* ${form.budget}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Email:* ${form.email}\n` +
      `*Preferred Contact:* ${form.contactMethod}\n\n` +
      `*Message:* ${form.message}`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
    
    showToast("Opening Secure Channel...", "success");
    setTimeout(() => {
      window.open(url, "_blank");
      setForm(initialForm);
      setSending(false);
    }, 1000);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
    setErrors(s => ({ ...s, [name]: undefined }));
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-[var(--text-primary)] uppercase tracking-widest mb-12 transition-colors"
        >
          <ArrowLeft size={14} /> Chrono-Return
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] italic tracking-tighter leading-[0.85] uppercase mb-8">
              Open <br/> <span className="text-gray-500 text-6xl md:text-8xl">Dialogue.</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-medium max-w-md mb-12 text-lg">
              Consult with our horological experts via encrypted channels. Precision requires a personal touch.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 p-8 rounded-[2.5rem] bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)]">
                  <MapPin size={24} />
                </div>
                <div>
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-[var(--text-primary)]">Headquarters</h3>
                   <p className="text-sm font-medium text-gray-500 leading-relaxed">The Lume Tower, Level 42<br/>Horology District, Geneva</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 p-8 rounded-[2.5rem] bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <div className="w-12 h-12 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)]">
                  <Clock size={24} />
                </div>
                <div>
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-[var(--text-primary)]">Active Sync</h3>
                   <p className="text-sm font-medium text-gray-500 leading-relaxed">Mon — Sat: 09:00 - 21:00 GMT<br/>Private bookings available.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[3rem] p-10 md:p-12 shadow-2xl relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputWithIcon icon={<User size={18}/>} label="Full Signature" name="name" value={form.name} onChange={handleChange} placeholder="Collector Name" error={errors.name} required />
                <InputWithIcon icon={<Mail size={18}/>} label="Sync Point (Email)" name="email" value={form.email} onChange={handleChange} placeholder="Email Protocol" error={errors.email} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputWithIcon icon={<Phone size={18}/>} label="Pulse Link (Phone)" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 xxx xxx xxx" error={errors.phone} required />
                <SelectWithIcon icon={<Clock size={18}/>} label="Sync Protocol" name="contactMethod" value={form.contactMethod} onChange={handleChange} options={["WhatsApp", "Direct Call", "Protocol Email"]} required />
              </div>

              <SelectWithIcon icon={<ShoppingCart size={18}/>} label="Piece of Interest" name="product" value={form.product} onChange={handleChange} options={products} required />

              <div className="space-y-8">
                <InputWithIcon icon={<IndianRupee size={18} className="text-[#00A86B]"/>} label="Acquisition Budget" name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. ₹ 5,00,000+" />
                
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Encryption Payload (Message) <span className="text-rose-500">*</span></label>
                   <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Describe your horological requirements..." className={`w-full bg-[var(--bg-primary)] border ${errors.message ? 'border-rose-500/50' : 'border-[var(--border-color)]'} rounded-2xl py-4 px-6 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-all resize-none font-medium placeholder:text-gray-500/30`} required />
                   {errors.message && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.message}</p>}
                </div>
              </div>

              <button type="submit" disabled={sending} className="group w-full py-6 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-[0.4em] rounded-2xl flex items-center justify-center gap-4 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl disabled:opacity-50">
                <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                Establish Secure Link
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl flex items-center gap-3 backdrop-blur-xl border z-[100] ${toast.kind === 'error' ? 'bg-rose-500/20 border-rose-500/30 text-rose-500' : 'bg-[#00A86B]/20 border-[#00A86B]/30 text-[#00A86B]'} shadow-2xl`}
          >
            {toast.kind === 'success' ? <Check size={18}/> : <AlertCircle size={18}/>}
            <span className="text-xs font-black uppercase tracking-widest">{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPage;

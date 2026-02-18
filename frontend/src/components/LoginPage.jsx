import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLeft, Eye, EyeOff, Lock, User, Mail, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

import { validateEmail } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [publicKey, setPublicKey] = React.useState(null);
  
  // Validation
  const [emailError, setEmailError] = useState("");
  
  const navigate = useNavigate();

  // Fetch RSA Public Key
  React.useEffect(() => {
    const fetchKey = async () => {
      try {
        const res = await axios.get('/api/auth/public-key');
        setPublicKey(res.data.publicKey);
      } catch (err) {
        console.error("Failed to fetch security keys");
      }
    };
    fetchKey();
  }, []);
  
  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!rememberMe) {
      toast.error("You must agree to the Secure Protocol terms.");
      return;
    }

    if (!publicKey) {
      toast.error("Security protocol initializing... please wait.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { encryptWithRSA } = await import('../utils/crypto');
      const encryptedPassword = await encryptWithRSA(password, publicKey);

      // Obfuscate payload to prevent plain-text visibility in Network panel
      const obfuscatedPayload = btoa(JSON.stringify({
        email,
        password: encryptedPassword
      }));

      const response = await axios.post('/api/auth/login', {
        d: obfuscatedPayload
      });

      if (response.data.success) {
        toast.success("Identity Verified. Syncing...");
        // Use context login for seamless state update
        login(response.data.user);

        setTimeout(() => {
          navigate("/");
        }, 1250);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Verification Failed.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-6 transition-colors duration-500">
      <ToastContainer hideProgressBar role="alert" />
      
      <div className="w-full max-w-md">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-[var(--text-primary)] uppercase tracking-widest mb-6 md:mb-12 transition-colors"
        >
          <ArrowLeft size={16} /> Chrono-Return
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:shadow-[0_40px_100px_rgba(0,0,0,0.1)] relative overflow-hidden"
        >
          {/* Subtle Decorative Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--text-primary)] opacity-[0.02] rounded-bl-full pointer-events-none"></div>

          <div className="mb-10 text-center">
             <div className="w-16 h-16 bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center rounded-2xl font-black text-2xl mx-auto mb-6 shadow-xl">P</div>
             <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase leading-none mb-2">Access Granted</h2>
             <p className="text-xs md:text-sm font-medium text-[var(--text-secondary)]">Enter your credentials to sync with Pre-See-Jan.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Email Protocol</label>
              <div className="relative group">
                <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--text-accent)] transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  onBlur={handleEmailBlur}
                  placeholder="name@domain.com"
                  className={`w-full bg-[var(--bg-primary)] border ${emailError ? 'border-red-500' : 'border-[var(--border-color)]'} text-[var(--text-primary)] px-11 md:px-14 py-3 md:py-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-[var(--text-accent)] font-medium transition-all text-sm md:text-base`}
                />
              </div>
              {emailError && <p className="text-red-500 text-[10px] font-bold ml-2">{emailError}</p>}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest ml-1">Secure Key</label>
              <div className="relative group">
                <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--text-accent)] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] px-11 md:px-14 py-3 md:py-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-[var(--text-accent)] font-medium transition-all text-sm md:text-base"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--text-primary)] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Secure Protocol Check */}
            <div className="flex items-center gap-3 ml-1 mt-2">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="peer h-5 w-5 opacity-0 absolute cursor-pointer"
                />
                <div className="h-5 w-5 border-2 border-[var(--border-color)] rounded-md peer-checked:bg-[var(--text-primary)] peer-checked:border-[var(--text-primary)] transition-all flex items-center justify-center">
                  <ShieldCheck size={12} className="text-[var(--bg-primary)]" />
                </div>
              </div>
              <label htmlFor="rememberMe" className="text-[11px] font-bold text-[var(--text-secondary)] cursor-pointer select-none">
                I verify my identity & terms <span className="text-[var(--text-primary)]">*</span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || !!emailError}
              className={`w-full py-5 mt-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl disabled:opacity-50`}
            >
              {isSubmitting ? 'Verifying...' : 'Initiate Session'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">New Piece? </span>
            <Link to="/signup" className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-widest hover:underline decoration-2 underline-offset-4 ml-1">Create Account</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

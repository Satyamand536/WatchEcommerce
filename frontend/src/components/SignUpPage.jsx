import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { validateEmail, validatePassword, validateName, getPasswordStrength } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

const SignUpPage = () => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validation State
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [touched, setTouched] = useState({});

  const [publicKey, setPublicKey] = useState(null);

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

  // Real-time validation
  React.useEffect(() => {
    const newErrors = {};
    
    if (touched.name && !validateName(name)) {
      newErrors.name = "Name must be at least 3 characters (letters only)";
    }

    if (touched.email && !validateEmail(email)) {
      newErrors.email = "Enter a valid email (e.g., name@domain.com)";
    }

    if (touched.password) {
      if (!validatePassword(password)) {
        newErrors.password = "Password must be 8+ chars with uppercase, lowercase, number & symbol";
      }
      setPasswordStrength(getPasswordStrength(password));
    }

    setErrors(newErrors);
  }, [name, email, password, touched]);

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const nameValid = validateName(name);
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (!nameValid || !emailValid || !passwordValid) {
      setTouched({ name: true, email: true, password: true });
      toast.error("Please fix the errors before proceeding.");
      return;
    }

    if (!rememberMe) {
      toast.error("Please verify the Secure Protocol terms.");
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
        name,
        email,
        password: encryptedPassword
      }));

      const response = await axios.post('/api/auth/signup', {
        d: obfuscatedPayload
      });

      if (response.data.success) {
        toast.success("Account Secured. Syncing...");
        // Use context login for seamless state update
        login(response.data.user);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Protocol Failure. Try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };
    
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-6 py-10 md:py-20 transition-colors duration-500 overflow-y-auto">
      <ToastContainer hideProgressBar role="alert" />
      
      <div className="w-full max-w-md">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-[var(--text-primary)] uppercase tracking-widest mb-6 md:mb-12 transition-colors"
        >
          <ArrowLeft size={16} /> Chrono-Return
        </button>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.1)] md:shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative overflow-hidden"
        >
          {/* Header */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[var(--text-primary)] to-transparent opacity-10"></div>
          <div className="mb-10 text-center">
             <div className="w-16 h-16 bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center rounded-2xl font-black text-2xl mx-auto mb-6 shadow-xl">P</div>
             <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase leading-none mb-2">Initiate Pulse</h2>
             <p className="text-xs md:text-sm font-medium text-[var(--text-secondary)]">Create your Pre-See-Jan identity.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity Name</label>
              <div className="relative group">
                <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--text-primary)] transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="Full Name"
                  className={`w-full bg-[var(--bg-primary)] border ${errors.name ? 'border-red-500' : 'border-[var(--border-color)]'} text-[var(--text-primary)] px-11 md:px-14 py-3 md:py-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-[var(--text-primary)] font-medium transition-all text-sm md:text-base`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Logic</label>
              <div className="relative group">
                <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--text-primary)] transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="name@domain.com"
                  className={`w-full bg-[var(--bg-primary)] border ${errors.email ? 'border-red-500' : 'border-[var(--border-color)]'} text-[var(--text-primary)] px-11 md:px-14 py-3 md:py-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-[var(--text-primary)] font-medium transition-all text-sm md:text-base`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] font-bold ml-2">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Access Key</label>
              <div className="relative group">
                <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--text-primary)] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••"
                  className={`w-full bg-[var(--bg-primary)] border ${errors.password ? 'border-red-500' : 'border-[var(--border-color)]'} text-[var(--text-primary)] px-11 md:px-14 py-3 md:py-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-[var(--text-primary)] font-medium transition-all text-sm md:text-base`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--text-primary)] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Strength Indicator */}
              {password && (
                <div className="flex gap-1 h-1 mt-1 px-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-full flex-1 rounded-full transition-all duration-300 ${
                        i < passwordStrength 
                          ? passwordStrength < 3 ? 'bg-red-500' : passwordStrength < 5 ? 'bg-yellow-500' : 'bg-green-500'
                          : 'bg-gray-200 dark:bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>
              )}
              {errors.password && <p className="text-red-500 text-[10px] font-bold ml-2 leading-tight">{errors.password}</p>}
            </div>

            {/* Terms Check */}
            <div className="flex items-start gap-3 ml-1 mt-2">
              <div className="relative flex items-center mt-0.5">
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
              <label htmlFor="rememberMe" className="text-[11px] font-bold text-[var(--text-secondary)] cursor-pointer select-none leading-relaxed">
                I accept the Precision Protocol for secure data synchronization <span className="text-[var(--text-primary)]">*</span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0 || !name || !email || !password }
              className={`w-full py-5 mt-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? 'Securing...' : 'Verify Identity'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Active Link? </span>
            <Link to="/login" className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-widest hover:underline decoration-2 underline-offset-4 ml-1">Login Instead</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;

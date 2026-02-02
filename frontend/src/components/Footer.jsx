import React from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  Instagram, 
  Linkedin,
  Mail, 
  MapPin, 
  Phone, 
  X, 
  Heart,
  Zap
} from "lucide-react";

import { validateEmail } from '../utils/validation';

const Footer = () => {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState(""); // "success" or "error"

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Strict validation
    if (!validateEmail(email)) {
      setMessage("Enter a valid email (e.g., name@domain.com)");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    
    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(data.message || "Successfully subscribed! Check your inbox.");
        setMessageType("success");
        setEmail("");
        setTimeout(() => setMessage(""), 8000);
      } else {
        // Handle different error cases
        setMessage(data.message || "Something went wrong. Please try again.");
        setMessageType("error");
        setTimeout(() => setMessage(""), 5000);
      }
      
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage("Unable to connect to server. Please check your connection and try again.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Top: Newsletter Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 md:mb-20 gap-8 lg:gap-10">
          <div className="max-w-xl">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-primary)] italic tracking-tighter uppercase leading-[0.9] mb-4 text-center lg:text-left">
              Join the <br/> <span className="text-[var(--text-accent)]">Inner Circle.</span>
            </h3>
            <p className="text-[var(--text-secondary)] font-medium text-center lg:text-left text-sm sm:text-base"> Exclusive drops, styling guides, and horological insights.</p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="px-6 py-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-accent)] w-full sm:flex-1 lg:w-80 transition-all font-medium placeholder:text-[var(--text-secondary)]/30"
                required
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Subscribe"}
              </button>
            </div>
            {message && (
              <p className={`mt-3 text-sm font-medium text-center lg:text-right ${
                messageType === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}>
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Mid: Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-20">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center rounded-sm font-black group-hover:scale-110 transition-transform duration-300 shadow-lg">P</div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-[var(--text-primary)] leading-none">Pre-See-Jan</span>
                <span className="text-[10px] text-[var(--text-secondary)] font-bold tracking-[0.2em] uppercase">Precision × Clarity</span>
              </div>
            </Link>
            <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
              Crafting timeless pieces for the discerning individual. Where precision meets elegance in every detail.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/satyam-tiwari-359821292/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:border-[var(--text-primary)] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://www.instagram.com/satyamand536/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:border-[var(--text-primary)] transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://x.com/SatyamT7_456" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:border-[var(--text-primary)] transition-all"
                aria-label="X (Twitter)"
              >
                <X size={18} />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-8">Collections</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link to="/men" className="text-[13px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-block">Men's Watches</Link>
              </li>
              <li>
                <Link to="/women" className="text-[13px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-block">Women's Watches</Link>
              </li>
              <li>
                <Link to="/luxury" className="text-[13px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-block">Limited Edition</Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-[13px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-block">New Arrivals</Link>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-8">Support</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link to="/contact" className="text-[13px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-block">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="text-[13px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-block">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/product-care" className="text-[13px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-block">Product Care</Link>
              </li>
              <li>
                <Link to="/warranty" className="text-[13px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-block">Warranty</Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-8">Contact</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-gray-400 shrink-0" />
                <a 
                  href="https://maps.google.com/?q=Near+ABES+Engineering+College+Omvihar+Ghaziabad+Uttar+Pradesh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Near ABES Engineering College, Omvihar, Ghaziabad, Uttar Pradesh
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-gray-400 shrink-0" />
                <a 
                  href="tel:+917307997640"
                  className="text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  +91 730 799 7640
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-gray-400 shrink-0" />
                <a 
                  href="mailto:maisatyam108@gmail.com"
                  className="text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  maisatyam108@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Pre-See-Jan. Crafted with <Heart size={12} className="inline-block text-rose-500 mx-1" /> in Bharat
          </p>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="text-[10px] font-black text-gray-400 hover:text-[var(--text-primary)] uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-[10px] font-black text-gray-400 hover:text-[var(--text-primary)] uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

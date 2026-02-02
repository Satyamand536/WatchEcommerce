import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ArrowUp } from "lucide-react";

// Lazy Loading Pages
const Home = React.lazy(() => import("./pages/Home"));
const Brand = React.lazy(() => import("./pages/Brand"));
const LoginPage = React.lazy(() => import("./components/LoginPage"));
const SignUpPage = React.lazy(() => import("./components/SignUpPage"));
const Watch = React.lazy(() => import("./pages/Watch"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Cart = React.lazy(() => import("./pages/Cart"));
const NewArrivalsPage = React.lazy(() => import("./components/NewArrivalsPage"));
const WatchDetailsPage = React.lazy(() => import("./pages/WatchDetailsPage"));
const WishlistPage = React.lazy(() => import("./pages/WishlistPage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
const ShippingReturns = React.lazy(() => import("./pages/ShippingReturns"));
const ProductCare = React.lazy(() => import("./pages/ProductCare"));
const Warranty = React.lazy(() => import("./pages/Warranty"));

// to scroll to top for each page

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// to protect the route

import { AuthProvider, useAuth } from "./context/AuthContext";

// to protect the route
function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="fixed inset-0 bg-[var(--bg-primary)]" />; // frictionless loading
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
const App = () => {
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen w-full overflow-x-hidden antialiased bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
        <ScrollToTopOnRouteChange />
        <Suspense fallback={
          <div className="fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center z-50">
             <div className="w-16 h-16 border-4 border-t-[var(--text-primary)] border-r-transparent border-b-[var(--text-primary)] border-l-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brands" element={<Brand />} />
            <Route path="/brands/:brandName" element={<Brand />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/watches" element={<Watch />} />
            <Route path="/luxury" element={<Watch category="Luxury" />} />
            <Route path="/gifting" element={<Watch category="Gifting" />} />
            <Route path="/smart-watches" element={<Watch category="Smart" />} />
            <Route path="/offers" element={<Watch promo="offers" />} />
            <Route path="/men/*" element={<Watch gender="men" />} />
            <Route path="/women/*" element={<Watch gender="women" />} />
            <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/new-arrivals" element={<NewArrivalsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/watch/:id" element={<WatchDetailsPage />} />
            
            {/* Footer Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/product-care" element={<ProductCare />} />
            <Route path="/warranty" element={<Warranty />} />
  
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
  
        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className={`fixed right-10 bottom-10 z-50 flex items-center justify-center w-14 h-14 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 backdrop-blur-xl text-[var(--text-primary)] transition-all duration-500 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] shadow-2xl print:hidden
          ${showButton ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-50 pointer-events-none"}`}
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </AuthProvider>
  );
};

export default App;

import { ReviewsCarousel } from "./components/ReviewsCarousel";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShoppingBag, Bell, X, Menu, Search, ArrowRight, Truck, ShieldCheck, RefreshCcw, ChevronLeft, ChevronRight, Star, CheckCircle2, Quote, Heart, Flame, Sparkles, User, LogIn, LogOut, Copy, Check, AlertCircle } from 'lucide-react';
import { products, Product, Brand } from './data';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { ProductImage } from './components/ProductImage';
import { LogoIcon, Logo } from './components/Logo';

// Page layouts
const LandingPage = ({ content }: { content: React.ReactNode }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);
  return (
    <main className="landing-page">
      {content}
    </main>
  );
};

const AuthenticatedPage = ({ content }: { content: React.ReactNode }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);
  return (
    <main className="authenticated-page">
      {content}
    </main>
  );
};

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200',
    title: 'Nike Air Force 1 \'07',
  },
  {
    url: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1200',
    title: 'Nike Air Max 90',
  },
  {
    url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1200',
    title: 'Nike Air Max 270 React',
  },
  {
    url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200',
    title: 'Nike Air Max 270 React Yellow',
  },
];

export default function App() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeBrand, setActiveBrand] = useState<Brand | 'All' | 'About' | 'Hero'>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVaultAccessOpen, setIsVaultAccessOpen] = useState(false);
  const [isDropsModalOpen, setIsDropsModalOpen] = useState(false);
  const [notifiedDrops, setNotifiedDrops] = useState<string[]>([]);
  const [emailPromptDropId, setEmailPromptDropId] = useState<string | null>(null);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('shoemania_vip_member') === 'true';
    } catch {
      return false;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginStep, setLoginStep] = useState<1 | 2 | 3>(1);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedStreetLook, setSelectedStreetLook] = useState<{
    id: string;
    img: string;
    user: string;
    likes: string;
    location: string;
    shoeName: string;
    shoeBrand: Brand;
    shoePrice: number;
    quote: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [prevHeroImageIndex, setPrevHeroImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const brandSlogans: Record<Brand, string> = {
    'Nike': 'Just Do It.',
    'Adidas': 'Impossible Is Nothing.',
    'New Balance': 'Fearlessly Independent Since 1906.',
    'ASICS': 'Sound Mind, Sound Body.',
    'Puma': 'Forever Faster.',
    'Vans': 'Off The Wall.',
    'Converse': 'Shoes Are Boring. Wear Sneakers.',
    'Reebok': 'Life Is Not A Spectator Sport.',
  };

  useEffect(() => {
    if (isCartOpen || isWishlistOpen || isMobileMenuOpen || isVaultAccessOpen || isDropsModalOpen || isLoginModalOpen || quickViewProduct !== null || emailPromptDropId !== null || selectedStreetLook !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen, isWishlistOpen, isMobileMenuOpen, isVaultAccessOpen, isDropsModalOpen, isLoginModalOpen, quickViewProduct, emailPromptDropId, selectedStreetLook]);

  // Global search shortcut (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleNextSlide = () => {
    setSlideDirection(1);
    setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const handlePrevSlide = () => {
    setSlideDirection(-1);
    setHeroImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const isClickNavigatingRef = useRef(false);
  const clickNavTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Always reset scroll to the very top whenever a page is opened or switched (landing vs authenticated)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    try {
      localStorage.setItem('shoemania_vip_member', isLoggedIn ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [isLoggedIn]);

  // 1. Optimized Scroll Detection for Expanding/Shrinking Capsule past #hero
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setIsScrolled(rect.bottom <= 80);
      } else {
        setIsScrolled(window.scrollY > 200);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const allBrands = ['Nike', 'Adidas', 'New Balance', 'ASICS', 'Puma', 'Vans', 'Converse', 'Reebok'] as const;

  // 2. Smooth Nav Link Click with Anti-Flicker Lock (850ms lock window)
  const handleNavBrandClick = (brand: Brand | 'All' | 'About' | 'Hero', targetId?: string) => {
    setActiveBrand(brand);
    isClickNavigatingRef.current = true;

    if (clickNavTimeoutRef.current) {
      clearTimeout(clickNavTimeoutRef.current);
    }

    if (brand === 'All' || !targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const headerOffset = 85;
        const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = Math.max(0, elementPosition - headerOffset);
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }

    clickNavTimeoutRef.current = setTimeout(() => {
      isClickNavigatingRef.current = false;
    }, 850);

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // 4. Scroll Spy for brands with anti-flicker traversal guard
  useEffect(() => {
    let ticking = false;

    const handleScrollSpy = () => {
      if (isClickNavigatingRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const triggerY = 220; // 220px from top of viewport

          // 1. Check About (Release Calendar) section
          const aboutEl = document.getElementById('release-calendar');
          if (aboutEl && aboutEl.getBoundingClientRect().top <= triggerY) {
            setActiveBrand('About');
            ticking = false;
            return;
          }

          // 2. Collect existing brand section elements in layout order
          const brandEls = allBrands
            .map((b) => ({ brand: b, el: document.getElementById(`brand-${b}`) }))
            .filter((item): item is { brand: Brand; el: HTMLElement } => item.el !== null);

          const firstBrandTop = brandEls.length > 0 ? brandEls[0].el.getBoundingClientRect().top : Infinity;

          // If trigger line is inside brand sections (Nike and beyond)
          if (triggerY >= firstBrandTop && brandEls.length > 0) {
            for (let i = 0; i < brandEls.length; i++) {
              const currentRect = brandEls[i].el.getBoundingClientRect();
              const nextEl = brandEls[i + 1]?.el;
              const nextTop = nextEl
                ? nextEl.getBoundingClientRect().top
                : (aboutEl ? aboutEl.getBoundingClientRect().top : currentRect.bottom);

              if (triggerY >= currentRect.top && triggerY < nextTop) {
                setActiveBrand(brandEls[i].brand);
                ticking = false;
                return;
              }
            }
          }

          // 3. Check if in "ALL" zone (Featured Brands down to first brand section)
          const featuredEl = document.getElementById('featured-brands');
          const featuredTop = featuredEl ? featuredEl.getBoundingClientRect().top : firstBrandTop;

          if (triggerY >= featuredTop && triggerY < firstBrandTop) {
            setActiveBrand('All');
            ticking = false;
            return;
          }

          // 4. Otherwise in Hero section
          setActiveBrand('All');

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);
  const filteredProductsSearch = products.filter(p => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           p.brand.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartTotal = isLoggedIn ? Math.floor(cartSubtotal * 0.9) : cartSubtotal;
  const cartSavings = cartSubtotal - cartTotal;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const layout = (
    <div className="min-h-screen flex flex-col relative z-0 bg-white">
      

      {/* Navigation: Floating Responsive Luxury Pill Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-5 sm:py-6 pointer-events-none flex justify-center">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 flex justify-center">
          <motion.nav 
            ref={navContainerRef}
            initial={false}
            animate={{ 
              maxWidth: isScrolled ? '1320px' : '1520px',
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className={`pointer-events-auto w-full h-[58px] rounded-full relative flex items-center justify-between transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled 
                ? 'px-4 sm:px-6 bg-white/85 backdrop-blur-2xl shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/70' 
                : 'px-5 sm:px-7 bg-white/75 backdrop-blur-xl shadow-[0_2px_8px_rgba(15,23,42,0.02)] border border-slate-200/50'
            }`}
          >
            {/* Left: Brand Logo & Morphing Name */}
            <div className="flex items-center shrink-0 z-20">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 mr-1.5 lg:hidden text-zinc-800 hover:bg-zinc-100 rounded-full transition-colors focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" strokeWidth={2.2} />
              </button>
              <button 
                onClick={() => handleNavBrandClick('All')}
                className="flex items-center group focus:outline-none text-left"
                aria-label="Return to top"
              >
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black text-white flex items-center justify-center shadow-sm shrink-0 transition-transform duration-200 hover:scale-[1.04] active:scale-[0.96]">
                  <LogoIcon className="w-4.5 h-4.5 text-white" />
                </div>
                <AnimatePresence initial={false}>
                  {!isScrolled && (
                    <motion.span 
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{ 
                        opacity: 1, 
                        width: 'auto', 
                        marginLeft: 8,
                        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                      }}
                      exit={{ 
                        opacity: 0, 
                        width: 0, 
                        marginLeft: 0,
                        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                      }}
                      className="overflow-hidden font-display font-bold tracking-wider text-[#2c2929] text-lg sm:text-xl whitespace-nowrap hidden sm:inline-block"
                    >
                      SHOEMANIA
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

             {/* Center-Locked Navigation & Pill Active Indicator */}
            <div className="hidden lg:flex items-center justify-center min-w-0 flex-1 px-2 sm:px-4">
              <div 
                ref={linksContainerRef} 
                className="relative flex items-center gap-1.5 sm:gap-2 xl:gap-3 max-w-full overflow-x-auto hide-scrollbar py-1 px-1.5"
              >
                {/* Nav Brand Links */}
                <button
                  data-nav-brand="All"
                  onClick={() => handleNavBrandClick('All')}
                  className={`relative h-[30px] px-3.5 xl:px-4 rounded-full font-sans font-bold text-xs xl:text-[13px] tracking-wider uppercase whitespace-nowrap shrink-0 transition-colors duration-200 focus:outline-none flex items-center justify-center leading-none ${
                    activeBrand === 'All' ? 'text-white' : 'text-zinc-500 hover:text-zinc-950 hover:bg-black/5'
                  }`}
                >
                  {activeBrand === 'All' && (
                    <motion.div
                      layoutId="navActivePill"
                      className="absolute inset-0 bg-zinc-900 rounded-full shadow-sm pointer-events-none"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                        mass: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center justify-center text-center leading-none translate-y-[1px] -mr-[0.05em] select-none">
                    ALL
                  </span>
                </button>
                {allBrands.map((brand) => {
                  const isSelected = activeBrand === brand;
                  return (
                    <button
                      key={brand}
                      data-nav-brand={brand}
                      onClick={() => handleNavBrandClick(brand, `brand-${brand}`)}
                      className={`relative h-[30px] px-3.5 xl:px-4 rounded-full font-sans font-bold text-xs xl:text-[13px] tracking-wider uppercase whitespace-nowrap shrink-0 transition-colors duration-200 focus:outline-none flex items-center justify-center leading-none ${
                        isSelected ? 'text-white' : 'text-zinc-500 hover:text-zinc-950 hover:bg-black/5'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="navActivePill"
                          className="absolute inset-0 bg-zinc-900 rounded-full shadow-sm pointer-events-none"
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 34,
                            mass: 0.6,
                          }}
                        />
                      )}
                      <span className="relative z-10 inline-flex items-center justify-center text-center leading-none translate-y-[1px] -mr-[0.05em] select-none">
                        {brand}
                      </span>
                    </button>
                  );
                })}
                <button 
                  data-nav-brand="About"
                  onClick={() => handleNavBrandClick('About', 'release-calendar')}
                  className={`relative h-[30px] px-3.5 xl:px-4 rounded-full font-sans font-bold text-xs xl:text-[13px] tracking-wider uppercase whitespace-nowrap shrink-0 transition-colors duration-200 focus:outline-none flex items-center justify-center leading-none ${
                    activeBrand === 'About' ? 'text-white' : 'text-zinc-500 hover:text-zinc-950 hover:bg-black/5'
                  }`}
                >
                  {activeBrand === 'About' && (
                    <motion.div
                      layoutId="navActivePill"
                      className="absolute inset-0 bg-zinc-900 rounded-full shadow-sm pointer-events-none"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                        mass: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center justify-center text-center leading-none translate-y-[1px] -mr-[0.05em] select-none">
                    ABOUT
                  </span>
                </button>
              </div>
            </div>

            {/* Right-Side Actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0 z-20">
              {/* Primary Action Button (Drops Symbol) */}
              <button
                onClick={() => {
                  const dropsEl = document.getElementById('release-calendar') || document.getElementById('products-top');
                  dropsEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 rounded-full transition-colors relative flex items-center justify-center"
                title="View Drops"
              >
                <Flame className="w-5 h-5 text-zinc-800" strokeWidth={2.2} />
              </button>

              {/* Login Button */}
              {isLoggedIn ? (
                <div className="flex items-center gap-1 sm:gap-2">
                  <button 
                    onClick={() => setIsWishlistOpen(true)}
                    className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 rounded-full transition-colors relative"
                    title="Wishlist"
                  >
                    <Heart className="w-5 h-5" strokeWidth={2.2} />
                    {wishlist.length > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-zinc-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </button>

                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 rounded-full transition-colors relative"
                    title="Shopping Bag"
                  >
                    <ShoppingBag className="w-5 h-5" strokeWidth={2.2} />
                    {cartCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-zinc-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>

                  <div className="relative group">
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="p-2 text-zinc-700 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors relative flex items-center justify-center ml-1 group"
                      title="Log Out"
                    >
                      <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setLoginStep(1);
                    setLoginError('');
                    setLoginEmail('');
                    setLoginPassword('');
                  }}
                  className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 rounded-full transition-colors relative flex items-center justify-center"
                  title="Log In"
                >
                  <User className="w-5 h-5 text-zinc-800" strokeWidth={2.2} />
                </button>
              )}
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Hero Section */}
      <div id="hero" className="scroll-spy-section relative overflow-hidden min-h-[100dvh] flex flex-col items-center justify-center pt-28 sm:pt-32 lg:pt-24 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex items-center justify-center relative pt-4 sm:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center justify-center w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 leading-[24px]"
            >
              {isLoggedIn ? (
                <>
                  <h1 className="text-[45px] sm:text-5xl lg:text-[73px] font-bold text-zinc-900 leading-[47px] sm:leading-[50px] lg:leading-[70px] text-center lg:text-left mb-6 drop-shadow-sm font-display tracking-tight">
                    WELCOME BACK. <br />
                    <span className="text-zinc-500">YOUR VAULT</span> <br />
                    IS UNLOCKED.
                  </h1>
                  <p className="-mt-[7px] sm:mt-0 text-sm sm:text-base leading-[22px] text-center lg:text-left text-zinc-600 mb-7 max-w-md font-sans mx-auto lg:mx-0">
                    Curated allocations, priority drop alerts, and concierge authentication for verified members.
                  </p>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      onClick={() => {
                        document.getElementById('products-top')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-zinc-900 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-sans text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-zinc-800 transition-all shadow-none border-none whitespace-nowrap"
                    >
                      Explore The Vault <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      onClick={() => {
                        const dropsEl = document.getElementById('release-calendar') || document.getElementById('products-top');
                        dropsEl?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-none whitespace-nowrap"
                    >
                      <Flame className="w-3.5 h-3.5 text-zinc-800" /> Member Drops
                    </motion.button>
                    {wishlist.length > 0 && (
                      <motion.button 
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => setIsWishlistOpen(true)}
                        className="inline-flex items-center justify-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-none whitespace-nowrap"
                      >
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> {wishlist.length} Saved
                      </motion.button>
                    )}
                  </div>

                  {/* Minimal Trust Features */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-zinc-500 text-xs sm:text-[13px] font-medium mt-8 pt-[7px] pr-0 mx-auto lg:mx-0 lg:ml-[50px] lg:mr-0 border-t border-[#ffffff] w-full max-w-lg">
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-zinc-800" />
                      <span>Priority Dispatch</span>
                    </div>
                    <span className="text-zinc-300 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-800" />
                      <span>Vault Verified</span>
                    </div>
                    <span className="text-zinc-300 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>2x VIP Points</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-[45px] sm:text-[50px] lg:text-[71px] font-bold text-zinc-900 leading-[47px] sm:leading-[50px] lg:leading-[70px] text-center lg:text-left mb-6 drop-shadow-sm font-display tracking-tight">
                    THE ULTIMATE <br />
                    <span className="text-zinc-500">SNEAKER</span> <br />
                    DESTINATION.
                  </h1>
                  <p className="-mt-[7px] sm:mt-0 text-sm sm:text-base leading-[22px] text-center lg:text-left text-zinc-600 mb-7 max-w-md font-sans mx-auto lg:mx-0">
                    Curated releases and timeless icons from the world's most sought-after brands.
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      onClick={() => {
                        document.getElementById('products-top')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-sans text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-zinc-800 transition-all shadow-none border-none whitespace-nowrap"
                    >
                      Shop Collection <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>

                  {/* Minimal Trust Features */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-zinc-500 text-xs sm:text-[13px] font-medium mt-8 pt-[7px] pr-0 mx-auto lg:mx-0 lg:ml-[50px] lg:mr-0 border-t border-[#ffffff] w-full max-w-lg">
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-zinc-800" />
                      <span>Free Shipping</span>
                    </div>
                    <span className="text-zinc-300 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-800" />
                      <span>100% Authentic</span>
                    </div>
                    <span className="text-zinc-300 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <RefreshCcw className="w-3.5 h-3.5 text-zinc-800" />
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              className="relative block h-[280px] sm:h-[380px] lg:h-[460px] xl:h-[500px] w-full group mt-6 lg:mt-0"
            >
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-md bg-zinc-100 border border-zinc-200/60">
                {/* Underlying base image to prevent black screen flashes */}
                <img
                  src={heroImages[prevHeroImageIndex].url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <AnimatePresence initial={false} custom={slideDirection}>
                  <motion.img
                    key={heroImageIndex}
                    src={heroImages[heroImageIndex].url}
                    alt={heroImages[heroImageIndex].title}
                    custom={slideDirection}
                    variants={{
                      enter: (dir: number) => ({
                        x: dir > 0 ? '100%' : '-100%',
                      }),
                      center: {
                        x: '0%',
                      },
                      exit: (dir: number) => ({
                        x: dir > 0 ? '-100%' : '100%',
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 30,
                      mass: 0.8,
                    }}
                    onAnimationComplete={() => setPrevHeroImageIndex(heroImageIndex)}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                  />
                </AnimatePresence>

                

                {/* Image caption badge - Dark translucent glass blurred pill (hidden on mobile, kept on desktop) */}
                <div className="hidden sm:flex absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-xl border border-zinc-200/60 px-5 py-2.5 rounded-full text-zinc-900 font-sans text-sm font-bold tracking-wider uppercase items-center gap-3 shadow-sm">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500/60 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                  </span>
                  <div className="h-5 overflow-hidden relative inline-flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroImageIndex}
                        initial={{ opacity: 0, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.3 }}
                        className="whitespace-nowrap inline-block text-zinc-900 font-display font-bold text-[15px] tracking-wider"
                      >
                        {heroImages[heroImageIndex].title}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                <div className={`absolute top-6 right-6 z-20 bg-zinc-900/90 backdrop-blur-xl border border-white/20 px-3.5 py-2 rounded-full text-white font-sans text-xs font-bold tracking-wider uppercase ${isLoggedIn ? 'flex' : 'flex sm:hidden'} items-center gap-1.5 shadow-sm`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">VIP Pass Active</span>
                  <span className="sm:hidden">VIP</span>
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/90 mix-blend-difference flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out hover:scale-110 active:scale-95"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-10 h-10" strokeWidth={2} />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/90 mix-blend-difference flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out hover:scale-110 active:scale-95"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-10 h-10" strokeWidth={2} />
                </button>

                {/* Slide indicator dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSlideDirection(idx > heroImageIndex ? 1 : -1);
                        setHeroImageIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all duration-500 ${idx === heroImageIndex ? 'w-6 bg-zinc-900' : 'w-2 bg-zinc-300 hover:bg-zinc-400'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Brands */}
                <section id="featured-brands" className="scroll-spy-section py-16 lg:py-24 relative">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center mb-12">
                      <div className="flex flex-col items-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4 shadow-sm">
                          <Star className="w-3 h-3 text-yellow-400" /> Premium Partners
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 uppercase tracking-tight text-center mb-3 drop-shadow-sm">FEATURED BRANDS</h2>
                        <p className="text-zinc-600 font-sans font-medium text-lg drop-shadow-sm text-center">Explore our curated collection of industry leaders.</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 md:h-[850px]">
                      {/* Top Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row gap-4 md:flex-1 md:hover:flex-[3] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        {[
                          { title: 'NIKE', id: 'Nike', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
                          { title: 'ADIDAS', id: 'Adidas', image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=800' }
                        ].map((brand, index) => (
                          <motion.div 
                            key={brand.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            onClick={() => {
                              setActiveBrand(brand.id as Brand);
                              document.getElementById('products-top')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="relative w-full h-[240px] sm:h-[280px] md:h-auto flex-none md:flex-1 md:hover:flex-[2.5] transition-all duration-700 md:duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm md:shadow-none bg-zinc-900"
                          >
                            <img 
                              src={brand.image} 
                              alt={brand.title} 
                              loading="eager"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/25 md:bg-black/10 transition-colors duration-1000" />
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                              <div className="bg-black/40 md:bg-black/30 backdrop-blur-xl border border-white/20 md:border-white/10 px-6 sm:px-8 py-5 sm:py-6 min-w-[180px] sm:min-w-[200px] md:min-w-[240px] rounded-3xl flex flex-col items-center gap-3 sm:gap-4 transition-all duration-500 delay-0 group-hover:delay-[300ms] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 group-hover:scale-105 shadow-xl">
                                <h3 className="text-white font-display text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-center drop-shadow-sm">{brand.title}</h3>
                                <button className="px-5 py-2 bg-white/20 md:bg-white/10 backdrop-blur-lg border border-white/30 md:border-white/20 text-white shadow-xl rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-white/20 active:scale-95">
                                  Shop Now
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Bottom Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 md:flex md:flex-row gap-4 md:flex-1 md:hover:flex-[2] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        {[
                          { title: 'NEW BALANCE', id: 'New Balance', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1000' },
                          { title: 'ASICS', id: 'Asics', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800' },
                          { title: 'PUMA', id: 'Puma', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800' }
                        ].map((brand, index) => (
                          <motion.div 
                            key={brand.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px" }}
                            transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                            onClick={() => {
                              setActiveBrand(brand.id as Brand);
                              document.getElementById('products-top')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="relative w-full h-[220px] sm:h-[260px] md:h-auto flex-none md:flex-1 md:hover:flex-[2.5] transition-all duration-700 md:duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm md:shadow-none bg-zinc-900"
                          >
                            <img 
                              src={brand.image} 
                              alt={brand.title} 
                              loading="eager"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/25 md:bg-black/10 transition-colors duration-1000" />
                            
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                              <div className="bg-black/40 md:bg-black/30 backdrop-blur-xl border border-white/20 md:border-white/10 px-6 sm:px-8 py-5 min-w-fit rounded-3xl flex flex-col items-center gap-3 transition-all duration-500 delay-0 group-hover:delay-[300ms] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 group-hover:scale-105 shadow-xl">
                                <h3 className="text-white font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight uppercase text-center leading-tight whitespace-nowrap drop-shadow-sm">{brand.title}</h3>
                                <button className="px-5 py-2 bg-white/20 md:bg-white/10 backdrop-blur-lg border border-white/30 md:border-white/20 text-white shadow-xl rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-white/20 active:scale-95">
                                  Shop Now
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
          
                {/* The Vault Section */}
                <section id="the-vault" className="scroll-spy-section py-16 lg:py-24 relative mb-12">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Subtle background glow to match the image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-blue-400/20 via-pink-400/20 to-purple-400/20 blur-[120px] rounded-full pointer-events-none -z-10" />
                  
                  <div className="flex flex-col items-center justify-center mb-16 gap-2 text-center relative z-10">
                    <div className="flex flex-col items-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4 shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" /> Authenticated Grails
                      </div>
                      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 uppercase tracking-tight text-center mb-3 drop-shadow-sm">
                        {isLoggedIn ? 'YOUR VIP VAULT' : 'THE VAULT'}
                      </h2>
                      <p className="text-zinc-600 font-sans font-medium text-lg drop-shadow-sm text-center">Extremely rare, deadstock archival pieces. Sourced globally.</p>
                    </div>
                  </div>
          
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row items-center gap-6 md:gap-8 md:h-[550px]">
                    {[
                      { name: 'DIOR 1 HIGH', year: '2020', price: '$7,500', bg: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800' },
                      { name: 'TS DUNK LOW', year: '2020', price: '$2,100', bg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
                      { name: 'OW AIR FORCE', year: '2017', price: '$4,200', bg: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800' }
                    ].map((grail, index) => (
                      <motion.div 
                        key={grail.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px" }}
                        transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                        className="relative w-full h-[300px] sm:h-[360px] md:h-[450px] md:hover:h-[550px] flex-none md:flex-1 md:hover:flex-[3.5] transition-all duration-700 md:duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm md:shadow-none bg-zinc-900 snap-center"
                      >
                        <img 
                          src={grail.bg} 
                          alt={grail.name} 
                          loading="eager"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover" 
                          style={index === 0 ? {
                            transform: `scale(1.55)`,
                            objectPosition: `50% 50%`
                          } : undefined}
                        />
                        <div className="absolute inset-0 bg-black/25 md:bg-black/10 transition-colors duration-1000" />
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                          <div className="bg-black/40 md:bg-black/30 backdrop-blur-xl border border-white/20 md:border-white/10 px-6 sm:px-8 py-5 min-w-fit rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-500 delay-0 group-hover:delay-[300ms] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 group-hover:scale-105 shadow-xl">
                            <h3 className="text-white font-display text-xl md:text-2xl font-bold tracking-tight text-center leading-tight uppercase drop-shadow-sm whitespace-nowrap">
                              {grail.name}
                            </h3>
                            
                            <div className="flex items-center justify-center gap-2 w-full">
                              <span className="text-white/80 font-bold text-[11px] md:text-xs tracking-wider">{grail.year}</span>
                              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/50" />
                              <span className="text-white font-bold text-[11px] md:text-xs tracking-wider">{grail.price}</span>
                            </div>
          
                            <button 
                              onClick={() => setIsVaultAccessOpen(true)}
                              className="px-5 py-2.5 bg-white/20 md:bg-white/10 backdrop-blur-lg border border-white/30 md:border-white/20 text-white shadow-xl rounded-full text-[10px] md:text-xs font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap flex items-center justify-center hover:bg-white/20 active:scale-95">
                              {isLoggedIn ? 'Secure Purchase' : 'Request Access'}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  </div>
                </section>
          
          
                {/* Trending Section */}
                <section id="trending-now" className="scroll-spy-section py-16 lg:py-24 relative">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center mb-12">
                      <div className="flex flex-col items-center">
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4 shadow-sm">
                          <Flame className="w-3.5 h-3.5 text-orange-400" /> Hot Right Now
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 uppercase tracking-tight text-center mb-3 drop-shadow-sm">TRENDING NOW</h2>
                        <p className="text-zinc-600 font-sans font-medium text-lg drop-shadow-sm text-center">The most sought-after styles this week.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {trendingProducts.map((product, index) => (
                        <motion.div 
                          key={product.id} 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          onClick={() => setQuickViewProduct(product)}
                          className="relative group flex flex-col bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-4 rounded-[2rem] transition-all duration-300 hover:scale-[1.03] hover:z-10 cursor-pointer"
                        >
                          <div className="relative aspect-square bg-zinc-100/50 rounded-[1.5rem] mb-4 overflow-hidden shadow-inner">
                            <ProductImage 
                              src={product.image} 
                              brand={product.brand}
                              alt={product.name}
                              hueRotate={product.hueRotate}
                              className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            />
                            <button 
                              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                              className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 backdrop-blur-xl border border-white/25 shadow-sm text-white font-bold tracking-wider text-[9px] uppercase opacity-100 scale-100 translate-y-0 sm:opacity-0 sm:scale-95 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:scale-100 sm:group-hover:translate-y-0 transition-all duration-500 delay-0 group-hover:delay-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-md active:scale-[0.98] rounded-full flex items-center justify-center whitespace-nowrap ${isLoggedIn ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-zinc-500/90 hover:bg-zinc-600/95'}`}
                            >
                              {isLoggedIn ? 'ADD TO CART (VIP)' : 'ADD TO CART'}
                            </button>
                          </div>
                          <div className="flex justify-between items-start gap-4 px-2 pb-2">
                            <div>
                              <h3 className="font-display text-lg font-medium text-zinc-900 leading-tight">
                                {product.name}
                              </h3>
                              <p className="text-zinc-600 font-medium text-sm mt-1">{product.brand}</p>
                            </div>
                            {isLoggedIn ? (
                              <div className="text-right">
                                <p className="font-bold text-emerald-600">${Math.floor(product.price * 0.9)}</p>
                                <p className="text-[10px] text-zinc-400 line-through">${product.price}</p>
                              </div>
                            ) : (
                              <p className="font-bold text-zinc-900">${product.price}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
          
          
          
      {isLoggedIn && (
        <>
          {/* Promo Marquee */}
          <div className="bg-zinc-900 py-2.5 overflow-hidden flex relative border-y border-zinc-800 z-10">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }} 
              transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
              className="flex whitespace-nowrap items-center w-max"
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-8 px-4 font-display font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase text-zinc-300">
                  <span>MEMBER WEEK IS LIVE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500/40" />
                  <span>USE CODE <span className="bg-white text-zinc-900 px-1.5 py-0.5 rounded">VIPADI</span> FOR 20% OFF ADIDAS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500/40" />
                  <span>FREE PREMIUM CARE KIT ON $300+ ORDERS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500/40" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* VIP Member Offers Section */}
          <section id="vip-offers" className="scroll-spy-section py-16 lg:py-24 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-zinc-200/20 via-transparent to-zinc-200/20 blur-[120px] pointer-events-none -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> Active VIP Offers
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 uppercase tracking-tight drop-shadow-sm">MEMBER REWARDS</h2>
              </div>
              <p className="text-zinc-600 font-sans font-medium text-base sm:text-lg max-w-sm text-center md:text-right drop-shadow-sm">
                Your VIP status automatically applies these discounts at checkout. No codes needed.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Offer Card 1 */}
              <div className="bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-8 lg:p-10 rounded-[3rem] shadow-sm flex flex-col justify-between hover:scale-[1.02] hover:bg-white transition-all duration-300 cursor-pointer group">
                <div>
                  <div className="text-zinc-900 font-display font-bold text-lg mb-2">EXTRA 15% OFF</div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3 text-zinc-900">ALL ADIDAS</h3>
                  <p className="font-sans font-medium text-zinc-600 text-sm leading-relaxed">Stackable with your 10% VIP discount on all Adidas and Y-3 styles.</p>
                </div>
                <div className="mt-10 flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Ends in 2 days</span>
                </div>
              </div>
              
              {/* Offer Card 2 */}
              <div className="bg-zinc-900 border border-zinc-800 p-8 lg:p-10 rounded-[3rem] shadow-sm flex flex-col justify-between hover:scale-[1.02] hover:bg-zinc-800 transition-all duration-300 cursor-pointer group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[30px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <div className="text-zinc-400 font-display font-bold text-lg mb-2">FREE GIFT</div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3 text-white">PREMIUM CARE KIT</h3>
                  <p className="font-sans font-medium text-zinc-400 text-sm leading-relaxed">Complimentary shoe cleaning kit on all orders over $300.</p>
                </div>
                <div className="mt-10 flex justify-between items-center relative z-10">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">Auto-added to cart</span>
                </div>
              </div>
              
              {/* Offer Card 3 */}
              <div className="bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-8 lg:p-10 rounded-[3rem] shadow-sm flex flex-col justify-between hover:scale-[1.02] hover:bg-white transition-all duration-300 cursor-pointer group">
                <div>
                  <div className="text-amber-500 font-display font-bold text-lg mb-2">VAULT CLEARANCE</div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3 text-zinc-900">$50 OFF GRAILS</h3>
                  <p className="font-sans font-medium text-zinc-600 text-sm leading-relaxed">Save a flat $50 on any authenticated grail purchase this week.</p>
                </div>
                <div className="mt-10 flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">1 Use Remaining</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        </>
      )}

      {/* Manifesto Section */}
      {!isLoggedIn && (
                  <section id="manifesto" className="scroll-spy-section py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center">
                    <div className="max-w-6xl w-full relative">
            
                      <div className="bg-zinc-50/80 backdrop-blur-2xl border border-zinc-200/60 rounded-[3rem] shadow-sm p-6 sm:p-12 md:p-16 lg:p-24 relative overflow-hidden flex flex-col items-center">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.1] text-center mb-10 sm:mb-16 md:mb-24">
                          CURATING THE BEST,<br />IGNORING THE REST.
                        </h2>
            
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 w-full max-w-5xl">
                          <div className="flex flex-col items-center text-center">
                            <span className="text-5xl font-display text-zinc-300 mb-4 leading-none">"</span>
                            <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed font-medium mb-6 flex-1">
                              Sneakers are modern architecture for your feet—wearable history, raw emotion, and the universal canvas of self-expression.
                            </p>
                            <p className="text-xs font-bold tracking-widest text-zinc-900 uppercase">— The Culture</p>
                          </div>
                          
                          <div className="flex flex-col items-center text-center">
                            <span className="text-5xl font-display text-zinc-300 mb-4 leading-none">"</span>
                            <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed font-medium mb-6 flex-1">
                              True luxury is zero compromise. Every grail is hand-verified and authenticated so you walk with 100% unshakeable confidence.
                            </p>
                            <p className="text-xs font-bold tracking-widest text-zinc-900 uppercase">— The Standard</p>
                          </div>
                          
                          <div className="flex flex-col items-center text-center">
                            <span className="text-5xl font-display text-zinc-300 mb-4 leading-none">"</span>
                            <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed font-medium mb-6 flex-1">
                              Great design doesn't just follow trends—it defines entire eras. We bring the world's most iconic silhouettes directly to your door.
                            </p>
                            <p className="text-xs font-bold tracking-widest text-zinc-900 uppercase">— The Journey</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

      {/* Mobile Filters (Inline for Main Grid) */}
      <div className="lg:hidden relative bg-white/95 backdrop-blur-xl border-y border-zinc-200/70 px-3 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-wrap gap-1.5 sm:gap-2 justify-center items-center">
        {['All', ...allBrands].map((brand) => (
          <button
            key={brand}
            onClick={() => {
              setActiveBrand(brand as Brand | 'All');
              if (brand === 'All') window.scrollTo({ top: 0, behavior: 'smooth' });
              else document.getElementById(`brand-${brand}`)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`font-display text-[11px] sm:text-xs tracking-wider uppercase px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all flex items-center justify-center text-center whitespace-nowrap ${
              activeBrand === brand 
                ? 'bg-zinc-900 text-white shadow-none border border-zinc-900 font-bold' 
                : 'bg-zinc-100/90 border border-zinc-200 text-zinc-700 hover:bg-zinc-200 font-semibold'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <main id="products-top" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full relative scroll-mt-24">
        {searchQuery ? (
          <div>
            <div className="mb-12 border-b border-black/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-900 mb-2 drop-shadow-sm uppercase tracking-tight">
                  Search Results
                </h2>
                <p className="text-zinc-600 font-sans font-medium text-sm sm:text-base drop-shadow-sm">
                  {filteredProductsSearch.length} {filteredProductsSearch.length === 1 ? 'product' : 'products'} found for <span className="font-bold text-zinc-900">"{searchQuery}"</span>
                </p>
              </div>
              <button 
                onClick={() => setSearchQuery('')}
                className="self-start sm:self-auto px-4 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors shadow-none inline-flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" /> Clear Search
              </button>
            </div>

            {filteredProductsSearch.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center bg-zinc-50/60 rounded-3xl border border-zinc-200/60 p-8">
                <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4 border border-zinc-200">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-zinc-900 mb-2 uppercase tracking-tight">No matching sneakers found</h3>
                <p className="text-zinc-500 text-sm max-w-md mb-6 font-sans">We couldn't find anything matching "{searchQuery}". Try searching for brands like Nike, Adidas, New Balance or models like Dunk, Samba, Air Force.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2.5 bg-zinc-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-none"
                >
                  Browse Full Collection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                {filteredProductsSearch.map((product, index) => (
                  <motion.div 
                    key={product.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onClick={() => setQuickViewProduct(product)}
                    className="relative group flex flex-col bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-4 rounded-[2rem] transition-all duration-300 hover:scale-[1.03] hover:z-10 cursor-pointer"
                  >
                    <div className="relative aspect-square bg-zinc-100/50 rounded-[1.5rem] mb-4 overflow-hidden shadow-inner">
                      {product.isNew && (
                        <span className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md border border-zinc-200/60 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                          New
                        </span>
                      )}
                      {product.featured && !product.isNew && (
                        <span className="absolute top-4 left-4 z-10 bg-zinc-500/90 backdrop-blur-md border border-white/25 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                          Featured
                        </span>
                      )}
                      <ProductImage 
                        src={product.image} 
                        brand={product.brand}
                        alt={product.name}
                        hueRotate={product.hueRotate}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 backdrop-blur-xl border border-white/25 shadow-sm text-white font-bold tracking-wider text-[9px] uppercase opacity-100 scale-100 translate-y-0 sm:opacity-0 sm:scale-95 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:scale-100 sm:group-hover:translate-y-0 transition-all duration-500 delay-0 group-hover:delay-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-md active:scale-[0.98] rounded-full flex items-center justify-center whitespace-nowrap ${isLoggedIn ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-zinc-500/90 hover:bg-zinc-600/95'}`}
                      >
                        {isLoggedIn ? 'ADD TO CART (VIP)' : 'ADD TO CART'}
                      </button>
                    </div>
                    <div className="flex justify-between items-start gap-4 px-2 pb-2">
                      <div>
                        <h3 className="font-display text-lg font-medium text-zinc-900 leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-zinc-600 font-medium text-sm mt-1">{product.category}</p>
                      </div>
                      {isLoggedIn ? (
                        <div className="text-right">
                          <p className="font-bold text-emerald-600">${Math.floor(product.price * 0.9)}</p>
                          <p className="text-[10px] text-zinc-400 line-through">${product.price}</p>
                        </div>
                      ) : (
                        <p className="font-bold text-zinc-900">${product.price}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-24">
            {allBrands.map((brand) => {
              const brandProducts = products.filter(p => p.brand === brand);
              if (brandProducts.length === 0) return null;
              return (
                <div key={brand} id={`brand-${brand}`} className="scroll-spy-section scroll-mt-32">
                  <div className="mb-12 border-b border-black/10 pb-8 flex flex-col items-center text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 uppercase tracking-tight text-center">{brand}</h2>
                    <p className="mt-0 text-zinc-500 font-sans font-semibold text-[15px] leading-[31px] tracking-[0.25em] uppercase">
                      {brandSlogans[brand as Brand]}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {brandProducts.map((product, index) => (
                      <motion.div 
                        key={product.id} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        onClick={() => setQuickViewProduct(product)}
                        className="relative group flex flex-col bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-4 rounded-[2rem] transition-all duration-300 hover:scale-[1.03] hover:z-10 cursor-pointer"
                      >
                        <div className="relative aspect-square bg-zinc-100/50 rounded-[1.5rem] mb-4 overflow-hidden shadow-inner">
                          {product.isNew && (
                            <span className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md border border-zinc-200/60 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                              New
                            </span>
                          )}
                          {product.featured && !product.isNew && (
                            <span className="absolute top-4 left-4 z-10 bg-zinc-500/90 backdrop-blur-md border border-white/25 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                              Featured
                            </span>
                          )}
                          <ProductImage 
                            src={product.image} 
                            brand={product.brand}
                            alt={product.name}
                            hueRotate={product.hueRotate}
                            className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          />
                          <button 
                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                            className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 backdrop-blur-xl border border-white/25 shadow-sm text-white font-bold tracking-wider text-[9px] uppercase opacity-100 scale-100 translate-y-0 sm:opacity-0 sm:scale-95 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:scale-100 sm:group-hover:translate-y-0 transition-all duration-500 delay-0 group-hover:delay-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-md active:scale-[0.98] rounded-full flex items-center justify-center whitespace-nowrap ${isLoggedIn ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-zinc-500/90 hover:bg-zinc-600/95'}`}
                          >
                            {isLoggedIn ? 'ADD TO CART (VIP)' : 'ADD TO CART'}
                          </button>
                        </div>
                        <div className="flex justify-between items-start gap-4 px-2 pb-2">
                          <div>
                            <h3 className="font-display text-lg font-medium text-zinc-900 leading-tight">
                              {product.name}
                            </h3>
                            <p className="text-zinc-600 font-medium text-sm mt-1">{product.category}</p>
                          </div>
                          {isLoggedIn ? (
                            <div className="text-right">
                              <p className="font-bold text-emerald-600">${Math.floor(product.price * 0.9)}</p>
                              <p className="text-[10px] text-zinc-400 line-through">${product.price}</p>
                            </div>
                          ) : (
                            <p className="font-bold text-zinc-900">${product.price}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
</main>
      {/* Release Calendar Section */}
      <section id="release-calendar" className="scroll-spy-section py-16 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center mb-12 gap-6">
            <div className="max-w-2xl flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4 shadow-sm">
                {isLoggedIn ? <Sparkles className="w-3.5 h-3.5 text-amber-400" /> : <Bell className="w-3.5 h-3.5 text-blue-400" />}
                {isLoggedIn ? 'VIP Early Access' : 'Upcoming Drops'}
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 tracking-tight uppercase drop-shadow-sm mb-4">
                {isLoggedIn ? 'VAULT RESERVATIONS' : 'RELEASE CALENDAR'}
              </h2>
              <p className="text-zinc-600 font-sans font-medium text-[17px] leading-[21px] -mt-[5px]">
                {isLoggedIn ? 'Your VIP tier grants you priority reservations. Secure your pair before the public drop.' : 'Mark your calendars. The most anticipated drops of the season, carefully curated and authenticated by our experts.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'drop1', brand: 'Nike', price: 215, category: 'Upcoming Drop', name: "JRDN 4 'BRED REIMAGINED'", date: "FEB 17", hype: "HIGH", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" },
              { id: 'drop2', brand: 'Nike', price: 150, category: 'Upcoming Drop', name: "TS OLIVE LOW", date: "MAR 02", hype: "MAX", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800" },
              { id: 'drop3', brand: 'Nike', price: 190, category: 'Upcoming Drop', name: "KOBE 8 'COURT PURPLE'", date: "APR 15", hype: "HIGH", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800" }
            ].map((drop, idx) => (
              <motion.div 
                key={drop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setQuickViewProduct({ id: drop.id, name: drop.name, brand: drop.brand as any, price: drop.price, image: drop.img, category: drop.category })}
                className="relative group bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 p-5 rounded-[2.5rem] transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] bg-zinc-100 rounded-[1.5rem] mb-5 overflow-hidden shadow-inner">
                  <img src={drop.img} alt={drop.name} className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-zinc-500/90 backdrop-blur-md border border-white/25 text-white px-4 py-1.5 rounded-full font-bold tracking-widest text-[10px] uppercase shadow-sm">
                    {drop.date}
                  </div>
                </div>
                <div className="flex flex-col gap-1 px-2 pb-2 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Hype: <span className={drop.hype === 'MAX' ? 'text-red-500 font-extrabold' : 'text-zinc-800 font-extrabold'}>{drop.hype}</span></span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-zinc-900 leading-tight uppercase tracking-tight">{drop.name}</h3>
                  <div className="mt-auto pt-4 border-t border-zinc-200/60 flex items-center justify-between">
                    <span className="text-lg font-display font-bold text-zinc-900">${drop.price}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (notifiedDrops.includes(drop.id)) {
                          setNotifiedDrops(prev => prev.filter(id => id !== drop.id));
                        } else {
                          setEmailPromptDropId(drop.id);
                        }
                      }}
                      className={`px-4 py-2 rounded-full font-bold text-[10px] flex items-center gap-1.5 transition-colors uppercase tracking-widest shadow-sm ${notifiedDrops.includes(drop.id) ? 'bg-zinc-600/90 border border-white/25 text-white hover:bg-zinc-700/90' : 'bg-zinc-500/90 border border-white/25 text-white hover:bg-zinc-600/95'}`}
                    >
                      {notifiedDrops.includes(drop.id) ? <CheckCircle2 className="w-3.5 h-3.5" /> : (isLoggedIn ? <Sparkles className="w-3.5 h-3.5 text-amber-300" /> : <Bell className="w-3.5 h-3.5" />)}
                      {notifiedDrops.includes(drop.id) ? (isLoggedIn ? 'Reserved' : 'Notified') : (isLoggedIn ? 'VIP Reserve' : 'Notify Me')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <button onClick={() => setIsDropsModalOpen(true)} className="flex items-center justify-center gap-2.5 px-8 py-4 bg-zinc-500/90 backdrop-blur-xl border border-white/25 text-white rounded-full font-bold tracking-wider text-sm sm:text-base uppercase transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-zinc-600/95 active:scale-[0.98] w-full md:w-auto md:px-12">
              View All Drops <ArrowRight className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>
      
      <div id="about" className="scroll-spy-section">

      {/* Join the Club / Newsletter / VIP Rewards */}
      <section className="py-16 lg:py-24 relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-zinc-50/80 backdrop-blur-xl border border-zinc-200/60 rounded-[3rem] shadow-sm p-6 sm:p-12 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 text-center lg:text-left">
            
            {isLoggedIn ? (
              <>
                <div className="relative z-10 lg:w-1/2">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-zinc-900 tracking-tight uppercase mb-4 drop-shadow-sm">VIP REFERRAL REWARDS</h2>
                  <p className="text-zinc-600 font-sans text-lg font-medium drop-shadow-sm max-w-md mx-auto lg:mx-0">Give $20, Get $20. Invite your friends to the Vault and earn collector points for every successful referral.</p>
                </div>
                <div className="relative z-10 w-full lg:w-1/2 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0 lg:max-w-none">
                  <div className="flex-1 bg-white border border-zinc-200/80 rounded-full px-8 py-4 flex items-center shadow-inner overflow-hidden">
                    <span className="text-[13px] leading-[20px] font-bold tracking-widest text-zinc-900 truncate">shoemania.com/vip/ilikeyourchoice</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      const btn = e.currentTarget;
                      const originalText = btn.innerHTML;
                      btn.innerHTML = 'COPIED!';
                      btn.classList.add('bg-zinc-800');
                      setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove('bg-zinc-800');
                      }, 2000);
                    }}
                    className="px-8 py-4 bg-zinc-500/90 backdrop-blur-xl border border-white/25 text-white rounded-full font-bold tracking-[0.2em] text-[14px] uppercase transition-all hover:bg-zinc-600/95 active:scale-[0.98] shadow-md whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" /> Copy Link
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="relative z-10 lg:w-1/2">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-zinc-900 tracking-tight uppercase mb-4 drop-shadow-sm">STAY IN THE LOOP</h2>
                  <p className="text-zinc-600 font-sans text-lg font-medium drop-shadow-sm max-w-md mx-auto lg:mx-0">Join our exclusive mailing list to get first access to drops, restocks, and curated editorials.</p>
                </div>
                <div className="relative z-10 w-full lg:w-1/2 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0 lg:max-w-none">
                  <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="flex-1 bg-white border border-zinc-200/80 rounded-full px-8 py-4 outline-none focus:bg-white/90 focus:border-zinc-400 transition-all text-[13px] leading-[20px] font-bold tracking-widest text-zinc-900 placeholder:text-zinc-500 shadow-inner"
                  />
                  <button className="px-8 py-4 bg-zinc-500/90 backdrop-blur-xl border border-white/25 text-white rounded-full font-bold tracking-[0.2em] text-[14px] uppercase transition-all hover:bg-zinc-600/95 active:scale-[0.98] shadow-md whitespace-nowrap flex items-center justify-center">
                    Subscribe
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Verified Customer Reviews */}
      <section id="verified-reviews" className="scroll-spy-section py-16 lg:py-24 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-zinc-900 uppercase tracking-tight text-center mb-3">
            VERIFIED REVIEWS
          </h2>
          <p className="text-zinc-600 font-sans font-medium text-[17px] text-center -mt-[5px]">
            Real feedback from verified collectors and sneaker enthusiasts.
          </p>
        </div>

        {/* Rating Summary Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 bg-zinc-100/90 border border-zinc-200/80 rounded-full px-6 py-2.5 max-w-fit mx-auto">
          <div className="flex items-center gap-1 text-zinc-900">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-zinc-900 text-zinc-900" />
            ))}
          </div>
          <span className="font-sans font-bold text-zinc-900 text-sm tracking-wide uppercase">
            4.9 / 5.0 Rating
          </span>
          <span className="text-zinc-300">•</span>
          <span className="text-zinc-600 font-sans font-medium text-sm">
            2,450+ Verified Orders
          </span>
        </div>

        {/* Reviews Carousel */}
        <ReviewsCarousel />
      </section>

      {/* Community / Instagram Feed */}
      <section className="relative pb-24">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="text-[40px] font-bold text-zinc-900 font-display mb-2 uppercase tracking-wide drop-shadow-sm">@SHOEMANIA ON THE STREETS</h2>
          <p className="text-zinc-600 font-sans font-medium text-[17px] -mt-[10px] -mb-[15px] drop-shadow-sm">Tag us to be featured.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-4">
          {[
            { id: 'look-1', img: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800', user: '@alex_k', likes: '1.4k', location: 'Shibuya • Tokyo, JP', shoeName: "Dunk Low 'Panda'", shoeBrand: 'Nike' as Brand, shoePrice: 110, quote: 'Classic monochrome silhouette styled for high-density street navigation.' },
            { id: 'look-2', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800', user: '@sarah.snkrs', likes: '2.1k', location: 'SoHo • New York, US', shoeName: "Air Jordan 1 'Lost & Found'", shoeBrand: 'Nike' as Brand, shoePrice: 180, quote: 'Vintage cracked leather patina paired with relaxed Japanese raw selvedge.' },
            { id: 'look-3', img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800', user: '@marcus_kicks', likes: '980', location: 'Mitte • Berlin, DE', shoeName: 'New Balance 990v6', shoeBrand: 'New Balance' as Brand, shoePrice: 200, quote: 'Unmatched 990 heritage ENCAP comfort for long urban exploration.' },
            { id: 'look-4', img: 'https://images.unsplash.com/photo-1528701800487-ba01fea498c0?auto=format&fit=crop&q=80&w=800', user: '@elena_fits', likes: '3.2k', location: 'Le Marais • Paris, FR', shoeName: 'Asics Gel-Kayano 14', shoeBrand: 'ASICS' as Brand, shoePrice: 150, quote: 'Metallic tech-runner aesthetics with tailored pleated wool trousers.' }
          ].map((item, i) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedStreetLook(item)}
              className="aspect-square relative group overflow-hidden cursor-pointer rounded-[2rem] border border-zinc-200/60 bg-zinc-50/80 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
            >
              <img src={item.img} onError={(e) => e.currentTarget.src='https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800'} alt={`Community ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 p-2 rounded-[2rem]" />
              <div className="absolute inset-0 bg-zinc-900/30 group-hover:bg-zinc-900/50 backdrop-blur-[2px] transition-all duration-300 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-4 rounded-[2rem] text-center">
                <span className="text-zinc-900 font-display font-bold tracking-widest text-xs px-5 py-2.5 bg-white/95 backdrop-blur-md rounded-full border border-zinc-200 shadow-lg uppercase mb-2">SHOP LOOK</span>
                <span className="text-white text-[11px] font-sans font-bold tracking-wider">{item.user}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / About Section */}
      <footer className="bg-zinc-50/80 backdrop-blur-2xl border-t border-zinc-200/60 text-zinc-900 py-16 lg:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div>
              <div className="mb-6">
                <Logo size="lg" />
              </div>
              <p className="text-zinc-600 font-sans max-w-sm">
                The premier destination for authentic performance and lifestyle footwear. Minimal design, maximum performance.
              </p>
            </div>
            <div>
              <h4 className="font-display text-lg tracking-wider mb-6">SHOP</h4>
              <ul className="space-y-4 font-sans text-zinc-600">
                <li><button onClick={() => { setActiveBrand('All'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-zinc-900 transition-colors">All Shoes</button></li>
                {allBrands.map(brand => (
                  <li key={brand}><button onClick={() => { setActiveBrand(brand as Brand); document.getElementById(`brand-${brand}`)?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-zinc-900 transition-colors">{brand}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg tracking-wider mb-6">SUPPORT</h4>
              <ul className="space-y-4 font-sans text-zinc-600">
                <li><a href="#" className="hover:text-zinc-900 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-zinc-900 transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-zinc-900 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-zinc-900 transition-colors">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg tracking-wider mb-6">NEWSLETTER</h4>
              <p className="text-zinc-600 font-sans mb-4">Subscribe for the latest drops and exclusive offers.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 bg-white border border-zinc-200/80 text-zinc-900 px-5 py-3 font-sans focus:outline-none focus:border-zinc-400 focus:bg-white/90 rounded-full placeholder:text-zinc-500 transition-all text-sm shadow-inner"
                />
                <button className="bg-zinc-500/90 backdrop-blur-xl border border-white/25 text-white px-7 py-3 font-bold tracking-widest uppercase hover:bg-zinc-600/95 active:scale-[0.98] transition-all rounded-full text-xs shadow-md flex items-center justify-center whitespace-nowrap">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 font-sans">
            <p>&copy; {new Date().getFullYear()} ShoeMania. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-md"
              onClick={() => setQuickViewProduct(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-zinc-50/90 backdrop-blur-2xl border border-zinc-200/60 p-6 md:p-10 shadow-2xl rounded-[2.5rem] flex flex-col md:flex-row gap-8 md:gap-12 items-center pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-6 right-6 p-2 bg-zinc-200/50 hover:bg-zinc-200 text-zinc-600 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>
              
              <div className="w-full md:w-1/2 aspect-square bg-zinc-100/50 rounded-[2rem] overflow-hidden shadow-inner relative flex-shrink-0">
                <ProductImage 
                  src={quickViewProduct.image} 
                  brand={quickViewProduct.brand}
                  alt={quickViewProduct.name}
                  hueRotate={quickViewProduct.hueRotate}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                <div className="w-full flex justify-between items-center mb-2">
                  <span className="text-zinc-500 font-bold tracking-widest text-[10px] md:text-xs uppercase">
                    {quickViewProduct.brand}
                  </span>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <Star className="w-3.5 h-3.5 fill-zinc-900 text-zinc-900" />
                    <span className="text-[10px] font-bold text-zinc-900 ml-1.5">4.9</span>
                    <span className="text-[10px] text-zinc-500 ml-1">(42)</span>
                  </div>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-900 leading-tight mb-2">
                  {quickViewProduct.name}
                </h2>
                <p className="text-zinc-600 font-medium text-sm md:text-base mb-6">
                  {quickViewProduct.category}
                </p>
                
                {isLoggedIn ? (
                  <div className="mb-8 flex items-end gap-3">
                    <p className="font-display text-3xl md:text-4xl font-bold text-emerald-600 leading-none">
                      ${Math.floor(quickViewProduct.price * 0.9)}
                    </p>
                    <p className="font-display text-xl font-bold text-zinc-400 line-through leading-none pb-1">
                      ${quickViewProduct.price}
                    </p>
                    <span className="text-[10px] bg-zinc-900 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest mb-1.5 shadow-sm">
                      VIP
                    </span>
                  </div>
                ) : (
                  <p className="font-display text-3xl md:text-4xl font-bold text-zinc-900 mb-8">
                    ${quickViewProduct.price}
                  </p>
                )}
                
                <div className="w-full flex gap-3">
                  {quickViewProduct.category === 'Upcoming Drop' ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (notifiedDrops.includes(quickViewProduct.id)) {
                          setNotifiedDrops(prev => prev.filter(id => id !== quickViewProduct.id));
                        } else {
                          setEmailPromptDropId(quickViewProduct.id);
                        }
                      }}
                      className={`flex-1 py-4 backdrop-blur-xl shadow-md font-bold tracking-wider text-sm uppercase rounded-full transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 ${notifiedDrops.includes(quickViewProduct.id) ? 'bg-zinc-600/90 border border-white/25 text-white hover:bg-zinc-700/90' : 'bg-zinc-500/90 border border-white/25 text-white hover:bg-zinc-600/95'}`}
                    >
                      {notifiedDrops.includes(quickViewProduct.id) ? <CheckCircle2 className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                      {notifiedDrops.includes(quickViewProduct.id) ? 'NOTIFIED' : 'NOTIFY ME'}
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        addToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 py-4 bg-zinc-500/90 backdrop-blur-xl border border-white/25 shadow-md text-white font-bold tracking-wider text-sm uppercase rounded-full transition-all duration-300 hover:bg-zinc-600/95 active:scale-[0.98]"
                    >
                      ADD TO CART
                    </button>
                  )}
                  <button 
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-4 bg-zinc-50/80 backdrop-blur-2xl border border-zinc-200/60 shadow-sm text-zinc-900 rounded-full transition-all duration-300 hover:bg-white flex items-center justify-center group"
                  >
                    <Heart className="w-6 h-6 transition-transform group-hover:scale-110" strokeWidth={2} fill={wishlist.includes(quickViewProduct.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Drops Modal */}
      <AnimatePresence>
        {isDropsModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsDropsModalOpen(false)}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xl z-[90]"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-zinc-50/90 backdrop-blur-2xl border border-zinc-200/60 shadow-xl rounded-[2rem] sm:rounded-[3rem] flex flex-col max-h-[85vh] overflow-hidden z-[100]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6 border-b border-zinc-200/60 bg-zinc-50/95">
                <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-zinc-900 uppercase">ALL UPCOMING DROPS</h2>
                <button 
                  onClick={() => setIsDropsModalOpen(false)}
                  className="p-2 text-zinc-500 hover:text-zinc-900 bg-white/80 backdrop-blur-xl border border-zinc-200/60 rounded-full transition-colors shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto hide-scrollbar px-3 py-4 sm:px-8 sm:py-6">
                <div className="space-y-4 sm:space-y-6">
                  {[
                    { id: 'drop1', name: "JRDN 4 'BRED REIMAGINED'", brand: 'Nike', price: 215, category: "Upcoming Drop", date: "FEB 17", hype: "HIGH", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" },
                    { id: 'drop2', name: "TS OLIVE LOW", brand: 'Nike', price: 150, category: "Upcoming Drop", date: "MAR 02", hype: "MAX", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800" },
                    { id: 'drop3', name: "KOBE 8 'COURT PURPLE'", brand: 'Nike', price: 190, category: "Upcoming Drop", date: "APR 15", hype: "HIGH", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800" },
                    { id: 'drop4', name: "NIKE SB DUNK 'FUTURA'", brand: 'Nike', price: 135, category: "Upcoming Drop", date: "MAY 22", hype: "MAX", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800" },
                    { id: 'drop5', name: "YEEZY 350 'TURTLE DOVE'", brand: 'Adidas', price: 230, category: "Upcoming Drop", date: "JUN 10", hype: "HIGH", img: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=800" },
                  ].map((drop, idx) => (
                    <div key={idx} className="flex items-center gap-3 sm:gap-6 bg-white/70 backdrop-blur-xl border border-zinc-200/60 p-3 sm:p-4 rounded-2xl sm:rounded-[1.5rem] shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-300 group">
                      <div 
                        onClick={() => setQuickViewProduct({ id: drop.id, name: drop.name, brand: drop.brand as any, price: drop.price, image: drop.img, category: drop.category })}
                        className="w-18 h-18 sm:w-24 sm:h-24 w-[72px] h-[72px] sm:w-24 sm:h-24 bg-zinc-100/50 rounded-xl shrink-0 overflow-hidden shadow-inner p-1 border border-zinc-200/60 relative cursor-pointer"
                      >
                        <img src={drop.img} alt={drop.name} className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <div className="flex items-center justify-between mb-1 gap-2">
                          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase truncate">Hype: <span className={drop.hype === 'MAX' ? 'text-red-500 font-extrabold' : 'text-zinc-800 font-extrabold'}>{drop.hype}</span></span>
                          <span className="text-[10px] font-bold tracking-widest text-zinc-800 uppercase bg-zinc-200/50 px-2 py-0.5 sm:py-1 rounded-full shrink-0">{drop.date}</span>
                        </div>
                        <h3 
                          onClick={() => setQuickViewProduct({ id: drop.id, name: drop.name, brand: drop.brand as any, price: drop.price, image: drop.img, category: drop.category })}
                          className="font-display font-bold text-sm sm:text-lg text-zinc-900 uppercase truncate mt-0.5 cursor-pointer hover:text-zinc-600 transition-colors"
                        >
                          {drop.name}
                        </h3>
                        <div className="mt-2 flex">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (notifiedDrops.includes(drop.id)) {
                                setNotifiedDrops(prev => prev.filter(id => id !== drop.id));
                              } else {
                                setEmailPromptDropId(drop.id);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-full font-bold text-[10px] flex items-center gap-1.5 transition-colors uppercase tracking-widest shadow-sm ${notifiedDrops.includes(drop.id) ? 'bg-zinc-600/90 border border-white/25 text-white hover:bg-zinc-700/90' : 'bg-zinc-500/90 border border-white/25 text-white hover:bg-zinc-600/95'}`}
                          >
                            {notifiedDrops.includes(drop.id) ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                            {notifiedDrops.includes(drop.id) ? 'Notified' : 'Notify Me'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xl z-[90]"
            />
            
            {/* Modal */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-zinc-50/80 backdrop-blur-2xl border border-zinc-200/60 shadow-sm rounded-[2rem] sm:rounded-[3rem] flex flex-col max-h-[85vh] overflow-hidden z-[100]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 sm:px-8 py-5 sm:py-7 border-b border-zinc-200/60 bg-zinc-50/90">
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-wider sm:tracking-widest text-zinc-900 uppercase">YOUR CART ({cartCount})</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-zinc-500 hover:text-zinc-900 bg-white/80 backdrop-blur-xl border border-zinc-200/60 rounded-full transition-colors shadow-sm sm:-mr-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto hide-scrollbar px-4 sm:px-8 py-4 sm:py-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 py-12">
                    <div className="w-24 h-24 bg-zinc-50 border border-zinc-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <ShoppingBag className="w-10 h-10 opacity-40" />
                    </div>
                    <p className="font-display text-lg tracking-widest uppercase text-zinc-900">Your cart is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 px-6 py-3 bg-zinc-500/90 backdrop-blur-xl border border-white/25 shadow-md text-white rounded-full font-sans font-bold hover:bg-zinc-600/95 transition-colors uppercase tracking-wider text-sm"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="w-full flex items-center gap-3 sm:gap-6 bg-white/60 backdrop-blur-xl border border-zinc-200/60 p-3 sm:p-4 rounded-2xl sm:rounded-[1.5rem] shadow-sm hover:shadow-md hover:bg-white/90 transition-all duration-300">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-100/50 rounded-xl shrink-0 overflow-hidden shadow-inner p-1 border border-zinc-200/60 flex items-center justify-center">
                          <ProductImage 
                            src={item.product.image} 
                            brand={item.product.brand}
                            alt={item.product.name}
                            hueRotate={item.product.hueRotate}
                            className="w-full h-full rounded-lg object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                          <div className="flex items-start justify-between gap-2 mb-0.5 sm:mb-1">
                            <h3 className="font-display text-sm sm:text-lg text-zinc-900 font-medium truncate sm:whitespace-normal leading-snug">{item.product.name}</h3>
                            {isLoggedIn ? (
                              <div className="text-right shrink-0">
                                <p className="font-bold text-sm sm:text-base text-emerald-600">${Math.floor(item.product.price * 0.9)}</p>
                                <p className="text-[10px] text-zinc-400 line-through">${item.product.price}</p>
                              </div>
                            ) : (
                              <p className="font-bold text-sm sm:text-base text-zinc-900 shrink-0">${item.product.price}</p>
                            )}
                          </div>
                          <p className="text-zinc-600 font-medium text-xs sm:text-sm mb-1.5 sm:mb-auto">{item.product.brand}</p>
                          <div className="flex items-center justify-between gap-2 mt-auto">
                            <div className="flex items-center bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden shrink-0">
                              <button 
                                className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-white/50 transition-colors text-xs sm:text-sm font-bold"
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    setCartItems(prev => prev.map(i => 
                                      i.product.id === item.product.id ? { ...i, quantity: i.quantity - 1 } : i
                                    ));
                                  } else {
                                    removeFromCart(item.product.id);
                                  }
                                }}
                              >
                                -
                              </button>
                              <span className="px-2 sm:px-3 py-1 sm:py-1.5 font-bold text-xs sm:text-sm text-zinc-900 bg-white/20 min-w-[1.5rem] sm:min-w-[2rem] text-center">{item.quantity}</span>
                              <button 
                                className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-white/50 transition-colors text-xs sm:text-sm font-bold"
                                onClick={() => {
                                  setCartItems(prev => prev.map(i => 
                                    i.product.id === item.product.id ? { ...i, quantity: i.quantity + 1 } : i
                                  ));
                                }}
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-xs sm:text-sm text-zinc-500 hover:text-red-500 font-bold transition-colors py-0.5 px-1 shrink-0"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-zinc-200/60 p-4 sm:p-6 bg-zinc-50/80 backdrop-blur-md shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
                  {isLoggedIn ? (
                    <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                      <div className="flex justify-between items-end">
                        <span className="text-zinc-500 font-sans uppercase text-xs font-bold tracking-wider">Subtotal</span>
                        <span className="font-display text-sm sm:text-lg font-bold text-zinc-500">${cartSubtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-emerald-600 font-sans uppercase text-xs font-bold tracking-wider flex items-center gap-1.5"><Sparkles className="w-3 h-3"/> VIP Discount (10%)</span>
                        <span className="font-display text-sm sm:text-lg font-bold text-emerald-600">-${cartSavings.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-end pt-2 border-t border-zinc-200/50">
                        <span className="text-zinc-900 font-sans uppercase text-xs sm:text-sm font-bold tracking-wider">Total</span>
                        <span className="font-display text-2xl sm:text-3xl font-bold text-zinc-900">${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-end mb-4 sm:mb-6">
                      <span className="text-zinc-600 font-sans uppercase text-xs sm:text-sm font-bold tracking-wider">Subtotal</span>
                      <span className="font-display text-2xl sm:text-3xl font-bold text-zinc-900">${cartTotal.toFixed(2)}</span>
                    </div>
                  )}
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`w-full backdrop-blur-xl border border-white/25 shadow-md text-white py-3.5 sm:py-4 font-display text-base sm:text-lg uppercase tracking-wider transition-colors rounded-full ${isLoggedIn ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-zinc-500/90 hover:bg-zinc-600/95'}`}
                  >
                    {isLoggedIn ? 'Secure VIP Checkout' : 'Checkout'}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Wishlist Modal */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xl z-[90]"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-zinc-50/90 backdrop-blur-2xl border border-zinc-200/60 shadow-xl rounded-[2rem] sm:rounded-[3rem] flex flex-col max-h-[85vh] overflow-hidden z-[100]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6 border-b border-zinc-200/60 bg-zinc-50/95">
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-widest text-zinc-900 uppercase">Wishlist</h2>
                <button 
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 text-zinc-500 hover:text-zinc-900 bg-white/80 backdrop-blur-xl border border-zinc-200/60 rounded-full transition-colors shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto hide-scrollbar px-3 py-4 sm:px-8 sm:py-6">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500 py-12">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-50 border border-zinc-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <Heart className="w-8 h-8 sm:w-10 sm:h-10 opacity-40" />
                    </div>
                    <p className="font-display text-base sm:text-lg tracking-widest uppercase text-zinc-900">Your wishlist is empty</p>
                    <button 
                      onClick={() => setIsWishlistOpen(false)}
                      className="mt-6 px-6 py-3 bg-zinc-500/90 backdrop-blur-xl border border-white/25 shadow-md text-white rounded-full font-sans font-bold hover:bg-zinc-600/95 transition-colors uppercase tracking-wider text-xs sm:text-sm"
                    >
                      Explore Products
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {wishlist.map((id) => {
                      const product = products.find(p => p.id === id);
                      if (!product) return null;
                      return (
                        <div key={product.id} className="flex items-center gap-3 sm:gap-5 bg-white/80 backdrop-blur-xl border border-zinc-200/70 p-3 sm:p-4 rounded-2xl sm:rounded-[1.5rem] shadow-sm hover:shadow-md hover:bg-white/95 transition-all duration-300 overflow-hidden">
                          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-zinc-100/60 rounded-xl sm:rounded-2xl shrink-0 overflow-hidden shadow-inner p-1 border border-zinc-200/60 flex items-center justify-center">
                            <ProductImage 
                              src={product.image} 
                              brand={product.brand}
                              alt={product.name}
                              hueRotate={product.hueRotate}
                              className="w-full h-full rounded-lg mix-blend-multiply object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">{product.brand}</span>
                            <h3 className="font-display font-bold text-zinc-900 text-sm sm:text-lg leading-tight mb-1 truncate sm:whitespace-normal">{product.name}</h3>
                            <span className="font-sans font-bold text-zinc-900 text-sm sm:text-base">${product.price.toFixed(2)}</span>
                          </div>
                          <div className="flex flex-col gap-1.5 sm:gap-2 justify-center shrink-0">
                            <button 
                              onClick={() => {
                                addToCart(product);
                                setWishlist(prev => prev.filter(id => id !== product.id));
                                setIsWishlistOpen(false);
                              }}
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-all flex items-center justify-center shadow-sm active:scale-95 shrink-0"
                              title="Move to Cart"
                            >
                              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                            <button 
                              onClick={() => toggleWishlist(product.id)}
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-zinc-200/80 text-red-500 hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center shadow-sm active:scale-95 shrink-0"
                              title="Remove from Wishlist"
                            >
                              <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Vault Access Modal */}
      <AnimatePresence>
        {isVaultAccessOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsVaultAccessOpen(false)}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xl z-[90]"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-zinc-50/90 backdrop-blur-2xl border border-zinc-200/60 shadow-xl rounded-[2rem] sm:rounded-[3rem] flex flex-col overflow-hidden z-[100] text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-10 flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center mb-5 border border-zinc-200/60 shadow-sm">
                  <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-zinc-900" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-widest text-zinc-900 uppercase mb-2">Request Access</h2>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
                  The Vault contains extremely rare, deadstock archival pieces. Access is granted to verified collectors only.
                </p>
                
                <div className="w-full space-y-3 sm:space-y-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full bg-white/80 border border-zinc-200/60 rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors font-sans text-sm shadow-sm"
                  />
                  <button 
                    onClick={() => {
                      setIsVaultAccessOpen(false);
                    }}
                    className="w-full bg-zinc-900 text-white rounded-full px-5 py-3.5 sm:py-4 font-bold tracking-widest uppercase text-[11px] hover:bg-zinc-800 transition-colors shadow-md"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setIsVaultAccessOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-zinc-500 hover:text-zinc-900 transition-colors bg-white/80 rounded-full border border-zinc-200/60 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Email Notify Prompt Modal */}
      <AnimatePresence>
        {emailPromptDropId && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-md"
              onClick={() => setEmailPromptDropId(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-zinc-50/90 backdrop-blur-2xl border border-zinc-200/60 p-8 shadow-2xl rounded-[2.5rem] flex flex-col items-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setEmailPromptDropId(null)}
                className="absolute top-6 right-6 p-2 bg-zinc-200/50 hover:bg-zinc-200 text-zinc-600 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="w-16 h-16 bg-zinc-500/90 border border-white/25 text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <Bell className="w-8 h-8" />
              </div>
              
              <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900 uppercase text-center mb-2">NOTIFY ME</h2>
              <p className="text-zinc-600 font-sans text-sm text-center mb-8 px-4 leading-relaxed">
                Enter your email to receive an alert the moment this grail drops. 
              </p>
              
              <form 
                className="w-full flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (notifyEmail.trim()) {
                    setNotifiedDrops(prev => [...prev, emailPromptDropId]);
                    setEmailPromptDropId(null);
                    setNotifyEmail('');
                  }
                }}
              >
                <input 
                  type="email" 
                  required
                  placeholder="ENTER YOUR EMAIL"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-white/80 border border-zinc-200/80 rounded-full font-sans text-sm outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all shadow-sm placeholder:text-zinc-400 placeholder:tracking-widest"
                />
                <button 
                  type="submit"
                  className="w-full py-4 bg-zinc-500/90 backdrop-blur-xl border border-white/25 text-white font-bold tracking-wider text-sm uppercase rounded-full transition-all duration-300 hover:bg-zinc-600/95 active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> CONFIRM
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[110] flex flex-col justify-end sm:justify-center items-center p-0 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-zinc-900/50 backdrop-blur-xl z-[90]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-lg bg-zinc-50/95 backdrop-blur-2xl border-t sm:border border-zinc-200/80 shadow-2xl rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 flex flex-col max-h-[85vh] overflow-y-auto hide-scrollbar z-[100]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-200/60">
                <div className="flex items-center gap-2">
                  <div className="bg-black text-white flex items-center justify-center w-8 h-8 rounded-full">
                    <LogoIcon className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-zinc-900 text-xl tracking-wider uppercase">SHOEMANIA</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-zinc-900 bg-white/80 rounded-full border border-zinc-200/60 shadow-sm"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Actions Bar */}
              <div className="grid grid-cols-3 gap-3 my-6">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const dropsEl = document.getElementById('release-calendar') || document.getElementById('products-top');
                    dropsEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex flex-col items-center justify-center p-3 bg-white/80 border border-zinc-200/60 rounded-2xl hover:bg-white transition-colors"
                >
                  <Flame className="w-5 h-5 text-zinc-800 mb-1" />
                  <span className="text-[10px] font-bold tracking-wider text-zinc-700 uppercase">Drops</span>
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="relative flex flex-col items-center justify-center p-3 bg-white/80 border border-zinc-200/60 rounded-2xl hover:bg-white transition-colors"
                >
                  <Heart className="w-5 h-5 text-zinc-800 mb-1" />
                  <span className="text-[10px] font-bold tracking-wider text-zinc-700 uppercase">Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="relative flex flex-col items-center justify-center p-3 bg-white/80 border border-zinc-200/60 rounded-2xl hover:bg-white transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 text-zinc-800 mb-1" />
                  <span className="text-[10px] font-bold tracking-wider text-zinc-700 uppercase">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-zinc-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Brand Filter List */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 px-1">Filter By Brand</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleNavBrandClick('All')}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border ${
                      activeBrand === 'All' 
                        ? 'bg-zinc-500/90 text-white border-white/25 shadow-sm' 
                        : 'bg-white border-zinc-200/80 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    ALL BRANDS
                  </button>
                  {allBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleNavBrandClick(brand, `brand-${brand}`)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border ${
                        activeBrand === brand 
                          ? 'bg-zinc-500/90 text-white border-white/25 shadow-sm' 
                          : 'bg-white border-zinc-200/80 text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Section Links */}
              <div className="border-t border-zinc-200/60 pt-6 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 px-1">Explore Sections</h3>
                {[
                  { label: 'Featured Brands', id: 'featured-brands' },
                  { label: 'The Vault (Grails)', id: 'the-vault' },
                  { label: 'Trending Now', id: 'trending-now' },
                  { label: 'Manifesto', id: 'manifesto' },
                  { label: 'Release Calendar', id: 'release-calendar' },
                  { label: 'Verified Reviews', id: 'verified-reviews' },
                ].map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left px-4 py-3 rounded-2xl bg-white/60 hover:bg-white border border-zinc-200/60 font-display font-bold text-zinc-900 text-sm tracking-wider uppercase transition-all flex items-center justify-between"
                  >
                    {sec.label}
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Floating Street Look Modal */}
        {selectedStreetLook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStreetLook(null)}
              className="fixed inset-0 bg-zinc-900/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-[3rem] border border-zinc-200/80 shadow-2xl overflow-hidden z-10 p-6 sm:p-8 md:p-10 my-auto"
            >
              <button 
                onClick={() => setSelectedStreetLook(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center transition-colors border border-zinc-200 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-zinc-200/80 shadow-md group">
                  <img 
                    src={selectedStreetLook.img} 
                    alt={selectedStreetLook.user} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-zinc-500/90 backdrop-blur-md border border-white/25 text-zinc-100 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                    <Heart className="w-3.5 h-3.5 fill-zinc-300 text-zinc-300" />
                    {selectedStreetLook.likes} Likes
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                      <span className="text-zinc-500 font-sans font-bold text-xs uppercase tracking-widest">
                        {selectedStreetLook.location}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 tracking-tight mb-2">
                      {selectedStreetLook.user}
                    </h3>

                    <p className="text-zinc-600 font-sans text-sm md:text-base leading-relaxed font-normal not-italic mb-6 border-l-2 border-zinc-900 pl-4 py-1">
                      "{selectedStreetLook.quote}"
                    </p>

                    {/* Tagged Shoe Card */}
                    <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 flex items-center justify-between mb-8 shadow-inner">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block mb-1">
                          TAGGED SILHOUETTE
                        </span>
                        <h4 className="font-display font-bold text-zinc-900 text-base">
                          {selectedStreetLook.shoeName}
                        </h4>
                        <p className="text-xs font-bold text-zinc-500 uppercase">
                          {selectedStreetLook.shoeBrand}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-display font-extrabold text-zinc-900 text-xl block">
                          ${selectedStreetLook.shoePrice}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-700 uppercase bg-zinc-200/80 px-2 py-0.5 rounded-md border border-zinc-300">
                          In Stock
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-6 border-t border-zinc-100 items-center w-full">
                    <button 
                      onClick={() => {
                        const matchedProduct = products.find(p => p.name.toLowerCase().includes(selectedStreetLook.shoeName.toLowerCase()) || p.brand === selectedStreetLook.shoeBrand);
                        if (matchedProduct) {
                          addToCart(matchedProduct);
                        } else {
                          addToCart(products[0]);
                        }
                        setSelectedStreetLook(null);
                      }}
                      className="w-full sm:flex-1 py-3.5 px-4 bg-zinc-500/90 hover:bg-zinc-600/95 text-white rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 border border-white/25 shrink-0"
                    >
                      <ShoppingBag className="w-4 h-4 text-white shrink-0" />
                      <span className="whitespace-nowrap">Add Tagged Pair</span>
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedStreetLook(null);
                        document.getElementById('products-top')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto py-3.5 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all border border-zinc-200/80 whitespace-nowrap active:scale-95 shrink-0"
                    >
                      Explore Catalog
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-500/40 backdrop-blur-sm overflow-y-auto">
            {loginStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-[24px] shadow-2xl border border-zinc-200/80 max-w-[400px] w-full p-8 sm:p-10 relative flex flex-col my-auto"
              >
                <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-6 right-6 p-1.5 text-zinc-400 hover:text-zinc-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex flex-col items-center mb-8">
                  <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md">
                    <LogoIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-zinc-900 mb-2">Get started free</h3>
                  <p className="text-sm text-zinc-500 font-sans text-center">No credit card required. Start exploring in minutes.</p>
                </div>
                
                <button onClick={() => setLoginStep(2)} className="w-full py-3 px-4 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-xl font-sans text-sm font-semibold text-zinc-700 transition-all flex items-center justify-center gap-3 shadow-sm mb-6">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Continue with Google
                </button>
                
                <div className="relative flex items-center mb-6">
                  <div className="flex-grow border-t border-zinc-200"></div>
                  <span className="flex-shrink mx-4 text-zinc-400 text-xs font-medium uppercase tracking-widest">or</span>
                  <div className="flex-grow border-t border-zinc-200"></div>
                </div>
                
                <input type="email" placeholder="Work Email" className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl font-sans text-sm mb-4 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all placeholder:text-zinc-400 text-zinc-900" />
                
                <button onClick={() => setLoginStep(2)} className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-sans font-semibold text-sm transition-all shadow-md mb-6 flex items-center justify-center">
                  Continue with Email
                </button>
                
                <p className="text-center text-sm text-zinc-500">
                  Already have an account? <button onClick={() => setLoginStep(2)} className="text-zinc-900 font-semibold hover:underline">Log in</button>
                </p>
              </motion.div>
            )}

            {loginStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-[24px] shadow-2xl border border-zinc-200/80 max-w-[400px] w-full p-8 sm:p-10 relative flex flex-col items-center text-center my-auto"
              >
                <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-6 right-6 p-1.5 text-zinc-400 hover:text-zinc-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
                
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md">
                  <LogoIcon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="font-display font-extrabold text-2xl text-zinc-900 mb-4">Wanna Try?</h3>
                <p className="text-sm text-zinc-500 font-sans leading-relaxed mb-8 px-2">
                  To Experience SyedHR's Professionalism in Designing and Developing Websites, Click Log in button below
                </p>
                
                <button onClick={() => setLoginStep(3)} className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-sans font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2">
                  Log in <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {loginStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-[850px] flex flex-col md:flex-row gap-4 md:gap-6 items-stretch justify-center relative my-auto py-8"
              >
                {/* Left Card: Welcome Back */}
                <div className="bg-white rounded-[24px] shadow-2xl border border-zinc-200/80 w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md">
                      <LogoIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-zinc-900 mb-2">Welcome back</h3>
                    <p className="text-sm text-zinc-500 font-sans text-center">Log in to manage your collection.</p>
                  </div>

                  <button
                    onClick={() => setLoginError('Incorrect email or password.')}
                    className="w-full py-3 px-4 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-xl font-sans text-sm font-semibold text-zinc-700 transition-all flex items-center justify-center gap-3 shadow-sm mb-6"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    Continue with Google
                  </button>

                  <div className="relative flex items-center mb-6">
                    <div className="flex-grow border-t border-zinc-200"></div>
                    <span className="flex-shrink mx-4 text-zinc-400 text-xs font-medium uppercase tracking-widest">or</span>
                    <div className="flex-grow border-t border-zinc-200"></div>
                  </div>

                  {loginError && (
                    <div className="mb-4 p-3 bg-red-50/50 border border-red-200 rounded-[12px] text-red-600 text-[13px] font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" /> 
                      {loginError}
                    </div>
                  )}

                  <div className="space-y-4 mb-6">
                    <input
                      type="text"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Work Email"
                      className={`w-full px-4 py-3.5 bg-white border ${loginError ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20' : 'border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400/20'} rounded-[12px] font-sans text-sm focus:outline-none focus:ring-4 transition-all placeholder:text-zinc-400 text-zinc-900`}
                    />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Password"
                      className={`w-full px-4 py-3.5 bg-white border ${loginError ? 'border-red-300 focus:border-red-400 focus:ring-red-400/20' : 'border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400/20'} rounded-[12px] font-sans text-sm focus:outline-none focus:ring-4 transition-all placeholder:text-zinc-400 text-zinc-900`}
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (!loginEmail.trim() || !loginPassword.trim()) {
                        setLoginError('Enter email and password');
                        return;
                      }
                      if (loginEmail.trim() === 'ilikeyourchoice@clients.syedhr' && loginPassword === 'createdbysyedhr') {
                        setIsLoggedIn(true);
                        setIsLoginModalOpen(false);
                        setLoginError('');
                      } else {
                        setLoginError('Incorrect email or password.');
                      }
                    }}
                    className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-sans font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Log in
                  </button>
                </div>

                {/* Right Card: Wanna Try? */}
                <div className="bg-white rounded-[24px] shadow-2xl border border-zinc-200/80 w-full md:w-1/2 p-8 sm:p-10 flex flex-col relative">
                  <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-6 right-6 p-1.5 text-zinc-400 hover:text-zinc-600 transition-colors">
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex-1">
                    <div className="text-center mb-8 mt-2">
                      <h4 className="font-display font-extrabold text-2xl text-zinc-900 mb-3">Wanna Try?</h4>
                      <p className="text-sm text-zinc-500 font-sans leading-relaxed">
                        By using the Credentials below, you can experience SyedHR's Pure Professionalism in Designing and Developing Websites
                      </p>
                    </div>

                    <div className="border border-zinc-200 rounded-[16px] mb-8 overflow-hidden bg-white shadow-sm">
                      <div className="p-4 border-b border-zinc-200 hover:bg-zinc-50/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">Work Email</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText('ilikeyourchoice@clients.syedhr');
                              setCopiedField('email');
                              setTimeout(() => setCopiedField(null), 2000);
                            }}
                            className="text-zinc-500 hover:text-zinc-900 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                          >
                            {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            {copiedField === 'email' ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        <div className="text-[14px] font-medium text-zinc-900 tracking-tight">ilikeyourchoice@clients.syedhr</div>
                      </div>
                      <div className="p-4 hover:bg-zinc-50/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">Password</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText('createdbysyedhr');
                              setCopiedField('password');
                              setTimeout(() => setCopiedField(null), 2000);
                            }}
                            className="text-zinc-500 hover:text-zinc-900 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                          >
                            {copiedField === 'password' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            {copiedField === 'password' ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        <div className="text-[14px] font-medium text-zinc-900 tracking-tight">createdbysyedhr</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <button
                      onClick={() => {
                        setLoginEmail('ilikeyourchoice@clients.syedhr');
                        setLoginPassword('createdbysyedhr');
                        setIsLoggedIn(true);
                        setIsLoginModalOpen(false);
                        setLoginError('');
                      }}
                      className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-sans font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      Auto-Fill & Log In <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setLoginEmail('ilikeyourchoice@clients.syedhr');
                        setLoginPassword('createdbysyedhr');
                        setLoginError('');
                      }}
                      className="w-full py-3.5 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 rounded-xl font-sans font-bold text-sm transition-all"
                    >
                      Fill Form Only
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  return isLoggedIn ? (
    <AuthenticatedPage content={layout} />
  ) : (
    <LandingPage content={layout} />
  );
}

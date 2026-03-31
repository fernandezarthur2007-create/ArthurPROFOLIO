import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Framer motion scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'Orbit',       path: '/'        },
    { name: 'Identity',    path: '/about'   },
    { name: 'Projects',    path: '/projects'},
    { name: 'Neural Link', path: '/chat'    },
    { name: 'Contact',     path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-12 py-6 transition-colors duration-500 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-lg shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="group flex flex-shrink-0 items-center gap-2 text-white font-black text-sm tracking-tighter uppercase select-none w-auto"
        >
          <motion.span 
            className="w-6 h-6 rounded-full border border-cyan-400 flex items-center justify-center transition-colors duration-300 group-hover:bg-cyan-400"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
          >
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full group-hover:bg-black transition-colors duration-300" />
          </motion.span>
          AI<span className="text-cyan-400 mx-0.5">.</span>Portfolio
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-8 items-center flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative group text-[10px] uppercase tracking-[0.3em] py-2"
              >
                <motion.span
                  className={isActive ? 'text-cyan-400 font-bold' : 'text-white/40 group-hover:text-white/80 transition-colors'}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ display: "inline-block" }}
                >
                  {link.name}
                </motion.span>
                {isActive && (
                  <motion.span 
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 w-full h-px bg-cyan-400"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Badge */}
        <motion.div 
          className="hidden md:flex flex-shrink-0 items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-[9px] font-mono tracking-widest uppercase text-white/30"
          whileHover={{ scale: 1.05, borderColor: "rgba(34,211,238,0.4)" }}
        >
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          Available
        </motion.div>
      </motion.nav>
    </>
  );
}
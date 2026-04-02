import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Animated hero text using Framer Motion ── */
function SplitText({ text, className }) {
  return (
    <motion.span 
      className={className} 
      aria-label={text}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05 } }
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 50, rotateX: -90, scale: 0.8 },
            visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Typewriter subtitle ── */
function Typewriter({ lines }) {
  const [displayed, setDisplayed] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), 60);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), 35);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setLineIdx(i => (i + 1) % lines.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, lineIdx, lines]);

  return (
    <span className="font-mono text-[10px] tracking-[0.8em] uppercase text-white/40">
      {displayed}
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="border-r-2 border-cyan-400 ml-0.5 inline-block"
      >
        &nbsp;
      </motion.span>
    </span>
  );
}

/* ── Magnetic CTA button using Framer Motion ── */
function MagneticButton({ to, children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };
  
  const reset = () => setPosition({ x: 0, y: 0 });
  const { x, y } = position;

  const handleClick = (e) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect absolute bg-white/30 rounded-full w-5 h-5 animate-ping pointer-events-none';
    ripple.style.left = `${e.clientX - rect.left - 10}px`;
    ripple.style.top = `${e.clientY - rect.top - 10}px`;
    btn.appendChild(ripple);
    setTimeout(() => { if (ripple.parentNode) ripple.remove(); }, 700);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={handleClick}
      className="inline-block relative"
    >
      <Link to={to} className="btn-primary" style={{ display: 'inline-block' }}>
        {children}
      </Link>
    </motion.div>
  );
}

/* ── Scroll indicator ── */
function ScrollIndicator() {
  return (
    <motion.div 
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 10, 0] }}
      transition={{ 
        opacity: { delay: 2, duration: 1 }, 
        y: { repeat: Infinity, duration: 2, ease: "easeInOut" } 
      }}
    >
      <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
      <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-white/20">scroll</span>
    </motion.div>
  );
}

/* ── Stats row ── */
function StatItem({ value, label }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const target = parseInt(value);
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            start = Math.min(start + step, target);
            setCount(start);
            if (start >= target) clearInterval(timer);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <motion.div 
      ref={ref} 
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="stat-number">{count}+</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-white/30 mt-1">{label}</div>
    </motion.div>
  );
}

/* ── Main Component ── */
export default function Home() {
  const typeLines = [
    'Digital Architect',
    'AI Integrator',
    'Experience Builder',
    'Full-Stack Engineer',
  ];

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div 
      className="relative bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* ── SECTION 1: HERO ── */}
      <motion.section 
        className="h-screen flex flex-col items-center justify-center gap-6 text-center px-6 relative overflow-hidden"
        style={{ y, opacity }}
      >
        <div
          className="text-[clamp(4rem,14vw,13rem)] font-black tracking-tighter leading-none mix-blend-difference glitch"
          data-text="ARTHUR"
        >
          <SplitText text="ARTHUR" />
          <motion.span 
            className="text-cyan-400 inline-block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5, type: "spring" }}
          >
            .
          </motion.span>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Typewriter lines={typeLines} />
        </motion.div>

        <div className="absolute bottom-16 flex flex-col items-center gap-4">
          <ScrollIndicator />
        </div>
      </motion.section>

      {/* ── SECTION 2: HOOK ── */}
      <section className="min-h-screen flex items-center justify-between px-10 md:px-20 py-20 gap-10">
        <motion.div 
          className="max-w-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[10px] font-mono tracking-[0.5em] text-cyan-400/60 uppercase mb-4">
            // 01 — Manifesto
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
            Beyond the<br />
            <span className="text-white/20 italic">Interface.</span>
          </h2>
          <p className="text-slate-400 leading-relaxed font-light text-lg mb-8">
            I build environments where code meets consciousness. Every project is a
            unique shard of the digital universe — crafted with precision,
            driven by creativity.
          </p>
          <Link
            to="/about"
            className="text-[10px] font-mono tracking-[0.4em] uppercase text-cyan-400/70 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-4 group"
          >
            <span className="w-8 h-px bg-cyan-400/40 group-hover:w-16 transition-all duration-500" />
            Learn More
          </Link>
        </motion.div>

        <motion.div 
          className="hidden md:flex flex-col items-end gap-6"
          initial={{ opacity: 0, x: 50, rotate: 10 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "circOut" }}
        >
          <div className="text-[10rem] font-black text-white/[0.03] italic select-none">01</div>
        </motion.div>
      </section>

      {/* ── SECTION 3: STATS ── */}
      <section className="py-20 px-10 md:px-20 border-y border-white/5 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] bg-cyan-500/5 blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
          <StatItem value="30" label="Projects Shipped" />
          <StatItem value="5" label="Years Experience" />
          <StatItem value="12" label="Tech Stack" />
          <StatItem value="100" label="Commits / Month" />
        </div>
      </section>

      {/* ── SECTION 4: CALL TO ACTION ── */}
      <motion.section 
        className="h-[70vh] flex flex-col items-center justify-center gap-8 border-t border-white/5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-[10px] font-mono tracking-[0.5em] uppercase text-white/20">Ready to initiate?</p>
        <h3 className="text-3xl md:text-5xl font-black text-center tracking-tight">
          Let's build something<br />
          <span className="text-cyan-400">extraordinary.</span>
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <MagneticButton to="/chat">Connect to Neural Link</MagneticButton>
          <Link
            to="/projects"
            className="text-[10px] font-mono tracking-widest uppercase text-white/40 hover:text-white/80 transition-colors duration-300 flex items-center gap-3 px-8 py-5"
          >
            View Projects
            <motion.span 
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-cyan-400"
            >→</motion.span>
          </Link>
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="p-10 border-t border-white/5 bg-black/20 backdrop-blur-md">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            SYSTEM STATUS: OPTIMAL
          </div>
          <div className="text-[10px] opacity-20 font-mono">© 2026 // ARTHUR PORTFOLIO // v4.2.0</div>
        </div>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
          {[
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
            { label: 'Twitter', href: 'https://twitter.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group hover:text-cyan-400 transition-colors duration-300"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
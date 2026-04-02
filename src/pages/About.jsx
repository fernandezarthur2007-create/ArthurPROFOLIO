import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: 95, color: '#61dafb' },
  { name: 'Three.js', level: 80, color: '#22d3ee' },
  { name: 'Node.js', level: 90, color: '#68a063' },
  { name: 'Gemini AI', level: 85, color: '#7c3aed' },
  { name: 'Tailwind', level: 92, color: '#38bdf8' },
  { name: 'MongoDB', level: 78, color: '#4db33d' },
  { name: 'TypeScript', level: 88, color: '#3178c6' },
  { name: 'GSAP', level: 75, color: '#8ec73b' },
];

const timeline = [
  { year: '2024–Now', title: 'Senior Full-Stack Engineer', org: 'Freelance / Remote', desc: 'Building AI-powered web experiences for global clients.' },
  { year: '2022–24', title: 'Frontend Engineer', org: 'TechVenture Co.', desc: 'Led React component library and 3D visualization pipeline.' },
  { year: '2020–22', title: 'Junior Developer', org: 'StartupHub', desc: 'Shipped 12+ web apps with React, Node.js, and REST APIs.' },
  { year: '2019', title: 'CS Degree', org: 'University of London', desc: 'BSc Computer Science, First Class Honours.' },
];

/* ── Reveal on scroll wrapper using Framer Motion ─── */
function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Skill bar with Framer Motion ─── */
function SkillBar({ name, level, color }) {
  return (
    <div className="group">
      <div className="flex justify-between mb-1.5">
        <span className="text-[11px] font-mono tracking-widest uppercase text-white/60 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="text-[11px] font-mono text-white/30">{level}%</span>
      </div>
      <div className="h-px bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: '0%' }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-10px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <motion.section 
      className="min-h-screen pt-32 pb-20 px-6 md:px-16 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">

        {/* ── HEADER ── */}
        <Reveal className="mb-20">
          <p className="text-[10px] font-mono tracking-[0.5em] text-cyan-400/60 uppercase mb-4">
            // 02 — Identity
          </p>
          <motion.h1 
            className="text-[clamp(3rem,9vw,7rem)] font-black tracking-tighter leading-none"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            THE<br />
            <span className="text-white/10 italic">ARCHITECT</span>
            <span className="text-cyan-400">.</span>
          </motion.h1>
        </Reveal>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">

          {/* Philosophy */}
          <Reveal delay={0} className="md:col-span-2">
            <motion.div 
              className="glass-card p-10 h-full flex flex-col justify-end min-h-[280px] scanline overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="text-[9px] font-mono tracking-[0.5em] uppercase text-white/20 mb-6 group-hover:text-cyan-400/50 transition-colors">
                Core Philosophy
              </div>
              <h3 className="text-2xl font-bold mb-4">Beyond boundaries.</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                I specialize in bridging heavy-duty backend logic with immersive 3D frontends.
                My goal is to make the web feel like a living, breathing space — not just a page.
              </p>
            </motion.div>
          </Reveal>

          {/* Status */}
          <Reveal delay={100}>
            <motion.div 
              className="glass-card p-8 flex flex-col justify-between min-h-[280px] border-cyan-500/10 bg-cyan-500/5 animate-border-glow group"
              whileHover={{ rotate: 2, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-14 h-14 rounded-full border border-cyan-400/60 flex items-center justify-center">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
              </div>
              <div>
                <div className="text-[9px] font-mono tracking-[0.5em] uppercase text-white/20 mb-2">
                  Current Status
                </div>
                <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">Open for<br />Missions.</div>
                <Link
                  to="/contact"
                  className="mt-4 inline-block text-[9px] font-mono tracking-widest uppercase text-cyan-400/70 hover:text-cyan-400 transition-colors"
                >
                  Hire me →
                </Link>
              </div>
            </motion.div>
          </Reveal>

          {/* Skills */}
          <Reveal delay={150}>
            <div className="glass-card p-8 min-h-[280px]">
              <div className="text-[9px] font-mono tracking-[0.5em] uppercase text-white/20 mb-6">
                Tech Arsenal
              </div>
              <div className="flex flex-col gap-4">
                {skills.slice(0, 4).map(s => (
                  <SkillBar key={s.name} {...s} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* More Skills */}
          <Reveal delay={200}>
            <div className="glass-card p-8 min-h-[280px]">
              <div className="text-[9px] font-mono tracking-[0.5em] uppercase text-white/20 mb-6">
                Extended Stack
              </div>
              <div className="flex flex-col gap-4">
                {skills.slice(4).map(s => (
                  <SkillBar key={s.name} {...s} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Location */}
          <Reveal delay={250}>
            <div className="relative rounded-[2rem] overflow-hidden min-h-[280px] group cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')` }}
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="relative h-full p-8 flex flex-col justify-end min-h-[280px]">
                <div className="text-[9px] font-mono tracking-[0.5em] uppercase text-white/40 mb-3 group-hover:text-cyan-400/50 transition-colors">
                  Location
                </div>
                <div className="text-3xl font-black italic text-white">GLOBAL<br />ACCESS</div>
                <p className="text-[10px] font-mono text-white/40 mt-2">51.5074° N // 0.1278° W</p>
              </div>
            </div>
          </Reveal>

        </div>

        {/* ── TIMELINE ── */}
        <Reveal>
          <div className="mb-6">
            <p className="text-[10px] font-mono tracking-[0.5em] text-cyan-400/60 uppercase mb-2">
              // 02.2 — Experience Log
            </p>
            <h2 className="text-3xl font-black tracking-tight">Career Timeline</h2>
          </div>
        </Reveal>

        <div className="relative pl-6 border-l border-white/10 flex flex-col gap-10 mt-10">
          {timeline.map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <motion.div 
                className="relative group"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute -left-[calc(1.5rem+1px)] -translate-x-1/2 w-3 h-3 rounded-full border border-cyan-400/60 bg-[#020205] group-hover:bg-cyan-400 transition-colors duration-300 group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                <div className="text-[9px] font-mono text-cyan-400/50 tracking-widest mb-1">{item.year}</div>
                <h3 className="font-bold text-lg text-white/90 group-hover:text-white transition-colors">{item.title}</h3>
                <div className="text-[11px] font-mono text-white/30 mb-2">{item.org}</div>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </motion.section>
  );
}
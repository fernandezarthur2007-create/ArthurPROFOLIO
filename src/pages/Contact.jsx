import { useState } from 'react';
import { motion } from 'framer-motion';

/* ── Contact Info Cards ── */
const CONTACTS = [
    {
        id: 'phone',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
        ),
        label: 'Phone',
        value: '+92 331 120 2716',
        href: 'tel:+923311202716',
        color: 'from-cyan-400 to-blue-500',
        glow: 'rgba(34,211,238,0.15)',
    },
    {
        id: 'instagram',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
        label: 'Instagram',
        value: '@arthur_fernandez_69',
        href: 'https://instagram.com/arthur_fernandez_69',
        color: 'from-pink-500 to-purple-600',
        glow: 'rgba(236,72,153,0.15)',
    },
    {
        id: 'github',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
        label: 'GitHub',
        value: 'fernandezarthur2007',
        href: 'https://github.com/fernandezarthur2007',
        color: 'from-violet-400 to-indigo-500',
        glow: 'rgba(124,58,237,0.15)',
    },
    {
        id: 'email',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        label: 'Email',
        value: 'arthur@portfolio.dev',
        href: 'mailto:arthur@portfolio.dev',
        color: 'from-emerald-400 to-teal-500',
        glow: 'rgba(52,211,153,0.15)',
    },
];

/* ── Contact Card ── */
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

function ContactCard({ contact }) {
    return (
        <motion.a
            variants={itemVariants}
            href={contact.href}
            target={contact.id !== 'phone' ? '_blank' : undefined}
            rel="noopener noreferrer"
            id={`contact-${contact.id}`}
            whileHover={{ 
                y: -4, 
                borderColor: 'rgba(255,255,255,0.14)',
                boxShadow: `0 0 40px ${contact.glow}, 0 8px 32px rgba(0,0,0,0.4)`
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-5 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm cursor-pointer overflow-hidden transition-colors"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
        >
            {/* Gradient blob bg */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${contact.color}`} />

            {/* Icon */}
            <div
                className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${contact.color} flex-shrink-0 transition-shadow duration-500`}
                style={{ boxShadow: `0 0 20px ${contact.glow}` }}
            >
                <span className="text-white">{contact.icon}</span>
            </div>

            {/* Info */}
            <div className="relative flex-1 min-w-0">
                <div className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/30 mb-1">
                    {contact.label}
                </div>
                <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-300 truncate">
                    {contact.value}
                </div>
            </div>

            {/* Arrow */}
            <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-white/20 group-hover:text-white/60 flex-shrink-0"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
            >
                <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
        </motion.a>
    );
}

/* ── Contact Form ── */
function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        await new Promise((r) => setTimeout(r, 1600));
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
    };

    return (
        <motion.form
            id="contact-form"
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={itemVariants}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Your Name</label>
                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Arthur Fernandez"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input transition-all duration-300 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="hello@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input transition-all duration-300 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project, idea, or just say hi..."
                    value={form.message}
                    onChange={handleChange}
                    className="form-input transition-all duration-300 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                />
            </div>

            <motion.button
                id="contact-submit"
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ minWidth: '180px' }}
                whileHover={status === 'idle' ? { scale: 1.05 } : {}}
                whileTap={status === 'idle' ? { scale: 0.95 } : {}}
            >
                {status === 'idle' && (
                    <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Send Message
                    </>
                )}
                {status === 'sending' && (
                    <>
                        <motion.svg 
                            className="w-4 h-4" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                            <path d="M12 2a10 10 0 0110 10" />
                        </motion.svg>
                        Transmitting...
                    </>
                )}
                {status === 'sent' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Message Sent!
                    </motion.div>
                )}
            </motion.button>
        </motion.form>
    );
}

/* ── Decorative Grid ── */
function GridOverlay() {
    return (
        <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
                backgroundImage:
                    'linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
            }}
        />
    );
}

/* ── Main Component ── */
export default function Contact() {
    return (
        <motion.div 
            className="relative min-h-screen bg-transparent overflow-hidden"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
            variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                hidden: {}
            }}
        >
            <GridOverlay />

            {/* Ambient blobs */}
            <motion.div
                className="absolute top-1/4 -left-32 w-80 h-80 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative max-w-6xl mx-auto px-6 md:px-14 py-28">

                {/* ── HEADER ── */}
                <motion.div className="mb-20" variants={itemVariants}>
                    <p className="text-[10px] font-mono tracking-[0.5em] text-cyan-400/60 uppercase mb-4">
                        // 04 — Contact
                    </p>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
                        Let's{' '}
                        <span
                            className="relative inline-block"
                            style={{
                                background: 'linear-gradient(135deg, #22d3ee 0%, #7c3aed 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Connect
                        </span>
                        <span className="text-cyan-400">.</span>
                    </h1>
                    <p className="text-slate-400 font-light text-lg max-w-lg leading-relaxed">
                        Whether it's a collaboration, a project, or just a conversation —
                        I'm always open to new connections.
                    </p>
                </motion.div>

                {/* ── TWO-COLUMN LAYOUT ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT — Contact Cards */}
                    <div className="flex flex-col gap-4">
                        <motion.p
                            variants={itemVariants}
                            className="text-[9px] font-mono uppercase tracking-[0.5em] text-white/20 mb-2"
                        >
                            Direct channels
                        </motion.p>
                        {CONTACTS.map((c) => (
                            <ContactCard key={c.id} contact={c} />
                        ))}

                        {/* Availability badge */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-6 flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
                            </span>
                            <span className="text-xs font-mono text-white/40 tracking-widest uppercase">
                                Available for new projects
                            </span>
                        </motion.div>
                    </div>

                    {/* RIGHT — Contact Form */}
                    <motion.div
                        variants={itemVariants}
                        className="glass-card p-8 md:p-10"
                    >
                        <div className="mb-8">
                            <h2 className="text-xl font-bold tracking-tight mb-1">Send a Message</h2>
                            <p className="text-white/30 text-sm font-light">
                                I'll respond within 24 hours.
                            </p>
                        </div>
                        <ContactForm />
                    </motion.div>
                </div>

                {/* ── BOTTOM DIVIDER ── */}
                <motion.div
                    variants={itemVariants}
                    className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-white/20"
                >
                    <span>© 2026 // ARTHUR FERNANDEZ</span>
                    <span>
                        SIGNAL STRONG —{' '}
                        <span className="text-cyan-400/60">READY TO TRANSMIT</span>
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
}

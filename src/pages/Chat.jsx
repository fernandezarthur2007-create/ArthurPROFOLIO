import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Typewriter for AI responses ─── */
function useTypewriter(text, speed = 20) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    if (!text) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayed;
}

/* ── Single message bubble ─── */
function Message({ msg, isLatestAI }) {
  const aiText = useTypewriter(isLatestAI ? msg.text : '', 18);
  const text = isLatestAI ? aiText : msg.text;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20, originX: msg.role === 'user' ? 1 : 0 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {msg.role === 'ai' && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-cyan-400/40 flex items-center justify-center mr-3 mt-auto mb-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      )}
      <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
        {text}
        {isLatestAI && aiText.length < msg.text.length && (
          <span className="border-r border-cyan-400 ml-0.5 animate-pulse">&nbsp;</span>
        )}
      </div>
    </motion.div>
  );
}

/* ── Typing indicator ─── */
function TypingIndicator() {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9, x: -20, originX: 0 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex justify-start"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full border border-cyan-400/40 flex items-center justify-center mr-3">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
      </div>
      <div className="chat-bubble-ai flex items-center gap-1.5 py-3">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </motion.div>
  );
}

/* ── Main Chat Component ─── */
export default function Chat({ setStatus, status }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Neural link established. I am AETHER — ask me anything about this portfolio, my skills, or my work.' }
  ]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const isThinking = status === 'thinking';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleAsk = async () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setStatus('thinking');

    try {
      const res = await axios.post('/api/chat', { message: trimmed });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.text }]);
      setStatus('talking');
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'System failure. Connection to neural core lost. Please retry.' }]);
      setStatus('idle');
    }
  };

  const suggestedQueries = [
    'What are your key skills?',
    'Tell me about your recent projects.',
    'Are you available for hire?',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 pt-24 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-2xl flex flex-col gap-4" style={{ height: 'calc(100vh - 130px)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              isThinking ? 'bg-cyan-400 animate-ping' : status === 'talking' ? 'bg-violet-500 animate-pulse' : 'bg-white/20'
            }`} />
            <h1 className="text-cyan-400 font-mono text-[11px] tracking-[0.35em] uppercase">
              Neural_Link_v4.2
            </h1>
          </div>
          <div className="text-[9px] font-mono tracking-widest text-white/20 uppercase">
            {isThinking ? 'Processing...' : status === 'talking' ? 'Responding' : 'Standby'}
          </div>
        </div>

        {/* Messages */}
        <div className="glass-card flex-1 overflow-y-auto p-6 flex flex-col gap-4 scroll-smooth overflow-x-hidden"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#22d3ee transparent' }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <Message
                key={i}
                msg={msg}
                isLatestAI={msg.role === 'ai' && i === messages.length - 1 && !isThinking}
              />
            ))}
            {isThinking && <TypingIndicator key="typing-indicator" />}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Suggested queries */}
        {messages.length <= 1 && (
          <motion.div 
            className="flex flex-wrap gap-2 px-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {suggestedQueries.map(q => (
              <motion.button
                key={q}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring" } }
                }}
                whileHover={{ scale: 1.05, borderColor: "rgba(34,211,238,0.4)", color: "rgba(34,211,238,0.7)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setInput(q); inputRef.current?.focus(); }}
                className="text-[9px] font-mono tracking-widest uppercase px-4 py-2 rounded-full border border-white/10 text-white/30 transition-colors duration-300"
              >
                {q}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Input row */}
        <motion.div 
          className="flex gap-3 px-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <input
            ref={inputRef}
            className="input-neural flex-1 transition-all duration-300 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            placeholder="Send a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleAsk()}
            disabled={isThinking}
          />
          <motion.button
            whileHover={!isThinking && input.trim() ? { scale: 1.05 } : {}}
            whileTap={!isThinking && input.trim() ? { scale: 0.95 } : {}}
            onClick={handleAsk}
            disabled={isThinking || !input.trim()}
            className="btn-solid px-6 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:transform-none"
          >
            {isThinking ? (
              <span className="flex gap-1">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </motion.button>
        </motion.div>

        <p className="text-center text-[9px] font-mono text-white/15 tracking-widest">
          AETHER AI // Powered by Gemini Neural Core
        </p>
      </div>
    </motion.section>
  );
}
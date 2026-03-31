import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Components
import Navbar from './components/Navbar'; // <--- Check this path!
import Experience from './components/Experience';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Chat from './pages/Chat';
import Contact from './pages/Contact';

export default function App() {
  const [status, setStatus] = useState("idle");

  return (
    <Router>
      <main className="relative bg-transparent min-h-screen">
        <Experience status={status} />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<Chat setStatus={setStatus} status={status} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}
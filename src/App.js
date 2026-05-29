import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaEnvelope, FaRocket, FaBrain, FaCode, FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import { SiCplusplus, SiPython, SiReact, SiNodedotjs, SiMongodb } from "react-icons/si";

const Portfolio = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: "assistant", text: "Hi! I am Snehal AI assistant. Ask me about her projects!" }]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const chatEndRef = useRef(null);

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const sendMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim();
    setChatInput("");
    setChatMessages(p => [...p, { role: "user", text: msg }]);
    setChatLoading(true);
    try {
      const res = await fetch("https://ai-portfolio-qt8z.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: "You are Snehal Thombare portfolio assistant. She is a CS student from Pune seeking internships. Projects: File Compression Tool (C++ Huffman), CP Analyzer, Market Predictor, AI Portfolio. Skills: C++, Python, React, Node.js. Keep answers to 2 sentences.",
          messages: [{ role: "user", content: msg }]
        })
      });
      const data = await res.json();
      setChatMessages(p => [...p, { role: "assistant", text: data.content?.[0]?.text || "Try again!" }]);
    } catch { setChatMessages(p => [...p, { role: "assistant", text: "Network error!" }]); }
    setChatLoading(false);
  };

  const projects = [
    { title: "File Compression Tool", desc: "Huffman Coding + XOR Encryption in C++. Achieves 42% compression.", tech: ["C++", "Algorithms", "Bit Manipulation"], link: "https://github.com/snehal-thombare08/File-Compression-Tool", demo: "https://file-compression-tool-neon.vercel.app", color: "#a855f7" },
    { title: "CP Analyzer", desc: "Competitive Programming performance analyzer across platforms.", tech: ["Python", "FastAPI", "React"], link: "#", demo: "#", color: "#ec4899" },
    { title: "Market Predictor", desc: "Stock market prediction using Machine Learning.", tech: ["Python", "Scikit-learn", "Pandas"], link: "#", demo: "#", color: "#06b6d4" },
    { title: "AI Portfolio", desc: "AI-powered portfolio with Claude ChatBot assistant.", tech: ["React", "Node.js", "Claude AI"], link: "#", demo: "#", color: "#10b981" },
  ];

  const skills = [
    { name: "C++", icon: <SiCplusplus />, level: 85 },
    { name: "Python", icon: <SiPython />, level: 80 },
    { name: "React", icon: <SiReact />, level: 75 },
    { name: "Node.js", icon: <SiNodedotjs />, level: 70 },
    { name: "MongoDB", icon: <SiMongodb />, level: 65 },
    { name: "DSA", icon: <FaCode />, level: 90 },
    { name: "Algorithms", icon: <FaBrain />, level: 85 },
    { name: "ML", icon: <FaRocket />, level: 70 },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#050510", color: "#e2e8f0", fontFamily: "DM Sans, sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <div style={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0, left: mousePos.x - 200, top: mousePos.y - 200, transition: "left 0.1s, top 0.1s" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: "linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 100, background: "rgba(5,5,16,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(168,85,247,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 40px", height: 64 }}>
        <span style={{ fontFamily: "Space Mono, monospace", fontSize: 18, color: "#a855f7", letterSpacing: 2 }}>snehal<span style={{ color: "#ec4899" }}>.dev</span></span>
        <div style={{ display: "flex", gap: 32 }}>
          {["Home","Projects","Skills","Contact"].map(item => (
            <button key={item} onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 500 }}>{item}</button>
          ))}
        </div>
        <a href="#" style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", color: "white", padding: "8px 20px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><FaDownload size={12} /> Resume</a>
      </nav>
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 40px 40px", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ textAlign: "center", maxWidth: 700 }}>
          <motion.div animate={{ y: [0,-10,0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 120, height: 120, borderRadius: "50%", margin: "0 auto 32px", background: "linear-gradient(135deg, #a855f7, #ec4899, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 700, fontFamily: "Space Mono, monospace", boxShadow: "0 0 60px rgba(168,85,247,0.4)" }}>ST</motion.div>
          <div style={{ fontFamily: "Space Mono, monospace", color: "#a855f7", fontSize: 13, letterSpacing: 4, marginBottom: 16, textTransform: "uppercase" }}>Available for Internships</div>
          <h1 style={{ fontSize: "clamp(40px,7vw,72px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>Hi, I am <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Snehal</span></h1>
          <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.7, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>Full Stack Developer and AI Enthusiast building tools that solve real problems.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a href="https://github.com/snehal-thombare08" target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", borderRadius: 12, background: "#1e1e2e", color: "white", textDecoration: "none", fontSize: 14, border: "1px solid rgba(168,85,247,0.2)" }}><FaGithub /> GitHub</motion.a>
            <motion.a href="mailto:snehal@email.com" whileHover={{ scale: 1.05 }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg, #a855f7, #ec4899)", color: "white", textDecoration: "none", fontSize: 14 }}><FaEnvelope /> Contact</motion.a>
          </div>
        </motion.div>
      </section>
      <section id="projects" style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ color: "#a855f7", fontSize: 12, letterSpacing: 4, fontFamily: "Space Mono, monospace", marginBottom: 12 }}>WHAT I VE BUILT</div>
          <h2 style={{ fontSize: 40, fontWeight: 700 }}>Projects</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))", gap: 24 }}>
          {projects.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 28, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{p.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {p.tech.map((t, j) => <span key={j} style={{ background: p.color + "15", color: p.color, border: `1px solid ${p.color}30`, padding: "4px 12px", borderRadius: 20, fontSize: 12 }}>{t}</span>)}
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <a href={p.link} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, color: "#94a3b8", fontSize: 13, textDecoration: "none" }}><FaGithub size={14} /> Code</a>
                {p.demo !== "#" && <a href={p.demo} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, color: p.color, fontSize: 13, textDecoration: "none" }}><FaExternalLinkAlt size={12} /> Live Demo</a>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="skills" style={{ padding: "80px 40px", background: "rgba(168,85,247,0.03)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#a855f7", fontSize: 12, letterSpacing: 4, fontFamily: "Space Mono, monospace", marginBottom: 12 }}>WHAT I KNOW</div>
            <h2 style={{ fontSize: 40, fontWeight: 700 }}>Skills</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {skills.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ color: "#a855f7", fontSize: 20 }}>{s.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</span>
                  <span style={{ marginLeft: "auto", color: "#64748b", fontSize: 13, fontFamily: "Space Mono, monospace" }}>{s.level}%</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.07 }}
                    style={{ height: "100%", background: "linear-gradient(90deg, #a855f7, #ec4899)", borderRadius: 4 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" style={{ padding: "80px 40px", maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ color: "#a855f7", fontSize: 12, letterSpacing: 4, fontFamily: "Space Mono, monospace", marginBottom: 12 }}>LETS CONNECT</div>
          <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 20 }}>Get In Touch</h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, marginBottom: 40 }}>Looking for internship opportunities! My inbox is always open.</p>
          <motion.a href="mailto:snehal@email.com" whileHover={{ scale: 1.05 }} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg, #a855f7, #ec4899)", color: "white", padding: "16px 36px", borderRadius: 12, textDecoration: "none", fontSize: 16, fontWeight: 600, boxShadow: "0 0 40px rgba(168,85,247,0.3)" }}><FaEnvelope /> Say Hello</motion.a>
        </motion.div>
      </section>
      <footer style={{ padding: "32px 40px", borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center", color: "#475569", fontSize: 13 }}>Built with React + Framer Motion + Claude AI</footer>
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
        <AnimatePresence>
          {chatOpen && (
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
              style={{ position: "absolute", bottom: 72, right: 0, width: 340, background: "#0f0f1a", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 16, overflow: "hidden", boxShadow: "0 0 60px rgba(168,85,247,0.2)" }}>
              <div style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontWeight: 600, fontSize: 14 }}>Snehal AI Assistant</span>
              </div>
              <div style={{ height: 280, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", background: msg.role === "user" ? "linear-gradient(135deg, #a855f7, #ec4899)" : "rgba(255,255,255,0.06)", padding: "10px 14px", borderRadius: 12, maxWidth: "85%", fontSize: 13, lineHeight: 1.6 }}>{msg.text}</div>
                ))}
                {chatLoading && <div style={{ alignSelf: "flex-start", background: "rgba(255,255,255,0.06)", padding: "10px 14px", borderRadius: 12, fontSize: 13 }}>typing...</div>}
                <div ref={chatEndRef} />
              </div>
              <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 8 }}>
                <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Ask about my projects..."
                  style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "8px 12px", color: "white", fontSize: 13, outline: "none", fontFamily: "DM Sans, sans-serif" }} />
                <button onClick={sendMessage} disabled={chatLoading} style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", border: "none", borderRadius: 8, padding: "8px 14px", color: "white", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Send</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button onClick={() => setChatOpen(!chatOpen)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          style={{ width: 56, height: 56, borderRadius: "50%", border: "none", cursor: "pointer", background: "linear-gradient(135deg, #a855f7, #ec4899)", color: "white", fontSize: 22, boxShadow: "0 0 30px rgba(168,85,247,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {chatOpen ? "X" : "AI"}
        </motion.button>
      </div>
    </div>
  );
};

export default Portfolio;

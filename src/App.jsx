import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Journey from "./pages/Journey";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ThreeDBackground from "./components/ThreeDBackground";
import WhatsAppButton from "./components/WhatsAppButton";
import Lenis from "lenis";

/* ── Smooth scroll via Lenis ── */
function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return null;
}

/* ── Scroll to top on every route change ── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SmoothScroll />
        <ScrollToTop />
        <ThreeDBackground />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </BrowserRouter>
    </div>
  );
}

export default App;

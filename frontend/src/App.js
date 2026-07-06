import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import { Navbar } from "./components/site/Navbar";
import { Hero } from "./components/site/Hero";
import { About } from "./components/site/About";
import { Sectors } from "./components/site/Sectors";
import { Projects } from "./components/site/Projects";
import { Clients } from "./components/site/Clients";
import { Research } from "./components/site/Research";
import { Machinery } from "./components/site/Machinery";
import { Turnover } from "./components/site/Turnover";
import { Team } from "./components/site/Team";
import { Contact } from "./components/site/Contact";
import { Footer } from "./components/site/Footer";

const Home = () => (
  <div className="min-h-screen bg-[#0A0A0A] text-white" data-testid="home-page">
    <Navbar />
    <Hero />
    <About />
    <Sectors />
    <Projects />
    <Clients />
    <Research />
    <Machinery />
    <Turnover />
    <Team />
    <Contact />
    <Footer />
  </div>
);

function App() {
  return (
    <div className="App">
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#141414",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 0,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

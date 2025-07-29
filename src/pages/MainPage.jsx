import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe2, Facebook, Twitter, Instagram, ArrowUp, Home, Shield, AlertTriangle, Cloud } from "lucide-react";
import { Link } from 'react-router-dom';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const featureItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
};

const footerNavs = [
  {
    label: 'Resources',
    items: [
      { href:'#contact', name: 'Contact Us' },
      { href: '#', name: 'Blogs' },
    ],
  },
  {
    label: 'About',
    items: [
      { href: '#', name: 'Disclaimer' },
      { href: '#', name: 'Terms of Service' },
      { href: '#', name: 'Privacy Policy' },
      { href: '#', name: 'Refund Policy' },
    ],
  },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollToSection = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    const offsetTop = element.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};

// Typing effect component
const TypingEffect = ({ strings, typeSpeed = 50, deleteSpeed = 30 }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = strings[currentStringIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentString.length) {
          setCurrentText(currentString.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentStringIndex((prev) => (prev + 1) % strings.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentStringIndex, strings, typeSpeed, deleteSpeed]);

  return <span>{currentText}</span>;
};

const MainPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div 
      className="flex flex-col min-h-screen font-sans text-white relative"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/31229571/pexels-photo-31229571.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* ===== NAVBAR ===== */}
      {/* ===== ENHANCED NAVBAR ===== */}
<nav className="bg-gradient-to-r from-gray-900 to-black backdrop-blur-md fixed w-full z-20 top-0 left-0 border-b border-yellow-500/30 h-20 flex items-center shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div className="flex justify-between items-center h-full">
      {/* Logo with animation */}
      <motion.div
        className="flex items-center cursor-pointer"
        onClick={() => scrollToTop()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="h-12 md:h-14 w-12 md:w-14 bg-white rounded-full flex items-center justify-center overflow-hidden"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="/logo-removebg.png" 
            alt="RhinoFuse Logo" 
            className="h-10 w-10 object-contain"
          />
        </motion.div>
        <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          RhinoFuse
        </span>
      </motion.div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        {["home", "about", "features", "contact"].map((item) => (
          <motion.button
            key={item}
            onClick={() => scrollToSection(item)}
            className="relative cursor-pointer text-gray-200 hover:text-white py-1 px-3 transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
            <motion.div 
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        ))}
        
        {/* Products Link */}
        <Link to="/products">
          <motion.button
            className="relative cursor-pointer text-gray-200 hover:text-white py-1 px-3 transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
          >
            Products
            <motion.div 
              className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </Link>

        {/* Login/Register Buttons */}
        <motion.button
          onClick={() => setShowLogin(true)}
          className="text-gray-200 hover:text-white px-4 py-2 rounded-lg transition-all border border-gray-600 hover:border-yellow-500"
          whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.1)" }}
        >
          Login
        </motion.button>
        <motion.button
          onClick={() => setShowRegister(true)}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-2 rounded-lg hover:opacity-90 transition-all shadow-lg shadow-yellow-500/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center">
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-300 focus:outline-none p-2 rounded-lg bg-gray-800"
          whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.2)" }}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </motion.button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <motion.div 
      className="md:hidden bg-gradient-to-b from-gray-900 to-black border-t border-yellow-500/20 absolute top-full left-0 w-full py-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      {["home", "about", "features", "contact"].map((item) => (
        <motion.button
          key={item}
          onClick={() => {
            scrollToSection(item);
            setMenuOpen(false);
          }}
          className="block w-full px-6 py-3 text-left text-gray-200 hover:bg-gray-800/50 transition-all flex items-center"
          whileHover={{ paddingLeft: "30px" }}
        >
          <span className="text-yellow-500 mr-2">•</span>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </motion.button>
      ))}
      
      {/* Products Link */}
      <Link to="/products">
        <motion.button
          onClick={() => setMenuOpen(false)}
          className="block w-full px-6 py-3 text-left text-gray-200 hover:bg-gray-800/50 transition-all flex items-center"
          whileHover={{ paddingLeft: "30px" }}
        >
          <span className="text-yellow-500 mr-2">•</span>
          Products
        </motion.button>
      </Link>
      
      {/* Login/Register Buttons in Mobile */}
      <motion.button
        onClick={() => {
          setShowLogin(true);
          setMenuOpen(false);
        }}
        className="block w-full px-6 py-3 text-left text-gray-200 hover:bg-gray-800/50 transition-all flex items-center mt-2"
        whileHover={{ paddingLeft: "30px" }}
      >
        <span className="text-yellow-500 mr-2">•</span>
        Login
      </motion.button>
      <motion.button
        onClick={() => {
          setShowRegister(true);
          setMenuOpen(false);
        }}
        className="block w-full px-6 py-3 text-left text-gray-200 hover:bg-gray-800/50 transition-all flex items-center"
        whileHover={{ paddingLeft: "30px" }}
      >
        <span className="text-yellow-500 mr-2">•</span>
        Register
      </motion.button>
    </motion.div>
  )}
</nav>

        {/* ===== LOGIN MODAL ===== */}
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => setShowLogin(false)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 w-full max-w-md shadow-2xl relative border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full p-2 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl"><img src="/logo-removebg.png" alt="" /></span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-400">Sign in to your RhinoFuse account</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email or Username</label>
                  <input
                    type="text"
                    placeholder="Enter your email or username"
                    className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-gray-300">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-800 mr-2" />
                    Remember me
                  </label>
                  <a href="#" className="text-white hover:text-gray-300 transition-colors">
                    Forgot password?
                  </a>
                </div>

                <button className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transform hover:scale-[1.02] transition-all duration-200 shadow-lg">
                  Sign In
                </button>

                <div className="text-center">
                  <p className="text-gray-400">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => {
                        setShowLogin(false);
                        setShowRegister(true);
                      }}
                      className="text-white hover:text-gray-300 font-medium transition-colors"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ===== REGISTER MODAL ===== */}
        {showRegister && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => setShowRegister(false)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 w-full max-w-md shadow-2xl relative border border-gray-700 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowRegister(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full p-2 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-2xl"><img src="/logo-removebg.png" alt="" /></span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Join RhinoFuse</h2>
                <p className="text-gray-400">Create your account and start monitoring</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-start text-sm text-gray-300">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-800 mr-3 mt-0.5" />
                    <span>I agree to the <a href="#" className="text-white hover:text-gray-300 underline">Terms of Service</a> and <a href="#" className="text-white hover:text-gray-300 underline">Privacy Policy</a></span>
                  </label>
                  
                  <label className="flex items-center text-sm text-gray-300">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-800 mr-3" />
                    <span>I want to receive updates and promotional emails</span>
                  </label>
                </div>

                <button className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transform hover:scale-[1.02] transition-all duration-200 shadow-lg">
                  Create Account
                </button>

                <div className="text-center">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <button 
                      onClick={() => {
                        setShowRegister(false);
                        setShowLogin(true);
                      }}
                      className="text-white hover:text-gray-300 font-medium transition-colors"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ===== HERO SECTION ===== */}
     
<motion.section
  id="home"
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
  className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden"
>
  {/* Floating particles background */}
  <div className="absolute inset-0 z-0">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white/10"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 20 + 5}px`,
          height: `${Math.random() * 20 + 5}px`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>

  <div className="relative z-10 px-4">
    <motion.h1
      className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <TypingEffect
        strings={[
          "Your Bike, Smarter Than Ever",
          "RhinoFuse: Ride with Confidence",
          "Monitor. Predict. Protect.",
        ]}
        typeSpeed={50}
        deleteSpeed={30}
      />
    </motion.h1>
    
    <motion.p
      className="text-lg md:text-2xl mb-8 max-w-3xl text-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      RhinoFuse Keeps Your Bike's Pulse in Check
    </motion.p>
    
    <motion.button
      className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black hover:from-yellow-400 hover:to-orange-500 px-8 py-4 rounded-lg shadow-lg font-semibold relative overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <span className="relative z-10">Get Started</span>
      <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.button>
  </div>

  {/* Floating motorcycle illustration */}
  <motion.div
    className="absolute bottom-0 w-full max-w-3xl"
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 1 }}
  >
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      {/* Motorcycle path */}
      <path 
        d="M50,350 Q200,250 400,350 T750,300" 
        stroke="#ffffff20" 
        strokeWidth="2" 
        fill="none" 
      />
      
      {/* Motorcycle */}
      <motion.g
        animate={{
          x: [0, 700],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <circle cx="0" cy="0" r="15" fill="#f59e0b" />
        <rect x="-30" y="-15" width="60" height="30" rx="5" fill="#374151" />
        <circle cx="-20" cy="20" r="8" fill="#1f2937" />
        <circle cx="20" cy="20" r="8" fill="#1f2937" />
        <path d="M-15,-10 L-25,-25 M15,-10 L25,-25" stroke="#f59e0b" strokeWidth="3" />
      </motion.g>
    </svg>
  </motion.div>
</motion.section>

        {/* ===== ABOUT SECTION ===== */}
       <motion.section
  id="about"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeInUp}
  className="py-32"
>
  <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 rounded-3xl mx-4 shadow-2xl">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      {/* Animated device visualization */}
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-64 h-64">
          {/* Device base */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-xl border border-gray-700 flex items-center justify-center">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">RF</span>
            </div>
          </div>
          
          {/* Pulsing effect */}
          <motion.div
            className="absolute inset-0 border-2 border-yellow-500 rounded-2xl opacity-0"
            animate={{
              scale: [1, 1.2],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const length = 35;
              return (
                <motion.line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + Math.cos(angle) * length}
                  y2={50 + Math.sin(angle) * length}
                  stroke="#f59e0b"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                  initial={{ strokeDashoffset: 20 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity
                  }}
                />
              );
            })}
          </svg>
        </div>
      </motion.div>

      {/* Text with staggered animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <motion.h2 
          className="text-4xl font-bold mb-6 text-white"
          variants={fadeInUp}
        >
          Revolutionizing Bike Safety
        </motion.h2>
        
        {[
          "RhinoFuse is the next-generation bike health monitoring device, engineered for riders who demand precision and safety.",
          "Combining advanced sensors with AI-driven analytics, RhinoFuse keeps track of your motorcycle's critical systems in real-time.",
          "Whether you're navigating city streets or embarking on long rides, RhinoFuse ensures you're always aware of engine health, battery status, and road conditions.",
          "Our predictive algorithms detect potential issues before they become problems, giving you peace of mind on every journey."
        ].map((text, i) => (
          <motion.p 
            key={i}
            className="text-gray-300 text-lg mb-4 leading-relaxed flex items-start"
            variants={fadeInUp}
          >
            <span className="text-yellow-500 mr-2">•</span> {text}
          </motion.p>
        ))}
        
        <motion.button
          className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-semibold flex items-center group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={fadeInUp}
        >
          Learn More
          <svg 
            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  </div>
</motion.section>
        {/* ===== PRODUCT SECTION ===== */}
      
<motion.section
  id="products"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeInUp}
  className="py-32"
>
  <div className="py-16">
    <motion.h2 
      className="text-4xl font-bold text-center mb-20 text-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Our <span className="text-yellow-500">Flagship</span> Product
    </motion.h2>
    
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-4 items-center">
      {/* Product visualization */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-2xl border border-gray-800">
          <div className="relative h-64">
            {/* Device */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center">
              <div className="w-48 h-32 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">RF</span>
                </div>
              </div>
            </div>
            
            {/* Data visualization */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Data lines */}
              <motion.path
                d="M10,80 C25,40 40,60 55,30 S85,20 90,50"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset="100"
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              
              {/* Data points */}
              {[10, 25, 40, 55, 70, 85].map((x, i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={80 - i * 10}
                  r="2"
                  fill="#f59e0b"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                />
              ))}
            </svg>
          </div>
        </div>
      </motion.div>
      
      {/* Product details */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-2xl border border-gray-800">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-2xl font-bold">RideSense Diagnostic Chip</h3>
          </div>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Advanced health monitoring chip for motorcycles, offering predictive alerts and real-time stats for safer rides. 
            Engineered with military-grade durability and precision sensors.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: '⚡', text: 'Real-time monitoring' },
              { icon: '📊', text: 'AI diagnostics' },
              { icon: '🔋', text: '6-month battery' },
              { icon: '🌧️', text: 'Weather resistant' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="flex items-center bg-gray-800/50 p-3 rounded-lg"
                whileHover={{ y: -5, backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xl mr-2">{feature.icon}</span>
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <motion.button
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold py-3 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Buy Now - $129
            </motion.button>
            <motion.button
              className="flex-1 bg-gray-800 text-white font-semibold py-3 rounded-lg border border-gray-700"
              whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
            >
              View Details
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</motion.section>

        {/* ===== FEATURES SECTION ===== */}
        <motion.section
  id="features"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={staggerContainer}
  className="py-32"
>
  <div className="py-20">
    <motion.h2 
      className="text-4xl font-extrabold text-center mb-16 text-white tracking-wide"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Advanced <span className="text-yellow-500">Protection</span> Features
    </motion.h2>

    <div className="grid md:grid-cols-3 gap-10 px-6 md:px-0 max-w-6xl mx-auto">
      {/* Feature 1 with enhanced animation */}
      <motion.div
        variants={featureItem}
        whileHover={{ 
          y: -10,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-gray-800 relative overflow-hidden"
      >
        <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center">
          <Home className="w-8 h-8 text-yellow-500" />
        </div>
        
        <div className="mb-6">
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4"></div>
          <h3 className="text-2xl font-semibold mb-3 text-white">
            Real-Time Monitoring
          </h3>
        </div>
        
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Live updates on engine health, tire pressure, and battery levels so you're always informed.
        </p>
        
        <div className="mt-auto">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
              initial={{ width: 0 }}
              whileInView={{ width: "85%" }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Status</span>
            <span>Optimal</span>
          </div>
        </div>
      </motion.div>

      {/* Feature 2 with enhanced animation */}
      <motion.div
        variants={featureItem}
        whileHover={{ 
          y: -10,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-gray-800 relative overflow-hidden"
      >
        <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
        </div>
        
        <div className="mb-6">
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4"></div>
          <h3 className="text-2xl font-semibold mb-3 text-white">
            Predictive AI Alerts
          </h3>
        </div>
        
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          AI predicts upcoming issues and alerts you before they cause breakdowns, ensuring safer rides.
        </p>
        
        <div className="mt-auto">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
              initial={{ width: 0 }}
              whileInView={{ width: "92%" }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Accuracy</span>
            <span>92%</span>
          </div>
        </div>
      </motion.div>

      {/* Feature 3 with enhanced animation */}
      <motion.div
        variants={featureItem}
        whileHover={{ 
          y: -10,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-gray-800 relative overflow-hidden"
      >
        <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center">
          <Cloud className="w-8 h-8 text-yellow-500" />
        </div>
        
        <div className="mb-6">
          <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4"></div>
          <h3 className="text-2xl font-semibold mb-3 text-white">
            Weather & Road Tracking
          </h3>
        </div>
        
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Get updates on temperature, humidity, and road conditions to plan your ride better.
        </p>
        
        <div className="mt-auto">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
              initial={{ width: 0 }}
              whileInView={{ width: "78%" }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Coverage</span>
            <span>Global</span>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Stats section */}
    <motion.div 
      className="mt-20 max-w-6xl mx-auto bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 border border-gray-800 grid md:grid-cols-4 gap-8 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {[
        { value: "99.7%", label: "Accuracy" },
        { value: "24/7", label: "Monitoring" },
        { value: "10,000+", label: "Users" },
        { value: "60%", label: "Faster Response" }
      ].map((stat, i) => (
        <div key={i} className="p-4">
          <motion.div
            className="text-4xl font-bold mb-2 text-yellow-500"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
          >
            {stat.value}
          </motion.div>
          <div className="text-gray-300">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  </div>
</motion.section>
        {/* ===== CONTACT / WARRANTY SECTION ===== */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="py-32"
        >
          <div className="py-16 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="backdrop-blur-md bg-white/10 p-8 rounded-2xl max-w-md w-full border border-white/20 mx-4"
            >
              <h2 className="text-4xl font-bold mb-6 text-white text-center">
                Warranty & Replacement
              </h2>
              <p className="text-gray-300 text-center mb-6">
                Facing an issue with RhinoFuse? Fill out the form to request a replacement
                or claim warranty support.
              </p>

              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="p-3 rounded bg-gray-800/50 border border-gray-600 text-white focus:outline-none focus:border-white transition"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="p-3 rounded bg-gray-800/50 border border-gray-600 text-white focus:outline-none focus:border-white transition"
                />
                <input
                  type="text"
                  placeholder="Product Serial Number"
                  className="p-3 rounded bg-gray-800/50 border border-gray-600 text-white focus:outline-none focus:border-white transition"
                />
                <textarea
                  placeholder="Describe the issue"
                  rows="4"
                  className="p-3 rounded bg-gray-800/50 border border-gray-600 text-white focus:outline-none focus:border-white transition"
                ></textarea>
                <button className="bg-white text-black hover:bg-gray-200 py-3 rounded-lg font-semibold transition">
                  Submit Request
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ===== FOOTER ===== */}
        <footer className="bg-black/90 text-white">
          <div className="max-w-screen-xl mx-auto px-6 py-12 md:px-8">
            <div className="flex flex-col md:flex-row md:justify-between gap-10">
              <div className="md:flex-1">
                <div className="flex items-center mb-4">
                  <div className="h-8 w-8 bg-white rounded-fRFull flex items-center justify-center">
                    <span className="text-black font-bold"><img src="/logo-removebg.png" alt="" /></span>
                  </div>
                  <span className="ml-2 text-xl font-bold">RhinoFuse</span>
                </div>
                <p className="text-sm leading-relaxed">
                  Subscribe to our plans and get access to our Premium Analytics Dashboard, real-time click tracking, and advanced monitoring tools.
                </p>
                <div className="mt-4">
                  <p className="text-sm">📧 support@rhinofuse.com</p>
                  <p className="text-sm">📞 +91-9876543210</p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-10">
                {footerNavs.map((group, i) => (
                  <div key={i}>
                    <h4 className="font-semibold text-lg mb-3 text-white">{group.label}</h4>
                    <ul className="space-y-2 text-sm">
                      {group.items.map((item, j) => (
                        <li key={j}>
                          <a
                            href={item.href}
                            className="hover:text-[#CCCCCC] transition-colors duration-200"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div>
                  <p className="text-sm mb-3">Stay updated with our latest offers and features.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-sm">
              <div>&copy; {new Date().getFullYear()} RhinoFuse. All rights reserved.</div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#CCCCCC] transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#CCCCCC] transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="hover:text-[#CCCCCC] transition-colors"
                >
                  <Globe2 className="w-4 h-4" />
                </a>
                <button
                  onClick={scrollToTop}
                  className="hover:text-[#CCCCCC] transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-center text-xs text-gray-400 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainPage;
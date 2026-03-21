import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function YarineEasterEgg() {
  const [mounted, setMounted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate random buildings
  const buildings = Array.from({ length: 40 }).map((_, i) => {
    const height = Math.random() * 50 + 20; // 20vh to 70vh
    const width = Math.random() * 5 + 3; // 3vw to 8vw
    const left = Math.random() * 100; // 0vw to 100vw
    const color = `hsl(${Math.random() * 60 + 200}, 80%, ${Math.random() * 10 + 10}%)`; // Dark blues/purples
    const delay = Math.random() * 2;
    return { height, width, left, color, delay, id: i };
  });

  if (!started) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <button 
          onClick={() => setStarted(true)}
          className="px-8 py-4 text-3xl font-bold font-mono text-cyan-400 border-2 border-cyan-400 rounded hover:bg-cyan-400 hover:text-black transition-colors duration-300 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
        >
          [ HAZ CLICK AQUÌ ]
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-950 flex flex-col items-center justify-center font-sans">
      
      {/* Dynamic Starry Sky */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 150 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.8 + 0.2,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Cyberpunk City Skyline */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 z-10 overflow-hidden perspective-1000">
        <motion.div 
          className="relative w-full h-full flex items-end"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {buildings.map((b) => (
            <motion.div
              key={`building-${b.id}`}
              className="absolute bottom-0 border-t-2 border-r-2 border-l-2 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
              style={{
                height: `${b.height}vh`,
                width: `${b.width}vw`,
                left: `${b.left}vw`,
                backgroundColor: b.color,
                borderColor: `hsl(${Math.random() * 60 + 260}, 100%, 50%)`, // Neon borders
                zIndex: Math.floor(b.height)
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: b.delay, ease: "easeOut", transformOrigin: "bottom" }}
            >
              {/* Windows */}
              <div className="w-full h-full flex flex-wrap content-start p-1 gap-1 overflow-hidden">
                {Array.from({ length: Math.floor(b.height * b.width / 5) }).map((_, j) => (
                  <motion.div
                    key={`win-${j}`}
                    className="w-1 h-3"
                    style={{ backgroundColor: Math.random() > 0.7 ? '#fde047' : '#1e1b4b' }}
                    animate={Math.random() > 0.8 ? { opacity: [1, 0, 1] } : {}}
                    transition={{ duration: Math.random() * 5 + 1, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
          
          {/* Cyberpunk Ground Grid */}
          <div className="absolute bottom-0 left-0 w-full h-1/4 bg-[linear-gradient(transparent_0%,rgba(236,72,153,0.3)_100%)] border-t border-pink-500 shadow-[0_-5px_30px_rgba(236,72,153,0.5)] z-50">
             <div className="w-full h-full grid grid-cols-12 gap-2 opacity-30 transform rotate-x-60 scale-150">
                 {Array.from({length: 48}).map((_, i) => (
                    <div key={i} className="border border-cyan-500 w-full h-10"></div>
                 ))}
             </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Bolivian Images */}
      {mounted && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <motion.img 
            src="https://loremflickr.com/800/600/bolivia,lapaz,illimani" 
            alt="Stock Bolivia 1" 
            className="absolute top-10 left-10 w-48 rounded-lg shadow-2xl opacity-80"
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.img 
            src="https://loremflickr.com/800/600/bolivia,salardeuyuni" 
            alt="Stock Bolivia 2" 
            className="absolute bottom-40 right-10 w-56 rounded-full shadow-[0_0_20px_blue] opacity-80"
            animate={{ x: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.img 
            src="https://loremflickr.com/800/600/bolivia,culture" 
            alt="Stock Bolivia 3" 
            className="absolute top-20 right-20 w-32 rounded-lg shadow-2xl opacity-90"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Main Extravagant Text */}
      <div className="relative z-50 flex flex-col items-center pointer-events-none">
        {mounted && (
          <motion.h1
            className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 drop-shadow-[0_0_20px_rgba(255,255,0,0.8)] filter text-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: [0, 180, -90, 360, 45, -360, 0] // Erratic rotation
            }}
            transition={{ 
              scale: { type: "spring", stiffness: 100, damping: 10, delay: 0.5 },
              rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ fontFamily: "'Inter', sans-serif", WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}
          >
            Hola Yarim!
          </motion.h1>
        )}
        
        {mounted && (
          <motion.p
            className="mt-6 text-2xl md:text-5xl text-yellow-300 font-bold tracking-[0.1em] uppercase drop-shadow-[0_0_10px_rgba(255,255,0,0.8)] text-center px-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
          >
            VES QUE SI HAGO MIS PAGINAS
          </motion.p>
        )}

        {/* Crazy floating orb */}
         <motion.div
            className="absolute top-1/2 left-1/2 -z-10 w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-[100px] opacity-70"
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 90, 0],
              borderRadius: ["50%", "30%", "50%"],
              backgroundColor: ["#ef4444", "#eab308", "#22c55e", "#ef4444"] // Red, yellow, green
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transform: "translate(-50%, -50%)" }}
          />
      </div>

      {/* Hidden YouTube Iframe for Background Music (Himno Nacional de Bolivia) */}
      <iframe 
        width="0" 
        height="0" 
        src="https://www.youtube.com/embed/OBQjPVEDzGg?autoplay=1&loop=1&playlist=OBQjPVEDzGg" 
        title="Himno Nacional de Bolivia" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        style={{ display: 'none' }}
      ></iframe>

    </div>
  );
}

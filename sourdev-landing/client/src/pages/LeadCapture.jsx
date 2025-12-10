import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageSquare, Clock, XCircle, CheckCircle, Zap } from 'lucide-react';
import Scene3D from '../components/LeadCapture/Scene3D';
import api from '../lib/api';

const StepContainer = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl mx-auto p-4"
    >
        {children}
    </motion.div>
);

export default function LeadCapture() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        pain_point: '',
        full_name: '',
        whatsapp_number: '',
        email: '',
        selected_plan: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [isAbsorbing, setIsAbsorbing] = useState(false);

    // Simple SFX Generator
    const playSound = (type) => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (type === 'next') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        } else if (type === 'success') {
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
            oscillator.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.5);
        }
    };

    const handleNext = (data) => {
        playSound('next');
        setIsAbsorbing(true); // Trigger 3D absorb
        setTimeout(() => setIsAbsorbing(false), 500); // Reset after animation

        setFormData({ ...formData, ...data });
        setStep(step + 1);
    };

    const submitLead = async (finalData) => {
        setLoading(true);
        const payload = { ...formData, ...finalData };

        try {
            await api.post('/leads', payload);
            playSound('success');
            setSuccess(true);
            // "Explosion" effect can be triggered here visually
        } catch (error) {
            console.error(error);
            alert("Error al conectar con el núcleo. Intenta de nuevo.");
            setLoading(false);
        }
    };

    // Step 0: Intro
    const StepIntro = () => (
        <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue drop-shadow-[0_0_15px_rgba(163,230,53,0.5)]">
                AUTOMATIZA<br />TU MUNDO
            </h1>
            <p className="text-xl text-gray-300 max-w-md mx-auto">
                Deja de perder tiempo respondiendo lo mismo 100 veces.
                Únete a la revolución.
            </p>
            <button
                onClick={() => setStep(1)}
                className="group relative px-8 py-4 bg-neon-green text-black font-bold rounded-full text-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(163,230,53,0.6)]"
            >
                <span className="flex items-center gap-2">
                    INICIAR SISTEMA <Zap className="w-6 h-6 fill-current" />
                </span>
            </button>
        </div>
    );

    // Step 1: Pain Points
    const StepPain = () => (
        <div className="text-center space-y-6 bg-black/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
            <h2 className="text-3xl font-bold text-white">¿Cuál es tu peor pesadilla?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { icon: Clock, label: "No tengo tiempo", value: "No Time" },
                    { icon: MessageSquare, label: "Demasiados DMs", value: "Spam" },
                    { icon: XCircle, label: "Perder ventas", value: "Lost Sales" }
                ].map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => handleNext({ pain_point: opt.value })}
                        className="flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-neon-green/20 hover:border-neon-green transition-all group"
                    >
                        <opt.icon className="w-10 h-10 mb-3 text-neon-blue group-hover:text-neon-green transition-colors" />
                        <span className="text-white font-medium">{opt.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    // Step 2: Data Capture
    const StepData = () => {
        const [localData, setLocalData] = useState({ full_name: '', whatsapp_number: '', email: '' });

        return (
            <div className="bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-neon-purple/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Identificación Requerida</h2>
                <div className="space-y-4">
                    <input
                        type="text" placeholder="Nombre Completo"
                        className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-white focus:border-neon-green focus:outline-none transition-colors"
                        onChange={e => setLocalData({ ...localData, full_name: e.target.value })}
                    />
                    <input
                        type="text" placeholder="WhatsApp (Ej: 591...)"
                        className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-white focus:border-neon-green focus:outline-none transition-colors"
                        onChange={e => setLocalData({ ...localData, whatsapp_number: e.target.value })}
                    />
                    <input
                        type="email" placeholder="Correo Electrónico"
                        className="w-full bg-black/40 border border-white/20 rounded-xl p-4 text-white focus:border-neon-green focus:outline-none transition-colors"
                        onChange={e => setLocalData({ ...localData, email: e.target.value })}
                    />
                    <button
                        disabled={!localData.full_name || !localData.whatsapp_number}
                        onClick={() => handleNext(localData)}
                        className="w-full py-4 bg-gradient-to-r from-neon-purple to-neon-blue rounded-xl font-bold text-white text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        );
    };

    // Step 3: Plan Selection & Submit
    const StepPlan = () => (
        <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">Elige tu Arma</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { name: 'Starter', price: '$19', color: 'border-white/20' },
                    { name: 'Pro', price: '$49', color: 'border-neon-green shadow-[0_0_15px_rgba(163,230,53,0.3)]' },
                    { name: 'Enterprise', price: 'Custom', color: 'border-neon-purple' }
                ].map((plan) => (
                    <button
                        key={plan.name}
                        onClick={() => submitLead({ selected_plan: plan.name })}
                        className={`p-6 bg-black/80 backdrop-blur rounded-2xl border-2 ${plan.color} hover:scale-105 transition-transform text-left`}
                    >
                        <div className="text-gray-400 text-sm mb-1">{plan.name}</div>
                        <div className="text-2xl font-bold text-white">{plan.price}</div>
                    </button>
                ))}
            </div>
            {loading && <p className="text-neon-green animate-pulse">Sincronizando con el Mainframe...</p>}
        </div>
    );

    // Success Screen
    const StepSuccess = () => (
        <div className="text-center space-y-6">
            <div className="inline-flex p-4 rounded-full bg-neon-green/20 mb-4">
                <CheckCircle className="w-16 h-16 text-neon-green" />
            </div>
            <h2 className="text-4xl font-bold text-white">¡SISTEMA ACTIVADO!</h2>
            <p className="text-gray-300 text-xl">
                Hemos recibido tus datos. Uno de nuestros agentes de élite te contactará por WhatsApp en breve.
            </p>
            <a href="/" className="inline-block mt-8 text-neon-blue hover:text-white underline">
                Volver a la Base
            </a>
        </div>
    );

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Scene3D isAbsorbing={isAbsorbing} />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-4">
                <AnimatePresence mode="wait">
                    {success ? (
                        <StepContainer key="success"><StepSuccess /></StepContainer>
                    ) : (
                        <>
                            {step === 0 && <StepContainer key="0"><StepIntro /></StepContainer>}
                            {step === 1 && <StepContainer key="1"><StepPain /></StepContainer>}
                            {step === 2 && <StepContainer key="2"><StepData /></StepContainer>}
                            {step === 3 && <StepContainer key="3"><StepPlan /></StepContainer>}
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

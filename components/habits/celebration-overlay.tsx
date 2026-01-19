import React, { useEffect, useState } from 'react';

import { AnimatePresence,motion } from 'framer-motion';
import { Heart, PartyPopper,Sparkles, Star, Zap } from 'lucide-react';

import { Button } from "@/components/ui/button";

const celebrationEmojis = ['🎉', '✨', '🌟', '💫', '🎊', '⭐', '💪', '🙌'];

const ShineParticle = ({ delay, x, y }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
        animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            x: x,
            y: y,
        }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
        className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"
        style={{ left: '50%', top: '50%' }}
    />
);

const FloatingEmoji = ({ emoji, delay }) => (
    <motion.span
        initial={{ y: 0, opacity: 0, scale: 0 }}
        animate={{
            y: -150,
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0.8],
        }}
        transition={{ duration: 2, delay, ease: "easeOut" }}
        className="absolute text-4xl"
        style={{
            left: `${Math.random() * 60 + 20}%`,
            bottom: '30%'
        }}
    >
        {emoji}
    </motion.span>
);

export default function CelebrationOverlay({ isOpen, onClose, celebration, habitName }) {
    const [particles, setParticles] = useState([]);
    const [emojis, setEmojis] = useState([]);

    useEffect(() => {
        if (isOpen) {
            // Generate particles
            const newParticles = Array.from({ length: 20 }, (_, i) => ({
                id: i,
                delay: Math.random() * 0.5,
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
            }));
            setParticles(newParticles);

            // Generate emojis
            const newEmojis = Array.from({ length: 8 }, (_, i) => ({
                id: i,
                emoji: celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)],
                delay: i * 0.15,
            }));
            setEmojis(newEmojis);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-sm bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Shine Particles */}
                        <div className="absolute inset-0 pointer-events-none">
                            {particles.map((p) => (
                                <ShineParticle key={p.id} delay={p.delay} x={p.x} y={p.y} />
                            ))}
                        </div>

                        {/* Floating Emojis */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {emojis.map((e) => (
                                <FloatingEmoji key={e.id} emoji={e.emoji} delay={e.delay} />
                            ))}
                        </div>

                        {/* Glowing ring */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-amber-300/30 to-orange-300/30 blur-2xl"
                        />

                        <div className="relative z-10 text-center">
                            {/* Main Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
                                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-300/50"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 0.5, delay: 0.6, repeat: 2 }}
                                >
                                    <PartyPopper className="w-12 h-12 text-white" />
                                </motion.div>
                            </motion.div>

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-bold text-stone-800 mb-2"
                            >
                                You did it! ✨
                            </motion.h2>

                            {/* Celebration Prompt */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mb-6"
                            >
                                <p className="text-stone-500 text-sm mb-3">Now celebrate! Do your thing:</p>
                                <div className="bg-white/80 rounded-2xl p-4 border border-amber-200 shadow-sm">
                                    <p className="text-lg font-medium text-amber-700">
                                        "{celebration}"
                                    </p>
                                </div>
                            </motion.div>

                            {/* Shine Fact */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-start gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200 text-left mb-6"
                            >
                                <Sparkles className="w-4 h-4 text-stone-600 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-stone-700">
                                    <strong>The Shine:</strong> Celebrating right after your tiny habit wires it into your brain. Feel that positive emotion!
                                </p>
                            </motion.div>

                            {/* Close Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <Button
                                    onClick={onClose}
                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl py-6 text-lg font-medium shadow-lg shadow-amber-300/30"
                                >
                                    <Star className="w-5 h-5 mr-2" />
                                    I celebrated!
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
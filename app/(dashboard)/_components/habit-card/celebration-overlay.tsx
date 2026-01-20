import React, { useMemo } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { PartyPopper, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HabitUI } from "@/lib/habits/type";

const celebrationEmojis = ["🎉", "✨", "🌟", "💫", "🎊", "⭐", "💪", "🙌"];

interface Particle {
	id: number;
	delay: number;
	x: number;
	y: number;
}

interface EmojiInstance {
	id: number;
	emoji: string;
	delay: number;
	left: string;
}

interface CelebrationOverlayProps {
	isOpen: boolean;
	onClose: () => void;
	celebration: HabitUI["celebration"];
}

interface ShineParticleProps {
	delay: number;
	x: number;
	y: number;
}

function ShineParticle({ delay, x, y }: ShineParticleProps) {
	return (
		<motion.div
			initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
			animate={{
				scale: [0, 1.5, 0],
				opacity: [0, 1, 0],
				x: x,
				y: y,
			}}
			transition={{ duration: 1.2, delay, ease: "easeOut" }}
			className="absolute h-3 w-3 rounded-full bg-linear-to-br from-amber-400 to-orange-500"
			style={{ left: "50%", top: "50%" }}
		/>
	);
}

interface FloatingEmojiProps {
	emoji: string;
	delay: number;
	left: string;
}

function FloatingEmoji({ emoji, delay, left }: FloatingEmojiProps) {
	return (
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
				left: left,
				bottom: "30%",
			}}
		>
			{emoji}
		</motion.span>
	);
}

export default function CelebrationOverlay({
	celebration,
	isOpen,
	onClose,
}: CelebrationOverlayProps) {
	const generateParticles = (): Particle[] =>
		Array.from({ length: 20 }, (_, i) => ({
			id: i,
			delay: Math.random() * 0.5,
			x: (Math.random() - 0.5) * 300,
			y: (Math.random() - 0.5) * 300,
		}));

	const generateEmojis = (): EmojiInstance[] =>
		Array.from({ length: 8 }, (_, i) => ({
			id: i,
			emoji: celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)],
			delay: i * 0.15,
			left: `${Math.random() * 60 + 20}%`,
		}));

	const particles = useMemo<Particle[]>(() => (isOpen ? generateParticles() : []), [isOpen]);

	const emojis = useMemo<EmojiInstance[]>(() => (isOpen ? generateEmojis() : []), [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
					onClick={onClose}
				>
					<motion.div
						initial={{ scale: 0.8, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.8, opacity: 0, y: 20 }}
						transition={{ type: "spring", damping: 20, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
						className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-linear-to-br from-amber-50 via-white to-orange-50 p-8 shadow-2xl"
					>
						{/* Shine Particles */}
						<div className="pointer-events-none absolute inset-0">
							{particles.map((p) => (
								<ShineParticle key={p.id} delay={p.delay} x={p.x} y={p.y} />
							))}
						</div>

						{/* Floating Emojis */}
						<div className="pointer-events-none absolute inset-0 overflow-hidden">
							{emojis.map((e) => (
								<FloatingEmoji key={e.id} emoji={e.emoji} delay={e.delay} left={e.left} />
							))}
						</div>

						{/* Glowing ring */}
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0.3] }}
							transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
							className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-amber-300/30 to-orange-300/30 blur-2xl"
						/>

						<div className="relative z-10 text-center">
							{/* Main Icon */}
							<motion.div
								initial={{ scale: 0, rotate: -180 }}
								animate={{ scale: 1, rotate: 0 }}
								transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
								className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-300/50"
							>
								<motion.div
									animate={{ rotate: [0, 10, -10, 0] }}
									transition={{ duration: 0.5, delay: 0.6, repeat: 2 }}
								>
									<PartyPopper className="h-12 w-12 text-white" />
								</motion.div>
							</motion.div>

							{/* Title */}
							<motion.h2
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className="mb-2 text-2xl font-bold text-stone-800"
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
								<p className="mb-3 text-sm text-stone-500">Now celebrate! Do your thing:</p>
								<div className="rounded-2xl border border-amber-200 bg-white/80 p-4 shadow-sm">
									<p className="text-lg font-medium text-amber-700">"{celebration}"</p>
								</div>
							</motion.div>

							{/* Shine Fact */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.6 }}
								className="mb-6 flex items-start gap-2 rounded-xl border border-stone-200 bg-stone-50 p-3 text-left"
							>
								<Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-stone-600" />
								<p className="text-xs text-stone-700">
									<strong>The Shine:</strong> Celebrating right after your tiny habit wires it into
									your brain. Feel that positive emotion!
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
									className="w-full rounded-xl bg-linear-to-r from-amber-500 to-orange-500 py-6 text-lg font-medium text-white shadow-lg shadow-amber-300/30 hover:from-amber-600 hover:to-orange-600"
								>
									<Star className="mr-2 h-5 w-5" />I celebrated!
								</Button>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

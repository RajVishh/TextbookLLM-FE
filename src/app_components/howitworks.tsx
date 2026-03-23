import { motion } from "motion/react";

export const HowItWorks = () => {
    const steps = [
        { title: "Upload", description: "Drop your PDFs, notes, or textbook scans into the platform." },
        { title: "Analyze", description: "Our AI processes the content, building a semantic map of your data." },
        { title: "Interact", description: "Ask questions, generate study guides, and master your subjects." }
    ];

    return (
        <section id="how-it-works" className="py-32 bg-white/5 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">From raw data to deep understanding</h2>
                        <div className="space-y-12">
                            {steps.map((step, index) => (
                                <div key={index} className="flex gap-6">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-brand-orange/50 flex items-center justify-center text-brand-orange font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-white/50">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-orange/20 to-purple-500/10 border border-white/10 flex items-center justify-center overflow-hidden">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className="w-64 h-64 bg-dark-bg rounded-2xl border border-white/20 shadow-2xl flex flex-col p-4 gap-3"
                            >
                                <div className="h-4 w-3/4 bg-white/10 rounded" />
                                <div className="h-4 w-full bg-white/10 rounded" />
                                <div className="h-4 w-1/2 bg-brand-orange/20 rounded" />
                                <div className="mt-auto h-10 w-full bg-brand-orange rounded-lg flex items-center justify-center text-xs font-bold text-black">
                                    PROCESSING...
                                </div>
                            </motion.div>
                            {/* Decorative particles */}
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [0, -100, 0],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{ duration: 3 + i, repeat: Infinity, delay: i }}
                                    className="absolute w-1 h-1 bg-brand-orange rounded-full"
                                    style={{ left: `${20 + i * 15}%`, bottom: '10%' }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
import { motion } from "motion/react";

export const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-orange/30 transition-all group"
    >
        <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-6 group-hover:bg-brand-orange/20 transition-colors">
            <Icon className="text-brand-orange w-6 h-6" />
        </div>
        <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
        <p className="text-white/50 leading-relaxed">{description}</p>
    </motion.div>
);
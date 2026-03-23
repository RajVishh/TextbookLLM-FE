import { FeatureCard } from "./featurecard";
import {
    BrainCircuit,
    Search,
    Zap,
} from "lucide-react";

export const Features = () => {
    return (
        <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Supercharge your learning</h2>
                <p className="text-white/50 max-w-2xl mx-auto text-lg">
                    We combine advanced language models with your personal study materials to create a custom intelligence layer for your education.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                    icon={BrainCircuit}
                    title="AI Summarization"
                    description="Automatically distill complex chapters into concise, actionable summaries and key takeaways."
                    delay={0.1}
                />
                <FeatureCard
                    icon={Search}
                    title="Semantic Search"
                    description="Find exactly what you need across thousands of pages of notes using natural language queries."
                    delay={0.2}
                />
                <FeatureCard
                    icon={Zap}
                    title="Instant Quizzes"
                    description="Generate personalized practice tests based on your materials to reinforce your knowledge."
                    delay={0.3}
                />
            </div>
        </section>
    );
};

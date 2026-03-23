import { CheckCircle2 } from "lucide-react";

export const Pricing = () => {
    const plans = [
        { name: "Student", price: "Free", features: ["Up to 3 textbooks", "Basic AI search", "Community support"] },
        { name: "Pro", price: "$12", features: ["Unlimited textbooks", "Advanced summarization", "Custom quiz generation", "Priority support"], recommended: true },
        { name: "Team", price: "$49", features: ["Collaborative study rooms", "Shared intelligence", "Admin dashboard", "API access"] }
    ];

    return (
        <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Simple, transparent pricing</h2>
                <p className="text-white/50">Choose the plan that fits your learning journey.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`p-8 rounded-3xl border ${plan.recommended ? "border-brand-orange bg-brand-orange/5" : "border-white/10 bg-white/5"} flex flex-col`}
                    >
                        <h3 className="text-lg font-medium text-white/70 mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            {plan.price !== "Free" && <span className="text-white/50">/mo</span>}
                        </div>
                        <ul className="space-y-4 mb-10 flex-grow">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                                    <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.recommended ? "bg-brand-orange text-white hover:bg-brand-orange/90" : "bg-white/10 text-white hover:bg-white/20"}`}>
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};
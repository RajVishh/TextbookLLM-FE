import { BookOpen, Twitter, Github, Linkedin } from "lucide-react"

export const Footer = () => {
    return (
        <footer className="py-20 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
                                <BookOpen className="text-black w-5 h-5" />
                            </div>
                            <span className="text-xl font-display font-bold tracking-tight">
                                Textbook<span className="text-brand-orange">LLM</span>
                            </span>
                        </div>
                        <p className="text-white/50 max-w-sm mb-8">
                            The intelligent layer for your education. Empowering students and researchers to master any subject with the power of AI.
                        </p>
                        <div className="flex gap-4">
                            <Twitter className="w-5 h-5 text-white/50 hover:text-brand-orange cursor-pointer transition-colors" />
                            <Github className="w-5 h-5 text-white/50 hover:text-brand-orange cursor-pointer transition-colors" />
                            <Linkedin className="w-5 h-5 text-white/50 hover:text-brand-orange cursor-pointer transition-colors" />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            <li className="hover:text-brand-orange cursor-pointer">Features</li>
                            <li className="hover:text-brand-orange cursor-pointer">Security</li>
                            <li className="hover:text-brand-orange cursor-pointer">Roadmap</li>
                            <li className="hover:text-brand-orange cursor-pointer">Pricing</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-white/50">
                            <li className="hover:text-brand-orange cursor-pointer">About</li>
                            <li className="hover:text-brand-orange cursor-pointer">Careers</li>
                            <li className="hover:text-brand-orange cursor-pointer">Contact</li>
                            <li className="hover:text-brand-orange cursor-pointer">Privacy</li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
                    <p>© 2026 TextbookLLM. All rights reserved.</p>
                    <p>Built with intelligence for the next generation of learners.</p>
                </div>
            </div>
        </footer>
    );
};

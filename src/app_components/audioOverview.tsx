import { useState, useEffect, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import { generateAudioOverview } from "@/lib/utils";

export const AudioOverview = ({ chatId, trigger }: { chatId: string, trigger: number }) => {

    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (trigger > 0) {
            handleAudioGeneration();
        }
    }, [trigger, chatId]);

    const handleAudioGeneration = async () => {
        setLoading(true);
        setError(null);
        setIsModalOpen(false);
        try {
            const url = await generateAudioOverview(chatId);
            if (url) {
                setAudioUrl(url);
            }
        } catch (error: any) {
            console.error("Failed to load audio", error);
            setError("Failed to generate audio overview.");
        } finally {
            setLoading(false);
        }
    }

    if (trigger === 0) return null;

    return (
        <>
            {loading && (
                <div className="flex gap-2 px-4 py-2 bg-[#151515] text-white rounded-full border border-[#2F2F2F] items-center w-full h-[40px] shrink-0">
                    <Spinner className="text-white w-4 h-4" />
                    <p className="text-xs">Generating podcast...</p>
                </div>
            )}

            {!loading && audioUrl && !error && (
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="flex gap-2 px-4 py-2 bg-[#D97857] hover:bg-[#D97857]/80  cursor-pointer text-white rounded-full border border-[#2F2F2F] items-center w-full h-[40px] shrink-0 transition-colors justify-center"
                >
                    <img src="/sound.png" className="w-[16px] opacity-70" alt="" />
                    <p className="text-xs font-medium">Audio ready - Play</p>
                </div>
            )}

            {error && (
                <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-full text-sm w-fit shrink-0">
                    {error}
                </div>
            )}

            {isModalOpen && audioUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8">
                    <div className="w-full max-w-md bg-[#111111] border border-[#2F2F2F] rounded-xl flex flex-col overflow-hidden shadow-2xl relative">
                        <div className="flex justify-between items-center p-4 border-b border-[#2F2F2F] bg-[#0f0f0f]">
                            <h2 className="text-white font-medium flex items-center gap-2">
                                <img src="/sound.png" className="w-[20px]" alt="" />
                                Audio Overview
                            </h2>
                            <button
                                onClick={() => {
                                    if (audioRef.current) audioRef.current.pause();
                                    setIsModalOpen(false);
                                }}
                                className="text-gray-400 hover:text-white px-3 py-1 rounded bg-[#1a1a1a] border border-[#2F2F2F] hover:bg-[#2a2a2a] transition-colors text-sm"
                            >
                                Close
                            </button>
                        </div>
                        <div className="w-full flex flex-col items-center justify-center p-8">
                            <div className="w-24 h-24 bg-[#1a1a1a] rounded-full border border-[#2F2F2F] flex items-center justify-center mb-8 shadow-inner">
                                <img src="/sound.png" className="w-[40px] opacity-80" alt="" />
                            </div>
                            <h3 className="text-white text-lg font-medium mb-2">Deep Dive</h3>
                            <p className="text-gray-400 text-sm mb-8 text-center">Listen to an AI-generated radio host discuss your documents.</p>

                            <audio
                                ref={audioRef}
                                src={audioUrl}
                                controls
                                autoPlay
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

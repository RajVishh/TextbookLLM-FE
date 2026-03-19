import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Spinner } from "@/components/ui/spinner";
import { generateFlashcards } from "@/lib/utils";


export const Flashcards = ({ chatId, trigger }: { chatId: string, trigger: number }) => {

    const [question, setQuestions] = useState<string[]>([]);
    const [answer, setAnswers] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (trigger > 0) {
            handleFlashCardGeneration();
        }
    }, [trigger, chatId]);

    const handleFlashCardGeneration = async () => {
        setLoading(true);
        setError(null);
        setIsModalOpen(false);
        try {
            const response = await generateFlashcards(chatId);
            const items = response?.flashcards || [];

            setQuestions(items.map((item: any) => item.question));
            setAnswers(items.map((item: any) => item.answer));
        } catch (error: any) {
            console.error("Failed to load flashcards", error);
            setError(error.response?.data?.error || error.message || "Failed to generate flashcards.");
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
                    <p className="text-xs">Generating flashcards...</p>
                </div>
            )}

            {!loading && question.length > 0 && !error && (
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="flex gap-2 px-4 py-2 bg-[#D97857] hover:bg-[#D97857]/80 cursor-pointer text-white rounded-full border border-[#2F2F2F] items-center w-full h-[40px] shrink-0 transition-colors justify-center"
                >
                    <img src="/flash-cards_2.png" className="w-[16px] opacity-70" alt="" />
                    <p className="text-xs font-medium">Flashcards ready - View</p>
                </div>
            )}

            {error && (
                <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-full text-sm w-fit shrink-0">
                    {error}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8">
                    <div className="w-full h-full bg-[#0A0A0A] border border-[#2F2F2F] rounded-xl flex flex-col overflow-hidden shadow-2xl relative">
                        <div className="flex justify-between items-center p-4 border-b border-[#2F2F2F] bg-[#0f0f0f]">
                            <h2 className="text-white font-medium flex items-center gap-2">
                                <img src="/flash-cards_2.png" className="w-[20px]" alt="" />
                                Knowledge Flashcards
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white px-3 py-1 rounded bg-[#1a1a1a] border border-[#2F2F2F] hover:bg-[#2a2a2a] transition-colors text-sm"
                            >
                                Close
                            </button>
                        </div>
                        <div className="flex-1 w-full bg-[#111111] flex flex-col items-center justify-center p-8">
                            <Carousel className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                                <CarouselContent>
                                    {question.map((q, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card className="bg-[#151515] border-[#2F2F2F] text-white">
                                                    <CardContent className="flex flex-col aspect-[4/3] items-center justify-center p-8 text-center gap-6 overflow-y-auto">
                                                        <span className="text-2xl font-semibold text-[#D97857]">{q}</span>
                                                        <span className="text-lg text-gray-300">{answer[index]}</span>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="bg-[#151515] border-[#2F2F2F] text-white hover:bg-[#2A2A28] hover:text-white" />
                                <CarouselNext className="bg-[#151515] border-[#2F2F2F] text-white hover:bg-[#2A2A28] hover:text-white" />
                            </Carousel>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
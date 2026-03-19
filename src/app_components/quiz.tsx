import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner";
import { generateQuiz } from "@/lib/utils";

type Question = {
    question: string;
    options: string[];
    answer: string;
};

export const Quiz = ({ chatId, trigger }: { chatId: string, trigger: number }) => {

    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (trigger > 0) {
            handleQuizGeneration();
        }
    }, [trigger, chatId]);

    const handleQuizGeneration = async () => {
        setLoading(true);
        setError(null);
        setIsModalOpen(false);
        setCurrentIndex(0);
        setSelectedAnswers({});
        setShowResults(false);
        try {
            const response = await generateQuiz(chatId);
            const items = response?.quiz || [];

            // Validate response 
            if (!Array.isArray(items) || items.length === 0) {
                throw new Error("Invalid response format from server");
            }

            setQuestions(items);
        } catch (error: any) {
            console.error("Failed to load quiz", error);
            setError(error.response?.data?.error || error.message || "Failed to generate quiz.");
        } finally {
            setLoading(false);
        }
    }

    if (trigger === 0) return null;

    const handleSelectOption = (option: string) => {
        if (showResults) return;
        setSelectedAnswers(prev => ({ ...prev, [currentIndex]: option }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    const score = Object.keys(selectedAnswers).reduce((acc, indexStr) => {
        const idx = parseInt(indexStr);
        if (selectedAnswers[idx] === questions[idx].answer) {
            return acc + 1;
        }
        return acc;
    }, 0);

    return (
        <>
            {loading && (
                <div className="flex gap-2 px-4 py-2 bg-[#151515] text-white rounded-full border border-[#2F2F2F] items-center w-full h-[40px] shrink-0">
                    <Spinner className="text-white w-4 h-4" />
                    <p className="text-xs">Generating quiz...</p>
                </div>
            )}

            {!loading && questions.length > 0 && !error && (
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="flex gap-2 px-4 py-2 bg-[#D97857] hover:bg-[#D97857]/80  cursor-pointer text-white rounded-full border border-[#2F2F2F] items-center w-full h-[40px] shrink-0 transition-colors justify-center"
                >
                    <img src="/qna.png" className="w-[16px] opacity-70" alt="" />
                    <p className="text-xs font-medium">Quiz ready - View</p>
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
                                <img src="/qna.png" className="w-[20px]" alt="" />
                                Knowledge Quiz
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white px-3 py-1 rounded bg-[#1a1a1a] border border-[#2F2F2F] hover:bg-[#2a2a2a] transition-colors text-sm"
                            >
                                Close
                            </button>
                        </div>
                        <div className="flex-1 w-full bg-[#111111] flex flex-col items-center justify-center p-8 overflow-y-auto">

                            {questions.length > 0 && (
                                <div className="w-full max-w-2xl">
                                    <div className="mb-4 flex justify-between items-center text-gray-400 text-sm">
                                        <span>Question {currentIndex + 1} of {questions.length}</span>
                                        {showResults && (
                                            <span className="text-[#578BD9] font-medium">
                                                Score: {score} / {questions.length}
                                            </span>
                                        )}
                                    </div>

                                    <Card className="bg-[#151515] border-[#2F2F2F] text-white p-8">
                                        <h3 className="text-xl font-medium mb-6 text-white">
                                            {questions[currentIndex].question}
                                        </h3>

                                        <div className="flex flex-col gap-3">
                                            {questions[currentIndex].options?.map((option, idx) => {
                                                const isSelected = selectedAnswers[currentIndex] === option;
                                                const isCorrect = questions[currentIndex].answer === option;

                                                let buttonClass = "p-4 text-left rounded-lg border transition-colors ";

                                                if (showResults) {
                                                    if (isCorrect) {
                                                        buttonClass += "bg-green-900/30 border-green-500 text-green-100";
                                                    } else if (isSelected && !isCorrect) {
                                                        buttonClass += "bg-red-900/30 border-red-500 text-red-100";
                                                    } else {
                                                        buttonClass += "bg-[#111111] border-[#2F2F2F] text-gray-400 opacity-50";
                                                    }
                                                } else {
                                                    if (isSelected) {
                                                        buttonClass += "bg-[#578BD9]/20 border-[#578BD9] text-white";
                                                    } else {
                                                        buttonClass += "bg-[#111111] border-[#2F2F2F] text-gray-300 hover:bg-[#1A1A1A] hover:border-gray-500";
                                                    }
                                                }

                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleSelectOption(option)}
                                                        disabled={showResults}
                                                        className={buttonClass}
                                                    >
                                                        {option}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </Card>

                                    <div className="mt-8 flex justify-between">
                                        <button
                                            onClick={handlePrevious}
                                            disabled={currentIndex === 0}
                                            className="px-4 py-2 rounded bg-[#1A1A1A] border border-[#2F2F2F] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2A2A2A] transition-colors"
                                        >
                                            Previous
                                        </button>

                                        {!showResults && currentIndex === questions.length - 1 ? (
                                            <button
                                                onClick={handleSubmit}
                                                disabled={Object.keys(selectedAnswers).length === 0}
                                                className="px-6 py-2 rounded bg-[#578BD9] text-white hover:bg-[#578BD9]/80 transition-colors disabled:opacity-50"
                                            >
                                                Submit Quiz
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleNext}
                                                disabled={currentIndex === questions.length - 1}
                                                className="px-4 py-2 rounded bg-[#1A1A1A] border border-[#2F2F2F] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2A2A2A] transition-colors"
                                            >
                                                Next
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

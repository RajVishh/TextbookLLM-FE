import { useState } from "react";
import MindMap from "./mindmap";
import { Flashcards } from "./flashcards";
import { Quiz } from "./quiz";
import { AudioOverview } from "./audioOverview";

export const RightPanel = ({ chatId, onGenerationTriggered }: { chatId: string, onGenerationTriggered?: () => boolean }) => {
    const [mindmapTrigger, setMindmapTrigger] = useState(0);
    const [flashcardTrigger, setFlashcardTrigger] = useState(0);
    const [quizTrigger, setQuizTrigger] = useState(0);
    const [audioTrigger, setAudioTrigger] = useState(0);

    return (
        <div className="px-4 py-2 my-10  h-full w-full flex flex-col">
            <h1 className="text-2xl font-bold text-white mb-4 shrink-0">Studio</h1>

            {!chatId ? (
                <div className="text-gray-400 mt-4">Select or create a chat to begin</div>
            ) : (
                <div className="flex flex-col gap-6 w-full">

                    <div className="flex flex-wrap gap-3 items-start border-b border-[#2F2F2F] pb-4">
                        <button
                            onClick={() => {
                                if (onGenerationTriggered && !onGenerationTriggered()) return;
                                setMindmapTrigger(t => t + 1);
                            }}
                            className="p-2 bg-[#151515] border border-[#2F2F2F] w-[110px] h-[40px] hover:bg-[#2A2A28] active:bg-[#111111] transition-colors text-white rounded shrink-0 flex items-center justify-center gap-2"
                        >
                            <img src="/organization.png" className="w-[20px]" alt="" />
                            <p className="text-xs">Mind map</p>
                        </button>

                        <button
                            onClick={() => {
                                if (onGenerationTriggered && !onGenerationTriggered()) return;
                                setFlashcardTrigger(t => t + 1);
                            }}
                            className="p-2 bg-[#151515] border border-[#2F2F2F] w-[110px]  h-[40px] hover:bg-[#2A2A28] active:bg-[#111111] transition-colors text-white rounded shrink-0 flex items-center justify-center gap-2"
                        >
                            <img src="/flash-cards_2.png" className="w-[20px]" alt="" />
                            <p className="text-xs">Flash cards</p>
                        </button>

                        <button
                            onClick={() => {
                                if (onGenerationTriggered && !onGenerationTriggered()) return;
                                setQuizTrigger(t => t + 1);
                            }}
                            className="p-2 bg-[#151515] border border-[#2F2F2F] w-[110px] h-[40px] hover:bg-[#2A2A28] active:bg-[#111111] transition-colors text-white rounded shrink-0 flex items-center justify-center gap-2"
                        >
                            <img src="/qna.png" className="w-[20px]" alt="" />
                            <p className="text-xs">Quiz</p>
                        </button>

                        <button
                            onClick={() => {
                                if (onGenerationTriggered && !onGenerationTriggered()) return;
                                setAudioTrigger(t => t + 1);
                            }}
                            className="p-2 bg-[#151515] border border-[#2F2F2F] w-[110px] h-[40px] hover:bg-[#2A2A28] active:bg-[#111111] transition-colors text-white rounded shrink-0 flex items-center justify-center gap-2"
                        >
                            <img src="/sound.png" className="w-[20px]" alt="" />
                            <p className="text-xs">Audio overview</p>
                        </button>


                    </div>


                    <div className="flex flex-col gap-3">
                        <MindMap chatId={chatId} trigger={mindmapTrigger} />
                        <Flashcards chatId={chatId} trigger={flashcardTrigger} />
                        <Quiz chatId={chatId} trigger={quizTrigger} />
                        <AudioOverview chatId={chatId} trigger={audioTrigger} />
                    </div>
                </div>
            )}
        </div>
    );
}
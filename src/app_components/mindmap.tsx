import { useState, useEffect } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { Spinner } from "@/components/ui/spinner"
import { generateRoot } from "@/lib/utils";

export default function MindMap({ chatId, trigger }: { chatId: string, trigger: number }) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (trigger > 0) {
            handleGenerateMindMap();
        }
    }, [trigger, chatId]);

    const handleGenerateMindMap = async () => {
        setLoading(true);
        setError(null);
        setIsModalOpen(false);
        try {
            const data = await generateRoot(chatId);
            if (data) {
                setNodes(data.nodes || []);
                setEdges(data.edges || []);
            }
        } catch (err: any) {
            console.error("Failed to generate mind map:", err);
            const backendError = err.response?.data?.error;
            setError(backendError || err.message || "Failed to generate mind map.");
        } finally {
            setLoading(false);
        }
    };

    if (trigger === 0) return null;

    return (
        <>
            {loading && (
                <div className="flex gap-2 px-4 py-2 bg-[#151515] text-white rounded-full border border-[#2F2F2F] items-center w-full h-[40px] shrink-0">
                    <Spinner className="text-white w-4 h-4" />
                    <p className="text-xs">Generating mind map...</p>
                </div>
            )}

            {!loading && nodes.length > 0 && !error && (
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="flex gap-2 px-4 py-2 bg-[#D97857] hover:bg-[#D97857]/80 cursor-pointer text-white rounded-full border border-[#2F2F2F] items-center w-full h-[40px] shrink-0 transition-colors justify-center"
                >
                    <img src="/organization.png" className="w-[16px] opacity-70" alt="" />
                    <p className="text-xs font-medium">Mind map ready - View</p>
                </div>
            )}

            {error && (
                <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-full text-sm w-fit shrink-0">
                    {error}
                </div>
            )}

            {/* Modal for Mind Map */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8">
                    <div className="w-full h-full bg-[#0A0A0A] border border-[#2F2F2F] rounded-xl flex flex-col overflow-hidden shadow-2xl relative">
                        <div className="flex justify-between items-center p-4 border-b border-[#2F2F2F] bg-[#0f0f0f]">
                            <h2 className="text-white font-medium flex items-center gap-2">
                                <img src="/organization.png" className="w-[20px]" alt="" />
                                Knowledge Mind Map
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white px-3 py-1 rounded bg-[#1a1a1a] border border-[#2F2F2F] hover:bg-[#2a2a2a] transition-colors text-sm"
                            >
                                Close
                            </button>
                        </div>
                        <div className="flex-1 w-full bg-[#111111]">
                            <ReactFlow nodes={nodes} edges={edges} fitView />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
import { UploadComponent } from "./fileuploader.tsx"
import { InputInline } from "./searchinput.tsx"
import { ChatArea } from "./chatarea.tsx"
import { useState, useEffect } from "react"
import type { ChatSession } from "./dashboard"

interface MiddlePanelProps {
    chatId: string;
    setChats: React.Dispatch<React.SetStateAction<ChatSession[]>>;
    onMessageSent?: () => boolean;
}

export const MiddlePanel = ({ chatId, setChats, onMessageSent }: MiddlePanelProps) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (!chatId) return;

        setMessages([]);
        setUploadedFiles([]);

        fetch(`http://localhost:3000/messages/${chatId}`)
            .then(res => res.json())
            .then(data => {
                if (data.messages) {
                    const normalMessages = data.messages.filter((msg: any) => msg.role !== "system" || !msg.content.startsWith("__FILE_UPLOAD__:"));
                    const fileMessages = data.messages.filter((msg: any) => msg.role === "system" && msg.content.startsWith("__FILE_UPLOAD__:"));
                    
                    setMessages(normalMessages);
                    
                    const files = fileMessages.map((msg: any) => {
                        const filename = msg.content.replace("__FILE_UPLOAD__:", "");
                        const f = new File([""], filename, { type: "text/plain" });
                        (f as any).isLoaded = true;
                        return f;
                    });
                    setUploadedFiles(files);
                }
            })
            .catch(console.error);
    }, [chatId]);

    const handleSend = async (question: string) => {
        if (!question.trim() || !chatId || isGenerating) return;

        if (onMessageSent) {
            const allowed = onMessageSent();
            if (!allowed) return;
        }

        const userMsg = { role: "user", content: question };
        setMessages(prev => [...prev, userMsg]);
        setIsGenerating(true);

        // If this is the first message in the array, push this to the App's list of Historic Chats as a title!
        if (messages.length === 0) {
            setChats(prev => {
                const existing = prev.find(c => c.id === chatId);
                if (existing) return prev; // Avoid dupes
                return [{ id: chatId, title: question.slice(0, 30) + (question.length > 30 ? "..." : "") }, ...prev];
            });
        }

        try {
            const res = await fetch("http://localhost:3000/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question, chat_id: chatId })
            });
            const data = await res.json();

            if (data.answer) {
                setMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
            }
        } catch (e) {
            console.error("Failed to send message", e);
        } finally {
            setIsGenerating(false);
        }
    }

    return (<div className="flex flex-col py-4 px-4 gap-4 h-full w-full">
        <div className="flex-1 overflow-hidden min-h-0"><ChatArea messages={messages} loading={isGenerating} /></div>
        <div className="shrink-0 px-5"><InputInline onSend={handleSend} /></div>
        <div className="shrink-0"><UploadComponent chatId={chatId} initialFiles={uploadedFiles} /></div>
    </div>)
}
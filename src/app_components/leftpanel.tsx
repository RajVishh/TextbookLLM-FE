import { Plus, MessageSquare, LogOut } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import type { ChatSession } from "../app_components/dashboard"
import { AvatarDemo } from "./profile"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/lib/utils"


interface LeftPanelProps {
    chats: ChatSession[];
    activeChatId: string;
    onSelectChat: (id: string) => void;
    onNewChat: () => void;
}

export const LeftPanel = ({ chats, activeChatId, onSelectChat, onNewChat }: LeftPanelProps) => {

    const [profile, setProfile] = useState<any>(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/user`, {
                    withCredentials: true
                })
                if (response.data) {
                    setProfile(response.data)
                }
            } catch (error) {
                console.error("Failed to fetch profile", error)
            }
        }
        fetchProfile()
    }, [])

    const handleLogout = async () => {
        try {
            await axios.post(`${BACKEND_URL}/api/logout`, {}, { withCredentials: true })
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    // Passport Google profile formats picture URL in photos[0].value or _json.picture
    const pictureUrl = profile?.photos?.[0]?.value || profile?._json?.picture || "";
    const name = profile?.displayName || "User";

    return (
        <div className="rounded-lg shadow-md p-4 h-full w-full overflow-y-auto">
            <div className="flex my-10 gap-4 items-center justify-between">
                <div className="flex gap-4 items-center">
                    <AvatarDemo pictureUrl={pictureUrl} name={name} />
                    <p className="text-white">{name}</p>
                </div>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white" title="Logout">
                    <LogOut size={20} />
                </button>
            </div>
            <h2 className="text-xl font-bold mb-4 text-white">Chats</h2>

            <div
                onClick={onNewChat}
                className="flex items-center py-2 px-2 rounded-md justify-content hover:bg-[#3A3A38] cursor-pointer text-white"
            >
                <Plus className="inline-block mr-2 text-white" />
                <button className="text-xs">New Chat</button>
            </div>
            <Separator className="bg-[#232323] my-4" />

            <div className="flex flex-col gap-2">
                {chats.map(chat => (
                    <div
                        key={chat.id}
                        onClick={() => onSelectChat(chat.id)}
                        className={`flex items-center py-2 px-2 rounded-md cursor-pointer text-white group ${activeChatId === chat.id ? 'bg-[#3A3A38]' : 'hover:bg-[#2A2A28]'}`}
                    >
                        <MessageSquare className="inline-block mr-2 w-4 h-4 text-gray-400 group-hover:text-white" />
                        <span className="text-sm truncate w-full">{chat.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
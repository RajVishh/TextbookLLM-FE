import { MiddlePanel } from "./middlepanel"
import { LeftPanel } from "./leftpanel"
import { RightPanel } from "./rightpanel"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"

export type ChatSession = { id: string; title: string };

function Dashboard() {
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    // Load historical chats from local storage
    const storedChats = JSON.parse(localStorage.getItem("chat_history") || "[]");
    setChats(storedChats);

    // Load active chat or create a new one
    let activeChatId = localStorage.getItem("chat_id");
    if (!activeChatId) {
      activeChatId = crypto.randomUUID();
      localStorage.setItem("chat_id", activeChatId);
    }
    setChatId(activeChatId);
  }, []);

  // Update localStorage whenever the chats history changes
  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(chats));
  }, [chats]);

  const onSelectChat = (id: string) => {
    setChatId(id);
    localStorage.setItem("chat_id", id);
  };

  const onNewChat = () => {
    const newId = crypto.randomUUID();
    setChatId(newId);
    localStorage.setItem("chat_id", newId);
  };

  // Check Authentication
  useEffect(() => {
    fetch("http://localhost:3000/api/user", { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then(user => {
        if (user && Object.keys(user).length > 0) {
          setIsAuthenticated(true);
        }
      })
      .catch((e) => {
        console.log("User not authenticated", e);
      });
  }, []);

  const handleMessageSent = () => {
    if (isAuthenticated) return true;
    const msgCount = parseInt(localStorage.getItem("anon_msg_count") || "0");
    if (msgCount >= 5) {
      setLoginMessage("You have reached the free message limit. Please sign in to continue.");
      setShowLoginModal(true);
      return false;
    }
    localStorage.setItem("anon_msg_count", (msgCount + 1).toString());
    return true;
  };

  const handleGenerationTriggered = () => {
    if (isAuthenticated) return true;
    const genCount = parseInt(localStorage.getItem("anon_gen_count") || "0");
    if (genCount >= 1) {
      setLoginMessage("You have reached the free studio generation limit. Please sign in to continue.");
      setShowLoginModal(true);
      return false;
    }
    localStorage.setItem("anon_gen_count", (genCount + 1).toString());
    return true;
  };

  return (
    <div className="bg-[#0A0A0A] h-screen w-screen overflow-hidden flex flex-col">
      <div className="grid grid-cols-[2fr_auto_6fr_auto_2fr] flex-1 min-h-0">
        <div className="w-full h-full overflow-y-auto">
          <LeftPanel chats={chats} activeChatId={chatId} onSelectChat={onSelectChat} onNewChat={onNewChat} />
        </div>
        <Separator orientation="vertical" className="bg-[#232323]" />
        <div className="w-full h-full overflow-hidden flex flex-col">
          <MiddlePanel chatId={chatId} setChats={setChats} onMessageSent={handleMessageSent} />
        </div>
        <Separator orientation="vertical" className="bg-[#232323]" />
        <div className="w-full h-full overflow-hidden flex flex-col">
          <RightPanel chatId={chatId} onGenerationTriggered={handleGenerationTriggered} />
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-md w-full p-4">

            <div className="mb-4 text-center">
            </div>
            <div className="bg-white p-5 rounded-md">
              <button
                className="absolute top-0 right-0 z-10 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center font-bold"
                onClick={() => setShowLoginModal(false)}
              >×</button>
              <p className="text-center m-5">{loginMessage}</p><LoginForm /></div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard

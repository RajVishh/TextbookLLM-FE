import { Textbubble } from "./textbubble";
import { useEffect, useRef } from "react";
import { SkeletonText } from "./skeletontext";

export const ChatArea = ({ messages, loading }: { messages: any[], loading?: boolean }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="p-4 h-full w-full overflow-y-auto flex flex-col gap-2 relative">
      {messages.map((msg, index) => (
        <Textbubble key={index} text={msg.content} isUser={msg.role === 'user'} />
      ))}

      {loading && (
        <SkeletonText />
      )}
      <div ref={bottomRef} className="h-px w-full" />
    </div>
  );
}
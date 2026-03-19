export const Textbubble = ({ text, isUser }: { text: string; isUser: boolean }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs px-4 py-2 rounded-lg ${isUser ? 'bg-[#D97857] text-white' : 'bg-gray-300 text-gray-800'}`}>
        {text}
      </div>
    </div>
  );
}
import React from "react";

interface ChatMessageProps {
  content: string;
  isAi: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ content, isAi }) => {
  return (
    <div className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isAi
            ? "bg-secondary text-secondary-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {content}
      </div>
    </div>
  );
};
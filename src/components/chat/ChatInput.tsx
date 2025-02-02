import React from "react";
import { Input } from "../ui/input";
import { FeyButton } from "../ui/fey-button";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <FeyButton type="submit" disabled={isLoading}>
          Send
        </FeyButton>
      </div>
    </form>
  );
};
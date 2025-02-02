import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "./ui/use-toast";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { UseCaseSelector, USE_CASES } from "./chat/UseCaseSelector";
import { useChatMessages } from "./chat/useChatMessages";

const getSystemPrompt = (useCase: string) => {
  const prompts: Record<string, string> = {
    general: "You are a helpful assistant for a real estate investment platform.",
    property: "You are a property analysis expert. Help analyze properties, their potential, and market value.",
    market: "You are a market research specialist focusing on real estate trends and opportunities.",
    roi: "You are an ROI calculation expert. Help users understand and calculate potential returns on real estate investments.",
    investment: "You are an investment strategy advisor specializing in real estate portfolios.",
    document: "You are a document analysis expert helping users understand real estate documentation.",
    scheduling: "You are a scheduling assistant helping coordinate property viewings and meetings.",
  };
  return prompts[useCase] || prompts.general;
};

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState("general");
  const { toast } = useToast();
  const { messages, fetchMessages } = useChatMessages();

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to send messages",
          variant: "destructive",
        });
        return;
      }

      // Save user message
      const { error: insertError } = await supabase
        .from("chat_messages")
        .insert([{ 
          content: newMessage, 
          is_ai: false,
          user_id: user.id 
        }]);

      if (insertError) throw insertError;

      // Get AI response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: newMessage,
          systemPrompt: getSystemPrompt(selectedUseCase),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("Invalid response format from AI service");
      }

      const aiResponse = data.choices[0].message.content;

      // Save AI response
      const { error: aiInsertError } = await supabase
        .from("chat_messages")
        .insert([{ 
          content: aiResponse, 
          is_ai: true,
          user_id: user.id 
        }]);

      if (aiInsertError) throw aiInsertError;

      setNewMessage("");
      await fetchMessages();
    } catch (error: any) {
      console.error("Chat error:", error);
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <UseCaseSelector value={selectedUseCase} onChange={setSelectedUseCase} />
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isAi={message.is_ai}
            />
          ))}
        </div>
      </ScrollArea>

      <ChatInput
        value={newMessage}
        onChange={setNewMessage}
        onSubmit={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Chat;
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "./ui/use-toast";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { UseCaseSelector, USE_CASES } from "./chat/UseCaseSelector";
import { useChatMessages } from "./chat/useChatMessages";
import { useLocation } from "react-router-dom";

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

const getPageSpecificSuggestions = (pathname: string) => {
  const suggestions: Record<string, string[]> = {
    "/": [
      "Tell me more about PropOsphere's services",
      "How can I start investing in real estate?",
      "What are the benefits of short-term rentals?",
    ],
    "/calculator": [
      "Help me understand the ROI calculation",
      "What factors affect my investment returns?",
      "Can you explain the mortgage terms?",
    ],
    "/property-evaluation": [
      "What makes a good short-term rental property?",
      "How do you estimate rental income?",
      "What are the key metrics for property evaluation?",
    ],
    "/investment": [
      "What investment strategies do you recommend?",
      "How can I diversify my real estate portfolio?",
      "What are the current market trends?",
    ],
    "/statistics": [
      "Help me interpret these market statistics",
      "What do these numbers mean for investors?",
      "How does this compare to market averages?",
    ],
  };
  return suggestions[pathname] || suggestions["/"];
};

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState("general");
  const { toast } = useToast();
  const { messages, fetchMessages } = useChatMessages();
  const location = useLocation();

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      // Save message without requiring authentication
      const { error: insertError } = await supabase
        .from("chat_messages")
        .insert([{ 
          content: newMessage, 
          is_ai: false,
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

  const suggestions = getPageSpecificSuggestions(location.pathname);

  return (
    <div className="flex flex-col h-full">
      <UseCaseSelector value={selectedUseCase} onChange={setSelectedUseCase} />
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Welcome! Here are some suggestions based on your current page:
              </p>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="block w-full text-left p-2 rounded-lg bg-muted/50 hover:bg-muted text-sm"
                  onClick={() => setNewMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
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
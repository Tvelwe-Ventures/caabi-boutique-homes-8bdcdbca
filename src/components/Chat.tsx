import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FeyButton } from "./ui/fey-button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "./ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const USE_CASES = [
  { 
    id: 'general', 
    label: 'General Assistance',
    example: 'E.g., "What services do you offer?"'
  },
  { 
    id: 'property', 
    label: 'Property Analysis',
    example: 'E.g., "Analyze this 3-bed property in Miami for short-term rental potential"'
  },
  { 
    id: 'market', 
    label: 'Market Research',
    example: 'E.g., "What are the current trends in the Austin real estate market?"'
  },
  { 
    id: 'roi', 
    label: 'ROI Calculator Help',
    example: 'E.g., "Help me understand the ROI calculation for a $500k property"'
  },
  { 
    id: 'investment', 
    label: 'Investment Strategy',
    example: 'E.g., "What investment strategy would you recommend for $1M budget?"'
  },
  { 
    id: 'document', 
    label: 'Document Analysis',
    example: 'E.g., "Can you explain this lease agreement terms?"'
  },
  { 
    id: 'scheduling', 
    label: 'Scheduling Assistance',
    example: 'E.g., "Help me plan viewings for 5 properties next week"'
  },
];

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState("general");
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast({
        title: "Error fetching messages",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setMessages(data || []);
  };

  const getSystemPrompt = (useCase: string) => {
    const prompts = {
      general: "You are a helpful assistant for a real estate investment platform.",
      property: "You are a property analysis expert. Help analyze properties, their potential, and market value.",
      market: "You are a market research specialist focusing on real estate trends and opportunities.",
      roi: "You are an ROI calculation expert. Help users understand and calculate potential returns on real estate investments.",
      investment: "You are an investment strategy advisor specializing in real estate portfolios.",
      document: "You are a document analysis expert helping users understand real estate documentation.",
      scheduling: "You are a scheduling assistant helping coordinate property viewings and meetings.",
    };
    return prompts[useCase as keyof typeof prompts] || prompts.general;
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      // Save user message
      const { error: insertError } = await supabase
        .from("chat_messages")
        .insert([{ content: newMessage, is_ai: false }]);

      if (insertError) throw insertError;

      // Get AI response with specialized context
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: newMessage,
          systemPrompt: getSystemPrompt(selectedUseCase)
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Save AI response
      const { error: aiInsertError } = await supabase
        .from("chat_messages")
        .insert([{ content: aiResponse, is_ai: true }]);

      if (aiInsertError) throw aiInsertError;

      setNewMessage("");
      await fetchMessages();
    } catch (error: any) {
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
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="mb-4">
        <Select
          value={selectedUseCase}
          onValueChange={setSelectedUseCase}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select use case" />
          </SelectTrigger>
          <SelectContent>
            {USE_CASES.map((useCase) => (
              <SelectItem 
                key={useCase.id} 
                value={useCase.id}
                className="flex flex-col items-start py-3"
              >
                <span className="font-medium">{useCase.label}</span>
                <span className="text-sm text-muted-foreground mt-1">{useCase.example}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <ScrollArea className="h-[500px] p-4 rounded-lg border">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.is_ai ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.is_ai
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={sendMessage} className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <FeyButton type="submit" disabled={isLoading}>
          Send
        </FeyButton>
      </form>
    </div>
  );
};

export default Chat;
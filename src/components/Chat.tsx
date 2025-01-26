import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FeyButton } from "./ui/fey-button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "./ui/use-toast";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

      // Get AI response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage }),
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
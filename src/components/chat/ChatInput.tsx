
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, MessageSquare, Zap, HelpCircle, Settings, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  short?: string;
  end?: string;
}

const chatActions = [
  {
    id: "1",
    label: "Ask about property analysis",
    icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
    description: "Property insights",
    end: "Analysis",
  },
  {
    id: "2",
    label: "ROI Calculator help",
    icon: <Zap className="h-4 w-4 text-orange-500" />,
    description: "Calculate returns",
    end: "Calculator",
  },
  {
    id: "3",
    label: "Market research",
    icon: <BookOpen className="h-4 w-4 text-purple-500" />,
    description: "Market trends",
    end: "Research",
  },
  {
    id: "4",
    label: "Settings help",
    icon: <Settings className="h-4 w-4 text-green-500" />,
    description: "Configuration",
    end: "Settings",
  },
  {
    id: "5",
    label: "General assistance",
    icon: <HelpCircle className="h-4 w-4 text-blue-500" />,
    description: "Help",
    end: "Support",
  },
];

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

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
  const [isFocused, setIsFocused] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ChatAction | null>(null);
  const debouncedQuery = useDebounce(value, 200);

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.4 },
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  const handleActionSelect = (action: ChatAction) => {
    setSelectedAction(action);
    onChange(action.label);
    setIsFocused(false);
  };

  const filteredActions = chatActions.filter((action) => {
    if (!value) return true;
    return action.label.toLowerCase().includes(value.toLowerCase()) ||
           action.description?.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <form onSubmit={onSubmit} className="p-4 border-t">
      <div className="relative">
        <div className="relative flex gap-2">
          <div className="flex-1">
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="pr-9"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none">
              <AnimatePresence mode="popLayout">
                {value.length > 0 ? (
                  <motion.div
                    key="send"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Send className="w-4 h-4 text-gray-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <Button type="submit" disabled={isLoading}>
            Send
          </Button>
        </div>

        <AnimatePresence>
          {isFocused && filteredActions.length > 0 && (
            <motion.div
              className="absolute bottom-full w-full mb-1 border rounded-md shadow-sm overflow-hidden bg-white dark:bg-zinc-950"
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredActions.map((action) => (
                  <motion.li
                    key={action.id}
                    className="px-3 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-900 cursor-pointer"
                    variants={item}
                    onClick={() => handleActionSelect(action)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{action.icon}</span>
                      <span className="text-sm font-medium">{action.label}</span>
                      <span className="text-xs text-gray-400">{action.description}</span>
                    </div>
                    <span className="text-xs text-gray-400">{action.end}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

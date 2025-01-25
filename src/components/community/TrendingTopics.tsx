import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Hash } from "lucide-react";

export const TrendingTopics = () => {
  const [topics, setTopics] = useState<any[]>([]);

  useEffect(() => {
    fetchTrendingTopics();
  }, []);

  const fetchTrendingTopics = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*, post_categories(count)");

    if (!error && data) {
      const sortedTopics = data
        .map(category => ({
          ...category,
          count: category.post_categories?.length || 0
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setTopics(sortedTopics);
    }
  };

  return (
    <div className="space-y-3">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="flex items-center justify-between p-2 hover:bg-primary/5 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-primary" />
            <span className="text-sm text-gray-600">{topic.name}</span>
          </div>
          <span className="text-xs font-medium text-primary-dark bg-primary/10 px-2 py-1 rounded-full">
            {topic.count} posts
          </span>
        </div>
      ))}
    </div>
  );
};
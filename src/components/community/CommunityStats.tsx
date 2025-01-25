import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, MessageSquare, ThumbsUp } from "lucide-react";

export const CommunityStats = () => {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    comments: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { count: usersCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact" });

    const { count: postsCount } = await supabase
      .from("posts")
      .select("*", { count: "exact" });

    const { count: commentsCount } = await supabase
      .from("comments")
      .select("*", { count: "exact" });

    setStats({
      users: usersCount || 0,
      posts: postsCount || 0,
      comments: commentsCount || 0,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-2 hover:bg-primary/5 rounded-lg transition-colors">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-sm text-gray-600">Members</span>
        </div>
        <span className="font-semibold text-primary-dark">{stats.users}</span>
      </div>
      <div className="flex items-center justify-between p-2 hover:bg-primary/5 rounded-lg transition-colors">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span className="text-sm text-gray-600">Posts</span>
        </div>
        <span className="font-semibold text-primary-dark">{stats.posts}</span>
      </div>
      <div className="flex items-center justify-between p-2 hover:bg-primary/5 rounded-lg transition-colors">
        <div className="flex items-center gap-2">
          <ThumbsUp className="h-4 w-4 text-primary" />
          <span className="text-sm text-gray-600">Comments</span>
        </div>
        <span className="font-semibold text-primary-dark">{stats.comments}</span>
      </div>
    </div>
  );
};
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { CreatePost } from "./community/CreatePost";
import { Post } from "./community/Post";
import { TrendingTopics } from "./community/TrendingTopics";
import { CommunityStats } from "./community/CommunityStats";
import { Search, TrendingUp, Users } from "lucide-react";
import { Input } from "./ui/input";
import { motion } from "framer-motion";

const Community = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<{ [key: string]: any[] }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
    console.log("Fetching initial posts");
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        profile:user_id (
          username,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error fetching posts",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setPosts(data || []);
    await fetchCommentsForPosts(data || []);
  };

  const fetchCommentsForPosts = async (posts: any[]) => {
    const commentsObj: { [key: string]: any[] } = {};
    
    for (const post of posts) {
      const { data, error } = await supabase
        .from("comments")
        .select(`
          *,
          profile:user_id (
            username,
            avatar_url
          )
        `)
        .eq("post_id", post.id)
        .order("created_at", { ascending: true });

      if (!error) {
        commentsObj[post.id] = data || [];
      }
    }

    setComments(commentsObj);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 backdrop-blur-lg bg-white/70 border-b border-primary/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Community
            </h1>
            <div className="relative w-full max-w-md mx-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 w-full rounded-full border-primary/20 focus:border-primary/40 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="glass-card rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-primary-dark">
                <Users className="h-5 w-5" />
                <h2 className="font-semibold">Community Stats</h2>
              </div>
              <CommunityStats />
            </div>
            <div className="glass-card rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-primary-dark">
                <TrendingUp className="h-5 w-5" />
                <h2 className="font-semibold">Trending Topics</h2>
              </div>
              <TrendingTopics />
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CreatePost onPostCreated={fetchPosts} />
            </motion.div>
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Post
                    post={post}
                    comments={comments[post.id] || []}
                    onCommentAdded={fetchPosts}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Add upcoming events and activity feed components here */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Community;
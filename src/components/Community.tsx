import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { CreatePost } from "./community/CreatePost";
import { Post } from "./community/Post";
import { motion } from "framer-motion";
import { CommunityHeader } from "./community/CommunityHeader";
import { LeftSidebar } from "./community/LeftSidebar";
import { RightSidebar } from "./community/RightSidebar";
import { usePostsSubscription } from "@/hooks/usePostsSubscription";

const Community = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<{ [key: string]: any[] }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  usePostsSubscription(setPosts);

  useEffect(() => {
    fetchPosts();
    console.log("Fetching initial posts");
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        profiles!posts_user_id_fkey (
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
          profiles!comments_user_id_fkey (
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
    <div className="min-h-screen bg-soft-gradient">
      <CommunityHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <LeftSidebar />

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

          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Community;
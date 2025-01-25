import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { CreatePost } from "./community/CreatePost";
import { Post } from "./community/Post";

const Community = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<{ [key: string]: any[] }>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        profile:user_id (
          username
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
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
            username
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

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <CreatePost onPostCreated={fetchPosts} />
      <div className="space-y-6">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            comments={comments[post.id] || []}
            onCommentAdded={fetchPosts}
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
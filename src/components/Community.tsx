import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { useToast } from "./ui/use-toast";

const Community = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [comments, setComments] = useState<{ [key: string]: any[] }>({});
  const [newComment, setNewComment] = useState("");
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

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const { error } = await supabase.from("posts").insert([newPost]);

    if (error) {
      toast({
        title: "Error creating post",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setNewPost({ title: "", content: "" });
    await fetchPosts();
  };

  const addComment = async (postId: string) => {
    if (!newComment.trim()) return;

    const { error } = await supabase
      .from("comments")
      .insert([{ post_id: postId, content: newComment }]);

    if (error) {
      toast({
        title: "Error adding comment",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setNewComment("");
    await fetchPosts();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <Card className="p-4">
        <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
        <form onSubmit={createPost} className="space-y-4">
          <Input
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Post title"
          />
          <Textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="Write your post..."
          />
          <Button type="submit">Create Post</Button>
        </form>
      </Card>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="p-4 space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">
                Posted by {post.profile?.username || "Anonymous"}
              </p>
            </div>
            <p>{post.content}</p>

            <div className="space-y-2">
              <h4 className="font-medium">Comments</h4>
              {comments[post.id]?.map((comment) => (
                <div key={comment.id} className="pl-4 border-l-2">
                  <p>{comment.content}</p>
                  <p className="text-sm text-muted-foreground">
                    By {comment.profile?.username || "Anonymous"}
                  </p>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                />
                <Button onClick={() => addComment(post.id)}>Comment</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Community;
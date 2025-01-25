import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";
import { useToast } from "../ui/use-toast";

export const CreatePost = ({ onPostCreated }: { onPostCreated: () => void }) => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const { toast } = useToast();

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("posts")
      .insert({
        title: newPost.title,
        content: newPost.content,
        user_id: user.id
      });

    if (error) {
      toast({
        title: "Error creating post",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setNewPost({ title: "", content: "" });
    onPostCreated();
  };

  return (
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
  );
};
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

interface Comment {
  id: string;
  content: string;
  profile?: {
    username: string | null;
  };
}

interface CommentsProps {
  postId: string;
  comments: Comment[];
  onCommentAdded: () => void;
}

export const Comments = ({ postId, comments, onCommentAdded }: CommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const addComment = async () => {
    if (!newComment.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("comments")
      .insert({
        post_id: postId,
        content: newComment,
        user_id: user.id
      });

    if (error) {
      toast({
        title: "Error adding comment",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setNewComment("");
    onCommentAdded();
  };

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Comments</h4>
      {comments.map((comment) => (
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
        <Button onClick={addComment}>Comment</Button>
      </div>
    </div>
  );
};
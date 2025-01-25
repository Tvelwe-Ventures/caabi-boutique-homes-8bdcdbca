import { useState } from "react";
import { Card } from "../ui/card";
import { Comments } from "./Comments";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "../ui/button";
import { ThumbsUp, ThumbsDown, Flag, MessageSquare } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    created_at: string;
    profile?: {
      username: string | null;
    };
  };
  comments: any[];
  onCommentAdded: () => void;
}

export const Post = ({ post, comments, onCommentAdded }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [reactions, setReactions] = useState({ likes: 0, dislikes: 0 });
  const { toast } = useToast();

  const handleReaction = async (type: 'like' | 'dislike') => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to react to posts",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("reactions")
      .insert({
        post_id: post.id,
        user_id: user.id,
        type: type
      });

    if (error?.code === '23505') {
      toast({
        title: "Already reacted",
        description: "You have already reacted to this post",
      });
      return;
    }

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add reaction",
        variant: "destructive",
      });
      return;
    }

    setReactions(prev => ({
      ...prev,
      [type === 'like' ? 'likes' : 'dislikes']: prev[type === 'like' ? 'likes' : 'dislikes'] + 1
    }));
  };

  const reportPost = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to report posts",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("reports")
      .insert({
        post_id: post.id,
        reporter_id: user.id,
        type: 'inappropriate',
        description: 'Reported by user'
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to report post",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Post reported successfully",
    });
  };

  return (
    <Card className="p-6 space-y-4 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
      <div>
        <h3 className="text-xl font-semibold text-primary-dark">{post.title}</h3>
        <p className="text-sm text-muted-foreground">
          Posted by {post.profile?.username || "Anonymous"} • {format(new Date(post.created_at), 'PPp')}
        </p>
      </div>
      <div className="prose max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <div className="flex items-center gap-4 pt-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleReaction('like')}
          className="text-primary hover:text-primary-dark"
        >
          <ThumbsUp className="w-4 h-4 mr-2" />
          {reactions.likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleReaction('dislike')}
          className="text-primary hover:text-primary-dark"
        >
          <ThumbsDown className="w-4 h-4 mr-2" />
          {reactions.dislikes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="text-primary hover:text-primary-dark"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          {comments.length} Comments
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={reportPost}
          className="text-destructive hover:text-destructive/80 ml-auto"
        >
          <Flag className="w-4 h-4 mr-2" />
          Report
        </Button>
      </div>
      {showComments && (
        <Comments
          postId={post.id}
          comments={comments}
          onCommentAdded={onCommentAdded}
        />
      )}
    </Card>
  );
};
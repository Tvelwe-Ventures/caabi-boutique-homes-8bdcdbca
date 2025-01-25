import { Card } from "../ui/card";
import { Comments } from "./Comments";

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    profile?: {
      username: string | null;
    };
  };
  comments: any[];
  onCommentAdded: () => void;
}

export const Post = ({ post, comments, onCommentAdded }: PostProps) => {
  return (
    <Card key={post.id} className="p-4 space-y-4">
      <div>
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <p className="text-sm text-muted-foreground">
          Posted by {post.profile?.username || "Anonymous"}
        </p>
      </div>
      <p>{post.content}</p>
      <Comments
        postId={post.id}
        comments={comments}
        onCommentAdded={onCommentAdded}
      />
    </Card>
  );
};
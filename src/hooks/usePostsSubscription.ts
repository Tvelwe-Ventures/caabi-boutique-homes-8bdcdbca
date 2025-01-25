import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const usePostsSubscription = (setPosts: React.Dispatch<React.SetStateAction<any[]>>) => {
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase
      .channel('public:posts')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
        },
        async (payload) => {
          console.log('Real-time update received:', payload);
          
          if (payload.eventType === 'INSERT') {
            const { data: newPost } = await supabase
              .from('posts')
              .select(`
                *,
                profiles!posts_user_id_fkey (
                  username,
                  avatar_url
                )
              `)
              .eq('id', payload.new.id)
              .single();

            if (newPost) {
              setPosts(currentPosts => [newPost, ...currentPosts]);
              toast({
                title: "New post",
                description: "Someone just posted in the community!",
              });
            }
          } else if (payload.eventType === 'DELETE') {
            setPosts(currentPosts => 
              currentPosts.filter(post => post.id !== payload.old.id)
            );
          } else if (payload.eventType === 'UPDATE') {
            setPosts(currentPosts =>
              currentPosts.map(post =>
                post.id === payload.new.id ? { ...post, ...payload.new } : post
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setPosts, toast]);
};
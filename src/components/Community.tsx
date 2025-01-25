import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { CreatePost } from "./community/CreatePost";
import { Post } from "./community/Post";
import { TrendingTopics } from "./community/TrendingTopics";
import { CommunityStats } from "./community/CommunityStats";
import { Search, TrendingUp, Users, BookOpen, MessageSquare, Calendar } from "lucide-react";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
import { CardSpotlight } from "./ui/card-spotlight";

const Community = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<{ [key: string]: any[] }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
    console.log("Fetching initial posts");

    // Subscribe to real-time updates
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

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
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
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 backdrop-blur-lg bg-white/70 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-primary-dark">
              Community
            </h1>
            <div className="relative w-full max-w-md mx-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 w-full rounded-full border-gray-200 focus:border-primary/40 transition-colors"
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
            <CardSpotlight className="bg-card-gradient space-y-4">
              <div className="flex items-center gap-2 text-primary-dark">
                <Users className="h-5 w-5" />
                <h2 className="font-semibold">Community Stats</h2>
              </div>
              <CommunityStats />
            </CardSpotlight>

            <CardSpotlight className="bg-card-gradient space-y-4">
              <div className="flex items-center gap-2 text-primary-dark">
                <TrendingUp className="h-5 w-5" />
                <h2 className="font-semibold">Trending Topics</h2>
              </div>
              <TrendingTopics />
            </CardSpotlight>

            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white/80 rounded-lg transition-colors">
                <BookOpen className="h-5 w-5" />
                <span>Resources</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white/80 rounded-lg transition-colors">
                <MessageSquare className="h-5 w-5" />
                <span>Discussions</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white/80 rounded-lg transition-colors">
                <Calendar className="h-5 w-5" />
                <span>Events</span>
              </a>
            </nav>
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
            <CardSpotlight className="bg-card-gradient p-6">
              <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
              <p className="text-gray-600">No upcoming events</p>
            </CardSpotlight>
            
            <CardSpotlight className="bg-card-gradient p-6">
              <h3 className="font-semibold text-lg mb-4">Activity Feed</h3>
              <p className="text-gray-600">No recent activity</p>
            </CardSpotlight>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Community;
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { BorderBeam } from "./ui/border-beam";
import { motion } from "framer-motion";
import { useToast } from "./ui/use-toast";
import { Instagram } from "lucide-react";

interface InstagramPost {
  id: string;
  mediaUrl: string;
  caption: string;
  permalink: string;
  timestamp: string;
}

const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // For demo purposes, we'll use placeholder data
        // In a real implementation, you would fetch from Instagram's API
        const demoData: InstagramPost[] = [
          {
            id: "1",
            mediaUrl: "https://picsum.photos/400/400",
            caption: "Luxury apartment with stunning views",
            permalink: "https://instagram.com",
            timestamp: new Date().toISOString(),
          },
          {
            id: "2",
            mediaUrl: "https://picsum.photos/401/400",
            caption: "Modern living room design",
            permalink: "https://instagram.com",
            timestamp: new Date().toISOString(),
          },
          {
            id: "3",
            mediaUrl: "https://picsum.photos/402/400",
            caption: "Beachfront property",
            permalink: "https://instagram.com",
            timestamp: new Date().toISOString(),
          },
        ];

        setPosts(demoData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        toast({
          title: "Error",
          description: "Failed to load Instagram feed. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin">
          <Instagram className="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gradient">
        Follow Us on Instagram
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
              >
                <div className="moving-border relative">
                  <Card className="overflow-hidden glass-card">
                    <BorderBeam className="z-10" />
                    <CardContent className="p-0 relative">
                      <img
                        src={post.mediaUrl}
                        alt={post.caption}
                        className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <p className="text-white text-center px-4 line-clamp-3">
                          {post.caption}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramFeed;
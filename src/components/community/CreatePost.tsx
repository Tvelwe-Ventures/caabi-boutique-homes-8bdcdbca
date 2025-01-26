import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FeyButton } from "../ui/fey-button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";
import { useToast } from "../ui/use-toast";
import { Image, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface NewPost {
  title: string;
  content: string;
  category_id?: string;
}

export const CreatePost = ({ onPostCreated }: { onPostCreated: () => void }) => {
  const [newPost, setNewPost] = useState<NewPost>({ title: "", content: "" });
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (!error && data) {
      setCategories(data);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath);

      setNewPost(prev => ({
        ...prev,
        content: prev.content + `\n![${file.name}](${publicUrl})`
      }));

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Error creating post",
        description: "You must be logged in to create a post",
        variant: "destructive",
      });
      return;
    }

    const { data: postData, error: postError } = await supabase
      .from("posts")
      .insert({
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        user_id: user.id,
      })
      .select()
      .single();

    if (postError) {
      toast({
        title: "Error creating post",
        description: postError.message,
        variant: "destructive",
      });
      return;
    }

    if (selectedCategory && postData) {
      const { error: categoryError } = await supabase
        .from("post_categories")
        .insert({
          post_id: postData.id,
          category_id: selectedCategory,
        });

      if (categoryError) {
        toast({
          title: "Error adding category",
          description: categoryError.message,
          variant: "destructive",
        });
      }
    }

    setNewPost({ title: "", content: "" });
    setSelectedCategory("");
    toast({
      title: "Success",
      description: "Post created successfully",
    });
    onPostCreated();
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-primary-dark">Create a Post</h2>
      <form onSubmit={createPost} className="space-y-6">
        <div>
          <Input
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Post title"
            className="w-full"
            required
          />
        </div>
        <div>
          <Textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="Write your post..."
            className="min-h-[150px]"
            required
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <FeyButton
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Image className="w-4 h-4 mr-2" />
            Add Image
          </FeyButton>
        </div>
        <FeyButton type="submit" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </FeyButton>
      </form>
    </Card>
  );
};

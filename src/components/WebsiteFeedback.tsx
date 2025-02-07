import { useState } from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FeyButton } from "./ui/fey-button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MessageSquare, Bug, Flag } from "lucide-react";
import { Input } from "./ui/input";

export const WebsiteFeedback = () => {
  const [content, setContent] = useState("");
  const [type, setType] = useState<"general" | "stay" | "suggestion">("general");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = null;
      
      if (image) {
        const fileExt = image.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('post-images')
          .upload(filePath, image);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('post-images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
      }

      const { error } = await supabase.from("website_feedback").insert({
        content,
        type,
        image_url: imageUrl,
      });

      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "We appreciate your input and will review it carefully.",
        variant: "default",
      });

      // Reset form
      setContent("");
      setType("general");
      setImage(null);
      
      // Close the sheet after successful submission
      const closeButton = document.querySelector('[data-sheet-close]') as HTMLButtonElement;
      if (closeButton) {
        closeButton.click();
      }
    } catch (error: any) {
      toast({
        title: "Error submitting feedback",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = () => {
    switch (type) {
      case "stay":
        return <Bug className="w-4 h-4" />;
      case "suggestion":
        return <Flag className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const FeedbackForm = () => (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-primary-dark">We Value Your Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="type">Feedback Type</Label>
          <Select value={type} onValueChange={(value: "general" | "stay" | "suggestion") => setType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select feedback type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Feedback</SelectItem>
              <SelectItem value="stay">Stay Experience</SelectItem>
              <SelectItem value="suggestion">Suggestion</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Your Feedback</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Please share your thoughts..."
            className="min-h-[150px] resize-none"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Screenshot or Image (optional)</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="cursor-pointer"
          />
        </div>

        <FeyButton type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </FeyButton>
      </form>
    </Card>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <FeyButton className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2">
          {getIcon()}
          <span>Feedback</span>
        </FeyButton>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <FeedbackForm />
      </SheetContent>
    </Sheet>
  );
};

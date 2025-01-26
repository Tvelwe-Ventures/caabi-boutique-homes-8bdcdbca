import { useState } from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FeyButton } from "./ui/fey-button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MessageSquare } from "lucide-react";

export const WebsiteFeedback = () => {
  const [content, setContent] = useState("");
  const [type, setType] = useState<"bug" | "feature" | "general">("general");
  const [rating, setRating] = useState<string>("5");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("website_feedback").insert({
        content,
        type,
        rating: parseInt(rating),
      });

      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "We appreciate your input and will review it carefully.",
      });

      // Reset form
      setContent("");
      setType("general");
      setRating("5");
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

  const FeedbackForm = () => (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-primary-dark">We Value Your Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="type">Feedback Type</Label>
          <Select value={type} onValueChange={(value: "bug" | "feature" | "general") => setType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select feedback type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Feedback</SelectItem>
              <SelectItem value="bug">Report a Bug</SelectItem>
              <SelectItem value="feature">Feature Request</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger>
              <SelectValue placeholder="Select a rating" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} Star{num !== 1 ? "s" : ""}
                </SelectItem>
              ))}
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
            className="min-h-[150px]"
            required
          />
        </div>

        <FeyButton type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </FeyButton>
      </form>
    </Card>
  );

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <button className="bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-l-lg shadow-lg transition-all duration-300 hover:translate-x-1 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Feedback+</span>
          </button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <FeedbackForm />
        </SheetContent>
      </Sheet>
    </div>
  );
};
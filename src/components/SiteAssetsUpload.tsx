
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { uploadSiteAsset, getFaviconSizes } from "@/utils/siteAssetsUpload";

export const SiteAssetsUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    try {
      const faviconSizes = getFaviconSizes();
      const totalFiles = faviconSizes.length;
      let completed = 0;

      for (const { size, name } of faviconSizes) {
        await uploadSiteAsset(file, size, name);
        completed++;
        setProgress((completed / totalFiles) * 100);
      }

      toast({
        title: "Success",
        description: "All favicon sizes have been uploaded successfully",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error uploading favicons:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload favicons. Please try again.",
      });
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="relative"
          disabled={isUploading}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <Upload className="w-4 h-4 mr-2" />
          Upload Favicons
        </Button>
        {isUploading && (
          <div className="flex items-center gap-2">
            <Progress value={progress} className="w-[200px]" />
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

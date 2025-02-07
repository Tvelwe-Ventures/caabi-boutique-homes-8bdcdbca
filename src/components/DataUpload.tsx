
import { useState } from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FeyButton } from "./ui/fey-button";
import { useToast } from "@/hooks/use-toast";
import { Upload, File } from "lucide-react";

export const DataUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select one or more files to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file, index) => {
        formData.append(`file${index}`, file);
      });

      const response = await fetch('https://wwzxgeemuiopimnjbooo.supabase.co/functions/v1/import-data', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to import data');
      }

      const result = await response.json();
      
      toast({
        title: "Success!",
        description: `${files.length} file(s) have been uploaded successfully`,
        variant: "default",
      });
      
      setFiles(null);
      // Reset the file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error uploading files:', error);
      toast({
        title: "Error",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg max-w-md mx-auto">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <File className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold text-primary-dark">Import Data</h2>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="file">Select Files</Label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="cursor-pointer"
            multiple
          />
          <p className="text-sm text-muted-foreground">
            Upload one or more files of any format
          </p>
        </div>

        <FeyButton
          onClick={handleUpload}
          disabled={!files || isUploading}
          className="w-full"
        >
          {isUploading ? (
            "Uploading..."
          ) : (
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>Upload Files {files && `(${files.length} selected)`}</span>
            </div>
          )}
        </FeyButton>
      </div>
    </Card>
  );
};

export default DataUpload;

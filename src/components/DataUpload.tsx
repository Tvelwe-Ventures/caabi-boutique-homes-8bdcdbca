
import { useState } from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FeyButton } from "./ui/fey-button";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileJson } from "lucide-react";

export const DataUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a JSON file to upload",
        variant: "destructive",
      });
      return;
    }

    if (!file.name.endsWith('.json')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JSON file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const importData = JSON.parse(e.target?.result as string);
          
          const response = await fetch('https://wwzxgeemuiopimnjbooo.supabase.co/functions/v1/import-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ data: importData }),
          });

          if (!response.ok) {
            throw new Error('Failed to import data');
          }

          const result = await response.json();
          
          toast({
            title: "Success!",
            description: "Your data has been imported successfully",
            variant: "default",
          });
          
          setFile(null);
          // Reset the file input
          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
          
        } catch (error) {
          console.error('Error parsing or importing data:', error);
          toast({
            title: "Error",
            description: "Failed to import data. Please check your JSON format.",
            variant: "destructive",
          });
        }
      };

      reader.readAsText(file);
    } catch (error) {
      console.error('Error reading file:', error);
      toast({
        title: "Error",
        description: "Failed to read the file",
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
          <FileJson className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold text-primary-dark">Import Data</h2>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="file">Select JSON File</Label>
          <Input
            id="file"
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <p className="text-sm text-muted-foreground">
            Upload a JSON file containing your booking and guest data
          </p>
        </div>

        <FeyButton
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="w-full"
        >
          {isUploading ? (
            "Importing..."
          ) : (
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>Import Data</span>
            </div>
          )}
        </FeyButton>
      </div>
    </Card>
  );
};

export default DataUpload;


import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FeyButton } from "./ui/fey-button";
import { useToast } from "@/hooks/use-toast";
import { Upload, File, ArrowUpToLine, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DataFlowVisualization from "./dashboard/financial-management/components/DataFlowVisualization";

type RecentUpload = {
  filename: string;
  status: 'success' | 'error';
};

export const DataUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'data_exports'
        },
        (payload) => {
          if (payload.new && 'status' in payload.new) {
            setRecentUploads(prev => [{
              filename: payload.new.filename || 'Unnamed file',
              status: payload.new.status as 'success' | 'error'
            }, ...prev].slice(0, 5));
            
            toast({
              title: "New Export Activity",
              description: `Data export ${payload.new.status}`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select one or more files to export",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      const { data, error } = await supabase.functions.invoke('import-data', {
        body: formData,
      });

      if (error) throw error;

      if (data.results) {
        const successCount = data.results.filter((r: any) => r.status === 'success').length;
        const errorCount = data.results.filter((r: any) => r.status === 'error').length;

        if (errorCount > 0) {
          toast({
            title: "Partial Success",
            description: `Successfully exported ${successCount} file(s). ${errorCount} file(s) had errors.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success!",
            description: `Successfully exported ${successCount} file(s)`,
            variant: "default",
          });
        }
      }
      
      setFiles(null);
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error exporting files:', error);
      toast({
        title: "Error",
        description: "Failed to export files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 backdrop-blur-sm shadow-lg">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <ArrowUpToLine className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              <h2 className="text-2xl font-bold text-violet-800 dark:text-violet-200">Export Data</h2>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file">Select Files</Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="cursor-pointer border-violet-200 dark:border-violet-700 focus:ring-violet-400"
                multiple
              />
              <p className="text-sm text-muted-foreground">
                Export one or more files of any format
              </p>
            </div>

            <FeyButton
              onClick={handleUpload}
              disabled={!files || isUploading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white"
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>Exporting...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Export Files {files && `(${files.length} selected)`}</span>
                </div>
              )}
            </FeyButton>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 backdrop-blur-sm shadow-lg">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Recent Export Activity</h3>
            {recentUploads.length > 0 ? (
              <div className="space-y-3">
                {recentUploads.map((upload, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-white/5">
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium">{upload.filename}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      upload.status === 'success' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {upload.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent export activity</p>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Real-time Data Integration</h3>
        <DataFlowVisualization />
      </div>
    </div>
  );
};

export default DataUpload;

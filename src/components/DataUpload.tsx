
import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FeyButton } from "./ui/fey-button";
import { useToast } from "@/hooks/use-toast";
import { Upload, File, ArrowUpToLine, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DataFlowVisualization from "./dashboard/financial-management/components/DataFlowVisualization";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type RecentUpload = {
  filename: string;
  status: 'success' | 'error';
};

export const DataUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);
  const [documentType, setDocumentType] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecentUploads = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: documents, error } = await supabase
        .from('documents')
        .select('title, status')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching recent uploads:', error);
        return;
      }

      if (documents) {
        setRecentUploads(documents.map(doc => ({
          filename: doc.title,
          status: 'success'
        })));
      }
    };

    fetchRecentUploads();

    const channel = supabase
      .channel('document-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents'
        },
        (payload) => {
          if (payload.new) {
            const newUpload: RecentUpload = {
              filename: (payload.new as any).title || 'Unnamed document',
              status: 'success'
            };
            setRecentUploads(prev => [newUpload, ...prev].slice(0, 5));
            
            toast({
              title: "Document Upload Success",
              description: `Document ${(payload.new as any).title} uploaded successfully`,
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
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    if (!documentType) {
      toast({
        title: "No document type selected",
        description: "Please select a document type",
        variant: "destructive",
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
      
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload documents",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const file = files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      // Upload file to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      // Create document record
      const { error: documentError } = await supabase
        .from('documents')
        .insert({
          title: file.name,
          description: `Uploaded ${new Date().toLocaleDateString()}`,
          file_path: fileName,
          status: 'pending_signature',
          type: documentType as any,
          metadata: { originalName: file.name },
          created_by: user.id
        });

      if (documentError) throw documentError;

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
      
      // Reset form
      setFiles(null);
      setDocumentType("");
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error: any) {
      console.error('Error uploading document:', error);
      setRecentUploads(prev => [{
        filename: files[0].name,
        status: 'error' as const
      }, ...prev].slice(0, 5));
      
      toast({
        title: "Error",
        description: error.message || "Failed to upload document",
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
              <h2 className="text-2xl font-bold text-violet-800 dark:text-violet-200">Upload Document</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business_deck">Business Deck</SelectItem>
                    <SelectItem value="management_proposal">Management Proposal</SelectItem>
                    <SelectItem value="evaluation_report">Evaluation Report</SelectItem>
                    <SelectItem value="management_contract">Management Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Select File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="cursor-pointer border-violet-200 dark:border-violet-700 focus:ring-violet-400"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
                <p className="text-sm text-muted-foreground">
                  Supported formats: PDF, Word, PowerPoint
                </p>
              </div>
            </div>

            <FeyButton
              onClick={handleUpload}
              disabled={!files || isUploading || !documentType}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white"
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>Uploading...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload Document {files && `(${files.length} selected)`}</span>
                </div>
              )}
            </FeyButton>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 backdrop-blur-sm shadow-lg">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Recent Document Uploads</h3>
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
              <p className="text-sm text-muted-foreground">No recent uploads</p>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Document Integration Flow</h3>
        <DataFlowVisualization />
      </div>
    </div>
  );
};

export default DataUpload;

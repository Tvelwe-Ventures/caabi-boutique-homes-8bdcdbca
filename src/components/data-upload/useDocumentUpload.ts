
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DocumentType, RecentUpload } from "./types";

export const useDocumentUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);
  const [documentType, setDocumentType] = useState<DocumentType>();
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
          type: documentType,
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
      setDocumentType(undefined);
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

  return {
    files,
    isUploading,
    recentUploads,
    documentType,
    setDocumentType,
    handleFileChange,
    handleUpload
  };
};

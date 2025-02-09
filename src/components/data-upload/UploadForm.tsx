
import { ArrowUpToLine, Upload, Activity } from "lucide-react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FeyButton } from "../ui/fey-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DocumentType } from "./types";

interface UploadFormProps {
  files: FileList | null;
  isUploading: boolean;
  documentType: DocumentType | undefined;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDocumentTypeChange: (value: DocumentType) => void;
  onUpload: () => void;
}

export const UploadForm = ({
  files,
  isUploading,
  documentType,
  onFileChange,
  onDocumentTypeChange,
  onUpload
}: UploadFormProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 backdrop-blur-sm shadow-lg">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <ArrowUpToLine className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          <h2 className="text-2xl font-bold text-violet-800 dark:text-violet-200">Upload Document</h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="documentType">Document Type</Label>
            <Select value={documentType} onValueChange={onDocumentTypeChange}>
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
              onChange={onFileChange}
              className="cursor-pointer border-violet-200 dark:border-violet-700 focus:ring-violet-400"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
            />
            <p className="text-sm text-muted-foreground">
              Supported formats: PDF, Word, PowerPoint
            </p>
          </div>
        </div>

        <FeyButton
          onClick={onUpload}
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
  );
};

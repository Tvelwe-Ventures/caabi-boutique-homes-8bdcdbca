
import { File } from "lucide-react";
import { Card } from "../ui/card";
import { RecentUpload } from "./types";

interface RecentUploadsProps {
  uploads: RecentUpload[];
}

export const RecentUploads = ({ uploads }: RecentUploadsProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 backdrop-blur-sm shadow-lg">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Recent Document Uploads</h3>
        {uploads.length > 0 ? (
          <div className="space-y-3">
            {uploads.map((upload, index) => (
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
  );
};

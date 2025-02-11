
import { UploadForm } from "./data-upload/UploadForm";
import { RecentUploads } from "./data-upload/RecentUploads";
import { useDocumentUpload } from "./data-upload/useDocumentUpload";
import DataFlowVisualization from "./dashboard/financial-management/components/DataFlowVisualization";
import { SiteAssetsUpload } from "./SiteAssetsUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DataUpload = () => {
  const {
    files,
    isUploading,
    recentUploads,
    documentType,
    setDocumentType,
    handleFileChange,
    handleUpload
  } = useDocumentUpload();

  return (
    <div className="space-y-8">
      <Tabs defaultValue="documents" className="w-full">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="site-assets">Site Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UploadForm
              files={files}
              isUploading={isUploading}
              documentType={documentType}
              onFileChange={handleFileChange}
              onDocumentTypeChange={setDocumentType}
              onUpload={handleUpload}
            />
            <RecentUploads uploads={recentUploads} />
          </div>
        </TabsContent>

        <TabsContent value="site-assets">
          <div className="max-w-2xl mx-auto">
            <SiteAssetsUpload />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Document Integration Flow</h3>
        <DataFlowVisualization />
      </div>
    </div>
  );
};

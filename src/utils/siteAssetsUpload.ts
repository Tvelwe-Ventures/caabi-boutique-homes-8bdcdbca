
import { supabase } from "@/integrations/supabase/client";

export const uploadSiteAsset = async (file: File, size: number, fileName: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('size', size.toString());
    formData.append('fileName', fileName);

    const response = await fetch(`${process.env.VITE_SUPABASE_URL}/functions/v1/resize-favicon`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload file');
    }

    const { publicUrl } = await response.json();
    return publicUrl;
  } catch (error) {
    console.error('Error uploading site asset:', error);
    throw error;
  }
};

export const getFaviconSizes = () => [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' }
];

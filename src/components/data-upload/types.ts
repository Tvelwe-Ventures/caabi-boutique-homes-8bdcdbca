
import type { Database } from "@/integrations/supabase/types";

export type DocumentType = Database["public"]["Tables"]["documents"]["Row"]["type"];
export type RecentUpload = {
  filename: string;
  status: 'success' | 'error';
};

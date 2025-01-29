export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      calculator_settings: {
        Row: {
          annual_return: number
          appreciation: number
          created_at: string
          id: string
          investment_amount: number
          user_id: string | null
        }
        Insert: {
          annual_return?: number
          appreciation?: number
          created_at?: string
          id?: string
          investment_amount?: number
          user_id?: string | null
        }
        Update: {
          annual_return?: number
          appreciation?: number
          created_at?: string
          id?: string
          investment_amount?: number
          user_id?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_ai: boolean | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_ai?: boolean | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_ai?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean | null
          type: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean | null
          type: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean | null
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      post_categories: {
        Row: {
          category_id: string
          post_id: string
        }
        Insert: {
          category_id: string
          post_id: string
        }
        Update: {
          category_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      property_evaluations: {
        Row: {
          average_daily_rate: number | null
          bedrooms: number
          created_at: string
          estimated_occupancy: number | null
          estimated_revenue: number | null
          id: string
          is_furnished: boolean | null
          lead_id: string | null
          location: string
          max_guests: number
          property_type: string | null
          rental_months: string[] | null
          report_sent: boolean | null
          report_sent_at: string | null
        }
        Insert: {
          average_daily_rate?: number | null
          bedrooms: number
          created_at?: string
          estimated_occupancy?: number | null
          estimated_revenue?: number | null
          id?: string
          is_furnished?: boolean | null
          lead_id?: string | null
          location: string
          max_guests: number
          property_type?: string | null
          rental_months?: string[] | null
          report_sent?: boolean | null
          report_sent_at?: string | null
        }
        Update: {
          average_daily_rate?: number | null
          bedrooms?: number
          created_at?: string
          estimated_occupancy?: number | null
          estimated_revenue?: number | null
          id?: string
          is_furnished?: boolean | null
          lead_id?: string | null
          location?: string
          max_guests?: number
          property_type?: string | null
          rental_months?: string[] | null
          report_sent?: boolean | null
          report_sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_evaluations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "property_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      property_leads: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_contacted_at: string | null
          last_name: string
          phone: string | null
          source: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_contacted_at?: string | null
          last_name: string
          phone?: string | null
          source?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_contacted_at?: string | null
          last_name?: string
          phone?: string | null
          source?: string | null
          status?: string | null
        }
        Relationships: []
      }
      reactions: {
        Row: {
          created_at: string
          id: string
          post_id: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          description: string | null
          id: string
          post_id: string | null
          reporter_id: string | null
          status: string | null
          type: Database["public"]["Enums"]["report_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          post_id?: string | null
          reporter_id?: string | null
          status?: string | null
          type: Database["public"]["Enums"]["report_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          post_id?: string | null
          reporter_id?: string | null
          status?: string | null
          type?: Database["public"]["Enums"]["report_type"]
        }
        Relationships: [
          {
            foreignKeyName: "reports_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      website_feedback: {
        Row: {
          assigned_to: string | null
          content: string
          created_at: string
          id: string
          rating: number | null
          resolved_at: string | null
          status: string | null
          type: Database["public"]["Enums"]["feedback_type"]
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          content: string
          created_at?: string
          id?: string
          rating?: number | null
          resolved_at?: string | null
          status?: string | null
          type: Database["public"]["Enums"]["feedback_type"]
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          content?: string
          created_at?: string
          id?: string
          rating?: number | null
          resolved_at?: string | null
          status?: string | null
          type?: Database["public"]["Enums"]["feedback_type"]
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      feedback_type: "stay" | "suggestion" | "general"
      report_type: "spam" | "harassment" | "inappropriate" | "other"
      user_role: "user" | "moderator" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

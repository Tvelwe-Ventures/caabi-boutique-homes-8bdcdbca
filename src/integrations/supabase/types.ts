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
      bookings: {
        Row: {
          booking_source: string | null
          check_in_date: string
          check_out_date: string
          created_at: string | null
          external_booking_id: string | null
          guest_id: string | null
          id: string
          number_of_guests: number | null
          property_id: string | null
          special_requests: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          booking_source?: string | null
          check_in_date: string
          check_out_date: string
          created_at?: string | null
          external_booking_id?: string | null
          guest_id?: string | null
          id?: string
          number_of_guests?: number | null
          property_id?: string | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          booking_source?: string | null
          check_in_date?: string
          check_out_date?: string
          created_at?: string | null
          external_booking_id?: string | null
          guest_id?: string | null
          id?: string
          number_of_guests?: number | null
          property_id?: string | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      buy_rent_settings: {
        Row: {
          created_at: string
          down_payment: number
          id: string
          insurance_rate: number
          interest_rate: number
          maintenance_cost_rate: number
          monthly_rent: number
          mortgage_term: number
          property_appreciation_rate: number
          property_price: number
          property_tax_rate: number
          rent_increase_rate: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          down_payment?: number
          id?: string
          insurance_rate?: number
          interest_rate?: number
          maintenance_cost_rate?: number
          monthly_rent?: number
          mortgage_term?: number
          property_appreciation_rate?: number
          property_price?: number
          property_tax_rate?: number
          rent_increase_rate?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          down_payment?: number
          id?: string
          insurance_rate?: number
          interest_rate?: number
          maintenance_cost_rate?: number
          monthly_rent?: number
          mortgage_term?: number
          property_appreciation_rate?: number
          property_price?: number
          property_tax_rate?: number
          rent_increase_rate?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
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
      financial_metrics: {
        Row: {
          avg_daily_rate: number | null
          booking_pace: number | null
          competitive_index: number | null
          created_at: string | null
          data_source: string | null
          expense_amount: number | null
          expense_category: string | null
          forecast_revenue: number | null
          id: string
          last_sync_hostaway: string | null
          last_sync_pricelabs: string | null
          market_demand_score: number | null
          month: string
          monthly_revenue: number
          net_operating_income: number
          occupancy_rate: number | null
          operating_expenses: number
          property_id: string | null
          revpar: number | null
          source: string | null
          updated_at: string | null
        }
        Insert: {
          avg_daily_rate?: number | null
          booking_pace?: number | null
          competitive_index?: number | null
          created_at?: string | null
          data_source?: string | null
          expense_amount?: number | null
          expense_category?: string | null
          forecast_revenue?: number | null
          id?: string
          last_sync_hostaway?: string | null
          last_sync_pricelabs?: string | null
          market_demand_score?: number | null
          month: string
          monthly_revenue?: number
          net_operating_income?: number
          occupancy_rate?: number | null
          operating_expenses?: number
          property_id?: string | null
          revpar?: number | null
          source?: string | null
          updated_at?: string | null
        }
        Update: {
          avg_daily_rate?: number | null
          booking_pace?: number | null
          competitive_index?: number | null
          created_at?: string | null
          data_source?: string | null
          expense_amount?: number | null
          expense_category?: string | null
          forecast_revenue?: number | null
          id?: string
          last_sync_hostaway?: string | null
          last_sync_pricelabs?: string | null
          market_demand_score?: number | null
          month?: string
          monthly_revenue?: number
          net_operating_income?: number
          occupancy_rate?: number | null
          operating_expenses?: number
          property_id?: string | null
          revpar?: number | null
          source?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_metrics_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      guests: {
        Row: {
          average_rating: number | null
          created_at: string | null
          email: string | null
          first_name: string
          id: string
          last_name: string
          last_stay_date: string | null
          nationality: string | null
          phone: string | null
          preferred_language: string | null
          total_stays: number | null
          updated_at: string | null
        }
        Insert: {
          average_rating?: number | null
          created_at?: string | null
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          last_stay_date?: string | null
          nationality?: string | null
          phone?: string | null
          preferred_language?: string | null
          total_stays?: number | null
          updated_at?: string | null
        }
        Update: {
          average_rating?: number | null
          created_at?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          last_stay_date?: string | null
          nationality?: string | null
          phone?: string | null
          preferred_language?: string | null
          total_stays?: number | null
          updated_at?: string | null
        }
        Relationships: []
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
      page_analytics: {
        Row: {
          created_at: string
          duration_ms: number | null
          id: string
          path: string
          session_end: string | null
          session_start: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          duration_ms?: number | null
          id?: string
          path: string
          session_end?: string | null
          session_start: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          duration_ms?: number | null
          id?: string
          path?: string
          session_end?: string | null
          session_start?: string
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
      properties: {
        Row: {
          area_sqft: number
          bathrooms: number
          bedrooms: number
          created_at: string
          current_value: number
          external_id: string | null
          external_source: string | null
          id: string
          is_furnished: boolean | null
          last_renovation_date: string | null
          last_sync_at: string | null
          location: string
          maintenance_status: string | null
          manager_id: string | null
          market_rate: number | null
          monthly_rent: number
          name: string
          occupancy_rate: number | null
          owner_id: string | null
          property_type: Database["public"]["Enums"]["property_type"]
          purchase_price: number
          updated_at: string
        }
        Insert: {
          area_sqft: number
          bathrooms: number
          bedrooms: number
          created_at?: string
          current_value: number
          external_id?: string | null
          external_source?: string | null
          id?: string
          is_furnished?: boolean | null
          last_renovation_date?: string | null
          last_sync_at?: string | null
          location: string
          maintenance_status?: string | null
          manager_id?: string | null
          market_rate?: number | null
          monthly_rent: number
          name: string
          occupancy_rate?: number | null
          owner_id?: string | null
          property_type: Database["public"]["Enums"]["property_type"]
          purchase_price: number
          updated_at?: string
        }
        Update: {
          area_sqft?: number
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          current_value?: number
          external_id?: string | null
          external_source?: string | null
          id?: string
          is_furnished?: boolean | null
          last_renovation_date?: string | null
          last_sync_at?: string | null
          location?: string
          maintenance_status?: string | null
          manager_id?: string | null
          market_rate?: number | null
          monthly_rent?: number
          name?: string
          occupancy_rate?: number | null
          owner_id?: string | null
          property_type?: Database["public"]["Enums"]["property_type"]
          purchase_price?: number
          updated_at?: string
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
      property_expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          description: string | null
          expense_date: string
          id: string
          property_id: string | null
          receipt_url: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          description?: string | null
          expense_date: string
          id?: string
          property_id?: string | null
          receipt_url?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          description?: string | null
          expense_date?: string
          id?: string
          property_id?: string | null
          receipt_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_expenses_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_investments: {
        Row: {
          created_at: string
          id: string
          investment_amount: number
          ownership_percentage: number
          property_id: string
          shareholder_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          investment_amount: number
          ownership_percentage: number
          property_id: string
          shareholder_id: string
        }
        Update: {
          created_at?: string
          id?: string
          investment_amount?: number
          ownership_percentage?: number
          property_id?: string
          shareholder_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_investments_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_investments_shareholder_id_fkey"
            columns: ["shareholder_id"]
            isOneToOne: false
            referencedRelation: "shareholders"
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
          user_id: string | null
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
          user_id?: string | null
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
          user_id?: string | null
        }
        Relationships: []
      }
      quacq_feedback: {
        Row: {
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          status: string | null
          type: Database["public"]["Enums"]["quacq_feedback_type"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          status?: string | null
          type: Database["public"]["Enums"]["quacq_feedback_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          status?: string | null
          type?: Database["public"]["Enums"]["quacq_feedback_type"]
          updated_at?: string | null
          user_id?: string | null
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
      shareholders: {
        Row: {
          created_at: string
          full_name: string
          id: string
          is_active: boolean | null
          ownership_percentage: number
          role: Database["public"]["Enums"]["investment_role"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: string
          is_active?: boolean | null
          ownership_percentage: number
          role: Database["public"]["Enums"]["investment_role"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          ownership_percentage?: number
          role?: Database["public"]["Enums"]["investment_role"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      uae_market_indicators: {
        Row: {
          created_at: string
          id: string
          indicator_type: string
          location: string
          property_type: string | null
          segment: string | null
          time_period: string
          unit: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          indicator_type: string
          location: string
          property_type?: string | null
          segment?: string | null
          time_period: string
          unit: string
          updated_at?: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          indicator_type?: string
          location?: string
          property_type?: string | null
          segment?: string | null
          time_period?: string
          unit?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
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
      user_preferences: {
        Row: {
          created_at: string
          has_completed_tour: boolean | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          has_completed_tour?: boolean | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          has_completed_tour?: boolean | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
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
      booking_status: "confirmed" | "pending" | "cancelled" | "completed"
      feedback_type: "stay" | "suggestion" | "general"
      investment_role: "founder" | "coo" | "investor"
      property_type: "apartment" | "villa" | "townhouse" | "penthouse"
      quacq_feedback_type: "general" | "bug" | "feature"
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

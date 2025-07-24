export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      banners: {
        Row: {
          button_action: string | null
          button_text: string | null
          created_at: string
          description: string | null
          id: string
          image: string
          is_active: boolean | null
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          button_action?: string | null
          button_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image: string
          is_active?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          button_action?: string | null
          button_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      branch_products: {
        Row: {
          branch_id: string
          created_at: string
          id: string
          is_available: boolean | null
          product_id: string
        }
        Insert: {
          branch_id: string
          created_at?: string
          id?: string
          is_available?: boolean | null
          product_id: string
        }
        Update: {
          branch_id?: string
          created_at?: string
          id?: string
          is_available?: boolean | null
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "branch_products_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "branch_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          address: string
          created_at: string
          id: string
          is_open: boolean
          name: string
          opening_hours: string
          updated_at: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          is_open?: boolean
          name: string
          opening_hours: string
          updated_at?: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          is_open?: boolean
          name?: string
          opening_hours?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          icon: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          address: string
          business_field: string
          capital_amount: number | null
          city: string
          company_name: string
          company_type: string
          created_at: string
          email: string
          employee_count: number | null
          establishment_date: string | null
          id: string
          is_verified: boolean | null
          phone: string
          postal_code: string
          registration_number: string
          tax_number: string | null
          updated_at: string
          verification_notes: string | null
          website: string | null
        }
        Insert: {
          address: string
          business_field: string
          capital_amount?: number | null
          city: string
          company_name: string
          company_type: string
          created_at?: string
          email: string
          employee_count?: number | null
          establishment_date?: string | null
          id?: string
          is_verified?: boolean | null
          phone: string
          postal_code: string
          registration_number: string
          tax_number?: string | null
          updated_at?: string
          verification_notes?: string | null
          website?: string | null
        }
        Update: {
          address?: string
          business_field?: string
          capital_amount?: number | null
          city?: string
          company_name?: string
          company_type?: string
          created_at?: string
          email?: string
          employee_count?: number | null
          establishment_date?: string | null
          id?: string
          is_verified?: boolean | null
          phone?: string
          postal_code?: string
          registration_number?: string
          tax_number?: string | null
          updated_at?: string
          verification_notes?: string | null
          website?: string | null
        }
        Relationships: []
      }
      company_pics: {
        Row: {
          company_id: string
          created_at: string
          email: string
          full_name: string
          id: string
          id_number: string
          is_primary: boolean | null
          phone: string
          position: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          id_number: string
          is_primary?: boolean | null
          phone: string
          position: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          id_number?: string
          is_primary?: boolean | null
          phone?: string
          position?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_pics_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluation_layers: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          layer_name: string
          layer_number: number
          phase: number
          required_role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          layer_name: string
          layer_number: number
          phase: number
          required_role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          layer_name?: string
          layer_number?: number
          phase?: number
          required_role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      indonesian_states: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          delivery_status: string | null
          error_message: string | null
          id: string
          notification_type: string
          permit_id: string | null
          recipient_email: string
          recipient_type: string
          sent_at: string | null
          subject: string
        }
        Insert: {
          content: string
          created_at?: string
          delivery_status?: string | null
          error_message?: string | null
          id?: string
          notification_type: string
          permit_id?: string | null
          recipient_email: string
          recipient_type: string
          sent_at?: string | null
          subject: string
        }
        Update: {
          content?: string
          created_at?: string
          delivery_status?: string | null
          error_message?: string | null
          id?: string
          notification_type?: string
          permit_id?: string | null
          recipient_email?: string
          recipient_type?: string
          sent_at?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_permit_id_fkey"
            columns: ["permit_id"]
            isOneToOne: false
            referencedRelation: "permits"
            referencedColumns: ["id"]
          },
        ]
      }
      onsite_evaluations: {
        Row: {
          company_representatives: Json | null
          completed_at: string | null
          created_at: string
          evaluation_checklist: Json | null
          evaluator_team: Json | null
          findings: string | null
          id: string
          location: string | null
          permit_id: string
          photos: Json | null
          recommendations: string | null
          scheduled_date: string | null
          scheduled_time: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          company_representatives?: Json | null
          completed_at?: string | null
          created_at?: string
          evaluation_checklist?: Json | null
          evaluator_team?: Json | null
          findings?: string | null
          id?: string
          location?: string | null
          permit_id: string
          photos?: Json | null
          recommendations?: string | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          company_representatives?: Json | null
          completed_at?: string | null
          created_at?: string
          evaluation_checklist?: Json | null
          evaluator_team?: Json | null
          findings?: string | null
          id?: string
          location?: string | null
          permit_id?: string
          photos?: Json | null
          recommendations?: string | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "onsite_evaluations_permit_id_fkey"
            columns: ["permit_id"]
            isOneToOne: false
            referencedRelation: "permits"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          branch_id: string | null
          created_at: string
          delivery_address: string | null
          discount_amount: number | null
          guest_email: string | null
          guest_name: string | null
          guest_phone: string | null
          id: string
          notes: string | null
          order_type: string | null
          promo_code: string | null
          status: string | null
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          branch_id?: string | null
          created_at?: string
          delivery_address?: string | null
          discount_amount?: number | null
          guest_email?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          id?: string
          notes?: string | null
          order_type?: string | null
          promo_code?: string | null
          status?: string | null
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          branch_id?: string | null
          created_at?: string
          delivery_address?: string | null
          discount_amount?: number | null
          guest_email?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          id?: string
          notes?: string | null
          order_type?: string | null
          promo_code?: string | null
          status?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
      permit_categories: {
        Row: {
          code: string
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      permit_documents: {
        Row: {
          created_at: string
          document_name: string
          document_type: string
          file_size: number | null
          file_url: string
          id: string
          mime_type: string | null
          permit_id: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["document_status"] | null
          updated_at: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          document_name: string
          document_type: string
          file_size?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          permit_id: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          updated_at?: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          document_name?: string
          document_type?: string
          file_size?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          permit_id?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          updated_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "permit_documents_permit_id_fkey"
            columns: ["permit_id"]
            isOneToOne: false
            referencedRelation: "permits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permit_documents_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "system_users"
            referencedColumns: ["id"]
          },
        ]
      }
      permit_evaluations: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          completed_at: string | null
          correction_notes: Json | null
          created_at: string
          evaluator_id: string
          id: string
          layer_number: number
          notes: string | null
          permit_id: string
          phase: number
          result: Database["public"]["Enums"]["evaluation_result"] | null
          score: number | null
          updated_at: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          completed_at?: string | null
          correction_notes?: Json | null
          created_at?: string
          evaluator_id: string
          id?: string
          layer_number: number
          notes?: string | null
          permit_id: string
          phase: number
          result?: Database["public"]["Enums"]["evaluation_result"] | null
          score?: number | null
          updated_at?: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          completed_at?: string | null
          correction_notes?: Json | null
          created_at?: string
          evaluator_id?: string
          id?: string
          layer_number?: number
          notes?: string | null
          permit_id?: string
          phase?: number
          result?: Database["public"]["Enums"]["evaluation_result"] | null
          score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "permit_evaluations_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "system_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permit_evaluations_evaluator_id_fkey"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "system_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permit_evaluations_permit_id_fkey"
            columns: ["permit_id"]
            isOneToOne: false
            referencedRelation: "permits"
            referencedColumns: ["id"]
          },
        ]
      }
      permit_subtypes: {
        Row: {
          category_id: string
          code: string
          created_at: string
          description: string | null
          evaluation_criteria: Json | null
          id: string
          is_active: boolean | null
          name: string
          processing_time_days: number | null
          required_documents: Json
          required_form_fields: Json
          updated_at: string
        }
        Insert: {
          category_id: string
          code: string
          created_at?: string
          description?: string | null
          evaluation_criteria?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          processing_time_days?: number | null
          required_documents?: Json
          required_form_fields?: Json
          updated_at?: string
        }
        Update: {
          category_id?: string
          code?: string
          created_at?: string
          description?: string | null
          evaluation_criteria?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          processing_time_days?: number | null
          required_documents?: Json
          required_form_fields?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "permit_subtypes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "permit_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      permit_types: {
        Row: {
          code: string
          created_at: string
          description: string | null
          evaluation_criteria: Json | null
          id: string
          is_active: boolean | null
          name: string
          required_documents: Json | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          evaluation_criteria?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          required_documents?: Json | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          evaluation_criteria?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          required_documents?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      permits: {
        Row: {
          approved_at: string | null
          company_id: string
          created_at: string
          current_layer: number | null
          description: string | null
          digital_signature: string | null
          final_result: Database["public"]["Enums"]["evaluation_result"] | null
          id: string
          permit_letter_url: string | null
          permit_number: string | null
          permit_subtype_id: string | null
          permit_type_id: string
          phase: number | null
          qr_code: string | null
          status: Database["public"]["Enums"]["permit_status"] | null
          submission_data: Json | null
          submitted_at: string | null
          title: string
          total_score: number | null
          updated_at: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          approved_at?: string | null
          company_id: string
          created_at?: string
          current_layer?: number | null
          description?: string | null
          digital_signature?: string | null
          final_result?: Database["public"]["Enums"]["evaluation_result"] | null
          id?: string
          permit_letter_url?: string | null
          permit_number?: string | null
          permit_subtype_id?: string | null
          permit_type_id: string
          phase?: number | null
          qr_code?: string | null
          status?: Database["public"]["Enums"]["permit_status"] | null
          submission_data?: Json | null
          submitted_at?: string | null
          title: string
          total_score?: number | null
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          approved_at?: string | null
          company_id?: string
          created_at?: string
          current_layer?: number | null
          description?: string | null
          digital_signature?: string | null
          final_result?: Database["public"]["Enums"]["evaluation_result"] | null
          id?: string
          permit_letter_url?: string | null
          permit_number?: string | null
          permit_subtype_id?: string | null
          permit_type_id?: string
          phase?: number | null
          qr_code?: string | null
          status?: Database["public"]["Enums"]["permit_status"] | null
          submission_data?: Json | null
          submitted_at?: string | null
          title?: string
          total_score?: number | null
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permits_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permits_permit_subtype_id_fkey"
            columns: ["permit_subtype_id"]
            isOneToOne: false
            referencedRelation: "permit_subtypes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permits_permit_type_id_fkey"
            columns: ["permit_type_id"]
            isOneToOne: false
            referencedRelation: "permit_types"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          image: string | null
          ingredients: string[] | null
          is_banner: boolean | null
          is_recommended: boolean | null
          name: string
          nutrition_info: string | null
          price: number
          rating: number | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          ingredients?: string[] | null
          is_banner?: boolean | null
          is_recommended?: boolean | null
          name: string
          nutrition_info?: string | null
          price: number
          rating?: number | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          ingredients?: string[] | null
          is_banner?: boolean | null
          is_recommended?: boolean | null
          name?: string
          nutrition_info?: string | null
          price?: number
          rating?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          gender: string | null
          id: string
          name: string | null
          phone: string | null
          preferences: string | null
          status: string | null
          total_spent: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          preferences?: string | null
          status?: string | null
          total_spent?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          preferences?: string | null
          status?: string | null
          total_spent?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      promos: {
        Row: {
          code: string
          created_at: string
          description: string | null
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean | null
          title: string
          updated_at: string
          valid_until: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          discount_type: string
          discount_value: number
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string
          valid_until: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string
          valid_until?: string
        }
        Relationships: []
      }
      system_users: {
        Row: {
          created_at: string
          department: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          supervisor_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email: string
          full_name: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role: Database["public"]["Enums"]["user_role"]
          supervisor_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          supervisor_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_users_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "system_users"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          attachments: Json | null
          created_at: string
          id: string
          message: string
          sender_id: string
          sender_type: string
          ticket_id: string
        }
        Insert: {
          attachments?: Json | null
          created_at?: string
          id?: string
          message: string
          sender_id: string
          sender_type: string
          ticket_id: string
        }
        Update: {
          attachments?: Json | null
          created_at?: string
          id?: string
          message?: string
          sender_id?: string
          sender_type?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          assigned_to: string | null
          company_id: string
          created_at: string
          created_by: string
          description: string
          id: string
          permit_id: string | null
          priority: string | null
          resolved_at: string | null
          status: string | null
          subject: string
          ticket_number: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          company_id: string
          created_at?: string
          created_by: string
          description: string
          id?: string
          permit_id?: string | null
          priority?: string | null
          resolved_at?: string | null
          status?: string | null
          subject: string
          ticket_number: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          company_id?: string
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          permit_id?: string | null
          priority?: string | null
          resolved_at?: string | null
          status?: string | null
          subject?: string
          ticket_number?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "system_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_permit_id_fkey"
            columns: ["permit_id"]
            isOneToOne: false
            referencedRelation: "permits"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_company_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_system_role: {
        Args: { required_role: Database["public"]["Enums"]["user_role"] }
        Returns: boolean
      }
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
      is_system_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      document_status:
        | "uploaded"
        | "under_review"
        | "approved"
        | "rejected"
        | "revision_required"
      evaluation_result: "approved" | "rejected" | "revision_required"
      permit_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "layer_1_review"
        | "layer_2_review"
        | "layer_3_review"
        | "layer_4_review"
        | "approved_for_onsite"
        | "onsite_layer_1"
        | "onsite_layer_2"
        | "onsite_layer_3"
        | "onsite_layer_4"
        | "director_review"
        | "approved"
        | "rejected"
        | "revision_required"
      user_role:
        | "company_user"
        | "company_admin"
        | "evaluator"
        | "coordinator"
        | "superior"
        | "director"
        | "system_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_status: [
        "uploaded",
        "under_review",
        "approved",
        "rejected",
        "revision_required",
      ],
      evaluation_result: ["approved", "rejected", "revision_required"],
      permit_status: [
        "draft",
        "submitted",
        "under_review",
        "layer_1_review",
        "layer_2_review",
        "layer_3_review",
        "layer_4_review",
        "approved_for_onsite",
        "onsite_layer_1",
        "onsite_layer_2",
        "onsite_layer_3",
        "onsite_layer_4",
        "director_review",
        "approved",
        "rejected",
        "revision_required",
      ],
      user_role: [
        "company_user",
        "company_admin",
        "evaluator",
        "coordinator",
        "superior",
        "director",
        "system_admin",
      ],
    },
  },
} as const

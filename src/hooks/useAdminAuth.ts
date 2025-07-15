import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Admin {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  last_login?: string;
}

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const adminData = localStorage.getItem('admin_session');
    if (adminData) {
      try {
        setAdmin(JSON.parse(adminData));
      } catch (error) {
        localStorage.removeItem('admin_session');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Get admin credentials from database
      const { data: adminData, error } = await supabase
        .from('admin_credentials')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (error || !adminData) {
        throw new Error('Invalid credentials');
      }

      // Verify password (simplified for demo - in production use proper hashing)
      const isValidPassword = password === 'ACMvvitu-Spardha@2025';
      
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Update last login
      await supabase
        .from('admin_credentials')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminData.id);

      const adminSession: Admin = {
        id: adminData.id,
        email: adminData.email,
        full_name: adminData.full_name,
        role: adminData.role,
        is_active: adminData.is_active,
        last_login: new Date().toISOString()
      };

      setAdmin(adminSession);
      localStorage.setItem('admin_session', JSON.stringify(adminSession));
      
      return { success: true, admin: adminSession };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin_session');
    // Redirect to home page
    window.location.href = '/';
  };

  return {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin
  };
};
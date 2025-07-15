import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  Calendar,
  LogOut, 
  Shield,
  Mail,
  Phone,
  Building,
  Clock,
  Download,
  Sun,
  Moon
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

interface UserRegistration {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  college?: string;
  department?: string;
  year_of_study?: number;
  registration_type: string;
  team_name?: string;
  team_members?: any;
  events_registered: any;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  description?: string;
  event_type: string;
  venue?: string;
  event_date?: string;
  max_participants?: number;
  is_team_event: boolean;
  max_team_size?: number;
  is_active: boolean;
  created_at: string;
}

interface DashboardStats {
  totalRegistrations: number;
  eventRegistrations: { [eventTitle: string]: number };
}

const AdminDashboard = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { admin, loading, logout, isAuthenticated } = useAdminAuth();
  const [registrations, setRegistrations] = useState<UserRegistration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalRegistrations: 0,
    eventRegistrations: {}
  });
  const [loadingData, setLoadingData] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }
    if (isAuthenticated && admin) {
      fetchDashboardData();
    }
  }, [isAuthenticated, admin, loading, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoadingData(true);

      // Fetch registrations
      const { data: registrationsData, error: regError } = await supabase
        .from('user_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (regError) throw regError;

      // Fetch events
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (eventsError) throw eventsError;

      setRegistrations(registrationsData || []);
      setEvents(eventsData || []);

      // Calculate stats
      const totalRegistrations = registrationsData?.length || 0;
      
      // Calculate registrations per event
      const eventRegistrations: { [eventTitle: string]: number } = {};
      
      registrationsData?.forEach(reg => {
        if (Array.isArray(reg.events_registered)) {
          reg.events_registered.forEach((eventTitle: string) => {
            eventRegistrations[eventTitle] = (eventRegistrations[eventTitle] || 0) + 1;
          });
        }
      });

      setStats({
        totalRegistrations,
        eventRegistrations
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoadingData(false);
    }
  };

  const downloadExcel = () => {
    try {
      // Prepare data for Excel
      const excelData = registrations.map(reg => ({
        'Full Name': reg.full_name,
        'Email': reg.email,
        'Phone': reg.phone || 'N/A',
        'College': reg.college || 'N/A',
        'Department': reg.department || 'N/A',
        'Year of Study': reg.year_of_study || 'N/A',
        'Registration Type': reg.registration_type,
        'Team Name': reg.team_name || 'N/A',
        'Events Registered': Array.isArray(reg.events_registered) ? reg.events_registered.join(', ') : 'N/A',
        'Registration Date': formatDate(reg.created_at)
      }));

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Registrations');

      // Generate Excel file and download
      XLSX.writeFile(wb, `Spardha_2025_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`);

      toast({
        title: "Success",
        description: "Excel file downloaded successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to download Excel file",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated && !loading) {
    return null; // Navigation will handle redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Header */}
      <header className="glass-card border-b-0 rounded-none shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">Spardha 2025 Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-foreground">{admin?.full_name}</p>
                <Badge variant="outline" className="text-xs">
                  {admin?.role?.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              
              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Button variant="outline" onClick={() => {
                logout();
                navigate('/', { replace: true });
              }} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
              <p className="text-xs text-muted-foreground">
                All participants registered
              </p>
            </CardContent>
          </Card>

          {Object.entries(stats.eventRegistrations).map(([eventTitle, count]) => (
            <Card key={eventTitle} className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{eventTitle}</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground">
                  Registrations
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>User Registrations</span>
                  </CardTitle>
                  <CardDescription>
                    View and manage all user registrations for Spardha 2025
                  </CardDescription>
                </div>
                <Button onClick={downloadExcel} className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Excel</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingData ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>College</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Events</TableHead>
                        <TableHead>Registered</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.map((registration) => (
                        <TableRow key={registration.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              <div>
                                <p className="font-semibold">{registration.full_name}</p>
                                {registration.phone && (
                                  <p className="text-xs text-muted-foreground flex items-center">
                                    <Phone className="h-3 w-3 mr-1" />
                                    {registration.phone}
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Mail className="h-3 w-3" />
                              <span className="text-sm">{registration.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Building className="h-3 w-3" />
                              <span className="text-sm">{registration.college || 'N/A'}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {registration.registration_type}
                            </Badge>
                            {registration.team_name && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Team: {registration.team_name}
                              </p>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {Array.isArray(registration.events_registered) 
                                ? registration.events_registered.join(', ') 
                                : 'N/A'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span className="text-xs">{formatDate(registration.created_at)}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
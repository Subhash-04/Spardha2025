import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Download
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
  activeEvents: number;
  teamRegistrations: number;
  individualRegistrations: number;
}

const AdminDashboard = () => {
  const { admin, loading, logout, isAuthenticated } = useAdminAuth();
  const [registrations, setRegistrations] = useState<UserRegistration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalRegistrations: 0,
    activeEvents: 0,
    teamRegistrations: 0,
    individualRegistrations: 0
  });
  const [loadingData, setLoadingData] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && admin) {
      fetchDashboardData();
    }
  }, [isAuthenticated, admin]);

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
      const teamRegistrations = registrationsData?.filter(reg => reg.registration_type === 'team').length || 0;
      const individualRegistrations = registrationsData?.filter(reg => reg.registration_type === 'individual').length || 0;
      const activeEvents = eventsData?.filter(event => event.is_active).length || 0;

      setStats({
        totalRegistrations,
        activeEvents,
        teamRegistrations,
        individualRegistrations
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

  if (!isAuthenticated) {
    return <AdminLogin onClose={() => {}} />;
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
              <Button variant="outline" onClick={logout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Registrations</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.teamRegistrations}</div>
              <p className="text-xs text-muted-foreground">
                Teams registered
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Individual Registrations</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.individualRegistrations}</div>
              <p className="text-xs text-muted-foreground">
                Individual participants
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Events</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeEvents}</div>
              <p className="text-xs text-muted-foreground">
                Currently open for registration
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Tabs defaultValue="registrations" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="registrations">User Registrations</TabsTrigger>
              <TabsTrigger value="events">Event Management</TabsTrigger>
            </TabsList>

            <TabsContent value="registrations" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Event Management</span>
                  </CardTitle>
                  <CardDescription>
                    Manage events, schedules, and configurations
                  </CardDescription>
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
                            <TableHead>Event</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Venue</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Participants</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {events.map((event) => (
                            <TableRow key={event.id}>
                              <TableCell className="font-medium">
                                <div>
                                  <p className="font-semibold">{event.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {event.description?.substring(0, 50)}...
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {event.event_type}
                                </Badge>
                              </TableCell>
                              <TableCell>{event.venue || 'TBA'}</TableCell>
                              <TableCell>
                                {event.event_date ? formatDate(event.event_date) : 'TBA'}
                              </TableCell>
                              <TableCell>
                                {event.max_participants ? `Max: ${event.max_participants}` : 'Unlimited'}
                                {event.is_team_event && (
                                  <p className="text-xs text-muted-foreground">
                                    Team Event (Max: {event.max_team_size || 'N/A'} per team)
                                  </p>
                                )}
                              </TableCell>
                              <TableCell>
                                {event.is_active ? (
                                  <Badge className="bg-green-500">Active</Badge>
                                ) : (
                                  <Badge variant="secondary">Inactive</Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
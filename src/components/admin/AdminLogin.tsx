import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Mail, X } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  onClose?: () => void;
  showSuccessOnly?: boolean;
}

export const AdminLogin = ({ onClose, showSuccessOnly = false }: AdminLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { login } = useAdminAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      setLoginSuccess(true);
      toast({
        title: "Success",
        description: "Login successful! You can now access the admin dashboard."
      });
      // Don't close automatically - let user see success message
    } else {
      toast({
        title: "Error",
        description: result.error || "Invalid credentials",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  if (loginSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-12 w-12 text-green-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Login Successful!
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            You have been successfully authenticated as an admin.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Close
          </Button>
          <Button
            onClick={() => window.location.href = '/admin'}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // When in modal mode (showSuccessOnly), render as component without full page styles
  if (showSuccessOnly) {
    return (
      <div className="text-center space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gradient mb-2">
            Admin Login
          </h2>
          <p className="text-muted-foreground">Access Spardha 2025 Admin Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@spardha.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neu-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Password</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="neu-input"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full glass-intense"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 p-4">
      <Card className="w-full max-w-md glass-card">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <p className="text-muted-foreground">Access Spardha 2025 Admin Dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@spardha.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="neu-input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="neu-input"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full glass-intense"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Demo credentials:
            </p>
            <p className="text-sm font-mono text-center mt-1">
              Email: admin@spardha.com<br />
              Password: ACMvvitu-Spardha@2025
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
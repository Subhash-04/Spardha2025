import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface AdminLoginProps {
  onClose: () => void;
}

export const AdminLogin = ({ onClose }: AdminLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const correctCredentials = {
    email: 'acmvvit@gmail.com',
    password: 'ACMvvitu-Spardha@2025'
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      if (email === correctCredentials.email && password === correctCredentials.password) {
        login();
        toast({
          title: "Login Successful",
          description: "Welcome to Spardha 2025 Admin Panel",
        });
        onClose();
        // Redirect to admin dashboard
        window.location.hash = '#admin';
      } else {
        toast({
          title: "Invalid Credentials",
          description: "Please check your email and password",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gradient mb-2">
          Admin Login
        </h2>
        <p className="text-muted-foreground text-sm">
          Enter your admin credentials to access the dashboard
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="acmvvit@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="neu-input"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="neu-input"
            disabled={isLoading}
          />
        </div>

        <div className="flex space-x-3 pt-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 neu-button"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogin}
            className="flex-1 glass-button"
            disabled={isLoading || !email.trim() || !password.trim()}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="spinner w-4 h-4" />
                <span>Logging in...</span>
              </div>
            ) : (
              'Login'
            )}
          </Button>
        </div>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Only authorized administrators can access the system
      </div>
    </motion.div>
  );
};
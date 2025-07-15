import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { AdminLogin } from './AdminLogin';
import { X } from 'lucide-react';

interface PinVerificationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PinVerification = ({ isOpen, onClose }: PinVerificationProps) => {
  const [pin, setPin] = useState('');
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const correctPin = '0321';

  const handlePinSubmit = () => {
    if (!pin.trim()) {
      toast({
        title: "Error",
        description: "Please enter the PIN",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate verification delay
    setTimeout(() => {
      if (pin === correctPin) {
        setIsPinVerified(true);
        toast({
          title: "PIN Verified",
          description: "Access granted. Please login with admin credentials.",
        });
      } else {
        toast({
          title: "Invalid PIN",
          description: "You don't need to login. Only app creator can login. If you're the app creator, enter the correct PIN.",
          variant: "destructive"
        });
        setPin('');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePinSubmit();
    }
  };

  const handleClose = () => {
    setPin('');
    setIsPinVerified(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />

        {/* Dialog Content */}
        <motion.div
          className="relative glass-card p-8 w-full max-w-md mx-4"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {/* Close Button */}
          <Button
            onClick={handleClose}
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>

          {!isPinVerified ? (
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gradient mb-2">
                  Admin Access
                </h2>
                <p className="text-muted-foreground text-sm">
                  You don't need to login. Only app creator can login.
                  <br />
                  If you're the app creator, enter the PIN.
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="neu-input text-center text-lg font-mono"
                  maxLength={4}
                  disabled={isLoading}
                />

                <div className="flex space-x-3">
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1 neu-button"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePinSubmit}
                    className="flex-1 glass-button"
                    disabled={isLoading || !pin.trim()}
                  >
                    {isLoading ? (
                      <div className="spinner w-4 h-4" />
                    ) : (
                      'Verify'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <AdminLogin onClose={handleClose} showSuccessOnly={true} />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
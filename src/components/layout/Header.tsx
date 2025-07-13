import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PinVerification } from '@/components/admin/PinVerification';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export const Header = ({ isDark, onThemeToggle }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPinDialog, setShowPinDialog] = useState(false);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#events', label: 'Events' },
    { href: '#navigation', label: 'Campus' },
    { href: '#register', label: 'Register' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 glass-card border-b"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="text-2xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SPARDHA'25
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-colors relative"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Admin Dashboard Link */}
              <Link to="/admin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex items-center space-x-2 neu-button"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </Button>
              </Link>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onThemeToggle}
                className="neu-button"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden neu-button"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            className={`md:hidden mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0, 
              height: isMenuOpen ? 'auto' : 0 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-card p-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              <Link to="/admin" className="block w-full">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors py-2 w-full"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </button>
              </Link>
            </div>
          </motion.div>
        </nav>
      </motion.header>

      {/* PIN Verification Dialog */}
      <PinVerification 
        isOpen={showPinDialog}
        onClose={() => setShowPinDialog(false)}
      />
    </>
  );
};
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number'),
  event: z.string().min(1, 'Please select an event'),
  collegeId: z.string().min(3, 'College ID must be at least 3 characters'),
  collegeName: z.string().min(3, 'College name must be at least 3 characters'),
  yearOfStudy: z.string().min(1, 'Please select your year of study'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const yearOfStudy = watch('yearOfStudy');
  const selectedEvent = watch('event');

  // Define event options
  const events = [
    { value: 'coding-contest', label: '💻 Coding Contest' },
    { value: 'web-development', label: '🌐 Web Development' },
    { value: 'ai-ml-challenge', label: '🤖 AI/ML Challenge' },
    { value: 'robotics', label: '🤖 Robotics Competition' },
    { value: 'hackathon', label: '⚡ 24hr Hackathon' },
    { value: 'quiz-competition', label: '🧠 Tech Quiz' },
    { value: 'photography', label: '📸 Photography Contest' },
    { value: 'cultural-dance', label: '💃 Cultural Dance' },
    { value: 'music-competition', label: '🎵 Music Competition' },
    { value: 'drama-theatre', label: '🎭 Drama & Theatre' },
    { value: 'startup-pitch', label: '🚀 Startup Pitch' },
    { value: 'gaming-esports', label: '🎮 Gaming & E-Sports' }
  ];

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual Supabase integration
      console.log('Registration data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Successful!",
        description: "Thank you for registering for Spardha 2025. We'll contact you soon!",
      });
      
      reset();
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Enhanced Premium Crystal Container */}
      <div className="premium-glass-card rounded-3xl p-10 relative overflow-hidden">
        {/* Ultra Crystal Background Effects */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-48 h-48 gradient-glass-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-56 h-56 gradient-glass-purple rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/2 w-40 h-40 gradient-glass-pink rounded-full blur-2xl -translate-x-1/2"></div>
        </div>

        {/* Premium Scan Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[scan-line_5s_linear_infinite]"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[scan-line_6s_linear_infinite_reverse]"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[scan-line_7s_linear_infinite] -translate-y-1/2"></div>
        </div>

        <div className="text-center mb-10 relative z-10">
          {/* Enhanced ACM VVITU Logo */}
          <motion.div
            className="mx-auto w-20 h-20 mb-6 crystal-glass rounded-3xl flex items-center justify-center"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          >
            <span className="text-3xl font-bold text-holographic font-orbitron">ACM</span>
          </motion.div>
          
          <h2 className="text-3xl font-bold text-holographic mb-2 font-orbitron">
            Register for Spardha 2025
          </h2>
          <p className="text-muted-foreground">
            Join the biggest techno-cultural fest of VVIT
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter your full name"
              className="neu-input"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your.email@example.com"
              className="neu-input"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </motion.div>

          {/* Mobile Number */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              type="tel"
              {...register('mobile')}
              placeholder="9876543210"
              className="neu-input"
              maxLength={10}
              disabled={isSubmitting}
            />
            {errors.mobile && (
              <p className="text-destructive text-sm">{errors.mobile.message}</p>
            )}
          </motion.div>

          {/* Event Selection */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Label htmlFor="event">Select Event *</Label>
            <Select
              value={selectedEvent}
              onValueChange={(value) => setValue('event', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="neu-input">
                <SelectValue placeholder="Choose your event" />
              </SelectTrigger>
              <SelectContent className="liquid-glass border border-border/30 backdrop-blur-xl z-50 max-h-60 overflow-y-auto">
                {events.map((event) => (
                  <SelectItem 
                    key={event.value} 
                    value={event.value}
                    className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer"
                  >
                    {event.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.event && (
              <p className="text-destructive text-sm">{errors.event.message}</p>
            )}
          </motion.div>

          {/* College ID and Name Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* College ID */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="collegeId">College ID *</Label>
              <Input
                id="collegeId"
                {...register('collegeId')}
                placeholder="e.g., 20A91A0501"
                className="neu-input"
                disabled={isSubmitting}
              />
              {errors.collegeId && (
                <p className="text-destructive text-sm">{errors.collegeId.message}</p>
              )}
            </motion.div>

            {/* Year of Study */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Label htmlFor="yearOfStudy">Year of Study *</Label>
              <Select
                value={yearOfStudy}
                onValueChange={(value) => setValue('yearOfStudy', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="neu-input">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent className="liquid-glass border border-border/30 backdrop-blur-xl z-50">
                  <SelectItem value="1st Year" className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">1st Year</SelectItem>
                  <SelectItem value="2nd Year" className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">2nd Year</SelectItem>
                  <SelectItem value="3rd Year" className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">3rd Year</SelectItem>
                  <SelectItem value="4th Year" className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">4th Year</SelectItem>
                </SelectContent>
              </Select>
              {errors.yearOfStudy && (
                <p className="text-destructive text-sm">{errors.yearOfStudy.message}</p>
              )}
            </motion.div>
          </div>

          {/* College Name */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Label htmlFor="collegeName">College Name *</Label>
            <Input
              id="collegeName"
              {...register('collegeName')}
              placeholder="e.g., Vasireddy Venkatadri Institute of Technology"
              className="neu-input"
              disabled={isSubmitting}
            />
            {errors.collegeName && (
              <p className="text-destructive text-sm">{errors.collegeName.message}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              type="submit"
              className="w-full glass-button text-lg py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="spinner w-5 h-5" />
                  <span>Registering...</span>
                </div>
              ) : (
                'Register for Spardha 2025'
              )}
            </Button>
          </motion.div>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          * Required fields
        </div>
      </div>
    </motion.div>
  );
};
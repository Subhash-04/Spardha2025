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
import { supabase } from '@/integrations/supabase/client';

const registrationSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number'),
  college: z.string().min(3, 'College name must be at least 3 characters'),
  department: z.string().optional(),
  year_of_study: z.number().min(1).max(4),
  registration_type: z.enum(['individual', 'team']),
  team_name: z.string().optional(),
  events_registered: z.array(z.string()).min(1, 'Please select at least one event'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export const RegistrationForm = () => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [registrationType, setRegistrationType] = useState<'individual' | 'team'>('individual');
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
    defaultValues: {
      registration_type: 'individual',
      events_registered: [],
      year_of_study: 1
    }
  });

  const yearOfStudy = watch('year_of_study');

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
      // Prepare data for database
      const registrationData = {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        college: data.college,
        department: data.department || null,
        year_of_study: data.year_of_study,
        registration_type: data.registration_type,
        team_name: data.registration_type === 'team' ? data.team_name : null,
        events_registered: data.events_registered
      };

      // Insert into Supabase
      const { error } = await supabase
        .from('user_registrations')
        .insert(registrationData);

      if (error) {
        throw error;
      }
      
      toast({
        title: "Registration Successful!",
        description: "Thank you for registering for Spardha 2025. We'll contact you soon!",
      });
      
      reset();
      setSelectedEvents([]);
      setRegistrationType('individual');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
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
      {/* Sophisticated Dashboard Container */}
      <div className="dashboard-glass rounded-3xl p-10 relative overflow-hidden">
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
            className="mx-auto w-20 h-20 mb-6 crystal-glass rounded-3xl flex items-center justify-center hover:scale-110 transition-all duration-300"
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
          {/* Full Name */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              {...register('full_name')}
              placeholder="Enter your full name"
              className="neu-input"
              disabled={isSubmitting}
            />
            {errors.full_name && (
              <p className="text-destructive text-sm">{errors.full_name.message}</p>
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
            <Label htmlFor="phone">Mobile Number *</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="9876543210"
              className="neu-input"
              maxLength={10}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone.message}</p>
            )}
          </motion.div>

          {/* Registration Type */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Label>Registration Type *</Label>
            <Select
              value={registrationType}
              onValueChange={(value: 'individual' | 'team') => {
                setRegistrationType(value);
                setValue('registration_type', value);
              }}
              disabled={isSubmitting}
            >
              <SelectTrigger className="neu-input">
                <SelectValue placeholder="Choose registration type" />
              </SelectTrigger>
              <SelectContent className="liquid-glass border border-border/30 backdrop-blur-xl z-50">
                <SelectItem value="individual" className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">
                  Individual Participation
                </SelectItem>
                <SelectItem value="team" className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">
                  Team Participation
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.registration_type && (
              <p className="text-destructive text-sm">{errors.registration_type.message}</p>
            )}
          </motion.div>

          {/* Team Name (only if team registration) */}
          {registrationType === 'team' && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="team_name">Team Name *</Label>
              <Input
                id="team_name"
                {...register('team_name')}
                placeholder="Enter your team name"
                className="neu-input"
                disabled={isSubmitting}
              />
              {errors.team_name && (
                <p className="text-destructive text-sm">{errors.team_name.message}</p>
              )}
            </motion.div>
          )}

          {/* Events Selection */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Label>Select Events *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border border-border/30 rounded-lg neu-input">
              {events.map((event) => (
                <label key={event.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event.value)}
                    onChange={(e) => {
                      let newEvents;
                      if (e.target.checked) {
                        newEvents = [...selectedEvents, event.value];
                      } else {
                        newEvents = selectedEvents.filter(ev => ev !== event.value);
                      }
                      setSelectedEvents(newEvents);
                      setValue('events_registered', newEvents);
                    }}
                    className="rounded border-border/30 text-primary focus:ring-primary"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm">{event.label}</span>
                </label>
              ))}
            </div>
            {errors.events_registered && (
              <p className="text-destructive text-sm">{errors.events_registered.message}</p>
            )}
          </motion.div>

          {/* College and Academic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* College Name */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Label htmlFor="college">College Name *</Label>
              <Input
                id="college"
                {...register('college')}
                placeholder="e.g., Vasireddy Venkatadri Institute of Technology"
                className="neu-input"
                disabled={isSubmitting}
              />
              {errors.college && (
                <p className="text-destructive text-sm">{errors.college.message}</p>
              )}
            </motion.div>

            {/* Department */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
            >
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                {...register('department')}
                placeholder="e.g., Computer Science Engineering"
                className="neu-input"
                disabled={isSubmitting}
              />
              {errors.department && (
                <p className="text-destructive text-sm">{errors.department.message}</p>
              )}
            </motion.div>
          </div>

          {/* Year of Study */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Label htmlFor="year_of_study">Year of Study *</Label>
            <Select
              value={yearOfStudy?.toString()}
              onValueChange={(value) => setValue('year_of_study', parseInt(value))}
              disabled={isSubmitting}
            >
              <SelectTrigger className="neu-input">
                <SelectValue placeholder="Select your year" />
              </SelectTrigger>
              <SelectContent className="liquid-glass border border-border/30 backdrop-blur-xl z-50">
                <SelectItem value="1" className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">1st Year</SelectItem>
                <SelectItem value="2" className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">2nd Year</SelectItem>
                <SelectItem value="3" className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">3rd Year</SelectItem>
                <SelectItem value="4" className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">4th Year</SelectItem>
              </SelectContent>
            </Select>
            {errors.year_of_study && (
              <p className="text-destructive text-sm">{errors.year_of_study.message}</p>
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
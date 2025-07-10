import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="glass-card p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 border border-primary rounded-full" />
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-primary rounded-full" />
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary rounded-full" />
          </div>

          <div className="relative z-10">
            {/* Section Title */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                About Spardha 2025
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-foreground">
                    Spardha is the flagship annual techno-cultural festival of VVIT, 
                    a vibrant confluence of minds where innovation meets creativity. 
                    It's a platform for students to showcase their technical prowess, 
                    creative talents, and competitive spirit.
                  </p>
                  
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Join us for an unforgettable experience filled with cutting-edge 
                    competitions, workshops, cultural performances, and networking 
                    opportunities that will shape your future.
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {[
                      { label: 'Technical Events', value: '10+' },
                      { label: 'Cultural Shows', value: '5+' },
                      { label: 'Workshops', value: '8+' },
                      { label: 'Prize Pool', value: '₹2L+' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        className="neu-card p-4 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="text-2xl font-bold text-primary mb-1">
                          {item.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Visual Element */}
                <div className="relative">
                  <motion.div
                    className="glass-card p-8 text-center"
                    initial={{ opacity: 0, rotate: -5 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold text-gradient mb-2">
                      Innovation Hub
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Where technology meets creativity and dreams become reality
                    </p>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/30 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>

            {/* AI Regenerate Button */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                className="neu-button group"
                // TODO: Add AI regeneration functionality
              >
                <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                Regenerate with AI
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
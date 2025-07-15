import { motion } from 'framer-motion';
import { Code, Bot, Palette, Brain, Gamepad2, Lightbulb, Calendar, Clock } from 'lucide-react';

const eventDays = [
  {
    day: 'Day 1',
    date: 'March 15, 2025',
    events: [
      {
        icon: Code,
        title: 'CodeSprint',
        description: 'A competitive programming challenge to test your coding skills.',
        time: '10:00 AM - 2:00 PM',
        venue: 'New Block - N503'
      },
      {
        icon: Bot,
        title: 'RoboWars',
        description: 'Battle it out in the arena with your custom-built robots.',
        time: '2:30 PM - 6:00 PM',
        venue: 'Ground Floor Arena'
      },
      {
        icon: Palette,
        title: 'Designathon',
        description: 'A creative marathon for designers to showcase their skills.',
        time: '11:00 AM - 5:00 PM',
        venue: 'Central Block'
      }
    ]
  },
  {
    day: 'Day 2',
    date: 'March 16, 2025',
    events: [
      {
        icon: Brain,
        title: 'Tech Quiz',
        description: 'Test your technical knowledge in this mind-bending quiz.',
        time: '10:00 AM - 12:00 PM',
        venue: 'Auditorium'
      },
      {
        icon: Gamepad2,
        title: 'Gaming Zone',
        description: 'Prove you\'re the ultimate gamer in multiple gaming competitions.',
        time: '1:00 PM - 6:00 PM',
        venue: 'Gaming Arena'
      },
      {
        icon: Lightbulb,
        title: 'Ideathon',
        description: 'Pitch your innovative ideas and win exciting prizes.',
        time: '2:00 PM - 5:00 PM',
        venue: 'Innovation Lab'
      }
    ]
  }
];

export const Events = () => {
  return (
    <section id="events" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 font-audiowide" style={{fontFamily: 'Audiowide, cursive'}}>
            Event Schedule
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Two days of incredible competitions, workshops, and networking opportunities
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Event Days */}
        <div className="space-y-16">
          {eventDays.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: dayIndex * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Day Header */}
              <div className="text-center mb-12">
                <motion.div
                  className="inline-flex items-center space-x-4 dashboard-glass px-8 py-4 mb-4 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Calendar className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="text-3xl font-bold text-gradient">{day.day}</h3>
                    <p className="text-muted-foreground">{day.date}</p>
                  </div>
                </motion.div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {day.events.map((event, eventIndex) => (
                  <motion.div
                    key={event.title}
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: dayIndex * 0.2 + eventIndex * 0.1 
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="crystal-glass p-6 h-full relative overflow-hidden rounded-2xl hover:scale-105 transition-all duration-300">
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                        <event.icon className="w-full h-full" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <motion.div
                          className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          <event.icon className="w-8 h-8 text-primary" />
                        </motion.div>

                        {/* Title */}
                        <h4 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                          {event.title}
                        </h4>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Details */}
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-2 text-primary" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <div className="w-4 h-4 mr-2 bg-primary rounded-full flex-shrink-0" />
                            {event.venue}
                          </div>
                        </div>

                        {/* Learn More Link */}
                        <motion.div
                          className="mt-4 pt-4 border-t border-border"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <button className="text-primary font-medium text-sm hover:text-primary-glow transition-colors group">
                            Learn More 
                            <motion.span
                              className="inline-block ml-1"
                              whileHover={{ x: 3 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              →
                            </motion.span>
                          </button>
                        </motion.div>
                      </div>

                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="dashboard-glass p-8 max-w-2xl mx-auto rounded-3xl">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Ready to Participate?
            </h3>
            <p className="text-muted-foreground mb-6">
              Register now to secure your spot in these amazing events and competitions.
            </p>
            <motion.button
              onClick={() => {
                const element = document.querySelector('#register');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="dashboard-glass px-8 py-3 text-lg hover:scale-105 transition-all duration-300 border-primary/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
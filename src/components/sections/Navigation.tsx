import { motion } from 'framer-motion';
import { MapPin, Building, Users, Cpu, FlaskConical, Microscope, Wifi, Coffee, BookOpen, Car } from 'lucide-react';

interface CampusBlock {
  id: string;
  name: string;
  color: string;
  position: { row: number; col: number };
  labs: string[];
  facilities: string[];
}

const campusBlocks: CampusBlock[] = [
  {
    id: 'A',
    name: 'Block A',
    color: 'from-blue-400 to-blue-600',
    position: { row: 1, col: 1 },
    labs: ['Computer Lab 1', 'Computer Lab 2', 'Software Lab'],
    facilities: ['Rooms: A101-A150', 'Wi-Fi Zone', 'Study Area']
  },
  {
    id: 'B', 
    name: 'Block B',
    color: 'from-purple-400 to-purple-600',
    position: { row: 1, col: 2 },
    labs: ['Electronics Lab', 'Digital Lab', 'VLSI Lab'],
    facilities: ['Rooms: B101-B150', 'Project Room', 'Seminar Hall']
  },
  {
    id: 'C',
    name: 'Block C', 
    color: 'from-green-400 to-green-600',
    position: { row: 2, col: 1 },
    labs: ['Physics Lab', 'Chemistry Lab', 'Bio-Tech Lab'],
    facilities: ['Rooms: C101-C150', 'Research Center', 'Library Wing']
  },
  {
    id: 'D',
    name: 'Block D',
    color: 'from-orange-400 to-orange-600', 
    position: { row: 2, col: 2 },
    labs: ['Mechanical Lab', 'CAD Lab', 'Workshop'],
    facilities: ['Rooms: D101-D150', 'Innovation Hub', 'Maker Space']
  },
  {
    id: 'NEW',
    name: 'New Block',
    color: 'from-cyan-400 to-cyan-600',
    position: { row: 1, col: 3 },
    labs: ['AI/ML Lab', 'Data Science Lab', 'IoT Lab'],
    facilities: ['Rooms: N101-N120', 'Co-working Space', 'Event Hall']
  }
];

const commonFacilities = [
  { name: 'Main Auditorium', icon: Users, description: 'Capacity: 500 seats' },
  { name: 'Central Library', icon: BookOpen, description: '24/7 Digital Access' },
  { name: 'Food Court', icon: Coffee, description: 'Multi-cuisine options' },
  { name: 'Parking Area', icon: Car, description: '200+ vehicle capacity' },
  { name: 'Sports Complex', icon: Building, description: 'Indoor & Outdoor' },
  { name: 'Wi-Fi Campus', icon: Wifi, description: 'High-speed internet' }
];

export const Navigation = () => {
  return (
    <section id="navigation" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-holographic font-orbitron mb-4">
            Campus Navigation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our state-of-the-art campus with modern facilities and advanced laboratories
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Campus Map Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Enhanced Liquid Glass Container */}
            <div className="liquid-glass rounded-3xl p-8 relative overflow-hidden">
              {/* Liquid Crystal Background Effect */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-primary-glow/15 to-accent/15 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"></div>
              </div>

              {/* Animated Scan Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-[scan-line_3s_linear_infinite]"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-[scan-line_4s_linear_infinite_reverse]"></div>
              </div>

              <h3 className="text-2xl font-bold text-holographic mb-6 font-orbitron relative z-10">
                Campus Layout
              </h3>
              
              {/* Enhanced Grid Container */}
              <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
                {campusBlocks.map((block, index) => (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.08,
                      rotateY: 8,
                      rotateX: 5,
                      z: 50
                    }}
                    className={`
                      relative h-32 flex flex-col items-center justify-center
                      cursor-pointer card-3d overflow-hidden
                      ${block.id === 'NEW' ? 'col-span-1' : ''}
                    `}
                    style={{
                      gridColumn: block.position.col,
                      gridRow: block.position.row
                    }}
                  >
                    {/* Liquid Crystal Card Background */}
                    <div className="absolute inset-0 liquid-glass rounded-2xl">
                      <div className={`absolute inset-0 bg-gradient-to-br ${block.color} opacity-80 rounded-2xl`}></div>
                      
                      {/* Crystal Facets Effect */}
                      <div className="absolute inset-0 opacity-40">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-white/30 to-transparent rounded-t-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/20 to-transparent rounded-br-2xl"></div>
                      </div>
                      
                      {/* Animated Liquid Flow */}
                      <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full animate-[liquid-flow_6s_ease-in-out_infinite]"></div>
                      </div>
                      
                      {/* HUD Elements */}
                      <div className="absolute top-2 right-2 w-8 h-8 border border-white/40 rounded-full backdrop-blur-sm"></div>
                      <div className="absolute bottom-2 left-2 w-6 h-6 border border-white/30 rounded backdrop-blur-sm"></div>
                      <div className="absolute top-2 left-2 w-1 h-6 bg-white/30 rounded-full"></div>
                    </div>
                    
                    {/* Content */}
                    <Building className="w-8 h-8 mb-2 z-10 text-white drop-shadow-lg" />
                    <span className="text-2xl font-bold font-orbitron z-10 text-white drop-shadow-lg">{block.id}</span>
                    <span className="text-sm font-medium z-10 text-white/90 drop-shadow-md">{block.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Legend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="liquid-glass rounded-2xl p-4 relative overflow-hidden">
                  {/* Legend Background Effects */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/30 to-transparent rounded-full blur-xl"></div>
                  </div>
                  
                  <h4 className="font-semibold text-foreground mb-3 flex items-center relative z-10">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    Campus Legend
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm relative z-10">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded mr-2 shadow-lg"></div>
                      <span>Computer Science</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded mr-2 shadow-lg"></div>
                      <span>Electronics</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded mr-2 shadow-lg"></div>
                      <span>Science Labs</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded mr-2 shadow-lg"></div>
                      <span>Mechanical</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded mr-2 shadow-lg"></div>
                      <span>Innovation Hub</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Facilities Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gradient mb-6 font-orbitron">
              Facilities & Labs
            </h3>

            {/* Block Details */}
            <div className="space-y-4">
              {campusBlocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="liquid-glass rounded-2xl p-6 card-3d"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-6 h-6 bg-gradient-to-r ${block.color} rounded mr-3`}></div>
                    <h4 className="text-lg font-semibold text-gradient font-orbitron">
                      {block.name}
                    </h4>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-foreground mb-2 flex items-center">
                        <FlaskConical className="w-4 h-4 mr-2 text-primary" />
                        Laboratories
                      </h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {block.labs.map((lab, i) => (
                          <li key={i} className="flex items-center">
                            <Microscope className="w-3 h-3 mr-2 text-accent" />
                            {lab}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-foreground mb-2 flex items-center">
                        <Building className="w-4 h-4 mr-2 text-primary" />
                        Facilities
                      </h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {block.facilities.map((facility, i) => (
                          <li key={i} className="flex items-center">
                            <Cpu className="w-3 h-3 mr-2 text-accent" />
                            {facility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Common Facilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="liquid-glass rounded-2xl p-6"
            >
              <h4 className="text-lg font-semibold text-gradient mb-4 font-orbitron">
                Common Facilities
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {commonFacilities.map((facility, index) => (
                  <motion.div
                    key={facility.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="glass-card p-3 rounded-xl hover:glow-cyber transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <facility.icon className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <div className="font-medium text-foreground">{facility.name}</div>
                        <div className="text-xs text-muted-foreground">{facility.description}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
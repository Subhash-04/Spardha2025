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
            className="liquid-glass rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold text-gradient mb-6 font-orbitron">
              Campus Layout
            </h3>
            
            {/* Grid Container */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {campusBlocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5
                  }}
                  className={`
                    liquid-card h-32 flex flex-col items-center justify-center
                    bg-gradient-to-br ${block.color} text-white
                    cursor-pointer card-3d relative overflow-hidden
                    ${block.id === 'NEW' ? 'col-span-1' : ''}
                  `}
                  style={{
                    gridColumn: block.position.col,
                    gridRow: block.position.row
                  }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <div className="absolute top-2 right-2 w-8 h-8 border border-white/30 rounded-full"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 border border-white/30 rounded"></div>
                  </div>
                  
                  <Building className="w-8 h-8 mb-2 z-10" />
                  <span className="text-2xl font-bold font-orbitron z-10">{block.id}</span>
                  <span className="text-sm font-medium z-10">{block.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-4 rounded-2xl"
            >
              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                Campus Legend
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded mr-2"></div>
                  <span>Computer Science</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded mr-2"></div>
                  <span>Electronics</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded mr-2"></div>
                  <span>Science Labs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded mr-2"></div>
                  <span>Mechanical</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded mr-2"></div>
                  <span>Innovation Hub</span>
                </div>
              </div>
            </motion.div>
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
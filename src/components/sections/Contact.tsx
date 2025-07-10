import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Vasireddy Venkatadri Institute of Technology, Nambur (V), Guntur, AP 522508',
      link: null
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'acm@vvit.net',
      link: 'mailto:acm@vvit.net'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 123 456 7890',
      link: 'tel:+911234567890'
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about Spardha 2025? We're here to help!
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="dashboard-glass p-8 rounded-3xl">
              <h3 className="text-2xl font-semibold mb-6 text-gradient">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="flex items-start space-x-4 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="crystal-glass p-3 group-hover:bg-primary/10 transition-all duration-300 rounded-xl">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors group flex items-center"
                        >
                          {info.content}
                          <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                className="mt-8 pt-6 border-t border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold mb-4 text-foreground">Follow Us</h4>
                <div className="flex space-x-4">
                  {['Instagram', 'LinkedIn', 'Twitter'].map((platform, index) => (
                    <motion.button
                      key={platform}
                      className="crystal-glass px-4 py-2 text-sm hover:scale-105 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {platform}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="dashboard-glass overflow-hidden rounded-3xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-80 lg:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3828.528414838376!2d80.5213123146821!3d16.34763998871465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a7564a923481d%3A0x1b199f919053c15!2sVasireddy%20Venkatadri%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1678886568341!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
              
              {/* Map Overlay */}
              <motion.div
                className="absolute top-4 left-4 crystal-glass p-3 rounded-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-medium">VVIT Campus</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="dashboard-glass p-6 max-w-2xl mx-auto rounded-3xl">
            <h4 className="text-lg font-semibold text-gradient mb-2">
              Need Help with Registration?
            </h4>
            <p className="text-muted-foreground text-sm">
              Our team is available to assist you with any questions about the event, 
              registration process, or technical requirements. Don't hesitate to reach out!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
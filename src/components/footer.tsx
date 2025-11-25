import { motion } from 'motion/react';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MessageCircle, FileText, HelpCircle, Sparkles } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#', color: '#3DF0FF' },
  { icon: Instagram, href: '#', color: '#A43DFF' },
  { icon: Linkedin, href: '#', color: '#00E5F6' },
  { icon: Twitter, href: '#', color: '#3DFFB8' },
];

const quickLinks = [
  { label: 'Teste DISC', href: '#test' },
  { label: 'Relatório', href: '#results' },
  { label: 'Sobre', href: '#about' },
  { label: 'Ajuda', href: '#help' },
];

const contactInfo = [
  { icon: Mail, text: 'contato@institutoipe.com.br', color: '#3DF0FF' },
  { icon: Phone, text: '(11) 99999-9999', color: '#A43DFF' },
  { icon: MessageCircle, text: 'WhatsApp', color: '#3DFFB8' },
];

export function Footer() {
  return (
    <footer className="relative py-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#3DF0FF11 1px, transparent 1px), linear-gradient(90deg, #3DF0FF11 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3DF0FF] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl holographic mb-6"
              animate={{
                boxShadow: [
                  '0 0 20px #3DF0FF',
                  '0 0 40px #A43DFF',
                  '0 0 20px #3DF0FF',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-2xl neon-text">IPÊ</span>
            </motion.div>
            <p className="text-sm opacity-80 mb-4">
              Tecnologia avançada em análise comportamental para seu desenvolvimento pessoal e profissional.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#3DF0FF' }}>
              <Sparkles className="w-4 h-4" />
              <span>Desenvolvido com tecnologia de ponta</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="mb-6" style={{ color: '#3DF0FF' }}>
              Atalhos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#3DF0FF' }} />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-6" style={{ color: '#3DF0FF' }}>
              Contato
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  <motion.a
                    href="#"
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity flex items-center gap-3 group"
                    whileHover={{ x: 5 }}
                  >
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        background: `${contact.color}22`,
                        border: `1px solid ${contact.color}44`,
                      }}
                    >
                      <contact.icon className="w-4 h-4" style={{ color: contact.color }} />
                    </div>
                    <span>{contact.text}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="mb-6" style={{ color: '#3DF0FF' }}>
              Redes Sociais
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="p-3 rounded-xl holographic group"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 30px ${social.color}`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    border: `1px solid ${social.color}44`,
                  }}
                >
                  <social.icon className="w-5 h-5" style={{ color: social.color }} />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="text-sm mb-3" style={{ color: '#A43DFF' }}>
                Newsletter
              </h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2 rounded-lg text-sm holographic outline-none"
                  style={{
                    border: '1px solid #3DF0FF44',
                    background: '#05050588',
                  }}
                />
                <motion.button
                  className="px-4 py-2 rounded-lg"
                  style={{
                    background: 'linear-gradient(135deg, #3DF0FF, #A43DFF)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: '#3DF0FF22' }}
        >
          <p className="text-sm opacity-70 text-center md:text-left">
            © 2025 Instituto IPÊ. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-6 text-sm opacity-70">
            <a href="#" className="hover:opacity-100 transition-opacity">
              Termos de Uso
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Privacidade
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              Cookies
            </a>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#A43DFF] to-transparent opacity-50" />
        
        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? '#3DF0FF' : '#A43DFF',
              top: `${20 + i * 15}%`,
              right: `${10 + i * 5}%`,
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#3DF0FF' : '#A43DFF'}`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </footer>
  );
}

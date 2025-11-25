import { motion } from 'motion/react';
import { Target, Users, Lightbulb, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const values = [
  {
    icon: Target,
    title: 'Propósito',
    description: 'Ajudar pessoas e organizações a descobrirem seu potencial máximo',
  },
  {
    icon: Users,
    title: 'Impacto',
    description: 'Transformar vidas através do autoconhecimento comportamental',
  },
  {
    icon: Lightbulb,
    title: 'Inovação',
    description: 'Combinar ciência e tecnologia de ponta',
  },
  {
    icon: Award,
    title: 'Excelência',
    description: 'Entregar análises precisas e confiáveis',
  },
];

export function AboutSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG5ldHdvcmslMjBjb25uZWN0aW9ufGVufDF8fHx8MTc2Mzc4MTQ5MHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Network connection"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/95 to-[#050505]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="neon-text mb-6">Sobre o Instituto IPÊ</h2>
          <p className="text-xl max-w-4xl mx-auto opacity-90">
            Especializado em desenvolvimento humano, treinamentos e ferramentas psicológicas modernas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Logo & Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Logo Placeholder */}
              <motion.div
                className="mb-8 inline-flex items-center justify-center w-32 h-32 rounded-3xl holographic"
                animate={{
                  boxShadow: [
                    '0 0 40px #3DF0FF',
                    '0 0 80px #A43DFF',
                    '0 0 40px #3DF0FF',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-6xl neon-text">IPÊ</span>
              </motion.div>

              <div className="space-y-6">
                <p className="text-lg opacity-90">
                  O <span style={{ color: '#3DF0FF' }}>Instituto IPÊ</span> é especializado em desenvolvimento humano, 
                  treinamentos e ferramentas psicológicas modernas. Nosso propósito é ajudar pessoas e organizações 
                  a compreenderem comportamentos, descobrirem talentos e evoluírem continuamente.
                </p>

                <p className="text-lg opacity-90">
                  Combinamos <span style={{ color: '#A43DFF' }}>tecnologia avançada</span> e{' '}
                  <span style={{ color: '#00E5F6' }}>conteúdo científico</span> em uma plataforma intuitiva 
                  e acessível a todos.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-8">
                  {[
                    { value: '10k+', label: 'Usuários' },
                    { value: '95%', label: 'Satisfação' },
                    { value: '50+', label: 'Empresas' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 rounded-xl holographic text-center"
                    >
                      <div className="text-3xl mb-1 neon-text">{stat.value}</div>
                      <div className="text-sm opacity-70">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="mb-8" style={{ color: '#3DF0FF' }}>
              Nossos Valores
            </h3>
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-start gap-4 p-6 rounded-2xl holographic group cursor-pointer"
              >
                <motion.div
                  className="p-3 rounded-xl flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #3DF0FF22, #A43DFF22)',
                    boxShadow: '0 0 20px #3DF0FF44',
                  }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="w-6 h-6" style={{ color: '#3DF0FF' }} />
                </motion.div>
                <div className="flex-1">
                  <h4 className="mb-2" style={{ color: '#FFFFFF' }}>
                    {value.title}
                  </h4>
                  <p className="text-sm opacity-80">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Technology & Nature Fusion */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-8 rounded-3xl holographic overflow-hidden"
        >
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div
                className="p-3 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #3DF0FF, #A43DFF)',
                  boxShadow: '0 0 30px #3DF0FF',
                }}
              >
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <h3 className="mb-4" style={{ color: '#3DF0FF' }}>
              Tecnologia + Humanidade
            </h3>
            <p className="text-lg opacity-90">
              Assim como o Ipê floresce com força e beleza, acreditamos que cada pessoa tem um potencial único 
              para crescer e se destacar. Unimos o melhor da tecnologia com o cuidado humano para cultivar 
              esse desenvolvimento.
            </p>
          </div>

          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #3DF0FF, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}

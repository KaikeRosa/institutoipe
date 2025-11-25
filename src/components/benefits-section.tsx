import { motion } from 'motion/react';
import { Brain, MessageCircle, Briefcase, Shield, TrendingUp, Globe } from 'lucide-react';

const benefits = [
  {
    icon: Brain,
    title: 'Autoconhecimento profundo',
    description: 'Compreenda padrões de pensamento, reação e comportamento.',
    color: '#3DF0FF',
  },
  {
    icon: MessageCircle,
    title: 'Melhora da comunicação',
    description: 'Expresse-se com clareza e empatia.',
    color: '#A43DFF',
  },
  {
    icon: Briefcase,
    title: 'Clareza profissional',
    description: 'Descubra ambientes onde seu perfil rende mais.',
    color: '#00E5F6',
  },
  {
    icon: Shield,
    title: 'Gestão emocional',
    description: 'Entenda como você lida com pressão e mudanças.',
    color: '#3DFFB8',
  },
  {
    icon: TrendingUp,
    title: 'Desenvolvimento pessoal',
    description: 'Identifique forças e áreas para evoluir.',
    color: '#FFE83D',
  },
  {
    icon: Globe,
    title: 'Ferramenta global',
    description: 'Usada por empresas, coaches, psicólogos e RHs.',
    color: '#FF3D5A',
  },
];

export function BenefitsSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #3DF0FF22 0px, #3DF0FF22 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, #A43DFF22 0px, #A43DFF22 1px, transparent 1px, transparent 50px)',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="neon-text mb-6">Por que fazer o Teste DISC?</h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Descubra os benefícios transformadores que a análise DISC pode trazer para sua vida pessoal e profissional.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                y: -15,
                rotateX: 10,
                rotateY: 5,
                scale: 1.03,
              }}
              className="relative p-8 rounded-2xl holographic group cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Glowing Border on Hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: `0 0 40px ${benefit.color}, inset 0 0 20px ${benefit.color}33`,
                  border: `1px solid ${benefit.color}`,
                }}
              />

              {/* Floating Icon */}
              <motion.div
                className="relative mb-6 inline-flex"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <div
                  className="p-4 rounded-xl relative"
                  style={{
                    background: `linear-gradient(135deg, ${benefit.color}33, ${benefit.color}11)`,
                    boxShadow: `0 0 30px ${benefit.color}44`,
                  }}
                >
                  <benefit.icon className="w-10 h-10" style={{ color: benefit.color }} />
                  
                  {/* Pulsing Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ border: `2px solid ${benefit.color}` }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </div>
              </motion.div>

              {/* Content */}
              <h3 className="mb-3" style={{ color: benefit.color }}>
                {benefit.title}
              </h3>
              <p className="opacity-80">
                {benefit.description}
              </p>

              {/* Particle Effects */}
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: benefit.color }}>
                <motion.div
                  className="w-full h-full rounded-full"
                  style={{ background: benefit.color }}
                  animate={{
                    scale: [0, 2, 0],
                    opacity: [1, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.4,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="relative mt-20 flex justify-center gap-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                background: benefits[i].color,
                boxShadow: `0 0 20px ${benefits[i].color}`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

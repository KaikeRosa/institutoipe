import { motion } from 'motion/react';
import { Target, Users, Heart, FileCheck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const discTypes = [
  {
    letter: 'D',
    title: 'Dominância',
    description: 'Determinação, tomada de decisão, coragem, foco em resultados.',
    color: '#FF3D5A',
    icon: Target,
  },
  {
    letter: 'I',
    title: 'Influência',
    description: 'Comunicação, conexão com pessoas, carisma.',
    color: '#FFE83D',
    icon: Users,
  },
  {
    letter: 'S',
    title: 'Estabilidade',
    description: 'Calma, paciência, consistência e colaboração.',
    color: '#3DFFB8',
    icon: Heart,
  },
  {
    letter: 'C',
    title: 'Conformidade',
    description: 'Organização, precisão, lógica e atenção a regras.',
    color: '#3DF0FF',
    icon: FileCheck,
  },
];

export function DiscExplanation() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full blur-3xl" style={{ background: '#A43DFF' }} />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: '#3DF0FF' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="neon-text mb-6">O que é o DISC?</h2>
          <p className="text-xl max-w-4xl mx-auto opacity-90">
            O DISC é uma ferramenta mundialmente utilizada para entender como as pessoas agem, pensam e se comunicam. 
            Baseado nos estudos de William Moulton Marston, o modelo analisa quatro pilares comportamentais:
          </p>
        </motion.div>

        {/* DISC Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {discTypes.map((type, index) => (
            <motion.div
              key={type.letter}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, rotateY: 5, scale: 1.05 }}
              className="relative p-6 rounded-2xl holographic group cursor-pointer"
              style={{
                boxShadow: `0 0 30px ${type.color}33`,
              }}
            >
              {/* Glow Effect on Hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `0 0 60px ${type.color}`,
                }}
              />

              {/* Icon */}
              <div className="relative mb-4">
                <motion.div
                  className="inline-flex p-4 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${type.color}22, ${type.color}11)`,
                    border: `2px solid ${type.color}`,
                  }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <type.icon className="w-8 h-8" style={{ color: type.color }} />
                </motion.div>
              </div>

              {/* Letter */}
              <motion.h3
                className="mb-2"
                style={{ color: type.color, textShadow: `0 0 20px ${type.color}` }}
              >
                {type.letter} — {type.title}
              </motion.h3>

              <p className="opacity-80">
                {type.description}
              </p>

              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  border: `2px solid ${type.color}`,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Brain Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative max-w-4xl mx-auto mt-20"
        >
          <div className="relative rounded-3xl overflow-hidden holographic p-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1686317465844-4b2e2218cb37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xvZ3JhcGhpYyUyMGJyYWluJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM4Mzg0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Holographic brain"
              className="w-full h-96 object-cover rounded-2xl opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            
            {/* Connecting Lines Animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
              {[...Array(4)].map((_, i) => (
                <motion.line
                  key={i}
                  x1={`${20 + i * 20}%`}
                  y1="0%"
                  x2={`${30 + i * 20}%`}
                  y2="100%"
                  stroke="#3DF0FF"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, repeatDelay: 1 }}
                />
              ))}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

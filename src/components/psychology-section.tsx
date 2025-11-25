import { motion } from 'motion/react';
import { Brain, Zap, Activity } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PsychologySection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3DF0FF] to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image & Visuals */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden holographic p-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1686317465844-4b2e2218cb37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xvZ3JhcGhpYyUyMGJyYWluJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM4Mzg0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Brain holographic visualization"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              
              {/* Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              
              {/* Floating Neurons */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    background: i % 2 === 0 ? '#3DF0FF' : '#A43DFF',
                    boxShadow: `0 0 20px ${i % 2 === 0 ? '#3DF0FF' : '#A43DFF'}`,
                    top: `${20 + i * 12}%`,
                    left: `${10 + (i % 3) * 30}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}

              {/* Pulse Lines */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, #3DF0FF22, transparent)',
                }}
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>

            {/* Decorative Icons */}
            <motion.div
              className="absolute -top-8 -right-8 p-6 rounded-2xl holographic"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Brain className="w-12 h-12" style={{ color: '#3DF0FF' }} />
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 holographic"
            >
              <Zap className="w-4 h-4" style={{ color: '#3DF0FF' }} />
              <span className="text-sm" style={{ color: '#3DF0FF' }}>Ciência Comportamental</span>
            </motion.div>

            <h2 className="neon-text mb-8">
              A Psicologia por trás do DISC
            </h2>

            <div className="space-y-6">
              <p className="text-lg opacity-90">
                O DISC é baseado na <span style={{ color: '#3DF0FF' }}>psicologia comportamental</span> e avalia como você percebe o ambiente e reage aos estímulos. Ele analisa padrões emocionais, comunicação e respostas a desafios, pessoas, ritmo, regras e estrutura.
              </p>

              {/* Key Points */}
              <div className="grid gap-4">
                {[
                  { icon: Activity, text: 'Analisa padrões de reação e comportamento' },
                  { icon: Brain, text: 'Baseado em estudos de William Moulton Marston' },
                  { icon: Zap, text: 'Foco em ações observáveis, não em personalidade' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl holographic group hover:scale-105 transition-transform"
                  >
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, #3DF0FF22, #A43DFF22)',
                        boxShadow: '0 0 20px #3DF0FF44',
                      }}
                    >
                      <item.icon className="w-6 h-6" style={{ color: '#3DF0FF' }} />
                    </div>
                    <p className="flex-1">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Important Note */}
              <motion.div
                className="p-6 rounded-2xl relative overflow-hidden mt-8"
                style={{
                  background: 'linear-gradient(135deg, #A43DFF22, #3DF0FF22)',
                  border: '2px solid #A43DFF',
                  boxShadow: '0 0 40px #A43DFF44',
                }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1"
                  style={{ background: 'linear-gradient(90deg, #3DF0FF, #A43DFF, #3DF0FF)' }}
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <p className="text-lg">
                  <span style={{ color: '#A43DFF' }}>Importante:</span> O DISC não define sua personalidade — ele mostra <span style={{ color: '#3DF0FF' }}>como você age</span>, não quem você é.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#A43DFF] to-transparent opacity-50" />
    </section>
  );
}

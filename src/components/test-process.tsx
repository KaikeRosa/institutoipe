import { motion } from 'motion/react';
import { CheckCircle2, Zap, Sparkles, ArrowRight } from 'lucide-react';

const features = [
  '30 perguntas sequenciais',
  'Interface limpa e responsiva',
  'Microanimações suaves',
  'Respostas automáticas',
  'Avanço inteligente',
];

export function TestProcess() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background Grid Animation */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1748364914176-35f0ce9503a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZ3JpZCUyMG5lb258ZW58MXx8fHwxNzYzODM4NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Futuristic grid"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/90 to-[#050505]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 holographic"
          >
            <Sparkles className="w-4 h-4" style={{ color: '#3DF0FF' }} />
            <span className="text-sm" style={{ color: '#3DF0FF' }}>Processo Simplificado</span>
          </motion.div>

          <h2 className="neon-text mb-6">
            Como funciona o Teste DISC do Instituto IPÊ
          </h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Nosso teste é rápido, moderno e intuitivo:
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-6 rounded-2xl holographic text-center group"
            >
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  boxShadow: '0 0 40px #3DF0FF',
                  border: '1px solid #3DF0FF',
                }}
              />
              
              <CheckCircle2
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: '#3DF0FF' }}
              />
              <p className="relative z-10">{feature}</p>
            </motion.div>
          ))}
        </div>

        {/* Mock Test Interface */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="p-8 rounded-3xl holographic">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm" style={{ color: '#3DF0FF' }}>Progresso</span>
                <span className="text-sm" style={{ color: '#3DF0FF' }}>15 / 30</span>
              </div>
              <div className="relative h-3 rounded-full overflow-hidden" style={{ background: '#050505' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #3DF0FF, #A43DFF)',
                    boxShadow: '0 0 20px #3DF0FF',
                  }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '50%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
            </div>

            {/* Question Example */}
            <div className="mb-8">
              <h3 className="mb-6" style={{ color: '#FFFFFF' }}>
                Como você costuma reagir em situações de pressão?
              </h3>

              <div className="space-y-4">
                {[
                  'Tomo decisões rápidas e assertivas',
                  'Busco apoio e colaboração da equipe',
                  'Analiso cuidadosamente antes de agir',
                  'Mantenho a calma e sigo o plano',
                ].map((option, index) => (
                  <motion.button
                    key={index}
                    className="w-full p-4 rounded-xl text-left holographic hover:scale-[1.02] transition-all"
                    style={{
                      border: '1px solid #3DF0FF44',
                    }}
                    whileHover={{
                      borderColor: '#3DF0FF',
                      boxShadow: '0 0 30px #3DF0FF44',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: '#3DF0FF' }}
                      >
                        <motion.div
                          className="w-3 h-3 rounded-full"
                          style={{ background: '#3DF0FF' }}
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                        />
                      </div>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              className="w-full py-4 rounded-xl flex items-center justify-center gap-2 group"
              style={{
                background: 'linear-gradient(135deg, #3DF0FF, #A43DFF)',
                boxShadow: '0 0 30px #3DF0FF88',
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 50px #3DF0FF',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Realizar Teste DISC Agora</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute -top-6 -right-6 p-4 rounded-xl holographic"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Zap className="w-8 h-8" style={{ color: '#3DF0FF' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { ImageWithFallback } from './figma/ImageWithFallback';

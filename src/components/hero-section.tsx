import { motion } from 'motion/react';
import { Sparkles, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1752436365654-de0ebc45784b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMHBhcnRpY2xlc3xlbnwxfHx8fDE3NjM4Mzg0NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Digital particles background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/60 to-[#050505]" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#3DF0FF22 1px, transparent 1px), linear-gradient(90deg, #3DF0FF22 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          opacity: 0.2,
        }} />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, #3DF0FF, transparent)' }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, #A43DFF, transparent)' }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 holographic"
            animate={{ boxShadow: ['0 0 20px #3DF0FF', '0 0 40px #A43DFF', '0 0 20px #3DF0FF'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#3DF0FF' }} />
            <span className="text-sm" style={{ color: '#3DF0FF' }}>Tecnologia de Ponta em Análise Comportamental</span>
          </motion.div>

          <h1 className="mb-6 neon-text">
            Instituto IPÊ
          </h1>
          <h2 className="mb-8" style={{ color: '#00E5F6' }}>
            Avaliação DISC Avançada para Evolução Pessoal e Profissional
          </h2>

          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Tecnologia, psicologia comportamental e análises precisas para transformar sua vida e carreira.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <motion.button
              className="px-8 py-4 rounded-lg text-lg relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #3DF0FF, #A43DFF)',
                boxShadow: '0 0 30px #3DF0FF, 0 0 60px #A43DFF',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px #3DF0FF, 0 0 100px #A43DFF' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Iniciar Teste DISC
              </span>
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="px-8 py-4 rounded-lg text-lg holographic border-2"
              style={{ borderColor: '#3DF0FF' }}
              whileHover={{ scale: 1.05, borderColor: '#A43DFF' }}
              whileTap={{ scale: 0.98 }}
            >
              Entrar / Cadastrar
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1" style={{ borderColor: '#3DF0FF' }}>
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#3DF0FF' }}
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

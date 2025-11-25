import { motion } from 'motion/react';
import { PieChart, BarChart3, Download, LogIn } from 'lucide-react';

export function ResultsSection() {
  const discData = [
    { label: 'D', value: 35, color: '#FF3D5A' },
    { label: 'I', value: 28, color: '#FFE83D' },
    { label: 'S', value: 22, color: '#3DFFB8' },
    { label: 'C', value: 15, color: '#3DF0FF' },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: '#3DF0FF' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: '#A43DFF' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
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
          <h2 className="neon-text mb-6">
            Resultados Imediatos e Precisos
          </h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Após concluir o teste, você recebe uma análise completa do seu perfil comportamental.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Mock Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="p-8 rounded-3xl holographic">
              <div className="flex items-center justify-between mb-8">
                <h3 style={{ color: '#3DF0FF' }}>Seu Perfil DISC</h3>
                <motion.button
                  className="p-2 rounded-lg holographic"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" style={{ color: '#3DF0FF' }} />
                </motion.button>
              </div>

              {/* Radar Chart Visualization */}
              <div className="relative mb-8">
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Grid Lines */}
                    {[...Array(5)].map((_, i) => {
                      const size = ((i + 1) * 20) / 100;
                      return (
                        <motion.polygon
                          key={i}
                          points="100,10 170,50 170,150 100,190 30,150 30,50"
                          fill="none"
                          stroke="#3DF0FF"
                          strokeWidth="0.5"
                          opacity={0.2}
                          style={{
                            transform: `translate(-50%, -50%) scale(${size})`,
                            transformOrigin: 'center',
                          }}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: size }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      );
                    })}

                    {/* Axes */}
                    {['D', 'I', 'S', 'C'].map((label, i) => {
                      const angle = (i * Math.PI) / 2 - Math.PI / 2;
                      const x = 100 + Math.cos(angle) * 90;
                      const y = 100 + Math.sin(angle) * 90;
                      return (
                        <g key={label}>
                          <line
                            x1="100"
                            y1="100"
                            x2={x}
                            y2={y}
                            stroke="#3DF0FF"
                            strokeWidth="0.5"
                            opacity="0.3"
                          />
                          <text
                            x={100 + Math.cos(angle) * 100}
                            y={100 + Math.sin(angle) * 100}
                            textAnchor="middle"
                            fill={discData[i].color}
                            fontSize="16"
                            fontWeight="bold"
                          >
                            {label}
                          </text>
                        </g>
                      );
                    })}

                    {/* Data Polygon */}
                    <motion.polygon
                      points={discData
                        .map((d, i) => {
                          const angle = (i * Math.PI) / 2 - Math.PI / 2;
                          const distance = (d.value / 100) * 90;
                          const x = 100 + Math.cos(angle) * distance;
                          const y = 100 + Math.sin(angle) * distance;
                          return `${x},${y}`;
                        })
                        .join(' ')}
                      fill="url(#radarGradient)"
                      stroke="#3DF0FF"
                      strokeWidth="2"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 0.8 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />

                    <defs>
                      <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3DF0FF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#A43DFF" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    {/* Data Points */}
                    {discData.map((d, i) => {
                      const angle = (i * Math.PI) / 2 - Math.PI / 2;
                      const distance = (d.value / 100) * 90;
                      const x = 100 + Math.cos(angle) * distance;
                      const y = 100 + Math.sin(angle) * distance;
                      return (
                        <motion.circle
                          key={d.label}
                          cx={x}
                          cy={y}
                          r="4"
                          fill={d.color}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                        >
                          <animate
                            attributeName="r"
                            values="4;6;4"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </motion.circle>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Percentage Bars */}
              <div className="space-y-4">
                {discData.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ color: item.color }}>{item.label}</span>
                      <span style={{ color: item.color }}>{item.value}%</span>
                    </div>
                    <div className="relative h-3 rounded-full overflow-hidden" style={{ background: '#05050588' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                          boxShadow: `0 0 20px ${item.color}`,
                        }}
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Features & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-6" style={{ color: '#3DF0FF' }}>
                O que você recebe:
              </h3>
              <div className="space-y-4">
                {[
                  { icon: PieChart, text: 'Percentual detalhado de D, I, S e C' },
                  { icon: BarChart3, text: 'Gráfico radar neon interativo' },
                  { icon: Download, text: 'Interpretação inicial do perfil' },
                  { icon: LogIn, text: 'Opção de criar conta para relatório completo' },
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
                    <p>{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 pt-8">
              <motion.button
                className="w-full py-4 rounded-xl"
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
                Criar Conta
              </motion.button>

              <motion.button
                className="w-full py-4 rounded-xl holographic border-2"
                style={{ borderColor: '#3DF0FF' }}
                whileHover={{
                  scale: 1.02,
                  borderColor: '#A43DFF',
                }}
                whileTap={{ scale: 0.98 }}
              >
                Fazer Login
              </motion.button>
            </div>

            {/* Info Box */}
            <motion.div
              className="p-6 rounded-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #3DF0FF11, #A43DFF11)',
                border: '1px solid #3DF0FF44',
              }}
              whileHover={{ borderColor: '#3DF0FF' }}
            >
              <p className="text-sm opacity-90">
                💡 <span style={{ color: '#3DF0FF' }}>Dica:</span> Crie uma conta para salvar seus resultados e acessar análises mais detalhadas do seu perfil comportamental.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

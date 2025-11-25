import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

export function AuthForms() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #3DF0FF22 0%, transparent 50%), radial-gradient(circle at 80% 50%, #A43DFF22 0%, transparent 50%)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="neon-text mb-6">
            {isLogin ? 'Acessar sua conta' : 'Criar nova conta'}
          </h2>
          <p className="text-xl opacity-90">
            {isLogin
              ? 'Entre para acessar seus resultados salvos'
              : 'Cadastre-se para salvar e acompanhar sua evolução'}
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          {/* Toggle Buttons */}
          <div className="flex gap-2 p-2 rounded-2xl holographic mb-8">
            <motion.button
              className="flex-1 py-3 rounded-xl transition-all"
              style={{
                background: isLogin ? 'linear-gradient(135deg, #3DF0FF, #A43DFF)' : 'transparent',
                color: isLogin ? '#FFFFFF' : '#3DF0FF',
              }}
              onClick={() => setIsLogin(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
            <motion.button
              className="flex-1 py-3 rounded-xl transition-all"
              style={{
                background: !isLogin ? 'linear-gradient(135deg, #3DF0FF, #A43DFF)' : 'transparent',
                color: !isLogin ? '#FFFFFF' : '#3DF0FF',
              }}
              onClick={() => setIsLogin(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cadastro
            </motion.button>
          </div>

          {/* Form */}
          <motion.div
            className="p-8 rounded-3xl holographic"
            style={{
              boxShadow: '0 0 60px #3DF0FF22',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? 'login' : 'register'}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Name (Register only) */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm mb-2" style={{ color: '#3DF0FF' }}>
                      Nome completo
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                        style={{ color: '#3DF0FF' }}
                      />
                      <input
                        type="text"
                        placeholder="Seu nome"
                        className="w-full py-3 pl-12 pr-4 rounded-xl holographic outline-none transition-all"
                        style={{
                          border: '1px solid #3DF0FF44',
                          background: '#05050588',
                          color: '#FFFFFF',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#3DF0FF')}
                        onBlur={(e) => (e.target.style.borderColor = '#3DF0FF44')}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#3DF0FF' }}>
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                      style={{ color: '#3DF0FF' }}
                    />
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full py-3 pl-12 pr-4 rounded-xl holographic outline-none transition-all"
                      style={{
                        border: '1px solid #3DF0FF44',
                        background: '#05050588',
                        color: '#FFFFFF',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#3DF0FF')}
                      onBlur={(e) => (e.target.style.borderColor = '#3DF0FF44')}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#3DF0FF' }}>
                    Senha
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                      style={{ color: '#3DF0FF' }}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full py-3 pl-12 pr-12 rounded-xl holographic outline-none transition-all"
                      style={{
                        border: '1px solid #3DF0FF44',
                        background: '#05050588',
                        color: '#FFFFFF',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#3DF0FF')}
                      onBlur={(e) => (e.target.style.borderColor = '#3DF0FF44')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" style={{ color: '#3DF0FF' }} />
                      ) : (
                        <Eye className="w-5 h-5" style={{ color: '#3DF0FF' }} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (Register only) */}
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm mb-2" style={{ color: '#3DF0FF' }}>
                      Confirmar senha
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                        style={{ color: '#3DF0FF' }}
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full py-3 pl-12 pr-4 rounded-xl holographic outline-none transition-all"
                        style={{
                          border: '1px solid #3DF0FF44',
                          background: '#05050588',
                          color: '#FFFFFF',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#3DF0FF')}
                        onBlur={(e) => (e.target.style.borderColor = '#3DF0FF44')}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Forgot Password (Login only) */}
                {isLogin && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm hover:underline"
                      style={{ color: '#3DF0FF' }}
                    >
                      Esqueci minha senha
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
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
                  <span>{isLogin ? 'Entrar' : 'Criar conta'}</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </motion.form>
            </AnimatePresence>

            {/* Alternative Action */}
            <div className="mt-6 text-center">
              <p className="text-sm opacity-70">
                {isLogin ? 'Ainda não tem conta?' : 'Já tem uma conta?'}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="hover:underline"
                  style={{ color: '#3DF0FF' }}
                >
                  {isLogin ? 'Cadastre-se' : 'Faça login'}
                </button>
              </p>
            </div>
          </motion.div>

          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 p-4 rounded-xl text-center text-sm opacity-70"
            style={{
              border: '1px solid #3DF0FF22',
            }}
          >
            🔒 Seus dados estão protegidos e criptografados
          </motion.div>
        </div>
      </div>
    </section>
  );
}

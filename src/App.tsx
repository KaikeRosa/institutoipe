export default function App() {
  // This React app is just a placeholder - the actual site uses static HTML files
  // The Vite middleware should redirect / to /src/index.html
  // If we still end up here, show a message
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: '#050505',
      color: '#3DF0FF',
      fontFamily: 'Orbitron, sans-serif',
      fontSize: '1.5rem'
    }}>
      <div style={{ textAlign: 'center' }}>
        <p>Este é um placeholder React.</p>
        <p style={{ fontSize: '1rem', marginTop: '1rem' }}>
          Acesse o site em: <a href="/src/index.html" style={{ color: '#3DF0FF' }}>/src/index.html</a>
        </p>
      </div>
    </div>
  );
}

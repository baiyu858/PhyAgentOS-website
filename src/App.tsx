import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './themes/ThemeContext';
import { LanguageProvider } from './i18n/LanguageContext';
import Navigation from './sections/shared/Navigation';
import Footer from './sections/shared/Footer';
import LanguageToggle from './components/LanguageToggle';
import Home from './pages/Home';
import Hackathon from './pages/Hackathon';
import Team from './pages/Team';
import ThemePreview from './pages/ThemePreview';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <div
            className="relative min-h-screen flex flex-col transition-colors duration-500"
            style={{ backgroundColor: 'var(--color-bg)' }}
          >
            {/* Global launch-page background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-[0.035]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.42)_72%,rgba(0,0,0,0.78)_100%)]" />
            </div>

            <Navigation />
            <main className="relative z-10 flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hackathon" element={<Hackathon />} />
                <Route path="/team" element={<Team />} />
                <Route path="/themes" element={<ThemePreview />} />
              </Routes>
            </main>
            <Footer />
            <LanguageToggle />
          </div>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

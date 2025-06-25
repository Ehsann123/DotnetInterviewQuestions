import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import WelcomePage from './pages/WelcomePage';
import NetArchitecturePage from './pages/NetArchitecturePage';
import ClrDeepDivePage from './pages/ClrDeepDivePage';
import CSharpOopPage from './pages/CSharpOopPage';
import AdvancedCSharpPage from './pages/AdvancedCSharpPage';
import AspNetPipelinePage from './pages/AspNetPipelinePage';
import AspNetDiPage from './pages/AspNetDiPage';
import EfCoreFundamentalsPage from './pages/EfCoreFundamentalsPage';
import EfCoreAdvancedPage from './pages/EfCoreAdvancedPage';
import UnitTestingPage from './pages/UnitTestingPage';
import DeploymentDockerPage from './pages/DeploymentDockerPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12"
          >
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/net-architecture" element={<NetArchitecturePage />} />
              <Route path="/clr-deep-dive" element={<ClrDeepDivePage />} />
              <Route path="/csharp-oop" element={<CSharpOopPage />} />
              <Route path="/advanced-csharp" element={<AdvancedCSharpPage />} />
              <Route path="/aspnet-pipeline" element={<AspNetPipelinePage />} />
              <Route path="/aspnet-di" element={<AspNetDiPage />} />
              <Route path="/ef-core-fundamentals" element={<EfCoreFundamentalsPage />} />
              <Route path="/ef-core-advanced" element={<EfCoreAdvancedPage />} />
              <Route path="/unit-testing" element={<UnitTestingPage />} />
              <Route path="/deployment-docker" element={<DeploymentDockerPage />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </Router>
  );
};

export default App;
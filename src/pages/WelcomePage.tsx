import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Zap, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import VersionChart from '../components/ui/VersionChart';
import NavigationButtons from '../components/ui/NavigationButtons';

const WelcomePage: React.FC = () => {
  const features = [
    { icon: Target, title: 'Navigate Topics', description: 'Use the sidebar to select specific areas you want to study.' },
    { icon: Zap, title: 'Test Yourself', description: 'Click on questions to reveal detailed answers using active recall.' },
    { icon: BookOpen, title: 'Explore Code', description: 'Review practical code snippets and real-world examples.' },
    { icon: CheckCircle, title: 'Visualize Concepts', description: 'Interactive charts and diagrams simplify complex topics.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Welcome to the Interactive
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
            .NET Interview Hub
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        >
          Transform your interview preparation with this dynamic learning platform. Master key concepts, 
          test your knowledge with interactive Q&A, and prepare confidently for your next .NET developer role.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="w-8 h-8 text-blue-500 mr-3" />
            How to Use This Hub
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            .NET Version Release Cadence (LTS vs. Standard)
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Understanding the .NET release cycle is crucial for enterprise development. Microsoft releases 
            a new version annually, with every other release being a Long-Term Support (LTS) version, 
            supported for 3 years. This chart visualizes the support timeline for recent versions.
          </p>
          <VersionChart />
        </Card>
      </motion.div>

      <NavigationButtons currentTopicId="welcome" />
    </motion.div>
  );
};

export default WelcomePage;
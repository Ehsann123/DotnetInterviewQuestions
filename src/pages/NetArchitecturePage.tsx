import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cloud, Package, GitBranch } from 'lucide-react';
import Card from '../components/ui/Card';
import NavigationButtons from '../components/ui/NavigationButtons';

const NetArchitecturePage: React.FC = () => {
  const architectureEvolution = [
    {
      icon: Server,
      title: '.NET Framework (The Legacy)',
      description: 'Microsoft\'s original, Windows-only platform. Now in maintenance mode (v4.8 is the last). While not for new projects, many enterprise apps still use it.',
      color: 'from-gray-500 to-gray-600',
    },
    {
      icon: Cloud,
      title: '.NET Core (The Revolution)',
      description: 'A complete, ground-up rewrite designed to be cross-platform, open-source, high-performance, and modular. It was the answer to modern cloud and microservices needs.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Package,
      title: 'Modern .NET (The Unification)',
      description: '.NET 5 and later represent the unified platform, succeeding .NET Core 3.1. The "Core" name was dropped to signify this is the single path forward for all .NET development.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: GitBranch,
      title: '.NET Standard (The Bridge)',
      description: 'Not a runtime, but a formal specification of APIs that acts as a contract. It was created to allow code sharing between .NET Framework and .NET Core.',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const comparisonData = [
    { feature: 'Platform', framework: 'Windows-only', modern: 'Cross-platform (Windows, macOS, Linux)' },
    { feature: 'Performance', framework: 'Optimized for Windows workloads', modern: 'High-performance, optimized for cloud' },
    { feature: 'Status', framework: 'Maintenance mode (security fixes only)', modern: 'Active development, annual releases' },
    { feature: 'Deployment', framework: 'Machine-wide installation', modern: 'Self-contained or framework-dependent' },
    { feature: 'API Surface', framework: 'Large, Windows-focused', modern: 'Streamlined, cross-platform' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          The Evolution and Architecture of .NET
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          To excel as a .NET developer, it's imperative to understand the platform's history and architecture. 
          This context explains why different runtimes exist, how they interact, and why modern .NET is designed 
          the way it is. An interviewer will expect a candidate to articulate this evolution clearly.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid gap-6 mb-8"
      >
        {architectureEvolution.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Framework Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-left p-4 font-semibold text-gray-900">.NET Framework (v4.8)</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Modern .NET (v8+)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="p-4 text-gray-600">{row.framework}</td>
                    <td className="p-4 text-gray-600">{row.modern}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      <NavigationButtons currentTopicId="net-architecture" />
    </motion.div>
  );
};

export default NetArchitecturePage;
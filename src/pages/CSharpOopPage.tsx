import React from 'react';
import { motion } from 'framer-motion';
import { Shapes, Shield, Layers, Code } from 'lucide-react';
import Card from '../components/ui/Card';
import ToggleCard from '../components/ui/ToggleCard';
import NavigationButtons from '../components/ui/NavigationButtons';

const CSharpOopPage: React.FC = () => {
  const oopPillars = [
    {
      icon: Shield,
      title: 'Encapsulation',
      description: 'Bundling data and methods into a class, hiding internal details. Achieved via access modifiers (public, private).',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Layers,
      title: 'Inheritance',
      description: 'A child class acquiring properties/methods from a parent class. Promotes code reuse. C# has single inheritance.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Shapes,
      title: 'Polymorphism',
      description: '"Many forms". Treating objects of different classes through a common base. Achieved via method overriding.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Code,
      title: 'Abstraction',
      description: 'Hiding complex implementation and showing only essential features. Achieved via abstract classes and interfaces.',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const solidPrinciples = [
    {
      question: 'S - Single Responsibility Principle (SRP)',
      answer: `<p><strong>"A class should have only one reason to change."</strong></p>
               <p class="mt-2">Prevents "god objects". For example, a <code>UserService</code> that validates users, saves them to a database, and sends emails should be split into <code>UserValidator</code>, <code>UserRepository</code>, and <code>EmailService</code>.</p>
               <p class="mt-2 text-blue-600 font-semibold">Benefits:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>Easier to test and maintain</li>
                 <li>Reduced coupling between components</li>
                 <li>Clear separation of concerns</li>
               </ul>`,
    },
    {
      question: 'O - Open/Closed Principle (OCP)',
      answer: `<p><strong>"Software entities should be open for extension, but closed for modification."</strong></p>
               <p class="mt-2">Avoids changing existing, tested code. Instead of an <code>if/else</code> for report types, use an <code>IReportExporter</code> interface and create new classes (<code>PdfExporter</code>, <code>CsvExporter</code>) for new functionality.</p>
               <p class="mt-2 text-green-600 font-semibold">Implementation Strategy:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>Use interfaces and abstract classes</li>
                 <li>Apply the Strategy pattern</li>
                 <li>Leverage dependency injection</li>
               </ul>`,
    },
    {
      question: 'L - Liskov Substitution Principle (LSP)',
      answer: `<p><strong>"Subtypes must be substitutable for their base types."</strong></p>
               <p class="mt-2">Ensures derived classes don't break the base class contract. The classic violation is having a <code>Square</code> class inherit from <code>Rectangle</code>. Setting the width of a square must also set its height, which is not the expected behavior of a rectangle.</p>
               <p class="mt-2 text-purple-600 font-semibold">Key Considerations:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>Preconditions cannot be strengthened</li>
                 <li>Postconditions cannot be weakened</li>
                 <li>Invariants must be preserved</li>
               </ul>`,
    },
    {
      question: 'I - Interface Segregation Principle (ISP)',
      answer: `<p><strong>"No client should be forced to depend on methods it does not use."</strong></p>
               <p class="mt-2">Avoids "fat" interfaces. An <code>IWorker</code> interface with <code>Work()</code> and <code>Eat()</code> forces a <code>RobotWorker</code> to implement <code>Eat()</code>. Better to split into <code>IWorkable</code> and <code>IEatable</code>.</p>
               <p class="mt-2 text-orange-600 font-semibold">Best Practices:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>Keep interfaces small and focused</li>
                 <li>Compose interfaces when needed</li>
                 <li>Avoid marker interfaces with no methods</li>
               </ul>`,
    },
    {
      question: 'D - Dependency Inversion Principle (DIP)',
      answer: `<p><strong>"High-level modules should not depend on low-level modules. Both should depend on abstractions."</strong></p>
               <p class="mt-2">Decouples modules. A high-level <code>NotificationService</code> should not depend on a low-level <code>SmtpEmailClient</code>. It should depend on an <code>IEmailClient</code> interface. This is the foundation of Dependency Injection.</p>
               <p class="mt-2 text-red-600 font-semibold">Implementation:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>Program to interfaces, not implementations</li>
                 <li>Use dependency injection containers</li>
                 <li>Apply inversion of control patterns</li>
               </ul>`,
    },
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
          C# Language Essentials: OOP and SOLID Principles
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          Mastery of C# begins with a solid understanding of its object-oriented nature and the design 
          principles that guide the creation of robust, maintainable software. These are the daily tools 
          of a professional developer.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Four Pillars of OOP</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {oopPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${pillar.color} rounded-lg flex items-center justify-center mr-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900">{pillar.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mb-8"
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The SOLID Principles</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            These five design principles make software more understandable, flexible, and maintainable. 
            Click each card to learn more about implementation strategies and real-world examples.
          </p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="space-y-4"
      >
        {solidPrinciples.map((principle, index) => (
          <motion.div
            key={principle.question}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 + index * 0.1 }}
          >
            <ToggleCard
              question={principle.question}
              answer={principle.answer}
            />
          </motion.div>
        ))}
      </motion.div>

      <NavigationButtons currentTopicId="csharp-oop" />
    </motion.div>
  );
};

export default CSharpOopPage;
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, MemoryStick, Recycle } from 'lucide-react';
import Card from '../components/ui/Card';
import ToggleCard from '../components/ui/ToggleCard';
import CodeBlock from '../components/ui/CodeBlock';
import NavigationButtons from '../components/ui/NavigationButtons';

const ClrDeepDivePage: React.FC = () => {
  const executionFlow = [
    { step: 1, title: 'Source Code (C#)', description: 'Human-readable C# code', color: 'from-green-500 to-green-600' },
    { step: 2, title: 'CIL & Metadata', description: 'Packaged in an Assembly (.dll/.exe)', color: 'from-blue-500 to-blue-600' },
    { step: 3, title: 'Native Code', description: 'JIT-Compiled by CLR at Runtime', color: 'from-purple-500 to-purple-600' },
  ];

  const qaItems = [
    {
      question: 'What is the difference between Value Types and Reference Types?',
      answer: `<p><strong>Value Types</strong> (e.g., <code>int</code>, <code>struct</code>, <code>bool</code>) store their data directly, typically on the stack. When passed, a copy is made.</p>
               <p class="mt-2"><strong>Reference Types</strong> (e.g., <code>class</code>, <code>string</code>, <code>delegate</code>) store a reference (pointer) to the data, which lives on the managed heap. When passed, only the reference is copied; both copies point to the same object.</p>
               <p class="mt-2 text-blue-600 font-semibold">Key Insight:</p>
               <p>This distinction affects performance, memory usage, and behavior when passing parameters to methods.</p>`,
    },
    {
      question: 'Explain Generational Garbage Collection.',
      answer: `<p>The GC is optimized based on the "generational hypothesis": most objects have short lives. The heap is divided into generations:</p>
               <ul class="list-disc list-inside mt-2 space-y-1">
                 <li><strong>Gen 0:</strong> For new, short-lived objects. Collected frequently and quickly.</li>
                 <li><strong>Gen 1:</strong> For objects that survive Gen 0. A buffer between short and long-lived objects.</li>
                 <li><strong>Gen 2:</strong> For long-lived objects that survive Gen 1. A full GC collects all generations and is most expensive.</li>
                 <li><strong>Large Object Heap (LOH):</strong> A separate heap for large objects (>85k bytes) to avoid the cost of moving them during compaction.</li>
               </ul>`,
    },
    {
      question: 'What is the purpose of IDisposable and the using statement?',
      answer: `<p>The GC handles <em>managed</em> memory, but not <em>unmanaged</em> resources (file handles, DB connections, etc.). The <code>IDisposable</code> interface provides a standard way to release these resources deterministically via a <code>Dispose()</code> method.</p>
               <p class="mt-2">The <code>using</code> statement is syntactic sugar that guarantees <code>Dispose()</code> is called on an object, even if an exception occurs. The compiler translates it into a <code>try...finally</code> block.</p>`,
    },
  ];

  const usingExample = `using (var connection = new SqlConnection(connectionString))
{
    // ... use the connection ...
} // connection.Dispose() is called here automatically

// Equivalent to:
SqlConnection connection = new SqlConnection(connectionString);
try
{
    // ... use the connection ...
}
finally
{
    if (connection != null)
        connection.Dispose();
}`;

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
          The Common Language Runtime (CLR) Deep Dive
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          The CLR is the heart of the .NET platform. It's the virtual machine and execution engine that 
          provides services for running .NET applications. A deep understanding of the CLR's components 
          and processes distinguishes a proficient developer from a novice.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <Card>
          <div className="flex items-center mb-6">
            <Cpu className="w-8 h-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Managed Execution Flow</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {executionFlow.map((item, index) => (
              <React.Fragment key={item.step}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  className="flex-1 text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
                {index < executionFlow.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.2 }}
                    className="text-3xl text-gray-400 hidden md:block"
                  >
                    →
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="space-y-4 mb-8"
      >
        {qaItems.map((item, index) => (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 + index * 0.1 }}
          >
            <ToggleCard
              question={item.question}
              answer={item.answer}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0 }}
      >
        <Card>
          <div className="flex items-center mb-4">
            <Recycle className="w-6 h-6 text-green-500 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Using Statement Example</h3>
          </div>
          <CodeBlock code={usingExample} />
        </Card>
      </motion.div>

      <NavigationButtons currentTopicId="clr-deep-dive" />
    </motion.div>
  );
};

export default ClrDeepDivePage;
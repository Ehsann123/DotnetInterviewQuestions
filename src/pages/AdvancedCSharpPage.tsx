import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import ToggleCard from '../components/ui/ToggleCard';
import CodeBlock from '../components/ui/CodeBlock';
import NavigationButtons from '../components/ui/NavigationButtons';

const AdvancedCSharpPage: React.FC = () => {
  const advancedConcepts = [
    {
      question: 'What are Delegates and Events?',
      answer: `<p>A <strong>Delegate</strong> is a type-safe function pointer. It's an object that holds a reference to a method, allowing you to treat methods as first-class citizens (pass them as arguments, etc.).</p>
               <p class="mt-2">An <strong>Event</strong> is an encapsulated delegate. It provides a safe publisher-subscriber model. Subscribers can only add (<code>+=</code>) or remove (<code>-=</code>) handlers; they cannot directly invoke the event or clear all subscribers.</p>
               <p class="mt-2"><strong><code>Action&lt;T&gt;</code></strong> and <strong><code>Func&lt;T, TResult&gt;</code></strong> are built-in generic delegates that prevent you from having to declare custom delegates for most common scenarios.</p>
               <p class="mt-2 text-blue-600 font-semibold">Key Benefits:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>Enable functional programming patterns</li>
                 <li>Support callbacks and event handling</li>
                 <li>Facilitate loose coupling between components</li>
               </ul>`,
    },
    {
      question: 'Explain async and await.',
      answer: `<p><code>async</code> and <code>await</code> are keywords that simplify asynchronous programming. An <code>async</code> method can use the <code>await</code> keyword.</p>
               <p class="mt-2">When execution reaches an <code>await</code> on a Task, the method is suspended, and control returns to the caller. Crucially, <strong>the thread is not blocked</strong>; it's released to do other work. When the awaited operation completes, execution resumes where it left off.</p>
               <p class="mt-2 text-red-600 font-semibold">Critical Pitfall:</p>
               <p class="mt-2">Avoid <code>async void</code> except for event handlers. They cannot be awaited, and exceptions thrown within them will crash the process.</p>
               <p class="mt-2 text-green-600 font-semibold">Best Practices:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>Use <code>ConfigureAwait(false)</code> in library code</li>
                 <li>Don't mix async and sync code (<code>.Result</code>, <code>.Wait()</code>)</li>
                 <li>Return <code>Task</code> or <code>Task&lt;T&gt;</code> from async methods</li>
               </ul>`,
    },
    {
      question: 'What is the difference between IEnumerable<T> and IQueryable<T>?',
      answer: `<p>This is a fundamental LINQ concept crucial for data access performance:</p>
               <ul class="list-disc list-inside mt-2 space-y-2">
                 <li><strong><code>IEnumerable&lt;T&gt;</code> (LINQ to Objects):</strong> Represents a query to be executed <strong>in-memory</strong>. If you use it on a database table, it will fetch the <em>entire table</em> into your application's memory first, then filter it. This is highly inefficient for large datasets.</li>
                 <li><strong><code>IQueryable&lt;T&gt;</code> (LINQ to Entities/SQL):</strong> Represents a query to be executed on a <strong>remote data source</strong> (like a SQL database). It builds an expression tree, which is translated by a provider (like EF Core) into native SQL. The filtering, sorting, etc., happens on the database server, and only the final results are sent back.</li>
               </ul>
               <p class="mt-2 text-orange-600 font-semibold">Performance Impact:</p>
               <p class="mt-2">Using <code>IQueryable&lt;T&gt;</code> properly can mean the difference between a 10ms query and a 10-second query that crashes your application.</p>`,
    },
    {
      question: 'What are Expression Trees?',
      answer: `<p><strong>Expression Trees</strong> are data structures that represent code in a tree-like format. They allow you to examine and manipulate code as data at runtime.</p>
               <p class="mt-2">They're the foundation of LINQ providers like Entity Framework, which translate C# lambda expressions into SQL queries.</p>
               <p class="mt-2 text-purple-600 font-semibold">Use Cases:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>ORM query translation (EF Core)</li>
                 <li>Dynamic query building</li>
                 <li>Code analysis and transformation</li>
                 <li>Creating domain-specific languages (DSLs)</li>
               </ul>`,
    },
  ];

  const delegateExample = `// Delegate declaration
public delegate void NotificationHandler(string message);

// Event declaration
public class Publisher
{
    public event NotificationHandler OnNotification;
    
    protected virtual void NotifySubscribers(string message)
    {
        OnNotification?.Invoke(message);
    }
}

// Using Action and Func
Action<string> printMessage = message => Console.WriteLine(message);
Func<int, int, int> add = (x, y) => x + y;

// Event subscription
publisher.OnNotification += message => Console.WriteLine($"Received: {message}");`;

  const asyncExample = `// Good: Returns Task<T>
public async Task<string> GetDataAsync()
{
    var httpClient = new HttpClient();
    var response = await httpClient.GetStringAsync("https://api.example.com/data");
    return response;
}

// Bad: async void (except for event handlers)
public async void ProcessData() // Don't do this!
{
    try
    {
        await GetDataAsync();
    }
    catch (Exception ex)
    {
        // Exception will crash the application!
        Console.WriteLine(ex.Message);
    }
}

// Good: Event handler exception
private async void Button_Click(object sender, EventArgs e)
{
    try
    {
        await ProcessDataAsync(); // This is okay for event handlers
    }
    catch (Exception ex)
    {
        MessageBox.Show($"Error: {ex.Message}");
    }
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
          Advanced C# Concepts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          Beyond OOP, proficiency with advanced features like delegates, generics, and asynchronous 
          programming is a key differentiator in technical interviews. These concepts enable you to 
          write more efficient, maintainable, and scalable applications.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4 mb-8"
      >
        {advancedConcepts.map((concept, index) => (
          <motion.div
            key={concept.question}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <ToggleCard
              question={concept.question}
              answer={concept.answer}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="space-y-6"
      >
        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Delegates and Events Example</h3>
          <CodeBlock code={delegateExample} />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Async/Await Best Practices</h3>
          <CodeBlock code={asyncExample} />
        </Card>
      </motion.div>

      <NavigationButtons currentTopicId="advanced-csharp" />
    </motion.div>
  );
};

export default AdvancedCSharpPage;
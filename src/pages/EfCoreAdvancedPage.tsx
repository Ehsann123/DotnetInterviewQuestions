import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import ToggleCard from '../components/ui/ToggleCard';
import CodeBlock from '../components/ui/CodeBlock';
import NavigationButtons from '../components/ui/NavigationButtons';

const EfCoreAdvancedPage: React.FC = () => {
  const loadingStrategies = [
    {
      icon: Zap,
      title: 'Eager Loading',
      method: '.Include(p => p.Posts)',
      description: 'Loads related data as part of the initial query',
      bestFor: 'When you know you\'ll need the related data. Results in a single, predictable query.',
      color: 'from-green-500 to-green-600',
      performance: 'Good - Single query, but can be large'
    },
    {
      icon: TrendingUp,
      title: 'Explicit Loading',
      method: 'context.Entry(blog).Collection(b => b.Posts).Load()',
      description: 'Loads related data on-demand after the parent entity is loaded',
      bestFor: 'Loading related data conditionally, after the parent entity has been fetched.',
      color: 'from-blue-500 to-blue-600',
      performance: 'Controlled - Load only what you need'
    },
    {
      icon: Shield,
      title: 'Lazy Loading',
      method: 'Accessing a virtual navigation property',
      description: 'Automatically loads related data when accessed',
      bestFor: 'Generally an anti-pattern in web apps. High risk of N+1 query problem.',
      color: 'from-red-500 to-red-600',
      performance: 'Dangerous - Can cause severe performance issues'
    },
  ];

  const advancedQuestions = [
    {
      question: 'What is the N+1 Query Problem and how do you avoid it?',
      answer: `<p>The N+1 problem occurs when you execute one query to get N records, then execute N additional queries to get related data for each record. This results in N+1 total queries instead of a more efficient approach.</p>
               <p class="mt-2 text-red-600 font-semibold">Example of the Problem:</p>
               <pre class="mt-2 text-sm"><code>var blogs = context.Blogs.ToList(); // 1 query
foreach (var blog in blogs)
{
    Console.WriteLine(blog.Posts.Count); // N queries (one per blog)
}</code></pre>
               <p class="mt-2 text-green-600 font-semibold">Solutions:</p>
               <ul class="list-disc list-inside mt-2 space-y-1">
                 <li><strong>Eager Loading:</strong> <code>context.Blogs.Include(b => b.Posts).ToList()</code></li>
                 <li><strong>Projection:</strong> <code>context.Blogs.Select(b => new { b.Title, PostCount = b.Posts.Count })</code></li>
                 <li><strong>Split Queries:</strong> <code>.AsSplitQuery()</code> for multiple includes</li>
               </ul>`,
    },
    {
      question: 'Explain Optimistic vs Pessimistic Concurrency Control.',
      answer: `<p><strong>Optimistic Concurrency:</strong> Assumes conflicts are rare. Checks for conflicts only when saving changes. Uses concurrency tokens (like timestamps or version numbers) to detect if data was modified by another user.</p>
               <p class="mt-2"><strong>Pessimistic Concurrency:</strong> Assumes conflicts are likely. Locks data when reading to prevent other users from modifying it until the lock is released.</p>
               <p class="mt-2 text-blue-600 font-semibold">EF Core Approach:</p>
               <p class="mt-2">EF Core primarily uses optimistic concurrency. You can configure concurrency tokens using <code>[ConcurrencyCheck]</code> or <code>IsRowVersion()</code> in Fluent API.</p>
               <p class="mt-2 text-orange-600 font-semibold">Handling Conflicts:</p>
               <p class="mt-2">When a concurrency conflict occurs, EF Core throws a <code>DbUpdateConcurrencyException</code> that you must handle appropriately.</p>`,
    },
    {
      question: 'What are Change Tracking and Entity States?',
      answer: `<p>EF Core tracks the state of entities to determine what operations to perform when <code>SaveChanges()</code> is called. Each entity has one of these states:</p>
               <ul class="list-disc list-inside mt-2 space-y-1">
                 <li><strong>Added:</strong> Entity is new and will be inserted into the database</li>
                 <li><strong>Unchanged:</strong> Entity exists and hasn't been modified</li>
                 <li><strong>Modified:</strong> Entity exists and has been modified</li>
                 <li><strong>Deleted:</strong> Entity exists but will be deleted from the database</li>
                 <li><strong>Detached:</strong> Entity is not being tracked by the context</li>
               </ul>
               <p class="mt-2 text-purple-600 font-semibold">Performance Considerations:</p>
               <p class="mt-2">Change tracking has overhead. For read-only scenarios, use <code>AsNoTracking()</code> to improve performance.</p>`,
    },
    {
      question: 'How do you optimize EF Core performance?',
      answer: `<p>Several strategies can significantly improve EF Core performance:</p>
               <ol class="list-decimal list-inside mt-2 space-y-2">
                 <li><strong>Use AsNoTracking():</strong> For read-only queries to avoid change tracking overhead</li>
                 <li><strong>Select only needed columns:</strong> Use projections instead of loading entire entities</li>
                 <li><strong>Batch operations:</strong> Use <code>AddRange()</code>, <code>UpdateRange()</code>, <code>RemoveRange()</code></li>
                 <li><strong>Use compiled queries:</strong> For frequently executed queries</li>
                 <li><strong>Optimize includes:</strong> Use <code>AsSplitQuery()</code> for multiple includes</li>
                 <li><strong>Connection pooling:</strong> Use <code>AddDbContextPool()</code> instead of <code>AddDbContext()</code></li>
               </ol>
               <p class="mt-2 text-green-600 font-semibold">Monitoring:</p>
               <p class="mt-2">Enable sensitive data logging and SQL logging in development to understand generated queries.</p>`,
    },
  ];

  const loadingExample = `// Eager Loading - Single query with JOIN
var blogsWithPosts = await context.Blogs
    .Include(b => b.Posts)
    .ToListAsync();

// Explicit Loading - Load related data on demand
var blog = await context.Blogs.FirstAsync();
await context.Entry(blog)
    .Collection(b => b.Posts)
    .LoadAsync();

// Projection - Select only what you need
var blogSummaries = await context.Blogs
    .Select(b => new BlogSummary
    {
        Title = b.Title,
        PostCount = b.Posts.Count(),
        LatestPost = b.Posts.OrderByDescending(p => p.CreatedDate).First().Title
    })
    .ToListAsync();

// No Tracking for read-only scenarios
var readOnlyBlogs = await context.Blogs
    .AsNoTracking()
    .ToListAsync();`;

  const concurrencyExample = `public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    
    [Timestamp] // Concurrency token
    public byte[] RowVersion { get; set; }
}

// Handling concurrency conflicts
public async Task<bool> UpdateProductAsync(int id, string name, decimal price)
{
    try
    {
        var product = await _context.Products.FindAsync(id);
        product.Name = name;
        product.Price = price;
        
        await _context.SaveChangesAsync();
        return true;
    }
    catch (DbUpdateConcurrencyException ex)
    {
        // Handle concurrency conflict
        var entry = ex.Entries.Single();
        var clientValues = (Product)entry.Entity;
        var databaseEntry = entry.GetDatabaseValues();
        
        if (databaseEntry == null)
        {
            // Entity was deleted by another user
            return false;
        }
        
        var databaseValues = (Product)databaseEntry.ToObject();
        
        // Resolve conflict (e.g., show user both versions)
        // For this example, we'll use database values
        entry.OriginalValues.SetValues(databaseEntry);
        
        await _context.SaveChangesAsync();
        return true;
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
          Advanced EF Core Concepts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          Mastering advanced EF Core concepts is crucial for building high-performance applications. 
          Understanding data loading strategies, concurrency control, and performance optimization 
          techniques will set you apart as a skilled .NET developer.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Loading Strategies</h2>
          <p className="text-gray-600 mb-6">
            When you query an entity, EF Core doesn't automatically load its related data. 
            You must choose a strategy based on your performance requirements and usage patterns.
          </p>
          <div className="space-y-6">
            {loadingStrategies.map((strategy, index) => {
              const Icon = strategy.icon;
              return (
                <motion.div
                  key={strategy.title}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-6 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${strategy.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{strategy.title}</h3>
                      <p className="text-gray-700 mb-2">{strategy.description}</p>
                      <p className="text-sm text-blue-600 mb-2"><strong>Method:</strong> <code>{strategy.method}</code></p>
                      <p className="text-sm text-gray-600 mb-2"><strong>Best For:</strong> {strategy.bestFor}</p>
                      <p className="text-sm font-medium"><strong>Performance:</strong> {strategy.performance}</p>
                    </div>
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
        transition={{ delay: 1.2 }}
        className="space-y-4 mb-8"
      >
        {advancedQuestions.map((item, index) => (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 + index * 0.1 }}
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
        transition={{ delay: 1.8 }}
        className="space-y-6"
      >
        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Loading Strategies Examples</h3>
          <CodeBlock code={loadingExample} />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Concurrency Control Implementation</h3>
          <CodeBlock code={concurrencyExample} />
        </Card>
      </motion.div>

      <NavigationButtons currentTopicId="ef-core-advanced" />
    </motion.div>
  );
};

export default EfCoreAdvancedPage;
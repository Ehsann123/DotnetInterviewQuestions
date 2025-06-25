import React from 'react';
import { motion } from 'framer-motion';
import { Database, GitBranch, Settings } from 'lucide-react';
import Card from '../components/ui/Card';
import ToggleCard from '../components/ui/ToggleCard';
import CodeBlock from '../components/ui/CodeBlock';
import NavigationButtons from '../components/ui/NavigationButtons';

const EfCoreFundamentalsPage: React.FC = () => {
  const efConcepts = [
    {
      icon: Database,
      title: 'DbContext',
      description: 'Represents a session with the database and acts as a Unit of Work',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Settings,
      title: 'DbSet<T>',
      description: 'Represents a collection of entities that can be queried and saved',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: GitBranch,
      title: 'Migrations',
      description: 'Version control for your database schema changes',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const efQuestions = [
    {
      question: 'What are the roles of DbContext and DbSet?',
      answer: `<p><strong><code>DbContext</code>:</strong> Represents a session with the database. It's responsible for querying data, tracking changes to objects, and saving those changes. It functions as a Unit of Work and maintains an identity map of loaded entities.</p>
               <p class="mt-2"><strong><code>DbSet&lt;T&gt;</code>:</strong> A property on the <code>DbContext</code> that represents a collection of a specific entity type, which typically maps to a database table. You query against <code>DbSet</code> properties using LINQ.</p>
               <p class="mt-2 text-blue-600 font-semibold">Key Responsibilities:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>Change tracking and state management</li>
                 <li>Query translation to SQL</li>
                 <li>Connection management</li>
                 <li>Transaction coordination</li>
               </ul>`,
    },
    {
      question: 'Explain EF Core Migrations.',
      answer: `<p>Migrations are the mechanism for evolving the database schema in a controlled, versioned way as your C# model changes. They provide a way to incrementally update the database schema to keep it in sync with the data model.</p>
               <p class="mt-2 text-green-600 font-semibold">Key Commands:</p>
               <ol class="list-decimal list-inside mt-2 space-y-1">
                 <li><code>dotnet ef migrations add &lt;MigrationName&gt;</code>: Compares your current model to the last migration and scaffolds a new C# migration file with the changes.</li>
                 <li><code>dotnet ef database update</code>: Applies any pending migrations to the database, running the necessary SQL commands.</li>
                 <li><code>dotnet ef migrations remove</code>: Removes the last migration (if not applied to database).</li>
                 <li><code>dotnet ef database update &lt;MigrationName&gt;</code>: Updates database to a specific migration.</li>
               </ol>
               <p class="mt-2">EF Core tracks applied migrations in a special <code>__EFMigrationsHistory</code> table in your database.</p>`,
    },
    {
      question: 'What is the difference between Code First and Database First?',
      answer: `<p>EF Core supports different approaches for working with databases:</p>
               <ul class="list-disc list-inside mt-2 space-y-2">
                 <li><strong>Code First (Recommended):</strong> You define your entity classes and DbContext in C#, then use migrations to create and update the database schema. This approach gives you full control and works well with version control.</li>
                 <li><strong>Database First:</strong> You start with an existing database and use scaffolding to generate entity classes and DbContext. Use <code>dotnet ef dbcontext scaffold</code> command.</li>
               </ul>
               <p class="mt-2 text-purple-600 font-semibold">Best Practice:</p>
               <p class="mt-2">Code First is generally preferred for new projects as it provides better version control, easier testing, and more flexibility in development workflows.</p>`,
    },
    {
      question: 'How do you configure entity relationships?',
      answer: `<p>EF Core provides multiple ways to configure entity relationships:</p>
               <ol class="list-decimal list-inside mt-2 space-y-2">
                 <li><strong>Data Annotations:</strong> Use attributes like <code>[ForeignKey]</code>, <code>[Required]</code>, <code>[MaxLength]</code> directly on entity properties.</li>
                 <li><strong>Fluent API (Recommended):</strong> Configure relationships in the <code>OnModelCreating</code> method using a fluent interface. This provides more control and keeps configuration separate from entities.</li>
                 <li><strong>Conventions:</strong> EF Core automatically detects many relationships based on naming conventions and navigation properties.</li>
               </ol>
               <p class="mt-2 text-orange-600 font-semibold">Relationship Types:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>One-to-Many (most common)</li>
                 <li>One-to-One</li>
                 <li>Many-to-Many (simplified in EF Core 5+)</li>
               </ul>`,
    },
  ];

  const dbContextExample = `public class BloggingContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<Post> Posts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=.;Database=BloggingDb;Trusted_Connection=true;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Fluent API configuration
        modelBuilder.Entity<Blog>()
            .HasMany(b => b.Posts)
            .WithOne(p => p.Blog)
            .HasForeignKey(p => p.BlogId);

        modelBuilder.Entity<Post>()
            .Property(p => p.Title)
            .HasMaxLength(200)
            .IsRequired();
    }
}

public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
    public List<Post> Posts { get; set; } = new();
}

public class Post
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public int BlogId { get; set; }
    public Blog Blog { get; set; }
}`;

  const crudExample = `public class BlogService
{
    private readonly BloggingContext _context;

    public BlogService(BloggingContext context)
    {
        _context = context;
    }

    // Create
    public async Task<Blog> CreateBlogAsync(string url)
    {
        var blog = new Blog { Url = url };
        _context.Blogs.Add(blog);
        await _context.SaveChangesAsync();
        return blog;
    }

    // Read
    public async Task<List<Blog>> GetBlogsAsync()
    {
        return await _context.Blogs
            .Include(b => b.Posts)
            .ToListAsync();
    }

    // Update
    public async Task UpdateBlogAsync(int id, string newUrl)
    {
        var blog = await _context.Blogs.FindAsync(id);
        if (blog != null)
        {
            blog.Url = newUrl;
            await _context.SaveChangesAsync();
        }
    }

    // Delete
    public async Task DeleteBlogAsync(int id)
    {
        var blog = await _context.Blogs.FindAsync(id);
        if (blog != null)
        {
            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();
        }
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
          Entity Framework Core Fundamentals
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          Entity Framework Core is Microsoft's modern, cross-platform Object-Relational Mapper (ORM). 
          It allows developers to work with databases using familiar .NET objects, abstracting away 
          most of the raw SQL while providing powerful querying and change tracking capabilities.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Core EF Concepts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {efConcepts.map((concept, index) => {
              const Icon = concept.icon;
              return (
                <motion.div
                  key={concept.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center p-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${concept.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{concept.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{concept.description}</p>
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
        {efQuestions.map((item, index) => (
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
          <h3 className="text-xl font-semibold text-gray-900 mb-4">DbContext and Entity Configuration</h3>
          <CodeBlock code={dbContextExample} />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">CRUD Operations with EF Core</h3>
          <CodeBlock code={crudExample} />
        </Card>
      </motion.div>

      <NavigationButtons currentTopicId="ef-core-fundamentals" />
    </motion.div>
  );
};

export default EfCoreFundamentalsPage;
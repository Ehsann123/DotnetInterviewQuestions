import React from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, RefreshCw } from 'lucide-react';
import Card from '../components/ui/Card';
import ToggleCard from '../components/ui/ToggleCard';
import CodeBlock from '../components/ui/CodeBlock';
import NavigationButtons from '../components/ui/NavigationButtons';

const AspNetDiPage: React.FC = () => {
  const serviceLifetimes = [
    {
      icon: Package,
      title: 'Singleton',
      description: 'One instance for the entire application lifetime',
      useCase: 'Stateless, thread-safe services like logging or caching',
      color: 'from-red-500 to-red-600',
      example: 'ILogger, IMemoryCache, Configuration'
    },
    {
      icon: Clock,
      title: 'Scoped',
      description: 'One instance per client request (scope)',
      useCase: 'The most common choice. Perfect for services like DbContext',
      color: 'from-blue-500 to-blue-600',
      example: 'DbContext, Unit of Work, Request-specific services'
    },
    {
      icon: RefreshCw,
      title: 'Transient',
      description: 'A new instance created every time it\'s requested',
      useCase: 'Lightweight, stateless services like validators or mappers',
      color: 'from-green-500 to-green-600',
      example: 'Validators, Mappers, Lightweight services'
    },
  ];

  const diQuestions = [
    {
      question: 'What is the "Captive Dependency" pitfall?',
      answer: `<p>This occurs when you inject a service with a shorter lifetime into a service with a longer lifetime. The classic example is injecting a <strong>Scoped</strong> service (like <code>DbContext</code>) into a <strong>Singleton</strong> service.</p>
               <p class="mt-2">The Singleton lives forever, so it "captures" the first instance of the Scoped service it receives and holds onto it. This effectively turns the Scoped service into a Singleton for that consumer, which can lead to:</p>
               <ul class="list-disc list-inside mt-2 space-y-1">
                 <li>Data being shared across user requests</li>
                 <li>Stale database connections</li>
                 <li>Memory leaks</li>
                 <li>Thread safety issues</li>
               </ul>
               <p class="mt-2 text-red-600 font-semibold">Prevention:</p>
               <p class="mt-2">ASP.NET Core's default container throws an exception to help prevent this. Always ensure service lifetimes are compatible.</p>`,
    },
    {
      question: 'How do you register services with different lifetimes?',
      answer: `<p>Services are registered in the <code>ConfigureServices</code> method using extension methods:</p>
               <ul class="list-disc list-inside mt-2 space-y-2">
                 <li><strong><code>services.AddSingleton&lt;IService, Service&gt;()</code>:</strong> Registers as Singleton</li>
                 <li><strong><code>services.AddScoped&lt;IService, Service&gt;()</code>:</strong> Registers as Scoped</li>
                 <li><strong><code>services.AddTransient&lt;IService, Service&gt;()</code>:</strong> Registers as Transient</li>
               </ul>
               <p class="mt-2 text-blue-600 font-semibold">Generic Registration:</p>
               <p class="mt-2">You can also register without specifying the interface: <code>services.AddScoped&lt;Service&gt;()</code></p>
               <p class="mt-2 text-green-600 font-semibold">Factory Registration:</p>
               <p class="mt-2">For complex initialization: <code>services.AddSingleton&lt;IService&gt;(provider => new Service(config))</code></p>`,
    },
    {
      question: 'What are the different ways to inject dependencies?',
      answer: `<p>ASP.NET Core supports three types of dependency injection:</p>
               <ol class="list-decimal list-inside mt-2 space-y-2">
                 <li><strong>Constructor Injection (Recommended):</strong> Dependencies are injected through the constructor. This makes dependencies explicit and ensures they're available when the object is created.</li>
                 <li><strong>Property Injection:</strong> Dependencies are injected through public properties. Less common and generally not recommended as it makes dependencies optional.</li>
                 <li><strong>Method Injection:</strong> Dependencies are injected as method parameters. Useful for action methods in controllers using the <code>[FromServices]</code> attribute.</li>
               </ol>
               <p class="mt-2 text-purple-600 font-semibold">Best Practice:</p>
               <p class="mt-2">Always prefer constructor injection as it makes dependencies explicit and ensures immutability.</p>`,
    },
    {
      question: 'How does service resolution work?',
      answer: `<p>The DI container resolves services using the following process:</p>
               <ol class="list-decimal list-inside mt-2 space-y-1">
                 <li><strong>Registration Lookup:</strong> The container looks for a registration matching the requested type</li>
                 <li><strong>Dependency Resolution:</strong> It recursively resolves all dependencies of the requested service</li>
                 <li><strong>Instance Creation:</strong> Creates the instance based on the registered lifetime</li>
                 <li><strong>Disposal Management:</strong> Tracks disposable services for proper cleanup</li>
               </ol>
               <p class="mt-2 text-orange-600 font-semibold">Resolution Scope:</p>
               <p class="mt-2">Services are resolved within a scope. In web applications, this is typically the HTTP request scope.</p>`,
    },
  ];

  const registrationExample = `public void ConfigureServices(IServiceCollection services)
{
    // Singleton - One instance for the entire application
    services.AddSingleton<ILogger, ConsoleLogger>();
    
    // Scoped - One instance per request
    services.AddScoped<IUserService, UserService>();
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(connectionString));
    
    // Transient - New instance every time
    services.AddTransient<IEmailValidator, EmailValidator>();
    
    // Factory registration
    services.AddSingleton<IConfiguration>(provider =>
    {
        var builder = new ConfigurationBuilder();
        return builder.Build();
    });
    
    // Multiple implementations
    services.AddTransient<INotificationService, EmailNotificationService>();
    services.AddTransient<INotificationService, SmsNotificationService>();
}`;

  const injectionExample = `// Constructor Injection (Recommended)
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UserController> _logger;

    public UserController(IUserService userService, ILogger<UserController> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    // Method Injection using [FromServices]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id, [FromServices] IEmailService emailService)
    {
        var user = await _userService.GetUserAsync(id);
        await emailService.SendWelcomeEmailAsync(user.Email);
        return Ok(user);
    }
}

// Service with dependencies
public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<UserService> _logger;

    public UserService(ApplicationDbContext context, ILogger<UserService> logger)
    {
        _context = context;
        _logger = logger;
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
          Dependency Injection in ASP.NET Core
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          Dependency Injection is a first-class citizen in ASP.NET Core. Instead of classes creating their 
          own dependencies, they are "injected" from an IoC container. This decouples components, makes 
          them easier to test, and promotes better software design.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Lifetimes</h2>
          <p className="text-gray-600 mb-6">
            When registering a service, you must choose a lifetime that determines how the container 
            manages its creation and disposal. This is a critical decision that affects performance and behavior.
          </p>
          <div className="space-y-6">
            {serviceLifetimes.map((lifetime, index) => {
              const Icon = lifetime.icon;
              return (
                <motion.div
                  key={lifetime.title}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-6 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${lifetime.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{lifetime.title}</h3>
                      <p className="text-gray-700 mb-2">{lifetime.description}</p>
                      <p className="text-sm text-gray-600 mb-2"><strong>Use Case:</strong> {lifetime.useCase}</p>
                      <p className="text-sm text-blue-600"><strong>Examples:</strong> {lifetime.example}</p>
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
        {diQuestions.map((item, index) => (
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
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Registration Examples</h3>
          <CodeBlock code={registrationExample} />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Dependency Injection Patterns</h3>
          <CodeBlock code={injectionExample} />
        </Card>
      </motion.div>

      <NavigationButtons currentTopicId="aspnet-di" />
    </motion.div>
  );
};

export default AspNetDiPage;
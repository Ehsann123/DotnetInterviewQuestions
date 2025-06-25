import React from 'react';
import { motion } from 'framer-motion';
import { TestTube, Target, Shield } from 'lucide-react';
import Card from '../components/ui/Card';
import ToggleCard from '../components/ui/ToggleCard';
import CodeBlock from '../components/ui/CodeBlock';
import NavigationButtons from '../components/ui/NavigationButtons';

const UnitTestingPage: React.FC = () => {
  const testingPrinciples = [
    {
      icon: Target,
      title: 'Arrange-Act-Assert (AAA)',
      description: 'Structure tests with clear setup, execution, and verification phases',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Shield,
      title: 'Test Isolation',
      description: 'Each test should be independent and not affect other tests',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: TestTube,
      title: 'Mocking Dependencies',
      description: 'Replace external dependencies with controlled test doubles',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const testingQuestions = [
    {
      question: 'What is Mocking and why is it important?',
      answer: `<p>To test a unit in <strong>isolation</strong>, its external dependencies (like a database, web service, or file system) must be replaced with test doubles. Mocking is creating a fake implementation of a dependency that you can control for the test.</p>
               <p class="mt-2 text-blue-600 font-semibold">Benefits of Mocking:</p>
               <ul class="list-disc list-inside mt-2 space-y-1">
                 <li>Tests run faster (no real database/network calls)</li>
                 <li>Tests are more reliable (no external dependencies)</li>
                 <li>You can test error scenarios easily</li>
                 <li>Tests are deterministic and repeatable</li>
               </ul>
               <p class="mt-2 text-green-600 font-semibold">Popular .NET Mocking Libraries:</p>
               <ul class="list-disc list-inside mt-2">
                 <li><strong>Moq:</strong> Most popular, fluent API</li>
                 <li><strong>NSubstitute:</strong> Simple, clean syntax</li>
                 <li><strong>FakeItEasy:</strong> Easy to use, good for beginners</li>
               </ul>`,
    },
    {
      question: 'Explain the Arrange-Act-Assert (AAA) pattern.',
      answer: `<p>AAA provides a clear, consistent structure for writing tests that makes them easy to read and maintain:</p>
               <ol class="list-decimal list-inside mt-2 space-y-2">
                 <li><strong>Arrange:</strong> Set up the preconditions and initialize objects for the test. This includes creating mocks, setting up test data, and configuring the system under test.</li>
                 <li><strong>Act:</strong> Execute the single method or behavior being tested. This should be one line that calls the method you're testing.</li>
                 <li><strong>Assert:</strong> Verify that the outcome was what you expected. Check return values, verify mock interactions, and validate state changes.</li>
               </ol>
               <p class="mt-2 text-purple-600 font-semibold">Benefits:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>Makes tests easy to read and understand</li>
                 <li>Ensures tests focus on one specific behavior</li>
                 <li>Helps identify what the test is actually testing</li>
               </ul>`,
    },
    {
      question: 'What are the different types of tests?',
      answer: `<p>The testing pyramid shows different levels of testing, each with its own purpose:</p>
               <ol class="list-decimal list-inside mt-2 space-y-2">
                 <li><strong>Unit Tests:</strong> Test individual components in isolation. Fast, numerous, and focused on specific functionality. Should make up the majority of your tests.</li>
                 <li><strong>Integration Tests:</strong> Test how multiple components work together. Test database interactions, API calls, and component integration.</li>
                 <li><strong>End-to-End (E2E) Tests:</strong> Test complete user workflows through the entire application. Slow but provide confidence in real user scenarios.</li>
               </ol>
               <p class="mt-2 text-orange-600 font-semibold">Test Pyramid Ratio:</p>
               <p class="mt-2">Aim for 70% unit tests, 20% integration tests, and 10% E2E tests. This provides good coverage while maintaining fast feedback loops.</p>`,
    },
    {
      question: 'How do you test async methods?',
      answer: `<p>Testing async methods requires special consideration to ensure proper execution and exception handling:</p>
               <ul class="list-disc list-inside mt-2 space-y-2">
                 <li><strong>Use async test methods:</strong> Mark your test methods with <code>async Task</code> instead of <code>void</code></li>
                 <li><strong>Await the method under test:</strong> Always await async methods to ensure they complete</li>
                 <li><strong>Test exception handling:</strong> Use <code>await Assert.ThrowsAsync&lt;Exception&gt;()</code> to test exceptions</li>
                 <li><strong>Mock async dependencies:</strong> Return <code>Task.FromResult()</code> or use <code>ReturnsAsync()</code> in Moq</li>
               </ul>
               <p class="mt-2 text-red-600 font-semibold">Common Pitfall:</p>
               <p class="mt-2">Never use <code>async void</code> in test methods - use <code>async Task</code> instead to ensure proper exception handling.</p>`,
    },
  ];

  const unitTestExample = `[TestClass]
public class UserServiceTests
{
    private Mock<IUserRepository> _mockRepository;
    private Mock<IEmailService> _mockEmailService;
    private UserService _userService;

    [TestInitialize]
    public void Setup()
    {
        _mockRepository = new Mock<IUserRepository>();
        _mockEmailService = new Mock<IEmailService>();
        _userService = new UserService(_mockRepository.Object, _mockEmailService.Object);
    }

    [TestMethod]
    public async Task CreateUser_ValidUser_ReturnsCreatedUser()
    {
        // Arrange
        var newUser = new User { Name = "John Doe", Email = "john@example.com" };
        var expectedUser = new User { Id = 1, Name = "John Doe", Email = "john@example.com" };
        
        _mockRepository
            .Setup(r => r.CreateAsync(It.IsAny<User>()))
            .ReturnsAsync(expectedUser);

        // Act
        var result = await _userService.CreateUserAsync(newUser);

        // Assert
        Assert.AreEqual(expectedUser.Id, result.Id);
        Assert.AreEqual(expectedUser.Name, result.Name);
        _mockRepository.Verify(r => r.CreateAsync(It.IsAny<User>()), Times.Once);
        _mockEmailService.Verify(e => e.SendWelcomeEmailAsync(newUser.Email), Times.Once);
    }

    [TestMethod]
    public async Task CreateUser_InvalidEmail_ThrowsArgumentException()
    {
        // Arrange
        var invalidUser = new User { Name = "John Doe", Email = "invalid-email" };

        // Act & Assert
        await Assert.ThrowsExceptionAsync<ArgumentException>(
            () => _userService.CreateUserAsync(invalidUser));
    }
}`;

  const integrationTestExample = `[TestClass]
public class UserControllerIntegrationTests
{
    private WebApplicationFactory<Program> _factory;
    private HttpClient _client;

    [TestInitialize]
    public void Setup()
    {
        _factory = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    // Replace real database with in-memory database
                    services.RemoveAll<DbContextOptions<ApplicationDbContext>>();
                    services.AddDbContext<ApplicationDbContext>(options =>
                        options.UseInMemoryDatabase("TestDb"));
                });
            });
        
        _client = _factory.CreateClient();
    }

    [TestMethod]
    public async Task GetUsers_ReturnsUserList()
    {
        // Arrange
        await SeedTestData();

        // Act
        var response = await _client.GetAsync("/api/users");
        var content = await response.Content.ReadAsStringAsync();
        var users = JsonSerializer.Deserialize<List<User>>(content);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        users.Should().HaveCount(2);
    }

    private async Task SeedTestData()
    {
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        context.Users.AddRange(
            new User { Name = "User 1", Email = "user1@test.com" },
            new User { Name = "User 2", Email = "user2@test.com" }
        );
        
        await context.SaveChangesAsync();
    }

    [TestCleanup]
    public void Cleanup()
    {
        _client?.Dispose();
        _factory?.Dispose();
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
          Unit Testing Best Practices
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          Writing automated tests is a non-negotiable skill for professional developers. Unit tests ensure 
          code quality, enable safe refactoring, provide living documentation, and give confidence when 
          making changes to your codebase.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Testing Fundamentals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testingPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center p-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${principle.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{principle.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{principle.description}</p>
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
        {testingQuestions.map((item, index) => (
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
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Unit Test Example with Mocking</h3>
          <CodeBlock code={unitTestExample} />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Integration Test Example</h3>
          <CodeBlock code={integrationTestExample} />
        </Card>
      </motion.div>

      <NavigationButtons currentTopicId="unit-testing" />
    </motion.div>
  );
};

export default UnitTestingPage;
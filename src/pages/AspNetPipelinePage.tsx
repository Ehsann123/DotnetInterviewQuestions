import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Route, Zap } from 'lucide-react';
import Card from '../components/ui/Card';
import ToggleCard from '../components/ui/ToggleCard';
import CodeBlock from '../components/ui/CodeBlock';
import NavigationButtons from '../components/ui/NavigationButtons';

const AspNetPipelinePage: React.FC = () => {
  const middlewareFlow = [
    { name: 'Exception Handler', description: 'Catches unhandled exceptions', color: 'from-red-500 to-red-600', icon: Shield },
    { name: 'HTTPS Redirection', description: 'Redirects HTTP to HTTPS', color: 'from-green-500 to-green-600', icon: Shield },
    { name: 'Static Files', description: 'Serves static content', color: 'from-blue-500 to-blue-600', icon: Zap },
    { name: 'Routing', description: 'Determines which endpoint to call', color: 'from-purple-500 to-purple-600', icon: Route },
    { name: 'Authentication', description: 'Identifies the user', color: 'from-orange-500 to-orange-600', icon: Shield },
    { name: 'Authorization', description: 'Checks user permissions', color: 'from-indigo-500 to-indigo-600', icon: Shield },
    { name: 'Endpoints', description: 'Executes the controller action', color: 'from-pink-500 to-pink-600', icon: Zap },
  ];

  const pipelineQuestions = [
    {
      question: 'Why is middleware order important?',
      answer: `<p>The order is critical because each middleware component may depend on the previous one. For example:</p>
               <ul class="list-disc list-inside mt-2 space-y-1">
                 <li><code>UseAuthentication</code> must come before <code>UseAuthorization</code>, because you need to know who the user is before you can check what they are allowed to do.</li>
                 <li><code>UseExceptionHandler</code> should be one of the first components so it can catch exceptions from middleware that runs later in the pipeline.</li>
                 <li><code>UseRouting</code> must come before <code>UseEndpoints</code> (or <code>Map...</code>) because the route must be decided before the corresponding endpoint can be executed.</li>
               </ul>
               <p class="mt-2 text-red-600 font-semibold">Common Mistake:</p>
               <p class="mt-2">Placing authentication after authorization will result in authorization always failing because the user identity hasn't been established yet.</p>`,
    },
    {
      question: 'What is the difference between app.Run(), app.Use(), and app.Map()?',
      answer: `<p>These are the three primary methods for adding middleware to the pipeline:</p>
               <ul class="list-disc list-inside mt-2 space-y-2">
                 <li><strong><code>app.Use()</code>:</strong> Adds middleware that can call the next middleware in the pipeline. This is the most common pattern for middleware that needs to process both the request and response.</li>
                 <li><strong><code>app.Run()</code>:</strong> Adds terminal middleware that doesn't call the next middleware. It's typically used at the end of the pipeline to handle requests that haven't been handled by previous middleware.</li>
                 <li><strong><code>app.Map()</code>:</strong> Creates a branch in the pipeline based on the request path. It's used for conditional middleware execution based on URL patterns.</li>
               </ul>
               <p class="mt-2 text-blue-600 font-semibold">Best Practice:</p>
               <p class="mt-2">Use <code>app.Use()</code> for most middleware, <code>app.Run()</code> for terminal middleware, and <code>app.Map()</code> for path-based branching.</p>`,
    },
    {
      question: 'How does the request pipeline handle exceptions?',
      answer: `<p>Exception handling in ASP.NET Core follows a specific pattern:</p>
               <ol class="list-decimal list-inside mt-2 space-y-1">
                 <li><strong>Exception Middleware:</strong> <code>UseExceptionHandler</code> should be placed early in the pipeline to catch exceptions from downstream middleware.</li>
                 <li><strong>Developer Exception Page:</strong> In development, <code>UseDeveloperExceptionPage</code> provides detailed error information.</li>
                 <li><strong>Status Code Pages:</strong> <code>UseStatusCodePages</code> handles HTTP error status codes and can provide custom error pages.</li>
               </ol>
               <p class="mt-2 text-orange-600 font-semibold">Exception Flow:</p>
               <p class="mt-2">When an exception occurs, it bubbles up through the middleware stack. The first exception handler it encounters will process it and generate an appropriate response.</p>`,
    },
  ];

  const middlewareExample = `public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();
    
    app.UseRouting();
    
    app.UseAuthentication();
    app.UseAuthorization();
    
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
        endpoints.MapRazorPages();
    });
}`;

  const customMiddlewareExample = `public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        _logger.LogInformation("Request: {Method} {Path}", 
            context.Request.Method, context.Request.Path);
        
        await _next(context);
        
        _logger.LogInformation("Response: {StatusCode}", 
            context.Response.StatusCode);
    }
}

// Registration
app.UseMiddleware<RequestLoggingMiddleware>();`;

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
          ASP.NET Core Request Pipeline
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          Understanding how ASP.NET Core handles incoming HTTP requests through its middleware pipeline 
          is fundamental to building robust web applications. The pipeline's modular design allows for 
          flexible request processing and cross-cutting concerns.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Middleware Pipeline Flow</h2>
          <p className="text-gray-600 mb-6">
            Each middleware component can process the request, call the next middleware, and then process the response. 
            The order is critical for proper functionality.
          </p>
          <div className="space-y-4">
            {middlewareFlow.map((middleware, index) => {
              const Icon = middleware.icon;
              return (
                <React.Fragment key={middleware.name}>
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${middleware.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{middleware.name}</h3>
                      <p className="text-sm text-gray-600">{middleware.description}</p>
                    </div>
                  </motion.div>
                  {index < middlewareFlow.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex justify-center"
                    >
                      <ArrowRight className="w-6 h-6 text-blue-500" />
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="space-y-4 mb-8"
      >
        {pipelineQuestions.map((item, index) => (
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
        className="space-y-6"
      >
        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Standard Pipeline Configuration</h3>
          <CodeBlock code={middlewareExample} />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Middleware Example</h3>
          <CodeBlock code={customMiddlewareExample} />
        </Card>
      </motion.div>

      <NavigationButtons currentTopicId="aspnet-pipeline" />
    </motion.div>
  );
};

export default AspNetPipelinePage;
import React from 'react';
import { motion } from 'framer-motion';
import { Container, Cloud, Layers } from 'lucide-react';
import Card from '../components/ui/Card';
import ToggleCard from '../components/ui/ToggleCard';
import CodeBlock from '../components/ui/CodeBlock';
import NavigationButtons from '../components/ui/NavigationButtons';

const DeploymentDockerPage: React.FC = () => {
  const containerConcepts = [
    {
      icon: Container,
      title: 'Containerization',
      description: 'Package applications with all dependencies into portable containers',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Layers,
      title: 'Multi-stage Builds',
      description: 'Optimize container images by separating build and runtime environments',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Cloud,
      title: 'Orchestration',
      description: 'Manage and scale containerized applications in production',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const deploymentQuestions = [
    {
      question: 'What is a container, and how does it differ from a VM?',
      answer: `<p>A <strong>Container</strong> is a lightweight, standalone package that includes everything needed to run an application: code, runtime, system tools, libraries, and settings. Containers virtualize the operating system kernel, allowing multiple containers to run on a single host OS.</p>
               <p class="mt-2">A <strong>Virtual Machine (VM)</strong> virtualizes the entire hardware stack, including a full guest operating system for each VM. This makes VMs much heavier and slower to start.</p>
               <p class="mt-2 text-blue-600 font-semibold">Key Differences:</p>
               <ul class="list-disc list-inside mt-2 space-y-1">
                 <li><strong>Resource Usage:</strong> Containers share the host OS kernel, VMs each have their own OS</li>
                 <li><strong>Startup Time:</strong> Containers start in seconds, VMs take minutes</li>
                 <li><strong>Size:</strong> Container images are MBs, VM images are GBs</li>
                 <li><strong>Isolation:</strong> VMs provide stronger isolation, containers provide process-level isolation</li>
               </ul>`,
    },
    {
      question: 'What is a multi-stage Dockerfile build?',
      answer: `<p>Multi-stage builds allow you to use multiple FROM statements in a single Dockerfile. This is a best practice for creating optimized, production-ready images.</p>
               <p class="mt-2 text-green-600 font-semibold">Typical Stages:</p>
               <ol class="list-decimal list-inside mt-2 space-y-1">
                 <li><strong>Build Stage:</strong> Uses the large .NET SDK image to restore packages, build, and publish the application</li>
                 <li><strong>Runtime Stage:</strong> Starts from the much smaller .NET runtime image and copies only the published artifacts from the build stage</li>
               </ol>
               <p class="mt-2 text-purple-600 font-semibold">Benefits:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>Smaller final image size (no SDK or source code)</li>
                 <li>Better security (fewer attack vectors)</li>
                 <li>Faster deployment and startup times</li>
               </ul>`,
    },
    {
      question: 'How do you handle configuration in containerized applications?',
      answer: `<p>Configuration in containers should follow the <strong>12-Factor App</strong> principles, particularly storing config in environment variables:</p>
               <ul class="list-disc list-inside mt-2 space-y-2">
                 <li><strong>Environment Variables:</strong> Use <code>docker run -e KEY=value</code> or docker-compose environment sections</li>
                 <li><strong>Configuration Files:</strong> Mount configuration files as volumes: <code>-v /host/config:/app/config</code></li>
                 <li><strong>Secrets Management:</strong> Use Docker secrets, Kubernetes secrets, or cloud provider secret managers</li>
                 <li><strong>Configuration Providers:</strong> ASP.NET Core supports multiple configuration sources that can be layered</li>
               </ul>
               <p class="mt-2 text-orange-600 font-semibold">Best Practices:</p>
               <ul class="list-disc list-inside mt-2">
                 <li>Never bake secrets into images</li>
                 <li>Use different configurations for different environments</li>
                 <li>Validate configuration at startup</li>
               </ul>`,
    },
    {
      question: 'What are common deployment strategies?',
      answer: `<p>Different deployment strategies offer various trade-offs between risk, downtime, and complexity:</p>
               <ol class="list-decimal list-inside mt-2 space-y-2">
                 <li><strong>Rolling Deployment:</strong> Gradually replace old instances with new ones. Minimal downtime but mixed versions during deployment.</li>
                 <li><strong>Blue-Green Deployment:</strong> Maintain two identical environments, switch traffic between them. Zero downtime but requires double resources.</li>
                 <li><strong>Canary Deployment:</strong> Deploy to a small subset of users first, gradually increase. Reduces risk but more complex to implement.</li>
                 <li><strong>Recreate:</strong> Stop all old instances, then start new ones. Simple but has downtime.</li>
               </ol>
               <p class="mt-2 text-red-600 font-semibold">Considerations:</p>
               <p class="mt-2">Choose based on your requirements for uptime, resource availability, and risk tolerance.</p>`,
    },
  ];

  const dockerfileExample = `# Multi-stage Dockerfile for ASP.NET Core
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files and restore dependencies
COPY ["MyApp.csproj", "./"]
RUN dotnet restore "MyApp.csproj"

# Copy source code and build
COPY . .
RUN dotnet build "MyApp.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "MyApp.csproj" -c Release -o /app/publish

# Final runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Create non-root user for security
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

# Copy published application
COPY --from=publish /app/publish .

# Expose port and set entry point
EXPOSE 8080
ENTRYPOINT ["dotnet", "MyApp.dll"]`;

  const dockerComposeExample = `version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:8080"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - ConnectionStrings__DefaultConnection=Server=db;Database=MyAppDb;User=sa;Password=YourPassword123!
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourPassword123!
      - MSSQL_PID=Express
    ports:
      - "1433:1433"
    volumes:
      - sqlserver_data:/var/opt/mssql
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - web
    restart: unless-stopped

volumes:
  sqlserver_data:`;

  const kubernetesExample = `# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 8080
        env:
        - name: ASPNETCORE_ENVIRONMENT
          value: "Production"
        - name: ConnectionStrings__DefaultConnection
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: connection-string
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer`;

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
          Deployment & Containerization
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 leading-relaxed"
        >
          Modern application deployment increasingly relies on containerization technologies like Docker 
          and orchestration platforms like Kubernetes. Understanding these technologies is essential for 
          deploying scalable, maintainable applications in production environments.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Container Technologies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {containerConcepts.map((concept, index) => {
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
        {deploymentQuestions.map((item, index) => (
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
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-stage Dockerfile</h3>
          <CodeBlock code={dockerfileExample} />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Docker Compose Configuration</h3>
          <CodeBlock code={dockerComposeExample} language="yaml" />
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Kubernetes Deployment</h3>
          <CodeBlock code={kubernetesExample} language="yaml" />
        </Card>
      </motion.div>

      <NavigationButtons currentTopicId="deployment-docker" />
    </motion.div>
  );
};

export default DeploymentDockerPage;
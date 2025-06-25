import { Topic, NavigationItem } from '../types';

export const topics: Topic[] = [
  {
    id: 'welcome',
    title: 'Welcome to .NET Interview Hub',
    description: 'Interactive learning platform for .NET interview preparation',
    category: 'Getting Started',
    route: '/',
  },
  {
    id: 'net-architecture',
    title: '.NET Architecture',
    description: 'Understanding .NET Framework, Core, and modern .NET evolution',
    category: '.NET & C# Fundamentals',
    route: '/net-architecture',
  },
  {
    id: 'clr-deep-dive',
    title: 'CLR Deep Dive',
    description: 'Common Language Runtime internals and memory management',
    category: '.NET & C# Fundamentals',
    route: '/clr-deep-dive',
  },
  {
    id: 'csharp-oop',
    title: 'C# & OOP Principles',
    description: 'Object-oriented programming and SOLID principles in C#',
    category: '.NET & C# Fundamentals',
    route: '/csharp-oop',
  },
  {
    id: 'advanced-csharp',
    title: 'Advanced C# Features',
    description: 'Delegates, events, async/await, and LINQ concepts',
    category: '.NET & C# Fundamentals',
    route: '/advanced-csharp',
  },
  {
    id: 'aspnet-pipeline',
    title: 'ASP.NET Core Pipeline',
    description: 'Request pipeline, middleware, and application architecture',
    category: 'ASP.NET Core',
    route: '/aspnet-pipeline',
  },
  {
    id: 'aspnet-di',
    title: 'Dependency Injection',
    description: 'IoC container, service lifetimes, and DI patterns',
    category: 'ASP.NET Core',
    route: '/aspnet-di',
  },
  {
    id: 'ef-core-fundamentals',
    title: 'EF Core Fundamentals',
    description: 'Entity Framework Core basics and database operations',
    category: 'Data Access',
    route: '/ef-core-fundamentals',
  },
  {
    id: 'ef-core-advanced',
    title: 'Advanced EF Core',
    description: 'Data loading strategies, concurrency, and performance',
    category: 'Data Access',
    route: '/ef-core-advanced',
  },
  {
    id: 'unit-testing',
    title: 'Unit Testing',
    description: 'Testing best practices, mocking, and test patterns',
    category: 'Design & Deployment',
    route: '/unit-testing',
  },
  {
    id: 'deployment-docker',
    title: 'Deployment & Docker',
    description: 'Containerization, deployment strategies, and DevOps',
    category: 'Design & Deployment',
    route: '/deployment-docker',
  },
];

export const navigationItems: NavigationItem[] = topics.map(topic => ({
  id: topic.id,
  label: topic.title,
  route: topic.route,
  category: topic.category,
}));
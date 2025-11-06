import { toSlug } from '../utils/slug';

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
};

export const posts: BlogPost[] = [
  {
    title: 'Driving Growth with Modern Web Apps',
    slug: toSlug('Driving Growth with Modern Web Apps'),
    date: '2025-10-25',
    excerpt: 'Discover how modern web applications can accelerate business growth and improve customer experience.',
    content:
      'Modern web applications leverage performance, accessibility, and scalability to deliver value. In this post, we explore key strategies and tools to build applications that drive growth...',
    tags: ['web', 'growth', 'strategy'],
  },
  {
    title: 'Cloud Migration: What You Need to Know',
    slug: toSlug('Cloud Migration: What You Need to Know'),
    date: '2025-10-20',
    excerpt: 'A practical guide to moving workloads to the cloud with minimal disruption.',
    content:
      'Migrating to the cloud involves assessing workloads, planning, and executing with the right tooling. We outline the process, common pitfalls, and best practices...',
    tags: ['cloud', 'migration'],
  },
  {
    title: 'Data Insights That Matter',
    slug: toSlug('Data Insights That Matter'),
    date: '2025-10-18',
    excerpt: 'Turn raw data into actionable business insights with analytics and visualization.',
    content:
      'Data analytics is more than dashboards. It requires clear goals, clean data, and meaningful storytelling. Here are techniques to get the most from your data...',
    tags: ['data', 'analytics'],
  },
];
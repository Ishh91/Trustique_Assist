import { toSlug } from '../utils/slug';

export type PortfolioItem = {
  title: string;
  client: string;
  description: string;
  category: string;
  tags: string[];
  slug: string;
};

export const portfolio: PortfolioItem[] = [
  {
    title: 'Website & Social Media Management for NGO',
    client: 'Samvedana Mahila Utthana Samiti',
    description:
      'Developing and managing the website and social media presence for Samvedana Mahila Utthana Samiti, an NGO focused on women empowerment and community development. The project enhances digital visibility, promotes initiatives, and connects them with a wider audience through a strong, engaging online platform.',
    category: 'Digital Presence',
    tags: ['NGO', 'Website', 'Social Media', 'Community'],
    slug: toSlug('Website and Social Media Management for Samvedana Mahila Utthana Samiti')
  },
  {
    title: 'IoT-based Software Solution',
    client: 'SafeSense Tech Pvt. Ltd.',
    description:
      'Developing an IoT-based software solution enabling smart automation, real-time monitoring, and data-driven decision-making. The system focuses on scalability, efficiency, and user-friendly control to enhance operational management and foster technological innovation.',
    category: 'IoT & Automation',
    tags: ['IoT', 'Automation', 'Monitoring', 'Data'],
    slug: toSlug('IoT-based Software Solution for SafeSense Tech Pvt Ltd')
  }
];
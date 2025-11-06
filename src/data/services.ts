import { Code, Database, Cloud, Shield, Smartphone, Zap, Layers, PenTool, Briefcase, Instagram, BarChart, Package, Cpu, Globe, Users, MessageCircle, ShoppingCart, Search, Mail, Target } from 'lucide-react';
import { toSlug } from '../utils/slug';

export type Service = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  color: string;
  slug: string;
  fullDescription?: string;
  features?: string[];
  useCases?: string[];
  technologies?: string[];
};

export const services: Service[] = [
  {
    icon: Code,
    title: 'Custom Web Development',
    description:
      'Bespoke website solutions engineered for peak performance, seamless user journeys, and conversion optimization.',
    color: 'from-blue-500 to-blue-600',
    slug: toSlug('Custom Web Development'),
    fullDescription: 'We architect and develop custom websites that serve as powerful digital assets for your business. Our development process focuses on creating fast, secure, and scalable web applications using modern frameworks and best practices. We specialize in building progressive web apps (PWAs), single-page applications (SPAs), and complex web platforms with advanced functionality.',
    features: [
      'Custom CMS development',
      'E-commerce platform integration',
      'API development and integration',
      'Progressive Web App (PWA) capabilities',
      'Advanced animation and interactivity',
      'Multi-language and localization support'
    ],
    useCases: [
      'Corporate websites and landing pages',
      'E-commerce stores and marketplaces',
      'Web-based SaaS applications',
      'Customer portals and dashboards',
      'Educational platforms and LMS',
      'Real-time collaboration tools'
    ],
    technologies: ['React.js', 'Next.js', 'Vue.js', 'Node.js', 'TypeScript', 'GraphQL', 'MongoDB', 'PostgreSQL']
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile experiences that captivate users and drive measurable business outcomes.',
    color: 'from-purple-500 to-purple-600',
    slug: toSlug('Mobile App Development'),
    fullDescription: 'We create immersive mobile applications that deliver exceptional user experiences across iOS and Android platforms. Our mobile development expertise spans native development using Swift and Kotlin, as well as cross-platform solutions with React Native and Flutter. We focus on performance optimization, intuitive navigation, and seamless integration with device features.',
    features: [
      'Native iOS and Android development',
      'Cross-platform React Native/Flutter apps',
      'Offline functionality and data sync',
      'Push notification systems',
      'In-app purchase integration',
      'Biometric authentication support'
    ],
    useCases: [
      'Consumer-facing mobile applications',
      'Enterprise productivity tools',
      'E-commerce and shopping apps',
      'Social networking platforms',
      'Health and fitness trackers',
      'On-demand service applications'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Redux', 'GraphQL', 'App Store/Play Store deployment']
  },
  {
    icon: Cpu,
    title: 'Enterprise Software Solutions',
    description:
      'Scalable enterprise-grade software systems that streamline operations and drive organizational efficiency.',
    color: 'from-green-500 to-green-600',
    slug: toSlug('Enterprise Software Solutions'),
    fullDescription: 'We design and build robust enterprise software solutions that transform business operations and enable digital transformation. Our enterprise development focuses on creating scalable, secure, and maintainable systems that integrate seamlessly with existing infrastructure while providing powerful analytics and reporting capabilities.',
    features: [
      'Custom ERP and CRM development',
      'Workflow automation systems',
      'Business intelligence dashboards',
      'Legacy system modernization',
      'Multi-tenant architecture',
      'Advanced reporting and analytics'
    ],
    useCases: [
      'Enterprise resource planning systems',
      'Customer relationship management',
      'Supply chain management',
      'Human resources management',
      'Inventory and asset tracking',
      'Business process automation'
    ],
    technologies: ['.NET Core', 'Java Spring', 'Python Django', 'Microservices', 'Docker', 'Kubernetes', 'Redis', 'Elasticsearch']
  },
  {
    icon: BarChart,
    title: 'Data Analytics & Business Intelligence',
    description:
      'Transform raw data into actionable insights with advanced analytics and interactive business intelligence dashboards.',
    color: 'from-orange-500 to-orange-600',
    slug: toSlug('Data Analytics and Business Intelligence'),
    fullDescription: 'We help organizations harness the power of their data through comprehensive analytics solutions and business intelligence platforms. Our data services include data pipeline development, machine learning models, predictive analytics, and interactive dashboard creation that enable data-driven decision making across your organization.',
    features: [
      'Custom data pipeline development',
      'Real-time analytics dashboards',
      'Predictive modeling and forecasting',
      'Data visualization and reporting',
      'ETL process optimization',
      'Machine learning integration'
    ],
    useCases: [
      'Sales and revenue analytics',
      'Customer behavior analysis',
      'Operational efficiency tracking',
      'Market trend analysis',
      'Risk assessment and management',
      'Performance monitoring systems'
    ],
    technologies: ['Python', 'R', 'Tableau', 'Power BI', 'Apache Spark', 'Apache Kafka', 'Snowflake', 'Looker']
  },
  {
    icon: Zap,
    title: 'AI & Machine Learning Solutions',
    description:
      'Intelligent automation and predictive systems that learn, adapt, and drive innovation across your business processes.',
    color: 'from-red-500 to-red-600',
    slug: toSlug('AI and Machine Learning Solutions'),
    fullDescription: 'We develop cutting-edge artificial intelligence and machine learning solutions that solve complex business challenges and create competitive advantages. Our AI expertise spans natural language processing, computer vision, recommendation systems, and predictive analytics, delivering intelligent systems that continuously learn and improve.',
    features: [
      'Custom machine learning models',
      'Natural language processing',
      'Computer vision and image recognition',
      'Predictive analytics systems',
      'Intelligent chatbots and virtual assistants',
      'Anomaly detection algorithms'
    ],
    useCases: [
      'Intelligent document processing',
      'Customer sentiment analysis',
      'Predictive maintenance systems',
      'Personalized recommendation engines',
      'Fraud detection and prevention',
      'Automated quality control'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'scikit-learn', 'OpenCV', 'NLTK', 'Hugging Face', 'AWS SageMaker', 'Google AI Platform']
  },
  {
    icon: Shield,
    title: 'Cybersecurity & Compliance',
    description:
      'Comprehensive security frameworks and compliance solutions that protect your digital assets and ensure regulatory adherence.',
    color: 'from-indigo-500 to-indigo-600',
    slug: toSlug('Cybersecurity and Compliance'),
    fullDescription: 'We provide end-to-end cybersecurity solutions that protect your organization from evolving threats while ensuring compliance with industry regulations. Our security services include vulnerability assessments, penetration testing, security architecture design, and compliance auditing across various regulatory frameworks.',
    features: [
      'Security architecture design',
      'Vulnerability assessment and penetration testing',
      'Compliance auditing and certification',
      'Incident response planning',
      'Security awareness training',
      'Continuous security monitoring'
    ],
    useCases: [
      'GDPR and data privacy compliance',
      'PCI DSS for payment security',
      'HIPAA for healthcare data',
      'SOC 2 compliance auditing',
      'ISO 27001 certification',
      'Cloud security configuration'
    ],
    technologies: ['OWASP', 'NIST Framework', 'SIEM tools', 'Penetration testing tools', 'Encryption technologies', 'IAM solutions', 'Firewall configuration']
  },
  {
    icon: Database,
    title: 'Blockchain & Web3 Development',
    description:
      'Decentralized applications and blockchain solutions that enable trust, transparency, and new business models.',
    color: 'from-yellow-500 to-yellow-600',
    slug: toSlug('Blockchain and Web3 Development'),
    fullDescription: 'We build innovative blockchain solutions and Web3 applications that leverage distributed ledger technology for enhanced security, transparency, and efficiency. Our blockchain development services include smart contract development, decentralized applications (dApps), tokenization, and enterprise blockchain integration.',
    features: [
      'Smart contract development and auditing',
      'Decentralized application (dApp) development',
      'Tokenization and cryptocurrency creation',
      'NFT marketplace development',
      'DeFi protocol development',
      'Blockchain integration services'
    ],
    useCases: [
      'Supply chain traceability',
      'Digital identity solutions',
      'Tokenized asset management',
      'Decentralized finance applications',
      'NFT platforms and marketplaces',
      'Voting and governance systems'
    ],
    technologies: ['Ethereum', 'Solidity', 'Web3.js', 'IPFS', 'Polygon', 'Binance Smart Chain', 'Hardhat', 'Truffle']
  },
  {
    icon: PenTool,
    title: 'UX/UI Design & Product Strategy',
    description:
      'Human-centered design solutions that create intuitive, engaging digital experiences and drive product success.',
    color: 'from-pink-500 to-pink-600',
    slug: toSlug('UX UI Design and Product Strategy'),
    fullDescription: 'We create compelling user experiences and intuitive interfaces that drive engagement and conversion. Our design process combines user research, interaction design, and visual aesthetics to create digital products that users love. We focus on understanding user needs, business goals, and technical constraints to deliver designs that are both beautiful and functional.',
    features: [
      'User research and persona development',
      'Information architecture and wireframing',
      'Interactive prototyping and testing',
      'Visual design and brand integration',
      'Design system creation',
      'Usability testing and optimization'
    ],
    useCases: [
      'Website and application redesign',
      'New product design and development',
      'Design system implementation',
      'User experience optimization',
      'Brand identity and digital presence',
      'Mobile-first responsive design'
    ],
    technologies: ['Figma', 'Sketch', 'Adobe XD', 'InVision', 'Principle', 'User testing platforms', 'Analytics tools']
  },
  {
    icon: Briefcase,
    title: 'IT Strategy & Digital Transformation',
    description:
      'Strategic technology consulting and digital transformation services that align IT investments with business objectives.',
    color: 'from-teal-500 to-teal-600',
    slug: toSlug('IT Strategy and Digital Transformation'),
    fullDescription: 'We provide strategic IT consulting and digital transformation services that help organizations leverage technology for competitive advantage and operational excellence. Our consulting services include technology assessment, digital roadmap development, IT governance, and change management to ensure successful technology adoption and transformation.',
    features: [
      'Digital maturity assessment',
      'Technology roadmap development',
      'IT governance and strategy',
      'Digital transformation planning',
      'Vendor selection and management',
      'Change management and training'
    ],
    useCases: [
      'Digital transformation initiatives',
      'IT infrastructure modernization',
      'Cloud migration strategy',
      'Technology stack evaluation',
      'IT organizational design',
      'Digital innovation programs'
    ],
    technologies: ['Enterprise Architecture', 'ITIL Framework', 'Agile Methodology', 'Cloud Strategy', 'Digital Maturity Models', 'Change Management Frameworks']
  },
  {
    icon: MessageCircle,
    title: 'Social Media & Community Management',
    description:
      'Strategic social media management that builds brand communities, drives engagement, and accelerates growth.',
    color: 'from-blue-400 to-cyan-400',
    slug: toSlug('Social Media and Community Management'),
    fullDescription: 'We develop and execute comprehensive social media strategies that build brand awareness, engage audiences, and drive business results. Our social media services include content strategy, community management, influencer partnerships, and performance analytics across all major social platforms.',
    features: [
      'Social media strategy development',
      'Content calendar and publishing',
      'Community engagement and moderation',
      'Influencer partnership management',
      'Social media advertising',
      'Performance analytics and reporting'
    ],
    useCases: [
      'Brand awareness campaigns',
      'Product launches and promotions',
      'Customer service and support',
      'Community building and engagement',
      'Crisis communication management',
      'Employer branding and recruitment'
    ],
    technologies: ['Social media management platforms', 'Analytics tools', 'Content creation software', 'Community platforms', 'Advertising platforms', 'Listening tools']
  },
  {
    icon: Target,
    title: 'Digital Marketing & Growth Strategy',
    description:
      'Data-driven digital marketing campaigns and growth strategies that acquire customers and maximize lifetime value.',
    color: 'from-purple-400 to-pink-400',
    slug: toSlug('Digital Marketing and Growth Strategy'),
    fullDescription: 'We create and execute data-driven digital marketing strategies that drive measurable business growth. Our marketing services include SEO, PPC, content marketing, email automation, and conversion rate optimization, all backed by comprehensive analytics and continuous optimization.',
    features: [
      'Search engine optimization (SEO)',
      'Pay-per-click advertising (PPC)',
      'Content marketing strategy',
      'Email marketing automation',
      'Conversion rate optimization',
      'Marketing analytics and attribution'
    ],
    useCases: [
      'Lead generation campaigns',
      'E-commerce sales growth',
      'Brand positioning and awareness',
      'Customer retention programs',
      'Market expansion initiatives',
      'Product adoption and usage'
    ],
    technologies: ['Google Analytics', 'Google Ads', 'SEO tools', 'Marketing automation', 'CRM integration', 'A/B testing platforms', 'Attribution modeling']
  },
  {
    icon: Package,
    title: 'Startup Technology Incubation',
    description:
      'End-to-end technology solutions for startups, from MVP development to scalable platform architecture and growth.',
    color: 'from-green-400 to-blue-400',
    slug: toSlug('Startup Technology Incubation'),
    fullDescription: 'We provide comprehensive technology solutions for startups, offering everything needed to transform ideas into successful digital products. Our startup package includes product strategy, MVP development, technical architecture, and growth infrastructure, all designed to help startups launch quickly and scale efficiently.',
    features: [
      'Product strategy and MVP development',
      'Scalable technical architecture',
      'Agile development methodology',
      'Investor-ready technical documentation',
      'Growth infrastructure setup',
      'Technical team training and handover'
    ],
    useCases: [
      'Tech startup launch and scaling',
      'Minimum viable product development',
      'Investor pitch technical preparation',
      'Product-market fit validation',
      'Technical team building and training',
      'Platform migration and scaling'
    ],
    technologies: ['Full-stack development', 'Cloud infrastructure', 'CI/CD pipelines', 'Monitoring and analytics', 'Scalable databases', 'API development', 'Mobile and web platforms']
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure & DevOps',
    description:
      'Scalable cloud infrastructure and DevOps practices that ensure reliability, security, and continuous delivery.',
    color: 'from-cyan-500 to-blue-500',
    slug: toSlug('Cloud Infrastructure and DevOps'),
    fullDescription: 'We design and implement robust cloud infrastructure and DevOps practices that enable organizations to deploy and scale applications efficiently. Our cloud services include architecture design, migration, automation, and ongoing optimization across major cloud platforms.',
    features: [
      'Cloud architecture design and migration',
      'Infrastructure as Code implementation',
      'CI/CD pipeline development',
      'Containerization and orchestration',
      'Monitoring and alerting systems',
      'Disaster recovery and backup solutions'
    ],
    useCases: [
      'Application modernization and migration',
      'Microservices architecture implementation',
      'High-availability system design',
      'Cost optimization and resource management',
      'Security and compliance automation',
      'Performance monitoring and optimization'
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Prometheus']
  },
  {
    icon: Users,
    title: 'Staff Augmentation & Team Extension',
    description:
      'Flexible staffing solutions that provide expert developers, designers, and engineers to complement your team.',
    color: 'from-orange-400 to-red-400',
    slug: toSlug('Staff Augmentation and Team Extension'),
    fullDescription: 'We provide skilled technology professionals to augment your existing teams and accelerate project delivery. Our staff augmentation services include vetted developers, designers, QA engineers, and DevOps specialists who integrate seamlessly with your workflows and culture.',
    features: [
      'Dedicated developer teams',
      'Specialized technology expertise',
      'Flexible engagement models',
      'Rapid team scaling',
      'Quality assurance and code review',
      'Knowledge transfer and documentation'
    ],
    useCases: [
      'Project-based team extension',
      'Specialized skill requirements',
      'Temporary capacity increases',
      'Expert consultation and guidance',
      'Legacy technology maintenance',
      'New technology adoption support'
    ],
    technologies: ['Various programming languages', 'Development frameworks', 'Cloud platforms', 'DevOps tools', 'Testing frameworks', 'Project management tools']
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description:
      'Complete e-commerce platforms and marketplace solutions that drive sales and enhance customer experiences.',
    color: 'from-green-500 to-emerald-500',
    slug: toSlug('E-commerce Solutions'),
    fullDescription: 'We build comprehensive e-commerce solutions that transform online shopping experiences and drive business growth. Our e-commerce services include platform development, marketplace creation, payment integration, and omnichannel retail solutions.',
    features: [
      'Custom e-commerce platform development',
      'Marketplace and multi-vendor systems',
      'Payment gateway integration',
      'Inventory and order management',
      'Personalization and recommendation engines',
      'Mobile commerce optimization'
    ],
    useCases: [
      'Online store development',
      'Marketplace platform creation',
      'B2B e-commerce solutions',
      'Subscription-based commerce',
      'International e-commerce expansion',
      'Headless commerce implementation'
    ],
    technologies: ['Shopify Plus', 'Magento', 'WooCommerce', 'Custom platforms', 'Payment processors', 'Shipping integrations', 'Tax calculation services']
  },
  {
    icon: Search,
    title: 'SEO & Content Strategy',
    description:
      'Comprehensive SEO and content strategies that improve search visibility, drive organic traffic, and establish authority.',
    color: 'from-blue-400 to-indigo-400',
    slug: toSlug('SEO and Content Strategy'),
    fullDescription: 'We develop and execute data-driven SEO and content strategies that improve search engine rankings, drive qualified organic traffic, and establish thought leadership. Our services include technical SEO, content creation, link building, and performance analytics.',
    features: [
      'Technical SEO audit and optimization',
      'Content strategy and creation',
      'Keyword research and targeting',
      'Link building and outreach',
      'Local SEO optimization',
      'Performance tracking and reporting'
    ],
    useCases: [
      'Search engine ranking improvement',
      'Content marketing program development',
      'Local business visibility enhancement',
      'E-commerce product page optimization',
      'International SEO expansion',
      'Voice search optimization'
    ],
    technologies: ['SEO analytics tools', 'Content management systems', 'Keyword research platforms', 'Rank tracking software', 'Technical SEO tools', 'Content optimization platforms']
  }
];
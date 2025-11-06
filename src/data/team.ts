import riya from '../img/team/pra.jpg';
import arjun from '../img/team/am.jpg';
import neha from '../img/team/ng.jpg';
import karan from '../img/team/k.jpg';
import { ReactNode } from 'react';

export type TeamMember = {
  bio: ReactNode;
  skills: string;
  name: string;
  role: string;
  photo: string;
  location?: string;
  links?: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
  experience?: string;
  education?: string;
  department?: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: 'Pranjal Pandey',
    role: 'CEO & Co-Founder',
    photo: riya,
    location: 'Lucknow, IN',
    links: {
      linkedin: 'https://www.linkedin.com/in/pranjalpandey',
      email: 'pranjal@trustique.com'
    },
    bio: 'A dynamic and visionary leader, he inspires innovation and excellence at every step. With a sharp strategic mindset and unwavering commitment to quality, he drives the company toward growth, success, and unmatched client satisfaction.',
    skills: 'Technical Expertise,Strategic Leadership,Innovative Thinking,Business Development,Growth Management,Client Focus',
    experience: '3+ years of experience in the industry, he has consistently demonstrated innovation, leadership, and a results-driven approach. His hands-on experience in technology and project execution has played a key role in driving growth and delivering impactful solutions.',
    education: 'He completed his B.Tech in Computer Science from Jaypee University of Engineering and Technology, Guna (2020–2024), where he built a strong foundation in technology, innovation, and problem-solving, shaping his journey as a tech-driven leader.',
    department: 'Executive Leadership'
  },
  {
    name: 'Divyansh',
    role: 'CFO',
    photo: arjun,
    location: 'Lucknow, IN',
    links: {
      linkedin: 'https://www.linkedin.com/in/divyansh',
      email: 'divyansh@trustique.com'
    },
    bio: 'A sharp financial strategist and tech enthusiast, he blends his B.Tech knowledge with strong financial acumen to ensure the company’s stability and growth. As the CFO, he excels in financial planning, budgeting, and resource optimization, driving sustainable success through smart, data-driven decisions.',
    skills: 'Financial Planning & Analysis,Budgeting & Resource Management,Strategic Decision-Making,Technical & Analytical Skills,Business Growth Strategy,Data-Driven Financial Insights',
    experience: '3+ years of experience, he has honed his expertise in financial management and strategic planning. His deep understanding of technology and analytics helps him drive efficient financial operations and sustainable business growth.',
    education: 'He is a B.Tech in Computer Science from Jaypee University of Engineering and Technology, Guna, building a strong foundation in technology, analytics, and problem-solving that enhances his financial leadership and strategic decision-making.',
    department: 'Finance'
  },
  {
    name: 'Ananya Srivastav',
    role: 'CMO',
    photo: neha,
    location: 'Lucknow, IN',
    links: {
      linkedin: 'https://www.linkedin.com/in/ananya-srivastava-b0809a24a',
      email: 'ananya@trustique.com'
    },
    bio: 'A creative and results-driven marketing leader, she blends strategy, innovation, and data-driven insights to build powerful brand presence and engagement. As the CMO, she excels in crafting impactful campaigns, driving growth, and strengthening the company’s market position through visionary marketing initiatives.',
    skills: 'Strategic Marketing, Digital Branding, Creative Campaigns, Market Analysis, Brand Growth, Public Relations',
    experience: '2+ years of experience, she has mastered the art of strategic marketing and brand communication. Her creative approach and data-driven mindset have consistently fueled brand growth and audience engagement.',
    education: 'She has done B.Tech in Computer Science from Jaypee University of Engineering and Technology, Guna, where she has developed strong analytical, technical, and creative problem-solving skills that enhance her strategic marketing expertise.',
    department: 'Marketing'
  },
  {
    name: 'Ishant Sharma',
    role: 'Lead Engineer',
    photo: karan,
    location: 'Etawah, IN',
    links: {
      github: 'https://github.com/ishh91',
      linkedin: 'https://www.linkedin.com/in/ishhant',
      email: 'ishantsharma9105@gmail.com'
    },
    bio: 'Full-stack developer and technical architect with deep expertise in modern web technologies. Leads the engineering team in building scalable, high-performance applications.',
    skills: 'React.js, Node.js, Python, AWS, MongoDB, PostgreSQL, Docker, Kubernetes, System Design, API Development, Microservices, DevOps, Agile Methodology, Code Review',
    experience: '1+ years in software development and architecture. Previously Software Engineer at Bluephant and Full-Stack Developer at Werkbiz Technology.',
    education: 'Bachelor of Engineering in Computer Science, Juet Guna | AWS Solutions Architect Certified | MongoDB Certified Developer',
    department: 'Engineering'
  },

];
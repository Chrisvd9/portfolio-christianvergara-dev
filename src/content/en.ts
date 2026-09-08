import type { SiteContent } from './schema';
import { media } from './media';

export const en: SiteContent = {
  locale: 'en',

  nav: [
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],

  hero: {
    availability: 'Available for work',
    greeting: "Hey, I'm",
    name: 'Christian Vergara',
    summary:
      'Full-stack Software Engineer with a cybersecurity foundation, based in Chile. 3+ years building web products with React, Next.js and Node.js, serverless architectures on AWS, and a habit of thinking about secure development, performance and accessibility first.',
    contactCta: 'Get in touch',
    cvCta: 'Download CV',
  },

  experienceTitle: 'Work experience',
  experienceLead:
    'Three years across e-commerce platforms, multi-tenant SaaS and cybersecurity governance.',
  experience: [
    {
      role: 'Cybersecurity Intern',
      org: 'UNDP Chile',
      period: 'Jan 2026 — Apr 2026',
      location: 'Santiago · Hybrid',
      description:
        'Professional internship supporting cybersecurity governance, data protection, gap analysis and control reviews. Built risk and treatment matrices and took part in organizational alignment work, reinforcing criteria for security, traceability and secure development.',
    },
    {
      role: 'Software Engineer',
      org: 'Vendie',
      period: 'Jan 2025 — Jan 2026',
      location: 'Chile · Remote',
      description:
        'Built and evolved features for an e-commerce platform with React, TypeScript and Zustand, across both frontend and backend services. Worked with AWS Lambda (Node.js/TypeScript and Python) for automation and business-logic integration, integrated the WhatsApp API for product, order, metrics and messaging flows, and led the dashboard migration from React 17 to Next.js with Shadcn/UI and React Query.',
    },
    {
      role: 'Software Engineer & UX/UI',
      org: 'Grow Cloud SpA',
      period: 'Feb 2023 — Jan 2025',
      location: 'Chile · Remote',
      description:
        'Designed prototypes and flows in Figma and built responsive web apps with React, Next.js, TypeScript and Tailwind CSS. Took part in migrations of applications and infrastructure from on-premise to AWS —VPC, API Gateway, Cognito, S3, EC2, ECS/Fargate and SQL databases— and supported network security configuration: inbound/outbound rules, VPC segmentation and access control.',
    },
  ],

  projectsTitle: 'Projects',
  projectsLead:
    'A look at my most recent work. 83+ projects in total, between private and public.',
  projects: [
    {
      name: 'Logtrics',
      description:
        'Multi-tenant B2B SaaS platform for forwarders and supply-chain teams in LATAM. It digitizes the full logistics cycle: purchase orders, RFQs to multiple forwarders, offer comparison, real-time container tracking, and document and financial management for each shipment. Includes AI-assisted extraction and validation of orders and freight quotes, per-SKU costing, and two-way email integration with Gmail and Outlook. Secure by design: strict per-tenant isolation and permissions enforced on the server.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Confidential'],
      image: media.projectLogtrics,
      imageAlt: 'Preview of the Logtrics dashboard',
      demo: 'https://www.logtrics.ai/',
      note: 'Professional project · private code',
    },
    {
      name: 'Cybersecurity Academy',
      description:
        'Landing page for a cybersecurity academy, with an emphasis on SEO and on animations with Motion. Built with React + Vite and styled with Tailwind CSS.',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Motion', 'SEO'],
      image: media.projectAcademia,
      imageAlt: 'Preview of the Cybersecurity Academy landing page',
      demo: 'https://academia-ciberseguridad.com/',
      note: 'Real client · private code',
    },
    {
      name: 'Liguanova',
      description:
        'Landing page focused on UX/UI and micro-interactions. Built with React + Vite and styled with Tailwind CSS; animations with Motion. A project to explore transitions and visual detail (not a real commercial site).',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Motion'],
      image: media.projectLiguanova,
      imageAlt: 'Preview of the Liguanova landing page',
      demo: 'https://liguanova.onrender.com/',
      repo: 'https://github.com/Chrisvd9/LiguaNova-landingpage',
    },
    {
      name: 'Black Fresh Records',
      description:
        'Landing page for a recording studio and live-session space. Built with React and Tailwind CSS with animations, caring about visual rhythm and how the catalog is presented.',
      tech: ['React', 'Tailwind CSS'],
      image: media.projectBlackfresh,
      imageAlt: 'Preview of the Black Fresh Records landing page',
      demo: 'https://blackfreshrecords-landingpage.onrender.com/',
      note: 'Real client',
    },
  ],

  about: {
    title: 'About me',
    paragraphs: [
      "I'm Christian, a Software Engineer with 3+ years building web products end to end. I mostly work with React, Next.js, TypeScript and Node.js, and I enjoy the point where the frontend, the APIs and the infrastructure meet.",
      'I come from cybersecurity —I hold a University Technician degree in Cybersecurity, with training in offensive security, risk management and controls— so I think about authentication, permissions and attack surface from the first commit, not at the end.',
      "I've worked on e-commerce and multi-tenant SaaS platforms, on-premise-to-AWS infrastructure migrations, and serverless architectures with Lambda, API Gateway and Cognito. I care about the details: performance, accessibility and code other people can maintain.",
    ],
    photo: media.about,
    photoAlt: 'Photo of Christian Vergara',
    certsTitle: 'Certifications',
    certs: [
      'AWS Solutions Architect Associate',
      'AWS Cloud Practitioner',
      'eJPTv2 — INE Security',
      'CEH — EC-Council',
      'Cisco CyberOps Associate',
      'Cisco Cybersecurity Essentials',
      'Cisco Introduction to Cybersecurity',
    ],
    languagesTitle: 'Languages',
    languages: ['Spanish — native', 'English — B2'],
    educationTitle: 'Education',
    education: [
      {
        title: 'University Technician in Cybersecurity',
        org: 'Universidad Mayor',
        period: 'Mar 2024 — Jul 2026',
      },
      {
        title: 'Full-Stack JavaScript / MERN',
        org: 'Coding Dojo · Colorado Technical University',
        period: 'Jan 2022 — May 2022',
      },
    ],
  },

  contact: {
    title: 'Contact',
    lead: 'Got a project or a role in mind? Send me a message and I’ll get back to you soon.',
    emailLabel: 'Send an email',
    phoneLabel: 'Call or WhatsApp',
  },

  seo: {
    title: 'Christian Vergara — Software Engineer & Cybersecurity',
    description:
      'Full-stack Software Engineer with a cybersecurity foundation. 3+ years building web products with React, Next.js, Node.js and AWS, focused on security, performance and accessibility.',
    ogAlt: 'Christian Vergara — Software Engineer & Cybersecurity',
    jobTitle: 'Software Engineer',
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'AWS',
      'Serverless architectures',
      'Web security',
      'Penetration testing',
      'Web accessibility',
    ],
  },

  ui: {
    skipToContent: 'Skip to content',
    primaryNav: 'Primary navigation',
    themeMenu: 'Change theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    languageMenu: 'Change language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    viewProject: 'View project',
    code: 'Code',
    demo: 'Live demo',
    projectsPrev: 'Previous projects',
    projectsNext: 'Next projects',
    projectsGoToPage: 'Go to projects page {n}',
    backToTop: 'Back to top',
    footerNote: 'Built with Astro, minding every millisecond.',
    notFoundTitle: 'Page not found',
    notFoundBody: 'The page you are looking for does not exist or was moved.',
    notFoundCta: 'Back to home',
  },
};

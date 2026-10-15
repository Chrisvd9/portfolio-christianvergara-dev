import type { SiteContent } from './schema';
import { media } from './media';

export const es: SiteContent = {
  locale: 'es',

  nav: [
    { id: 'experience', label: 'Experiencia' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'contact', label: 'Contacto' },
  ],

  hero: {
    availability: 'Disponible para proyectos freelance',
    greeting: 'Hey, soy',
    name: 'Christian Vergara',
    summary:
      'CTO & Co-Founder de Logtrics AI y Software Engineer, desde Chile. Más de 3 años construyendo productos SaaS, plataformas web e integraciones empresariales. Lidero la estrategia tecnológica, la arquitectura y la evolución del producto, con foco en seguridad y escalabilidad.',
    contactCta: 'Contáctame',
    cvCta: 'Descargar CV',
  },

  experienceTitle: 'Experiencia laboral',
  experienceLead:
    'Del desarrollo de productos desde cero a la dirección tecnológica, con experiencia en SaaS B2B, e-commerce y ciberseguridad.',
  experience: [
    {
      role: 'CTO & Co-Founder',
      org: 'Logtrics AI',
      period: 'Jun 2026 — Actualidad',
      location: 'Chile · Remoto',
      description:
        'Tras liderar la construcción del producto desde sus primeras etapas, asumí la dirección tecnológica de Logtrics. Defino la estrategia tecnológica, tomo decisiones de arquitectura e impulso la evolución y escalabilidad de la plataforma. Lidero las iniciativas técnicas de producto, seguridad, infraestructura e integraciones empresariales para convertir las necesidades de la industria logística y del comercio exterior en soluciones que crezcan junto a nuestros clientes y operaciones.',
    },
    {
      role: 'Desarrollador Fundador / Founding Software Engineer',
      org: 'Logtrics AI',
      period: 'Sep 2025 — Jun 2026',
      location: 'Chile · Remoto',
      description:
        'Me incorporé a Logtrics desde sus primeras etapas y lideré la construcción técnica del producto desde cero, transformando la visión del negocio en una plataforma funcional para operaciones de comercio exterior y logística. Participé en el diseño del producto, la experiencia de usuario, la arquitectura y el desarrollo de funcionalidades e integraciones para operar con clientes reales. Con el crecimiento de la plataforma B2B, amplié mi responsabilidad hacia seguridad, infraestructura y estrategia tecnológica.',
    },
    {
      role: 'Cybersecurity Intern',
      org: 'PNUD Chile',
      period: 'Ene 2026 — Abr 2026',
      location: 'Santiago · Híbrido',
      description:
        'Práctica profesional apoyando iniciativas de gobernanza de ciberseguridad, protección de datos, análisis de brechas y revisión de controles. Elaboré matrices de riesgos y tratamiento y participé en actividades de alineación organizacional, fortaleciendo criterios de seguridad, trazabilidad y desarrollo seguro.',
    },
    {
      role: 'Software Engineer',
      org: 'Vendie',
      period: 'Ene 2025 — Ene 2026',
      location: 'Chile · Remoto',
      description:
        'Desarrollé y evolucioné funcionalidades para una plataforma e-commerce con React, TypeScript y Zustand, tanto en frontend como en servicios backend. Trabajé con AWS Lambda (Node.js/TypeScript y Python) para automatización e integración de lógica de negocio, integré la API de WhatsApp para flujos de productos, órdenes, métricas y mensajería, y lideré la migración del dashboard de React 17 a Next.js con Shadcn/UI y React Query.',
    },
    {
      role: 'Software Engineer & UX/UI',
      org: 'Grow Cloud SpA',
      period: 'Feb 2023 — Ene 2025',
      location: 'Chile · Remoto',
      description:
        'Diseñé prototipos y flujos en Figma y desarrollé aplicaciones web responsive con React, Next.js, TypeScript y Tailwind CSS. Participé en migraciones de aplicaciones e infraestructura desde on-premise hacia AWS —VPC, API Gateway, Cognito, S3, EC2, ECS/Fargate y bases de datos SQL— y apoyé configuraciones de seguridad de red: reglas de entrada/salida, segmentación en VPC y control de acceso.',
    },
  ],

  projectsTitle: 'Proyectos',
  projectsLead:
    'Una muestra de mis trabajos más recientes. En total, más de 83 proyectos entre privados y públicos.',
  projects: [
    {
      name: 'Logtrics',
      description:
        'Plataforma SaaS B2B multi-tenant para forwarders y equipos de supply chain en LATAM. Digitaliza el ciclo logístico completo: orden de compra, RFQ a múltiples forwarders, comparación de ofertas, tracking de contenedores en tiempo real y gestión documental y financiera de cada embarque. Incluye extracción y validación de órdenes y ofertas de flete asistida por IA, costeo por SKU e integración de correo bidireccional con Gmail y Outlook. Arquitectura segura por diseño: aislamiento estricto por tenant y permisos aplicados en servidor.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Confidencial'],
      image: media.projectLogtrics,
      imageAlt: 'Vista previa del panel de Logtrics',
      demo: 'https://www.logtrics.ai/',
      note: 'CTO & Co-Founder · código privado',
    },
    {
      name: 'Academia de Ciberseguridad',
      description:
        'Landing page para una academia de ciberseguridad, con énfasis en SEO y en animaciones con Motion. Desarrollada en React + Vite y estilizada con Tailwind CSS.',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Motion', 'SEO'],
      image: media.projectAcademia,
      imageAlt: 'Vista previa de la landing de la Academia de Ciberseguridad',
      demo: 'https://academia-ciberseguridad.com/',
      note: 'Cliente real · código privado',
    },
    {
      name: 'Liguanova',
      description:
        'Landing page con foco en UX/UI y micro-interacciones. Desarrollada en React + Vite y estilizada con Tailwind CSS; las animaciones con Motion. Un proyecto para explorar transiciones y detalle visual (no es un sitio comercial real).',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Motion'],
      image: media.projectLiguanova,
      imageAlt: 'Vista previa de la landing de Liguanova',
      demo: 'https://liguanova.onrender.com/',
      repo: 'https://github.com/Chrisvd9/LiguaNova-landingpage',
    },
    {
      name: 'Black Fresh Records',
      description:
        'Landing page para un estudio de grabación y sesiones en vivo. Desarrollada en React con Tailwind CSS y animaciones, cuidando ritmo visual y presentación del catálogo.',
      tech: ['React', 'Tailwind CSS'],
      image: media.projectBlackfresh,
      imageAlt: 'Vista previa de la landing de Black Fresh Records',
      demo: 'https://blackfreshrecords-landingpage.onrender.com/',
      note: 'Cliente real',
    },
  ],

  about: {
    title: 'Sobre mí',
    paragraphs: [
      'Soy Christian, CTO & Co-Founder de Logtrics AI y Software Engineer con más de 3 años de experiencia construyendo productos SaaS, plataformas web e integraciones empresariales.',
      'Comencé mi trayectoria en Logtrics liderando directamente el desarrollo del producto desde sus primeras etapas. Con el crecimiento de la compañía, evolucioné hacia la dirección tecnológica, asumiendo responsabilidades sobre arquitectura, escalabilidad, seguridad, infraestructura, integraciones y estrategia técnica.',
      'También soy Técnico Universitario en Ciberseguridad, con experiencia en PNUD Chile y certificaciones como AWS Solutions Architect Associate, eJPTv2 y CEH. Combino desarrollo de software, cloud, ciberseguridad, automatización y UX/UI para construir productos que resuelvan problemas reales de negocio y sistemas que crezcan de forma segura y sostenible.',
      'Además de mi rol en Logtrics, estoy abierto a proyectos freelance de desarrollo web, SaaS e integraciones. Trabajo con React, Next.js, TypeScript, Node.js y AWS, cuidando el rendimiento, la accesibilidad y la mantenibilidad.',
    ],
    photo: media.about,
    photoAlt: 'Foto de Christian Vergara',
    certsTitle: 'Certificaciones',
    certs: [
      'AWS Solutions Architect Associate',
      'AWS Cloud Practitioner',
      'eJPTv2 — INE Security',
      'CEH — EC-Council',
      'Cisco CyberOps Associate',
      'Cisco Cybersecurity Essentials',
      'Cisco Introduction to Cybersecurity',
    ],
    languagesTitle: 'Idiomas',
    languages: ['Español — nativo', 'Inglés — B2'],
    educationTitle: 'Educación',
    education: [
      {
        title: 'Técnico Universitario en Ciberseguridad',
        org: 'Universidad Mayor',
        period: 'Mar 2024 — Jul 2026',
      },
      {
        title: 'Full-Stack JavaScript / MERN',
        org: 'Coding Dojo · Colorado Technical University',
        period: 'Ene 2022 — May 2022',
      },
    ],
  },

  contact: {
    title: 'Contacto',
    lead: 'Estoy abierto a proyectos freelance de desarrollo web, SaaS e integraciones. Cuéntame qué necesitas construir; podemos conversar en español o inglés.',
    emailLabel: 'Enviar un correo',
    phoneLabel: 'Llamar o WhatsApp',
  },

  seo: {
    title: 'Christian Vergara — CTO & Co-Founder de Logtrics AI',
    description:
      'CTO & Co-Founder de Logtrics AI y Software Engineer. Más de 3 años creando SaaS e integraciones seguras y escalables. Disponible para proyectos freelance.',
    ogAlt: 'Christian Vergara — CTO & Co-Founder de Logtrics AI',
    jobTitle: 'CTO & Co-Founder',
    knowsAbout: [
      'Estrategia tecnológica',
      'Arquitectura de software',
      'SaaS B2B',
      'Integraciones empresariales',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'AWS',
      'Arquitecturas serverless',
      'Seguridad web',
      'Pentesting',
      'Accesibilidad web',
    ],
  },

  ui: {
    skipToContent: 'Saltar al contenido',
    primaryNav: 'Navegación principal',
    themeMenu: 'Cambiar tema',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    themeSystem: 'Sistema',
    languageMenu: 'Cambiar idioma',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    viewProject: 'Ver proyecto',
    code: 'Código',
    demo: 'Ver demo',
    projectsPrev: 'Proyectos anteriores',
    projectsNext: 'Proyectos siguientes',
    projectsGoToPage: 'Ir a la página {n} de proyectos',
    backToTop: 'Volver arriba',
    footerNote: 'Hecho con Astro, cuidando cada milisegundo.',
    notFoundTitle: 'Página no encontrada',
    notFoundBody: 'La ruta que buscas no existe o se movió.',
    notFoundCta: 'Volver al inicio',
  },
};

import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown, ArrowRight, ArrowUp, Check, ChevronDown, Clock, Cloud, Download, ExternalLink,
  Github, Linkedin, Mail, MapPin, Menu, Moon, Phone, RefreshCw, Send, Sun, Terminal, X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Experience = { role: string; company: string; description: string; bullets: string[]; period: string };
type Project = { name: string; description: string; href?: string; tags: string[]; highlights: string[]; image: string; tone: string };

const experiences: Experience[] = [
  { role: 'Senior Software Developer', company: 'Solaris Pty Ltd', period: 'March 2022 — Present', description: 'Working with a small team of senior software developers to implement new features for Solarplus, a solar CRM system.', bullets: ['Deep dive implementation of Mapbox API integration', 'Worked on production environment using Google Cloud Platform', 'Significantly improved performance for several VueJS pages and components'] },
  { role: 'Lead Developer', company: 'CoBabble UK Ltd.', period: 'April 2019 — March 2022', description: 'Involved in planning, developing, and maintaining the CoBabble web application and REST APIs for iOS and Android apps.', bullets: ['Switched production environment to serverless architecture using Laravel Lambda', 'Implemented AWS production environment using EC2, SES, S3, and RDS', 'Developed and maintained web application and REST APIs for mobile applications', 'Set up CI/CD with Github Actions and AWS CodeDeploy'] },
  { role: 'Backend Engineer (PHP)', company: 'Cody Web Development Inc.', period: 'Earlier experience', description: 'Developed APIs for frontend engineers and iOS/Android developers using Laravel framework.', bullets: ['Set up production environment using AWS EC2, Load Balancers, S3, RDS, SES, and Route53', 'Improved test-driven development practices', 'Enhanced CI/CD processes', 'Developed web scraping script using Python', 'Created business card scanning service using Google Vision and Natural Language APIs'] },
  { role: 'Web Developer', company: 'StewArt Media', period: 'Earlier experience', description: 'Implemented website changes for various clients to improve SEO across multiple platforms.', bullets: ['Worked with WordPress, Joomla, OpenCart, Magento, and BigCommerce', 'Improved SEO performance for client websites', 'Handled multiple client projects simultaneously'] },
  { role: 'Web Developer', company: 'Internetly Ventures Inc.', period: 'Earlier experience', description: 'Lead backend developer using Laravel Framework for web application development.', bullets: ['Rewrote existing Laravel 4.x application to latest Laravel version', 'Developed complete Invoice module using KnockoutJS framework', 'Migrated web application from shared hosting to cloud server'] },
  { role: 'Web Developer', company: 'M-S-S ASIA LTD.', period: 'Earlier experience', description: 'Developed bespoke web applications using Laravel Framework for various industries.', bullets: ['Created data synchronization module between MSSQL and MySQL databases', 'Developed email parsing system for automated processing', 'Worked with law firms, hotels/resorts, and construction companies'] },
];

const projects: Project[] = [
  { name: 'Solarplus', description: 'A versatile solar design software that caters to a wide range of users, from small residential installers to commercial engineers and large retail teams. It offers powerful tools for sales, energy and financial modeling, customer management, and proposal generation.', href: 'https://solarplus.co', tags: ['Yii', 'NuxtJS', 'GraphQL', 'MySQL', 'VueJS'], highlights: ['Commercial & Residential Users', 'Solar Design & Modeling', 'Unlimited Business Growth'], image: '/projects/solarplus.webp', tone: 'project-blue' },
  { name: 'CoBabble', description: 'A simple but powerful knowledge transfer platform for businesses and individuals. Features real-time content delivery, video centric contents, analytics, and a user-friendly mobile app.', href: 'https://cobabble.com', tags: ['Laravel', 'VueJS', 'MySQL', 'React Native', 'AWS'], highlights: ['Business & Individual Users', 'Real-time Content Delivery', 'Knowledge Transfer Platform'], image: '/projects/cobabble.webp', tone: 'project-lilac' },
  { name: 'JOYO Delivery Tracker', description: 'An internal web application used by Sales, Branch, and RMA Coordinators to monitor and track statuses of Deliveries, RMAs, and Shipments of products.', href: 'https://joyo.ph', tags: ['PHP', 'MySQL', 'Operations'], highlights: ['Delivery Status Monitoring', 'RMA & Shipment Tracking', 'Operations Visibility'], image: '/projects/joyo.webp', tone: 'project-mint' },
  { name: 'Meishideseikyu', description: 'An app developed to merge contacts from different sources (Google, iPhone, and other apps). This also enables customers to send invoices within a few clicks to clients in Japan in the Japanese template. Other features including job search and job related media are also available within the app.', tags: ['Laravel', 'Japanese Business Users', 'Invoicing'], highlights: ['Contact Management', 'Japanese Invoice Templates', 'Job Search & Media'], image: '/projects/meishideseikyu.webp', tone: 'project-sand' },
];

const serviceDetails = [
  {
    id: 'legacy-laravel',
    icon: RefreshCw,
    title: 'Legacy Laravel Upgrade',
    summary: 'Modernize Laravel 4.x-8.x applications to latest version with zero downtime.',
    tone: 'orange',
    included: ['Full codebase audit and documentation', 'PHP version upgrade (7.x to 8.x)', 'Laravel framework migration', 'Database optimization', 'Automated test suite implementation', 'CI/CD pipeline setup'],
    price: '$500',
    timeline: '1-8 weeks',
    ideal: 'Businesses with aging Laravel apps needing security updates',
    action: 'Get Your Free Codebase Audit',
    note: 'Comprehensive audit of your Laravel application',
  },
  {
    id: 'aws-infrastructure',
    icon: Cloud,
    title: 'AWS Infrastructure Optimization',
    summary: 'Optimize AWS setup for performance, reliability, and cost efficiency.',
    tone: 'cyan',
    included: ['AWS architecture review', 'Cost optimization analysis', 'Auto-scaling configuration', 'Security hardening', 'Monitoring and alerting setup', 'Disaster recovery planning'],
    price: '$1,000',
    timeline: '2-6 weeks',
    ideal: 'Companies looking to reduce AWS costs or improve performance',
    action: 'Request Cost Analysis',
    note: 'Get a breakdown of potential AWS savings',
  },
  {
    id: 'api-development',
    icon: Terminal,
    title: 'API Development',
    summary: 'Build robust, scalable REST APIs with comprehensive documentation.',
    tone: 'magenta',
    included: ['RESTful API design', 'Authentication & authorization', 'Rate limiting and security', 'API documentation (OpenAPI/Swagger)', 'Integration testing', 'Performance optimization'],
    price: '$1,500',
    timeline: '3-8 weeks',
    ideal: 'Businesses needing system integrations or mobile backends',
    action: 'Discuss Your API Requirements',
    note: 'Schedule a technical consultation',
  },
];

const skillGroups = [
  { title: 'Programming', values: ['PHP', 'JavaScript', 'HTML', 'CSS', 'Python'], levels: [95, 90, 95, 90, 75] },
  { title: 'Framework', values: ['Laravel', 'VueJS', 'NuxtJS', 'CodeIgniter', 'Yii', 'AngularJS', 'jQuery', 'Bootstrap', 'TailwindCSS'], levels: [95, 90, 85, 85, 80, 75, 90, 90, 85] },
  { title: 'Database', values: ['MySQL', 'GraphQL', 'MS SQL'], levels: [95, 80, 75] },
  { title: 'DevOps', values: ['AWS', 'Google Cloud', 'Docker', 'CI/CD', 'Github Actions', 'Laravel Vapor'], levels: [85, 80, 80, 85, 85, 75] },
];

const faqs = [
  ['How much does it cost to hire a Laravel developer?', 'My Laravel development services start at $500 for smaller projects like API integrations or bug fixes. Legacy Laravel upgrades typically range from $500-$5,000 depending on the application complexity, while full API development projects start at $1,500. I provide detailed quotes after understanding your specific requirements during a free consultation.'],
  ['Can you work remotely with my team?', "Absolutely. I've worked remotely with teams across the globe for over 14 years, including clients in the US, Europe, Japan, and Australia. I'm based in Cebu, Philippines (UTC+8), which provides good overlap with both US and European business hours. I use tools like Slack, GitHub, and video calls to maintain clear communication."],
  ['What is your process for upgrading legacy Laravel applications?', 'I follow a proven 4-phase approach: First, I conduct a comprehensive codebase audit to document the current state and identify risks. Second, I create a detailed migration plan with clear milestones. Third, I perform the upgrade incrementally with thorough testing at each step. Finally, I implement automated testing and CI/CD to prevent future technical debt. This approach has successfully upgraded applications from Laravel 4.x through to the latest versions.'],
  ['How quickly can you start on a new project?', 'I typically have availability within 1-2 weeks for new projects. For urgent bug fixes or critical issues, I can often accommodate faster timelines. I maintain limited project slots to ensure each client receives dedicated attention and high-quality work.'],
  ['Do you provide ongoing maintenance and support?', 'Yes, I offer flexible maintenance packages that include security updates, bug fixes, performance monitoring, and minor enhancements. For larger ongoing needs, I provide retainer arrangements with priority support and guaranteed availability. Many clients continue working with me for years after the initial project.'],
];

function scrollToId(id: string, setMenu?: (open: boolean) => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  setMenu?.(false);
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showTop, setShowTop] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(() => localStorage.getItem('cookies-accepted') !== 'true');
  const [sent, setSent] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [selectedNav, setSelectedNav] = useState('hero');
  const [focusedNav, setFocusedNav] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    setMessageLength(0);
    event.currentTarget.reset();
  };
  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
    event.currentTarget.reset();
  };
  const openServices = (setMenu?: (open: boolean) => void) => {
    setServicesOpen(true);
    setSelectedNav('services');
    setMenu?.(false);
    window.setTimeout(() => scrollToId('services'), 0);
  };
  const selectNav = (id: string, setMenu?: (open: boolean) => void) => {
    if (id === 'services') {
      openServices(setMenu);
      return;
    }
    setSelectedNav(id);
    scrollToId(id, setMenu);
  };
  const navItems = [['Home', 'hero'], ['About', 'about'], ['Experience', 'experience'], ['Projects', 'projects'], ['Skills', 'skills'], ['Services', 'services'], ['Testimonials', 'testimonials'], ['Blog', 'faq'], ['Contact', 'contact']];

  return (
    <div className="min-h-[100dvh] overflow-x-hidden">
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground" data-testid="link-skip-content">Skip to main content</a>
      <div className="fixed left-0 right-0 top-0 z-[60] h-1 bg-white/20"><div className="h-full w-1/3 bg-accent" /></div>
      <header className="fixed left-0 right-0 top-0 z-50 bg-transparent text-white">
        <div className="section-shell flex h-12 items-center justify-between">
          <button onClick={() => scrollToId('hero')} className="text-sm font-semibold tracking-[-.04em]" data-testid="button-brand">RP</button>
          <nav className="hidden items-center gap-0 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => selectNav(id)} onFocus={() => setFocusedNav(id)} onBlur={() => setFocusedNav(null)} className={`nav-option rounded-md px-3.5 py-2 text-[11px] font-medium text-white/85 ${selectedNav === id && focusedNav === id ? 'nav-option-selected-focused' : ''}`} data-testid={`button-nav-${id}`}>{label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setDark((value) => !value)} aria-label="Toggle color theme" className="rounded-md bg-white/15 p-2 text-white/80 transition hover:bg-white/25 hover:text-white" data-testid="button-theme-toggle">{dark ? <Sun size={15} /> : <Moon size={15} />}</button>
            <button onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle mobile menu" aria-expanded={menuOpen} className="rounded-lg p-2 text-white transition hover:bg-white/10 lg:hidden" data-testid="button-mobile-menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </div>
        {menuOpen && <nav className="border-t border-white/10 bg-[#3e4fa4]/95 px-4 py-3 lg:hidden" aria-label="Mobile navigation">
          {navItems.map(([label, id]) => <button key={id} onClick={() => selectNav(id, setMenuOpen)} onFocus={() => setFocusedNav(id)} onBlur={() => setFocusedNav(null)} className={`nav-option block w-full rounded-md px-3 py-3 text-left text-sm text-white/90 ${selectedNav === id && focusedNav === id ? 'nav-option-selected-focused' : ''}`} data-testid={`button-mobile-nav-${id}`}>{label}</button>)}
        </nav>}
      </header>

      <main>
        <section id="hero" className="hero-gradient relative flex min-h-[31rem] items-center overflow-hidden pt-12 text-white">
          <div className="section-shell relative z-10 flex w-full justify-center py-10 text-center">
            <div className="reveal flex max-w-4xl flex-col items-center">
              <div className="eyebrow mb-3 text-white/70">Senior Web Developer</div>
              <h1 className="whitespace-nowrap text-[2.45rem] font-semibold leading-none tracking-[-.045em] sm:text-[3.1rem] lg:text-[3.2rem]">Richard Joseph Porter</h1>
              <p className="mt-2 text-[1.35rem] font-semibold text-white/90 sm:text-[1.5rem]">Senior Laravel &amp; AWS Developer</p>
              <p className="mt-4 text-sm font-semibold text-white/90 sm:text-base">Laravel &amp; PHP Specialist <span className="mx-1.5 text-white/75">|</span> AWS Infrastructure Expert <span className="mx-1.5 text-white/75">|</span> 14+ Years Experience</p>
              <p className="mt-3 max-w-xl text-[12px] leading-5 text-white/70 sm:text-sm">Specializing in PHP, Laravel, VueJS, and AWS. I help businesses modernize<br className="hidden sm:block" /> legacy systems and build robust, maintainable solutions.</p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-[10px] text-white/65"><span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-[#12d68a]" />Available for new projects</span><span className="flex items-center gap-1.5"><Clock size={11} className="text-white/70" />Usually responds within 24h</span></div>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                <button onClick={() => scrollToId('projects')} className="inline-flex items-center gap-2 rounded-md bg-[#111827] px-5 py-2.5 text-[11px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1d293d] hover:shadow-xl" data-testid="button-view-work">View My Work <ArrowRight size={14} /></button>
                <button onClick={() => scrollToId('contact')} className="inline-flex items-center gap-2 rounded-md border border-white/80 px-5 py-2.5 text-[11px] font-semibold text-white transition hover:bg-white/10" data-testid="button-hero-contact"><Mail size={13} /> Get In Touch</button>
                <button onClick={() => scrollToId('contact')} className="inline-flex items-center gap-2 rounded-md bg-[#0db777] px-5 py-2.5 text-[11px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0aa56b]" data-testid="button-checklist"><Download size={13} /> Free Laravel Checklist</button>
              </div>
              <div className="mt-10 flex gap-3">
                <a href="https://github.com/rjosephporter" target="_blank" rel="noreferrer" className="rounded-full bg-white/15 p-2.5 text-white/90 transition hover:bg-white/25 hover:text-white" aria-label="GitHub" data-testid="link-github"><Github size={17} /></a>
                <a href="https://www.linkedin.com/in/richard-joseph-porter" target="_blank" rel="noreferrer" className="rounded-full bg-white/15 p-2.5 text-white/90 transition hover:bg-white/25 hover:text-white" aria-label="LinkedIn" data-testid="link-linkedin"><Linkedin size={17} /></a>
                <a href="https://x.com/rjosephporter" target="_blank" rel="noreferrer" className="rounded-full bg-white/15 p-2.5 text-white/90 transition hover:bg-white/25 hover:text-white" aria-label="X (Twitter)" data-testid="link-twitter"><X size={17} /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about-reference">
          <div className="about-reference-shell">
            <h2 className="about-reference-title">About Me</h2>
            <div className="about-reference-grid">
              <div className="about-reference-portrait-wrap">
                <img
                  src="/reference/richard-joseph-porter.webp"
                  alt="Richard Joseph Porter in a dark suit"
                  className="about-reference-portrait"
                  data-testid="img-about-portrait"
                />
              </div>
              <div className="about-reference-copy">
                <h3>14+ Years of Web Development Excellence</h3>
                <p>
                  I'm a driven professional based in Cebu, Philippines with a broad technical skill set and 14+ years of experience in web development. My journey began with a Bachelor of Science in Information Technology from University of Cebu and has evolved through hands-on experience building scalable solutions for companies worldwide.
                </p>
                <p>
                  I specialize in PHP, Laravel, VueJS, and modern web technologies. Known for my ability to multitask and work on multiple pressing projects simultaneously, I thrive in environments that constantly embrace new technologies. I have strong communication skills and excel at interpreting and implementing client and staff visions for new projects.
                </p>
                <div className="about-reference-pills" aria-label="Areas of expertise">
                  <span className="pill-blue">Serverless Architecture</span>
                  <span className="pill-green">API Development</span>
                  <span className="pill-pink">Test Driven Development</span>
                  <span className="pill-amber">CI/CD</span>
                  <span className="pill-peach">Cloud Architecture</span>
                  <span className="pill-lilac">Database Design</span>
                </div>
                <div className="about-reference-stats">
                  <div className="about-reference-stat">
                    <strong className="stat-blue">50+</strong>
                    <span>Projects Delivered</span>
                  </div>
                  <div className="about-reference-stat">
                    <strong className="stat-green">14+</strong>
                    <span>Years Experience</span>
                  </div>
                  <div className="about-reference-stat">
                    <strong className="stat-purple">100K+</strong>
                    <span>Users Served</span>
                  </div>
                  <div className="about-reference-stat">
                    <strong className="stat-orange">5.0</strong>
                    <span>Client Rating</span>
                  </div>
                </div>
                <a href="/Richard-Joseph-Porter-Resume-10-2025.pdf" className="about-reference-resume" data-testid="link-download-resume">
                  Download Resume
                  <Download size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-reference">
          <div className="experience-reference-shell">
            <h2>Work Experience</h2>
            <div className="experience-reference-timeline">
              {experiences.map((item, index) => (
                <article key={item.company} className="experience-reference-item">
                  <span className={`experience-reference-marker ${index === 0 ? 'is-current' : ''}`} />
                  <div className="experience-reference-card">
                    <div className="experience-reference-card-header">
                      <div>
                        <h3>{item.role}</h3>
                        <h4>{item.company}</h4>
                      </div>
                      <span className={`experience-reference-period ${index === 0 ? 'is-current' : ''}`}>{item.period}</span>
                    </div>
                    <p>{item.description}</p>
                    <h5>Key Accomplishments:</h5>
                    <ul>
                      {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="projects-reference">
          <div className="projects-reference-shell">
            <h2>Featured Projects</h2>
            <div className="projects-reference-grid">
              {projects.map((project, index) => (
                <article key={project.name} className="projects-reference-card" data-testid={`card-project-${index}`}>
                  <div className="projects-reference-image">
                    <img src={project.image} alt={`${project.name} project preview`} />
                  </div>
                  <div className="projects-reference-body">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="projects-reference-highlights">
                      {project.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
                    </div>
                    <div className="projects-reference-tags">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    {project.href && <a href={project.href} target="_blank" rel="noreferrer" className="projects-reference-link" data-testid={`link-project-${index}`}>Visit Site <ExternalLink size={12} /></a>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="skills-reference">
          <div className="skills-reference-shell">
            <h2>Technical Skills</h2>
            <div className="skills-reference-grid">
              {skillGroups.map((group) => (
                <div key={group.title} className="skills-reference-card">
                  <h3>{group.title}</h3>
                  <div className="skills-reference-list">
                    {group.values.map((skill, i) => (
                      <div key={skill} className={`skills-reference-item ${skill === 'Laravel' ? 'is-featured' : ''}`}>
                        <div className="skills-reference-label"><span>{skill}</span><span>{group.levels[i]}%</span></div>
                        <div className="skills-reference-track"><div className="skills-reference-fill" style={{ width: `${group.levels[i]}%` }} /></div>
                        {skill === 'Laravel' && <div className="skills-reference-tooltip"><strong>Experience: 4+ years</strong><span>Used in:<br />Solarplus Frontend,<br />SSR Applications</span></div>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="skills-reference-focus">
              <h3>Recent Technology Focus</h3>
              <div className="skills-reference-focus-grid">
                <div><h4>Specializations</h4><ul><li>Serverless Architecture</li><li>API Development</li><li>Test Driven Development</li><li>Database Design</li></ul></div>
                <div><h4>Cloud &amp; DevOps</h4><ul><li>AWS (EC2, S3, RDS, SES)</li><li>Google Cloud Platform</li><li>Continuous Integration</li><li>Continuous Delivery</li></ul></div>
                <div><h4>Additional Skills</h4><ul><li>SEO Optimization</li><li>Client Relations</li><li>UI/UX Design</li><li>Documentation</li></ul></div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials-reference">
          <div className="testimonials-reference-shell">
            <h2>Testimonials</h2>
            <div className="testimonials-reference-grid">
              <article className="testimonials-reference-card">
                <p className="testimonials-reference-quote">“I had the pleasure of working with Richard on a complex e-commerce platform rebuild. Richard consistently impressed me with his ability to balance technical excellence with strategic thinking. He didn't just execute tasks - he actively participated in planning sessions and proposed innovative solutions that often exceeded our expectations. His code quality was outstanding, but what really set him apart was his collaborative approach and mentoring of junior developers. When we encountered unexpected challenges with third-party integrations, Richard's problem-solving skills kept the project on track. He's the kind of developer who makes everyone around him better, and I wouldn't hesitate to work with him again.”</p>
                <div className="testimonials-reference-author"><strong>Wayne Denner</strong><span>Co-Founder, CoBabble</span></div>
              </article>
              <article className="testimonials-reference-card">
                <p className="testimonials-reference-quote">“Richard is everything you need in a senior web developer. He's super skilled at development work but he also thinks about what he's doing. Rather than just develop, he thinks about the process, the overall purpose and comes to the table with suggestions and often a better way of achieving the desired outcome. Excellent communicator, hard worker and a real asset to our team. I highly recommend Richard and would be happy to endorse him in any way required.”</p>
                <div className="testimonials-reference-author"><strong>Barry Lee Cummings</strong><span>Strategic Advisor, CoBabble</span></div>
              </article>
              <article className="testimonials-reference-card">
                <p className="testimonials-reference-quote">“I worked with Richard for approximately a year on a mobile app application for a startup in Japan. During my time working with him, he was a very skilled back-end engineer that helped the team develop the app. Not only he possess excellent technical skills, he was also a team member with great communication skills that eases the developing process. There were many times where the specifications given were incorrect but Richard managed to understand the instructions and gave better solutions which was well praised by the client. I enjoyed working with Richard and would recommend him to anyone that is looking for a trustable employee. Hopefully one day I can work with Richard once again.”</p>
                <div className="testimonials-reference-author"><strong>Ian Soo</strong><span>CTO, Time Machine Co., Ltd.</span></div>
              </article>
            </div>
          </div>
        </section>

        {servicesOpen && <section id="services" className="services-reference services-reference-enter">
          <div className="services-reference-hero">
            <div className="services-reference-shell">
              <div className="services-reference-kicker">LARAVEL &amp; AWS SPECIALIST</div>
              <h2>Modernize Your Legacy Code</h2>
              <h3>14+ Years of Experience at Your Service</h3>
              <p>I help businesses modernize their applications, optimize their infrastructure, and build<br className="hidden sm:block" /> robust APIs that scale. Let&apos;s transform your project together.</p>
              <div className="services-reference-badges">
                <span><ArrowDown size={10} /> Remote Worldwide</span>
                <span><MapPin size={10} /> Based in Cebu, Philippines</span>
                <span className="available"><i /> 2 slots available for September 2026</span>
              </div>
              <div className="services-reference-actions">
                <button onClick={() => scrollToId('contact')}>Schedule a Free Strategy Call <ArrowRight size={13} /></button>
                <button onClick={() => scrollToId('projects')}>View Case Studies</button>
              </div>
            </div>
          </div>
          <div className="services-reference-stats">
            <div><strong>50+</strong><span>Projects Delivered</span></div>
            <div><strong>14</strong><span>Years Experience</span></div>
            <div><strong>98%</strong><span>Client Satisfaction</span></div>
            <div><strong>2010</strong><span>Remote-First Since</span></div>
          </div>
          <div className="services-reference-cards services-reference-shell">
            {serviceDetails.map(({ id, icon: Icon, title, summary, tone, included, price, timeline, ideal, action, note }) => (
              <article id={id} key={id} className={`service-detail-card ${tone}`}>
                <div className="service-detail-header">
                  <span className="service-detail-icon"><Icon size={17} /></span>
                  <h3>{title}</h3>
                  <p>{summary}</p>
                </div>
                <div className="service-detail-body">
                  <span className="service-detail-label">WHAT&apos;S INCLUDED</span>
                  <ul>{included.map((item) => <li key={item}><Check size={12} />{item}</li>)}</ul>
                  <div className="service-detail-meta"><div><span>Starting at</span><strong>{price}</strong></div><div><span>Timeline</span><strong>{timeline}</strong></div></div>
                  <p className="service-detail-ideal"><strong>Ideal for:</strong> {ideal}</p>
                  <button onClick={() => scrollToId('contact')}>{action}</button>
                  <small><Check size={10} />No contracts&nbsp;&nbsp; <Check size={10} />30-day support</small>
                  <em>{note}</em>
                </div>
              </article>
            ))}
          </div>
        </section>}


        <section id="faq" className="faq-reference">
          <div className="faq-reference-shell">
            <h2>Frequently Asked Questions</h2>
            <p className="faq-reference-subtitle">Common questions about working with me on your Laravel and PHP projects</p>
            <div className="faq-reference-list">
              {faqs.map(([question, answer], index) => (
                <div key={question} className={`faq-reference-item ${activeFaq === index ? 'is-open' : ''}`}>
                  <button onClick={() => setActiveFaq(activeFaq === index ? null : index)} aria-expanded={activeFaq === index} data-testid={`button-faq-${index}`}>
                    <span>{question}</span>
                    <ChevronDown size={15} />
                  </button>
                  {activeFaq === index && <p data-testid={`text-faq-answer-${index}`}>{answer}</p>}
                </div>
              ))}
            </div>
            <div className="faq-reference-contact">
              <p>Have a different question?</p>
              <button onClick={() => scrollToId('contact')} data-testid="button-faq-contact">Get in Touch <ArrowRight size={14} /></button>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-reference">
          <div className="contact-reference-shell">
            <h2>Get In Touch</h2>
            <div className="contact-reference-grid">
              <div className="contact-reference-info">
                <h3>Let's Build Something Together</h3>
                <p className="contact-reference-intro">I'm always interested in new opportunities, challenging projects, and collaborating with talented people. Whether you have a project in mind or just want to connect, I'd love to hear from you.</p>
                <div className="contact-reference-details">
                  <a href="mailto:me@richardporter.dev" data-testid="link-email"><span className="contact-reference-icon email"><Mail size={15} /></span><span><strong>Email</strong><small>me@richardporter.dev</small></span></a>
                  <div><span className="contact-reference-icon location"><MapPin size={15} /></span><span><strong>Location</strong><small>Cebu City, Philippines (Open to remote)</small></span></div>
                  <div><span className="contact-reference-icon response"><Clock size={15} /></span><span><strong>Response Time</strong><small>Usually within 24 hours</small></span></div>
                </div>
                <div className="contact-reference-divider" />
                <h4>Connect with me</h4>
                <div className="contact-reference-socials">
                  <a href="mailto:me@richardporter.dev" aria-label="Email" data-testid="link-contact-email"><Mail size={14} /></a>
                  <a href="tel:+639958672040" aria-label="Phone" data-testid="link-contact-phone"><Phone size={14} /></a>
                  <a href="https://www.linkedin.com/in/richard-joseph-porter" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-testid="link-contact-linkedin"><Linkedin size={14} /></a>
                </div>
              </div>
              <form onSubmit={submitContact} className="contact-reference-form" data-testid="form-contact">
                <div className="contact-reference-progress-label"><span>Form Progress</span><span>0%</span></div>
                <div className="contact-reference-progress"><span /></div>
                <div className="contact-reference-fields">
                  <label>Name<input required name="name" placeholder="Your full name" data-testid="input-contact-name" /></label>
                  <label>Email<input required type="email" name="email" placeholder="your.email@example.com" data-testid="input-contact-email" /></label>
                </div>
                <label>Project Type<select required name="projectType" defaultValue="" data-testid="input-contact-project-type"><option value="" disabled>Select a project type</option><option>Laravel upgrade</option><option>API development</option><option>AWS infrastructure</option><option>Other</option></select></label>
                <label>Message ({messageLength}/500)<textarea required name="message" rows={4} maxLength={500} onChange={(event) => setMessageLength(event.target.value.length)} placeholder="Tell me about your project, timeline, budget, and any specific requirements..." data-testid="input-contact-message" /></label>
                <button type="submit" data-testid="button-submit-contact"><Send size={13} /> Send Message <span>△</span></button>
                {sent && <p className="contact-reference-success" role="status" data-testid="status-contact-sent"><Check size={14} />Thanks — your note is ready for a reply.</p>}
              </form>
            </div>
            <div className="contact-reference-newsletter">
              <h3>Stay Updated</h3>
              <p>Get practical Laravel tips and web development insights delivered to your inbox.</p>
              <form onSubmit={submitNewsletter} data-testid="form-newsletter">
                <input type="email" required aria-label="Email address for newsletter" placeholder="Enter your email" data-testid="input-newsletter-email" />
                <button type="submit" data-testid="button-subscribe">Subscribe</button>
              </form>
              {subscribed && <p className="contact-reference-newsletter-success" role="status" data-testid="status-newsletter"><Check size={14} />You are on the list.</p>}
              <small>Get the free Laravel Performance Checklist + occasional dev tips. No spam.</small>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-reference">
        <div className="footer-reference-main">
          <div className="footer-reference-shell">
            <div className="footer-reference-grid">
              <div>
                <h3>Richard Joseph Porter</h3>
                <p>Senior web developer with 14+ years of experience specializing in PHP, Laravel, VueJS, and AWS. Based in Cebu, Philippines, working with clients worldwide.</p>
                <small><MapPin size={10} /> Cebu City, Philippines</small>
              </div>
              <div>
                <h3>Services</h3>
                <div className="footer-reference-links"><button onClick={() => openServices()}>Legacy Laravel Upgrade</button><button onClick={() => openServices()}>AWS Infrastructure</button><button onClick={() => openServices()}>API Development</button></div>
              </div>
              <div>
                <h3>Quick Links</h3>
                <div className="footer-reference-links"><button onClick={() => scrollToId('faq')} data-testid="button-footer-blog">Blog</button><button onClick={() => scrollToId('services')}>Services</button><button onClick={() => scrollToId('projects')} data-testid="button-footer-projects">Projects</button><button onClick={() => scrollToId('contact')} data-testid="button-footer-contact">Contact</button></div>
              </div>
              <div>
                <h3>Resources</h3>
                <div className="footer-reference-links"><button onClick={() => openServices()}>Laravel Development Guide</button><button onClick={() => openServices()}>AWS Optimization Guide</button><button onClick={() => openServices()}>Laravel Developer Philippines</button><button onClick={() => openServices()}>PHP Developer Cebu</button></div>
              </div>
              <div>
                <h3>Connect</h3>
                <div className="footer-reference-socials"><a href="https://github.com/rjosephporter" target="_blank" rel="noreferrer" aria-label="GitHub" data-testid="link-footer-github"><Github size={12} /></a><a href="https://www.linkedin.com/in/richard-joseph-porter" target="_blank" rel="noreferrer" aria-label="LinkedIn" data-testid="link-footer-linkedin"><Linkedin size={12} /></a><a href="mailto:me@richardporter.dev" aria-label="Email"><Mail size={12} /></a></div>
                <button onClick={() => scrollToId('contact')} className="footer-reference-contact-button">Get in Touch <ArrowRight size={11} /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-reference-bottom"><div className="footer-reference-shell"><p>© 2026 Richard Joseph Porter. All rights reserved.</p><p>Built with Next.js, TypeScript, and Tailwind CSS.</p></div></div>
      </footer>

      {showTop && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-40 rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition hover:-translate-y-1" aria-label="Back to top" data-testid="button-back-to-top"><ArrowUp size={18} /></button>}
      {cookieVisible && <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#131a2d]/95 px-5 py-4 text-white shadow-2xl backdrop-blur-md"><div className="section-shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-white/65">We use cookies to analyze site usage and improve your experience.</p><div className="flex gap-2"><button onClick={() => { localStorage.setItem('cookies-accepted', 'true'); setCookieVisible(false); }} className="rounded-md bg-primary px-4 py-2 text-xs font-semibold" data-testid="button-cookie-accept">Accept</button><button onClick={() => setCookieVisible(false)} className="rounded-md bg-white/10 px-4 py-2 text-xs font-semibold text-white/75 hover:bg-white/15" data-testid="button-cookie-decline">Decline</button></div></div></div>}
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}
function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}
function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}
export default App;
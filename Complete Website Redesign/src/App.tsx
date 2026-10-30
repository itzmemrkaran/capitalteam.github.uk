import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react'

type Project = {
  slug: string
  title: string
  category: 'Reclamation' | 'Coastal Development' | 'Harbour' | 'Community'
  image: string
  summary: string
  client?: string
  period?: string
  location?: string
}

const wp = 'https://capitalteam.co.uk/wp-content/uploads'

const projects: Project[] = [
  {
    slug: 'dredging-reclamation-and-shore-protection-of-fushidhiggaru-falhu',
    title: 'Fushidhiggaru Falhu — Site J',
    category: 'Reclamation',
    image: `${wp}/2024/09/SITE-J-1.jpg`,
    summary: 'Dredging, reclamation and shore protection works at Fushidhiggaru Falhu.',
    client: 'Housing Development Corporation Limited',
    period: '24 June 2024',
    location: 'Republic of Maldives',
  },
  {
    slug: 'dredging-reclamation-and-shore-protection-of-giraavaru-lagoon',
    title: 'Giraavaru Lagoon',
    category: 'Reclamation',
    image: `${wp}/2024/09/DREDGING-RECLAMATION-1.jpg`,
    summary: 'Dredging, reclamation and shore protection of Giraavaru Lagoon.',
    client: 'Maldives Fund Management Corporation',
    period: '27 May 2023 — 10 May 2024',
    location: 'Republic of Maldives',
  },
  {
    slug: 'dredging-reclamation-and-shore-protection-of-hulhumale-phase-iii',
    title: 'Hulhumalé Phase III',
    category: 'Reclamation',
    image: `${wp}/2024/09/Dredging-1.jpg`,
    summary: 'Dredging and reclamation works for the balance area at Hulhumalé Phase III.',
    client: 'MIID',
    period: 'November 2025 — January 2026',
    location: 'Hulhumalé, Maldives',
  },
  {
    slug: 'dredging-reclamation-and-shore-protection-of-thilafushi-area-c-thilafushi-area-d',
    title: 'Thilafushi Phase 2 — Area C',
    category: 'Reclamation',
    image: `${wp}/2024/09/DREDGING-1-1.jpg`,
    summary: 'Dredging and reclamation of Thilafushi Phase 2, Area C.',
    client: 'Housing Development Corporation Limited',
    period: '4 April 2023 — 17 May 2023',
    location: 'Republic of Maldives',
  },
  {
    slug: 'dredging-reclamation-and-shore-protection-of-thilafushi-area-d',
    title: 'Thilafushi — Area D',
    category: 'Reclamation',
    image: `${wp}/2024/09/DREDGING-14.jpg`,
    summary: 'Dredging and reclamation of 9.6 hectares at Thilafushi Area D.',
    client: 'Housing Development Corporation Limited',
    period: '20 April 2023 — 27 May 2023',
    location: 'Republic of Maldives',
  },
  {
    slug: 'subcontract-for-bund-construction-and-revetment-work-at-k-gulhifalhu',
    title: 'K. Gulhifalhu Bund & Revetment',
    category: 'Coastal Development',
    image: `${wp}/2024/09/BUND-CONSTRUCTION-1.jpg`,
    summary: 'Subcontract for bund construction and revetment work at K. Gulhifalhu.',
    client: 'Boskalis Westminster Contracting Ltd',
    location: 'Republic of Maldives',
  },
  {
    slug: 'gulhi-falhu-phase-1',
    title: 'Global Green City Phase 1',
    category: 'Reclamation',
    image: `${wp}/2021/09/Gulhi-Falhu-Phase-2-01.jpg`,
    summary: 'Phase 1 reclamation using the Queen of the Netherlands dredger, completed in three days.',
    client: 'Global Projects Development Company Private Limited',
    location: 'Gulhi Falhu, Maldives',
  },
  {
    slug: 'gulhi-falhu-phase-2',
    title: 'Gulhi Falhu Phase 2',
    category: 'Reclamation',
    image: `${wp}/2021/09/Gulhi-Falhu-Phase-2-02.jpg`,
    summary: 'Phase 2 reclamation completed in seven days using a trailer suction dredger.',
    client: 'Global Projects Development Company Private Limited',
    location: 'Gulhi Falhu, Maldives',
  },
  {
    slug: 'phase-1-coastal-protection-project',
    title: 'Malé International Port Protection',
    category: 'Coastal Development',
    image: `${wp}/2021/09/International-Port-01.jpg`,
    summary: 'Four kilometres of shore protection for the reclaimed international port area.',
    client: 'Boskalis Westminster Contracting Limited of Cyprus',
    location: 'Republic of Maldives',
  },
  {
    slug: 'k-gulhi-falhu-costal',
    title: 'K. Gulhifalhu Revetment Works',
    category: 'Coastal Development',
    image: `${wp}/2021/09/K.Gulhi-Falhu-01.jpg`,
    summary: 'A 2.4 km eco-friendly geotextile revetment protecting Phase 1 and part of Phase 2.',
    client: 'Boskalis Westminster Contracting Limited',
    period: '11 August 2020 — 14 March 2021',
    location: 'Republic of Maldives',
  },
  {
    slug: 'sh-bilefahi-coastal',
    title: 'Sh. Bilefahi Coastal Protection',
    category: 'Coastal Development',
    image: `${wp}/2021/08/SH.Bilefahi-Coastal-01-scaled.jpg`,
    summary: 'Design and build of coastal protection structures at Bilehfahi Island.',
    client: 'Ministry of Environment and Energy',
    period: '11 August 2015 — 10 December 2016',
    location: 'Republic of Maldives',
  },
  {
    slug: 'b-thulhadhoo-coastal',
    title: 'B. Thulhadhoo Coastal Protection',
    category: 'Coastal Development',
    image: `${wp}/2021/08/Thulhadhoo-1-.jpg`,
    summary: 'Design and build of coastal protection structures at Thulhadhoo.',
    client: 'Ministry of Environment and Energy',
    period: '11 August 2015 — 25 November 2016',
    location: 'Republic of Maldives',
  },
  {
    slug: 'hdh-kuludhuffushi-costal',
    title: 'HDh. Kulhudhufushi Coastal Protection',
    category: 'Coastal Development',
    image: `${wp}/2021/08/HDH.Kuludhuffushi_01-scaled.jpg`,
    summary: 'Rock revetment, groins and beach nourishment delivered within seven months.',
    client: 'Ministry of Environment and Energy',
    period: '11 August 2015 — 20 September 2016',
    location: 'Republic of Maldives',
  },
  {
    slug: 'dh-kudhahuvadhoo-costal',
    title: 'Dh. Kudahuvadhoo Revetment',
    category: 'Coastal Development',
    image: `${wp}/2021/08/DhKudhahuvadhoo-1.jpg`,
    summary: 'Revetment construction completed in January 2015.',
    client: 'Ministry of Housing and Infrastructure',
    location: 'Republic of Maldives',
  },
  {
    slug: 'dh-meedhoo-costal',
    title: 'Dh. Meedhoo Revetment',
    category: 'Coastal Development',
    image: `${wp}/2021/08/Dh.Meedhoo-Coastal-01.jpg`,
    summary: 'Construction of 485 metres of revetment at Dh. Meedhoo.',
    client: 'Ministry of Housing and Infrastructure',
    period: '30 September 2014 — 17 February 2015',
    location: 'Republic of Maldives',
  },
  {
    slug: 'b-eydhafushi',
    title: 'B. Eydhafushi Revetment',
    category: 'Coastal Development',
    image: `${wp}/2021/08/B.Eydhafushi-Coastal-01.jpg`,
    summary: 'Construction of 875 metres of revetment protecting the reclaimed area.',
    client: 'Ministry of Housing and Infrastructure',
    period: '30 September 2014 — 19 October 2015',
    location: 'Republic of Maldives',
  },
  {
    slug: 'kendhoo-habour-project',
    title: 'Kendhoo Harbour',
    category: 'Harbour',
    image: `${wp}/2021/08/Kendhoo-Harbour-01.jpg`,
    summary: 'A new island harbour with breakwater, quay wall, dredging, paving and navigation lighting.',
    client: 'Ministry of Housing and Infrastructure',
    location: 'B. Kendhoo, Maldives',
  },
  {
    slug: 'kelaa-haour-project',
    title: 'Kelaa Harbour',
    category: 'Harbour',
    image: `${wp}/2021/08/Kella-Harbour-01.jpg`,
    summary: 'Harbour construction including breakwater, quay wall, dredging and navigation lighting.',
    client: 'Ministry of Housing and Infrastructure',
    location: 'Ha. Kelaa, Maldives',
  },
  {
    slug: 'gulhi-falhu-housing',
    title: 'Gulhi Falhu Housing',
    category: 'Community',
    image: `${wp}/2021/09/Gulhi-Falhu-Housing-01.jpg`,
    summary: 'Housing units constructed in K. Gulhi Falhu under a freehold housing basis.',
    client: 'Global Projects Development Company',
    location: 'Gulhi Falhu, Maldives',
  },
  {
    slug: 'gulhi-falhu-theme-park',
    title: 'Gulhi Falhu Theme Park',
    category: 'Community',
    image: `${wp}/2021/09/Theme-Park-01.jpg`,
    summary: 'The Maldives’ first amusement park, created for the Global Green City community.',
    client: 'Global Projects Development Company Private Limited',
    location: 'Gulhi Falhu, Maldives',
  },
  {
    slug: 'gulhi-falhu-mosque',
    title: 'Gulhi Falhu Mosque',
    category: 'Community',
    image: `${wp}/2021/09/Gulhi-Falhu-Mosque_01.jpg`,
    summary: 'A community mosque delivered for residents of the Gulhi Falhu development.',
    client: 'Global Projects Development Company',
    location: 'Gulhi Falhu, Maldives',
  },
  {
    slug: 'gulhi-falhu-stage-global-arena',
    title: 'Global Arena',
    category: 'Community',
    image: `${wp}/2021/09/GlobalAreana-01-1.jpg`,
    summary: 'A recreation and entertainment venue for residents of Global Green City.',
    client: 'Global Projects Development Company Private Limited',
    location: 'Gulhi Falhu, Maldives',
  },
  {
    slug: 'gulhi-falhu-shopping-arcade',
    title: 'Gulhi Falhu Shopping Arcade',
    category: 'Community',
    image: `${wp}/2021/09/CRE_01_Housing2.jpg`,
    summary: 'A community retail development within the Gulhi Falhu masterplan.',
    location: 'Gulhi Falhu, Maldives',
  },
  {
    slug: 'hatton-housing',
    title: 'Hatton Housing',
    category: 'Community',
    image: `${wp}/2021/09/HattonHouse-01.jpg`,
    summary: 'A plantation-community housing programme beginning with fifty homes at Fruithill Division.',
    client: 'Global Projects Development Company Private Limited',
    location: 'Hatton, Sri Lanka',
  },
  {
    slug: 'hatton-road-project',
    title: 'Hatton Road Project',
    category: 'Community',
    image: `${wp}/2021/09/HattonHouse-04.jpg`,
    summary: 'Community infrastructure supporting the Hatton development programme.',
    location: 'Hatton, Sri Lanka',
  },
]

const nav = [
  ['Home', '/'],
  ['About Us', '/about-us/'],
  ['Our Projects', '/our-projects/'],
  ['Career', '/career/'],
  ['News', '/news/'],
  ['CSR', '/csr/'],
  ['Contact', '/contact-us/'],
]

const offices = [
  { country: 'United Kingdom', address: '52A Spring Grove Road, Hounslow, Middlesex TW3 4BN', phone: '00447743010117' },
  { country: 'USA', address: '205 E. 7th Street, Suite 100, Hays KS 67601, Texas', phone: '0017856253486' },
  { country: 'Sri Lanka', address: 'Global Plaza, 1st Floor, 55/1 Peterson Lane, Colombo 06', phone: '0094112366882' },
  { country: 'Denmark', address: 'Noerregade 15, DK-5610 Assens', phone: '' },
  { country: 'Maldives', address: 'H. Melaim, 3rd Floor, Boduthakurufaanu Magu, Malé City', phone: '009607982798' },
  { country: 'Norway', address: 'St. Halvardsgate 33, 0192 Oslo', phone: '' },
  { country: 'Australia', address: '11 Norman Fisher Cct, Bruce ACT 2617', phone: '+61416249545' },
]

const iconPaths: Record<string, ReactNode> = {
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>,
  waves: <><path d="M2 6c3-2 5-2 8 0s5 2 8 0 4-1 4-1" /><path d="M2 12c3-2 5-2 8 0s5 2 8 0 4-1 4-1" /><path d="M2 18c3-2 5-2 8 0s5 2 8 0 4-1 4-1" /></>,
  building: <><path d="M4 22V4l10-2v20" /><path d="M14 8h6v14" /><path d="M8 7h2M8 11h2M8 15h2M8 19h2M18 12h.01M18 16h.01" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></>,
}

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{iconPaths[name]}</svg>
}

function useRouter() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const handler = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])
  const go = (to: string) => {
    window.history.pushState({}, '', to)
    setPath(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return { path, go }
}

function Link({ to, go, children, className = '', onClick }: { to: string; go: (to: string) => void; children: ReactNode; className?: string; onClick?: () => void }) {
  return <a href={to} className={className} onClick={(event) => { event.preventDefault(); onClick?.(); go(to) }}>{children}</a>
}

function Logo({ go }: { go: (to: string) => void }) {
  return (
    <Link to="/" go={go} className="logo" aria-label="Capital Marine and Civil Construction Pvt Ltd home">
      <img className="logo-image" src="/assets/capital-official-logo.png" alt="Capital — United Kingdom, Republic of Maldives, Sri Lanka and Singapore. A member of MeeMan Foundation." />
    </Link>
  )
}

function Header({ go, active }: { go: (to: string) => void; active: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const close = () => { setMenuOpen(false); setProjectsOpen(false) }
  return (
    <>
      <div className="utility-bar">
        <div className="shell utility-inner">
          <span>Developing & promoting projects worldwide</span>
          <div><a href="mailto:info@capitalteam.net"><Icon name="mail" size={14} />info@capitalteam.net</a><span>United Kingdom · Maldives · Worldwide</span></div>
        </div>
      </div>
      <header className="site-header">
        <div className="shell nav-wrap">
          <Logo go={go} />
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {nav.map(([label, to]) => label === 'Our Projects' ? (
              <div className="nav-dropdown" key={to}>
                <button className={`nav-link ${active.includes('project') || active === 'infrastructure' ? 'active' : ''}`} onClick={() => setProjectsOpen(!projectsOpen)} aria-expanded={projectsOpen}>
                  {label}<Icon name="chevron" size={15} />
                </button>
                <div className={`dropdown-panel ${projectsOpen ? 'is-open' : ''}`}>
                  <Link to="/our-projects/" go={go} onClick={close}><span><b>Explore all projects</b><small>Complete portfolio</small></span><Icon name="arrow" size={17} /></Link>
                  <Link to="/our-projects/infrastructure/" go={go} onClick={close}><span><b>Infrastructure</b><small>Reclamation, coastal & harbour</small></span><Icon name="arrow" size={17} /></Link>
                  <Link to="/our-projects/community-real-estate-education/" go={go} onClick={close}><span><b>Community development</b><small>Housing & public spaces</small></span><Icon name="arrow" size={17} /></Link>
                </div>
              </div>
            ) : (
              <Link key={to} to={to} go={go} onClick={close} className={`nav-link ${active === (to.split('/').filter(Boolean).pop() || 'home') ? 'active' : ''}`}>{label}</Link>
            ))}
            <Link to="/contact-us/" go={go} onClick={close} className="nav-cta">Start a conversation<Icon name="arrow" size={17} /></Link>
          </nav>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Icon name={menuOpen ? 'close' : 'menu'} size={24} /></button>
        </div>
      </header>
    </>
  )
}

function Footer({ go }: { go: (to: string) => void }) {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Logo go={go} />
          <p>Building global networks, developing meaningful projects and creating better places for communities.</p>
          <a className="footer-mail" href="mailto:info@capitalteam.net"><Icon name="mail" size={18} />info@capitalteam.net</a>
        </div>
        <div><h3>Company</h3>{nav.slice(0, 7).map(([label, to]) => <Link key={to} to={to} go={go}>{label}</Link>)}</div>
        <div><h3>Project sectors</h3><Link to="/our-projects/infrastructure/" go={go}>Infrastructure</Link><Link to="/our-projects/infrastructure/reclamation/" go={go}>Reclamation</Link><Link to="/our-projects/infrastructure/coastal-development/" go={go}>Coastal development</Link><Link to="/our-projects/infrastructure/harbour/" go={go}>Harbour construction</Link><Link to="/our-projects/community-real-estate-education/" go={go}>Community development</Link></div>
        <div><h3>Head office</h3><p>52A Spring Grove Road<br />Hounslow, Middlesex<br />TW3 4BN, United Kingdom</p><a href="tel:00447743010117">+44 7743 010117</a></div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Capital Marine and Civil Construction Pvt Ltd. All rights reserved.</span><span>Global project development & investment</span></div>
    </footer>
  )
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? 'light' : ''}`}><span />{children}</div>
}

function SectionHeading({ eyebrow, title, text, align = 'left' }: { eyebrow: string; title: string; text?: string; align?: 'left' | 'center' }) {
  return <div className={`section-heading ${align}`}><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

function ProjectCard({ project, go }: { project: Project; go: (to: string) => void }) {
  return (
    <article className="project-card" data-reveal>
      <Link to={`/our-projects/${project.slug}/`} go={go} className="project-image">
        <img src={project.image} alt={`${project.title} project`} />
        <span className="project-arrow"><Icon name="arrow" /></span>
      </Link>
      <div className="project-card-body">
        <span className="category">{project.category}</span>
        <h3><Link to={`/our-projects/${project.slug}/`} go={go}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <div className="project-meta"><span><Icon name="pin" size={15} />{project.location || 'International'}</span><Link to={`/our-projects/${project.slug}/`} go={go}>View project <Icon name="arrow" size={16} /></Link></div>
      </div>
    </article>
  )
}

function Home({ go }: { go: (to: string) => void }) {
  const [faq, setFaq] = useState(0)
  const faqs = [
    ['Where does the company operate?', 'Capital Marine and Civil Construction Pvt Ltd is based in the United Kingdom and develops and promotes projects worldwide, with offices across Europe, Asia, Australia and the USA.'],
    ['What types of projects does the team deliver?', 'The portfolio spans reclamation, coastal protection, harbour construction, housing, community development, clean power, tourism, technology and finance.'],
    ['How can partners work with us?', 'Capital Marine and Civil Construction Pvt Ltd welcomes investors, developers and people with innovative ideas. Begin with a conversation through the contact page.'],
  ]
  return (
    <>
      <section className="hero">
        <div className="hero-bg"><img src={`${wp}/2021/09/GLOB-2-1.jpg`} alt="Capital Marine and Civil Construction coastal development in the Maldives" /></div>
        <div className="hero-overlay" />
        <div className="hero-orb one" /><div className="hero-orb two" />
        <div className="shell hero-content">
          <Eyebrow light>Global project development & investment</Eyebrow>
          <h1>Building capital.<br />Shaping <em>places.</em></h1>
          <p>We bring experts, partners and resources together to develop, fund and deliver meaningful projects around the world.</p>
          <div className="hero-actions"><Link to="/our-projects/" go={go} className="button primary">Explore our work<Icon name="arrow" /></Link><Link to="/about-us/" go={go} className="button glass">Discover our story</Link></div>
        </div>
        <div className="shell hero-bottom">
          <div className="hero-proof"><span>Trusted across</span><strong>UK · Maldives · Sri Lanka · Worldwide</strong></div>
          <a href="#introduction" className="scroll-cue"><span>Scroll to discover</span><i><Icon name="chevron" size={16} /></i></a>
        </div>
      </section>

      <section className="intro section" id="introduction">
        <div className="shell intro-grid">
          <div data-reveal><SectionHeading eyebrow="A connected global team" title="Big-picture thinking, grounded in delivery." /><p className="lead">Capital Marine and Civil Construction Pvt Ltd is a United Kingdom based company developing and promoting projects worldwide.</p><p>Our panel of experts, consultants and advisors develops, monitors and executes selected projects—connecting investment opportunity with practical expertise.</p><Link to="/about-us/" go={go} className="text-link">About our company <Icon name="arrow" size={17} /></Link></div>
          <div className="intro-visual" data-reveal>
            <img src={`${wp}/2021/07/HM-BR-WHAT-WE-DO.jpg`} alt="Capital Marine and Civil Construction development project" />
            <div className="glass-note"><span className="note-icon"><Icon name="globe" /></span><div><strong>20+ years</strong><small>building a global network of professionals and organisations</small></div></div>
          </div>
        </div>
      </section>

      <section className="sectors section">
        <div className="shell">
          <SectionHeading eyebrow="What we do" title="Expertise that moves ambitious projects forward." text="From marine infrastructure to community development, our work is built around long-term value." align="center" />
          <div className="sector-grid">
            {[
              ['waves', 'Marine infrastructure', 'Reclamation, shore protection and harbour projects delivered in challenging coastal environments.', '/our-projects/infrastructure/'],
              ['building', 'Community development', 'Housing, public spaces and community facilities designed to create better places to live.', '/our-projects/community-real-estate-education/'],
              ['layers', 'Project development', 'Expertise, partnerships and funding pathways aligned to move selected opportunities forward.', '/about-us/'],
            ].map(([icon, title, text, to], i) => <article className="sector-card" data-reveal key={title}><span className="sector-number">0{i + 1}</span><span className="sector-icon"><Icon name={icon} size={27} /></span><h3>{title}</h3><p>{text}</p><Link to={to} go={go} aria-label={`Explore ${title}`}><Icon name="arrow" /></Link></article>)}
          </div>
        </div>
      </section>

      <section className="featured section">
        <div className="shell">
          <div className="section-row"><SectionHeading eyebrow="Selected work" title="A portfolio built at scale." /><Link to="/our-projects/" go={go} className="button secondary">View all projects<Icon name="arrow" /></Link></div>
          <div className="project-grid">{projects.slice(0, 3).map(p => <ProjectCard key={p.slug} project={p} go={go} />)}</div>
        </div>
      </section>

      <section className="impact section">
        <div className="shell impact-grid">
          <div className="impact-copy" data-reveal><Eyebrow light>Why work with us</Eyebrow><h2>One network.<br />Many disciplines.<br /><em>Shared purpose.</em></h2><p>Our model connects seasoned local and international professionals with organisations, ideas and opportunities—giving every project the perspective it needs.</p><Link to="/contact-us/" go={go} className="button light">Work with us<Icon name="arrow" /></Link></div>
          <div className="impact-stats">
            {[['20+', 'Years building corporate capital'], ['7', 'International office locations'], ['2.4 km', 'Eco-friendly revetment at Gulhifalhu'], ['Global', 'Project and partner network']].map(([value, label]) => <div className="stat" data-reveal key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid">
          <div><SectionHeading eyebrow="Good to know" title="Questions, clearly answered." text="A concise introduction to our reach, expertise and approach." /><Link to="/contact-us/" go={go} className="text-link">Ask us something else <Icon name="arrow" size={17} /></Link></div>
          <div className="accordion">{faqs.map(([q, a], i) => <div className={`faq ${faq === i ? 'open' : ''}`} key={q}><button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i}><span>{q}</span><i><Icon name={faq === i ? 'close' : 'plus'} size={18} /></i></button><div className="faq-answer"><p>{a}</p></div></div>)}</div>
        </div>
      </section>
      <CTA go={go} />
    </>
  )
}

function PageHero({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image: string }) {
  return <section className="page-hero"><img src={image} alt="" /><div className="page-hero-overlay" /><div className="shell"><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}</h1><p>{text}</p></div></section>
}

function About({ go }: { go: (to: string) => void }) {
  const [tab, setTab] = useState('Overview')
  const tabs: Record<string, ReactNode> = {
    Overview: <><h3>A network built to make progress possible.</h3><p>Capital Marine and Civil Construction Pvt Ltd is the brainchild of an entrepreneur with a vision to create a powerful network of local and global professionals and organisations—building corporate capital as a mix of assets and resources over more than 20 years.</p><p>Based in the United Kingdom, we develop and promote projects worldwide, arrange funding for selected projects and connect opportunities with a panel of experienced experts, consultants and advisors.</p></>,
    'Vision & Mission': <><h3>Creating value for people and places.</h3><p><strong>Our vision:</strong> Creating a big global network with an eye on the big picture, adding value to people and places in order to improve lives.</p><p><strong>Our mission:</strong> Connecting the best innovators and solution providers with professionals and organisations, building the capacity to realise a shared vision, improve communities and create environments for better living.</p></>,
    'Our Team': <><h3>Seasoned local and international professionals.</h3><p>Our team brings together more than 20 years of collective experience across infrastructure, shipping, trading, clean power, community development, health, tourism, technology and finance.</p><p>Commercial, operational and financial expertise comes together around each project—supported by a shared commitment to delivery and positive impact.</p></>,
    'Our Partners': <><h3>Collaboration is central to our model.</h3><p>We work with governments, global contractors, developers, investors, consultants and solution providers to build the right team for every selected project.</p></>,
    'Our Clients': <><h3>Relationships built around shared outcomes.</h3><p>Our project history includes work for public-sector ministries, development corporations, international contractors and community development companies.</p></>,
  }
  return <>
    <PageHero eyebrow="About our company" title="A global network with an eye on the big picture." text="Professionals, organisations and ideas connected to improve lives and create lasting value." image={`${wp}/2021/08/OVERVIEW.jpg`} />
    <section className="section"><div className="shell about-layout"><div className="tabs" role="tablist">{Object.keys(tabs).map(t => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)} role="tab">{t}<Icon name="arrow" size={16} /></button>)}</div><div className="tab-content" data-reveal><Eyebrow>{tab}</Eyebrow>{tabs[tab]}<Link to="/contact-us/" go={go} className="button primary">Start a conversation<Icon name="arrow" /></Link></div></div></section>
    <section className="expertise-band section"><div className="shell"><SectionHeading eyebrow="Multi-disciplinary capability" title="Experience across connected industries." align="center" /><div className="pill-grid">{['Infrastructure', 'Shipping', 'Trading', 'Clean power', 'Community development', 'Health', 'Tourism', 'Technology', 'Finance'].map(x => <span key={x}><Icon name="check" size={15} />{x}</span>)}</div></div></section>
    <CTA go={go} />
  </>
}

function Projects({ go, filter }: { go: (to: string) => void; filter?: Project['category'] | 'Infrastructure' }) {
  const [category, setCategory] = useState(filter || 'All')
  const filtered = projects.filter(p => category === 'All' || category === 'Infrastructure' ? p.category !== 'Community' : p.category === category)
  return <>
    <PageHero eyebrow="Our projects" title={filter === 'Community' ? 'Building places for communities to thrive.' : filter ? `${filter} projects` : 'Work that changes coastlines and communities.'} text="Explore a portfolio spanning reclamation, coastal protection, harbours, housing and community development." image={`${wp}/2021/09/OUR-PROJECTS_02.jpg`} />
    <section className="section projects-page"><div className="shell">
      {!filter && <div className="filters">{['All', 'Reclamation', 'Coastal Development', 'Harbour', 'Community'].map(c => <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c as typeof category)}>{c}</button>)}</div>}
      <div className="results-row"><span>{filtered.length} projects</span><p>Selected work from our international portfolio</p></div>
      <div className="project-grid">{filtered.map(p => <ProjectCard key={p.slug} project={p} go={go} />)}</div>
    </div></section>
    <CTA go={go} />
  </>
}

function ProjectDetail({ project, go }: { project: Project; go: (to: string) => void }) {
  const related = projects.filter(p => p.category === project.category && p.slug !== project.slug).slice(0, 3)
  return <>
    <section className="project-hero"><img src={project.image} alt={`${project.title} project`} /><div className="project-hero-overlay" /><div className="shell project-hero-content"><span className="category light">{project.category}</span><h1>{project.title}</h1><p>{project.summary}</p></div></section>
    <section className="project-facts"><div className="shell facts-grid">
      {project.client && <div><span>Client</span><strong>{project.client}</strong></div>}
      {project.period && <div><span>Period</span><strong>{project.period}</strong></div>}
      <div><span>Location</span><strong>{project.location || 'International'}</strong></div>
      <div><span>Service</span><strong>{project.category}</strong></div>
    </div></section>
    <section className="section"><div className="shell detail-grid"><div><SectionHeading eyebrow="Project overview" title="Purpose-led delivery at project scale." /><p className="lead">{project.summary}</p><p>This project forms part of Capital Marine and Civil Construction Pvt Ltd’s international portfolio, bringing together technical experience, trusted partners and disciplined delivery around a clear client objective.</p><Link to="/contact-us/" go={go} className="button primary">Discuss a project<Icon name="arrow" /></Link></div><div className="detail-image"><img src={project.image} alt={`View of ${project.title}`} /><span>Company project archive</span></div></div></section>
    {related.length > 0 && <section className="featured section"><div className="shell"><div className="section-row"><SectionHeading eyebrow="Continue exploring" title="Related projects." /><Link to="/our-projects/" go={go} className="text-link">All projects <Icon name="arrow" size={17} /></Link></div><div className="project-grid">{related.map(p => <ProjectCard key={p.slug} project={p} go={go} />)}</div></div></section>}
  </>
}

function Career({ go }: { go: (to: string) => void }) {
  const roles = ['Project Manager', 'Finance Manager', 'Business Development Manager', 'Contract Manager', 'Project Accountant', 'Project Administrator', 'Quantity Surveyor']
  return <>
    <PageHero eyebrow="Careers" title="Bring your perspective to a global team." text="We are always looking for new talent to join our dynamic team of professionals." image="https://images.unsplash.com/photo-1707077865701-2854996afc4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1800" />
    <section className="section"><div className="shell career-grid"><div><SectionHeading eyebrow="Career opportunities" title="Do meaningful work, across borders." /><p className="lead">Join a United Kingdom based company developing and promoting projects worldwide.</p><p>Our work calls for people who can combine specialist expertise with curiosity, collaboration and a practical focus on outcomes.</p><a className="button primary" href="mailto:info@capitalteam.net?subject=Career application">Send your CV<Icon name="arrow" /></a></div><div className="roles">{roles.map(role => <a key={role} href={`mailto:info@capitalteam.net?subject=Application — ${encodeURIComponent(role)}`}><span className="role-icon"><Icon name="briefcase" /></span><strong>{role}</strong><span>Apply by email <Icon name="arrow" size={16} /></span></a>)}</div></div></section>
    <CTA go={go} />
  </>
}

function News({ go }: { go: (to: string) => void }) {
  return <>
    <PageHero eyebrow="News & recognition" title="Progress, partnerships and milestones." text="Updates and recognition from across the Capital Marine and Civil Construction network." image={`${wp}/2021/09/GLOB-2-1.jpg`} />
    <section className="section"><div className="shell news-feature"><div className="news-image"><img src={`${wp}/2021/10/BWC-CERTIFICATE-scaled.jpg`} alt="Capital Marine and Civil Construction certificate of recognition" /></div><div><span className="category">Recognition</span><h2>Project partnership recognition</h2><p>Our news archive features certification and recognition connected to project delivery and international partnerships.</p><Link to="/contact-us/" go={go} className="text-link">Request more information <Icon name="arrow" size={17} /></Link></div></div></section>
    <CTA go={go} />
  </>
}

function CSR({ go }: { go: (to: string) => void }) {
  return <>
    <PageHero eyebrow="Corporate social responsibility" title="Creating value beyond the project." text="Supporting people, strengthening communities and acting as a responsible corporate citizen." image={`${wp}/2024/09/Supporting-MeeMan-Foundation-to-uplift-society-002.jpeg`} />
    <section className="section"><div className="shell csr-grid">
      <article><img src={`${wp}/2024/09/Supporting-MeeMan-Foundation-to-uplift-society-003.jpeg`} alt="Supporting the Meeman Foundation in Hatton" /><div><span className="category">Hatton, Sri Lanka · 2024</span><h2>Supporting Meeman Foundation</h2><p>Capital Marine and Civil Construction Pvt Ltd joined the Meeman Foundation in work designed to uplift the local community.</p></div></article>
      <article><img src={`${wp}/2024/09/Supporting-MeeMan-Foundation-to-uplift-society-006.jpeg`} alt="Capital Marine and Civil Construction staff welfare event" /><div><span className="category">Republic of Maldives · 2024</span><h2>Staff welfare event</h2><p>A team event focused on staff wellbeing and the people behind our work in the Maldives.</p></div></article>
    </div></section>
    <CTA go={go} />
  </>
}

function Contact() {
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle')
  const [error, setError] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (!form.get('name') || !form.get('email') || !form.get('message')) { setError('Please complete your name, email and message.'); return }
    setError(''); setState('loading')
    const subject = encodeURIComponent(`Website enquiry from ${form.get('name')}`)
    const body = encodeURIComponent(`${form.get('message')}\n\nFrom: ${form.get('name')}\nEmail: ${form.get('email')}\nCompany: ${form.get('company') || 'Not provided'}`)
    window.setTimeout(() => { setState('success'); window.location.href = `mailto:info@capitalteam.net?subject=${subject}&body=${body}` }, 700)
  }
  return <>
    <PageHero eyebrow="Contact our team" title="Let’s turn a strong idea into meaningful progress." text="Talk to Capital Marine and Civil Construction Pvt Ltd about projects, partnerships, investment opportunities or careers." image={`${wp}/2021/09/INFRASTRUCTURE_5.jpg`} />
    <section className="section contact-section"><div className="shell contact-layout">
      <div><SectionHeading eyebrow="Start a conversation" title="Tell us what you’re working on." text="Complete the form and your email application will open with the details prepared for our team." />
        <form className="contact-form" onSubmit={submit} noValidate>
          <div className="field-row"><label><span>Name *</span><input name="name" type="text" placeholder="Your full name" /></label><label><span>Email *</span><input name="email" type="email" placeholder="name@company.com" /></label></div>
          <label><span>Company</span><input name="company" type="text" placeholder="Your organisation" /></label>
          <label><span>How can we help? *</span><textarea name="message" rows={6} placeholder="Tell us about your project or enquiry" /></label>
          {error && <p className="form-error">{error}</p>}
          {state === 'success' && <p className="form-success"><Icon name="check" size={17} />Your message is ready in your email application.</p>}
          <button className="button primary submit" disabled={state === 'loading'}>{state === 'loading' ? 'Preparing message…' : 'Send enquiry'}{state !== 'loading' && <Icon name="arrow" />}</button>
        </form>
      </div>
      <aside className="contact-aside"><div className="contact-primary"><span className="sector-icon"><Icon name="mail" /></span><span>Email our team</span><a href="mailto:info@capitalteam.net">info@capitalteam.net</a><p>For projects, partnerships, careers and general enquiries.</p></div><div className="office-list">{offices.map(o => <div key={o.country}><span><Icon name="pin" size={17} /></span><div><strong>{o.country}</strong><p>{o.address}</p>{o.phone && <a href={`tel:${o.phone.replace(/\s/g, '')}`}>{o.phone}</a>}</div></div>)}</div></aside>
    </div></section>
  </>
}

function CTA({ go }: { go: (to: string) => void }) {
  return <section className="cta"><div className="cta-orb" /><div className="shell cta-inner"><div><Eyebrow light>Ideas need the right team</Eyebrow><h2>Let’s build what comes next.</h2><p>Bring us your project, opportunity or ambitious idea.</p></div><Link to="/contact-us/" go={go} className="button light">Start a conversation<Icon name="arrow" /></Link></div></section>
}

function OpeningIntro({ state }: { state: 'show' | 'hide' | 'done' }) {
  if (state === 'done') return null
  return (
    <div className={`opening-intro ${state === 'hide' ? 'is-hiding' : ''}`} role="status" aria-label="Opening Capital website">
      <div className="intro-grid-lines" />
      <div className="construction-scene" aria-hidden="true">
        <div className="construction-building">
          <span /><span /><span /><span /><span /><span />
        </div>
        <div className="construction-core" />
        <div className="construction-crane">
          <i className="crane-mast" />
          <i className="crane-cab" />
          <i className="crane-arm" />
          <i className="crane-counterweight" />
          <i className="crane-cable" />
          <i className="crane-hook" />
        </div>
        <div className="construction-ground" />
      </div>
      <div className="intro-ring ring-one" />
      <div className="intro-ring ring-two" />
      <div className="intro-logo-circle">
        <span className="intro-sweep" />
        <img src="/assets/capital-official-logo.png" alt="Capital" />
      </div>
      <div className="intro-caption">
        <span />
        <p>Marine · Civil Construction · Global Development</p>
        <span />
      </div>
      <div className="intro-progress"><i /></div>
    </div>
  )
}

export default function App() {
  const { path, go } = useRouter()
  const [introState, setIntroState] = useState<'show' | 'hide' | 'done'>('show')
  const rawSlug = path.split('/').filter(Boolean).pop() || 'home'
  const aliases: Record<string, string> = { 'sample-page': 'home', 'z-infrastructure': 'infrastructure', 'z-aboutus': 'community-real-estate-education', 'housing-community-development': 'community-real-estate-education', 'reclamation': 'infrastructure', 'coastal-development': 'infrastructure', 'harbour': 'infrastructure', 'road': 'infrastructure', 'hulhumale-phase-111': 'dredging-reclamation-and-shore-protection-of-hulhumale-phase-iii' }
  const slug = aliases[rawSlug] || rawSlug
  const project = useMemo(() => projects.find(p => p.slug === slug), [slug])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('revealed')), { threshold: 0.12 })
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [path])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.style.overflow = 'hidden'
    const hideTimer = window.setTimeout(() => setIntroState('hide'), reduceMotion ? 250 : 6000)
    const doneTimer = window.setTimeout(() => {
      setIntroState('done')
      document.body.style.overflow = ''
    }, reduceMotion ? 450 : 6850)
    return () => {
      window.clearTimeout(hideTimer)
      window.clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [])

  let page: ReactNode
  if (project) page = <ProjectDetail project={project} go={go} />
  else if (slug === 'home') page = <Home go={go} />
  else if (slug === 'about-us') page = <About go={go} />
  else if (slug === 'our-projects') page = <Projects go={go} />
  else if (slug === 'infrastructure') page = <Projects go={go} filter="Infrastructure" />
  else if (slug === 'community-real-estate-education') page = <Projects go={go} filter="Community" />
  else if (slug === 'career') page = <Career go={go} />
  else if (slug === 'news') page = <News go={go} />
  else if (slug === 'csr') page = <CSR go={go} />
  else if (slug === 'contact-us') page = <Contact />
  else page = <Projects go={go} />

  return (
    <>
      <OpeningIntro state={introState} />
      <div className={`app site-stage ${introState === 'hide' || introState === 'done' ? 'is-revealed' : ''}`}>
        <Header go={go} active={slug} />
        <main>{page}</main>
        <Footer go={go} />
      </div>
    </>
  )
}

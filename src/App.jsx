import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Mail, FileText } from 'lucide-react'

/* ─────────────── EDIT ME: all content lives here ─────────────── */
const DATA = {
  name: "Arindam Samadder",
  role: "MCA '27 · Python · SQL · Backend & Data",
  tagline: "I write Python that solves problems and SQL that answers questions. Currently prepping for <em>off-campus engineering & analyst roles</em> in Kolkata — ₹4–5 LPA target, shipping real projects along the way.",
  location: "Kolkata, India",
  links: {
    github: "https://github.com/you",
    linkedin: "https://linkedin.com/in/you",
    email: "arindam.samadder18@gmail.com",
    resume: "/resume.pdf",
  },
  focus: [
    { label: "Backend Engineering", body: "Python (FastAPI / Flask), REST APIs, auth flows, SQL schema design." },
    { label: "Data & Analytics", body: "SQL joins/CTEs, pandas, PowerBI dashboards, Excel modeling, dashboards that answer questions." },
    { label: "AI Expansion", body: "Applied ML projects, deep-learning exploration, LLM tooling." },
    { label: "Competitive Problem Solving", body: "DSA in Python & JS — daily reps, interview-shaped." },
  ],
  projects: [
    {
      title: "Project One",
      blurb: "One sentence on the problem, one on what you shipped, one on the stack. This is your proof you can build.",
      stack: ["Python", "FastAPI", "Postgres"],
      href: "#",
    },
    {
      title: "Analytics Dashboard",
      blurb: "PowerBI / pandas dashboard answering a concrete business question — the exact thing Kolkata analyst JD's screen for.",
      stack: ["Python", "PowerBI", "SQL"],
      href: "#",
    },
    {
      title: "AI Experiment",
      blurb: "Deep-learning or LLM project — even a small one. Signals you're moving with the field.",
      stack: ["PyTorch", "Transformers"],
      href: "#",
    },
  ],
  timeline: [
    { year: "2027", what: "MCA graduation · targeting IT + analytics roles in Kolkata" },
    { year: "2026", what: "Off-campus prep — DSA in Python, SQL drill, portfolio projects" },
    { year: "2025", what: "Cloned + refactored real repos; building AI/analytics projects" },
  ],
}

const ROLES = [
  "Python · SQL · Backend",
  "Data Analyst track · PowerBI + pandas",
  "DSA in Python — daily reps",
  "MCA '27 · Kolkata",
]

/* ─────────────── icons ─────────────── */
const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
  </svg>
)

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
)

function Portrait() {
  return (
    <div className="relative">
      {/* offset accent frame */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[2rem] bg-[--color-accent]/25" aria-hidden="true" />
      <div className="absolute inset-0 -translate-x-1 -translate-y-1 rounded-[2rem] border rule" aria-hidden="true" />

      {/* actual photo */}
      <div className="relative h-56 w-56 overflow-hidden rounded-[2rem] bg-[--color-cream] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] sm:h-64 sm:w-64 md:h-72 md:w-72">
        <img
          src="/portrait.jpg"
          alt={`${DATA.name} — portrait`}
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* subtle inner ring so it reads as framed */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[--color-ink]/10" />
      </div>

      {/* tiny floating caption */}
      <div className="absolute -bottom-3 -right-3 rounded-full border rule bg-[--color-paper] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[--color-ink]/70 shadow-sm">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[--color-sage]" />
        Kolkata
      </div>
    </div>
  )
}

/* ─────────────── primitives ─────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

const Container = ({ children }) => (
  <div className="mx-auto max-w-6xl px-6 md:px-8">{children}</div>
)

const SectionLabel = ({ children }) => (
  <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[--color-muted]">
    <span className="h-px w-8 bg-[--color-muted]/40" />
    {children}
  </div>
)

const ExternalLink = ({ href, children, ...rest }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    className="group inline-flex items-center gap-1 underline decoration-[--color-accent]/30 decoration-1 underline-offset-4 transition hover:decoration-[--color-accent]"
    {...rest}
  >
    {children}
    <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </a>
)

const IconLink = ({ href, icon: Icon, label }) => (
  <a href={href} target="_blank" rel="noreferrer" aria-label={label}
     className="grid h-10 w-10 place-items-center rounded-full border rule text-[--color-muted] transition hover:border-[--color-ink] hover:text-[--color-ink]">
    <Icon className="h-4 w-4" />
  </a>
)

/* ─────────────── new primitives ─────────────── */
function RoleRotator() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-block h-[1.3em] overflow-hidden align-bottom">
      <motion.span
        key={i}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="block"
      >
        {ROLES[i]}
      </motion.span>
    </span>
  )
}

function StatusPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border rule bg-[--color-ink]/[0.02] px-3 py-1 text-xs text-[--color-ink]/80">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Open to off-campus · Kolkata
    </span>
  )
}

function MagneticRow({ children, href }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) / r.width
    const y = (e.clientY - r.top - r.height / 2) / r.height
    ref.current.style.transform = `translate(${x * 4}px, ${y * 2}px)`
  }
  const onLeave = () => {
    ref.current.style.transform = "translate(0,0)"
  }
  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group grid gap-4 py-8 transition-transform duration-200 ease-out md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8"
    >
      {children}
    </a>
  )
}

/* ─────────────── sections ─────────────── */
function Nav() {
  const items = [
    ["Focus", "#focus"],
    ["Work", "#work"],
    ["Path", "#path"],
    ["Contact", "#contact"],
  ]
  const [active, setActive] = useState("")
  const [scrolled, setScrolled] = useState(false)

  // active section tracking
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id))
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    items.forEach(([, href]) => {
      const el = document.querySelector(href)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-[--color-paper]/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-[color-mix(in_oklab,var(--color-ink)_14%,transparent)] shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(0,0,0,0.12)]"
          : "border-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between gap-6">
          {/* brand */}
          <a href="#" className="group flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[--color-ink] font-serif text-sm text-[--color-paper] transition group-hover:bg-[--color-accent]">
              {DATA.name[0]}
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-serif text-base tracking-tight">
                {DATA.name}
                <span className="text-[--color-accent]">.</span>
              </span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[--color-muted]">
                MCA '27 · Kolkata
              </span>
            </span>
          </a>

          {/* links */}
          <ul className="hidden items-center gap-7 text-sm md:flex">
            {items.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className={`relative py-1 transition ${
                    active === href
                      ? "text-[--color-ink]"
                      : "text-[--color-muted] hover:text-[--color-ink]"
                  }`}
                >
                  {label}
                  {active === href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-[--color-accent]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* cta */}
          <div className="flex items-center gap-2">
            <a
              href={DATA.links.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border rule px-4 py-2 text-xs font-medium text-[--color-ink]/80 transition hover:border-[--color-ink] hover:text-[--color-ink] sm:inline-flex"
            >
              Resume
            </a>
            <a
              href={`mailto:${DATA.links.email}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[--color-ink] px-4 py-2 text-xs font-medium text-[--color-paper] transition hover:bg-[--color-accent]"
            >
              Hire me
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </nav>
      </Container>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative hero-glow overflow-hidden">
      <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-[10px] uppercase tracking-[0.4em] text-[--color-muted]/60 md:block">
        Portfolio · v2 · 2026
      </div>
      <Container>
        <div className="relative z-10 grid gap-12 py-24 md:py-36 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
          {/* left: text */}
          <motion.div {...fadeUp} className="md:pt-4">
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              {DATA.name}<span className="text-[--color-accent]">.</span>
            </h1>
            <div className="mt-4"><StatusPill /></div>
            <p className="mt-4 max-w-xl font-serif text-xl italic text-[--color-muted] md:text-2xl">
              <RoleRotator />
            </p>
            <p
              className="mt-6 max-w-lg text-base leading-relaxed text-[--color-ink]/80 [&_em]:font-serif [&_em]:italic [&_em]:text-[--color-ink]"
              dangerouslySetInnerHTML={{ __html: DATA.tagline }}
            />

            {/* CTA row moved here, below text, horizontal */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${DATA.links.email}`}
                 className="inline-flex items-center gap-2 rounded-full bg-[--color-ink] px-5 py-3 text-sm text-[--color-paper] transition hover:bg-[--color-accent]">
                <Mail className="h-4 w-4" /> Get in touch
              </a>
              <a href={DATA.links.resume} target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-2 rounded-full border rule px-5 py-3 text-sm transition hover:bg-[--color-ink]/5">
                <FileText className="h-4 w-4" /> Resume
              </a>
              <div className="ml-1 flex gap-2">
                <IconLink href={DATA.links.github} icon={GithubIcon} label="GitHub" />
                <IconLink href={DATA.links.linkedin} icon={LinkedinIcon} label="LinkedIn" />
              </div>
            </div>
          </motion.div>

          {/* right: portrait */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="flex justify-start md:justify-end md:pt-2">
            <Portrait />
          </motion.div>
        </div>
        <div className="h-px w-full rule border-t" />
      </Container>
    </section>
  )
}

function Focus() {
  return (
    <section id="focus" className="border-b rule">
      <Container>
        <div className="py-20 md:py-24">
          <SectionLabel>01 — Focus</SectionLabel>
          <motion.h2 {...fadeUp} className="mb-12 max-w-3xl font-serif text-3xl leading-tight md:text-5xl">
            What I do, in plain English.
          </motion.h2>
          <div className="grid gap-px overflow-hidden rounded-2xl border rule bg-[color-mix(in_oklab,var(--color-ink)_12%,transparent)] md:grid-cols-2">
            {DATA.focus.map((f, i) => (
              <motion.div key={f.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="bg-[--color-paper] p-8 md:p-10">
                <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[--color-accent]">
                  {f.label}
                </h3>
                <p className="text-[--color-ink]/80">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="border-b rule">
      <Container>
        <div className="py-24 md:py-36">
          <SectionLabel>02 — Selected work</SectionLabel>
          <motion.h2 {...fadeUp} className="mb-12 max-w-3xl font-serif text-3xl leading-tight md:text-5xl">
            Things I've shipped.
          </motion.h2>
          <ul className="divide-y rule border-t rule">
            {DATA.projects.map((p, i) => (
              <motion.li key={p.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
                <MagneticRow href={p.href}>
                  <span className="font-mono text-xs text-[--color-muted]">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl transition-colors duration-300 group-hover:text-[--color-accent] md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[--color-ink]/75">{p.blurb}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="rounded-full border rule px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[--color-muted] transition-colors duration-300 group-hover:border-[--color-accent]/30">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="hidden h-6 w-6 text-[--color-muted] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[--color-accent] md:block" />
                </MagneticRow>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

function Path() {
  return (
    <section id="path" className="border-b rule">
      <Container>
        <div className="py-20 md:py-24">
          <SectionLabel>03 — Path</SectionLabel>
          <motion.h2 {...fadeUp} className="mb-12 max-w-3xl font-serif text-3xl leading-tight md:text-5xl">
            Where I've been, where I'm going.
          </motion.h2>
          <ol className="space-y-6">
            {DATA.timeline.map((t, i) => (
              <motion.li key={t.year} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="grid gap-2 border-t rule pt-6 md:grid-cols-[120px_1fr] md:gap-8">
                <span className="font-mono text-sm text-[--color-accent]">{t.year}</span>
                <span className="text-[--color-ink]/85 md:text-lg">{t.what}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact">
      <Container>
        <div className="grid gap-8 py-28 md:grid-cols-[1fr_auto] md:items-end md:py-40">
          <motion.div {...fadeUp}>
            <SectionLabel>04 — Contact</SectionLabel>
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">
              Let's talk about<br />
              <span className="italic text-[--color-accent]">a real role.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[--color-ink]/75">
              Off-campus recruiter, teammate, or someone building something in Kolkata — my inbox is open.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="flex flex-col gap-3 md:items-end">
            <ExternalLink href={`mailto:${DATA.links.email}`}>{DATA.links.email}</ExternalLink>
            <ExternalLink href={DATA.links.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink href={DATA.links.github}>GitHub</ExternalLink>
          </motion.div>
        </div>
        <footer className="flex flex-col items-start justify-between gap-2 border-t rule py-6 font-mono text-xs text-[--color-muted] md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {DATA.name} · Built with Vite</span>
          <span>Kolkata · IST</span>
        </footer>
      </Container>
    </section>
  )
}

/* ─────────────── page ─────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Focus />
        <Work />
        <Path />
        <Contact />
      </main>
    </>
  )
}
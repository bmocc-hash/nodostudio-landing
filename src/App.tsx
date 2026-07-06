import { useRef, useEffect, useState } from 'react'
import Hls from 'hls.js'
import { ArrowRight, Menu, X, Database, BarChart2, Brain, Zap, ChevronDown, ChevronUp, Mail, Globe, CheckCircle } from 'lucide-react'
import './index.css'

const HLS_URL = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'

const NAV_LINKS = [
  { label: 'QUÉ HACEMOS',      id: 'que-hacemos'    },
  { label: 'CÓMO LO HACEMOS',  id: 'como-lo-hacemos'},
  { label: 'HERRAMIENTAS',     id: 'herramientas'   },
]

const TICKER_ITEMS = [
  'Python','SQL','Power BI','Tableau','Análisis de datos',
  'Automatización','Dashboards','BigQuery','Looker Studio','ETL',
  'Google Sheets','Integración de sistemas','Data Warehouse','KPIs','Reportes',
  'Python','SQL','Power BI','Tableau','Análisis de datos',
  'Automatización','Dashboards','BigQuery','Looker Studio','ETL',
  'Google Sheets','Integración de sistemas','Data Warehouse','KPIs','Reportes',
]

const TOOLS = [
  { name: 'Google Analytics',   desc: 'Analítica web, tráfico y comportamiento de usuarios en tiempo real.' },
  { name: 'Supermetrics',       desc: 'Automatización y conectores de datos para profesionales de marketing.' },
  { name: 'Google Data Studio', desc: 'Dashboards interactivos, visuales y fáciles de compartir.' },
  { name: 'Zoho',               desc: 'Suite integral en la nube para gestionar todas las áreas de un negocio.' },
  { name: 'HubSpot',            desc: 'CRM integral basado en la nube para atraer, convertir y cerrar ventas.' },
  { name: 'Slack',              desc: 'Comunicación y colaboración en tiempo real para equipos.' },
  { name: 'n8n',                desc: 'Automatización de flujos que conecta apps, bases de datos y APIs.' },
  { name: 'Mailchimp',          desc: 'Plataforma de email marketing y automatización de campañas.' },
  { name: 'Meta Ads',           desc: 'Anuncios pagados en Facebook, Instagram, Messenger y WhatsApp.' },
  { name: 'Google Ads',         desc: 'Publicidad online para mostrar productos y servicios en Google.' },
]

const SERVICES = [
  {
    icon: <Database size={22} />,
    title: 'Integración de datos',
    items: ['Conexión de fuentes dispersas', 'Limpieza y estructuración de datos', 'Pipelines automatizados'],
  },
  {
    icon: <BarChart2 size={22} />,
    title: 'Dashboards & Reporting',
    items: ['Dashboards en tiempo real', "KPI's y métricas clave", 'Reporting automático'],
  },
  {
    icon: <Brain size={22} />,
    title: 'Análisis & Estrategia',
    items: ['Análisis del negocio', 'Modelos predictivos', 'Segmentación de clientes'],
  },
  {
    icon: <Zap size={22} />,
    title: 'Automatización de procesos',
    items: ['Flujos en herramientas digitales', 'Integración CRM / ERP', 'Alertas automáticas'],
  },
]

const STEPS = [
  { n: '01', title: 'Diagnóstico',             desc: 'Entendemos tu negocio y mapeamos todas tus fuentes de datos actuales.' },
  { n: '02', title: 'Planificación',            desc: 'Conectamos y ordenamos tu información en una base de datos unificada y confiable.' },
  { n: '03', title: 'Ejecución y seguimiento',  desc: 'Construimos dashboards que dan visibilidad del negocio en tiempo real.' },
  { n: '04', title: 'Análisis y optimización',  desc: 'Generamos insights accionables para tomar mejores decisiones cada día.' },
]

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false })
      hls.loadSource(HLS_URL)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => { video.play().catch(() => {}) })
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_URL
      video.play().catch(() => {})
    }
  }, [])
  return <video ref={videoRef} autoPlay muted loop playsInline style={{ opacity: 0.55 }} />
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [contactForm, setContactForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [atBottom, setAtBottom] = useState(false)

  // Secciones en orden para scroll progresivo
  const SECTION_ORDER = ['hero', 'que-hacemos', 'como-lo-hacemos', 'herramientas', 'contacto']

  const handleScrollBtn = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const current = window.scrollY + window.innerHeight * 0.5
    for (const id of SECTION_ORDER) {
      if (id === 'hero') continue
      const el = document.getElementById(id)
      if (!el) continue
      if (el.offsetTop > current + 10) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
  }
  const [sent, setSent] = useState(false)

  // Detectar si llegamos al fondo
  useEffect(() => {
    const checkBottom = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      setAtBottom(scrolled >= total - 80)
    }
    window.addEventListener('scroll', checkBottom)
    return () => window.removeEventListener('scroll', checkBottom)
  }, [])

  // Highlight nav on scroll
  useEffect(() => {
    const ids = ['que-hacemos','como-lo-hacemos','sobre-nosotros','herramientas','contacto']
    const handler = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); return }
      }
      setActiveSection('')
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (id: string) => {
    setMenuOpen(false)
    document.body.style.overflow = ''
    setTimeout(() => scrollTo(id), menuOpen ? 350 : 0)
  }

  return (
    <div style={{ background: '#021628', color: 'white', fontFamily: 'Inter,sans-serif' }}>

      {/* ── MOBILE MENU ─── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} style={{ zIndex: 300 }}>
        <button onClick={() => { setMenuOpen(false); document.body.style.overflow = '' }}
          style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          <X size={28} />
        </button>
        {NAV_LINKS.map(l => (
          <a key={l.id} href="#" onClick={e => { e.preventDefault(); handleNav(l.id) }}>{l.label}</a>
        ))}
        <button className="btn-cta" onClick={() => handleNav('contacto')}>Contacto <ArrowRight size={15} /></button>
      </div>

      {/* ── NAVBAR ─── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 40px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(2,22,40,0.92)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAGKCAMAAACo3puuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wc9CwgAAAEAdFJOUwAZOl+Qt9LZ/fDVy6uAViwJIEN6rfP/9NS0gUcpBAVMmM3luHgjClif1vr+4KpnFhxu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" alt="NodoStudio" style={{ height: 36, width: 'auto', display: 'block' }} />
        </a>



        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} className="btn-nav-pill"
              style={{ borderColor: activeSection === l.id ? '#00a0a0' : undefined, color: activeSection === l.id ? '#00a0a0' : undefined }}
              onClick={() => handleNav(l.id)}>
              {l.label}
            </button>
          ))}
          <button className="btn-cta" style={{ padding: '10px 22px', fontSize: 12 }} onClick={() => handleNav('contacto')}>
            Contacto <ArrowRight size={13} />
          </button>
          <button onClick={() => { setMenuOpen(true); document.body.style.overflow = 'hidden' }}
            className="hamburger-btn"
            style={{ display: 'none', background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden' }}>
        <VideoBackground />
        {/* NODO color overlay — azul marino + teal blend */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(135deg, rgba(0,40,80,0.72) 0%, rgba(0,80,80,0.55) 50%, rgba(0,51,102,0.65) 100%)',
          mixBlendMode: 'color',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse at 60% 40%, rgba(0,128,128,0.18) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        {/* Overlays */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, #021628 0%, rgba(2,22,40,0.82) 45%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, #021628 0%, rgba(2,22,40,0.6) 25%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(2,22,40,0.6) 0%, transparent 30%)', pointerEvents: 'none' }} />
        {/* Grid lines */}
        <div className="grid-line" style={{ left: '25%', zIndex: 2 }} />
        <div className="grid-line" style={{ left: '50%', zIndex: 2 }} />
        <div className="grid-line" style={{ left: '75%', zIndex: 2 }} />
        {/* Glow */}
        <svg style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', zIndex: 2, pointerEvents: 'none' }} width="900" height="220" viewBox="0 0 900 220" fill="none">
          <defs><filter id="ellipseGlow"><feGaussianBlur stdDeviation="25" /></filter></defs>
          <ellipse cx="450" cy="110" rx="380" ry="72" fill="rgba(0,128,100,0.22)" filter="url(#ellipseGlow)" />
          <ellipse cx="450" cy="110" rx="180" ry="36" fill="rgba(0,160,160,0.1)" filter="url(#ellipseGlow)" />
        </svg>

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 10,
          height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(100px,12vh,140px) clamp(24px,6vw,96px) 80px',
        }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, marginTop: 0 }}>
              <div style={{ width: 32, height: 1, background: '#00a0a0', opacity: 0.6 }} />
              <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00a0a0' }}>
                Información y Gestión de Datos
              </span>
            </div>
            <h1 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 'clamp(28px,3.8vw,56px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'white', marginBottom: 24 }}>
              Tus datos ya existen<span style={{ color: '#00a0a0' }}>.</span><br />
              Nosotros los hacemos trabajar<span style={{ color: '#00a0a0' }}>.</span>
            </h1>
            <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 21, fontWeight: 400, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', maxWidth: 900, marginBottom: 36 }}>
              Nuestra <strong style={{ color:'#ffffff',fontWeight:700 }}>filosofía</strong> se centra en <strong style={{ color:'#ffffff',fontWeight:700 }}>conectar datos, personas y decisiones</strong><br />
              mediante soluciones digitales inteligentes<br />
              que <strong style={{ color:'#ffffff',fontWeight:700 }}>impulsen el crecimiento de nuestros clientes.</strong>
            </p>
          </div>
        </div>



        {/* Ticker */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(2,22,40,0.8)', backdropFilter: 'blur(12px)',
          padding: '14px 0', overflow: 'hidden',
        }}>
          <div className="ticker-track">
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} style={{
                fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: i % 5 === 0 ? '#00a0a0' : 'rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', gap: 48,
              }}>
                {item}
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'inline-block' }} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          QUÉ HACEMOS
      ════════════════════════════════════════════ */}
      <section id="que-hacemos" className="full-section" style={{ background: '#031e30', padding: '0 clamp(24px,6vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00a0a0', marginBottom: 10 }}>Qué hacemos</div>
            <h2 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 8 }}>
              No somos una consultora genérica.
            </h2>
            <p style={{ fontFamily: 'Lato,sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 560, lineHeight: 1.5 }}>
              Somos especialistas en convertir datos dispersos en decisiones concretas.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="services-grid">
            {SERVICES.map(svc => (
              <div key={svc.title} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 10, padding: '20px 18px',
                transition: 'border-color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(0,160,160,0.3)'; el.style.background = 'rgba(0,160,160,0.03)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.background = 'rgba(255,255,255,0.03)' }}
              >
                <div style={{ width: 36, height: 36, background: 'rgba(0,160,160,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, color: '#00a0a0' }}>
                  {svc.icon}
                </div>
                <h3 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 14, color: 'white', marginBottom: 10 }}>{svc.title}</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {svc.items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontFamily: 'Lato,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
                      <CheckCircle size={13} color="#00a0a0" style={{ flexShrink: 0, marginTop: 2 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CÓMO LO HACEMOS
      ════════════════════════════════════════════ */}
      <section id="como-lo-hacemos" className="full-section" style={{ background: '#021628', padding: '0 clamp(24px,6vw,96px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00a0a0', marginBottom: 10 }}>Metodología</div>
            <h2 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Cómo lo hacemos
            </h2>
          </div>

          {/* Steps: círculos con línea + textos alineados debajo */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }} className="steps-grid">
            {STEPS.map((step, i) => (
              <div key={step.n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingRight: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 20 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                    background: i === 0 ? '#00a0a0' : 'rgba(0,160,160,0.08)',
                    border: `2px solid ${i === 0 ? '#00a0a0' : 'rgba(0,160,160,0.3)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 13, color: i === 0 ? '#021628' : '#00a0a0' }}>{step.n}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, height: 1, background: 'rgba(0,160,160,0.25)', marginLeft: 0 }} />
                  )}
                </div>
                <h3 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 15, color: 'white', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontFamily: 'Lato,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


            {/* ════════════════════════════════════════════
          HERRAMIENTAS
      ════════════════════════════════════════════ */}
      <section id="herramientas" className="full-section" style={{ background: '#021628', padding: '0 clamp(24px,6vw,96px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00a0a0', marginBottom: 10 }}>Stack tecnológico</div>
            <h2 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Herramientas
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }} className="tools-grid">
            {TOOLS.map(t => (
              <div key={t.name} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 8, padding: '13px 16px',
                display: 'flex', alignItems: 'flex-start', gap: 12,
                transition: 'border-color 0.2s, background 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(0,160,160,0.3)'; el.style.background = 'rgba(0,160,160,0.03)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.background = 'rgba(255,255,255,0.03)' }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00a0a0', flexShrink: 0, marginTop: 5 }} />
                <div>
                  <div style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 13, color: 'white', marginBottom: 3 }}>{t.name}</div>
                  <p style={{ fontFamily: 'Lato,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CONTACTO
      ════════════════════════════════════════════ */}
      <section id="contacto" className="full-section" style={{
        background: 'linear-gradient(135deg, #031e30 0%, #021628 100%)',
        padding: '0 clamp(24px,6vw,96px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* bg glow */}
        <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(0,160,160,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00a0a0', marginBottom: 16 }}>Empezá hoy</div>
            <h2 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'white', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}>
              La primera conversación<br />no te cuesta nada.
            </h2>
            <p style={{ fontFamily: 'Lato,sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
              Contanos qué pasa en tu negocio. En 30 minutos te decimos si podemos ayudarte y cuáles serían los próximos pasos.
            </p>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '48px 32px', background: 'rgba(0,160,160,0.08)', border: '1px solid rgba(0,160,160,0.25)', borderRadius: 12 }}>
              <CheckCircle size={48} color="#00a0a0" style={{ marginBottom: 16 }} />
              <h3 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 20, color: 'white', marginBottom: 8 }}>¡Mensaje enviado!</h3>
              <p style={{ fontFamily: 'Lato,sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.5)' }}>Te contactamos en menos de 24 horas.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { key: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
                { key: 'email',  label: 'Email',  type: 'email', placeholder: 'tu@empresa.com' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 8 }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={contactForm[f.key as keyof typeof contactForm]}
                    onChange={e => setContactForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
                      padding: '14px 16px', color: 'white', fontFamily: 'Lato,sans-serif', fontSize: 15,
                      outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(0,160,160,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 8 }}>Mensaje</label>
                <textarea
                  rows={4}
                  placeholder="Contanos brevemente qué necesitás..."
                  value={contactForm.mensaje}
                  onChange={e => setContactForm(p => ({ ...p, mensaje: e.target.value }))}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
                    padding: '14px 16px', color: 'white', fontFamily: 'Lato,sans-serif', fontSize: 15,
                    outline: 'none', resize: 'vertical', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(0,160,160,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
              <button className="btn-cta" style={{ alignSelf: 'flex-start', marginTop: 8 }}
                onClick={() => { if (contactForm.nombre && contactForm.email) setSent(true) }}>
                Enviar mensaje <ArrowRight size={15} />
              </button>
            </div>
          )}

          {/* Contact links */}
          <div style={{ display: 'flex', gap: 32, marginTop: 56, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: <Globe size={16} />, label: 'nodostudio.uy', href: 'https://nodostudio.uy' },
              { icon: <Mail size={16} />, label: 'hola@nodostudio.uy', href: 'mailto:hola@nodostudio.uy' },
              { icon: <Globe size={16} />, label: 'LinkedIn', href: 'https://www.linkedin.com/company/nodo-studio-uy/', target: '_blank', rel: 'noopener noreferrer' },
            ].map(l => (
              <a key={l.label} href={l.href} target={(l as any).target} rel={(l as any).rel} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Lato,sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00a0a0')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                {l.icon}{l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─── */}
      <footer style={{ background: '#011020', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '24px clamp(24px,6vw,96px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'Lato,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
            © 2025 NodoStudio · Uruguay · Información y Gestión de Datos
          </span>
        <a href="https://nodostudio.uy" style={{ fontFamily: 'Lato,sans-serif', fontSize: 13, color: 'rgba(0,160,160,0.6)', textDecoration: 'none' }}>nodostudio.uy</a>
      </footer>

      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(5px); }
        }
        .desktop-only { display: block; }
        @media (max-width: 768px) {
          .desktop-nav    { display: none !important; }
          .hamburger-btn  { display: flex !important; }
          .grid-line      { display: none; }
          .desktop-only   { display: none; }
          .float-card     { transform: translateY(-50px) scale(0.88) !important; }
        }
        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      {/* BOTÓN SCROLL FLOTANTE */}
      <button
        onClick={handleScrollBtn}
        style={{
          position: "fixed", bottom: 32, left: "50%",
          transform: "translateX(-50%)", zIndex: 200,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          background: "transparent", border: "none", cursor: "pointer",
          opacity: 0.5, transition: "opacity 0.2s", padding: 8,
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.5")}
      >
        <span style={{ fontFamily: "Inter,sans-serif", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "white" }}>
          {atBottom ? "INICIO" : "SCROLL"}
        </span>
        {atBottom
          ? <ChevronUp size={15} color="white" style={{ animation: "bounce-up 1.8s ease-in-out infinite" }} />
          : <ChevronDown size={15} color="white" style={{ animation: "bounce 1.8s ease-in-out infinite" }} />
        }
      </button>
    </div>
  )
}

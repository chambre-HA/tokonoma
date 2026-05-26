'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { PrincipleTopNav, PrincipleBottomNav } from '@/components/PrinciplePageNav'

const ACC = '#4a5878'   // deep indigo-slate — mystery, depth, the unknowable

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show"
      viewport={{ once: true, margin: '-60px' }} className={className}>
      {children}
    </motion.section>
  )
}
function FadeUp({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay } } }}
      className={className}>{children}</motion.div>
  )
}

// ─── SVG: Moonlit mountain with mist — classic yūgen imagery ────────────────
function MoonMistIllustration() {
  return (
    <svg viewBox="0 0 260 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[220px] mx-auto">
      {/* Night sky gradient suggestion */}
      <rect x="0" y="0" width="260" height="200" fill={ACC} opacity="0.05"/>

      {/* Moon — partially veiled */}
      <circle cx="185" cy="55" r="35" fill={ACC} opacity="0.1"/>
      <circle cx="185" cy="55" r="28" fill={ACC} opacity="0.12"/>
      <circle cx="185" cy="55" r="22" fill={ACC} opacity="0.15"/>
      <circle cx="185" cy="55" r="16" fill={ACC} opacity="0.25"/>
      {/* Moon veil — mist wisps across it */}
      <path d="M155 50 Q175 45 200 48 Q220 51 240 46" stroke="var(--paper-soft)" strokeWidth="4" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M148 58 Q170 54 195 57 Q215 60 240 56" stroke="var(--paper-soft)" strokeWidth="5" fill="none" opacity="0.35" strokeLinecap="round"/>

      {/* Distant mountains — layered */}
      <path d="M0 180 Q50 120 100 140 Q130 155 160 130 Q190 108 220 125 Q240 135 260 120 L260 200 L0 200Z"
        fill={ACC} opacity="0.18"/>
      <path d="M0 200 Q40 155 80 165 Q110 172 145 155 Q175 140 210 158 Q230 165 260 150 L260 220 L0 220Z"
        fill={ACC} opacity="0.25"/>
      <path d="M0 220 Q30 190 65 200 Q95 208 130 195 Q160 184 195 200 Q220 210 260 195 L260 240 L0 240Z"
        fill={ACC} opacity="0.35"/>

      {/* Mist layers between mountains */}
      <path d="M0 170 Q70 160 130 165 Q185 170 260 162" stroke="var(--paper)" strokeWidth="6" fill="none" opacity="0.35" strokeLinecap="round"/>
      <path d="M0 190 Q60 183 120 187 Q180 191 260 184" stroke="var(--paper)" strokeWidth="8" fill="none" opacity="0.3" strokeLinecap="round"/>
      <path d="M0 210 Q80 205 150 208 Q200 210 260 205" stroke="var(--paper)" strokeWidth="6" fill="none" opacity="0.25" strokeLinecap="round"/>

      {/* Pine tree silhouette — foreground right */}
      <line x1="220" y1="240" x2="220" y2="145" stroke={ACC} strokeWidth="2" opacity="0.5"/>
      <path d="M220 155 L205 175 L220 170 L235 175 Z" fill={ACC} opacity="0.4"/>
      <path d="M220 168 L202 190 L220 184 L238 190 Z" fill={ACC} opacity="0.45"/>
      <path d="M220 182 L200 205 L220 198 L240 205 Z" fill={ACC} opacity="0.5"/>

      {/* Lone boat on dark water — foreground left */}
      <path d="M30 238 Q50 232 70 238 L68 244 Q50 248 32 244 Z" fill={ACC} opacity="0.4"/>
      <line x1="50" y1="238" x2="50" y2="210" stroke={ACC} strokeWidth="0.8" opacity="0.35"/>
      <path d="M50 210 L35 228 L50 224 L65 228 Z" fill={ACC} opacity="0.2"/>
      {/* Lone figure */}
      <circle cx="50" cy="234" r="2" fill={ACC} opacity="0.4"/>

      {/* Water reflection */}
      <line x1="10" y1="250" x2="250" y2="250" stroke={ACC} strokeWidth="0.5" opacity="0.3"/>
      <line x1="10" y1="260" x2="250" y2="260" stroke={ACC} strokeWidth="0.4" opacity="0.2"/>
      <line x1="10" y1="268" x2="250" y2="268" stroke={ACC} strokeWidth="0.3" opacity="0.15"/>
      {/* Moon's reflection — broken on water */}
      <ellipse cx="185" cy="262" rx="12" ry="4" fill={ACC} opacity="0.15"/>
      <ellipse cx="185" cy="268" rx="8" ry="3" fill={ACC} opacity="0.1"/>
    </svg>
  )
}

// ─── SVG: Layers of depth diagram ────────────────────────────────────────────
function DepthDiagram() {
  return (
    <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[480px] mx-auto">
      {/* ─── Four nested depth zones ─── */}
      <rect x="18" y="22" width="384" height="296" rx="10" fill={ACC} fillOpacity="0.04" stroke={ACC} strokeWidth="0.9" opacity="0.55"/>
      <rect x="56" y="56" width="308" height="228" rx="10" fill={ACC} fillOpacity="0.06" stroke={ACC} strokeWidth="0.8" opacity="0.55"/>
      <rect x="100" y="92" width="220" height="156" rx="10" fill={ACC} fillOpacity="0.1" stroke={ACC} strokeWidth="0.85" opacity="0.6"/>
      <rect x="148" y="132" width="124" height="76" rx="9" fill={ACC} fillOpacity="0.2" stroke={ACC} strokeWidth="1.3" opacity="0.85"/>

      {/* ─── Atmospheric mist bands between layers ─── */}
      <line x1="24" y1="46" x2="394" y2="46" stroke={ACC} strokeWidth="0.5" opacity="0.18" strokeDasharray="2 4"/>
      <line x1="62" y1="78" x2="358" y2="78" stroke={ACC} strokeWidth="0.5" opacity="0.18" strokeDasharray="2 4"/>
      <line x1="106" y1="114" x2="314" y2="114" stroke={ACC} strokeWidth="0.5" opacity="0.18" strokeDasharray="2 4"/>

      {/* ─── Zone labels (top-left of each band) ─── */}
      <text x="32" y="42" fontSize="13" fill={ACC} fontFamily="'Noto Serif SC', serif" fontWeight="500" opacity="0.7">表象之美</text>
      <text x="70" y="76" fontSize="13" fill={ACC} fontFamily="'Noto Serif SC', serif" fontWeight="500" opacity="0.8">感知之境</text>
      <text x="114" y="110" fontSize="13" fill={ACC} fontFamily="'Noto Serif SC', serif" fontWeight="500" opacity="0.9">情感之深</text>

      {/* ─── Core ─── */}
      {/* Moon glow */}
      <circle cx="210" cy="170" r="18" fill={ACC} fillOpacity="0.12"/>
      <circle cx="210" cy="170" r="12" fill={ACC} fillOpacity="0.18"/>
      <circle cx="210" cy="170" r="6" fill={ACC} fillOpacity="0.32"/>
      {/* Mist wisp over moon */}
      <path d="M186 170 Q200 168 210 170 Q220 172 234 168" stroke="var(--paper)" strokeWidth="2" fill="none" opacity="0.5"/>

      {/* Core text — overlaid on the moon */}
      <text x="210" y="162" textAnchor="middle" fontSize="15" fill="var(--ink)" fontFamily="'Noto Serif SC', serif" fontWeight="500">幽玄之核</text>
      <text x="210" y="182" textAnchor="middle" fontSize="11" fill={ACC} fontFamily="'Noto Serif SC', serif" opacity="0.8" letterSpacing="1.5">言语难及</text>

      {/* ─── Descending arrow on right — "the deeper, the more profound" ─── */}
      <path d="M384 50 L384 290" stroke={ACC} strokeWidth="0.85" opacity="0.45" strokeDasharray="4 4"/>
      <path d="M379 286 L384 294 L389 286" stroke={ACC} strokeWidth="0.95" fill="none" opacity="0.55" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="395" y="170" fontSize="12" fill={ACC} fontFamily="'Noto Serif SC', serif" opacity="0.65" letterSpacing="2" transform="rotate(90 395 170)">愈深愈玄</text>

      {/* ─── Atmospheric scattered stars / particles ─── */}
      <circle cx="38" cy="80" r="0.8" fill={ACC} opacity="0.55"/>
      <circle cx="392" cy="100" r="0.85" fill={ACC} opacity="0.6"/>
      <circle cx="48" cy="260" r="0.7" fill={ACC} opacity="0.5"/>
      <circle cx="375" cy="246" r="0.75" fill={ACC} opacity="0.55"/>
      <circle cx="82" cy="170" r="0.65" fill={ACC} opacity="0.5"/>
      <circle cx="345" cy="184" r="0.7" fill={ACC} opacity="0.5"/>
      <circle cx="120" cy="240" r="0.55" fill={ACC} opacity="0.4"/>
      <circle cx="310" cy="252" r="0.6" fill={ACC} opacity="0.45"/>
    </svg>
  )
}

// ─── SVG: Noh theater stage ──────────────────────────────────────────────────
function NohIllustration() {
  return (
    <svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[200px] mx-auto">
      {/* Stage platform */}
      <rect x="20" y="140" width="200" height="12" rx="1" fill={ACC} opacity="0.15" stroke={ACC} strokeWidth="0.7"/>
      {/* Stage surface */}
      <rect x="20" y="100" width="200" height="42" rx="1" fill="var(--paper-soft)" opacity="0.5" stroke={ACC} strokeWidth="0.6"/>
      {/* Stage wood grain */}
      <line x1="20" y1="112" x2="220" y2="112" stroke={ACC} strokeWidth="0.4" opacity="0.2"/>
      <line x1="20" y1="124" x2="220" y2="124" stroke={ACC} strokeWidth="0.4" opacity="0.2"/>
      <line x1="20" y1="136" x2="220" y2="136" stroke={ACC} strokeWidth="0.4" opacity="0.2"/>

      {/* Pine tree backdrop — classic Noh backdrop */}
      <rect x="60" y="20" width="120" height="82" rx="1" fill="var(--paper-soft)" opacity="0.6" stroke={ACC} strokeWidth="0.6"/>
      {/* Pine tree painted on backdrop */}
      <line x1="120" y1="95" x2="120" y2="45" stroke="var(--tea-deep)" strokeWidth="2" opacity="0.4"/>
      <path d="M120 55 L100 75 L120 70 L140 75 Z" fill="var(--tea)" opacity="0.25"/>
      <path d="M120 66 L98 82 L120 77 L142 82 Z" fill="var(--tea)" opacity="0.3"/>
      <path d="M120 77 L96 92 L120 87 L144 92 Z" fill="var(--tea)" opacity="0.35"/>

      {/* Noh mask — center stage */}
      {/* Face oval */}
      <ellipse cx="120" cy="80" rx="20" ry="25" fill="var(--paper)" stroke={ACC} strokeWidth="0.8" opacity="0.9"/>
      {/* Eyes — narrow, slightly downcast */}
      <path d="M108 74 Q113 71 118 74" stroke={ACC} strokeWidth="0.8" fill="none" opacity="0.7"/>
      <path d="M122 74 Q127 71 132 74" stroke={ACC} strokeWidth="0.8" fill="none" opacity="0.7"/>
      {/* Subtle smile — ambiguous */}
      <path d="M110 88 Q120 93 130 88" stroke={ACC} strokeWidth="0.7" fill="none" opacity="0.6"/>
      {/* Gold accent line on mask */}
      <path d="M120 57 L120 65" stroke="var(--gold)" strokeWidth="0.8" opacity="0.5"/>
      {/* Mask crown decoration */}
      <path d="M105 60 Q120 54 135 60" stroke={ACC} strokeWidth="0.6" fill="none" opacity="0.4"/>

      {/* Performer's dark robe below mask */}
      <path d="M100 102 Q105 98 120 97 Q135 98 140 102 L145 140 Q120 145 95 140 Z"
        fill={ACC} opacity="0.15" stroke={ACC} strokeWidth="0.6"/>

      {/* Shadow on stage floor */}
      <ellipse cx="120" cy="140" rx="22" ry="5" fill={ACC} opacity="0.12"/>

      {/* Stage edge step */}
      <rect x="20" y="152" width="200" height="6" rx="1" fill={ACC} opacity="0.1"/>

      {/* Lanterns hanging — each side */}
      <rect x="30" y="25" width="12" height="20" rx="6" fill="var(--gold)" opacity="0.2" stroke="var(--gold)" strokeWidth="0.6"/>
      <line x1="36" y1="10" x2="36" y2="25" stroke={ACC} strokeWidth="0.5" opacity="0.4"/>
      <rect x="198" y="25" width="12" height="20" rx="6" fill="var(--gold)" opacity="0.2" stroke="var(--gold)" strokeWidth="0.6"/>
      <line x1="204" y1="10" x2="204" y2="25" stroke={ACC} strokeWidth="0.5" opacity="0.4"/>
    </svg>
  )
}

const spiritCards = [
  {
    title: '深邃难言',
    body: '幽玄不可被完全定义。它在语言之外——你感受得到，却无法用词句捕捉。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Concentric rings going inward — well of depth */}
        <circle cx="20" cy="20" r="12" stroke={ACC} strokeWidth="0.85" fill="none" opacity="0.3"/>
        <circle cx="20" cy="20" r="9" stroke={ACC} strokeWidth="1" fill="none" opacity="0.5"/>
        <circle cx="20" cy="20" r="6" stroke={ACC} strokeWidth="1.15" fill="none" opacity="0.7"/>
        <circle cx="20" cy="20" r="3.2" stroke={ACC} strokeWidth="1.3" fill={ACC} fillOpacity="0.55"/>
      </svg>
    ),
  },
  {
    title: '影中之美',
    body: '幽玄存在于半明半暗之处。完全的光明暴露一切；是阴影，给予事物神秘与深度。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Moon outline */}
        <circle cx="20" cy="20" r="9.5" stroke={ACC} strokeWidth="1.4" fill="none"/>
        {/* Shadow half — right side filled */}
        <path d="M 20 10.5 A 9.5 9.5 0 0 1 20 29.5 Z" fill={ACC} fillOpacity="0.55"/>
        {/* Mist wisps drifting over the bright half */}
        <path d="M7 15 Q12 13.5 15 15.5" stroke={ACC} strokeWidth="0.95" fill="none" strokeLinecap="round" opacity="0.6"/>
        <path d="M6 22 Q11 21 15 22.5" stroke={ACC} strokeWidth="0.85" fill="none" strokeLinecap="round" opacity="0.5"/>
        <path d="M8 27 Q12 26.2 14.5 27.5" stroke={ACC} strokeWidth="0.75" fill="none" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    title: '无限暗示',
    body: '不将一切说尽。留白、留暗、留沉默——让观者的内心走进那未尽之处，自行完成。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Path winding into the distance */}
        <path d="M9 27 Q15 22 22 18 Q27 16 31 14" stroke={ACC} strokeWidth="0.95" fill="none" strokeLinecap="round" strokeDasharray="1.8 1.5" opacity="0.55"/>
        {/* Markers receding — perspective fade */}
        <circle cx="11" cy="26" r="1.5" fill={ACC} opacity="0.9"/>
        <circle cx="16.5" cy="22" r="1.15" fill={ACC} opacity="0.65"/>
        <circle cx="22" cy="18.7" r="0.85" fill={ACC} opacity="0.42"/>
        <circle cx="26.5" cy="16" r="0.6" fill={ACC} opacity="0.26"/>
        <circle cx="30" cy="14" r="0.4" fill={ACC} opacity="0.15"/>
      </svg>
    ),
  },
  {
    title: '宇宙共鸣',
    body: '幽玄是个体与宇宙之间的震颤——在静默舞台、空寂庭院或雨夜的池塘边，突然感到自己微小又无限。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Resonance rings — connecting self with cosmos */}
        <circle cx="20" cy="20" r="5.5" stroke={ACC} strokeWidth="0.85" fill="none" opacity="0.5" strokeDasharray="2 2"/>
        <circle cx="20" cy="20" r="9" stroke={ACC} strokeWidth="0.7" fill="none" opacity="0.3" strokeDasharray="1.6 2.2"/>
        {/* Tiny self at center */}
        <circle cx="20" cy="20" r="1.5" fill={ACC}/>
        {/* Scattered stars at perimeter — asymmetric */}
        <circle cx="9.5" cy="12" r="0.85" fill={ACC} opacity="0.9"/>
        <circle cx="28.5" cy="9.5" r="0.7" fill={ACC} opacity="0.85"/>
        <circle cx="32" cy="22.5" r="0.6" fill={ACC} opacity="0.7"/>
        <circle cx="27" cy="30.5" r="0.7" fill={ACC} opacity="0.8"/>
        <circle cx="12" cy="29.5" r="0.65" fill={ACC} opacity="0.75"/>
        <circle cx="7.5" cy="19" r="0.55" fill={ACC} opacity="0.65"/>
        <circle cx="14.5" cy="9" r="0.45" fill={ACC} opacity="0.5"/>
      </svg>
    ),
  },
]

const applicationItems = [
  { label: '留有神秘', desc: '不将事物完全说明。让部分隐藏，留出空白，让观者主动走入其中探寻。' },
  { label: '以暗衬明', desc: '减少光源，让光变得珍贵。阴影是幽玄的居所，半明半暗自成意境。' },
  { label: '引而不发', desc: '触及感受，但不强迫结论。情感的弦，轻拨即可，留下回响悠长。' },
  { label: '感受渺小', desc: '站在山前、海边、星空之下，允许自己被广袤所淹没——渺小处见无限。' },
]

export default function YugenPage() {
  return (
    <main className="min-h-screen pb-32">

      <PrincipleTopNav slug="yugen" />

      {/* ── HERO ── */}
      <Section className="max-w-[900px] mx-auto px-6 pt-10 pb-16 md:pb-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <FadeUp>
              <span className="seal text-[10px] tracking-[0.15em] mb-5 inline-block" style={{ background: '#4a5878', color: 'var(--paper)', opacity: 0.88, fontFamily: 'Noto Serif SC, serif', fontWeight: 500 }}>
                深不可测，言语难及
              </span>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="text-6xl md:text-7xl font-light text-[var(--ink)] leading-none tracking-wide mb-3">
                幽玄
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-sm text-[var(--ink-mute)] tracking-[0.25em] mb-7">
                ゆうげん | Yūgen
              </p>
              <div className="brush-divider w-20 mb-7" />
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-lg md:text-xl font-light text-[var(--ink-soft)] leading-[2.1] mb-5" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                幽玄是一种对宇宙深邃之美的感知——它超越语言，触及人心最深处那无法命名的震颤。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.9]">
                它不在光天化日之下，而在薄雾笼罩的山谷、面具背后的沉默，以及夜晚独望池水时，那种既渺小又无边的感觉。
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="flex justify-center">
            <Image src="/hero-yugen.png" alt="幽玄 — Yugen" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
          </FadeUp>
        </div>
      </Section>

      {/* ── Spirit ── */}
      <section style={{ background: 'var(--paper-soft)', borderTop: '1px solid var(--paper-deep)', borderBottom: '1px solid var(--paper-deep)' }}
               className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">essence</p>
            <h2 className="text-2xl font-light text-[var(--ink)] mb-8 tracking-wide">幽玄的精神</h2>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {spiritCards.map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.08}>
                <div className="neumorph p-5 text-center h-full flex flex-col items-center gap-3"
                     style={{ borderTop: `2px solid ${ACC}` }}>
                  {card.icon}
                  <h3 className="text-base font-medium text-[var(--ink)]"
                      style={{ fontFamily: "'Noto Serif SC', serif" }}>{card.title}</h3>
                  <p className="text-sm text-[var(--ink-mute)] leading-relaxed">{card.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Section>
      </section>

      {/* ── Diagram + Application ── */}
      <Section className="max-w-[900px] mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">composition</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-6 tracking-wide">幽玄的层次</h2>
            <div style={{ border: '1px solid var(--paper-deep)', padding: '24px', background: 'var(--paper)' }}>
              <DepthDiagram />
            </div>
            <p className="text-[10px] text-[var(--ink-mute)] text-center mt-4 tracking-wider">
              每一层，都是对更深处的邀请
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">practice</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-6 tracking-wide">幽玄的运用</h2>
            <ol>
              {applicationItems.map((item, i) => (
                <li key={item.label} className="flex gap-4 items-start py-5"
                    style={{ borderBottom: i < applicationItems.length - 1 ? '1px solid var(--paper-deep)' : 'none' }}>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold"
                        style={{ background: ACC, color: '#fff' }}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-base font-medium text-[var(--ink)] mb-1"
                       style={{ fontFamily: "'Noto Serif SC', serif" }}>{item.label}</p>
                    <p className="text-sm text-[var(--ink-mute)] leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeUp>
        </div>
      </Section>

      {/* ── Life section ── */}
      <section style={{ background: 'var(--paper-deep)', borderTop: '1px solid var(--paper-deep)' }}
               className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeUp className="flex justify-center">
              <Image src="/everyday-yugen.png" alt="幽玄 — everyday" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-2xl font-light text-[var(--ink)] mb-5 tracking-wide"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}>生活中的幽玄</h2>
              <p className="text-base text-[var(--ink-soft)] leading-[1.9] mb-4">
                幽玄是静默艺术的灵魂——面具之后是什么表情，始终无法确知。它也是空寂庭院里那些沉默的石头，和短诗中那个没有被说出的字。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.85] mb-8">
                当你独处于黄昏的庭院，忽然感到一种说不清的深邃与宁静——那便是幽玄的造访。
              </p>
              <div style={{ borderLeft: `3px solid ${ACC}`, background: 'var(--paper-soft)', padding: '16px 20px' }}>
                <p className="text-base text-[var(--ink-soft)] leading-[1.9] italic"
                   style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>
                  幽玄不必解释。只需一颗愿意在黑暗中静待的心，等那不可言说的，悄然降临。
                </p>
              </div>
            </FadeUp>
          </div>
        </Section>
      </section>

      <PrincipleBottomNav slug="yugen" />
    </main>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { PrincipleTopNav, PrincipleBottomNav } from '@/components/PrinciplePageNav'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

function FadeUp({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── SVG: Moon-gate window with borrowed mountain view ───────────────────────
function MoonGateIllustration() {
  return (
    <svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[210px] mx-auto">
      {/* Shoji wall background */}
      <rect x="10" y="10" width="220" height="240" rx="4" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      {/* Shoji grid lines — vertical */}
      {[50, 90, 130, 170, 210].map(x => (
        <line key={x} x1={x} y1="10" x2={x} y2="250" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.35"/>
      ))}
      {/* Shoji grid lines — horizontal */}
      {[50, 90, 130, 170, 210].map(y => (
        <line key={y} x1="10" y1={y} x2="230" y2={y} stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.35"/>
      ))}
      {/* Moon gate circle — clip mask */}
      <defs>
        <clipPath id="moonGate">
          <circle cx="120" cy="128" r="80"/>
        </clipPath>
      </defs>
      {/* Sky through moon gate */}
      <circle cx="120" cy="128" r="80" fill="#dde8f0" opacity="0.6"/>
      {/* Distant mountains */}
      <g clipPath="url(#moonGate)">
        <rect x="40" y="40" width="160" height="168" fill="#c8d8e8" opacity="0.5"/>
        {/* Sky gradient suggestion */}
        <rect x="40" y="40" width="160" height="90" fill="#dde8f0" opacity="0.6"/>
        {/* Far mountain — Fuji silhouette */}
        <path d="M60 180 L120 80 L180 180 Z" fill="var(--paper-deep)" opacity="0.55"/>
        <path d="M95 100 L120 80 L145 100" fill="var(--paper)" opacity="0.7"/>
        {/* Mid mountain left */}
        <path d="M40 200 L80 145 L120 200 Z" fill="var(--ink-mute)" opacity="0.2"/>
        {/* Mid mountain right */}
        <path d="M120 200 L165 148 L210 200 Z" fill="var(--ink-mute)" opacity="0.18"/>
        {/* Pagoda silhouette */}
        <rect x="148" y="158" width="6" height="20" fill="var(--ink)" opacity="0.25"/>
        <path d="M144 160 L154 160 L151 155 Z" fill="var(--ink)" opacity="0.25"/>
        <path d="M145 165 L155 165 L152 161 Z" fill="var(--ink)" opacity="0.2"/>
        {/* Mist band */}
        <rect x="40" y="168" width="160" height="18" fill="var(--paper)" opacity="0.4"/>
        {/* Ground/water reflection */}
        <rect x="40" y="185" width="160" height="23" fill="var(--paper-soft)" opacity="0.35"/>
      </g>
      {/* Moon gate ring */}
      <circle cx="120" cy="128" r="80" stroke="var(--ink)" strokeWidth="6" fill="none"/>
      <circle cx="120" cy="128" r="76" stroke="var(--paper-soft)" strokeWidth="2" fill="none" opacity="0.5"/>

      {/* Bamboo stalks — right edge */}
      <line x1="208" y1="10" x2="208" y2="250" stroke="var(--tea)" strokeWidth="3" opacity="0.35"/>
      <line x1="215" y1="10" x2="215" y2="250" stroke="var(--tea)" strokeWidth="2" opacity="0.2"/>
      {/* Bamboo nodes */}
      {[50, 100, 150, 200].map(y => (
        <line key={y} x1="205" y1={y} x2="211" y2={y} stroke="var(--tea-deep)" strokeWidth="1" opacity="0.4"/>
      ))}
      {/* Bamboo leaves */}
      <path d="M208 70 C220 60 235 55 228 48" stroke="var(--tea)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M208 75 C222 78 232 72 230 62" stroke="var(--tea)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>

      {/* Small scroll on left wall */}
      <rect x="22" y="30" width="20" height="60" rx="1" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.6" opacity="0.7"/>
      <text x="32" y="52" fontSize="5.5" fill="var(--ink-soft)" fontFamily="Noto Serif SC, serif" writingMode="vertical-rl" textAnchor="middle" letterSpacing="2" opacity="0.8">借景如画</text>
    </svg>
  )
}

// ─── SVG: Room diagram with borrowed scenery ─────────────────────────────────
function RoomDiagram() {
  return (
    <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[460px] mx-auto">
      {/* Sky outside the window — soft tint */}
      <rect x="0" y="0" width="400" height="280" fill="var(--paper-soft)" opacity="0.3"/>

      {/* Room floor — receding perspective */}
      <path d="M28 256 L200 188 L372 256 Z" fill="var(--paper-deep)" opacity="0.35"/>
      <line x1="28" y1="256" x2="372" y2="256" stroke="var(--ink-mute)" strokeWidth="0.8" opacity="0.5"/>
      {/* Floor mat lines */}
      <line x1="92" y1="256" x2="200" y2="196" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.3"/>
      <line x1="156" y1="256" x2="200" y2="192" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.3"/>
      <line x1="244" y1="256" x2="200" y2="192" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.3"/>
      <line x1="308" y1="256" x2="200" y2="196" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.3"/>

      {/* Back wall */}
      <path d="M80 22 L80 188 L320 188 L320 22 Z" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="1"/>

      {/* Wall pillars */}
      <rect x="72" y="22" width="10" height="166" fill="var(--ink)" opacity="0.1"/>
      <rect x="318" y="22" width="10" height="166" fill="var(--ink)" opacity="0.1"/>

      {/* Shoji window frame */}
      <rect x="110" y="40" width="180" height="130" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5"/>
      {/* Window grid */}
      <line x1="200" y1="40" x2="200" y2="170" stroke="var(--ink-soft)" strokeWidth="0.8" opacity="0.55"/>
      <line x1="155" y1="40" x2="155" y2="170" stroke="var(--ink-mute)" strokeWidth="0.55" opacity="0.4"/>
      <line x1="245" y1="40" x2="245" y2="170" stroke="var(--ink-mute)" strokeWidth="0.55" opacity="0.4"/>
      <line x1="110" y1="105" x2="290" y2="105" stroke="var(--ink-soft)" strokeWidth="0.8" opacity="0.55"/>
      <line x1="110" y1="75" x2="290" y2="75" stroke="var(--ink-mute)" strokeWidth="0.55" opacity="0.4"/>
      <line x1="110" y1="138" x2="290" y2="138" stroke="var(--ink-mute)" strokeWidth="0.55" opacity="0.4"/>

      {/* Mountain view through window — lower pane */}
      <rect x="111" y="106" width="178" height="63" fill="#d8e4ec" opacity="0.55"/>
      {/* Far mountain — paler */}
      <path d="M111 165 L145 122 L175 142 L210 110 L245 138 L289 165 Z" fill="var(--ink-mute)" opacity="0.28"/>
      {/* Near mountain — deeper */}
      <path d="M111 168 L155 138 L210 158 L260 132 L289 168 Z" fill="var(--ink-soft)" opacity="0.22"/>
      {/* Mist band */}
      <rect x="111" y="150" width="178" height="14" fill="var(--paper)" opacity="0.45"/>
      {/* Distant sun */}
      <circle cx="232" cy="92" r="6" stroke="var(--gold)" strokeWidth="1" fill="var(--gold)" fillOpacity="0.18" opacity="0.7"/>

      {/* Cushion on floor */}
      <ellipse cx="135" cy="238" rx="24" ry="8" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.8" opacity="0.7"/>
      <ellipse cx="135" cy="236" rx="20" ry="6" fill="none" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.5"/>

      {/* ──────── Labels ──────── */}
      {/* 窗框 (window frame) */}
      <line x1="290" y1="60" x2="338" y2="48" stroke="var(--ink-mute)" strokeWidth="0.8" strokeDasharray="3 3"/>
      <text x="340" y="46" fontSize="12" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500">窗框</text>
      <text x="340" y="58" fontSize="9" fill="var(--ink-mute)" fontFamily="Inter, sans-serif" letterSpacing="1">(MADO)</text>

      {/* 远山借景 (borrowed distant mountains) — pointing into the view */}
      <line x1="220" y1="135" x2="305" y2="120" stroke="var(--tea-deep)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7"/>
      <text x="308" y="118" fontSize="12" fill="var(--tea-deep)" fontFamily="'Noto Serif SC', serif" fontWeight="500">远山借景</text>
      <text x="308" y="131" fontSize="9" fill="var(--tea-deep)" fontFamily="Inter, sans-serif" opacity="0.75" letterSpacing="1">(SHAKKEI)</text>

      {/* 室内空间 (interior space) */}
      <text x="34" y="244" fontSize="11" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500">室内空间</text>
      <text x="34" y="256" fontSize="8.5" fill="var(--ink-mute)" fontFamily="Inter, sans-serif" letterSpacing="1">(INTERIOR)</text>

      {/* 遮挡处理 (foreground framing) */}
      <line x1="318" y1="200" x2="358" y2="220" stroke="var(--ink-mute)" strokeWidth="0.8" strokeDasharray="3 3"/>
      <text x="358" y="232" fontSize="11" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500" textAnchor="end">遮挡处理</text>
      <text x="358" y="244" fontSize="8.5" fill="var(--ink-mute)" fontFamily="Inter, sans-serif" textAnchor="end" letterSpacing="1">(FOREGROUND)</text>
    </svg>
  )
}

// ─── SVG: Room with scroll ───────────────────────────────────────────────────
function ScrollRoom() {
  return (
    <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[160px] mx-auto">
      <rect x="10" y="10" width="180" height="148" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="1"/>
      <path d="M10 158 L190 158 L210 220 L-10 220 Z" fill="var(--paper-deep)" opacity="0.45"/>
      <line x1="10" y1="178" x2="190" y2="178" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.35"/>
      <line x1="100" y1="158" x2="100" y2="220" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.25"/>
      <rect x="40" y="10" width="120" height="146" fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <rect x="78" y="22" width="44" height="108" rx="2" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <rect x="74" y="20" width="52" height="5" rx="2.5" fill="var(--ink)" opacity="0.2"/>
      <rect x="74" y="126" width="52" height="5" rx="2.5" fill="var(--ink)" opacity="0.2"/>
      <text x="96" y="48" fontSize="8.5" fill="var(--ink-soft)" fontFamily="Noto Serif SC, serif" writingMode="vertical-rl" textAnchor="middle" letterSpacing="3">借景如画</text>
      <ellipse cx="100" cy="156" rx="13" ry="7" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <rect x="93" y="143" width="14" height="14" rx="3" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <path d="M100 143 C97 133 90 123 85 113" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="85" cy="112" r="3" stroke="var(--plum)" strokeWidth="0.8" fill="var(--paper)"/>
    </svg>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconMerge = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--gold)" strokeWidth="1.2"/>
    {/* Implied wall — dashed vertical line */}
    <line x1="20" y1="11" x2="20" y2="29" stroke="var(--gold)" strokeWidth="0.9" opacity="0.5" strokeDasharray="1.8 1.8"/>
    {/* Mountain range crossing the boundary uninterrupted */}
    <path d="M10 26 L15 17 L20 21.5 L26 14 L30 26" stroke="var(--gold)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Closer ridge — partial echo */}
    <path d="M12 26 L17 21 L22 26" stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IconExpand = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--gold)" strokeWidth="1.2"/>
    {/* Far range — palest */}
    <path d="M9 17 L14 12.5 L19 17 L25 13.5 L31 17" stroke="var(--gold)" strokeWidth="0.85" fill="none" opacity="0.4" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Middle range */}
    <path d="M9 22 L15 16.5 L21 22 L26 18 L31 22" stroke="var(--gold)" strokeWidth="1.05" fill="none" opacity="0.7" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Near range — boldest */}
    <path d="M9 27 L14 21 L20 27 L25 23 L31 27" stroke="var(--gold)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IconFrame = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--gold)" strokeWidth="1.2"/>
    {/* Moon window — round aperture in wall */}
    <circle cx="20" cy="20" r="8" stroke="var(--gold)" strokeWidth="1.4" fill="none"/>
    {/* Distant mountain visible through window */}
    <path d="M13.5 24 L17.5 19 L21 22 L25 17.5 L26.5 24 Z" fill="var(--gold)" fillOpacity="0.2" stroke="var(--gold)" strokeWidth="0.95" strokeLinejoin="round"/>
    {/* Small distant moon/sun */}
    <circle cx="22.5" cy="16.5" r="1.5" stroke="var(--gold)" strokeWidth="0.9" fill="none" opacity="0.75"/>
  </svg>
)
const IconNature = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--gold)" strokeWidth="1.2"/>
    {/* Large mountain — nature's scale */}
    <path d="M9 28 L17 13.5 L22 21 L27 11.5 L31 28 Z" stroke="var(--gold)" strokeWidth="1.25" fill="none" strokeLinejoin="round"/>
    {/* Small humble house at the foot — borrowed view, not possession */}
    <path d="M13 27.6 L13 25.7 L15.5 24 L18 25.7 L18 27.6" stroke="var(--gold)" strokeWidth="1" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    {/* Ground line */}
    <line x1="9.5" y1="28" x2="30.5" y2="28" stroke="var(--gold)" strokeWidth="0.8" opacity="0.45" strokeLinecap="round"/>
  </svg>
)

const spiritCards = [
  { Icon: IconMerge,  title: '融和一体', desc: '打破室内与室外的界限。让空间蓬宽更开阔、更有生命力。' },
  { Icon: IconExpand, title: '扩展视野', desc: '利用远景增加空间的深度和广度。创造丰富的视觉层次感。' },
  { Icon: IconFrame,  title: '框景艺术', desc: '通过建筑结构精妙地截取自然的一角。让景色如画般呈现。' },
  { Icon: IconNature, title: '尊重自然', desc: '借而不占，以恭敬之心享受大自然的馈赠。体现天人合一。' },
]

const applicationItems = [
  { title: '景点的选择', desc: '精选具有美学价值的远景，让自然的精彩成为画面的灵魂。' },
  { title: '遮挡与衬托', desc: '巧妙遮挡不协调处，用近景衬托远景，让画面层次分明而不杂乱。' },
  { title: '时令的变化', desc: '考虑不同季节和时间的景色变化，让借景随时令自然流转生姿。' },
  { title: '比例与平衡', desc: '控制框内景色与室内环境的比例，让两者相映而不喧宾夺主。' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function JiejingPage() {
  return (
    <main className="min-h-screen pb-32" style={{ position: 'relative', zIndex: 1 }}>

      <PrincipleTopNav slug="jiejing" />

      {/* ── HERO — open layout ─────────────────────────────────────────────── */}
      <Section className="max-w-[900px] mx-auto px-6 pt-14 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <FadeUp>
              <span className="seal text-[10px] tracking-[0.15em] mb-5 inline-block" style={{ background: 'var(--gold)', color: 'var(--paper)', opacity: 0.88, fontFamily: 'Noto Serif SC, serif', fontWeight: 500 }}>
                远山皆为我用
              </span>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="text-6xl md:text-7xl font-light text-[var(--ink)] leading-none tracking-[0.15em] mb-3">
                借景
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-sm text-[var(--ink-mute)] tracking-[0.25em] mb-7">
                しゃっけい | Shakkei
              </p>
              <div className="brush-divider w-20 mb-7" />
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-lg md:text-xl font-light text-[var(--ink-soft)] leading-[2.1] mb-5 max-w-[480px]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                借景是把远处的山峦、树影、天光或云气，引入眼前空间的一种方式。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.9] max-w-[480px]">
                它不只是借来一幅风景，更是让有限之所与更广阔的自然彼此相通。
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="flex items-center justify-center md:justify-end">
            <Image src="/hero-Shakkei.png" alt="借景 — Jiejing" width={640} height={640} className="w-full max-w-[560px] mx-auto object-contain" />
          </FadeUp>
        </div>
      </Section>

      {/* ── 借景的精神 — tinted band, accent-bar cards ─────────────────────── */}
      <section style={{ background: 'var(--paper-soft)' }} className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <FadeUp className="mb-10">
            <p className="font-sans-zen text-[10px] tracking-[0.5em] text-[var(--ink-mute)] uppercase mb-2">essence</p>
            <h2 className="text-2xl font-light text-[var(--ink)] tracking-[0.12em]">借景的精神</h2>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {spiritCards.map(({ Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <div className="bg-[var(--paper)] rounded-xl p-5 h-full flex flex-col items-center text-center"
                  style={{ borderTop: '2px solid var(--gold)' }}>
                  <div className="mb-4">
                    <Icon />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--ink)] mb-2" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                    {title}
                  </h3>
                  <p className="text-sm text-[var(--ink-mute)] leading-relaxed flex-1">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Section>
      </section>

      {/* ── 运用要素 — open, thin border diagram + hairline list ───────────── */}
      <Section className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">composition</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-7 tracking-wide">借景的运用要素</h2>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--paper-deep)' }}>
              <RoomDiagram />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">practice</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-8 tracking-wide">运用的要素</h2>
            <div className="flex flex-col gap-0">
              {applicationItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, x: 14 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 } },
                  }}
                  className="flex gap-5 py-5"
                  style={{ borderBottom: i < applicationItems.length - 1 ? '1px solid var(--paper-deep)' : 'none' }}
                >
                  <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold"
                    style={{ background: 'var(--gold)', color: '#fff' }}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-[var(--ink)] mb-1.5" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--ink-mute)] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ── 生活中的借景 — deep paper band, left-border quote ──────────────── */}
      <section style={{ background: 'var(--paper-deep)', opacity: 1 }}>
        <Section className="max-w-[900px] mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeUp className="flex justify-center">
              <Image src="/everyday-Shakkei.png" alt="借景 — everyday" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">everyday</p>
              <h2 className="text-2xl font-light text-[var(--ink)] mb-5 tracking-wide">生活中的借景</h2>
              <p className="text-[var(--ink-soft)] leading-[2.1] mb-4 text-base md:text-lg" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                借景不仅限于庭院。一扇窗户、一个阳台，甚至邻家的古树——都能成为借景的媒介，让小家拥抱大自然。
              </p>
              <p className="text-[var(--ink-mute)] leading-[2.1] mb-8 text-base" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                借而不占，以恭敬之心享用自然的馈赠——视野因此变得宽广，心也随之舒展。
              </p>
              <blockquote className="pl-5 py-1" style={{ borderLeft: '2px solid var(--plum)' }}>
                <p className="text-base text-[var(--ink-soft)] leading-[2] italic" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                  借景不在于拥有，而在于眼界——懂得借的人，身处斗室，也能坐拥山河。
                </p>
              </blockquote>
            </FadeUp>
          </div>
        </Section>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <PrincipleBottomNav slug="jiejing" />
    </main>
  )
}

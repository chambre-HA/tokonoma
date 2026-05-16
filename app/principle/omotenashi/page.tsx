'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { PrincipleTopNav, PrincipleBottomNav } from '@/components/PrinciplePageNav'

const ACC = '#a05848'   // warm cinnabar — torii gate, hearth, welcome

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

// ─── SVG: Roji — the dewy garden path to the tea house ──────────────────────
function RojiIllustration() {
  return (
    <svg viewBox="0 0 260 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[220px] mx-auto">

      {/* Sky / background — soft warm paper tone */}
      <rect x="0" y="0" width="260" height="130" fill={ACC} opacity="0.04" rx="2"/>

      {/* Tea house — back wall with simple shoji window */}
      <rect x="40" y="30" width="180" height="100" rx="2"
        fill="var(--paper-soft)" stroke="var(--ink-soft)" strokeWidth="1" opacity="0.6"/>
      {/* Roof overhang */}
      <path d="M30 30 L130 15 L230 30" stroke="var(--ink-soft)" strokeWidth="1.2" fill="var(--paper-deep)" opacity="0.5"/>
      {/* Shoji screen grid */}
      <rect x="60" y="50" width="60" height="60" rx="1" fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.7"/>
      <line x1="80" y1="50" x2="80" y2="110" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.4"/>
      <line x1="100" y1="50" x2="100" y2="110" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.4"/>
      <line x1="60" y1="70" x2="120" y2="70" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.4"/>
      <line x1="60" y1="90" x2="120" y2="90" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.4"/>
      {/* Warm light through shoji — host is within */}
      <rect x="61" y="51" width="58" height="58" fill={ACC} opacity="0.07" rx="1"/>
      {/* Nijiriguchi — low crawl entrance, right side */}
      <rect x="155" y="85" width="32" height="38" rx="1"
        fill="var(--ink)" opacity="0.15" stroke="var(--ink-soft)" strokeWidth="0.8"/>
      <rect x="158" y="88" width="26" height="32" rx="1" fill="var(--paper-deep)" opacity="0.4"/>

      {/* Tsukubai — stone water basin, left of path */}
      <ellipse cx="50" cy="185" rx="20" ry="10" fill="var(--paper-deep)" stroke="var(--ink-soft)" strokeWidth="0.8" opacity="0.7"/>
      <ellipse cx="50" cy="183" rx="14" ry="6" fill={ACC} opacity="0.1" stroke={ACC} strokeWidth="0.5"/>
      {/* Water surface ripple */}
      <ellipse cx="50" cy="183" rx="7" ry="3" stroke={ACC} strokeWidth="0.5" fill="none" opacity="0.4"/>
      {/* Bamboo ladle */}
      <line x1="38" y1="172" x2="62" y2="184" stroke="var(--tea)" strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>
      <ellipse cx="62" cy="184" rx="5" ry="3" fill="var(--paper)" stroke="var(--tea)" strokeWidth="0.7" opacity="0.5"/>
      {/* Stone base */}
      <ellipse cx="50" cy="192" rx="22" ry="8" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.6" opacity="0.5"/>

      {/* Roji path — irregular stepping stones */}
      {[
        { cx: 140, cy: 270, rx: 22, ry: 10, rot: -5 },
        { cx: 128, cy: 245, rx: 18, ry: 9, rot: 8 },
        { cx: 142, cy: 218, rx: 20, ry: 9, rot: -3 },
        { cx: 135, cy: 192, rx: 16, ry: 8, rot: 6 },
        { cx: 148, cy: 168, rx: 18, ry: 8, rot: -8 },
        { cx: 155, cy: 143, rx: 14, ry: 7, rot: 5 },
        { cx: 162, cy: 120, rx: 12, ry: 6, rot: -4 },
      ].map((s, i) => (
        <g key={i} transform={`rotate(${s.rot} ${s.cx} ${s.cy})`}>
          <ellipse cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry}
            fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.7"
            opacity={0.75 - i * 0.03}/>
          {/* Stone texture */}
          <path d={`M${s.cx - s.rx * 0.5} ${s.cy - 1} Q${s.cx} ${s.cy - 3} ${s.cx + s.rx * 0.4} ${s.cy - 1}`}
            stroke="var(--ink-mute)" strokeWidth="0.4" fill="none" opacity="0.3"/>
        </g>
      ))}

      {/* Moss between stones */}
      <ellipse cx="115" cy="255" rx="8" ry="4" fill="var(--tea)" opacity="0.2"/>
      <ellipse cx="160" cy="232" rx="6" ry="3" fill="var(--tea)" opacity="0.18"/>
      <ellipse cx="108" cy="205" rx="7" ry="3" fill="var(--tea)" opacity="0.15"/>
      <ellipse cx="172" cy="178" rx="5" ry="2.5" fill="var(--tea)" opacity="0.18"/>

      {/* Stone lantern beside path */}
      <rect x="96" y="168" width="14" height="18" rx="1" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.7"/>
      <rect x="93" y="165" width="20" height="5" rx="1" fill="var(--ink-soft)" opacity="0.3"/>
      <rect x="98" y="186" width="10" height="5" rx="1" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.6" opacity="0.5"/>
      <rect x="100" y="191" width="6" height="18" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.6" opacity="0.4"/>
      {/* Lantern warm glow */}
      <rect x="97" y="170" width="12" height="12" fill={ACC} opacity="0.15" rx="1"/>

      {/* Pine & bamboo framing the path */}
      <line x1="210" y1="290" x2="210" y2="160" stroke="var(--tea)" strokeWidth="2" opacity="0.35"/>
      <line x1="216" y1="290" x2="216" y2="180" stroke="var(--tea)" strokeWidth="1.5" opacity="0.28"/>
      <line x1="210" y1="210" x2="216" y2="210" stroke="var(--tea)" strokeWidth="0.8" opacity="0.4"/>
      <line x1="210" y1="240" x2="216" y2="240" stroke="var(--tea)" strokeWidth="0.8" opacity="0.4"/>
      {/* Bamboo leaves */}
      <path d="M210 175 Q200 165 193 158" stroke="var(--tea)" strokeWidth="0.9" fill="none" opacity="0.45" strokeLinecap="round"/>
      <path d="M210 175 Q202 170 198 163" stroke="var(--tea)" strokeWidth="0.7" fill="none" opacity="0.35" strokeLinecap="round"/>

      {/* Dew drops on stones */}
      <circle cx="133" cy="243" r="1.2" fill={ACC} opacity="0.4"/>
      <circle cx="145" cy="216" r="1" fill={ACC} opacity="0.35"/>
      <circle cx="138" cy="190" r="1.2" fill={ACC} opacity="0.3"/>
    </svg>
  )
}

// ─── SVG: The guest journey — 迎待共送 ──────────────────────────────────────
function GuestJourneyDiagram() {
  const stages = [
    { kanji: '迎', pinyin: '迎接', desc: '庭院已洒扫\n灯已燃起', x: 50 },
    { kanji: '待', pinyin: '相聚', desc: '一切恰到好处\n不言而喻', x: 140 },
    { kanji: '共', pinyin: '共享', desc: '此刻的茶\n此刻的心', x: 230 },
    { kanji: '送', pinyin: '送别', desc: '目送背影\n直至不见', x: 320 },
  ]
  return (
    <svg viewBox="0 0 370 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[380px] mx-auto">
      {/* Connecting path — the journey line */}
      <path d="M50 100 L320 100" stroke={ACC} strokeWidth="1.1" opacity="0.35" strokeDasharray="5 4"/>

      {stages.map((s, i) => (
        <g key={i}>
          {/* Circle node */}
          <circle cx={s.x} cy={100} r={28}
            fill="var(--paper-soft)" stroke={ACC} strokeWidth={i === 0 || i === 3 ? 1.4 : 1}
            opacity={i === 0 || i === 3 ? 0.9 : 0.7}/>
          {/* Kanji in circle */}
          <text x={s.x} y={107} textAnchor="middle" fontSize="22" fontWeight="300"
            fill={i === 0 ? ACC : 'var(--ink)'} opacity={i === 0 ? 1 : 0.78}
            fontFamily="'Noto Serif SC', serif">{s.kanji}</text>

          {/* Stage label above */}
          <text x={s.x} y={62} textAnchor="middle" fontSize="13"
            fill={ACC} fontFamily="'Noto Serif SC', serif" opacity="0.85">{s.pinyin}</text>

          {/* Description below — two lines */}
          {s.desc.split('\n').map((line, j) => (
            <text key={j} x={s.x} y={148 + j * 16} textAnchor="middle" fontSize="11"
              fill="var(--ink-mute)" fontFamily="'Noto Serif SC', serif">{line}</text>
          ))}

          {/* Arrow between stages */}
          {i < 3 && (
            <path d={`M${s.x + 28} 100 L${s.x + 62} 100`}
              stroke={ACC} strokeWidth="1" fill="none" opacity="0.45"
              markerEnd="url(#arr)"/>
          )}
        </g>
      ))}

      {/* Arrow marker */}
      <defs>
        <marker id="arr" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
          <path d="M0 1 L5 3.5 L0 6" stroke={ACC} strokeWidth="1" fill="none" opacity="0.7"/>
        </marker>
      </defs>

      {/* 一期一会 label arcing below the whole journey */}
      <path d="M50 200 Q185 218 320 200" stroke={ACC} strokeWidth="0.8" fill="none" opacity="0.35" strokeDasharray="4 4"/>
      <text x="185" y="226" textAnchor="middle" fontSize="12" fill={ACC} opacity="0.7"
        fontFamily="'Noto Serif SC', serif">一期一会 — 此生唯此一次</text>
    </svg>
  )
}

// ─── SVG: Tea ceremony — host serving, guest receiving ──────────────────────
function TeaCeremonyIllustration() {
  return (
    <svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[200px] mx-auto">

      {/* Tatami floor */}
      <rect x="0" y="150" width="240" height="60" fill="var(--paper-soft)" opacity="0.5"/>
      <line x1="0" y1="162" x2="240" y2="162" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.3"/>
      <line x1="0" y1="174" x2="240" y2="174" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.25"/>
      <line x1="120" y1="150" x2="120" y2="210" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.25"/>

      {/* Host — kneeling left, bowing forward */}
      {/* Body */}
      <path d="M55 120 Q50 135 48 150 Q55 152 75 152 Q80 140 75 125 Z"
        fill="var(--ink-soft)" opacity="0.2"/>
      {/* Sleeve extended — offering the bowl */}
      <path d="M65 132 Q80 128 100 135 Q110 138 115 142"
        stroke="var(--ink-soft)" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.25"/>
      {/* Head bowed */}
      <circle cx="60" cy="115" r="10" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.8" opacity="0.7"/>
      {/* Hair */}
      <path d="M52 112 Q60 106 68 112" fill="var(--ink)" opacity="0.3"/>

      {/* Tea bowl being passed */}
      <ellipse cx="118" cy="142" rx="12" ry="5" fill="var(--paper-deep)" stroke={ACC} strokeWidth="0.8" opacity="0.8"/>
      <path d="M106 139 Q118 135 130 139" stroke="var(--ink-mute)" strokeWidth="0.5" fill="none" opacity="0.4"/>
      {/* Matcha surface */}
      <ellipse cx="118" cy="140" rx="9" ry="3.5" fill="var(--tea-light)" opacity="0.3"/>
      {/* Kintsugi accent on bowl */}
      <path d="M112 138 Q115 142 113 146" stroke="var(--gold)" strokeWidth="0.7" fill="none" opacity="0.5"/>

      {/* Guest — kneeling right, receiving */}
      <path d="M165 120 Q170 135 172 150 Q160 152 145 152 Q140 140 145 125 Z"
        fill="var(--ink-soft)" opacity="0.18"/>
      {/* Arms extended to receive */}
      <path d="M158 132 Q142 128 127 135"
        stroke="var(--ink-soft)" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.22"/>
      {/* Head — slightly bowed in gratitude */}
      <circle cx="168" cy="115" r="10" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.8" opacity="0.7"/>
      <path d="M161 112 Q168 107 175 112" fill="var(--ink)" opacity="0.25"/>

      {/* Chakin — white cloth folded nearby */}
      <rect x="80" y="146" width="18" height="6" rx="1" fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.6"/>

      {/* Chasen — tea whisk */}
      <line x1="145" y1="148" x2="140" y2="132" stroke="var(--ink-soft)" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      {/* Whisk tines */}
      {[-3,-1,1,3].map((dx, i) => (
        <path key={i} d={`M${140 + dx} 132 Q${140 + dx * 1.5} 138 ${140 + dx} 148`}
          stroke="var(--ink-soft)" strokeWidth="0.4" fill="none" opacity="0.3"/>
      ))}

      {/* Tokonoma alcove — background scroll */}
      <rect x="90" y="20" width="60" height="90" rx="1"
        fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.6" opacity="0.5"/>
      <line x1="90" y1="25" x2="150" y2="25" stroke="var(--ink-mute)" strokeWidth="1" opacity="0.3"/>
      <line x1="90" y1="105" x2="150" y2="105" stroke="var(--ink-mute)" strokeWidth="1" opacity="0.3"/>
      {/* Scroll text — 和敬清寂 */}
      <text x="120" y="55" textAnchor="middle" fontSize="8" fill="var(--ink)" opacity="0.5"
        fontFamily="'Noto Serif SC', serif">和</text>
      <text x="120" y="68" textAnchor="middle" fontSize="8" fill="var(--ink)" opacity="0.5"
        fontFamily="'Noto Serif SC', serif">敬</text>
      <text x="120" y="81" textAnchor="middle" fontSize="8" fill="var(--ink)" opacity="0.5"
        fontFamily="'Noto Serif SC', serif">清</text>
      <text x="120" y="94" textAnchor="middle" fontSize="8" fill="var(--ink)" opacity="0.5"
        fontFamily="'Noto Serif SC', serif">寂</text>

      {/* Single flower in vase — left of scroll */}
      <path d="M72 110 Q70 95 68 80" stroke="var(--tea)" strokeWidth="0.8" opacity="0.5" strokeLinecap="round"/>
      <circle cx="68" cy="78" r="5" fill={ACC} opacity="0.25"/>
      <circle cx="64" cy="82" r="3.5" fill={ACC} opacity="0.2"/>
      <path d="M64 108 Q72 105 80 108 L79 114 Q72 116 65 114 Z" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.6"/>
    </svg>
  )
}

const spiritCards = [
  {
    title: '事前用心',
    body: '客人未至，一切已备。花已插，香已燃，水已温——每个细节，都是为来者而设。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Vase */}
        <path d="M16.5 25 L17 30 L23 30 L23.5 25 Z" stroke={ACC} strokeWidth="1.2" strokeLinejoin="round"/>
        <line x1="16" y1="25" x2="24" y2="25" stroke={ACC} strokeWidth="1.2" strokeLinecap="round"/>
        {/* Stem */}
        <path d="M20 25 Q19 19 20 13" stroke={ACC} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        {/* Leaf */}
        <path d="M19.6 19 Q17.2 19 16 17" stroke={ACC} strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        {/* Flower bloom */}
        <circle cx="20" cy="12.7" r="1.5" stroke={ACC} strokeWidth="1.2"/>
        <circle cx="20" cy="10.6" r="1" stroke={ACC} strokeWidth="1" opacity="0.85"/>
        <circle cx="22" cy="12.7" r="1" stroke={ACC} strokeWidth="1" opacity="0.85"/>
        <circle cx="18" cy="12.7" r="1" stroke={ACC} strokeWidth="1" opacity="0.85"/>
      </svg>
    ),
  },
  {
    title: '无言之礼',
    body: '最深的款待不在言语，而在那一切都恰到好处的沉默。客人感受到的，是主人全部的心意。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Floor */}
        <line x1="11" y1="30" x2="29" y2="30" stroke={ACC} strokeWidth="0.7" opacity="0.45"/>
        {/* Leg */}
        <line x1="23.5" y1="30" x2="23.5" y2="22" stroke={ACC} strokeWidth="1.3" strokeLinecap="round"/>
        {/* Back bent forward */}
        <path d="M23.5 22 Q20.5 19 15.2 18.3" stroke={ACC} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        {/* Head */}
        <circle cx="13.2" cy="16.7" r="2.4" stroke={ACC} strokeWidth="1.2"/>
        {/* Arm */}
        <path d="M18.5 20 L17.5 25.2" stroke={ACC} strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: '一期一会',
    body: '此刻的相聚，将永不重现。正因如此，每一杯茶、每一句话，都值得以全部的心去对待。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Single steam curl */}
        <path d="M20 19 Q22.4 16 20 13 Q17.6 10 20 7" stroke={ACC} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        {/* Bowl body */}
        <path d="M12.8 22.5 Q13.4 28.6 20 29.2 Q26.6 28.6 27.2 22.5 Z" stroke={ACC} strokeWidth="1.3" fill="none" strokeLinejoin="round"/>
        {/* Rim */}
        <ellipse cx="20" cy="22.5" rx="7.3" ry="1.4" stroke={ACC} strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    title: '送别有礼',
    body: '离别时的温度，决定了余韵的长短。目送客人的背影，直至消失不见——这也是待客之道。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Torii top — kasagi with upturned ends */}
        <path d="M10 13.5 Q11.2 11.8 13 12.3 L27 12.3 Q28.8 11.8 30 13.5" stroke={ACC} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        {/* Nuki — inner beam */}
        <line x1="13" y1="16.5" x2="27" y2="16.5" stroke={ACC} strokeWidth="1.2" strokeLinecap="round"/>
        {/* Posts */}
        <line x1="14.5" y1="12.3" x2="14.5" y2="28.5" stroke={ACC} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="25.5" y1="12.3" x2="25.5" y2="28.5" stroke={ACC} strokeWidth="1.3" strokeLinecap="round"/>
        {/* Path leading away — dashed */}
        <line x1="13" y1="30" x2="27" y2="30" stroke={ACC} strokeWidth="0.8" opacity="0.45" strokeDasharray="1.5 1.7"/>
      </svg>
    ),
  },
]

const applicationItems = [
  {
    label: '准备先于到来',
    desc: '在客人踏入之前，空间已为他们而存在。温度、香气、光线——皆有所安排。',
  },
  {
    label: '察言而不问',
    desc: '观察客人的状态，感知其未言之需。最好的服务，是在开口之前就已到来。',
  },
  {
    label: '隐去用力之痕',
    desc: '让精心的准备隐于无形，使客人感到自在，而非受到款待的压力。',
  },
  {
    label: '以心换心',
    desc: '款待的本质不在技巧，在于真诚。客人感受得到的，是心意，不是仪式。',
  },
]

export default function OmotenashiPage() {
  return (
    <main className="min-h-screen pb-32" style={{ background: 'var(--paper)' }}>

      <PrincipleTopNav slug="omotenashi" />

      {/* ── HERO ── */}
      <Section className="max-w-[900px] mx-auto px-6 pt-10 pb-16 md:pb-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <FadeUp>
              <span className="seal text-[10px] tracking-[0.15em] mb-5 inline-block" style={{ background: '#a05848', color: 'var(--paper)', opacity: 0.88, fontFamily: 'Noto Serif SC, serif', fontWeight: 500 }}>
                以心迎心，一期一会
              </span>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="text-6xl md:text-7xl font-light text-[var(--ink)] leading-none tracking-wide mb-3">
                款待
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-sm text-[var(--ink-mute)] tracking-[0.25em] mb-7">
                おもてなし | Omotenashi
              </p>
              <div className="brush-divider w-20 mb-7" />
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-lg md:text-xl font-light text-[var(--ink-soft)] leading-[2.1] mb-5" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                款待是以整颗心迎接来者的艺术——不求回报，不留痕迹，在对方离开之后仍余温犹在。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.9]">
                从客人踏上石径的第一步，到目送背影消失于门外——每一个当下，都是一场完整的相遇。真正的款待，让客人忘记了被款待这件事。
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="flex justify-center">
            <Image src="/hero-omotenashi.png" alt="款待 — Omotenashi" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
          </FadeUp>
        </div>
      </Section>

      {/* ── Spirit — paper-soft band ── */}
      <section style={{ background: 'var(--paper-soft)', borderTop: '1px solid var(--paper-deep)', borderBottom: '1px solid var(--paper-deep)' }}
               className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">essence</p>
            <h2 className="text-2xl font-light text-[var(--ink)] mb-8 tracking-wide">款待的精神</h2>
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

      {/* ── Guest journey diagram + Application — open ── */}
      <Section className="max-w-[900px] mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">composition</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-6 tracking-wide">待客的四个时刻</h2>
            <div style={{ border: '1px solid var(--paper-deep)', padding: '28px 20px', background: 'var(--paper)' }}>
              <GuestJourneyDiagram />
            </div>
            <p className="text-[10px] text-[var(--ink-mute)] text-center mt-4 tracking-wider">
              从踏入庭院，到送别离去，每一刻皆是完整的礼
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">practice</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-6 tracking-wide">款待的运用</h2>
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

      {/* ── Life section — paper-deep band ── */}
      <section style={{ background: 'var(--paper-deep)', borderTop: '1px solid var(--paper-deep)' }}
               className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeUp className="flex justify-center">
              <Image src="/everyday-omotenashi.png" alt="款待 — everyday" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-2xl font-light text-[var(--ink)] mb-5 tracking-wide"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}>
                生活中的款待
              </h2>
              <p className="text-base text-[var(--ink-soft)] leading-[1.9] mb-4">
                款待不仅是仪式，也是生活的姿态。为来者备好喜欢的茶，在对方到来之前打开窗户让空气流通，在送别时多站一刻——这些微小的举动，皆是款待的语言。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.85] mb-8">
                <span style={{ color: ACC }}>和敬清寂</span>——和谐、尊重、纯净、寂静，是款待精神最清晰的骨架，也是主人内心的镜子。
              </p>
              <div style={{ borderLeft: `3px solid ${ACC}`, background: 'var(--paper-soft)', padding: '16px 20px' }}>
                <p className="text-base text-[var(--ink-soft)] leading-[1.9] italic"
                   style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>
                  真正的款待，不在于你给了对方什么，而在于你让对方感受到：此刻，他是世界上最被珍视的人。
                </p>
              </div>
            </FadeUp>
          </div>
        </Section>
      </section>

      {/* ── Transition note — leads into the other principles ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[680px] mx-auto px-6 py-16"
      >
        <div style={{ borderLeft: `2px solid var(--paper-deep)`, paddingLeft: '24px' }}>
          <p className="text-xs text-[var(--ink-mute)] tracking-[0.3em] uppercase mb-3">从这里出发</p>
          <p className="text-sm text-[var(--ink-soft)] leading-loose">
            款待是所有原则的起点——客人踏入之后，余白给予呼吸的空间，借景延伸了视野，粋定义了主人的风骨，室礼诉说着当下的季节……而当客人终于离去，留下的，便是余韵。
          </p>
        </div>
      </motion.section>

      <PrincipleBottomNav slug="omotenashi" />
    </main>
  )
}

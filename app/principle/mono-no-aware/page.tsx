'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { PrincipleTopNav, PrincipleBottomNav } from '@/components/PrinciplePageNav'

const ACC = '#b87a4a'   // terracotta — autumn, falling, transience

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

// ─── SVG: Autumn garden — maple branch, falling leaves, stone lantern ────────
function AutumnIllustration() {
  return (
    <svg viewBox="0 0 260 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[220px] mx-auto">
      {/* Main branch arcing across */}
      <path d="M20 80 Q80 40 160 60 Q210 70 240 50" stroke="var(--ink-soft)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M90 55 Q100 30 120 20" stroke="var(--ink-soft)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M140 58 Q150 35 165 28" stroke="var(--ink-soft)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M60 65 Q55 40 65 25" stroke="var(--ink-soft)" strokeWidth="1" strokeLinecap="round" fill="none"/>

      {/* Maple leaves on branch */}
      {[
        { cx: 120, cy: 20, r: 9, rot: -20 },
        { cx: 165, cy: 28, r: 7, rot: 15 },
        { cx: 65, cy: 24, r: 8, rot: -35 },
        { cx: 210, cy: 52, r: 6, rot: 10 },
        { cx: 88, cy: 35, r: 5, rot: -10 },
      ].map((l, i) => (
        <g key={i} transform={`rotate(${l.rot} ${l.cx} ${l.cy})`}>
          <path d={`M${l.cx} ${l.cy - l.r} Q${l.cx - l.r * 0.8} ${l.cy - l.r * 0.3} ${l.cx - l.r} ${l.cy + l.r * 0.4} Q${l.cx} ${l.cy + l.r * 0.6} ${l.cx + l.r} ${l.cy + l.r * 0.4} Q${l.cx + l.r * 0.8} ${l.cy - l.r * 0.3} ${l.cx} ${l.cy - l.r}Z`}
            fill={ACC} opacity={0.55 - i * 0.06}/>
        </g>
      ))}

      {/* Falling leaves — scattered at different heights */}
      {[
        { x: 70, y: 130, rot: 25 }, { x: 130, y: 160, rot: -40 },
        { x: 190, y: 115, rot: 15 }, { x: 50, y: 190, rot: -20 },
        { x: 160, y: 200, rot: 35 }, { x: 100, y: 240, rot: -15 },
        { x: 210, y: 170, rot: 50 },
      ].map((l, i) => (
        <g key={i} transform={`rotate(${l.rot} ${l.x} ${l.y})`} opacity={0.45 - i * 0.04}>
          <path d={`M${l.x} ${l.y - 5} Q${l.x - 5} ${l.y} ${l.x - 4} ${l.y + 4} Q${l.x} ${l.y + 6} ${l.x + 4} ${l.y + 4} Q${l.x + 5} ${l.y} ${l.x} ${l.y - 5}Z`}
            fill={ACC}/>
        </g>
      ))}

      {/* Stone lantern */}
      <rect x="108" y="230" width="24" height="16" rx="1" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.8" opacity="0.7"/>
      <rect x="104" y="226" width="32" height="6" rx="1" fill="var(--ink-soft)" opacity="0.3"/>
      <rect x="112" y="246" width="16" height="6" rx="1" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.6"/>
      <rect x="116" y="252" width="8" height="22" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.5"/>
      {/* Lantern glow */}
      <rect x="110" y="232" width="20" height="12" rx="1" fill={ACC} opacity="0.1"/>
      <line x1="120" y1="232" x2="120" y2="242" stroke={ACC} strokeWidth="0.5" opacity="0.4"/>
      <line x1="108" y1="237" x2="132" y2="237" stroke={ACC} strokeWidth="0.5" opacity="0.4"/>

      {/* Ground */}
      <line x1="20" y1="274" x2="240" y2="274" stroke="var(--ink-mute)" strokeWidth="0.6" opacity="0.35"/>
      <line x1="20" y1="280" x2="240" y2="280" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.2"/>
    </svg>
  )
}

// ─── SVG: Season cycle diagram ───────────────────────────────────────────────
function SeasonDiagram() {
  return (
    <svg viewBox="0 0 440 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[480px] mx-auto">
      {/* ─── Background guides — concentric dashed cycles ─── */}
      <circle cx="220" cy="190" r="148" stroke={ACC} strokeWidth="0.7" fill="none" opacity="0.22" strokeDasharray="5 4"/>
      <circle cx="220" cy="190" r="100" stroke={ACC} strokeWidth="0.5" fill="none" opacity="0.15" strokeDasharray="2 3"/>

      {/* ─── Cycle direction arrows — between seasons, clockwise ─── */}
      {/* Spring → Summer (top-right curve) */}
      <path d="M268 80 Q322 105 332 156" stroke={ACC} strokeWidth="0.9" fill="none" opacity="0.45"/>
      <path d="M330 152 L332 159 L336 154" stroke={ACC} strokeWidth="0.9" fill="none" opacity="0.55" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Summer → Autumn (bottom-right curve) */}
      <path d="M332 224 Q322 275 268 300" stroke={ACC} strokeWidth="0.9" fill="none" opacity="0.45"/>
      <path d="M267 296 L268 303 L274 299" stroke={ACC} strokeWidth="0.9" fill="none" opacity="0.55" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Autumn → Winter (bottom-left curve) */}
      <path d="M172 300 Q118 275 108 224" stroke={ACC} strokeWidth="0.9" fill="none" opacity="0.45"/>
      <path d="M110 228 L108 220 L104 226" stroke={ACC} strokeWidth="0.9" fill="none" opacity="0.55" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Winter → Spring (top-left curve) */}
      <path d="M108 156 Q118 105 172 80" stroke={ACC} strokeWidth="0.9" fill="none" opacity="0.45"/>
      <path d="M173 84 L172 76 L166 80" stroke={ACC} strokeWidth="0.9" fill="none" opacity="0.55" strokeLinecap="round" strokeLinejoin="round"/>

      {/* ═══════════ SPRING — TOP ═══════════ */}
      {/* Flowering branch motif above */}
      <path d="M168 24 Q188 22 206 30" stroke={ACC} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M195 26 Q204 18 210 14" stroke={ACC} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7"/>
      <circle cx="175" cy="23" r="3" fill={ACC} fillOpacity="0.4" stroke={ACC} strokeWidth="0.9"/>
      <circle cx="175" cy="23" r="0.7" fill={ACC} opacity="0.8"/>
      <circle cx="206" cy="32" r="2.4" fill="var(--paper)" stroke={ACC} strokeWidth="0.9"/>
      <circle cx="210" cy="14" r="1.7" fill={ACC} fillOpacity="0.35" stroke={ACC} strokeWidth="0.8"/>
      {/* Spring node */}
      <ellipse cx="220" cy="76" rx="48" ry="30" fill={ACC} fillOpacity="0.1" stroke={ACC} strokeWidth="1.1" opacity="0.6"/>
      <text x="220" y="71" textAnchor="middle" fontSize="22" fill={ACC} fontFamily="'Noto Serif SC', serif" fontWeight="500">春</text>
      <text x="220" y="93" textAnchor="middle" fontSize="12" fill="var(--ink-mute)" fontFamily="'Noto Serif SC', serif" letterSpacing="1">花开短暂</text>

      {/* ═══════════ SUMMER — RIGHT ═══════════ */}
      {/* Sun motif beside */}
      <circle cx="406" cy="190" r="9" fill={ACC} fillOpacity="0.25" stroke={ACC} strokeWidth="1"/>
      <circle cx="406" cy="190" r="3" fill={ACC} opacity="0.7"/>
      {[0,45,90,135,180,225,270,315].map(a => (
        <line key={a}
              x1={406 + Math.cos(a * Math.PI/180) * 12} y1={190 + Math.sin(a * Math.PI/180) * 12}
              x2={406 + Math.cos(a * Math.PI/180) * 16} y2={190 + Math.sin(a * Math.PI/180) * 16}
              stroke={ACC} strokeWidth="0.9" opacity="0.55" strokeLinecap="round"/>
      ))}
      {/* Summer node */}
      <ellipse cx="338" cy="190" rx="32" ry="44" fill={ACC} fillOpacity="0.08" stroke={ACC} strokeWidth="1.1" opacity="0.55"/>
      <text x="338" y="186" textAnchor="middle" fontSize="22" fill={ACC} fontFamily="'Noto Serif SC', serif" fontWeight="500">夏</text>
      <text x="338" y="208" textAnchor="middle" fontSize="12" fill="var(--ink-mute)" fontFamily="'Noto Serif SC', serif" letterSpacing="1">盛极而衰</text>

      {/* ═══════════ AUTUMN — BOTTOM (emphasised) ═══════════ */}
      {/* Maple leaves motif below */}
      <g transform="rotate(15 200 348)">
        <path d="M200 342 L196 348 L192 346 L194 352 L188 354 L195 358 L196 362 L200 360 L204 362 L205 358 L212 354 L206 352 L208 346 L204 348 Z"
              fill={ACC} fillOpacity="0.5" stroke={ACC} strokeWidth="0.8" strokeLinejoin="round"/>
        <line x1="200" y1="342" x2="200" y2="362" stroke={ACC} strokeWidth="0.5" opacity="0.6"/>
      </g>
      <g transform="rotate(-25 244 358)" opacity="0.7">
        <path d="M244 354 L241 358 L238 357 L240 361 L236 363 L241 365 L242 368 L244 366 L246 368 L247 365 L252 363 L248 361 L250 357 L247 358 Z"
              fill={ACC} fillOpacity="0.35" stroke={ACC} strokeWidth="0.7" strokeLinejoin="round"/>
      </g>
      {/* Autumn node — emphasised */}
      <ellipse cx="220" cy="304" rx="48" ry="30" fill={ACC} fillOpacity="0.2" stroke={ACC} strokeWidth="1.5" opacity="0.85"/>
      <ellipse cx="220" cy="304" rx="44" ry="26" stroke={ACC} strokeWidth="0.55" fill="none" opacity="0.4"/>
      <text x="220" y="299" textAnchor="middle" fontSize="24" fill={ACC} fontFamily="'Noto Serif SC', serif" fontWeight="500">秋</text>
      <text x="220" y="322" textAnchor="middle" fontSize="12" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500" letterSpacing="1.5">叶落知时</text>

      {/* ═══════════ WINTER — LEFT ═══════════ */}
      {/* Snowflake motif beside */}
      <g transform="translate(34 190)">
        <line x1="-10" y1="0" x2="10" y2="0" stroke={ACC} strokeWidth="1" opacity="0.65" strokeLinecap="round"/>
        <line x1="0" y1="-10" x2="0" y2="10" stroke={ACC} strokeWidth="1" opacity="0.65" strokeLinecap="round"/>
        <line x1="-7" y1="-7" x2="7" y2="7" stroke={ACC} strokeWidth="0.85" opacity="0.5" strokeLinecap="round"/>
        <line x1="7" y1="-7" x2="-7" y2="7" stroke={ACC} strokeWidth="0.85" opacity="0.5" strokeLinecap="round"/>
        <circle cx="0" cy="0" r="1.4" fill={ACC} opacity="0.7"/>
      </g>
      {/* Winter node */}
      <ellipse cx="102" cy="190" rx="32" ry="44" fill={ACC} fillOpacity="0.06" stroke={ACC} strokeWidth="1.1" opacity="0.5"/>
      <text x="102" y="186" textAnchor="middle" fontSize="22" fill={ACC} fontFamily="'Noto Serif SC', serif" fontWeight="500">冬</text>
      <text x="102" y="208" textAnchor="middle" fontSize="12" fill="var(--ink-mute)" fontFamily="'Noto Serif SC', serif" letterSpacing="1">静待新生</text>

      {/* ═══════════ CENTRE — 当下 ═══════════ */}
      {/* Outer aura */}
      <circle cx="220" cy="190" r="56" fill={ACC} fillOpacity="0.04" stroke={ACC} strokeWidth="0.55" opacity="0.35" strokeDasharray="1.5 2.5"/>
      {/* Body */}
      <circle cx="220" cy="190" r="46" fill="var(--paper-soft)" stroke={ACC} strokeWidth="1.4" opacity="0.9"/>
      {/* Inner ring */}
      <circle cx="220" cy="190" r="38" stroke={ACC} strokeWidth="0.6" fill="none" opacity="0.4"/>
      {/* Glow */}
      <circle cx="220" cy="190" r="20" fill={ACC} fillOpacity="0.08"/>
      <text x="220" y="187" textAnchor="middle" fontSize="26" fill="var(--ink)" fontFamily="'Noto Serif SC', serif" fontWeight="500">当下</text>
      <text x="220" y="210" textAnchor="middle" fontSize="12" fill={ACC} fontFamily="'Noto Serif SC', serif" opacity="0.8" letterSpacing="1.5">此刻之美</text>

      {/* ═══════════ Drifting petals through the empty spaces ═══════════ */}
      <g transform="rotate(-20 268 250)" opacity="0.55">
        <ellipse cx="268" cy="250" rx="5" ry="2.2" fill={ACC}/>
      </g>
      <g transform="rotate(-10 282 232)" opacity="0.38">
        <ellipse cx="282" cy="232" rx="4" ry="1.8" fill={ACC}/>
      </g>
      <g transform="rotate(15 298 216)" opacity="0.24">
        <ellipse cx="298" cy="216" rx="3.5" ry="1.6" fill={ACC}/>
      </g>
      <g transform="rotate(35 158 138)" opacity="0.32">
        <ellipse cx="158" cy="138" rx="3.5" ry="1.5" fill={ACC}/>
      </g>
      <g transform="rotate(-15 296 124)" opacity="0.22">
        <ellipse cx="296" cy="124" rx="3" ry="1.4" fill={ACC}/>
      </g>
    </svg>
  )
}

// ─── SVG: Quiet study with autumn light ─────────────────────────────────────
function QuietStudyIllustration() {
  return (
    <svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[200px] mx-auto">
      {/* Window frame */}
      <rect x="15" y="20" width="90" height="100" rx="2" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.8" opacity="0.5"/>
      {/* Window panes */}
      <line x1="60" y1="20" x2="60" y2="120" stroke="var(--ink-mute)" strokeWidth="0.6" opacity="0.4"/>
      <line x1="15" y1="70" x2="105" y2="70" stroke="var(--ink-mute)" strokeWidth="0.6" opacity="0.4"/>
      {/* Autumn light through window — diagonal rays */}
      <path d="M15 20 L60 70" stroke={ACC} strokeWidth="0.5" opacity="0.2"/>
      <path d="M30 20 L60 45" stroke={ACC} strokeWidth="0.4" opacity="0.15"/>
      {/* Autumn tree glimpse through window */}
      <path d="M25 110 Q40 80 55 60 Q60 52 70 45" stroke={ACC} strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round"/>
      <circle cx="70" cy="43" r="5" fill={ACC} opacity="0.35"/>
      <circle cx="58" cy="58" r="4" fill={ACC} opacity="0.28"/>
      <circle cx="45" cy="75" r="3" fill={ACC} opacity="0.22"/>
      {/* Leaf blown inside */}
      <g transform="rotate(25 88 85)">
        <path d="M88 82 Q84 85 85 89 Q88 91 91 89 Q92 85 88 82Z" fill={ACC} opacity="0.5"/>
      </g>

      {/* Writing desk */}
      <rect x="15" y="155" width="210" height="8" rx="1" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.6"/>
      {/* Open journal */}
      <path d="M115 130 Q135 125 155 130 L155 158 Q135 155 115 158Z" fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.8"/>
      <path d="M155 130 Q175 125 195 130 L195 158 Q175 155 155 158Z" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.8"/>
      {/* Handwritten lines in journal */}
      <line x1="120" y1="138" x2="150" y2="137" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.4"/>
      <line x1="120" y1="143" x2="148" y2="142" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.4"/>
      <line x1="120" y1="148" x2="150" y2="147" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.4"/>
      <line x1="120" y1="153" x2="142" y2="152" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.3"/>
      {/* Pressed maple leaf on page */}
      <g transform="rotate(-15 175 142)" opacity="0.45">
        <path d="M175 137 Q170 141 171 146 Q175 148 179 146 Q180 141 175 137Z" fill={ACC}/>
      </g>
      {/* Tea cup */}
      <ellipse cx="210" cy="152" rx="14" ry="5" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.7"/>
      <path d="M196 149 Q210 144 224 149" stroke="var(--ink-mute)" strokeWidth="0.6" fill="none" opacity="0.4"/>
      {/* Steam */}
      <path d="M207 148 Q205 140 207 133" stroke={ACC} strokeWidth="0.6" fill="none" opacity="0.35" strokeLinecap="round"/>
      <path d="M213 148 Q215 140 213 134" stroke={ACC} strokeWidth="0.5" fill="none" opacity="0.25" strokeLinecap="round"/>
    </svg>
  )
}

const spiritCards = [
  {
    title: '转瞬即逝',
    body: '事物之所以美丽，正因为它不会永存。花开只在此刻，月圆终将亏缺。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Large petal — central, tilted as if drifting */}
        <path d="M22 10 Q14 14 13 21 Q14 27 20 28 Q26 26 26 19 Q26 13 22 10Z" stroke={ACC} strokeWidth="1.4" fill={ACC} fillOpacity="0.08" strokeLinejoin="round"/>
        {/* Petal vein */}
        <path d="M22 11 Q19 19 19.5 27.5" stroke={ACC} strokeWidth="0.85" fill="none" opacity="0.6"/>
        {/* Wind motion arc behind */}
        <path d="M8 13 Q11 13 13 15" stroke={ACC} strokeWidth="0.85" fill="none" strokeLinecap="round" strokeDasharray="1.4 1.6" opacity="0.55"/>
        <path d="M9 19 Q11 19.5 12 20.5" stroke={ACC} strokeWidth="0.7" fill="none" strokeLinecap="round" strokeDasharray="1.2 1.5" opacity="0.4"/>
      </svg>
    ),
  },
  {
    title: '感同身受',
    body: '物哀是共情的艺术。当自然的悲喜与内心相遇，人才真正感受到生命的温度。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Tear-drop at heart of icon — the feeling */}
        <path d="M20 11 Q14 18 17 24 Q20.5 26.5 23 24 Q26 18 20 11Z" stroke={ACC} strokeWidth="1.5" fill={ACC} fillOpacity="0.18" strokeLinejoin="round"/>
        {/* Resonance rings — empathy radiating outward */}
        <circle cx="20" cy="20" r="9" stroke={ACC} strokeWidth="0.9" fill="none" opacity="0.5" strokeDasharray="2.2 2"/>
        <circle cx="20" cy="20" r="13" stroke={ACC} strokeWidth="0.75" fill="none" opacity="0.3" strokeDasharray="1.8 2.4"/>
      </svg>
    ),
  },
  {
    title: '哀而不伤',
    body: '物哀并非悲观，而是温柔的接纳。带着微笑的泪水，正是对生命最深的理解。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Wide smile curve — spans most of the icon */}
        <path d="M8.5 15 Q20 30 31.5 15" stroke={ACC} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* Single tear hanging from left end of smile */}
        <path d="M9.5 17 Q7.5 21.5 9 23.8 Q11.5 24.2 11.5 22 Q11.5 19.8 9.5 17Z" stroke={ACC} strokeWidth="1.25" fill={ACC} fillOpacity="0.18" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: '当下之美',
    body: '正因为无常，此刻才珍贵。物哀教会我们不逃避流逝，而是全然活在正在消失的美之中。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        {/* Top half — sky */}
        <path d="M 4 20 A 16 16 0 0 1 36 20" stroke={ACC} strokeWidth="1.2" fill="none"/>
        {/* Bottom half — water reflection, lighter */}
        <path d="M 4 20 A 16 16 0 0 0 36 20" stroke={ACC} strokeWidth="1.2" fill="none" opacity="0.35"/>
        {/* Horizon line */}
        <line x1="4" y1="20" x2="36" y2="20" stroke={ACC} strokeWidth="1.3" strokeLinecap="round"/>
        {/* Sun resting on horizon */}
        <circle cx="20" cy="14" r="6" stroke={ACC} strokeWidth="1.5" fill={ACC} fillOpacity="0.14"/>
        {/* Sun's reflection — squished mirror, fainter */}
        <ellipse cx="20" cy="25.5" rx="6" ry="2.2" stroke={ACC} strokeWidth="0.95" fill={ACC} fillOpacity="0.06" opacity="0.55"/>
        {/* Faint ripple bands */}
        <line x1="11" y1="29" x2="29" y2="29" stroke={ACC} strokeWidth="0.65" opacity="0.35" strokeLinecap="round"/>
        <line x1="14" y1="32" x2="26" y2="32" stroke={ACC} strokeWidth="0.6" opacity="0.22" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const applicationItems = [
  { label: '接纳无常', desc: '不执着于永恒。以开放之心迎接事物的来去，告别时也带着感恩。' },
  { label: '细察万物', desc: '留意枯叶的纹理、雨声的节奏、茶汤的温度——细微之处皆是生命的语言。' },
  { label: '珍视当下', desc: '此刻的完整，胜过对昨日的眷恋与明日的期许，专注此刻便是珍惜。' },
  { label: '以情共鸣', desc: '让自然的哀愁触动你，而非隔绝它。感受即是理解，柔软即是力量。' },
]

export default function MonoNoAwarePage() {
  return (
    <main className="min-h-screen pb-32">

      <PrincipleTopNav slug="mono-no-aware" />

      {/* ── HERO ── */}
      <Section className="max-w-[900px] mx-auto px-6 pt-10 pb-16 md:pb-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <FadeUp>
              <span className="seal text-[10px] tracking-[0.15em] mb-5 inline-block" style={{ background: '#b87a4a', color: 'var(--paper)', opacity: 0.88, fontFamily: 'Noto Serif SC, serif', fontWeight: 500 }}>
                花落方知美之深
              </span>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="text-6xl md:text-7xl font-light text-[var(--ink)] leading-none tracking-wide mb-3">
                物哀
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-sm text-[var(--ink-mute)] tracking-[0.25em] mb-7">
                もののあわれ | Mono no Aware
              </p>
              <div className="brush-divider w-20 mb-7" />
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-lg md:text-xl font-light text-[var(--ink-soft)] leading-[2.1] mb-5" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                物哀是东方审美里极为动人的感知——对万物无常的温柔体会，是一种既含悲伤又含喜悦的复杂情感。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.9]">
                它不是沉溺于哀愁，而是以开放的心感受生命中每一个转瞬即逝的美好，并在那消逝之中，发现深刻的意义。
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="flex justify-center">
            <Image src="/hero-mono-no-aware.png" alt="物の哀れ — Mono no Aware" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
          </FadeUp>
        </div>
      </Section>

      {/* ── Spirit — paper-soft band ── */}
      <section style={{ background: 'var(--paper-soft)', borderTop: '1px solid var(--paper-deep)', borderBottom: '1px solid var(--paper-deep)' }}
               className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">essence</p>
            <h2 className="text-2xl font-light text-[var(--ink)] mb-8 tracking-wide">物哀的精神</h2>
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

      {/* ── Diagram + Application — open ── */}
      <Section className="max-w-[900px] mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">composition</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-6 tracking-wide">四季的感悟</h2>
            <div style={{ border: '1px solid var(--paper-deep)', padding: '24px', background: 'var(--paper)' }}>
              <SeasonDiagram />
            </div>
            <p className="text-[10px] text-[var(--ink-mute)] text-center mt-4 tracking-wider">
              以四季之轮回，体悟物哀之真谛
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">practice</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-6 tracking-wide">物哀的运用</h2>
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
              <Image src="/everyday-mono-no-aware.png" alt="物の哀れ — everyday" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-2xl font-light text-[var(--ink)] mb-5 tracking-wide"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}>生活中的物哀</h2>
              <p className="text-base text-[var(--ink-soft)] leading-[1.9] mb-4">
                物哀无处不在——秋天第一片落叶、旧照片里模糊的笑容、聚会散场后经久的寂静。它是许多东方诗性表达背后的精神内核。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.85] mb-8">
                当你为一首歌停住呼吸，为夕阳迟迟不愿转身——你正在体验物哀。
              </p>
              <div style={{ borderLeft: `3px solid ${ACC}`, paddingLeft: '20px', background: 'var(--paper-soft)', padding: '16px 20px' }}>
                <p className="text-base text-[var(--ink-soft)] leading-[1.9] italic"
                   style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>
                  万物消逝之中，我们学会珍视；哀愁之中，我们学会感恩。物哀，是生命赠予的第一课。
                </p>
              </div>
            </FadeUp>
          </div>
        </Section>
      </section>

      <PrincipleBottomNav slug="mono-no-aware" />
    </main>
  )
}

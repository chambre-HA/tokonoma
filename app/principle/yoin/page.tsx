'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { PrincipleTopNav, PrincipleBottomNav } from '@/components/PrinciplePageNav'

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
      className={className}>
      {children}
    </motion.div>
  )
}

// ─── SVG: Tokonoma with moon window ─────────────────────────────────────────
function TokonomaIllustration() {
  return (
    <svg viewBox="0 0 260 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[220px] mx-auto">
      {/* Room floor & walls */}
      <rect x="10" y="20" width="240" height="260" rx="3" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.5"/>
      {/* Tatami floor lines */}
      <line x1="10" y1="210" x2="250" y2="210" stroke="var(--ink-mute)" strokeWidth="0.6" opacity="0.4"/>
      <line x1="10" y1="230" x2="250" y2="230" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.25"/>
      <line x1="130" y1="210" x2="130" y2="280" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.25"/>

      {/* Round window (moon gate) — right side */}
      <circle cx="185" cy="100" r="52" fill="#d4dce8" opacity="0.35" stroke="var(--ink-soft)" strokeWidth="1.2"/>
      {/* Moon in window */}
      <circle cx="193" cy="78" r="20" fill="#e8e0c8" opacity="0.55"/>
      <circle cx="193" cy="78" r="17" fill="#f0e8d0" opacity="0.45"/>
      {/* Mountain silhouette through window */}
      <path d="M140 148 L168 92 L196 148Z" fill="var(--ink-soft)" opacity="0.1"/>
      <path d="M162 148 L184 105 L218 148Z" fill="var(--ink-soft)" opacity="0.07"/>
      {/* Window frame cross */}
      <line x1="185" y1="50" x2="185" y2="150" stroke="var(--ink-soft)" strokeWidth="0.8" opacity="0.3"/>
      <line x1="135" y1="100" x2="235" y2="100" stroke="var(--ink-soft)" strokeWidth="0.8" opacity="0.3"/>

      {/* Hanging scroll — center left */}
      <rect x="72" y="28" width="34" height="70" rx="1" fill="var(--paper)" opacity="0.9" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      {/* Scroll rollers */}
      <rect x="70" y="26" width="38" height="5" rx="2" fill="var(--ink-soft)" opacity="0.4"/>
      <rect x="70" y="94" width="38" height="5" rx="2" fill="var(--ink-soft)" opacity="0.4"/>
      {/* 余韵 on scroll — vertical */}
      <text x="89" y="52" textAnchor="middle" fontSize="10" fill="var(--ink)" opacity="0.7"
        fontFamily="'Noto Serif SC', serif" writingMode="vertical-rl">余</text>
      <text x="89" y="76" textAnchor="middle" fontSize="10" fill="var(--ink)" opacity="0.7"
        fontFamily="'Noto Serif SC', serif" writingMode="vertical-rl">韵</text>

      {/* Tea bowl on surface */}
      <ellipse cx="80" cy="215" rx="16" ry="7" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.8" opacity="0.7"/>
      <path d="M64 210 Q80 205 96 210 L94 215 Q80 212 66 215 Z" fill="var(--ink-soft)" opacity="0.15"/>
      {/* Tea ripple rings */}
      <ellipse cx="80" cy="209" rx="6" ry="2.5" stroke="#6b7a8d" strokeWidth="0.5" opacity="0.4" fill="none"/>
      <ellipse cx="80" cy="209" rx="10" ry="4" stroke="#6b7a8d" strokeWidth="0.4" opacity="0.25" fill="none"/>

      {/* Cherry blossoms scattered */}
      <circle cx="155" cy="200" r="3" fill="#c8a8a8" opacity="0.5"/>
      <circle cx="162" cy="195" r="2" fill="#c8a8a8" opacity="0.35"/>
      <circle cx="148" cy="205" r="2.5" fill="#c8a8a8" opacity="0.4"/>
      <circle cx="170" cy="208" r="2" fill="#c8a8a8" opacity="0.3"/>

      {/* Incense stick */}
      <line x1="210" y1="215" x2="210" y2="175" stroke="var(--ink-soft)" strokeWidth="0.8" opacity="0.5"/>
      {/* Smoke curl */}
      <path d="M210 175 Q207 165 210 155 Q213 147 210 138" stroke="#6b7a8d" strokeWidth="0.7"
        fill="none" strokeLinecap="round" opacity="0.4"/>
      <path d="M210 165 Q214 157 212 148" stroke="#6b7a8d" strokeWidth="0.5"
        fill="none" strokeLinecap="round" opacity="0.25"/>
      {/* Incense holder */}
      <ellipse cx="210" cy="216" rx="8" ry="3" fill="var(--ink-soft)" opacity="0.2"/>
    </svg>
  )
}

// ─── SVG: Room space expression diagram ─────────────────────────────────────
function SpaceDiagram() {
  return (
    <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[480px] mx-auto">
      {/* ─── Room perspective — three walls ─── */}
      {/* Floor */}
      <path d="M30 296 L90 200 L330 200 L390 296 Z" fill="var(--paper-soft)" stroke="#6b7a8d" strokeWidth="1" opacity="0.7"/>
      {/* Back wall */}
      <path d="M90 200 L116 36 L304 36 L330 200 Z" fill="var(--paper)" stroke="#6b7a8d" strokeWidth="1" opacity="0.6"/>
      {/* Left wall */}
      <path d="M30 296 L90 200 L116 36 L30 296" fill="var(--paper-deep)" opacity="0.35" stroke="#6b7a8d" strokeWidth="0.75"/>
      {/* Right wall */}
      <path d="M390 296 L330 200 L304 36 L390 296" fill="var(--paper-deep)" opacity="0.28" stroke="#6b7a8d" strokeWidth="0.75"/>

      {/* ─── Diagonal light beam through right wall ─── */}
      <path d="M304 50 L210 200 L304 90 Z" fill="var(--gold)" opacity="0.07"/>
      <path d="M304 80 L240 200" stroke="var(--gold)" strokeWidth="14" opacity="0.06"/>
      <path d="M304 110 L260 200" stroke="var(--gold)" strokeWidth="8" opacity="0.04"/>

      {/* ─── Floor tatami lines (perspective) ─── */}
      <line x1="110" y1="296" x2="148" y2="200" stroke="#6b7a8d" strokeWidth="0.4" opacity="0.3"/>
      <line x1="200" y1="296" x2="210" y2="200" stroke="#6b7a8d" strokeWidth="0.4" opacity="0.3"/>
      <line x1="290" y1="296" x2="270" y2="200" stroke="#6b7a8d" strokeWidth="0.4" opacity="0.3"/>

      {/* ─── Hanging scroll on back wall ─── */}
      <rect x="178" y="52" width="64" height="98" rx="1" fill="var(--paper-soft)" stroke="#6b7a8d" strokeWidth="1"/>
      <line x1="174" y1="50" x2="246" y2="50" stroke="#6b7a8d" strokeWidth="2" strokeLinecap="round"/>
      <line x1="174" y1="152" x2="246" y2="152" stroke="#6b7a8d" strokeWidth="2" strokeLinecap="round"/>
      {/* 余韵 vertical calligraphy */}
      <text x="210" y="84" textAnchor="middle" fontSize="13" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" opacity="0.85">余</text>
      <text x="210" y="108" textAnchor="middle" fontSize="13" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" opacity="0.85">韵</text>
      {/* Seal */}
      <rect x="222" y="132" width="6" height="6" fill="#a05848" opacity="0.6"/>

      {/* ─── Flower vase on left side of back wall ─── */}
      <ellipse cx="138" cy="188" rx="9" ry="2.5" fill="#6b7a8d" opacity="0.18"/>
      <path d="M130 168 Q128 184 138 190 Q148 184 146 168 Q144 162 138 160 Q133 162 130 168 Z"
            fill="var(--paper-soft)" stroke="#6b7a8d" strokeWidth="1" strokeLinejoin="round"/>
      {/* Branch with two blooms */}
      <path d="M138 160 C134 144 128 130 122 116" stroke="var(--tea)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M138 160 C141 148 145 138 144 126" stroke="var(--tea)" strokeWidth="1.05" strokeLinecap="round" fill="none"/>
      <circle cx="122" cy="116" r="4" fill="var(--tea-light)" stroke="var(--tea)" strokeWidth="0.95" opacity="0.7"/>
      <circle cx="122" cy="116" r="0.95" fill="var(--tea)" opacity="0.85"/>
      <circle cx="144" cy="126" r="3.2" fill="var(--paper)" stroke="var(--tea)" strokeWidth="0.9" opacity="0.85"/>

      {/* ─── Tea bowl on the floor (centre) ─── */}
      <ellipse cx="210" cy="264" rx="22" ry="5" fill="#6b7a8d" opacity="0.16"/>
      <path d="M196 258 Q197 268 210 269 Q223 268 224 258 Z" fill="var(--paper-deep)" stroke="#6b7a8d" strokeWidth="1.1" strokeLinejoin="round"/>
      <ellipse cx="210" cy="258" rx="14" ry="2.4" fill="none" stroke="#6b7a8d" strokeWidth="1"/>
      {/* Tiny steam wisp */}
      <path d="M210 254 Q208 247 210 240" stroke="#6b7a8d" strokeWidth="0.75" fill="none" strokeLinecap="round" opacity="0.5"/>

      {/* ─── Floating dust particles in the beam ─── */}
      <circle cx="266" cy="120" r="0.85" fill="var(--gold)" opacity="0.55"/>
      <circle cx="282" cy="150" r="0.7" fill="var(--gold)" opacity="0.45"/>
      <circle cx="252" cy="160" r="0.65" fill="var(--gold)" opacity="0.4"/>
      <circle cx="276" cy="180" r="0.6" fill="var(--gold)" opacity="0.35"/>

      {/* ═══════════ Labels ═══════════ */}
      {/* 静谧光影 — light beam */}
      <line x1="278" y1="78" x2="346" y2="60" stroke="#6b7a8d" strokeWidth="0.8" strokeDasharray="3 3"/>
      <text x="350" y="60" fontSize="13" fill="#6b7a8d" fontFamily="'Noto Serif SC', serif" fontWeight="500">静谧光影</text>

      {/* 简素陈设 — scroll */}
      <line x1="180" y1="80" x2="100" y2="60" stroke="#6b7a8d" strokeWidth="0.8" strokeDasharray="3 3"/>
      <text x="92" y="60" fontSize="13" fill="#6b7a8d" fontFamily="'Noto Serif SC', serif" fontWeight="500" textAnchor="end">简素陈设</text>

      {/* 自然气息 — flowers */}
      <line x1="122" y1="116" x2="50" y2="106" stroke="#6b7a8d" strokeWidth="0.8" strokeDasharray="3 3"/>
      <text x="44" y="108" fontSize="13" fill="#6b7a8d" fontFamily="'Noto Serif SC', serif" fontWeight="500" textAnchor="end">自然气息</text>

      {/* 留白之境 — empty floor */}
      <line x1="100" y1="262" x2="50" y2="250" stroke="#6b7a8d" strokeWidth="0.8" strokeDasharray="3 3"/>
      <text x="44" y="252" fontSize="13" fill="#6b7a8d" fontFamily="'Noto Serif SC', serif" fontWeight="500" textAnchor="end">留白之境</text>

      {/* 内敛空间 — overall caption */}
      <text x="210" y="324" textAnchor="middle" fontSize="12" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" letterSpacing="2" fontWeight="500">内敛空间</text>
    </svg>
  )
}

// ─── SVG: Study desk still life ─────────────────────────────────────────────
function StudyIllustration() {
  return (
    <svg viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[200px] mx-auto">
      {/* Desktop surface */}
      <path d="M15 160 L225 160 L235 175 L5 175 Z" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.8" opacity="0.6"/>

      {/* Open book */}
      <path d="M30 140 Q65 135 80 140 L80 165 Q65 162 30 165 Z" fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.8"/>
      <path d="M80 140 Q95 135 130 140 L130 165 Q95 162 80 165 Z" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.8"/>
      {/* Book text lines */}
      <line x1="36" y1="148" x2="74" y2="147" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.4"/>
      <line x1="36" y1="153" x2="70" y2="152" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.4"/>
      <line x1="36" y1="158" x2="72" y2="157" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.4"/>
      <line x1="86" y1="148" x2="124" y2="147" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.4"/>
      <line x1="86" y1="153" x2="120" y2="152" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.4"/>

      {/* Ink bottle */}
      <rect x="148" y="145" width="18" height="18" rx="3" fill="var(--ink)" opacity="0.3" stroke="var(--ink-soft)" strokeWidth="0.7"/>
      <rect x="152" y="140" width="10" height="8" rx="2" fill="var(--ink-soft)" opacity="0.4"/>

      {/* Hanging scroll background */}
      <rect x="168" y="20" width="44" height="115" rx="1" fill="var(--paper-soft)" opacity="0.7" stroke="var(--ink-mute)" strokeWidth="0.6"/>
      <rect x="166" y="18" width="48" height="6" rx="2" fill="var(--ink-soft)" opacity="0.35"/>
      <rect x="166" y="131" width="48" height="6" rx="2" fill="var(--ink-soft)" opacity="0.35"/>
      {/* 余韵 on scroll */}
      <text x="190" y="65" textAnchor="middle" fontSize="11" fill="var(--ink)" opacity="0.6"
        fontFamily="'Noto Serif SC', serif">余</text>
      <text x="190" y="90" textAnchor="middle" fontSize="11" fill="var(--ink)" opacity="0.6"
        fontFamily="'Noto Serif SC', serif">韵</text>

      {/* Bamboo stalks — right side */}
      <line x1="222" y1="160" x2="222" y2="30" stroke="var(--tea)" strokeWidth="2" opacity="0.4"/>
      <line x1="228" y1="160" x2="228" y2="45" stroke="var(--tea)" strokeWidth="1.5" opacity="0.3"/>
      <line x1="222" y1="80" x2="228" y2="80" stroke="var(--tea)" strokeWidth="0.8" opacity="0.4"/>
      <line x1="222" y1="110" x2="228" y2="110" stroke="var(--tea)" strokeWidth="0.8" opacity="0.4"/>
      {/* Bamboo leaves */}
      <path d="M222 55 Q210 45 205 35" stroke="var(--tea)" strokeWidth="0.9" opacity="0.5" strokeLinecap="round"/>
      <path d="M222 55 Q215 50 218 40" stroke="var(--tea)" strokeWidth="0.8" opacity="0.4" strokeLinecap="round"/>

      {/* Smoke from somewhere — lingering resonance */}
      <path d="M155 140 Q152 125 155 112 Q158 100 155 88" stroke="#6b7a8d" strokeWidth="0.8"
        fill="none" strokeLinecap="round" opacity="0.35"/>
    </svg>
  )
}

// ─── Spirit card icons ───────────────────────────────────────────────────────
function IconWave() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
      <circle cx="20" cy="20" r="16" stroke="#6b7a8d" strokeWidth="1.2"/>
      {/* Bell — central */}
      <path d="M16.5 22 Q15 13 20 12.5 Q25 13 23.5 22 L24.5 23 L15.5 23 Z" stroke="#6b7a8d" strokeWidth="1.3" fill="#6b7a8d" fillOpacity="0.12" strokeLinejoin="round"/>
      {/* Clapper */}
      <circle cx="20" cy="24" r="0.9" fill="#6b7a8d"/>
      {/* Hanging point */}
      <line x1="20" y1="11" x2="20" y2="13" stroke="#6b7a8d" strokeWidth="1" strokeLinecap="round"/>
      {/* Sound arcs — diminishing outward */}
      <path d="M12 19 Q11 16 13 13" stroke="#6b7a8d" strokeWidth="1" fill="none" opacity="0.65" strokeLinecap="round"/>
      <path d="M28 19 Q29 16 27 13" stroke="#6b7a8d" strokeWidth="1" fill="none" opacity="0.65" strokeLinecap="round"/>
      <path d="M8 21 Q6 16 9 11" stroke="#6b7a8d" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M32 21 Q34 16 31 11" stroke="#6b7a8d" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round"/>
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
      <circle cx="20" cy="20" r="16" stroke="#6b7a8d" strokeWidth="1.2"/>
      {/* Bold brushstroke — the mark itself */}
      <path d="M8 16 Q12 15.5 15 18 Q18 21 21 22" stroke="#6b7a8d" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      {/* Continuation — fading dashes, the lingering impression */}
      <path d="M21 22 Q25 22.5 28 22" stroke="#6b7a8d" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeDasharray="2 1.8" opacity="0.55"/>
      <path d="M29 22 Q31 22 33 22" stroke="#6b7a8d" strokeWidth="0.85" fill="none" strokeLinecap="round" strokeDasharray="1.4 1.8" opacity="0.3"/>
    </svg>
  )
}

function IconMind() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
      <circle cx="20" cy="20" r="16" stroke="#6b7a8d" strokeWidth="1.2"/>
      {/* Pond surface — faint horizontal stillness lines */}
      <line x1="6" y1="13" x2="13" y2="13" stroke="#6b7a8d" strokeWidth="0.6" opacity="0.35" strokeLinecap="round"/>
      <line x1="27" y1="13" x2="34" y2="13" stroke="#6b7a8d" strokeWidth="0.6" opacity="0.35" strokeLinecap="round"/>
      <line x1="6" y1="29" x2="13" y2="29" stroke="#6b7a8d" strokeWidth="0.55" opacity="0.3" strokeLinecap="round"/>
      <line x1="27" y1="29" x2="34" y2="29" stroke="#6b7a8d" strokeWidth="0.55" opacity="0.3" strokeLinecap="round"/>
      {/* Centre point — the moment something emerges */}
      <circle cx="20" cy="20" r="1.3" fill="#6b7a8d"/>
      {/* Ripples expanding outward */}
      <circle cx="20" cy="20" r="5" stroke="#6b7a8d" strokeWidth="1" fill="none" opacity="0.7"/>
      <circle cx="20" cy="20" r="8.5" stroke="#6b7a8d" strokeWidth="0.85" fill="none" opacity="0.45"/>
      <circle cx="20" cy="20" r="12" stroke="#6b7a8d" strokeWidth="0.7" fill="none" opacity="0.25"/>
    </svg>
  )
}

function IconPetal() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
      <circle cx="20" cy="20" r="16" stroke="#6b7a8d" strokeWidth="1.2"/>
      {/* Falling petal — current position, solid */}
      <ellipse cx="23" cy="24" rx="3.5" ry="1.6" stroke="#6b7a8d" strokeWidth="1.3" fill="#6b7a8d" fillOpacity="0.18" strokeLinejoin="round" transform="rotate(-25 23 24)"/>
      {/* Ghost trail — previous positions, fading upward */}
      <ellipse cx="19.5" cy="17.5" rx="3" ry="1.4" stroke="#6b7a8d" strokeWidth="1" fill="none" opacity="0.5" transform="rotate(-12 19.5 17.5)"/>
      <ellipse cx="16.5" cy="12" rx="2.5" ry="1.2" stroke="#6b7a8d" strokeWidth="0.8" fill="none" opacity="0.28" transform="rotate(-2 16.5 12)"/>
      {/* Faint motion dots */}
      <circle cx="21.5" cy="20.5" r="0.45" fill="#6b7a8d" opacity="0.35"/>
      <circle cx="18" cy="14.5" r="0.4" fill="#6b7a8d" opacity="0.22"/>
    </svg>
  )
}

const spiritCards = [
  {
    icon: <IconWave />,
    title: '持久回响',
    body: '事物虽已结束，情绪却仍缓缓停留。如钟声散去后的静默，令人久久难忘。',
  },
  {
    icon: <IconClock />,
    title: '留白延伸',
    body: '不过度填满空间，让感受自然流动。在安静与空白之间，留下想象余地。',
  },
  {
    icon: <IconMind />,
    title: '静中生感',
    body: '真正动人的情绪，往往诞生于宁静。不喧哗、不直白，却更触动人心。',
  },
  {
    icon: <IconPetal />,
    title: '消逝之美',
    body: '正因为短暂，才显得更加深刻。花落、茶凉之后，余韵才缓缓浮现。',
  },
]

const applicationItems = [
  {
    label: '减而不繁',
    desc: '去除多余装饰，让感受自然浮现，余韵从克制之中悄悄生发出来。',
  },
  {
    label: '顺应时节',
    desc: '借由花器与光影的细微变化，呈现当下季节的呼吸与气息。',
  },
  {
    label: '留有余地',
    desc: '不过度定义情绪，保留想象空间，让观者完成属于自己的回响。',
  },
  {
    label: '静而有序',
    desc: '以克制与平衡营造安定氛围，让心绪在安静之中得到沉淀。',
  },
]

export default function YoinPage() {
  return (
    <main className="min-h-screen pb-32" style={{ background: 'var(--paper)' }}>

      {/* Back nav */}
      <PrincipleTopNav slug="yoin" />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <Section className="max-w-[900px] mx-auto px-6 pt-10 pb-16 md:pb-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: text */}
          <div>
            <FadeUp>
              <span className="seal text-[10px] tracking-[0.15em] mb-5 inline-block" style={{ background: '#6b7a8d', color: 'var(--paper)', opacity: 0.88, fontFamily: 'Noto Serif SC, serif', fontWeight: 500 }}>
                余音绕梁，三日不绝
              </span>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="text-6xl md:text-7xl font-light text-[var(--ink)] leading-none tracking-wide mb-3">
                余韵
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-sm text-[var(--ink-mute)] tracking-[0.25em] mb-7">
                よいん | Yoin
              </p>
              <div className="brush-divider w-20 mb-7" />
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="text-lg md:text-xl font-light text-[var(--ink-soft)] leading-[2.1] mb-5" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                余韵是事物结束之后，仍停留于感官与内心的回响——如钟声散去，而那沉默仍在震荡。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.9]">
                它不只存在于声音，也存在于茶香渐淡后的宁静、月色散去后的微妙情绪。真正深刻的感受，往往正是那份久久未散的余意。
              </p>
            </FadeUp>
          </div>

          {/* Right: illustration */}
          <FadeUp delay={0.2} className="flex justify-center">
            <Image src="/hero-yoin.png" alt="余韻 — Yoin" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
          </FadeUp>
        </div>
      </Section>

      {/* ── 余韵的精神 — paper-soft tinted band ──────────────────────────── */}
      <section style={{ background: 'var(--paper-soft)', borderTop: '1px solid var(--paper-deep)', borderBottom: '1px solid var(--paper-deep)' }}
               className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">essence</p>
            <h2 className="text-2xl font-light text-[var(--ink)] mb-8 tracking-wide">余韵的精神</h2>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {spiritCards.map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.08}>
                <div className="neumorph p-5 text-center h-full flex flex-col items-center gap-3"
                     style={{ borderTop: '2px solid #6b7a8d' }}>
                  {card.icon}
                  <h3 className="text-base font-medium text-[var(--ink)]"
                      style={{ fontFamily: "'Noto Serif SC', serif" }}>
                    {card.title}
                  </h3>
                  <p className="text-sm text-[var(--ink-mute)] leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Section>
      </section>

      {/* ── 余韵的空间表达 + 运用要素 — open section ──────────────────────── */}
      <Section className="max-w-[900px] mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left: space expression diagram */}
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">composition</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-6 tracking-wide">余韵的空间表达</h2>
            <div style={{ border: '1px solid var(--paper-deep)', padding: '24px', background: 'var(--paper)' }}>
              <SpaceDiagram />
              <div className="flex justify-between mt-4 px-2">
                <span className="text-[10px] text-[var(--ink-mute)]" style={{ fontFamily: "'Noto Serif SC', serif" }}>内敛空间</span>
                <span className="text-[10px] text-[var(--ink-mute)]" style={{ fontFamily: "'Noto Serif SC', serif" }}>自然气息</span>
              </div>
            </div>
          </FadeUp>

          {/* Right: application elements */}
          <FadeUp delay={0.1}>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">practice</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-6 tracking-wide">余韵的运用要素</h2>
            <ol>
              {applicationItems.map((item, i) => (
                <li key={item.label} className="flex gap-4 items-start py-5"
                    style={{ borderBottom: i < applicationItems.length - 1 ? '1px solid var(--paper-deep)' : 'none' }}>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold"
                        style={{ background: '#6b7a8d', color: '#fff' }}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-base font-medium text-[var(--ink)] mb-1"
                       style={{ fontFamily: "'Noto Serif SC', serif" }}>
                      {item.label}
                    </p>
                    <p className="text-sm text-[var(--ink-mute)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeUp>
        </div>
      </Section>

      {/* ── 生活中的余韵 — paper-deep band ───────────────────────────────── */}
      <section style={{ background: 'var(--paper-deep)', borderTop: '1px solid var(--paper-deep)' }}
               className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

            {/* Left: study desk illustration */}
            <FadeUp className="flex justify-center">
              <Image src="/everyday-yoin.png" alt="余韻 — everyday" width={480} height={480} className="w-full max-w-[340px] mx-auto object-contain" />
            </FadeUp>

            {/* Right: text + quote */}
            <FadeUp delay={0.1}>
              <h2 className="text-2xl font-light text-[var(--ink)] mb-5 tracking-wide"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}>
                生活中的余韵
              </h2>
              <p className="text-base text-[var(--ink-soft)] leading-[1.9] mb-4">
                余韵并不只存在于茶室之中。一次安静的阅读、一句轻声的话语、窗边停留的月光，甚至是一场短暂相遇后的沉默，都可能留下细微而悠长的回响。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.85] mb-8">
                它不会停留太久，却在心中缓缓延续——比记忆更轻，比遗忘更深。
              </p>

              {/* Quote box */}
              <div style={{ borderLeft: '3px solid #6b7a8d', paddingLeft: '20px', background: 'var(--paper-soft)', padding: '16px 20px' }}>
                <p className="text-base text-[var(--ink-soft)] leading-[1.9] italic"
                   style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>
                  在余韵中，我们感受事物消逝后的宁静，也在片刻之间，发现时间留下的温度。
                </p>
              </div>
            </FadeUp>
          </div>
        </Section>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <PrincipleBottomNav slug="yoin" />
    </main>
  )
}

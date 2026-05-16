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

// ─── SVG: Kimono in tokonoma frame ──────────────────────────────────────────
function KimonoIllustration() {
  return (
    <svg viewBox="0 0 240 270" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[210px] mx-auto">
      {/* Tokonoma alcove wall */}
      <rect x="10" y="10" width="220" height="250" rx="3" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      {/* Shoji grid — subtle */}
      {[55,100,145,190].map(x => <line key={x} x1={x} y1="10" x2={x} y2="260" stroke="var(--ink-mute)" strokeWidth="0.3" opacity="0.25"/>)}
      {[55,100,145,190,235].map(y => <line key={y} x1="10" y1={y} x2="230" y2={y} stroke="var(--ink-mute)" strokeWidth="0.3" opacity="0.25"/>)}

      {/* Display frame / shadowbox */}
      <rect x="100" y="18" width="118" height="155" rx="4" fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="1"/>
      <rect x="104" y="22" width="110" height="147" rx="2" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.5"/>

      {/* Kimono shape — indigo blue */}
      <path d="M159 38 C148 42 138 50 135 65 L130 130 L188 130 L183 65 C180 50 170 42 159 38 Z"
        fill="#3a4f6e" opacity="0.75"/>
      {/* Kimono collar */}
      <path d="M159 38 L152 65 L159 72 L166 65 Z" fill="var(--paper-soft)" opacity="0.9"/>
      {/* Kimono sleeves */}
      <path d="M135 70 L118 72 L116 105 L135 102 Z" fill="#3a4f6e" opacity="0.7"/>
      <path d="M183 70 L200 72 L202 105 L183 102 Z" fill="#3a4f6e" opacity="0.7"/>
      {/* Obi — sash */}
      <rect x="130" y="95" width="58" height="18" rx="1" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.6"/>
      <rect x="130" y="98" width="58" height="2" fill="var(--ink)" opacity="0.08"/>
      <rect x="130" y="108" width="58" height="2" fill="var(--ink)" opacity="0.08"/>
      {/* Kimono pattern — tiny geometric diamonds */}
      {[140,155,170,185].map(x =>
        [48,58,68,78,88].map(y => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="0.5"
            fill="var(--paper-soft)" opacity="0.18" transform={`rotate(45 ${x+2} ${y+2})`}/>
        ))
      )}
      {/* Hem */}
      <path d="M130 130 Q159 134 188 130" stroke="var(--ink-mute)" strokeWidth="0.6" fill="none" opacity="0.5"/>

      {/* Scroll — left of frame */}
      <rect x="20" y="22" width="70" height="148" rx="2" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <rect x="17" y="20" width="76" height="6" rx="3" fill="var(--ink)" opacity="0.18"/>
      <rect x="17" y="164" width="76" height="6" rx="3" fill="var(--ink)" opacity="0.18"/>
      <text x="55" y="52" fontSize="11" fill="var(--ink-soft)" fontFamily="Noto Serif SC, serif"
        writingMode="vertical-rl" textAnchor="middle" letterSpacing="6">粋在其中</text>

      {/* Calligraphy brush beside frame */}
      <line x1="224" y1="28" x2="224" y2="145" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      <path d="M222 145 C222 152 226 158 224 162" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      <ellipse cx="224" cy="164" rx="3" ry="5" fill="var(--ink)" opacity="0.3"/>

      {/* Small pearl accent */}
      <circle cx="218" cy="60" r="4" fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.7"/>
      <circle cx="217" cy="59" r="1.2" fill="var(--paper-soft)" opacity="0.8"/>

      {/* Bamboo — right edge */}
      <line x1="228" y1="10" x2="228" y2="260" stroke="var(--tea)" strokeWidth="3.5" opacity="0.3"/>
      {[50,100,150,200].map(y => (
        <line key={y} x1="225" y1={y} x2="231" y2={y} stroke="var(--tea-deep)" strokeWidth="1" opacity="0.35"/>
      ))}
      <path d="M228 70 C238 60 248 56 244 48" stroke="var(--tea)" strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
      <path d="M228 80 C240 82 250 76 246 66" stroke="var(--tea)" strokeWidth="1.1" strokeLinecap="round" opacity="0.35"/>

      {/* Floor — tatami hint */}
      <path d="M10 218 L230 218 L230 260 L10 260 Z" fill="var(--paper-deep)" opacity="0.3"/>
      <line x1="10" y1="238" x2="230" y2="238" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.3"/>
      <line x1="120" y1="218" x2="120" y2="260" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.3"/>
    </svg>
  )
}

// ─── SVG: Iki interior room diagram ─────────────────────────────────────────
function IkiRoomDiagram() {
  return (
    <svg viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[480px] mx-auto">
      {/* Floor perspective */}
      <path d="M30 275 L210 192 L390 275 Z" fill="var(--paper-deep)" opacity="0.3"/>
      <line x1="30" y1="275" x2="390" y2="275" stroke="var(--ink-mute)" strokeWidth="0.8" opacity="0.4"/>
      {/* Floor boards */}
      {[90,160,260,330].map(x => (
        <line key={x} x1={x} y1="275" x2={210 + (x-210)*0.3} y2="198" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.25"/>
      ))}

      {/* Back wall */}
      <rect x="70" y="22" width="280" height="170" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="1"/>
      {[44,64,84,104,124,144,164].map(y => (
        <line key={y} x1="71" y1={y} x2="349" y2={y} stroke="var(--ink-mute)" strokeWidth="0.35" opacity="0.15"/>
      ))}

      {/* Wall columns */}
      <rect x="62" y="22" width="10" height="170" fill="var(--ink)" opacity="0.1"/>
      <rect x="348" y="22" width="10" height="170" fill="var(--ink)" opacity="0.1"/>

      {/* Shoji panel — left side */}
      <rect x="86" y="34" width="100" height="140" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.2"/>
      {[120,152].map(x => <line key={x} x1={x} y1="34" x2={x} y2="174" stroke="var(--ink-soft)" strokeWidth="0.6" opacity="0.55"/>)}
      {[68,102,136].map(y => <line key={y} x1="86" y1={y} x2="186" y2={y} stroke="var(--ink-soft)" strokeWidth="0.6" opacity="0.55"/>)}
      {/* Light glow through shoji */}
      <rect x="87" y="35" width="98" height="138" fill="var(--gold)" opacity="0.08"/>

      {/* Fabric panel — right side */}
      <rect x="210" y="34" width="120" height="140" rx="2" fill="#3a4f6e" opacity="0.14" stroke="var(--ink)" strokeWidth="1.2"/>
      {/* Diamond weave pattern */}
      {Array.from({length: 7}).map((_, ix) =>
        Array.from({length: 8}).map((_, iy) => (
          <rect key={`${ix}-${iy}`} x={222 + ix * 16} y={46 + iy * 16} width="4.5" height="4.5"
                fill="var(--ink)" opacity="0.08" transform={`rotate(45 ${224.25 + ix * 16} ${48.25 + iy * 16})`}/>
        ))
      )}

      {/* Floor shadow under vase */}
      <ellipse cx="148" cy="252" rx="16" ry="3" fill="var(--ink)" opacity="0.12"/>
      {/* Bottle vase (tokkuri-style) — bulbous body, narrow neck */}
      <path d="M144 214 L142 222 Q138 224 136 230 Q134 244 148 250 Q162 244 160 230 Q158 224 154 222 L152 214 Q148 212 144 214 Z"
            fill="var(--paper-soft)" stroke="var(--ink)" strokeWidth="1.2" strokeLinejoin="round"/>
      {/* Vase mouth highlight */}
      <ellipse cx="148" cy="214" rx="4" ry="1" fill="none" stroke="var(--ink)" strokeWidth="0.9"/>
      {/* Subtle shadow on right side of vase */}
      <path d="M153 222 Q157 226 158 232 Q158 240 153 247" stroke="var(--ink)" strokeWidth="0.55" fill="none" opacity="0.35"/>

      {/* Plum branch — graceful curve from vase */}
      <path d="M147 213 C144 198 136 184 126 173" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      {/* Small side branch */}
      <path d="M138 192 C132 188 124 188 119 192" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" fill="none"/>
      {/* Tiny twig */}
      <path d="M132 184 C129 181 125 181 122 182" stroke="var(--ink)" strokeWidth="0.8" strokeLinecap="round" fill="none"/>

      {/* Plum blossoms */}
      <circle cx="126" cy="173" r="2.6" fill="var(--plum)" fillOpacity="0.3" stroke="var(--plum)" strokeWidth="1.1"/>
      <circle cx="126" cy="173" r="0.7" fill="var(--plum)" opacity="0.85"/>
      <circle cx="119" cy="192" r="1.8" fill="var(--plum)" fillOpacity="0.28" stroke="var(--plum)" strokeWidth="1"/>
      <circle cx="119" cy="192" r="0.5" fill="var(--plum)" opacity="0.8"/>
      {/* Bud */}
      <circle cx="122" cy="182" r="0.9" fill="var(--plum)" opacity="0.65"/>

      {/* ──────── Labels ──────── */}
      {/* 隐秘结构 — shoji grid */}
      <line x1="186" y1="60" x2="218" y2="48" stroke="var(--ink-mute)" strokeWidth="0.8" strokeDasharray="3 3"/>
      <text x="220" y="48" fontSize="12" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500">隐秘结构</text>
      <text x="220" y="61" fontSize="9" fill="var(--ink-mute)" fontFamily="Inter, sans-serif" letterSpacing="1">(STRUCTURE)</text>

      {/* 精致纹理 — fabric */}
      <line x1="295" y1="105" x2="360" y2="100" stroke="var(--ink-mute)" strokeWidth="0.8" strokeDasharray="3 3"/>
      <text x="362" y="100" fontSize="12" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500">精致纹理</text>
      <text x="362" y="113" fontSize="9" fill="var(--ink-mute)" fontFamily="Inter, sans-serif" letterSpacing="1">(TEXTURE)</text>

      {/* 色彩点缀 — single accent bloom */}
      <line x1="130" y1="172" x2="60" y2="158" stroke="var(--plum)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.65"/>
      <text x="56" y="156" fontSize="12" fill="var(--plum)" fontFamily="'Noto Serif SC', serif" fontWeight="500" textAnchor="end">色彩点缀</text>
      <text x="56" y="169" fontSize="9" fill="var(--plum)" fontFamily="Inter, sans-serif" textAnchor="end" opacity="0.75" letterSpacing="1">(ACCENT)</text>

      {/* 室内空间 */}
      <text x="38" y="262" fontSize="11" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500">室内空间</text>
      <text x="38" y="274" fontSize="8.5" fill="var(--ink-mute)" fontFamily="Inter, sans-serif" letterSpacing="1">(INTERIOR)</text>

      {/* 光影效果 */}
      <text x="382" y="262" fontSize="11" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500" textAnchor="end">光影效果</text>
      <text x="382" y="274" fontSize="8.5" fill="var(--ink-mute)" fontFamily="Inter, sans-serif" textAnchor="end" letterSpacing="1">(LIGHT &amp; SHADOW)</text>
    </svg>
  )
}

// ─── SVG: Room with 粋 scroll ────────────────────────────────────────────────
function IkiScrollRoom() {
  return (
    <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[160px] mx-auto">
      <rect x="10" y="10" width="180" height="148" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="1"/>
      {/* Wood desk suggestion */}
      <rect x="30" y="130" width="100" height="28" rx="2" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.7"/>
      <line x1="30" y1="148" x2="130" y2="148" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.4"/>
      {/* Chair */}
      <rect x="110" y="125" width="20" height="35" rx="2" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.6" opacity="0.6"/>
      <path d="M10 158 L190 158 L210 220 L-10 220 Z" fill="var(--paper-deep)" opacity="0.4"/>
      <line x1="10" y1="178" x2="190" y2="178" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.3"/>
      <line x1="100" y1="158" x2="100" y2="220" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.25"/>
      <rect x="40" y="10" width="120" height="122" fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      {/* Scroll */}
      <rect x="72" y="18" width="56" height="100" rx="2" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <rect x="68" y="16" width="64" height="5" rx="2.5" fill="var(--ink)" opacity="0.18"/>
      <rect x="68" y="114" width="64" height="5" rx="2.5" fill="var(--ink)" opacity="0.18"/>
      <text x="98" y="44" fontSize="9" fill="var(--ink-soft)" fontFamily="Noto Serif SC, serif"
        writingMode="vertical-rl" textAnchor="middle" letterSpacing="4">粋在其中</text>
      {/* Small vase on desk */}
      <rect x="55" y="120" width="10" height="12" rx="2" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.7"/>
      <path d="M60 120 C58 114 54 108 50 102" stroke="var(--ink)" strokeWidth="0.9" strokeLinecap="round"/>
      <circle cx="50" cy="101" r="2.5" stroke="var(--plum)" strokeWidth="0.7" fill="var(--paper)"/>
    </svg>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconDetach = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--plum)" strokeWidth="1.2"/>
    {/* Folded fan — curved arc top, pivot at bottom */}
    <path d="M20 28 L9.3 19 A 14 14 0 0 1 30.7 19 Z" stroke="var(--plum)" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    {/* Inner ribs radiating from pivot */}
    <line x1="20" y1="28" x2="14.1" y2="15.3" stroke="var(--plum)" strokeWidth="0.85" opacity="0.6" strokeLinecap="round"/>
    <line x1="20" y1="28" x2="20" y2="14" stroke="var(--plum)" strokeWidth="0.85" opacity="0.6" strokeLinecap="round"/>
    <line x1="20" y1="28" x2="25.9" y2="15.3" stroke="var(--plum)" strokeWidth="0.85" opacity="0.6" strokeLinecap="round"/>
    {/* Pivot rivet */}
    <circle cx="20" cy="28" r="1.1" fill="var(--plum)"/>
  </svg>
)
const IconRestraint = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--plum)" strokeWidth="1.2"/>
    {/* Single bold vertical brushstroke */}
    <path d="M20 11.5 Q19.6 19.5 20 28" stroke="var(--plum)" strokeWidth="2.6" strokeLinecap="round" fill="none"/>
    {/* Single accent dot — controlled placement */}
    <circle cx="25.5" cy="14" r="1.1" fill="var(--plum)" opacity="0.7"/>
  </svg>
)
const IconRefined = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--plum)" strokeWidth="1.2"/>
    {/* Open book — two facing pages */}
    <path d="M10.5 14 Q20 12 29.5 14 L29.5 26 Q20 24.5 10.5 26 Z" stroke="var(--plum)" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    {/* Spine */}
    <line x1="20" y1="13" x2="20" y2="25" stroke="var(--plum)" strokeWidth="1" opacity="0.65"/>
    {/* Text on pages */}
    <line x1="13" y1="17.5" x2="18" y2="17" stroke="var(--plum)" strokeWidth="0.65" opacity="0.55" strokeLinecap="round"/>
    <line x1="13" y1="20" x2="18" y2="19.6" stroke="var(--plum)" strokeWidth="0.65" opacity="0.5" strokeLinecap="round"/>
    <line x1="13" y1="22.5" x2="17.5" y2="22.2" stroke="var(--plum)" strokeWidth="0.6" opacity="0.4" strokeLinecap="round"/>
    <line x1="22" y1="17" x2="27" y2="17.5" stroke="var(--plum)" strokeWidth="0.65" opacity="0.55" strokeLinecap="round"/>
    <line x1="22" y1="19.6" x2="27" y2="20" stroke="var(--plum)" strokeWidth="0.65" opacity="0.5" strokeLinecap="round"/>
    <line x1="22.5" y1="22.2" x2="27" y2="22.5" stroke="var(--plum)" strokeWidth="0.6" opacity="0.4" strokeLinecap="round"/>
  </svg>
)
const IconRespect = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--plum)" strokeWidth="1.2"/>
    {/* Two facing figures — heads */}
    <circle cx="14.5" cy="17" r="3" stroke="var(--plum)" strokeWidth="1.15"/>
    <circle cx="25.5" cy="17" r="3" stroke="var(--plum)" strokeWidth="1.15"/>
    {/* Shoulders */}
    <path d="M10 28 Q14.5 22.5 19 26" stroke="var(--plum)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
    <path d="M21 26 Q25.5 22.5 30 28" stroke="var(--plum)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
    {/* Respectful gap — dashed indicator */}
    <line x1="17.8" y1="17.5" x2="22.2" y2="17.5" stroke="var(--plum)" strokeWidth="0.7" opacity="0.45" strokeDasharray="1 1.5"/>
  </svg>
)

const spiritCards = [
  { Icon: IconDetach,    title: '洒脱超然', desc: '不执着于世俗虚名，保持内心纯净。体现一种不经意间的时髦。' },
  { Icon: IconRestraint, title: '克制美学', desc: '多即是少，利用最简洁的元素表达深意。追求精神上的深度。' },
  { Icon: IconRefined,   title: '知性洗练', desc: '通过知识与阅历提升内在修养与品位。散发成熟魅力。' },
  { Icon: IconRespect,   title: '尊重他人', desc: '言行举止得体，保持恰当的距离感。体现人情世故的达观。' },
]

const applicationItems = [
  { title: '隐约的魅力', desc: '避免炫耀，将美感悄悄藏在细节之中，让懂得的人会心一笑。' },
  { title: '细节的讲究', desc: '在面料、剪裁和搭配上精益求精，看似平淡却经得起细细品味。' },
  { title: '时令的把握', desc: '根据季节和场合调整服饰与心情，让得体本身成为一种修养。' },
  { title: '平衡之美',   desc: '在简洁与丰富、传统与现代之间寻求平衡，分寸自有韵味。' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function IkiPage() {
  return (
    <main className="min-h-screen pb-32" style={{ position: 'relative', zIndex: 1 }}>

      <PrincipleTopNav slug="iki" />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Section className="max-w-[900px] mx-auto px-6 pt-14 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <FadeUp>
              <span className="seal text-[10px] tracking-[0.15em] mb-5 inline-block" style={{ background: 'var(--plum)', color: 'var(--paper)', opacity: 0.88, fontFamily: 'Noto Serif SC, serif', fontWeight: 500 }}>
                克制乃最深之美
              </span>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="text-7xl md:text-8xl font-light text-[var(--ink)] leading-none tracking-[0.2em] mb-3">
                粋
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-sm text-[var(--ink-mute)] tracking-[0.25em] mb-7">
                いき | Iki
              </p>
              <div className="brush-divider w-20 mb-7" />
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-lg md:text-xl font-light text-[var(--ink-soft)] leading-[2.1] mb-5 max-w-[460px]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                粋是偏向禅意与克制的审美意识，代表一种精练、不着痕迹且低调的优雅。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.9] max-w-[460px]">
                它不只是外在的风格，更是一种内在的洒脱——知道什么不必说，也知道什么不必穿。
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="flex items-center justify-center md:justify-end">
            <Image src="/hero-iki.png" alt="粋 — Iki" width={640} height={640} className="w-full max-w-[560px] mx-auto object-contain" />
          </FadeUp>
        </div>
      </Section>

      {/* ── 粋的精神 — tinted band, plum accent bar ────────────────────────── */}
      <section style={{ background: 'var(--paper-soft)' }} className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <FadeUp className="mb-10">
            <p className="font-sans-zen text-[10px] tracking-[0.5em] text-[var(--ink-mute)] uppercase mb-2">essence</p>
            <h2 className="text-2xl font-light text-[var(--ink)] tracking-[0.12em]">粋的精神</h2>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {spiritCards.map(({ Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <div className="bg-[var(--paper)] rounded-xl p-5 h-full flex flex-col items-center text-center"
                  style={{ borderTop: '2px solid var(--plum)' }}>
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

      {/* ── 运用要素 — open, border diagram + hairline list ────────────────── */}
      <Section className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">composition</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-7 tracking-wide">粋的运用要素</h2>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--paper-deep)' }}>
              <IkiRoomDiagram />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">practice</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-8 tracking-wide">运用的要素</h2>
            <div className="flex flex-col">
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
                    style={{ background: 'var(--plum)', color: '#fff' }}>
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

      {/* ── 生活中的粋 — deep band, gold quote border ──────────────────────── */}
      <section style={{ background: 'var(--paper-deep)' }}>
        <Section className="max-w-[900px] mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeUp className="flex justify-center">
              <Image src="/everyday-iki.png" alt="粋 — everyday" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">everyday</p>
              <h2 className="text-2xl font-light text-[var(--ink)] mb-5 tracking-wide">生活中的粋</h2>
              <p className="text-[var(--ink-soft)] leading-[2.1] mb-4 text-base md:text-lg" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                粋不仅限于时尚。一个简单的花瓶、一种舒适的色彩，甚至一次真诚的对话，都能成为粋的体现。
              </p>
              <p className="text-[var(--ink-mute)] leading-[2.1] mb-8 text-base" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                不因繁复而累，不因单调而乏——粋是一种恰到好处的自在。
              </p>
              <blockquote className="pl-5 py-1" style={{ borderLeft: '2px solid var(--gold)' }}>
                <p className="text-base text-[var(--ink-soft)] leading-[2] italic" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                  粋不炫耀，也不隐藏——它只是在那里，像一把好茶，等懂的人来发现。
                </p>
              </blockquote>
            </FadeUp>
          </div>
        </Section>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <PrincipleBottomNav slug="iki" />
    </main>
  )
}

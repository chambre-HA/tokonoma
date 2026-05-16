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

// ─── SVG: Ikebana vase ───────────────────────────────────────────────────────
function IkebanaIllustration() {
  return (
    <svg viewBox="0 0 240 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[200px] mx-auto">
      <path d="M120 255 C115 215 95 175 60 115 C45 90 30 65 50 35" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M120 235 C130 195 155 160 185 125 C195 110 210 90 200 60" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M90 155 C75 140 60 133 42 137" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M155 160 C165 145 172 135 178 123" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round"/>
      <path d="M165 150 C172 143 180 140 188 143" stroke="var(--ink)" strokeWidth="0.9" strokeLinecap="round"/>
      <circle cx="50" cy="35" r="8" stroke="var(--plum)" strokeWidth="1.2" fill="var(--paper)"/>
      <circle cx="50" cy="35" r="3" fill="var(--gold)" opacity="0.7"/>
      <circle cx="38" cy="33" r="5" stroke="var(--plum)" strokeWidth="1" fill="var(--paper)" opacity="0.6"/>
      <ellipse cx="70" cy="110" rx="8" ry="4" fill="var(--tea)" opacity="0.5" transform="rotate(-35 70 110)"/>
      <ellipse cx="100" cy="180" rx="7" ry="3.5" fill="var(--tea)" opacity="0.4" transform="rotate(20 100 180)"/>
      <ellipse cx="175" cy="123" rx="7" ry="3" fill="var(--tea)" opacity="0.45" transform="rotate(-20 175 123)"/>
      <circle cx="200" cy="57" r="6" stroke="var(--plum)" strokeWidth="1" fill="var(--paper)" opacity="0.8"/>
      <circle cx="200" cy="57" r="2.5" fill="var(--gold)" opacity="0.6"/>
      <path d="M95 255 C88 250 82 243 82 235 C82 227 88 223 95 221 L145 221 C152 223 158 227 158 235 C158 243 152 250 145 255 Z"
        fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="1.2"/>
      <rect x="104" y="249" width="32" height="8" rx="2" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="1"/>
      <path d="M90 233 Q120 230 150 233" stroke="var(--ink-mute)" strokeWidth="0.6" fill="none" opacity="0.5"/>
      <rect x="88" y="261" width="64" height="4" rx="1" fill="var(--ink)" opacity="0.08"/>
    </svg>
  )
}

// ─── SVG: Zen garden diagram ─────────────────────────────────────────────────
function ZenGardenDiagram() {
  return (
    <svg viewBox="0 0 380 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[440px] mx-auto">
      {/* Garden boundary — wooden frame, slightly rounded */}
      <rect x="18" y="30" width="344" height="232" rx="6" stroke="var(--ink-soft)" strokeWidth="1.4" fill="var(--paper-soft)" fillOpacity="0.55"/>
      <rect x="22" y="34" width="336" height="224" rx="4" stroke="var(--ink-mute)" strokeWidth="0.6" fill="none" opacity="0.4"/>

      {/* Raked sand — concentric ripples around main stone group */}
      {[0,1,2,3,4,5].map(i => (
        <ellipse key={`m${i}`} cx="220" cy="148" rx={46+i*18} ry={28+i*9}
          stroke="var(--ink-mute)" strokeWidth="0.6" fill="none" opacity={0.4 - i*0.05}/>
      ))}

      {/* Raked sand — ripples around left accent stone */}
      {[0,1,2].map(i => (
        <ellipse key={`l${i}`} cx="85" cy="200" rx={22+i*12} ry={12+i*6}
          stroke="var(--ink-mute)" strokeWidth="0.5" fill="none" opacity={0.32 - i*0.08}/>
      ))}

      {/* Raked sand — ripples around right-top accent stone */}
      {[0,1,2].map(i => (
        <ellipse key={`r${i}`} cx="310" cy="80" rx={16+i*9} ry={9+i*5}
          stroke="var(--ink-mute)" strokeWidth="0.5" fill="none" opacity={0.32 - i*0.08}/>
      ))}

      {/* MAIN STONE GROUP — 3-stone arrangement (center-right) */}
      {/* Tall vertical stone (oyaishi) */}
      <path d="M220 105 Q205 110 205 142 Q205 162 220 167 Q236 162 236 140 Q236 110 220 105Z"
            fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M214 118 Q212 130 215 148" stroke="var(--ink)" strokeWidth="0.6" fill="none" opacity="0.35"/>
      {/* Mid stone — front-left */}
      <ellipse cx="198" cy="162" rx="22" ry="14" fill="var(--paper-soft)" stroke="var(--ink)" strokeWidth="1.2"/>
      {/* Low stone — front-right */}
      <ellipse cx="244" cy="170" rx="18" ry="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1.1"/>

      {/* Main group label */}
      <text x="220" y="63" textAnchor="middle" fontSize="14"
            fill="var(--ink)" fontFamily="'Noto Serif SC', serif" fontWeight="500">主景</text>
      <text x="220" y="78" textAnchor="middle" fontSize="9.5"
            fill="var(--ink-mute)" fontFamily="Inter, sans-serif" letterSpacing="1">(SHUKEI)</text>
      <line x1="220" y1="84" x2="220" y2="102" stroke="var(--ink-mute)" strokeWidth="0.7"/>

      {/* LEFT ACCENT STONES — pair */}
      <ellipse cx="80" cy="200" rx="16" ry="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1.1"/>
      <ellipse cx="96" cy="208" rx="10" ry="6.5" fill="var(--paper-soft)" stroke="var(--ink)" strokeWidth="0.95"/>

      {/* Left label */}
      <text x="65" y="237" textAnchor="middle" fontSize="12"
            fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500">辅景</text>
      <text x="65" y="250" textAnchor="middle" fontSize="9"
            fill="var(--ink-mute)" fontFamily="Inter, sans-serif" letterSpacing="1">(FUKEI)</text>
      <line x1="70" y1="228" x2="78" y2="212" stroke="var(--ink-mute)" strokeWidth="0.7" strokeDasharray="2.5 2.5" opacity="0.55"/>

      {/* RIGHT-TOP ACCENT STONE — single */}
      <ellipse cx="308" cy="80" rx="14" ry="9" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1.1"/>
      <text x="335" y="74" textAnchor="middle" fontSize="12"
            fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500">辅景</text>
      <text x="335" y="88" textAnchor="middle" fontSize="9"
            fill="var(--ink-mute)" fontFamily="Inter, sans-serif" letterSpacing="1">(FUKEI)</text>
      <line x1="326" y1="79" x2="320" y2="80" stroke="var(--ink-mute)" strokeWidth="0.7" strokeDasharray="2.5 2.5" opacity="0.55"/>

      {/* 余白 label — placed prominently in the empty area */}
      <text x="105" y="125" textAnchor="middle" fontSize="26"
            fill="var(--tea-deep)" fontFamily="'Noto Serif SC', serif" fontWeight="500" opacity="0.65">余白</text>
      <text x="105" y="143" textAnchor="middle" fontSize="11"
            fill="var(--tea-deep)" fontFamily="Inter, sans-serif" opacity="0.55" letterSpacing="1.5">(YOHAKU)</text>
      <text x="105" y="160" textAnchor="middle" fontSize="10"
            fill="var(--ink-mute)" fontFamily="'Noto Serif SC', serif" opacity="0.6" letterSpacing="1">— 留白即风景 —</text>
    </svg>
  )
}

// ─── SVG: Tokonoma room ──────────────────────────────────────────────────────
function TokonomatRoom() {
  return (
    <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[160px] mx-auto">
      <rect x="10" y="10" width="180" height="148" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="1"/>
      <path d="M10 158 L190 158 L210 220 L-10 220 Z" fill="var(--paper-deep)" opacity="0.45"/>
      <line x1="10" y1="178" x2="190" y2="178" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.35"/>
      <line x1="10" y1="198" x2="190" y2="198" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.25"/>
      <line x1="100" y1="158" x2="100" y2="220" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.25"/>
      <rect x="40" y="10" width="120" height="146" fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <rect x="78" y="22" width="44" height="108" rx="2" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <rect x="74" y="20" width="52" height="5" rx="2.5" fill="var(--ink)" opacity="0.2"/>
      <rect x="74" y="126" width="52" height="5" rx="2.5" fill="var(--ink)" opacity="0.2"/>
      <text x="96" y="48" fontSize="9" fill="var(--ink-soft)" fontFamily="Noto Serif SC, serif" writingMode="vertical-rl" textAnchor="middle" letterSpacing="4">余白有美</text>
      <ellipse cx="100" cy="156" rx="13" ry="7" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <rect x="93" y="143" width="14" height="14" rx="3" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <path d="M100 143 C97 133 90 123 85 113" stroke="var(--ink)" strokeWidth="1" strokeLinecap="round"/>
      <path d="M98 128 C93 122 88 119 82 120" stroke="var(--ink)" strokeWidth="0.8" strokeLinecap="round"/>
      <circle cx="85" cy="112" r="3" stroke="var(--plum)" strokeWidth="0.8" fill="var(--paper)"/>
    </svg>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconHand = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--tea)" strokeWidth="1.2"/>
    {/* Four corner brackets — frame defining negative space */}
    <path d="M11 14 V11 H14" stroke="var(--tea)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
    <path d="M29 14 V11 H26" stroke="var(--tea)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
    <path d="M11 26 V29 H14" stroke="var(--tea)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
    <path d="M29 26 V29 H26" stroke="var(--tea)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
    {/* Single small subject in center */}
    <circle cx="20" cy="20" r="1.6" fill="var(--tea)" opacity="0.85"/>
  </svg>
)
const IconTorii = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--tea)" strokeWidth="1.2"/>
    {/* Stone sitting in still water */}
    <ellipse cx="20" cy="22" rx="2.3" ry="1.6" fill="var(--tea)" opacity="0.8"/>
    {/* Concentric ripples expanding outward */}
    <ellipse cx="20" cy="22" rx="5.2" ry="1.4" stroke="var(--tea)" strokeWidth="0.9" fill="none" opacity="0.55"/>
    <ellipse cx="20" cy="22" rx="8.5" ry="2.1" stroke="var(--tea)" strokeWidth="0.75" fill="none" opacity="0.38"/>
    <ellipse cx="20" cy="22" rx="11.8" ry="2.7" stroke="var(--tea)" strokeWidth="0.6" fill="none" opacity="0.22"/>
  </svg>
)
const IconMountain = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--tea)" strokeWidth="1.2"/>
    {/* Horizon line — extends nearly to edge */}
    <line x1="6.5" y1="22" x2="33.5" y2="22" stroke="var(--tea)" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
    {/* Distant moon hovering above the horizon */}
    <circle cx="22.5" cy="14" r="2.5" stroke="var(--tea)" strokeWidth="1.1" fill="none"/>
    {/* Faint reflection bands — vast water below */}
    <line x1="11" y1="26.5" x2="29" y2="26.5" stroke="var(--tea)" strokeWidth="0.6" opacity="0.32"/>
    <line x1="14" y1="29.5" x2="26" y2="29.5" stroke="var(--tea)" strokeWidth="0.5" opacity="0.2"/>
  </svg>
)
const IconInfinity = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--tea)" strokeWidth="1.2"/>
    {/* Bold ink blob — the visible mark */}
    <ellipse cx="20" cy="20" rx="2.9" ry="2.3" fill="var(--tea)"/>
    {/* Echo rings — meaning radiating beyond */}
    <circle cx="20" cy="20" r="6.5" stroke="var(--tea)" strokeWidth="1" fill="none" opacity="0.6" strokeDasharray="2.2 2.2"/>
    <circle cx="20" cy="20" r="11" stroke="var(--tea)" strokeWidth="0.85" fill="none" opacity="0.4" strokeDasharray="1.8 2.4"/>
  </svg>
)

const spiritCards = [
  { Icon: IconHand,     title: '呼吸之境', desc: '不以填满为目的，而是赋予事物以生命与呼吸的余地。减少视觉杂乱，让真正重要的主体得以凸显。' },
  { Icon: IconTorii,    title: '静寂之美', desc: '在未被占用的空白之中寻找平和。它过滤掉外界的喧嚣，向内传达一种深沉的宁静与禅意。' },
  { Icon: IconMountain, title: '无限延展', desc: '超越物理边框与框架的广阔感。以有限的实体，激发观者无限的想象力与可能性。' },
  { Icon: IconInfinity, title: '意境深远', desc: '言有尽而意无穷。在笔墨未触及之处，往往隐藏着最为隽永的深意与精神上的深度。' },
]

const applicationItems = [
  { title: '极简选择', desc: '以克制的态度精选物件，让留下来的每一物都拥有不可替代的分量。' },
  { title: '视觉平衡', desc: '追求非对称的动态和谐，用恰到好处的空白稳定整体构图，使其不显拥挤。' },
  { title: '创造距离', desc: '在人与物、物与物之间拉开适当的空间层次，距离感自见庄严与神圣。' },
  { title: '尊重的表达', desc: '用留白来表达对他人的尊重——不将话说尽，给对方留有体悟与思考的空间。' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function YohakuPage() {
  return (
    <main className="min-h-screen pb-32" style={{ position: 'relative', zIndex: 1 }}>

      <PrincipleTopNav slug="yohaku" />

      {/* ── HERO — open, no containers ─────────────────────────────────────── */}
      <Section className="max-w-[900px] mx-auto px-6 pt-14 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <FadeUp>
              <span className="seal text-[10px] tracking-[0.15em] mb-5 inline-block" style={{ background: 'var(--tea)', color: 'var(--paper)', opacity: 0.88, fontFamily: 'Noto Serif SC, serif', fontWeight: 500 }}>
                留白即是满盈
              </span>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="text-6xl md:text-7xl font-light text-[var(--ink)] leading-none tracking-wide mb-3">
                余白
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-sm text-[var(--ink-mute)] tracking-[0.25em] mb-7">
                よはくのび | Yohaku no Bi
              </p>
              <div className="brush-divider w-20 mb-7" />
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-lg md:text-xl font-light text-[var(--ink-soft)] leading-[2.1] mb-5 max-w-[480px]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                余白是充满禅意的空间艺术——不只是装饰，更是一种表达。它赋予事物呼吸的余地，让主体在沉默中凸显。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.9] max-w-[480px]">
                真正动人的空间，不是被填满，而是被留出一片可以安放心绪的静处。
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="flex items-center justify-center md:justify-end">
            <Image src="/hero-Yohaku.png" alt="余白 — Yohaku" width={640} height={640} className="w-full max-w-[560px] mx-auto object-contain" />
          </FadeUp>
        </div>
      </Section>

      {/* ── 余白的精神 — tinted band, flat accent-bar cards ────────────────── */}
      <section style={{ background: 'var(--paper-soft)' }} className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <FadeUp className="mb-10">
            <p className="font-sans-zen text-[10px] tracking-[0.5em] text-[var(--ink-mute)] uppercase mb-2">essence</p>
            <h2 className="text-2xl font-light text-[var(--ink)] tracking-[0.12em]">余白的精神</h2>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {spiritCards.map(({ Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                {/* No shadow — just a top accent bar and clean background */}
                <div className="bg-[var(--paper)] rounded-xl p-5 h-full flex flex-col items-center text-center"
                  style={{ borderTop: '2px solid var(--tea)' }}>
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

      {/* ── 运用要素 — pure open layout, no containers ────────────────────── */}
      <Section className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start">

          {/* Left — diagram, bordered only */}
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">composition</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-7 tracking-wide">余白的运用要素</h2>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--paper-deep)' }}>
              <ZenGardenDiagram />
            </div>
          </FadeUp>

          {/* Right — plain list, gold dot markers */}
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
                    style={{ background: 'var(--tea)', color: '#fff' }}>
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

      {/* ── 生活中的余白 — deep paper tone, left-border quote ──────────────── */}
      <section style={{ background: 'var(--paper-deep)', opacity: 1 }}>
        <Section className="max-w-[900px] mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

            {/* Left — room illustration, bare */}
            <FadeUp className="flex justify-center">
              <Image src="/everyday-Yohaku.png" alt="余白 — everyday" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
            </FadeUp>

            {/* Right — text, no card */}
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">everyday</p>
              <h2 className="text-2xl font-light text-[var(--ink)] mb-5 tracking-wide">生活中的余白</h2>
              <p className="text-[var(--ink-soft)] leading-[2.1] mb-4 text-base md:text-lg" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                余白并不只存在于画面或庭院之中。它也存在于房间的呼吸感、言语之间的停顿，以及器物之间恰到好处的距离里。
              </p>
              <p className="text-[var(--ink-mute)] leading-[2.1] mb-8 text-base" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                当你停止填充，开始留白，才会发现：空处，往往是最深的所在。
              </p>
              {/* Left-border quote — no shadow */}
              <blockquote className="pl-5 py-1" style={{ borderLeft: '2px solid var(--tea-deep)' }}>
                <p className="text-base text-[var(--ink-soft)] leading-[2] italic" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                  留白不是缺席，而是另一种存在——在那片空白里，心才找到了落脚之处。
                </p>
              </blockquote>
            </FadeUp>
          </div>
        </Section>
      </section>

      <PrincipleBottomNav slug="yohaku" />
    </main>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { PrincipleTopNav, PrincipleBottomNav } from '@/components/PrinciplePageNav'

const ACC = '#8a6878'   // dusty mauve — lingering emotion, faded but present

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

// ─── SVG: Haiku — moon over empty veranda, single plum branch ───────────────
function HaikuIllustration() {
  return (
    <svg viewBox="0 0 260 290" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[220px] mx-auto">
      {/* Veranda floor boards — receding perspective */}
      <path d="M0 220 L260 200 L260 290 L0 290Z" fill="var(--paper-soft)" opacity="0.5"/>
      <line x1="0" y1="235" x2="260" y2="218" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.3"/>
      <line x1="0" y1="252" x2="260" y2="237" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.25"/>
      <line x1="0" y1="268" x2="260" y2="255" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.2"/>
      {/* Vertical planks */}
      <line x1="65" y1="210" x2="50" y2="290" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.2"/>
      <line x1="130" y1="205" x2="120" y2="290" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.2"/>
      <line x1="195" y1="202" x2="190" y2="290" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.2"/>

      {/* Veranda edge rail */}
      <line x1="0" y1="220" x2="260" y2="200" stroke="var(--ink-soft)" strokeWidth="1.5" opacity="0.5"/>

      {/* Night sky */}
      <rect x="0" y="0" width="260" height="220" fill={ACC} opacity="0.04"/>

      {/* Moon — large, serene */}
      <circle cx="175" cy="70" r="42" fill={ACC} opacity="0.08"/>
      <circle cx="175" cy="70" r="34" fill={ACC} opacity="0.1"/>
      <circle cx="175" cy="70" r="26" fill={ACC} opacity="0.18"/>
      <circle cx="175" cy="70" r="20" fill={ACC} opacity="0.2"/>

      {/* Plum branch crossing in front of moon */}
      <path d="M10 180 Q70 140 130 110 Q170 90 200 60" stroke="var(--ink-soft)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M80 150 Q100 125 118 108" stroke="var(--ink-soft)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M130 110 Q150 90 165 72" stroke="var(--ink-soft)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>

      {/* Plum blossoms — delicate, some open, some buds */}
      {[
        { cx: 118, cy: 108, r: 5 }, { cx: 165, cy: 72, r: 6 },
        { cx: 200, cy: 60, r: 4 }, { cx: 82, cy: 148, r: 4 },
        { cx: 145, cy: 93, r: 3.5 },
      ].map((b, i) => (
        <g key={i}>
          <circle cx={b.cx} cy={b.cy} r={b.r} fill={ACC} opacity={0.35 - i * 0.04}/>
          <circle cx={b.cx} cy={b.cy} r={b.r * 0.4} fill={ACC} opacity={0.6 - i * 0.05}/>
          {/* Petals */}
          {[0,72,144,216,288].map((a, j) => (
            <ellipse key={j} cx={b.cx + Math.cos(a * Math.PI/180) * b.r * 0.9}
              cy={b.cy + Math.sin(a * Math.PI/180) * b.r * 0.9}
              rx={b.r * 0.5} ry={b.r * 0.3}
              fill={ACC} opacity={0.2 - i * 0.02}
              transform={`rotate(${a} ${b.cx + Math.cos(a * Math.PI/180) * b.r * 0.9} ${b.cy + Math.sin(a * Math.PI/180) * b.r * 0.9})`}/>
          ))}
        </g>
      ))}

      {/* Fallen petal on veranda */}
      <g transform="rotate(-20 110 225)" opacity="0.4">
        <ellipse cx="110" cy="225" rx="5" ry="3" fill={ACC}/>
      </g>
      <g transform="rotate(15 170 232)" opacity="0.3">
        <ellipse cx="170" cy="232" rx="4" ry="2.5" fill={ACC}/>
      </g>

      {/* Tea cup left on veranda — after someone left */}
      <ellipse cx="50" cy="217" rx="12" ry="4" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.6"/>
      <path d="M38 214 Q50 210 62 214" stroke="var(--ink-mute)" strokeWidth="0.5" fill="none" opacity="0.4"/>
      {/* Faint steam — the person has just left */}
      <path d="M48 210 Q46 203 48 196" stroke={ACC} strokeWidth="0.7" fill="none" opacity="0.3" strokeLinecap="round"/>
    </svg>
  )
}

// ─── SVG: The unsaid — conversation diagram ──────────────────────────────────
function UnsaidDiagram() {
  return (
    <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[480px] mx-auto">
      {/* ─── LEFT: 说出的话 (the said) — poem card with visible brushstrokes ─── */}
      <rect x="26" y="36" width="142" height="148" rx="3" fill={ACC} fillOpacity="0.1" stroke={ACC} strokeWidth="1.2"/>
      {/* Poem card label */}
      <text x="97" y="26" textAnchor="middle" fontSize="14" fill="var(--ink)" fontFamily="'Noto Serif SC', serif" fontWeight="500">说出的话</text>
      {/* Vertical brushstrokes — written poem */}
      <line x1="56" y1="54" x2="56" y2="158" stroke={ACC} strokeWidth="3" strokeLinecap="round" opacity="0.95"/>
      <line x1="86" y1="54" x2="86" y2="170" stroke={ACC} strokeWidth="2.6" strokeLinecap="round" opacity="0.85"/>
      <line x1="116" y1="54" x2="116" y2="150" stroke={ACC} strokeWidth="2.4" strokeLinecap="round" opacity="0.75"/>
      <line x1="146" y1="54" x2="146" y2="142" stroke={ACC} strokeWidth="2.2" strokeLinecap="round" opacity="0.65"/>
      {/* Seal */}
      <rect x="142" y="166" width="6" height="6" fill={ACC} opacity="0.6"/>

      {/* ─── RIGHT: 未说出 (the unsaid) — dashed card with fading dots ─── */}
      <rect x="252" y="36" width="142" height="148" rx="3" fill={ACC} fillOpacity="0.04" stroke={ACC} strokeWidth="0.85" strokeDasharray="4 4" opacity="0.7"/>
      {/* Unsaid card label */}
      <text x="323" y="26" textAnchor="middle" fontSize="14" fill={ACC} fontFamily="'Noto Serif SC', serif" opacity="0.7">未说出</text>
      {/* Fading dot rows — implied marks getting fainter */}
      {[
        {y: 60, count: 6, opacity: 0.55},
        {y: 78, count: 5, opacity: 0.42},
        {y: 96, count: 5, opacity: 0.32},
        {y: 114, count: 4, opacity: 0.22},
        {y: 132, count: 3, opacity: 0.15},
        {y: 150, count: 2, opacity: 0.1},
      ].map((row, i) =>
        Array.from({length: row.count}).map((_, j) => (
          <circle key={`${i}-${j}`} cx={266 + j * 20} cy={row.y} r="1.3" fill={ACC} opacity={row.opacity}/>
        ))
      )}

      {/* ─── BRIDGE: 余情 — the lingering feeling that flows between ─── */}
      {/* Flow path from said → 余情 → unsaid */}
      <path d="M168 110 Q190 102 200 124 Q215 138 252 110" stroke={ACC} strokeWidth="0.9" fill="none" opacity="0.5" strokeDasharray="2.5 2"/>
      <path d="M249 112 L254 109 L251 105" stroke={ACC} strokeWidth="0.95" fill="none" opacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>

      {/* 余情 centre — emphasized */}
      <circle cx="210" cy="124" r="32" fill={ACC} fillOpacity="0.05"/>
      <circle cx="210" cy="124" r="26" fill="var(--paper-soft)" stroke={ACC} strokeWidth="1.4" opacity="0.92"/>
      <circle cx="210" cy="124" r="20" stroke={ACC} strokeWidth="0.55" fill="none" opacity="0.45"/>
      <text x="210" y="120" textAnchor="middle" fontSize="18" fill="var(--ink)" fontFamily="'Noto Serif SC', serif" fontWeight="500">余情</text>
      <text x="210" y="138" textAnchor="middle" fontSize="10" fill={ACC} fontFamily="'Noto Serif SC', serif" opacity="0.75" letterSpacing="1">意在言外</text>

      {/* ─── BOTTOM: Lingering emotion waves ─── */}
      <text x="210" y="226" textAnchor="middle" fontSize="12" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" letterSpacing="2">缓缓延续的情感</text>
      <path d="M30 246 Q120 232 210 242 Q300 252 390 234" stroke={ACC} strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round"/>
      <path d="M50 264 Q140 252 210 260 Q280 268 390 252" stroke={ACC} strokeWidth="0.9" fill="none" opacity="0.3" strokeLinecap="round"/>
      <path d="M70 282 Q150 272 210 278 Q270 284 390 270" stroke={ACC} strokeWidth="0.7" fill="none" opacity="0.2" strokeLinecap="round"/>
      <path d="M90 298 Q160 290 210 294 Q260 298 380 286" stroke={ACC} strokeWidth="0.55" fill="none" opacity="0.12" strokeLinecap="round"/>
    </svg>
  )
}

// ─── SVG: Letter and candle ──────────────────────────────────────────────────
function LetterIllustration() {
  return (
    <svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[200px] mx-auto">
      {/* Table surface */}
      <rect x="10" y="158" width="220" height="10" rx="1" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.5"/>

      {/* Open letter — slightly angled */}
      <g transform="rotate(-3 120 110)">
        <rect x="30" y="80" width="155" height="100" rx="2"
          fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.8" opacity="0.9"/>
        {/* Letter fold lines */}
        <line x1="30" y1="113" x2="185" y2="113" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.3"/>
        {/* Handwritten lines — some trailing off */}
        <line x1="45" y1="95" x2="165" y2="95" stroke="var(--ink-mute)" strokeWidth="0.6" opacity="0.5"/>
        <line x1="45" y1="103" x2="160" y2="103" stroke="var(--ink-mute)" strokeWidth="0.6" opacity="0.45"/>
        <line x1="45" y1="120" x2="163" y2="120" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.4"/>
        <line x1="45" y1="128" x2="155" y2="128" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.35"/>
        <line x1="45" y1="136" x2="168" y2="136" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.35"/>
        {/* Last line trailing off — the unsaid */}
        <line x1="45" y1="144" x2="120" y2="144" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.3"/>
        <line x1="120" y1="144" x2="145" y2="144" stroke="var(--ink-mute)" strokeWidth="0.3" opacity="0.15"/>
        {/* Plum blossom stamp — seal of the sender */}
        <circle cx="162" cy="152" r="8" stroke={ACC} strokeWidth="0.7" fill="none" opacity="0.5"/>
        <circle cx="162" cy="152" r="4" fill={ACC} opacity="0.2"/>
      </g>

      {/* Candle — right side */}
      <rect x="192" y="100" width="10" height="58" rx="2"
        fill="var(--paper-soft)" stroke={ACC} strokeWidth="0.7" opacity="0.7"/>
      {/* Wax drip */}
      <path d="M197 115 Q200 122 199 128" stroke={ACC} strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round"/>
      {/* Flame */}
      <path d="M197 100 Q194 95 197 88 Q200 95 197 100Z" fill="var(--gold)" opacity="0.7"/>
      <circle cx="197" cy="100" r="1.5" fill="var(--gold)" opacity="0.5"/>
      {/* Glow */}
      <circle cx="197" cy="97" r="8" fill="var(--gold)" opacity="0.08"/>
      {/* Candle holder */}
      <ellipse cx="197" cy="158" rx="10" ry="4" fill={ACC} opacity="0.2" stroke={ACC} strokeWidth="0.6"/>

      {/* Dried plum blossom on letter — pressed */}
      <g opacity="0.4">
        <circle cx="55" cy="155" r="5" fill={ACC} opacity="0.3"/>
        {[0,72,144,216,288].map((a, i) => (
          <ellipse key={i}
            cx={55 + Math.cos(a * Math.PI/180) * 5}
            cy={155 + Math.sin(a * Math.PI/180) * 5}
            rx="3" ry="2"
            fill={ACC} opacity="0.25"
            transform={`rotate(${a} ${55 + Math.cos(a * Math.PI/180) * 5} ${155 + Math.sin(a * Math.PI/180) * 5})`}/>
        ))}
      </g>
    </svg>
  )
}

const spiritCards = [
  {
    title: '言外之意',
    body: '真正动人的，往往不是说出来的话，而是那些悬而未发、藏在字里行间的感受。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Speech bubble — slightly smaller, off-center to leave room for trail */}
        <path d="M8 17 Q8 11 13.5 11 H22 Q27.5 11 27.5 16 V21 Q27.5 26 22 26 H15 L11 30 L12 26 Q8 26 8 21 Z" stroke={ACC} strokeWidth="1.25" fill={ACC} fillOpacity="0.06" strokeLinejoin="round"/>
        {/* Text lines inside */}
        <line x1="11.5" y1="16" x2="23" y2="16" stroke={ACC} strokeWidth="1.05" opacity="0.75" strokeLinecap="round"/>
        <line x1="11.5" y1="20" x2="21" y2="20" stroke={ACC} strokeWidth="1.05" opacity="0.6" strokeLinecap="round"/>
        {/* Trail of dots leading outside — the unspoken extending beyond */}
        <circle cx="30" cy="14.5" r="0.95" fill={ACC} opacity="0.7"/>
        <circle cx="32.5" cy="12" r="0.7" fill={ACC} opacity="0.45"/>
        <circle cx="34" cy="10" r="0.5" fill={ACC} opacity="0.25"/>
      </svg>
    ),
  },
  {
    title: '情绪余波',
    body: '诗读完了，情未尽。音乐停了，心还在那个和弦。余情是感受的惯性，在结束后继续运动。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Origin point — where the pulse begins */}
        <circle cx="8.5" cy="20" r="1.6" fill={ACC}/>
        {/* First wave — full amplitude */}
        <path d="M10 20 Q12 13.5 14 20 Q16 26.5 18 20" stroke={ACC} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Second wave — reduced */}
        <path d="M18 20 Q20 15.5 22 20 Q24 24.5 26 20" stroke={ACC} strokeWidth="1.15" fill="none" strokeLinecap="round" opacity="0.7"/>
        {/* Third wave — fading */}
        <path d="M26 20 Q27.5 17.5 29 20 Q30.5 22.5 32 20" stroke={ACC} strokeWidth="0.85" fill="none" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    title: '含蓄表达',
    body: '余情是诗性表达的核心——短短几行，意在字外。不说破，反而说得最深。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Poem card */}
        <rect x="11" y="11" width="14" height="18" rx="0.6" stroke={ACC} strokeWidth="1.25" fill={ACC} fillOpacity="0.06"/>
        {/* Vertical brushstrokes — Japanese poem lines */}
        <line x1="14" y1="13.5" x2="14" y2="22" stroke={ACC} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="18" y1="13.5" x2="18" y2="24" stroke={ACC} strokeWidth="1.4" strokeLinecap="round" opacity="0.85"/>
        <line x1="22" y1="13.5" x2="22" y2="20" stroke={ACC} strokeWidth="1.3" strokeLinecap="round" opacity="0.75"/>
        {/* Last stroke trails outside the card — the unfinished thought */}
        <path d="M22 20 Q23.5 23 25.5 25" stroke={ACC} strokeWidth="1.05" strokeLinecap="round" fill="none" strokeDasharray="1.5 1.6" opacity="0.6"/>
        <circle cx="27" cy="26.5" r="0.55" fill={ACC} opacity="0.45"/>
      </svg>
    ),
  },
  {
    title: '空间共鸣',
    body: '余情需要接收者的参与。诗人写一半，读者感受另一半——美在两者之间的空间里诞生。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Left pebble */}
        <circle cx="13.5" cy="20" r="1.6" fill={ACC}/>
        {/* Right pebble */}
        <circle cx="26.5" cy="20" r="1.6" fill={ACC}/>
        {/* Left ripples */}
        <circle cx="13.5" cy="20" r="5" stroke={ACC} strokeWidth="0.85" fill="none" opacity="0.6"/>
        <circle cx="13.5" cy="20" r="8.5" stroke={ACC} strokeWidth="0.7" fill="none" opacity="0.35"/>
        {/* Right ripples — overlapping in the middle */}
        <circle cx="26.5" cy="20" r="5" stroke={ACC} strokeWidth="0.85" fill="none" opacity="0.6"/>
        <circle cx="26.5" cy="20" r="8.5" stroke={ACC} strokeWidth="0.7" fill="none" opacity="0.35"/>
      </svg>
    ),
  },
]

const applicationItems = [
  { label: '不言而喻', desc: '说七分，留三分。让感受在沉默里完成最后的旅程。' },
  { label: '留有余地', desc: '不过度解释。给对方空间，让情感自行流动与抵达。' },
  { label: '情感克制', desc: '越是深沉的情感，越需要轻声表达。克制本身就是一种力量。' },
  { label: '余韵绵长', desc: '一句话、一个眼神、一首诗——愿它在离开后，仍在心中回响。' },
]

export default function YojoPage() {
  return (
    <main className="min-h-screen pb-32">

      <PrincipleTopNav slug="yojo" />

      {/* ── HERO ── */}
      <Section className="max-w-[900px] mx-auto px-6 pt-10 pb-16 md:pb-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <FadeUp>
              <span className="seal text-[10px] tracking-[0.15em] mb-5 inline-block" style={{ background: '#8a6878', color: 'var(--paper)', opacity: 0.88, fontFamily: 'Noto Serif SC, serif', fontWeight: 500 }}>
                最深的话从不说出
              </span>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="text-6xl md:text-7xl font-light text-[var(--ink)] leading-none tracking-wide mb-3">
                余情
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-sm text-[var(--ink-mute)] tracking-[0.25em] mb-7">
                よじょう | Yojō
              </p>
              <div className="brush-divider w-20 mb-7" />
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-lg md:text-xl font-light text-[var(--ink-soft)] leading-[2.1] mb-5" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                余情是诗歌结束后仍在心中悠荡的情感——那些没有被说出、却被深深感受到的部分。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.9]">
                它是短诗留下的空白，是曲终人散后那份无名的悸动，是一封信读完后久久无法放下的温度。
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="flex justify-center">
            <Image src="/hero-yojo.png" alt="余情 — Yojo" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
          </FadeUp>
        </div>
      </Section>

      {/* ── Spirit ── */}
      <section style={{ background: 'var(--paper-soft)', borderTop: '1px solid var(--paper-deep)', borderBottom: '1px solid var(--paper-deep)' }}
               className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">essence</p>
            <h2 className="text-2xl font-light text-[var(--ink)] mb-8 tracking-wide">余情的精神</h2>
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
            <h2 className="text-xl font-light text-[var(--ink)] mb-6 tracking-wide">言与未言之间</h2>
            <div style={{ border: '1px solid var(--paper-deep)', padding: '24px', background: 'var(--paper)' }}>
              <UnsaidDiagram />
            </div>
            <p className="text-[10px] text-[var(--ink-mute)] text-center mt-4 tracking-wider">
              余情存在于说出与未说之间的空间
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">practice</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-6 tracking-wide">余情的运用</h2>
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
              <Image src="/everyday-yojo.png" alt="余情 — everyday" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-2xl font-light text-[var(--ink)] mb-5 tracking-wide"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}>生活中的余情</h2>
              <p className="text-base text-[var(--ink-soft)] leading-[1.9] mb-4">
                余情无处不在——一首诗的最后那个字之后的沉默，一场告别后久久未能释怀的心绪，一封信里那句写了又划去的话。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.85] mb-8">
                真正打动人的短诗之所以历久弥新，正是因为它们都留有余情——寥寥数语，装下无言的宇宙。
              </p>
              <div style={{ borderLeft: `3px solid ${ACC}`, background: 'var(--paper-soft)', padding: '16px 20px' }}>
                <p className="text-base text-[var(--ink-soft)] leading-[1.9] italic"
                   style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>
                  最好的表达，往往在最后一个字之后才真正开始——在那个静默里，余情悄悄完成了诗人未竟的心意。
                </p>
              </div>
            </FadeUp>
          </div>
        </Section>
      </section>

      <PrincipleBottomNav slug="yojo" />
    </main>
  )
}

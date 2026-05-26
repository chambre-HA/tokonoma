'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { PrincipleTopNav, PrincipleBottomNav } from '@/components/PrinciplePageNav'

const ACC = '#8a8278'   // weathered stone — imperfection, age, rust

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

// ─── SVG: Cracked tea bowl (kintsugi), weathered stones, moss ───────────────
function KintsugiIllustration() {
  return (
    <svg viewBox="0 0 260 290" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[220px] mx-auto">
      {/* Tea bowl — chawan */}
      <path d="M60 170 Q65 200 130 210 Q195 200 200 170 Q195 150 130 145 Q65 150 60 170Z"
        fill="var(--paper-soft)" stroke="var(--ink-soft)" strokeWidth="1.2" opacity="0.8"/>
      {/* Bowl interior shadow */}
      <ellipse cx="130" cy="168" rx="55" ry="18" fill="var(--paper-deep)" opacity="0.4"/>
      {/* Kintsugi cracks — gold-repaired */}
      <path d="M100 153 Q110 163 105 178 Q112 188 108 200"
        stroke="var(--gold)" strokeWidth="1.4" fill="none" opacity="0.7" strokeLinecap="round"/>
      <path d="M105 178 Q120 175 135 183"
        stroke="var(--gold)" strokeWidth="1.1" fill="none" opacity="0.6" strokeLinecap="round"/>
      <path d="M155 155 Q148 168 152 182 Q145 190 148 202"
        stroke="var(--gold)" strokeWidth="1.2" fill="none" opacity="0.65" strokeLinecap="round"/>
      {/* Bowl base */}
      <ellipse cx="130" cy="208" rx="18" ry="5" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.8" opacity="0.6"/>
      {/* Matcha tea surface */}
      <ellipse cx="130" cy="168" rx="48" ry="14" fill="var(--tea-light)" opacity="0.2"/>
      {/* Tea ripple */}
      <ellipse cx="130" cy="168" rx="20" ry="6" stroke="var(--tea)" strokeWidth="0.5" opacity="0.3" fill="none"/>

      {/* Weathered stones — stacked */}
      <ellipse cx="55" cy="240" rx="30" ry="12" fill={ACC} opacity="0.25" stroke={ACC} strokeWidth="0.7"/>
      <ellipse cx="55" cy="228" rx="24" ry="10" fill={ACC} opacity="0.2" stroke={ACC} strokeWidth="0.7"/>
      <ellipse cx="55" cy="218" rx="18" ry="8" fill={ACC} opacity="0.18" stroke={ACC} strokeWidth="0.6"/>
      {/* Stone texture cracks */}
      <path d="M38 234 Q45 232 52 236" stroke={ACC} strokeWidth="0.5" fill="none" opacity="0.5"/>
      <path d="M44 222 Q50 220 58 224" stroke={ACC} strokeWidth="0.4" fill="none" opacity="0.4"/>

      {/* Moss patch — lower right */}
      <ellipse cx="200" cy="248" rx="25" ry="10" fill="var(--tea-light)" opacity="0.3"/>
      <ellipse cx="185" cy="244" rx="12" ry="6" fill="var(--tea)" opacity="0.15"/>
      {/* Moss dots */}
      {[196,204,188,212,200].map((x, i) => (
        <circle key={i} cx={x} cy={245 + (i % 3)} r="2" fill="var(--tea)" opacity="0.25"/>
      ))}

      {/* Weathered wood plank — base */}
      <rect x="20" y="252" width="220" height="18" rx="2" fill={ACC} opacity="0.12" stroke={ACC} strokeWidth="0.6"/>
      {/* Wood grain lines */}
      <path d="M30 256 Q100 254 180 257 Q200 258 230 256" stroke={ACC} strokeWidth="0.4" fill="none" opacity="0.3"/>
      <path d="M25 262 Q80 260 160 263 Q190 264 235 262" stroke={ACC} strokeWidth="0.3" fill="none" opacity="0.2"/>

      {/* Fallen leaves */}
      <g transform="rotate(-20 90 250)" opacity="0.3">
        <path d="M90 246 Q86 249 87 253 Q90 255 93 253 Q94 249 90 246Z" fill="var(--plum)"/>
      </g>
      <g transform="rotate(30 155 245)" opacity="0.25">
        <path d="M155 241 Q151 244 152 248 Q155 250 158 248 Q159 244 155 241Z" fill="var(--gold)"/>
      </g>
    </svg>
  )
}

// ─── SVG: Imperfection diagram — the beauty triangle ────────────────────────
function ImperfectionDiagram() {
  return (
    <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[480px] mx-auto">
      {/* ─── Wabi-sabi triangle — the three pillars ─── */}
      <path d="M210 50 L360 290 L60 290 Z" stroke={ACC} strokeWidth="1" fill={ACC} fillOpacity="0.05" strokeDasharray="3 3" opacity="0.7"/>

      {/* ─── Kintsugi gold seam — running through the centre, the unifying mark ─── */}
      <path d="M180 90 Q200 140 198 180 Q196 220 215 250 Q210 275 195 295"
            stroke="var(--gold)" strokeWidth="1.8" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M180 90 Q200 140 198 180 Q196 220 215 250 Q210 275 195 295"
            stroke="var(--gold)" strokeWidth="0.7" fill="none" opacity="0.9" strokeLinecap="round" strokeDasharray="3 2"/>

      {/* ═══════════ VERTEX 1 — TOP — 不完美 (imperfect) ═══════════ */}
      {/* Cracked tea bowl motif */}
      <g transform="translate(266 38)">
        <path d="M-13 -5 Q-12 7 0 8 Q12 7 13 -5 Z" fill="var(--paper-deep)" stroke={ACC} strokeWidth="1.05" strokeLinejoin="round"/>
        <ellipse cx="0" cy="-5" rx="13" ry="2" fill="none" stroke={ACC} strokeWidth="0.95"/>
        {/* Chip on rim */}
        <path d="M-6 -5 L-3 -8 L1 -5" stroke="var(--paper)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* Crack repaired with gold */}
        <path d="M-2 -4 L0 2 L-1 7" stroke="var(--gold)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      </g>
      <ellipse cx="210" cy="50" rx="32" ry="22" fill="var(--paper-soft)" stroke={ACC} strokeWidth="1.2" opacity="0.9"/>
      <text x="210" y="46" textAnchor="middle" fontSize="14" fill={ACC} fontFamily="'Noto Serif SC', serif" fontWeight="500">不完美</text>
      <text x="210" y="64" textAnchor="middle" fontSize="11" fill="var(--ink-mute)" fontFamily="'Noto Serif SC', serif" letterSpacing="0.5">不完全</text>

      {/* ═══════════ VERTEX 2 — BOTTOM-LEFT — 无常 (impermanence) ═══════════ */}
      {/* Hourglass / falling leaf motif */}
      <g transform="translate(20 270)">
        {/* Bare branch with one leaf falling */}
        <path d="M0 0 Q-8 -6 -12 -16" stroke={ACC} strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <path d="M-9 -8 Q-14 -10 -16 -14" stroke={ACC} strokeWidth="0.85" fill="none" strokeLinecap="round"/>
        {/* Falling leaf */}
        <g transform="rotate(-25 6 8)" opacity="0.75">
          <ellipse cx="6" cy="8" rx="4" ry="1.8" fill={ACC}/>
        </g>
        {/* Motion */}
        <path d="M-2 -2 Q2 1 4 5" stroke={ACC} strokeWidth="0.55" fill="none" opacity="0.5" strokeDasharray="1.2 1.5"/>
      </g>
      <ellipse cx="60" cy="290" rx="32" ry="22" fill="var(--paper-soft)" stroke={ACC} strokeWidth="1.2" opacity="0.9"/>
      <text x="60" y="286" textAnchor="middle" fontSize="14" fill={ACC} fontFamily="'Noto Serif SC', serif" fontWeight="500">无常</text>
      <text x="60" y="304" textAnchor="middle" fontSize="11" fill="var(--ink-mute)" fontFamily="'Noto Serif SC', serif" letterSpacing="0.5">流逝</text>

      {/* ═══════════ VERTEX 3 — BOTTOM-RIGHT — 不圆满 (incomplete) ═══════════ */}
      {/* Enso — open zen circle */}
      <g transform="translate(394 270)">
        <path d="M5 -10 Q14 -6 13 4 Q9 13 -1 13 Q-10 11 -12 2 Q-11 -8 -3 -11"
              stroke={ACC} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      </g>
      <ellipse cx="360" cy="290" rx="32" ry="22" fill="var(--paper-soft)" stroke={ACC} strokeWidth="1.2" opacity="0.9"/>
      <text x="360" y="286" textAnchor="middle" fontSize="14" fill={ACC} fontFamily="'Noto Serif SC', serif" fontWeight="500">不圆满</text>
      <text x="360" y="304" textAnchor="middle" fontSize="11" fill="var(--ink-mute)" fontFamily="'Noto Serif SC', serif" letterSpacing="0.5">未完成</text>

      {/* ═══════════ CENTRE — 侘寂之美 ═══════════ */}
      {/* Outer aura */}
      <circle cx="210" cy="190" r="58" fill={ACC} fillOpacity="0.04" stroke={ACC} strokeWidth="0.55" opacity="0.35" strokeDasharray="2 3"/>
      {/* Body */}
      <circle cx="210" cy="190" r="46" fill="var(--paper-soft)" stroke={ACC} strokeWidth="1.4" opacity="0.92"/>
      {/* Inner subtle ring */}
      <circle cx="210" cy="190" r="38" stroke={ACC} strokeWidth="0.55" fill="none" opacity="0.4"/>
      {/* Glow */}
      <circle cx="210" cy="190" r="22" fill="var(--gold)" fillOpacity="0.08"/>
      <text x="210" y="187" textAnchor="middle" fontSize="22" fill="var(--ink)" fontFamily="'Noto Serif SC', serif" fontWeight="500">侘寂</text>
      <text x="210" y="210" textAnchor="middle" fontSize="12" fill={ACC} fontFamily="'Noto Serif SC', serif" opacity="0.8" letterSpacing="2">之美</text>

      {/* ═══════════ Floating weathering particles ═══════════ */}
      <circle cx="130" cy="160" r="1.2" fill={ACC} opacity="0.4"/>
      <circle cx="118" cy="200" r="0.9" fill={ACC} opacity="0.3"/>
      <circle cx="290" cy="170" r="1" fill={ACC} opacity="0.35"/>
      <circle cx="300" cy="220" r="0.8" fill={ACC} opacity="0.28"/>
      <circle cx="150" cy="245" r="0.85" fill={ACC} opacity="0.3"/>
      <circle cx="265" cy="245" r="0.95" fill={ACC} opacity="0.35"/>
    </svg>
  )
}

// ─── SVG: Old pottery workshop ───────────────────────────────────────────────
function PotteryIllustration() {
  return (
    <svg viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[200px] mx-auto">
      {/* Shelf */}
      <rect x="10" y="90" width="220" height="6" rx="1" fill={ACC} opacity="0.3" stroke={ACC} strokeWidth="0.6"/>
      {/* Wall behind shelf */}
      <rect x="10" y="10" width="220" height="82" rx="1" fill="var(--paper-soft)" opacity="0.4"/>
      {/* Wall texture — subtle plaster cracks */}
      <path d="M40 30 Q55 28 65 35 Q70 40 80 38" stroke={ACC} strokeWidth="0.4" fill="none" opacity="0.2"/>
      <path d="M150 20 Q160 25 155 35" stroke={ACC} strokeWidth="0.3" fill="none" opacity="0.15"/>

      {/* Three ceramic pieces on shelf */}
      {/* 1 — tall vase, slightly asymmetric */}
      <path d="M38 90 Q32 70 34 45 Q40 30 46 45 Q48 70 42 90Z"
        fill="var(--paper-deep)" stroke={ACC} strokeWidth="0.8" opacity="0.7"/>
      {/* Glaze drip */}
      <path d="M44 50 Q46 62 44 75" stroke="var(--tea-light)" strokeWidth="1" fill="none" opacity="0.4"/>

      {/* 2 — round bowl, chipped rim */}
      <path d="M90 90 Q82 72 85 62 Q95 55 105 62 Q108 72 100 90Z"
        fill="var(--paper-soft)" stroke={ACC} strokeWidth="0.8" opacity="0.7"/>
      <path d="M85 62 Q90 58 88 56" stroke={ACC} strokeWidth="0.6" fill="none" opacity="0.4"/>

      {/* 3 — flask shape */}
      <path d="M150 90 Q144 78 146 62 Q150 52 160 52 Q170 52 174 62 Q176 78 170 90Z"
        fill="var(--paper-deep)" stroke={ACC} strokeWidth="0.8" opacity="0.65"/>
      {/* Kintsugi line */}
      <path d="M155 68 Q160 75 158 84" stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.55"/>

      {/* 4 — small cup */}
      <path d="M198 90 Q192 80 194 73 Q200 68 206 73 Q208 80 202 90Z"
        fill="var(--paper-soft)" stroke={ACC} strokeWidth="0.7" opacity="0.65"/>

      {/* Work table */}
      <rect x="10" y="148" width="220" height="8" rx="1" fill={ACC} opacity="0.2" stroke={ACC} strokeWidth="0.6"/>
      {/* Clay lump on table */}
      <ellipse cx="80" cy="145" rx="22" ry="10" fill={ACC} opacity="0.2" stroke={ACC} strokeWidth="0.6"/>
      {/* Tool */}
      <line x1="140" y1="140" x2="180" y2="150" stroke="var(--ink-soft)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <ellipse cx="138" cy="139" rx="4" ry="3" fill="var(--ink-soft)" opacity="0.3" transform="rotate(-25 138 139)"/>

      {/* Dust/earth on table */}
      <ellipse cx="80" cy="153" rx="35" ry="5" fill={ACC} opacity="0.1"/>
    </svg>
  )
}

const spiritCards = [
  {
    title: '残缺之美',
    body: '裂缝不是瑕疵，而是历史的证明。金继ぎ（金继）用金修缮破损，让器物因伤而更美。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Tea bowl — wide rim, tapered base */}
        <path d="M11.5 17.5 Q12.5 28 20 28.7 Q27.5 28 28.5 17.5 Z" stroke={ACC} strokeWidth="1.35" fill={ACC} fillOpacity="0.08" strokeLinejoin="round"/>
        {/* Rim ellipse */}
        <ellipse cx="20" cy="17.5" rx="8.5" ry="1.5" stroke={ACC} strokeWidth="1.2" fill="none"/>
        {/* Kintsugi gold crack — zig-zag seam */}
        <path d="M16 19.5 L19 22 L17.2 25 L20.5 27.5" stroke="var(--gold)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: '岁月之痕',
    body: '老茶碗比新瓷更有灵魂。时间的磨损，是最诚实的装饰；包浆，是岁月的馈赠。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Weathered stone — irregular oval */}
        <path d="M11 22 Q9 26.5 13.5 28.5 Q20 30 27 28 Q31 25.5 29 21 Q26 17 21 16 Q14 17 11 22Z" stroke={ACC} strokeWidth="1.3" fill={ACC} fillOpacity="0.12" strokeLinejoin="round"/>
        {/* Patina hairlines — subtle weathering */}
        <path d="M14.5 20 Q17 22 19 22.5" stroke={ACC} strokeWidth="0.6" fill="none" opacity="0.6" strokeLinecap="round"/>
        <path d="M22 21 Q24.5 22.5 26.5 22" stroke={ACC} strokeWidth="0.55" fill="none" opacity="0.55" strokeLinecap="round"/>
        <path d="M16 25.5 Q20 24.5 24.5 25.5" stroke={ACC} strokeWidth="0.55" fill="none" opacity="0.5" strokeLinecap="round"/>
        {/* Moss patches */}
        <ellipse cx="14.5" cy="19.5" rx="2.2" ry="0.9" fill="var(--tea)" opacity="0.5" transform="rotate(-22 14.5 19.5)"/>
        <ellipse cx="26" cy="26" rx="1.6" ry="0.7" fill="var(--tea)" opacity="0.55" transform="rotate(15 26 26)"/>
      </svg>
    ),
  },
  {
    title: '朴素本真',
    body: '侘寂拒绝过度装饰。未漂白的木、未施釉的陶、未修剪的草——原本的样子已足够美。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Bare winter twig — main stem */}
        <path d="M20 29 Q19.5 22 18 17 Q17 13 14.5 9.5" stroke={ACC} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Side branches — irregular natural growth */}
        <path d="M19 19 Q22.5 18 25 15.5" stroke={ACC} strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <path d="M17.5 14 Q19.5 12.5 21 10.5" stroke={ACC} strokeWidth="0.95" fill="none" strokeLinecap="round"/>
        <path d="M19.5 24 Q17 23 14.5 22.5" stroke={ACC} strokeWidth="0.95" fill="none" strokeLinecap="round"/>
        {/* Single small bud at tip */}
        <circle cx="14.5" cy="9.5" r="0.9" fill={ACC} opacity="0.75"/>
      </svg>
    ),
  },
  {
    title: '安于不完整',
    body: '未满的月，未落幕的乐章，未写完的信——不圆满留有余地，让观者的心参与其中。',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12 mx-auto">
        <circle cx="20" cy="20" r="16" stroke={ACC} strokeWidth="1.2"/>
        {/* Implied full moon — dashed outline of what we don't have */}
        <circle cx="20" cy="20" r="9" stroke={ACC} strokeWidth="0.9" fill="none" opacity="0.4" strokeDasharray="2.4 2"/>
        {/* Visible crescent — the beauty of incomplete */}
        <path d="M 20 11 A 9 9 0 0 0 20 29 A 5 9 0 0 1 20 11 Z" stroke={ACC} strokeWidth="1.4" fill={ACC} fillOpacity="0.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const applicationItems = [
  { label: '拥抱缺陷', desc: '不遮掩磨损，不追求完美。让痕迹成为物件叙述的语言。' },
  { label: '减去多余', desc: '选择少而精。每一件器物都有其重量，值得被用心对待。' },
  { label: '欣赏旧物', desc: '一把老木椅、一只缺口茶杯——岁月感是无法复制的美。' },
  { label: '回归本质', desc: '去除表演性的装饰，留下真实的质感、真实的触感、真实的自己。' },
]

export default function WabiSabiPage() {
  return (
    <main className="min-h-screen pb-32">

      <PrincipleTopNav slug="wabi-sabi" />

      {/* ── HERO ── */}
      <Section className="max-w-[900px] mx-auto px-6 pt-10 pb-16 md:pb-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <FadeUp>
              <span className="seal text-[10px] tracking-[0.15em] mb-5 inline-block" style={{ background: '#8a8278', color: 'var(--paper)', opacity: 0.88, fontFamily: 'Noto Serif SC, serif', fontWeight: 500 }}>
                残缺处金光最亮
              </span>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="text-6xl md:text-7xl font-light text-[var(--ink)] leading-none tracking-wide mb-3">
                侘寂
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-sm text-[var(--ink-mute)] tracking-[0.25em] mb-7">
                わびさび | Wabi-Sabi
              </p>
              <div className="brush-divider w-20 mb-7" />
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-lg md:text-xl font-light text-[var(--ink-soft)] leading-[2.1] mb-5" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                侘寂是在不完美、不圆满、无常之中发现的美——一种接纳现实原本模样的哲学。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.9]">
                裂缝处，金光最亮；磨损之物，往往最有灵魂。不必追求光滑完整，粗粝本身就是一种诚实。
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="flex justify-center">
            <Image src="/hero-wabi-sabi.png" alt="侘び寂び — Wabi-Sabi" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
          </FadeUp>
        </div>
      </Section>

      {/* ── Spirit ── */}
      <section style={{ background: 'var(--paper-soft)', borderTop: '1px solid var(--paper-deep)', borderBottom: '1px solid var(--paper-deep)' }}
               className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <FadeUp>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">essence</p>
            <h2 className="text-2xl font-light text-[var(--ink)] mb-8 tracking-wide">侘寂的精神</h2>
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
            <h2 className="text-xl font-light text-[var(--ink)] mb-6 tracking-wide">侘寂的三维度</h2>
            <div style={{ border: '1px solid var(--paper-deep)', padding: '24px', background: 'var(--paper)' }}>
              <ImperfectionDiagram />
            </div>
            <p className="text-[10px] text-[var(--ink-mute)] text-center mt-4 tracking-wider">
              三者交汇之处，是侘寂最真实的存在
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">practice</p>
            <h2 className="text-xl font-light text-[var(--ink)] mb-6 tracking-wide">侘寂的运用</h2>
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
              <Image src="/everyday-wabi-sabi.png" alt="侘び寂び — everyday" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-2xl font-light text-[var(--ink)] mb-5 tracking-wide"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}>生活中的侘寂</h2>
              <p className="text-base text-[var(--ink-soft)] leading-[1.9] mb-4">
                侘寂不需要昂贵的器物。一只手工粗陶杯、窗台斑驳的油漆、老木桌深浅不一的划痕——这些都是它的栖居之所。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.85] mb-8">
                停止追求完美，开始看见平凡之物的内在美，侘寂便不请自来。
              </p>
              <div style={{ borderLeft: `3px solid ${ACC}`, background: 'var(--paper-soft)', padding: '16px 20px' }}>
                <p className="text-base text-[var(--ink-soft)] leading-[1.9] italic"
                   style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>
                  金继的裂缝，不是缺憾的痕迹，而是你独一无二的故事——破碎之处，无需掩盖。
                </p>
              </div>
            </FadeUp>
          </div>
        </Section>
      </section>

      <PrincipleBottomNav slug="wabi-sabi" />
    </main>
  )
}

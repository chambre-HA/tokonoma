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

// ─── SVG: Tanabata tokonoma display ─────────────────────────────────────────
function TanabataIllustration() {
  return (
    <svg viewBox="0 0 240 290" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[210px] mx-auto">
      {/* Wall / alcove */}
      <rect x="8" y="8" width="224" height="274" rx="3" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      {/* Shoji grid subtle */}
      {[60,110,160,210].map(x => <line key={x} x1={x} y1="8" x2={x} y2="282" stroke="var(--ink-mute)" strokeWidth="0.3" opacity="0.2"/>)}
      {[60,110,160,210,260].map(y => <line key={y} x1="8" y1={y} x2="232" y2={y} stroke="var(--ink-mute)" strokeWidth="0.3" opacity="0.2"/>)}

      {/* Tokonoma inner alcove */}
      <rect x="38" y="14" width="148" height="200" rx="2" fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.7"/>

      {/* Hanging scroll — right side */}
      <rect x="130" y="20" width="48" height="158" rx="2" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <rect x="126" y="18" width="56" height="5" rx="2.5" fill="var(--ink)" opacity="0.18"/>
      <rect x="126" y="174" width="56" height="5" rx="2.5" fill="var(--ink)" opacity="0.18"/>
      {/* Scroll text — vertical */}
      <text x="154" y="42" fontSize="7.5" fill="var(--ink-soft)" fontFamily="Noto Serif SC, serif"
        writingMode="vertical-rl" textAnchor="middle" letterSpacing="3">七夕慕情</text>
      <text x="140" y="42" fontSize="7" fill="var(--ink-mute)" fontFamily="Noto Serif SC, serif"
        writingMode="vertical-rl" textAnchor="middle" letterSpacing="2" opacity="0.7">花堂踏人相花</text>

      {/* Bamboo stalks — centre-left */}
      <line x1="80" y1="14" x2="80" y2="200" stroke="var(--tea)" strokeWidth="4" opacity="0.4"/>
      <line x1="92" y1="14" x2="92" y2="200" stroke="var(--tea)" strokeWidth="2.5" opacity="0.25"/>
      {[45,80,120,160].map(y => <line key={y} x1="77" y1={y} x2="83" y2={y} stroke="var(--tea-deep)" strokeWidth="1" opacity="0.4"/>)}
      {[50,90,130].map(y => <line key={y} x1="89" y1={y} x2="95" y2={y} stroke="var(--tea-deep)" strokeWidth="0.8" opacity="0.35"/>)}
      {/* Bamboo leaves */}
      <path d="M80 45 C92 36 108 32 102 24" stroke="var(--tea)" strokeWidth="1.2" strokeLinecap="round" opacity="0.55"/>
      <path d="M80 52 C95 54 106 48 100 38" stroke="var(--tea)" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      <path d="M80 35 C68 28 56 28 60 20" stroke="var(--tea)" strokeWidth="1.1" strokeLinecap="round" opacity="0.35"/>

      {/* Tanzaku strips — colourful paper strips hanging from bamboo */}
      {[
        { x: 72, y: 55, h: 28, col: '#8a9fcc', rot: -5 },
        { x: 84, y: 62, h: 24, col: '#c49a6c', rot: 3 },
        { x: 78, y: 72, h: 30, col: '#7a9e7e', rot: -8 },
        { x: 88, y: 80, h: 26, col: '#b98faf', rot: 6 },
        { x: 68, y: 80, h: 22, col: '#c4b06c', rot: -4 },
      ].map((t, i) => (
        <g key={i} transform={`rotate(${t.rot} ${t.x+3} ${t.y})`}>
          <rect x={t.x} y={t.y} width="6" height={t.h} rx="1" fill={t.col} opacity="0.65"/>
        </g>
      ))}

      {/* Decorative star ornaments */}
      {[[76,53],[90,60],[70,68]].map(([x,y],i) => (
        <polygon key={i} points={`${x},${y-4} ${x+1.5},${y-1} ${x+4},${y-1} ${x+2},${y+1} ${x+3},${y+4} ${x},${y+2} ${x-3},${y+4} ${x-2},${y+1} ${x-4},${y-1} ${x-1.5},${y-1}`}
          fill="var(--gold)" opacity="0.5" transform={`scale(0.8) translate(${x*0.25} ${y*0.25})`}/>
      ))}

      {/* Flower arrangement — left of scroll */}
      {/* Vase */}
      <path d="M50 195 C46 190 43 184 43 178 C43 170 48 166 55 165 L75 165 C82 166 87 170 87 178 C87 184 84 190 80 195 Z"
        fill="#3a5a8a" opacity="0.35" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <ellipse cx="65" cy="196" rx="16" ry="5" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.6"/>
      {/* Iris / lily stems */}
      <line x1="58" y1="165" x2="52" y2="120" stroke="var(--tea)" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="65" y1="165" x2="65" y2="110" stroke="var(--tea)" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="72" y1="165" x2="78" y2="118" stroke="var(--tea)" strokeWidth="1.1" strokeLinecap="round"/>
      {/* Lily bloom */}
      <circle cx="65" cy="108" r="7" fill="var(--paper)" stroke="var(--plum)" strokeWidth="0.9" opacity="0.85"/>
      <path d="M65 101 C62 104 60 107 65 108 C70 107 68 104 65 101" fill="var(--plum)" opacity="0.3"/>
      <circle cx="65" cy="108" r="2" fill="var(--gold)" opacity="0.7"/>
      {/* Iris bloom */}
      <path d="M52 120 C48 115 46 110 52 108 C55 110 56 115 52 120" fill="#8899cc" opacity="0.55"/>
      <path d="M52 120 C56 115 58 110 52 108" fill="#6677aa" opacity="0.4"/>
      {/* Small white flower */}
      <circle cx="78" cy="116" r="5" fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.9"/>
      <circle cx="78" cy="116" r="2" fill="var(--gold)" opacity="0.5"/>
      {/* Leaves */}
      <path d="M60 148 C54 140 50 135 46 138" stroke="var(--tea)" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <path d="M70 140 C76 134 80 130 82 134" stroke="var(--tea)" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>

      {/* Shelf / display surface */}
      <rect x="38" y="198" width="148" height="8" rx="1" fill="var(--ink)" opacity="0.1"/>
      {/* Small ornament on shelf */}
      <circle cx="110" cy="196" r="5" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.7"/>
      <circle cx="117" cy="196" r="3.5" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.6"/>

      {/* Bamboo right edge */}
      <line x1="220" y1="8" x2="220" y2="282" stroke="var(--tea)" strokeWidth="3.5" opacity="0.28"/>
      {[50,100,150,200,250].map(y => <line key={y} x1="217" y1={y} x2="223" y2={y} stroke="var(--tea-deep)" strokeWidth="0.9" opacity="0.3"/>)}
      <path d="M220 65 C230 55 240 52 237 44" stroke="var(--tea)" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/>

      {/* Tatami floor */}
      <path d="M8 258 L232 258 L232 282 L8 282 Z" fill="var(--paper-deep)" opacity="0.3"/>
      <line x1="8" y1="270" x2="232" y2="270" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.25"/>
      <line x1="120" y1="258" x2="120" y2="282" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.25"/>
    </svg>
  )
}

// ─── SVG: Shitsurai room diagram ─────────────────────────────────────────────
function ShitsuraiRoomDiagram() {
  return (
    <svg viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[480px] mx-auto">
      {/* Floor — receding perspective */}
      <path d="M28 275 L210 188 L392 275 Z" fill="var(--paper-deep)" opacity="0.3"/>
      <line x1="28" y1="275" x2="392" y2="275" stroke="var(--ink-mute)" strokeWidth="0.8" opacity="0.4"/>
      {[100,170,250,320].map(x => (
        <line key={x} x1={x} y1="275" x2={210+(x-210)*0.28} y2="194" stroke="var(--ink-mute)" strokeWidth="0.5" opacity="0.25"/>
      ))}

      {/* Back wall */}
      <rect x="70" y="22" width="280" height="170" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="1"/>

      {/* Wall columns */}
      <rect x="62" y="22" width="10" height="170" fill="var(--ink)" opacity="0.1"/>
      <rect x="348" y="22" width="10" height="170" fill="var(--ink)" opacity="0.1"/>

      {/* Light rays through right side — soft beams */}
      <path d="M350 30 L210 130 L350 180 Z" fill="var(--gold)" opacity="0.06"/>
      <path d="M348 60 L260 130" stroke="var(--gold)" strokeWidth="14" opacity="0.05"/>

      {/* ─── Left: Tokonoma alcove ─── */}
      <rect x="80" y="30" width="90" height="156" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.1"/>
      {/* Alcove shadow line inside */}
      <line x1="86" y1="34" x2="86" y2="182" stroke="var(--ink)" strokeWidth="0.5" opacity="0.2"/>
      {/* Tokonoma kanji watermark */}
      <text x="160" y="105" fontSize="16" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif"
            writingMode="vertical-rl" textAnchor="middle" letterSpacing="5" opacity="0.25">床之间</text>

      {/* Ikebana arrangement */}
      {/* Vase — Japanese ceramic silhouette */}
      {/* Foot shadow */}
      <ellipse cx="120" cy="186" rx="11" ry="2.5" fill="var(--ink)" opacity="0.18"/>
      {/* Foot ring */}
      <ellipse cx="120" cy="184" rx="10" ry="2" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="0.95"/>
      {/* Body — bulbous bottom, narrowing toward shoulder */}
      <path d="M112 184 Q107 178 108 170 Q110 163 113 159 L127 159 Q130 163 132 170 Q133 178 128 184 Z"
            fill="var(--paper-soft)" stroke="var(--ink)" strokeWidth="1.15" strokeLinejoin="round"/>
      {/* Body curve highlight */}
      <path d="M112 178 Q113 173 115 168" stroke="var(--ink)" strokeWidth="0.5" fill="none" opacity="0.4"/>
      {/* Neck */}
      <rect x="115" y="153" width="10" height="6" fill="var(--paper-soft)" stroke="var(--ink)" strokeWidth="1"/>
      {/* Mouth — flared lip */}
      <ellipse cx="120" cy="153" rx="6" ry="1.5" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1"/>
      {/* Stems rising */}
      <path d="M118 152 C115 134 112 120 105 105" stroke="var(--tea-deep)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M122 152 C124 140 128 128 130 114" stroke="var(--tea-deep)" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
      {/* Side leaf */}
      <path d="M116 130 Q108 128 104 132" stroke="var(--tea)" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.8"/>
      {/* Blossoms */}
      <circle cx="105" cy="103" r="3.5" fill="var(--plum)" fillOpacity="0.3" stroke="var(--plum)" strokeWidth="1.1"/>
      <circle cx="105" cy="103" r="0.9" fill="var(--plum)" opacity="0.85"/>
      <circle cx="130" cy="112" r="2.8" fill="var(--paper)" stroke="var(--plum)" strokeWidth="1.05" opacity="0.85"/>
      <circle cx="130" cy="112" r="0.6" fill="var(--plum)" opacity="0.7"/>

      {/* ─── Right: Hanging scroll ─── */}
      <rect x="218" y="36" width="92" height="138" rx="1" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1"/>
      <line x1="212" y1="34" x2="316" y2="34" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="212" y1="176" x2="316" y2="176" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Painting — mountains and mist */}
      <path d="M232 144 L258 102 L284 144" stroke="var(--ink-soft)" strokeWidth="1" fill="none"/>
      <path d="M240 144 L264 115 L296 144" stroke="var(--ink-soft)" strokeWidth="0.85" fill="none" opacity="0.65"/>
      <rect x="222" y="135" width="84" height="9" fill="var(--paper)" opacity="0.4"/>
      {/* Seal */}
      <rect x="287" y="156" width="6" height="6" fill="var(--plum)" opacity="0.55"/>

      {/* ─── Centre floor: Tea utensils ─── */}
      <ellipse cx="210" cy="240" rx="36" ry="9" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.7"/>
      {/* Tea bowl */}
      <path d="M192 232 Q193 244 204 244 Q215 244 216 232 Z" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="1" strokeLinejoin="round"/>
      <ellipse cx="204" cy="232" rx="12" ry="2.2" fill="none" stroke="var(--ink)" strokeWidth="0.9"/>
      {/* Tea whisk */}
      <line x1="226" y1="238" x2="232" y2="220" stroke="var(--ink)" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M229 222 L232 218 L235 222" stroke="var(--ink)" strokeWidth="0.7" fill="none" strokeLinecap="round"/>

      {/* ─── Labels ─── */}
      {/* 主花材 — ikebana */}
      <line x1="105" y1="103" x2="56" y2="80" stroke="var(--tea-deep)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7"/>
      <text x="50" y="84" fontSize="13" fill="var(--tea-deep)" fontFamily="'Noto Serif SC', serif" fontWeight="500" textAnchor="end">主花材</text>

      {/* 挂轴 — hanging scroll */}
      <line x1="310" y1="60" x2="354" y2="52" stroke="var(--ink-mute)" strokeWidth="0.8" strokeDasharray="3 3"/>
      <text x="360" y="56" fontSize="13" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500">挂轴</text>

      {/* 道具组合 — tea utensils */}
      <line x1="232" y1="218" x2="300" y2="200" stroke="var(--ink-mute)" strokeWidth="0.8" strokeDasharray="3 3"/>
      <text x="306" y="204" fontSize="13" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500">道具组合</text>

      {/* 床之间 — tokonoma alcove */}
      <line x1="80" y1="36" x2="58" y2="30" stroke="var(--ink-mute)" strokeWidth="0.8" strokeDasharray="3 3"/>
      <text x="54" y="34" fontSize="13" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500" textAnchor="end">床之间</text>

      {/* Bottom labels */}
      <text x="38" y="266" fontSize="12" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500">室内空间</text>
      <text x="382" y="266" fontSize="12" fill="var(--ink-soft)" fontFamily="'Noto Serif SC', serif" fontWeight="500" textAnchor="end">光线处理</text>
    </svg>
  )
}

// ─── SVG: Modern study room with 室礼 scroll ─────────────────────────────────
function StudyScrollRoom() {
  return (
    <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[160px] mx-auto">
      {/* Wall */}
      <rect x="10" y="10" width="180" height="148" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="1"/>
      {/* Floor */}
      <path d="M10 158 L190 158 L210 220 L-10 220 Z" fill="var(--paper-deep)" opacity="0.4"/>
      <line x1="10" y1="178" x2="190" y2="178" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.3"/>
      <line x1="10" y1="200" x2="190" y2="200" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.2"/>
      <line x1="100" y1="158" x2="100" y2="220" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.2"/>
      {/* Inner wall area */}
      <rect x="36" y="10" width="128" height="146" fill="var(--paper)" stroke="var(--ink-mute)" strokeWidth="0.7"/>
      {/* Scroll */}
      <rect x="78" y="18" width="36" height="100" rx="2" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.8"/>
      <rect x="74" y="16" width="44" height="5" rx="2" fill="var(--ink)" opacity="0.18"/>
      <rect x="74" y="114" width="44" height="5" rx="2" fill="var(--ink)" opacity="0.18"/>
      <text x="96" y="42" fontSize="10" fill="var(--ink-soft)" fontFamily="Noto Serif SC, serif"
        writingMode="vertical-rl" textAnchor="middle" letterSpacing="5">室礼</text>
      {/* Desk */}
      <rect x="36" y="128" width="90" height="18" rx="2" fill="var(--paper-deep)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.75"/>
      {/* Desk leg */}
      <rect x="40" y="146" width="5" height="14" rx="1" fill="var(--ink)" opacity="0.15"/>
      <rect x="118" y="146" width="5" height="14" rx="1" fill="var(--ink)" opacity="0.15"/>
      {/* Lamp on desk */}
      <line x1="56" y1="128" x2="56" y2="100" stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M50 100 C50 95 62 95 62 100" fill="var(--gold)" opacity="0.4" stroke="var(--ink-mute)" strokeWidth="0.6"/>
      {/* Small items on desk */}
      <rect x="72" y="122" width="8" height="8" rx="1" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.5"/>
      <rect x="82" y="124" width="5" height="6" rx="0.5" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.5"/>
      {/* Chair */}
      <rect x="140" y="120" width="28" height="22" rx="3" fill="var(--paper-soft)" stroke="var(--ink-mute)" strokeWidth="0.7" opacity="0.7"/>
      <rect x="143" y="142" width="4" height="18" rx="1" fill="var(--ink)" opacity="0.12"/>
      <rect x="161" y="142" width="4" height="18" rx="1" fill="var(--ink)" opacity="0.12"/>
    </svg>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconHeart = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--moss)" strokeWidth="1.2"/>
    {/* Stand */}
    <rect x="12" y="25.5" width="16" height="2.6" rx="0.4" stroke="var(--moss)" strokeWidth="1.1" fill="none"/>
    {/* Incense burner — rounded body */}
    <path d="M16 25.5 Q15 19 20 19 Q25 19 24 25.5 Z" stroke="var(--moss)" strokeWidth="1.15" fill="none" strokeLinejoin="round"/>
    {/* Rim */}
    <line x1="16.5" y1="19.5" x2="23.5" y2="19.5" stroke="var(--moss)" strokeWidth="0.9"/>
    {/* Smoke trail — gentle S-curve rising */}
    <path d="M20 18.5 Q22 15 19 12 Q17 9.5 20 7" stroke="var(--moss)" strokeWidth="0.95" fill="none" strokeLinecap="round" opacity="0.7"/>
  </svg>
)
const IconSeasons = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--moss)" strokeWidth="1.2"/>
    {/* Inner seasonal wheel — dashed cycle */}
    <circle cx="20" cy="20" r="9" stroke="var(--moss)" strokeWidth="1" fill="none" opacity="0.5" strokeDasharray="2.4 2"/>
    {/* Spring (top) — bud */}
    <circle cx="20" cy="11" r="2.2" stroke="var(--moss)" strokeWidth="1.2" fill="none"/>
    <circle cx="20" cy="11" r="0.65" fill="var(--moss)" opacity="0.75"/>
    {/* Summer (right) — sun */}
    <circle cx="29" cy="20" r="2.2" fill="var(--moss)" opacity="0.85"/>
    {/* Autumn (bottom) — falling leaf */}
    <path d="M19 27 Q17 29 18 31 Q20.3 31.5 21.8 30 Q22.3 28.4 19 27Z" stroke="var(--moss)" strokeWidth="1.1" fill="none" strokeLinejoin="round"/>
    <line x1="19.3" y1="27.5" x2="21.3" y2="30.5" stroke="var(--moss)" strokeWidth="0.65" opacity="0.5"/>
    {/* Winter (left) — snowflake */}
    <line x1="8" y1="20" x2="14" y2="20" stroke="var(--moss)" strokeWidth="1" strokeLinecap="round"/>
    <line x1="11" y1="17" x2="11" y2="23" stroke="var(--moss)" strokeWidth="1" strokeLinecap="round"/>
    <line x1="8.7" y1="17.7" x2="13.3" y2="22.3" stroke="var(--moss)" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
    <line x1="13.3" y1="17.7" x2="8.7" y2="22.3" stroke="var(--moss)" strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
  </svg>
)
const IconCulture = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--moss)" strokeWidth="1.2"/>
    {/* Hanging scroll — top roller */}
    <line x1="13" y1="11.5" x2="27" y2="11.5" stroke="var(--moss)" strokeWidth="1.3" strokeLinecap="round"/>
    {/* Scroll body */}
    <rect x="15" y="11.5" width="10" height="16.5" stroke="var(--moss)" strokeWidth="1.15" fill="none"/>
    {/* Bottom roller */}
    <line x1="13" y1="28" x2="27" y2="28" stroke="var(--moss)" strokeWidth="1.3" strokeLinecap="round"/>
    {/* Single calligraphic brushstroke */}
    <path d="M19.5 15 Q20 19 19.5 22.5" stroke="var(--moss)" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.8"/>
    {/* Seal — small red-stamp dot */}
    <rect x="21.3" y="23.5" width="2" height="2" rx="0.2" fill="var(--moss)" opacity="0.55"/>
  </svg>
)
const IconConsider = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-12 h-12">
    <circle cx="20" cy="20" r="16" stroke="var(--moss)" strokeWidth="1.2"/>
    {/* Left cushion (zabuton) */}
    <rect x="9.5" y="20.5" width="8.5" height="5.5" rx="0.8" stroke="var(--moss)" strokeWidth="1.1" fill="none"/>
    {/* Right cushion */}
    <rect x="22" y="20.5" width="8.5" height="5.5" rx="0.8" stroke="var(--moss)" strokeWidth="1.1" fill="none"/>
    {/* Tea bowl between */}
    <path d="M18.5 22 Q18.7 26 20 26.3 Q21.3 26 21.5 22 Z" stroke="var(--moss)" strokeWidth="1.05" fill="none" strokeLinejoin="round"/>
    <ellipse cx="20" cy="22" rx="1.5" ry="0.4" stroke="var(--moss)" strokeWidth="0.85"/>
    {/* Single steam wisp */}
    <path d="M20 21 Q19.4 18.5 20 16" stroke="var(--moss)" strokeWidth="0.85" fill="none" strokeLinecap="round" opacity="0.55"/>
  </svg>
)

const spiritCards = [
  { Icon: IconHeart,    title: '表达心意', desc: '透过器物和布置传递主人的真诚、体贴和祝福之意。让客人感受到家的温暖。' },
  { Icon: IconSeasons,  title: '时空融合', desc: '将季节的变换和场合的特殊性融入日常生活，创造感受生命在四季中的流转。' },
  { Icon: IconCulture,  title: '知性洗练', desc: '以深厚的文化底蕴和审美眼光选择元素，散发高雅气息。' },
  { Icon: IconConsider, title: '尊重他人', desc: '言行举止得体，布置周到，在共享空间中保持恰当距离。体现人情世故的达观。' },
]

const applicationItems = [
  { title: '隐秘的魅力', desc: '避免炫耀，将美感悄悄藏在器物组合与细节之间，让客人慢慢发现。' },
  { title: '细节的讲究', desc: '在材质、工艺和摆放上精益求精，每一处安排都不经意而见用心。' },
  { title: '时令的把握', desc: '根据季节和场合调整器物、花材与心情，让空间随时令呼吸生姿。' },
  { title: '平衡之美',   desc: '在简洁与丰富、传统与现代之间寻找平衡，让陈设耐人反复品味。' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ShitsuraiPage() {
  return (
    <main className="min-h-screen pb-32" style={{ position: 'relative', zIndex: 1 }}>

      <PrincipleTopNav slug="shitsurai" />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Section className="max-w-[900px] mx-auto px-6 pt-14 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <FadeUp>
              <span className="seal text-[10px] tracking-[0.15em] mb-5 inline-block" style={{ background: 'var(--moss, #7a8c5c)', color: 'var(--paper)', opacity: 0.88, fontFamily: 'Noto Serif SC, serif', fontWeight: 500 }}>
                以器物言四季
              </span>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="text-6xl md:text-7xl font-light text-[var(--ink)] leading-none tracking-[0.12em] mb-3">
                室礼
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-sm text-[var(--ink-mute)] tracking-[0.25em] mb-7">
                しつらい | Shitsurai
              </p>
              <div className="brush-divider w-20 mb-7" />
            </FadeUp>
            <FadeUp delay={0.15}>
              <p className="text-lg md:text-xl font-light text-[var(--ink-soft)] leading-[2.1] mb-5 max-w-[460px]" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                室礼是将特定场合或季节，通过器物、花卉与挂轴，以优雅方式融入生活空间的艺术。
              </p>
              <p className="text-base text-[var(--ink-mute)] leading-[1.9] max-w-[460px]">
                它不只是装饰，更是主人向客人传递心意、与时令共鸣的方式。
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="flex items-center justify-center md:justify-end">
            <Image src="/hero-shitsurai.png" alt="室礼 — Shitsurai" width={640} height={640} className="w-full max-w-[560px] mx-auto object-contain" />
          </FadeUp>
        </div>
      </Section>

      {/* ── 室礼的精神 — tinted band, moss/sage accent bar ─────────────────── */}
      <section style={{ background: 'var(--paper-soft)' }} className="py-16 md:py-20">
        <Section className="max-w-[900px] mx-auto px-6">
          <FadeUp className="mb-10">
            <p className="font-sans-zen text-[10px] tracking-[0.5em] text-[var(--ink-mute)] uppercase mb-2">essence</p>
            <h2 className="text-2xl font-light text-[var(--ink)] tracking-[0.12em]">室礼的精神</h2>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {spiritCards.map(({ Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <div className="bg-[var(--paper)] rounded-xl p-5 h-full flex flex-col items-center text-center"
                  style={{ borderTop: '2px solid var(--moss)' }}>
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
            <h2 className="text-xl font-light text-[var(--ink)] mb-7 tracking-wide">室礼的运用要素</h2>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--paper-deep)' }}>
              <ShitsuraiRoomDiagram />
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
                    style={{ background: 'var(--moss)', color: '#fff' }}>
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

      {/* ── 生活中的室礼 — deep paper band ─────────────────────────────────── */}
      <section style={{ background: 'var(--paper-deep)' }}>
        <Section className="max-w-[900px] mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeUp className="flex justify-center">
              <Image src="/everyday-shitsurai.png" alt="室礼 — everyday" width={480} height={480} className="w-full max-w-[420px] mx-auto object-contain" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">everyday</p>
              <h2 className="text-2xl font-light text-[var(--ink)] mb-5 tracking-wide">生活中的室礼</h2>
              <p className="text-[var(--ink-soft)] leading-[2.1] mb-4 text-base md:text-lg" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                室礼不只存在于特定场合。一个书桌的布置、一次餐桌的搭配，甚至一次诚挚的对话，都能成为室礼的表达。
              </p>
              <p className="text-[var(--ink-mute)] leading-[2.1] mb-8 text-base" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                不因繁复而失真，不因简约而流于表面——室礼是一种从容的自知。
              </p>
              <blockquote className="pl-5 py-1" style={{ borderLeft: '2px solid var(--moss)' }}>
                <p className="text-base text-[var(--ink-soft)] leading-[2] italic" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                  室礼教会我们：最美的布置，是让客人感到主人的心——而非看到主人的用力。
                </p>
              </blockquote>
            </FadeUp>
          </div>
        </Section>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <PrincipleBottomNav slug="shitsurai" />
    </main>
  )
}

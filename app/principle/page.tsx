'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ArrowRight } from 'lucide-react'

const principles = [
  {
    slug: 'omotenashi',
    kanji: '款待',
    reading: 'おもてなし',
    romaji: 'Omotenashi',
    chinese: '款待之道',
    tagline: '以心迎心，一期一会',
    description: '从客人踏上石径的第一步，到目送背影消失于门外——每一个当下，都是一场完整的相遇。',
    accent: '#a05848',
    accentDeep: '#7a3828',
    number: '一',
    svgEl: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Stone lantern — welcoming light on the garden path */}
        {/* Soft halo of light */}
        <circle cx="60" cy="62" r="22" fill="#a05848" opacity="0.07" className="origin-center transition-all duration-500 group-hover:scale-110 group-hover:opacity-15 motion-safe:group-hover:animate-[omotenashi-halo_2.2s_ease-in-out_infinite]"/>
        <circle cx="60" cy="62" r="14" fill="#a05848" opacity="0.09" className="origin-center transition-all duration-500 group-hover:scale-125 group-hover:opacity-20 motion-safe:group-hover:animate-[omotenashi-glow_1.8s_ease-in-out_infinite]"/>
        <g className="origin-center transition-transform duration-500 group-hover:-translate-y-1 motion-safe:group-hover:animate-[omotenashi-lantern_1.8s_ease-in-out_infinite]">
          {/* Lantern cap */}
          <path d="M44 50 L60 38 L76 50 Z" fill="var(--ink-soft)" opacity="0.35"/>
          <path d="M42 50 L78 50" stroke="var(--ink-soft)" strokeWidth="1" strokeLinecap="round" opacity="0.55"/>
          {/* Light chamber */}
          <rect x="50" y="52" width="20" height="22" rx="1" fill="#a05848" opacity="0.18" stroke="#a05848" strokeWidth="0.9" strokeOpacity="0.55" className="transition-all duration-500 group-hover:opacity-35"/>
          <line x1="60" y1="54" x2="60" y2="72" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.45"/>
          <line x1="52" y1="63" x2="68" y2="63" stroke="var(--ink-mute)" strokeWidth="0.4" opacity="0.45"/>
          {/* Pedestal */}
          <rect x="52" y="76" width="16" height="4" rx="0.5" fill="var(--ink-soft)" opacity="0.4"/>
          <rect x="55" y="80" width="10" height="14" rx="0.5" fill="var(--ink-soft)" opacity="0.28"/>
        </g>
        {/* Stepping stones leading in */}
        <ellipse cx="26" cy="100" rx="9" ry="3" fill="var(--ink-soft)" opacity="0.22"/>
        <ellipse cx="94" cy="100" rx="7" ry="2.4" fill="var(--ink-soft)" opacity="0.18"/>
      </svg>
    ),
  },
  {
    slug: 'yohaku',
    kanji: '余白',
    reading: 'よはくのび',
    romaji: 'Yohaku no Bi',
    chinese: '余白之美',
    tagline: '留白即是满盈',
    description: '空白不是缺席，而是一种无声的存在。在未占据的空间里，意义得以呼吸，想象得以伸展。',
    accent: 'var(--tea)',
    accentDeep: 'var(--tea-deep)',
    number: '二',
    svgEl: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* A single branch reaching into emptiness — one blossom, vast space */}
        <g className="origin-bottom transition-transform duration-700 motion-safe:group-hover:animate-[yohaku-branch_2.8s_ease-in-out_infinite]">
          <path d="M62 100 Q60 78 66 56 Q68 46 72 38" stroke="var(--ink-soft)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M65 64 Q56 58 48 56" stroke="var(--ink-soft)" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
          <path d="M68 50 Q74 44 78 40" stroke="var(--ink-soft)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.7"/>
          {/* Single bloom — the only fullness */}
          <circle cx="72" cy="38" r="6" fill="var(--tea)" opacity="0.18" className="origin-center transition-all duration-500 group-hover:opacity-25 motion-safe:group-hover:animate-[yohaku-bloom_2.1s_ease-in-out_infinite]"/>
          <circle cx="72" cy="38" r="3" fill="var(--tea)" opacity="0.55" className="origin-center transition-all duration-500 group-hover:opacity-75 motion-safe:group-hover:animate-[yohaku-bloom_2.1s_ease-in-out_infinite]"/>
          <circle cx="72" cy="38" r="1.2" fill="var(--tea-deep, var(--tea))" opacity="0.85"/>
        </g>
        {/* Tiny fallen petal — emphasizing void */}
        <circle cx="42" cy="96" r="1.3" fill="var(--tea)" opacity="0.5" className="transition-all duration-700 motion-safe:group-hover:animate-[yohaku-petal_2.6s_ease-in-out_infinite]"/>
      </svg>
    ),
  },
  {
    slug: 'jiejing',
    kanji: '借景',
    reading: 'しゃっけい',
    romaji: 'Shakkei',
    chinese: '借景之道',
    tagline: '远山皆为我用',
    description: '将窗外的山、池中的月、邻园的松，纳入自己的构图。借自然之景，成自己之境。',
    accent: 'var(--gold)',
    accentDeep: '#8a6a30',
    number: '三',
    svgEl: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Moon gate framing borrowed scenery — distant mountain, rising moon */}
        {/* Inner soft fill */}
        <circle cx="60" cy="56" r="33" fill="var(--gold)" opacity="0.05" className="transition-opacity duration-500 group-hover:opacity-10"/>
        {/* Moon gate ring */}
        <circle cx="60" cy="56" r="33" stroke="var(--gold)" strokeWidth="1.1" opacity="0.55" className="transition-all duration-700 group-hover:opacity-80 group-hover:scale-[1.02] origin-center"/>
        {/* Distant mountain — clipped within the circle */}
        <defs>
          <clipPath id="moon-gate-clip"><circle cx="60" cy="56" r="32"/></clipPath>
        </defs>
        <g clipPath="url(#moon-gate-clip)">
          <g className="transition-transform duration-700 motion-safe:group-hover:animate-[shakkei-mountains_2.6s_ease-in-out_infinite]">
            <path d="M28 86 L46 56 L60 72 L74 50 L88 86 Z" fill="var(--ink-soft)" opacity="0.22"/>
            <path d="M40 86 L54 64 L68 86 Z" fill="var(--ink-soft)" opacity="0.18"/>
          </g>
        </g>
        {/* Rising moon inside the gate */}
        <g className="transition-transform duration-700 motion-safe:group-hover:animate-[shakkei-moon_2.4s_ease-in-out_infinite]">
          <circle cx="74" cy="42" r="6" fill="var(--gold)" opacity="0.45" className="transition-all duration-500 group-hover:opacity-60"/>
          <circle cx="74" cy="42" r="3" fill="var(--gold)" opacity="0.7" className="transition-all duration-500 group-hover:opacity-90"/>
        </g>
      </svg>
    ),
  },
  {
    slug: 'iki',
    kanji: '粋',
    reading: 'いき',
    romaji: 'Iki',
    chinese: '粋之风骨',
    tagline: '克制乃最深之美',
    description: '不显山露水的雅致。粋是一种骨气——知道什么不该说，什么不该穿，什么不该展示。',
    accent: 'var(--plum)',
    accentDeep: '#6a3030',
    number: '四',
    svgEl: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Folding fan — restraint, the elegance of what is held back */}
        <g transform="translate(60 88)">
          <g className="origin-bottom transition-transform duration-700 motion-safe:group-hover:animate-[iki-fan_2.2s_ease-in-out_infinite]">
            {/* Fan blade arc */}
            <path d="M-30 -28 A 38 38 0 0 1 30 -28 L 0 0 Z" fill="var(--plum)" opacity="0.12" stroke="var(--plum)" strokeWidth="1.1" strokeOpacity="0.55" strokeLinejoin="round" className="transition-all duration-500 group-hover:opacity-18"/>
            {/* Inner ribs */}
            <g className="transition-transform duration-700 motion-safe:group-hover:animate-[iki-ribs_2.2s_ease-in-out_infinite]">
              <line x1="0" y1="0" x2="0" y2="-38" stroke="var(--plum)" strokeWidth="0.6" opacity="0.5"/>
              <line x1="0" y1="0" x2="-13" y2="-35" stroke="var(--plum)" strokeWidth="0.6" opacity="0.5"/>
              <line x1="0" y1="0" x2="13" y2="-35" stroke="var(--plum)" strokeWidth="0.6" opacity="0.5"/>
              <line x1="0" y1="0" x2="-24" y2="-28" stroke="var(--plum)" strokeWidth="0.6" opacity="0.5"/>
              <line x1="0" y1="0" x2="24" y2="-28" stroke="var(--plum)" strokeWidth="0.6" opacity="0.5"/>
              {/* Outer guard ribs */}
              <line x1="0" y1="0" x2="-30" y2="-28" stroke="var(--ink-soft)" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
              <line x1="0" y1="0" x2="30" y2="-28" stroke="var(--ink-soft)" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
            </g>
            {/* Pivot */}
            <circle cx="0" cy="0" r="1.8" fill="var(--ink-soft)" opacity="0.7" className="transition-all duration-500 motion-safe:group-hover:animate-[iki-pivot_1.8s_ease-in-out_infinite]"/>
            {/* Solitary motif — a small plum on the fan */}
            <circle cx="0" cy="-22" r="2.4" fill="var(--plum)" opacity="0.7" className="transition-all duration-500 group-hover:opacity-90 motion-safe:group-hover:animate-[iki-pivot_1.8s_ease-in-out_infinite]"/>
          </g>
        </g>
      </svg>
    ),
  },
  {
    slug: 'shitsurai',
    kanji: '室礼',
    reading: 'しつらい',
    romaji: 'Shitsurai',
    chinese: '室礼之境',
    tagline: '以器物言四季',
    description: '季节带来的不只是温度，还有摆设、气味与光线。室礼是对时节的无言应答，是空间的仪式感。',
    accent: 'var(--moss, #7a8c5c)',
    accentDeep: '#556040',
    number: '五',
    svgEl: (isHovered: boolean) => (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Tokonoma alcove with a hanging scroll, ikebana, and a single fruit — seasonal arrangement */}
        {/* Alcove side posts */}
        <line x1="30" y1="22" x2="30" y2="98" stroke="var(--ink-soft)" strokeWidth="0.8" opacity="0.45"/>
        <line x1="90" y1="22" x2="90" y2="98" stroke="var(--ink-soft)" strokeWidth="0.8" opacity="0.45"/>
        <line x1="28" y1="22" x2="92" y2="22" stroke="var(--ink-soft)" strokeWidth="0.8" opacity="0.45"/>
        {/* Hanging scroll */}
        <g className="origin-top transition-transform duration-700 motion-safe:group-hover:animate-[shitsurai-scroll_2.8s_ease-in-out_infinite]">
          <line x1="60" y1="22" x2="60" y2="26" stroke="var(--ink-soft)" strokeWidth="0.6" opacity="0.5"/>
          <rect x="52" y="26" width="16" height="42" fill="var(--paper-soft)" opacity="0.6" stroke="var(--ink-soft)" strokeWidth="0.6" strokeOpacity="0.5" className="transition-opacity duration-500 group-hover:opacity-80"/>
          <line x1="50" y1="28" x2="70" y2="28" stroke="var(--ink-soft)" strokeWidth="0.9" opacity="0.55"/>
          <line x1="50" y1="66" x2="70" y2="66" stroke="var(--ink-soft)" strokeWidth="0.9" opacity="0.55"/>
          {/* Sumi mark — revealed only on hover */}
          <motion.path
            d="M57 38 Q61 34 63 40 Q64 46 60 49 Q57 51 58 55 Q60 58 64 57"
            stroke="var(--moss, #7a8c5c)"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            initial={false}
            animate={isHovered ? { pathLength: 1, opacity: 0.82 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </g>
        {/* Ikebana — three stems, ten-chi-jin (heaven-earth-human) */}
        <g className="origin-[40px_92px] transition-transform duration-700 motion-safe:group-hover:animate-[shitsurai-ikebana_2.6s_ease-in-out_infinite]">
          <path d="M40 92 Q40 80 36 70" stroke="var(--moss, #7a8c5c)" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.75"/>
          <path d="M40 92 Q44 84 50 78" stroke="var(--moss, #7a8c5c)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.6"/>
          <path d="M40 92 Q38 88 34 86" stroke="var(--moss, #7a8c5c)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.5"/>
          <circle cx="36" cy="69" r="2.8" fill="var(--moss, #7a8c5c)" opacity="0.45" className="transition-all duration-500 group-hover:opacity-60"/>
          <circle cx="50" cy="78" r="2" fill="var(--moss, #7a8c5c)" opacity="0.35" className="transition-all duration-500 group-hover:opacity-50"/>
        </g>
        {/* Vase */}
        <path d="M36 92 Q40 90 44 92 L43 98 Q40 100 37 98 Z" fill="var(--ink-soft)" opacity="0.4" className="transition-all duration-500 group-hover:opacity-55"/>
        {/* Single seasonal fruit — quietly placed */}
        <circle cx="78" cy="94" r="3" fill="#a05848" opacity="0.4" className="transition-all duration-500 motion-safe:group-hover:animate-[shitsurai-fruit_2.4s_ease-in-out_infinite]"/>
      </svg>
    ),
  },
  {
    slug: 'mono-no-aware',
    kanji: '物哀',
    reading: 'もののあわれ',
    romaji: 'Mono no Aware',
    chinese: '物哀之感',
    tagline: '花落方知美之深',
    description: '对万物无常的温柔感知。事物之所以美丽，正因为它不会永存。樱花盛开七日，余下的是永恒的哀美。',
    accent: '#b87a4a',
    accentDeep: '#8a5530',
    number: '六',
    svgEl: (isHovered: boolean) => (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* A cherry branch shedding its petals — beauty in passing */}
        {/* Branch arching across */}
        <motion.g
          initial={false}
          animate={isHovered ? { rotate: 1.2, y: -1 } : { rotate: 0, y: 0 }}
          transition={{ duration: 1.4, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{ originX: '14px', originY: '36px' }}
        >
          <path d="M14 36 Q44 30 70 38 Q90 44 104 56" stroke="var(--ink-soft)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M50 36 Q54 28 58 24" stroke="var(--ink-soft)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.7"/>
        </motion.g>
        {/* Blossoms still on branch */}
        <motion.circle cx="28" cy="35" r="3.5" fill="#b87a4a" initial={false} animate={isHovered ? { opacity: 0.6 } : { opacity: 0.45 }} transition={{ duration: 0.4 }}/>
        <motion.circle cx="58" cy="24" r="3.2" fill="#b87a4a" initial={false} animate={isHovered ? { opacity: 0.68 } : { opacity: 0.5 }} transition={{ duration: 0.4 }}/>
        <motion.circle cx="86" cy="44" r="3" fill="#b87a4a" initial={false} animate={isHovered ? { opacity: 0.55 } : { opacity: 0.4 }} transition={{ duration: 0.4 }}/>
        {/* Petals drifting down */}
        <motion.ellipse
          cx="40"
          cy="62"
          rx="2.8"
          ry="1.5"
          fill="#b87a4a"
          initial={false}
          animate={isHovered ? { x: 3, y: 5, rotate: 12, opacity: 0.28 } : { x: 0, y: 0, rotate: 0, opacity: 0.55 }}
          transition={{ duration: 1.3, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{ originX: '40px', originY: '62px' }}
        />
        <motion.ellipse
          cx="68"
          cy="74"
          rx="2.4"
          ry="1.3"
          fill="#b87a4a"
          initial={false}
          animate={isHovered ? { x: -2, y: 6, rotate: 14, opacity: 0.22 } : { x: 0, y: 0, rotate: 0, opacity: 0.45 }}
          transition={{ duration: 1.45, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{ originX: '68px', originY: '74px' }}
        />
        <motion.ellipse
          cx="52"
          cy="86"
          rx="2.2"
          ry="1.2"
          fill="#b87a4a"
          initial={false}
          animate={isHovered ? { x: 2, y: 4, rotate: 10, opacity: 0.2 } : { x: 0, y: 0, rotate: 0, opacity: 0.4 }}
          transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{ originX: '52px', originY: '86px' }}
        />
        <motion.ellipse
          cx="82"
          cy="92"
          rx="2"
          ry="1.1"
          fill="#b87a4a"
          initial={false}
          animate={isHovered ? { x: -1, y: 5, rotate: 16, opacity: 0.16 } : { x: 0, y: 0, rotate: 0, opacity: 0.35 }}
          transition={{ duration: 1.35, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{ originX: '82px', originY: '92px' }}
        />
        {/* Petals settled on ground */}
        <ellipse cx="36" cy="103" rx="2.4" ry="1.2" fill="#b87a4a" opacity="0.45" transform="rotate(-10 36 103)"/>
        <ellipse cx="64" cy="102" rx="2.2" ry="1.1" fill="#b87a4a" opacity="0.4" transform="rotate(15 64 102)"/>
        <ellipse cx="92" cy="103" rx="2" ry="1" fill="#b87a4a" opacity="0.35"/>
      </svg>
    ),
  },
  {
    slug: 'wabi-sabi',
    kanji: '侘寂',
    reading: 'わびさび',
    romaji: 'Wabi-Sabi',
    chinese: '侘寂之境',
    tagline: '残缺处金光最亮',
    description: '在不完美、不圆满与无常之中发现的美。金继ぎ以金修缮裂缝，令残器比完好时更显珍贵。',
    accent: '#8a8278',
    accentDeep: '#6a6258',
    number: '七',
    svgEl: (isHovered: boolean) => (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Tea bowl mended with kintsugi — gold making the wound the most beautiful part */}
        {/* Bowl body */}
        <path d="M32 54 Q34 88 60 94 Q86 88 88 54 Z" fill="#8a8278" opacity="0.1" stroke="var(--ink-soft)" strokeWidth="1.1" strokeLinejoin="round"/>
        {/* Bowl rim */}
        <ellipse cx="60" cy="54" rx="28" ry="5" fill="var(--paper-soft)" opacity="0.5" stroke="var(--ink-soft)" strokeWidth="1.1"/>
        {/* Inner shadow */}
        <ellipse cx="60" cy="54" rx="24" ry="3.5" fill="var(--ink-soft)" opacity="0.12"/>
        {/* Kintsugi golden cracks */}
        <motion.path
          d="M50 56 Q53 72 50 90"
          stroke="var(--gold)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          initial={false}
          animate={isHovered ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M50 70 Q60 68 70 74"
          stroke="var(--gold)"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
          initial={false}
          animate={isHovered ? { pathLength: 1, opacity: 0.82 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.75, delay: isHovered ? 0.18 : 0, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M72 56 Q70 76 74 90"
          stroke="var(--gold)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          initial={false}
          animate={isHovered ? { pathLength: 1, opacity: 0.86 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.95, delay: isHovered ? 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Tiny gold seal — a "tear" of repair */}
        <motion.circle
          cx="70"
          cy="74"
          r="1.3"
          fill="var(--gold)"
          initial={false}
          animate={isHovered ? { opacity: 0.95, scale: 1.15 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.45, delay: isHovered ? 0.45 : 0 }}
          style={{ originX: '70px', originY: '74px' }}
        />
        {/* Foot ring */}
        <ellipse cx="60" cy="94" rx="10" ry="2.4" fill="var(--ink-soft)" opacity="0.35"/>
      </svg>
    ),
  },
  {
    slug: 'yugen',
    kanji: '幽玄',
    reading: 'ゆうげん',
    romaji: 'Yūgen',
    chinese: '幽玄之道',
    tagline: '深不可测，言语难及',
    description: '对宇宙深邃之美的感知——超越语言，触及人心最深处的震颤。薄雾中的山，暗台上的能面。',
    accent: '#4a5878',
    accentDeep: '#2a3858',
    number: '八',
    svgEl: (isHovered: boolean) => (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Misted moon over receding mountains — depths beyond words */}
        {/* Moon halos */}
        <motion.circle cx="74" cy="36" r="20" fill="#4a5878" initial={false} animate={isHovered ? { opacity: 0.14, scale: 1.08 } : { opacity: 0.08, scale: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }} style={{ originX: '74px', originY: '36px' }}/>
        <motion.circle cx="74" cy="36" r="14" fill="#4a5878" initial={false} animate={isHovered ? { opacity: 0.2, scale: 1.06 } : { opacity: 0.14, scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} style={{ originX: '74px', originY: '36px' }}/>
        <motion.circle cx="74" cy="36" r="9" fill="#4a5878" initial={false} animate={isHovered ? { opacity: 0.38 } : { opacity: 0.3 }} transition={{ duration: 0.8 }}/>
        <motion.circle cx="74" cy="36" r="5" fill="#4a5878" initial={false} animate={isHovered ? { opacity: 0.72 } : { opacity: 0.55 }} transition={{ duration: 0.8 }}/>
        {/* Mountain layers — farthest first */}
        <motion.path d="M14 86 L38 50 L60 86 Z" fill="#4a5878" initial={false} animate={isHovered ? { x: -1, opacity: 0.24 } : { x: 0, opacity: 0.18 }} transition={{ duration: 1.2, ease: 'easeInOut' }}/>
        <motion.path d="M38 86 L60 60 L84 86 Z" fill="#4a5878" initial={false} animate={isHovered ? { y: -1, opacity: 0.38 } : { y: 0, opacity: 0.3 }} transition={{ duration: 1.1, ease: 'easeInOut' }}/>
        <motion.path d="M62 86 L82 68 L102 86 Z" fill="#4a5878" initial={false} animate={isHovered ? { x: 1, opacity: 0.5 } : { x: 0, opacity: 0.42 }} transition={{ duration: 1.2, ease: 'easeInOut' }}/>
        {/* Mist bands — veiling everything */}
        <motion.line x1="46" y1="40" x2="100" y2="38" stroke="var(--paper)" strokeWidth="2.4" strokeLinecap="round" initial={false} animate={isHovered ? { x: -3, opacity: 0.84 } : { x: 0, opacity: 0.7 }} transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }}/>
        <motion.line x1="14" y1="68" x2="106" y2="66" stroke="var(--paper)" strokeWidth="3" strokeLinecap="round" initial={false} animate={isHovered ? { x: 4, opacity: 0.7 } : { x: 0, opacity: 0.55 }} transition={{ duration: 1.8, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }}/>
        <motion.line x1="14" y1="82" x2="106" y2="82" stroke="var(--paper)" strokeWidth="2.4" strokeLinecap="round" initial={false} animate={isHovered ? { x: -2, opacity: 0.52 } : { x: 0, opacity: 0.4 }} transition={{ duration: 1.6, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }}/>
      </svg>
    ),
  },
  {
    slug: 'yojo',
    kanji: '余情',
    reading: 'よじょう',
    romaji: 'Yojō',
    chinese: '余情之味',
    tagline: '最深的话从不说出',
    description: '诗读完，情未尽。那些没有被说出、却被深深感受到的部分。短诗中的留白，是留给读者心去完成的空间。',
    accent: '#8a6878',
    accentDeep: '#6a4858',
    number: '九',
    svgEl: (isHovered: boolean) => (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* A tea cup left on the veranda, plum branch above — what is felt after */}
        {/* Moon */}
        <motion.circle cx="86" cy="32" r="14" fill="#8a6878" initial={false} animate={isHovered ? { opacity: 0.16, scale: 1.08 } : { opacity: 0.1, scale: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }} style={{ originX: '86px', originY: '32px' }}/>
        <motion.circle cx="86" cy="32" r="9" fill="#8a6878" initial={false} animate={isHovered ? { opacity: 0.3, scale: 1.05 } : { opacity: 0.22, scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} style={{ originX: '86px', originY: '32px' }}/>
        <motion.circle cx="86" cy="32" r="5" fill="#8a6878" initial={false} animate={isHovered ? { opacity: 0.65 } : { opacity: 0.5 }} transition={{ duration: 0.8 }}/>
        {/* Plum branch arcing */}
        <motion.path d="M12 70 Q44 52 80 44" stroke="var(--ink-soft)" strokeWidth="1.2" fill="none" strokeLinecap="round" initial={false} animate={isHovered ? { rotate: 0.8, x: 1 } : { rotate: 0, x: 0 }} transition={{ duration: 1.3, ease: 'easeInOut' }} style={{ originX: '12px', originY: '70px' }}/>
        <motion.path d="M48 58 Q56 46 60 38" stroke="var(--ink-soft)" strokeWidth="0.7" fill="none" strokeLinecap="round" initial={false} animate={isHovered ? { rotate: 1.2, x: 1, opacity: 0.82 } : { rotate: 0, x: 0, opacity: 0.7 }} transition={{ duration: 1.3, ease: 'easeInOut' }} style={{ originX: '48px', originY: '58px' }}/>
        {/* Plum blossoms */}
        <motion.circle cx="60" cy="38" r="3.2" fill="#8a6878" initial={false} animate={isHovered ? { opacity: 0.72, scale: 1.08 } : { opacity: 0.55, scale: 1 }} transition={{ duration: 0.8 }} style={{ originX: '60px', originY: '38px' }}/>
        <motion.circle cx="78" cy="44" r="2.8" fill="#8a6878" initial={false} animate={isHovered ? { opacity: 0.58, scale: 1.05 } : { opacity: 0.45, scale: 1 }} transition={{ duration: 0.8 }} style={{ originX: '78px', originY: '44px' }}/>
        <motion.circle cx="32" cy="64" r="2.6" fill="#8a6878" initial={false} animate={isHovered ? { opacity: 0.5, scale: 1.04 } : { opacity: 0.4, scale: 1 }} transition={{ duration: 0.8 }} style={{ originX: '32px', originY: '64px' }}/>
        {/* Tea cup left behind */}
        <path d="M46 86 Q48 96 60 98 Q72 96 74 86 Z" fill="var(--ink-soft)" opacity="0.18" stroke="var(--ink-soft)" strokeWidth="1" strokeLinejoin="round"/>
        <ellipse cx="60" cy="86" rx="14" ry="2.4" fill="var(--paper-soft)" opacity="0.6" stroke="var(--ink-soft)" strokeWidth="0.9"/>
        <ellipse cx="60" cy="86" rx="11" ry="1.6" fill="#8a6878" opacity="0.18"/>
        {/* Faint steam — emotion that lingers */}
        <motion.path d="M58 82 Q54 74 58 66" stroke="#8a6878" strokeWidth="0.7" fill="none" strokeLinecap="round" initial={false} animate={isHovered ? { y: -4, opacity: 0.72 } : { y: 0, opacity: 0.45 }} transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }}/>
        <motion.path d="M64 82 Q66 76 64 70" stroke="#8a6878" strokeWidth="0.6" fill="none" strokeLinecap="round" initial={false} animate={isHovered ? { y: -3, x: 1, opacity: 0.6 } : { y: 0, x: 0, opacity: 0.35 }} transition={{ duration: 1.7, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }}/>
        {/* Fallen petal near cup */}
        <motion.ellipse
          cx="86"
          cy="100"
          rx="2.6"
          ry="1.4"
          fill="#8a6878"
          initial={false}
          animate={isHovered ? { x: -2, y: 1, rotate: 8, opacity: 0.34 } : { x: 0, y: 0, rotate: 0, opacity: 0.55 }}
          transition={{ duration: 1.4, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }}
          style={{ originX: '86px', originY: '100px' }}
        />
      </svg>
    ),
  },
  {
    slug: 'yoin',
    kanji: '余韵',
    reading: 'よいん',
    romaji: 'Yoin',
    chinese: '余韵之响',
    tagline: '余音绕梁，三日不绝',
    description: '客人离去之后，仍停留于感官与内心的回响。茶香散尽、门声已远，那份久久未去的温度，便是余韵。',
    accent: '#6b7a8d',
    accentDeep: '#4a5a6d',
    number: '十',
    svgEl: (isHovered: boolean) => (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Concentric ripples in still water — the echo that remains */}
        {/* Moon reflected at top */}
        <motion.circle cx="60" cy="32" r="11" fill="#6b7a8d" initial={false} animate={isHovered ? { opacity: 0.24, scale: 1.05 } : { opacity: 0.18, scale: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }} style={{ originX: '60px', originY: '32px' }}/>
        <motion.circle cx="60" cy="32" r="7" fill="#6b7a8d" initial={false} animate={isHovered ? { opacity: 0.5, scale: 1.04 } : { opacity: 0.4, scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} style={{ originX: '60px', originY: '32px' }}/>
        <motion.circle cx="60" cy="32" r="3.5" fill="#6b7a8d" initial={false} animate={isHovered ? { opacity: 0.82 } : { opacity: 0.7 }} transition={{ duration: 0.8 }}/>
        {/* Center disturbance */}
        <motion.circle cx="60" cy="74" r="1.4" fill="#6b7a8d" initial={false} animate={isHovered ? { opacity: 1, scale: 1.18 } : { opacity: 0.9, scale: 1 }} transition={{ duration: 0.7, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }} style={{ originX: '60px', originY: '74px' }}/>
        {/* Ripples — flattened ellipses to read as water */}
        <motion.ellipse cx="60" cy="74" rx="8" ry="2" stroke="#6b7a8d" strokeWidth="1" fill="none" initial={false} animate={isHovered ? { scale: 1.12, opacity: 0.9 } : { scale: 1, opacity: 0.7 }} transition={{ duration: 1.1, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }} style={{ originX: '60px', originY: '74px' }}/>
        <motion.ellipse cx="60" cy="74" rx="18" ry="3.4" stroke="#6b7a8d" strokeWidth="0.8" fill="none" initial={false} animate={isHovered ? { scale: 1.08, opacity: 0.68 } : { scale: 1, opacity: 0.5 }} transition={{ duration: 1.35, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }} style={{ originX: '60px', originY: '74px' }}/>
        <motion.ellipse cx="60" cy="74" rx="28" ry="5" stroke="#6b7a8d" strokeWidth="0.7" fill="none" initial={false} animate={isHovered ? { scale: 1.05, opacity: 0.5 } : { scale: 1, opacity: 0.35 }} transition={{ duration: 1.55, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }} style={{ originX: '60px', originY: '74px' }}/>
        <motion.ellipse cx="60" cy="74" rx="38" ry="6.6" stroke="#6b7a8d" strokeWidth="0.6" fill="none" initial={false} animate={isHovered ? { scale: 1.03, opacity: 0.34 } : { scale: 1, opacity: 0.22 }} transition={{ duration: 1.75, repeat: isHovered ? Infinity : 0, repeatType: 'mirror', ease: 'easeInOut' }} style={{ originX: '60px', originY: '74px' }}/>
        {/* Water plane suggestion */}
      </svg>
    ),
  },
]

function PrincipleCard({ p, index }: { p: typeof principles[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="h-full" style={{ background: 'var(--paper)' }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
        className="h-full"
      >
      <Link
        href={`/principle/${p.slug}`}
        className="group block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative overflow-hidden h-full flex flex-col"
          style={{ background: 'var(--paper)' }}
        >
          {/* Hover arrow — top right */}
          <motion.div
            className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            style={{ color: p.accent }}
          >
            <ArrowRight size={14} />
          </motion.div>

          {/* Body — text on the left, larger icon on the right */}
          <div className="px-7 pt-7 pb-8 flex gap-3 items-start">
            <div className="flex-1 min-w-0">
              {/* Kanji */}
              <div className="mb-1.5">
                <h2 className="text-4xl font-light text-[var(--ink)] tracking-wide leading-none" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  {p.kanji}
                </h2>
              </div>
              {/* Reading */}
              <p className="text-[10px] text-[var(--ink-mute)] tracking-[0.18em] mb-3" style={{ fontFamily: 'var(--font-sans-zen, Inter)' }}>
                {p.reading} · {p.chinese}
              </p>

              {/* Hairline */}
              <div style={{ height: '1px', background: p.accent, opacity: 0.22, marginBottom: '12px' }} />

              {/* Tagline */}
              <p className="text-sm font-medium text-[var(--ink-soft)] mb-2 tracking-wide"
                 style={{ fontFamily: "'Noto Serif SC', serif" }}>
                {p.tagline}
              </p>

              {/* Description — bottom-right padding so number seal doesn't collide */}
              <p className="text-xs text-[var(--ink-mute)] leading-relaxed pr-4 sm:pr-6">
                {p.description}
              </p>
            </div>

            {/* Icon — larger, right-aligned, sits in upper-right of card */}
            <div className="shrink-0 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 -mt-1 -mr-2 opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                 style={{ transformOrigin: 'center' }}>
              {typeof p.svgEl === 'function' ? p.svgEl(isHovered) : p.svgEl}
            </div>
          </div>

          {/* Number seal — bottom right */}
          <span className="seal absolute bottom-5 right-5 font-bold text-[12px] tracking-[0.05em] z-10"
                style={{ background: p.accent, color: 'var(--paper)', opacity: 0.9, fontFamily: "'Noto Serif SC', serif" }}>
            {p.number}
          </span>

          {/* Hover underline */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
               style={{ background: p.accent, opacity: 0.5 }} />
        </div>
      </Link>
      </motion.div>
    </div>
  )
}

export default function PrinciplePage() {
  return (
    <main className="min-h-screen pb-32">

      {/* Back nav */}
      <div className="max-w-[900px] mx-auto px-6 pt-8">
        <Link href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-mute)] hover:text-[var(--tea)] transition-colors tracking-wider">
          <ChevronLeft size={13} />
          花间静茶
        </Link>
      </div>

      {/* Hero */}
      <header className="max-w-[900px] mx-auto px-6 pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="seal text-[9px] tracking-[0.3em] mb-5 inline-block">美学 · 道</span>

          <h1 className="text-5xl md:text-6xl font-light text-[var(--ink)] tracking-[0.08em] mb-3 mt-2"
              style={{ fontFamily: "'Noto Serif SC', serif" }}>
            美之道
          </h1>
          <p className="font-sans-zen text-[11px] tracking-[0.35em] text-[var(--ink-mute)] mb-5">
            The Aesthetic Way · 十大原则
          </p>

          <div className="brush-divider w-20 mb-6" />

          <p className="text-sm md:text-base text-[var(--ink-soft)] italic max-w-3xl leading-relaxed"
             style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
            Ten principles — from welcoming a guest at the garden gate to the echo that lingers long after they have gone. Each one a different light falling on the same quiet truth.
          </p>
        </motion.div>
      </header>

      {/* Principles grid */}
      <section className="max-w-[900px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: 'var(--paper-deep)' }}>
          {principles.map((p, i) => (
            <PrincipleCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </section>

      {/* Closing philosophical note */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[900px] mx-auto px-6 pt-20 pb-8"
      >
        <div className="flex justify-end">
          <div style={{
            borderRight: '2px solid var(--tea)',
            paddingRight: '24px',
            maxWidth: '560px',
            textAlign: 'right',
          }}>
            <p className="text-sm text-[var(--ink-soft)] leading-loose mb-3">
              这十个原则，以款待开篇，以余韵作结——从客人踏入庭院的第一步，到离去后那份久久未散的温度。余白、借景、粋、室礼、物哀、侘寂、幽玄、余情，是旅途中的每一处风景。它们并非孤立的法则，而是同一种生活哲学的不同面向。
            </p>
            <p className="text-xs text-[var(--ink-mute)] italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem' }}>
              Ten principles — from the first step on the garden path to the echo that remains long after the gate closes. Each one a different light falling on the same quiet truth.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="mt-16 px-4 text-center">
        <div className="brush-divider max-w-xs mx-auto mb-5" />
        <p className="text-[11px] tracking-[0.35em] text-[var(--ink-mute)]">
          — 見えないものを見る — ❋ — 四季の美学 —
        </p>
      </footer>
    </main>
  )
}

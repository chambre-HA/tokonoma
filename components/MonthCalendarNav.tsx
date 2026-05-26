'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MONTH_LABELS, MONTH_POETIC, type MonthIndex } from '@/types'

interface Props {
  year: number
  selectedMonth: MonthIndex
  onSelectMonth: (month: MonthIndex) => void
  onYearChange?: (year: number) => void
  activeMonths?: Set<MonthIndex>
}

const MONTHS: MonthIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const VISIBLE_SIDE = 2

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

// ─── Chinese label / plaque shape ────────────────────────────────────────────
//
// Design space: 72 × 128.  Two outward-convex bumps (top + bottom), straight sides.
//
// Outer shape
//   • Corners at y = 20 (top) and y = 108 (bottom); corner radius = 10 px.
//   • Straight sides: x = 2 and x = 70, from y = 30 to y = 98.
//   • Top bump:    from (22,20) → control (36, 2) → (50,20)
//                 midpoint at y = ¼·20 + ½·2 + ¼·20 = 11  →  9 px proud of corner.
//   • Bottom bump: from (50,108) → control (36,126) → (22,108)
//                 midpoint at y = 117  →  9 px proud of corner.
//
// Inner frame
//   • Corners at y = 25 / y = 103; corner radius = 7 px.
//   • Top bump:    control y = 9  → midpoint y = 17  (8 px proud).
//   • Bottom bump: control y = 119 → midpoint y = 111 (8 px proud).
//   • Gap between outer and inner bump peaks ≈ 4.9 px — visible double-border line.
//
const OUTER = [
  'M 12 20',
  'L 22 20 Q 36 11,  50 20',         // ▲ top bump — gentler (≈4 px proud)
  'L 60 20 A 10 10 0 0 1 70 30',     // top-right corner
  'L 70 98  A 10 10 0 0 1 60 108',   // bottom-right corner
  'L 50 108 Q 36 117, 22 108',        // ▼ bottom bump — gentler (≈4 px proud)
  'L 12 108 A 10 10 0 0 1 2  98',    // bottom-left corner
  'L 2  30  A 10 10 0 0 1 12 20',    // top-left corner
  'Z',
].join(' ')

const INNER = [
  'M 15 25',
  'L 24 25 Q 36 17,  48 25',          // ▲ inner top bump — gentler (≈4 px proud)
  'L 57 25 A  7  7 0 0 1 64 32',     // inner top-right corner
  'L 64 96  A  7  7 0 0 1 57 103',   // inner bottom-right corner
  'L 48 103 Q 36 111, 24 103',        // ▼ inner bottom bump — gentler (≈4 px proud)
  'L 15 103 A  7  7 0 0 1  8 96',    // inner bottom-left corner
  'L  8 32  A  7  7 0 0 1 15 25',    // inner top-left corner
  'Z',
].join(' ')

function TileFrame({ isActive, isEmpty }: { isActive: boolean; isEmpty: boolean }) {
  const fillColor   = isActive ? 'var(--ink)' : 'var(--paper)'
  const outerStroke = isActive ? 'rgba(29,42,38,0.88)'
                                : isEmpty ? 'rgba(29,42,38,0.09)' : 'rgba(29,42,38,0.22)'
  const outerW      = isActive ? 1.5 : 1
  // Inner frame is always gold — prominent on active, whisper-soft on inactive
  const innerStroke = isActive ? 'rgba(184,153,104,0.65)'
                                : isEmpty ? 'rgba(184,153,104,0.10)' : 'rgba(184,153,104,0.28)'

  return (
    <svg
      viewBox="0 0 72 128"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Body fill */}
      <path d={OUTER} fill={fillColor} />
      {/* Outer border */}
      <path d={OUTER} stroke={outerStroke} strokeWidth={outerW} />
      {/* Inner frame — gold double-border */}
      <path d={INNER} stroke={innerStroke} strokeWidth="0.75" />

    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export function MonthCalendarNav({
  year, selectedMonth, onSelectMonth, onYearChange, activeMonths,
}: Props) {
  const idx = selectedMonth - 1

  function go(delta: number) {
    const next = (mod(idx + delta, 12) + 1) as MonthIndex
    onSelectMonth(next)
  }

  const slots = Array.from({ length: VISIBLE_SIDE * 2 + 1 }, (_, i) => i - VISIBLE_SIDE)

  return (
    <div className="w-full select-none">

      {/* Year row */}
      <div className="flex justify-center items-center gap-6 mb-8">
        {onYearChange && (
          <button
            onClick={() => onYearChange(year - 1)}
            className="p-1.5 text-[var(--ink-mute)] hover:text-[var(--tea-deep)] transition-colors"
            aria-label="Previous year"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        <span className="font-sans-zen text-2xl md:text-3xl tracking-[0.15em] text-[var(--ink)] font-light">
          {year}
        </span>
        {onYearChange && (
          <button
            onClick={() => onYearChange(year + 1)}
            className="p-1.5 text-[var(--ink-mute)] hover:text-[var(--tea-deep)] transition-colors"
            aria-label="Next year"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center gap-0">

        <button
          onClick={() => go(-1)}
          className="absolute left-0 z-10 p-2 text-[var(--ink-mute)] hover:text-[var(--tea-deep)] transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 md:gap-3 overflow-hidden px-10">
          <AnimatePresence mode="popLayout" initial={false}>
            {slots.map((offset) => {
              const mIdx     = mod(idx + offset, 12)
              const m        = (mIdx + 1) as MonthIndex
              const isActive = offset === 0
              const dist     = Math.abs(offset)
              const isEmpty  = activeMonths && activeMonths.size > 0 && !activeMonths.has(m)

              const scale       = isActive ? 1 : dist === 1 ? 0.82 : 0.65
              const baseOpacity = isActive ? 1 : dist === 1 ? 0.55 : 0.28
              const opacity     = isEmpty ? baseOpacity * 0.45 : baseOpacity

              return (
                <motion.button
                  key={`${m}-${offset}`}
                  layout
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity, scale, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
                  onClick={() => onSelectMonth(m)}
                  whileTap={{ scale: scale * 0.95 }}
                  className={`month-tile shrink-0 flex flex-col items-center justify-center gap-1 cursor-pointer
                    ${isActive
                      ? 'active w-[72px] h-[200px] md:w-[80px] md:h-[220px]'
                      : dist === 1
                        ? 'w-[58px] h-[160px] md:w-[64px] md:h-[176px]'
                        : 'w-[46px] h-[126px] md:w-[52px] md:h-[140px]'
                    }`}
                  aria-label={`${MONTH_LABELS[m]} ${year}${isEmpty ? ' (empty)' : ''}`}
                  aria-pressed={isActive}
                  style={{ zIndex: isActive ? 2 : 1 }}
                >
                  <TileFrame isActive={isActive} isEmpty={!!isEmpty} />

                  <span className={`relative z-10 vertical-zh font-medium leading-tight
                    ${isActive
                      ? 'text-2xl md:text-3xl'
                      : dist === 1 ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}
                    ${isEmpty && !isActive ? 'text-[var(--ink-mute)]' : ''}`}
                  >
                    {MONTH_LABELS[m]}
                  </span>

                  {dist < 2 && (
                    <span
                      className={`relative z-10 text-[9px] tracking-[0.06em] ${
                        isActive ? 'opacity-55' : 'text-[var(--ink-mute)]'
                      }`}
                      style={{ fontFamily: "'Noto Serif SC', serif" }}
                    >
                      {MONTH_POETIC[m]}
                    </span>
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>

        <button
          onClick={() => go(1)}
          className="absolute right-0 z-10 p-2 text-[var(--ink-mute)] hover:text-[var(--tea-deep)] transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot indicator */}
      <div className="flex justify-center gap-1.5 mt-5">
        {MONTHS.map((m) => {
          const isEmpty = activeMonths && activeMonths.size > 0 && !activeMonths.has(m)
          return (
            <button
              key={m}
              onClick={() => onSelectMonth(m)}
              aria-label={MONTH_LABELS[m]}
              className={`rounded-full transition-all duration-300 ${
                m === selectedMonth
                  ? 'w-4 h-1.5 bg-[var(--ink)]'
                  : isEmpty
                    ? 'w-1.5 h-1.5 bg-[var(--ink-mute)] opacity-20 hover:opacity-40'
                    : 'w-1.5 h-1.5 bg-[var(--ink-mute)] opacity-40 hover:opacity-70'
              }`}
            />
          )
        })}
      </div>

    </div>
  )
}

'use client'

import { useRef } from 'react'
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

// How many neighbours to show on each side
const VISIBLE_SIDE = 2

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

export function MonthCalendarNav({ year, selectedMonth, onSelectMonth, onYearChange, activeMonths }: Props) {
  const idx = selectedMonth - 1 // 0-based

  function go(delta: number) {
    const next = (mod(idx + delta, 12) + 1) as MonthIndex
    onSelectMonth(next)
  }

  // Build the visible slot list: [-2, -1, 0, +1, +2] relative to current
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
        {/* Prev arrow */}
        <button
          onClick={() => go(-1)}
          className="absolute left-0 z-10 p-2 text-[var(--ink-mute)] hover:text-[var(--tea-deep)] transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slots */}
        <div className="flex items-center justify-center gap-2 md:gap-3 overflow-hidden px-10">
          <AnimatePresence mode="popLayout" initial={false}>
            {slots.map((offset) => {
              const mIdx = mod(idx + offset, 12)
              const m = (mIdx + 1) as MonthIndex
              const isActive = offset === 0
              const dist = Math.abs(offset)
              // If activeMonths is provided and non-empty, grey out months with no photos
              const isEmpty = activeMonths && activeMonths.size > 0 && !activeMonths.has(m)

              // Scale + opacity by distance from center; empty months get an extra dimming
              const scale = isActive ? 1 : dist === 1 ? 0.82 : 0.65
              const baseOpacity = isActive ? 1 : dist === 1 ? 0.55 : 0.28
              const opacity = isEmpty ? baseOpacity * 0.45 : baseOpacity

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
                    transition-shadow
                    ${isActive
                      ? 'active w-[72px] h-[128px] md:w-[80px] md:h-[140px]'
                      : dist === 1
                        ? 'w-[58px] h-[104px] md:w-[64px] md:h-[116px]'
                        : 'w-[46px] h-[84px] md:w-[52px] md:h-[96px]'
                    }`}
                  aria-label={`${MONTH_LABELS[m]} ${year}${isEmpty ? ' (empty)' : ''}`}
                  aria-pressed={isActive}
                  style={{ zIndex: isActive ? 2 : 1 }}
                >
                  <span className={`vertical-zh font-medium leading-tight
                    ${isActive ? 'text-2xl md:text-3xl' : dist === 1 ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}
                    ${isEmpty && !isActive ? 'text-[var(--ink-mute)]' : ''}`}
                  >
                    {MONTH_LABELS[m]}
                  </span>
                  {dist < 2 && (
                    <span className={`font-sans-zen text-[9px] tracking-[0.15em] ${
                      isActive ? 'text-[var(--tea-light)]' : 'text-[var(--ink-mute)]'
                    }`}>
                      {MONTH_POETIC[m]}
                    </span>
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Next arrow */}
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

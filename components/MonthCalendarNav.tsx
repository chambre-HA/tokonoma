'use client'

import { motion } from 'framer-motion'
import { MONTH_LABELS, MONTH_POETIC, type MonthIndex } from '@/types'

interface Props {
  year: number
  selectedMonth: MonthIndex
  onSelectMonth: (month: MonthIndex) => void
  onYearChange?: (year: number) => void
}

const MONTHS: MonthIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export function MonthCalendarNav({ year, selectedMonth, onSelectMonth, onYearChange }: Props) {
  return (
    <div className="w-full">
      {/* Year — top right, like in the sketch */}
      <div className="flex justify-end items-baseline gap-3 px-1 mb-3">
        {onYearChange && (
          <button
            onClick={() => onYearChange(year - 1)}
            className="font-sans-zen text-sm text-[var(--ink-mute)] hover:text-[var(--tea-deep)] transition-colors"
            aria-label="Previous year"
          >
            ←
          </button>
        )}
        <span className="font-sans-zen text-2xl md:text-3xl tracking-[0.15em] text-[var(--ink)] font-light">
          {year}
        </span>
        {onYearChange && (
          <button
            onClick={() => onYearChange(year + 1)}
            className="font-sans-zen text-sm text-[var(--ink-mute)] hover:text-[var(--tea-deep)] transition-colors"
            aria-label="Next year"
          >
            →
          </button>
        )}
      </div>

      {/* Tile row — horizontally scrollable on mobile */}
      <div className="overflow-x-auto pb-3 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-2 md:gap-3 min-w-max md:min-w-0 md:justify-center">
          {MONTHS.map((m, idx) => {
            const isActive = m === selectedMonth
            return (
              <motion.button
                key={m}
                onClick={() => onSelectMonth(m)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.025, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.96 }}
                className={`month-tile shrink-0 flex flex-col items-center justify-center
                            w-[58px] h-[110px] md:w-[64px] md:h-[120px]
                            cursor-pointer select-none ${isActive ? 'active' : ''}`}
                aria-label={`${MONTH_LABELS[m]} ${year}`}
                aria-pressed={isActive}
              >
                <span className="vertical-zh text-xl md:text-2xl font-medium leading-tight">
                  {MONTH_LABELS[m]}
                </span>
                <span
                  className={`mt-1 font-sans-zen text-[10px] tracking-[0.2em] ${
                    isActive ? 'text-[var(--tea-light)]' : 'text-[var(--ink-mute)]'
                  }`}
                >
                  {MONTH_POETIC[m]}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

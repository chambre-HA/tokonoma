'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { VibeUncleHeader } from '@/components/VibeUncleHeader'
import { MonthCalendarNav } from '@/components/MonthCalendarNav'
import { PhotoGallery } from '@/components/PhotoGallery'
import type { MonthIndex } from '@/types'

export default function Home() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState<MonthIndex>(((now.getMonth() + 1) as MonthIndex))
  const [activeMonths, setActiveMonths] = useState<Set<MonthIndex>>(new Set())

  useEffect(() => {
    fetch(`/api/photos?year=${year}`)
      .then(r => r.json())
      .then(data => {
        const months = new Set<MonthIndex>((data.photos || []).map((p: { month: MonthIndex }) => p.month))
        setActiveMonths(months)
      })
      .catch(() => {})
  }, [year])

  return (
    <main className="min-h-screen pb-24">
      <VibeUncleHeader />

      {/* Brand mark */}
      <header className="pt-16 md:pt-24 pb-8 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-sans-zen text-[10px] tracking-[0.5em] text-[var(--ink-mute)] uppercase mb-3">
            tokonoma · 床之间
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-[var(--ink)] tracking-[0.1em]">
            花<span className="text-[var(--tea-deep)]">间</span>静<span className="text-[var(--tea-deep)]">茶</span>
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="brush-divider w-16" />
            <span className="seal text-[10px] font-medium">珍 惜 此 刻</span>
            <span className="brush-divider w-16" />
          </div>
          <p className="mt-5 text-sm md:text-base text-[var(--ink-soft)] italic max-w-md mx-auto leading-relaxed">
            一期一会 — each season, each moment, gathered quietly in the alcove.
          </p>
        </motion.div>
      </header>

      {/* Calendar */}
      <section className="max-w-6xl mx-auto px-6 mt-10">
        <MonthCalendarNav
          year={year}
          selectedMonth={month}
          onSelectMonth={setMonth}
          onYearChange={setYear}
          activeMonths={activeMonths}
        />
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <PhotoGallery year={year} month={month} />
      </section>

      {/* Footer */}
      <footer className="mt-32 px-4 text-center">
        <div className="brush-divider max-w-xs mx-auto mb-6" />
        <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase mb-2">
          一期一会 · ichigo ichie
        </p>
        <Link
          href="/admin"
          className="inline-block text-xs text-[var(--ink-mute)] hover:text-[var(--tea-deep)] transition-colors tracking-wider"
        >
          ⌁ caretaker ⌁
        </Link>
      </footer>
    </main>
  )
}

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
          <h1
            className="text-5xl md:text-7xl font-light text-[var(--ink)] tracking-[0.1em] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => (window as unknown as { toggleVibeUncleBar?: () => void }).toggleVibeUncleBar?.()}
            title="Click for more info"
          >
            花<span className="text-[var(--tea-deep)]">间</span>静<span className="text-[var(--tea-deep)]">茶</span>
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="brush-divider w-16" />
            <span className="seal text-[10px] font-medium">珍 惜 此 刻</span>
            <span className="brush-divider w-16" />
          </div>
          <p className="mt-5 text-sm md:text-base text-[var(--ink-soft)] italic max-w-md mx-auto leading-relaxed">
            一期一会 — each season, each moment, gathered in quiet contemplation.
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

      {/* Principle teaser */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mt-32 px-6 text-center"
      >
        <div className="brush-divider max-w-[120px] mx-auto mb-10" />
        <p className="text-xl md:text-2xl font-light text-[var(--ink-soft)] tracking-[0.1em] mb-4 leading-[1.8]"
           style={{ fontFamily: "'Noto Serif SC', serif" }}>
          款待·余白·借景·粋·室礼<br/>
          物哀·侘寂·幽玄·余情·余韵
        </p>
        <p className="text-[10px] text-[var(--ink-mute)] tracking-[0.25em] uppercase leading-loose mb-8">
          omotenashi · yohaku · shakkei · iki · shitsurai<br/>
          mono no aware · wabi-sabi · yūgen · yojō · yoin
        </p>
        <Link
          href="/principle"
          className="inline-flex items-center gap-2 text-sm tracking-[0.12em] transition-all duration-300"
          style={{
            fontFamily: "'Noto Serif SC', serif",
            background: 'var(--paper-deep)',
            color: 'var(--tea-deep)',
            border: '1px solid var(--tea-light)',
            borderRadius: '3px',
            padding: '10px 22px',
            boxShadow: '2px 2px 0 var(--paper-deep), inset 0 1px 0 rgba(255,255,255,0.4)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--tea)'
            ;(e.currentTarget as HTMLElement).style.color = 'var(--paper)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--tea)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--paper-deep)'
            ;(e.currentTarget as HTMLElement).style.color = 'var(--tea-deep)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--tea-light)'
          }}
        >
          走近这十种禅意美学
          <span style={{ fontFamily: 'Inter, sans-serif', opacity: 0.7 }}>→</span>
        </Link>
        <div className="brush-divider max-w-[120px] mx-auto mt-10" />
      </motion.section>

      {/* Footer */}
      <footer className="mt-10 px-4 text-center pb-10">
        <p className="font-sans-zen text-[11px] tracking-[0.25em] text-[var(--ink-mute)] mb-2">
          <a href="https://greatpath-greatbusiness.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            大 道 大 商 - 新 加 坡 ｜ 悠 然 学 堂 - 中 观 学 堂
          </a>
        </p>
        <div className="flex items-center justify-center gap-6 mt-1">
          <Link
            href="/admin"
            className="inline-block text-xs text-[var(--ink-mute)] hover:text-[var(--tea-deep)] transition-colors tracking-wider"
          >
            ⌁ caretaker ⌁
          </Link>
        </div>
      </footer>
    </main>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getPrincipleNav } from '@/lib/principles'

interface Props {
  slug: string
}

/** Top bar: back link + position indicator */
export function PrincipleTopNav({ slug }: Props) {
  const { index, total } = getPrincipleNav(slug)
  return (
    <div className="max-w-[900px] mx-auto px-6 pt-10 flex items-center justify-between">
      <Link
        href="/principle"
        className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-mute)] hover:text-[var(--ink-soft)] transition-colors tracking-wider"
      >
        <ChevronLeft size={13} />
        美学原则
      </Link>
      <span className="font-sans-zen text-[10px] tracking-[0.3em] text-[var(--ink-mute)] opacity-60">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  )
}

/** Bottom prev / next navigation */
export function PrincipleBottomNav({ slug }: Props) {
  const { prev, next } = getPrincipleNav(slug)

  return (
    <motion.nav
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-[900px] mx-auto px-6 pt-10 pb-10"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Previous */}
        <div>
          {prev ? (
            <Link href={`/principle/${prev.slug}`}
              className="group flex flex-col gap-1 text-left hover:opacity-80 transition-opacity">
              <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.3em] text-[var(--ink-mute)] uppercase font-sans-zen">
                <ChevronLeft size={10} />
                previous
              </span>
              <span className="text-xl font-light text-[var(--ink)] tracking-wide group-hover:text-[var(--ink-soft)] transition-colors"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}>
                {prev.kanji}
              </span>
              <span className="text-[10px] text-[var(--ink-mute)] italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {prev.romaji}
              </span>
            </Link>
          ) : (
            <Link href="/principle"
              className="group flex flex-col gap-1 text-left hover:opacity-80 transition-opacity">
              <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.3em] text-[var(--ink-mute)] uppercase font-sans-zen">
                <ChevronLeft size={10} />
                index
              </span>
              <span className="text-sm text-[var(--ink-mute)]">美学原则</span>
            </Link>
          )}
        </div>

        {/* Next */}
        <div className="flex justify-end">
          {next ? (
            <Link href={`/principle/${next.slug}`}
              className="group flex flex-col gap-1 text-right hover:opacity-80 transition-opacity">
              <span className="inline-flex items-center justify-end gap-1 text-[10px] tracking-[0.3em] text-[var(--ink-mute)] uppercase font-sans-zen">
                next
                <ChevronRight size={10} />
              </span>
              <span className="text-xl font-light text-[var(--ink)] tracking-wide group-hover:text-[var(--ink-soft)] transition-colors"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}>
                {next.kanji}
              </span>
              <span className="text-[10px] text-[var(--ink-mute)] italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {next.romaji}
              </span>
            </Link>
          ) : (
            <Link href="/principle"
              className="group flex flex-col gap-1 text-right hover:opacity-80 transition-opacity">
              <span className="inline-flex items-center justify-end gap-1 text-[10px] tracking-[0.3em] text-[var(--ink-mute)] uppercase font-sans-zen">
                index
                <ChevronRight size={10} />
              </span>
              <span className="text-sm text-[var(--ink-mute)]">美学原则</span>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  )
}

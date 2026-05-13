'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Photo, MonthIndex } from '@/types'

interface Props {
  year: number
  month: MonthIndex
}

export function PhotoGallery({ year, month }: Props) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    Promise.all([
      fetch(`/api/photos?year=${year}&month=${month}`).then(r => r.json()),
      fetch(`/api/photos/order?year=${year}&month=${month}`).then(r => r.json()),
    ]).then(([photosData, orderData]) => {
      if (cancelled) return
      const raw: Photo[] = photosData.photos || []
      const order: string[] = orderData.order || []
      if (order.length > 0) {
        const map = new Map(raw.map((p: Photo) => [p.key, p]))
        const ordered = order.filter(k => map.has(k)).map(k => map.get(k)!)
        const rest = raw.filter((p: Photo) => !order.includes(p.key))
        setPhotos([...ordered, ...rest])
      } else {
        setPhotos(raw)
      }
      setLoading(false)
    }).catch(() => {
      if (!cancelled) setLoading(false)
    })
    return () => { cancelled = true }
  }, [year, month])

  const lightbox = lightboxIdx !== null ? photos[lightboxIdx] : null

  function prev() { setLightboxIdx(i => (i !== null ? (i - 1 + photos.length) % photos.length : null)) }
  function next() { setLightboxIdx(i => (i !== null ? (i + 1) % photos.length : null)) }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightboxIdx === null) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') setLightboxIdx(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <section className="w-full">
      {/* Gallery */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[320px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
            className="w-8 h-8 rounded-full border-2 border-[var(--ink-mute)] border-t-transparent"
          />
        </div>
      ) : photos.length === 0 ? (
        <EmptyAlcove />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {photos.map((photo, idx) => (
            <motion.figure
              key={photo.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.05, 0.5), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="neumorph p-3 cursor-zoom-in group"
              onClick={() => setLightboxIdx(idx)}
            >
              <div className="overflow-hidden rounded-lg bg-[var(--paper-deep)] aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.caption || ''}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:brightness-105"
                />
              </div>
              {photo.caption && (
                <figcaption className="mt-3 px-1 text-sm text-[var(--ink-soft)] tracking-wide leading-snug">
                  {photo.caption}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIdx(null)}
            className="fixed inset-0 z-50 bg-[rgba(20,28,25,0.93)] backdrop-blur-md flex items-center justify-center p-6"
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-[var(--paper)] hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 md:left-8 p-3 rounded-full text-[var(--paper)] hover:bg-white/10 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
            )}

            {/* Next */}
            {photos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 md:right-8 p-3 rounded-full text-[var(--paper)] hover:bg-white/10 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            )}

            <motion.figure
              key={lightbox.key}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center max-w-[88vw] max-h-[88vh]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.url}
                alt={lightbox.caption || ''}
                className="max-h-[78vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
              {lightbox.caption && (
                <figcaption className="mt-5 text-[var(--paper)] text-sm tracking-widest text-center max-w-prose opacity-80">
                  {lightbox.caption}
                </figcaption>
              )}
              {photos.length > 1 && (
                <p className="mt-3 font-sans-zen text-[10px] tracking-[0.3em] text-[var(--paper)] opacity-40 uppercase">
                  {(lightboxIdx ?? 0) + 1} / {photos.length}
                </p>
              )}
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function EmptyAlcove() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-32 text-center"
    >
      <div className="neumorph-inset w-32 h-32 rounded-full flex items-center justify-center mb-8">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-[var(--ink-mute)]">
          <circle cx="24" cy="24" r="18" strokeDasharray="3 4" />
          <path d="M16 30 Q24 18 32 30" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-lg text-[var(--ink-soft)] mb-3">床之间空寂</p>
      <p className="font-sans-zen text-xs tracking-[0.3em] text-[var(--ink-mute)] uppercase">
        the alcove waits
      </p>
    </motion.div>
  )
}

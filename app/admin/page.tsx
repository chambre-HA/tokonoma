'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Upload, Trash2, ChevronLeft, Check, AlertCircle, GripVertical, Save } from 'lucide-react'
import { MonthCalendarNav } from '@/components/MonthCalendarNav'
import { MONTH_LABELS, type MonthIndex, type Photo } from '@/types'

const STORAGE_KEY = 'tokonoma_admin_pw'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) {
      verify(saved).then(ok => {
        if (ok) { setPassword(saved); setAuthed(true) }
        else sessionStorage.removeItem(STORAGE_KEY)
      })
    }
  }, [])

  async function verify(pw: string): Promise<boolean> {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      return res.ok
    } catch { return false }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthError('')
    const ok = await verify(password)
    if (ok) { sessionStorage.setItem(STORAGE_KEY, password); setAuthed(true) }
    else setAuthError('Incorrect password')
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleLogin}
          className="neumorph p-12 max-w-sm w-full"
        >
          <p className="font-sans-zen text-[10px] tracking-[0.5em] text-[var(--ink-mute)] uppercase mb-2 text-center">
            caretaker · 守
          </p>
          <h1 className="text-2xl font-light text-center mb-10 text-[var(--ink)]">入静室</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="passphrase"
            className="w-full neumorph-inset px-5 py-3.5 text-[var(--ink)] placeholder:text-[var(--ink-mute)] outline-none font-sans-zen tracking-wider"
            autoFocus
          />
          {authError && (
            <p className="mt-4 text-xs text-[var(--plum)] flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> {authError}
            </p>
          )}
          <button
            type="submit"
            className="mt-8 w-full neumorph py-3.5 text-[var(--ink)] tracking-[0.3em] text-sm font-sans-zen uppercase hover:text-[var(--tea-deep)] transition-colors active:shadow-inner"
          >
            enter
          </button>
          <Link
            href="/"
            className="mt-8 block text-center text-xs text-[var(--ink-mute)] hover:text-[var(--tea-deep)] transition-colors"
          >
            ← back to alcove
          </Link>
        </motion.form>
      </main>
    )
  }

  return <AdminPanel password={password} />
}

// ─── Sortable photo card ────────────────────────────────────────────────────

function SortablePhoto({
  photo,
  onDelete,
}: {
  photo: Photo
  onDelete: (key: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: photo.key })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1,
    zIndex: isDragging ? 50 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative neumorph p-2.5 group touch-none select-none"
    >
      {/* drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-4 left-4 z-10 p-1 rounded text-[var(--ink-mute)] opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.url}
        alt={photo.caption || ''}
        className="w-full aspect-square object-cover rounded-lg"
        loading="lazy"
        draggable={false}
      />

      {photo.caption && (
        <p className="mt-2.5 px-1 text-[11px] text-[var(--ink-soft)] truncate" title={photo.caption}>
          {photo.caption}
        </p>
      )}

      {/* delete */}
      <button
        onClick={() => onDelete(photo.key)}
        className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-[var(--paper)] text-[var(--plum)] shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--plum)] hover:text-[var(--paper)]"
        aria-label="Delete"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

// ─── Main admin panel ───────────────────────────────────────────────────────

function AdminPanel({ password }: { password: string }) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState<MonthIndex>((now.getMonth() + 1) as MonthIndex)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const [flash, setFlash] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const [orderDirty, setOrderDirty] = useState(false)
  const [savingOrder, setSavingOrder] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  )

  // Load photos + their saved order
  const refresh = useCallback(async () => {
    setLoading(true)
    setOrderDirty(false)
    const [photosRes, orderRes] = await Promise.all([
      fetch(`/api/photos?year=${year}&month=${month}`).then(r => r.json()),
      fetch(`/api/photos/order?year=${year}&month=${month}`).then(r => r.json()),
    ])
    const raw: Photo[] = photosRes.photos || []
    const order: string[] = orderRes.order || []
    // Sort by saved order, append any new photos at the end
    if (order.length > 0) {
      const map = new Map(raw.map(p => [p.key, p]))
      const ordered = order.filter(k => map.has(k)).map(k => map.get(k)!)
      const rest = raw.filter(p => !order.includes(p.key))
      setPhotos([...ordered, ...rest])
    } else {
      setPhotos(raw)
    }
    setLoading(false)
  }, [year, month])

  useEffect(() => { refresh() }, [refresh])

  function showFlash(type: 'ok' | 'err', msg: string) {
    setFlash({ type, msg })
    setTimeout(() => setFlash(null), 3500)
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (files.length === 0) return
    setUploading(true)
    setProgress({ done: 0, total: files.length })
    let okCount = 0
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fd = new FormData()
      fd.append('file', file)
      fd.append('month', month.toString())
      fd.append('year', year.toString())
      if (caption.trim() && files.length === 1) fd.append('caption', caption.trim())
      try {
        const res = await fetch('/api/photos', {
          method: 'POST',
          headers: { 'x-admin-password': password },
          body: fd,
        })
        if (res.ok) okCount++
      } catch { /* ignore individual failure */ }
      setProgress({ done: i + 1, total: files.length })
    }
    setUploading(false)
    setFiles([])
    setCaption('')
    showFlash('ok', `Placed ${okCount} of ${files.length}`)
    await refresh()
  }

  async function handleDelete(key: string) {
    if (!confirm('Remove this image from the alcove?')) return
    const res = await fetch('/api/photos/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ key }),
    })
    if (res.ok) {
      setPhotos(prev => prev.filter(p => p.key !== key))
      showFlash('ok', 'Removed')
    } else {
      showFlash('err', 'Failed to remove')
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setPhotos(prev => {
      const oldIdx = prev.findIndex(p => p.key === active.id)
      const newIdx = prev.findIndex(p => p.key === over.id)
      return arrayMove(prev, oldIdx, newIdx)
    })
    setOrderDirty(true)
  }

  async function saveOrder() {
    setSavingOrder(true)
    const res = await fetch('/api/photos/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ year, month, keys: photos.map(p => p.key) }),
    })
    setSavingOrder(false)
    if (res.ok) { setOrderDirty(false); showFlash('ok', 'Order saved') }
    else showFlash('err', 'Failed to save order')
  }

  return (
    <main className="min-h-screen pb-32">
      {/* Header */}
      <header className="px-6 pt-12 pb-8 max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-mute)] hover:text-[var(--tea-deep)] transition-colors tracking-wider"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> back to alcove
        </Link>
        <div className="mt-8 flex items-baseline justify-between flex-wrap gap-3">
          <h1 className="text-3xl md:text-4xl font-light text-[var(--ink)] tracking-wide">
            守 · caretaker
          </h1>
          <p className="font-sans-zen text-[10px] tracking-[0.4em] text-[var(--ink-mute)] uppercase">
            place flowers in the alcove
          </p>
        </div>
        <div className="brush-divider mt-6" />
      </header>

      {/* Calendar nav */}
      <section className="max-w-5xl mx-auto px-6">
        <MonthCalendarNav
          year={year}
          selectedMonth={month}
          onSelectMonth={setMonth}
          onYearChange={setYear}
        />
      </section>

      {/* Upload form */}
      <section className="max-w-5xl mx-auto px-6 mt-14">
        <form onSubmit={handleUpload} className="neumorph p-8 md:p-10">
          <div className="flex items-center gap-3 mb-7">
            <Upload className="w-5 h-5 text-[var(--tea-deep)]" />
            <h2 className="text-lg font-medium text-[var(--ink)]">
              添 入 {MONTH_LABELS[month]} {year}
            </h2>
          </div>

          <label className="block neumorph-inset px-6 py-16 text-center cursor-pointer hover:bg-[var(--paper-soft)] transition-colors rounded-xl">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
            <div className="flex flex-col items-center gap-3">
              <Upload className="w-9 h-9 text-[var(--ink-mute)]" />
              {files.length === 0 ? (
                <>
                  <p className="text-[var(--ink-soft)]">Drop or choose images</p>
                  <p className="font-sans-zen text-[10px] tracking-[0.3em] text-[var(--ink-mute)] uppercase">
                    jpg · png · webp
                  </p>
                </>
              ) : (
                <p className="text-[var(--ink)] font-medium">
                  {files.length} {files.length === 1 ? 'image' : 'images'} selected
                </p>
              )}
            </div>
          </label>

          {files.length === 1 && (
            <div className="mt-7">
              <label className="block text-xs font-sans-zen tracking-[0.3em] text-[var(--ink-mute)] uppercase mb-3">
                caption (optional)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="a quiet observation…"
                className="w-full neumorph-inset px-5 py-3.5 text-[var(--ink)] placeholder:text-[var(--ink-mute)] outline-none"
                maxLength={120}
              />
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-4">
            {uploading ? (
              <p className="text-xs text-[var(--ink-mute)]">
                Uploading {progress.done} / {progress.total}…
              </p>
            ) : (
              <span />
            )}
            <button
              type="submit"
              disabled={files.length === 0 || uploading}
              className="neumorph px-8 py-3.5 text-[var(--ink)] tracking-[0.3em] text-sm font-sans-zen uppercase
                         disabled:opacity-40 disabled:cursor-not-allowed
                         hover:text-[var(--tea-deep)] transition-colors active:shadow-inner"
            >
              {uploading ? '…' : 'place'}
            </button>
          </div>
        </form>
      </section>

      {/* Photo grid */}
      <section className="max-w-5xl mx-auto px-6 mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-base font-medium text-[var(--ink)]">
              {MONTH_LABELS[month]} {year}
            </h3>
            <p className="font-sans-zen text-[10px] tracking-[0.3em] text-[var(--ink-mute)] uppercase mt-1">
              {photos.length} {photos.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>
          <AnimatePresence>
            {orderDirty && (
              <motion.button
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                onClick={saveOrder}
                disabled={savingOrder}
                className="neumorph flex items-center gap-2 px-5 py-2.5 text-xs font-sans-zen tracking-[0.2em] uppercase text-[var(--tea-deep)] hover:text-[var(--tea)] transition-colors disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                {savingOrder ? 'saving…' : 'save order'}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
              className="w-7 h-7 rounded-full border-2 border-[var(--ink-mute)] border-t-transparent"
            />
          </div>
        ) : photos.length === 0 ? (
          <p className="text-center text-[var(--ink-mute)] py-20 italic">empty alcove</p>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={photos.map(p => p.key)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {photos.map((p, idx) => (
                  <motion.div
                    key={p.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.4 }}
                  >
                    <SortablePhoto photo={p} onDelete={handleDelete} />
                  </motion.div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </section>

      {/* Flash toast */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 neumorph px-6 py-3.5 flex items-center gap-2.5 z-50 ${
              flash.type === 'ok' ? 'text-[var(--tea-deep)]' : 'text-[var(--plum)]'
            }`}
          >
            {flash.type === 'ok' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="text-sm tracking-wide">{flash.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

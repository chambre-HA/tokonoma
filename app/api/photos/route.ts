import { NextRequest, NextResponse } from 'next/server'
import { listPhotos, uploadPhoto, getMeta, R2_PUBLIC_URL } from '@/lib/r2'
import type { MonthIndex, Photo } from '@/types'

export const runtime = 'nodejs'

function parseKey(key: string): { year: number; month: MonthIndex; caption?: string } | null {
  // photos/{year}/{month}/{timestamp}-{caption-slug}.{ext}
  const match = key.match(/^photos\/(\d{4})\/(\d{1,2})\/(.+)$/)
  if (!match) return null
  const year = parseInt(match[1])
  const month = parseInt(match[2]) as MonthIndex
  const filename = match[3]
  // only extract caption when filename is {timestamp}-{slug}.{ext}
  const captionMatch = filename.match(/^\d+-(.+)\.[a-z]+$/i)
  const raw = captionMatch ? decodeURIComponent(captionMatch[1]).replace(/-/g, ' ') : ''
  const caption = raw && raw !== 'untitled' ? raw : undefined
  return { year, month, caption }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const year = searchParams.get('year') || new Date().getFullYear().toString()
  const month = searchParams.get('month')

  const prefix = month ? `photos/${year}/${month}/` : `photos/${year}/`

  try {
    const yearNum = parseInt(year)
    const monthNum = month ? parseInt(month) : null

    const [objects, meta] = await Promise.all([
      listPhotos(prefix).then(o => o.filter(x => !x.key.endsWith('order.json') && !x.key.endsWith('meta.json'))),
      monthNum ? getMeta(yearNum, monthNum) : Promise.resolve({} as Record<string, { caption: string }>),
    ])

    const photos: Photo[] = objects
      .map(o => {
        const parsed = parseKey(o.key)
        if (!parsed) return null
        // meta.json caption takes priority over filename caption
        const metaCaption = meta[o.key]?.caption
        return {
          key: o.key,
          url: o.url,
          year: parsed.year,
          month: parsed.month,
          caption: metaCaption ?? parsed.caption,
          uploadedAt: o.uploadedAt,
          size: o.size,
        } as Photo
      })
      .filter((p): p is Photo => p !== null)
      .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))

    return NextResponse.json({ photos, publicUrl: R2_PUBLIC_URL })
  } catch (err) {
    console.error('List photos error:', err)
    return NextResponse.json({ error: 'Failed to list photos' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD
  const authHeader = req.headers.get('x-admin-password')
  if (!adminPassword || authHeader !== adminPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const month = formData.get('month') as string | null
    const year = formData.get('year') as string | null
    const caption = (formData.get('caption') as string | null) || ''

    if (!file || !month || !year) {
      return NextResponse.json({ error: 'Missing file, month, or year' }, { status: 400 })
    }

    const monthNum = parseInt(month)
    if (monthNum < 1 || monthNum > 12) {
      return NextResponse.json({ error: 'Invalid month' }, { status: 400 })
    }

    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
    const slug = caption
      ? `-${encodeURIComponent(caption.toLowerCase().trim().replace(/\s+/g, '-').slice(0, 60))}`
      : ''
    const key = `photos/${year}/${monthNum}/${Date.now()}${slug}.${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await uploadPhoto(key, buffer, file.type || 'image/jpeg')

    return NextResponse.json({ key, url, success: true })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

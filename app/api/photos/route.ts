import { NextRequest, NextResponse } from 'next/server'
import { listPhotos, uploadPhoto, R2_PUBLIC_URL } from '@/lib/r2'
import type { MonthIndex, Photo } from '@/types'

export const runtime = 'nodejs'

function parseKey(key: string): { year: number; month: MonthIndex; caption?: string } | null {
  // photos/{year}/{month}/{timestamp}-{caption-slug}.{ext}
  const match = key.match(/^photos\/(\d{4})\/(\d{1,2})\/(.+)$/)
  if (!match) return null
  const year = parseInt(match[1])
  const month = parseInt(match[2]) as MonthIndex
  const filename = match[3]
  // strip timestamp prefix and extension; blank slug means no caption
  const captionPart = filename.replace(/^\d+-/, '').replace(/\.[a-z]+$/i, '')
  const decoded = captionPart ? decodeURIComponent(captionPart).replace(/-/g, ' ') : ''
  const caption = decoded && decoded !== 'untitled' ? decoded : undefined
  return { year, month, caption }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const year = searchParams.get('year') || new Date().getFullYear().toString()
  const month = searchParams.get('month')

  const prefix = month ? `photos/${year}/${month}/` : `photos/${year}/`

  try {
    const objects = (await listPhotos(prefix)).filter(o => !o.key.endsWith('order.json'))
    const photos: Photo[] = objects
      .map(o => {
        const parsed = parseKey(o.key)
        if (!parsed) return null
        return {
          key: o.key,
          url: o.url,
          year: parsed.year,
          month: parsed.month,
          caption: parsed.caption,
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

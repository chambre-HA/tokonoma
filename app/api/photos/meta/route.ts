import { NextRequest, NextResponse } from 'next/server'
import { getMeta, saveMeta } from '@/lib/r2'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
  const month = parseInt(searchParams.get('month') || '1')
  try {
    const meta = await getMeta(year, month)
    return NextResponse.json({ meta })
  } catch {
    return NextResponse.json({ meta: {} })
  }
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD
  const authHeader = req.headers.get('x-admin-password')
  if (!adminPassword || authHeader !== adminPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { year, month, key, caption } = await req.json()
    if (!year || !month || !key) {
      return NextResponse.json({ error: 'Missing year, month, or key' }, { status: 400 })
    }
    const meta = await getMeta(year, month)
    if (caption && caption.trim()) {
      meta[key] = { caption: caption.trim() }
    } else {
      delete meta[key] // empty caption = revert to filename caption
    }
    await saveMeta(year, month, meta)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save caption' }, { status: 500 })
  }
}

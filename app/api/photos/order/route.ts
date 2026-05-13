import { NextRequest, NextResponse } from 'next/server'
import { getOrder, saveOrder } from '@/lib/r2'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
  const month = parseInt(searchParams.get('month') || '1')
  try {
    const order = await getOrder(year, month)
    return NextResponse.json({ order })
  } catch {
    return NextResponse.json({ order: [] })
  }
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD
  const authHeader = req.headers.get('x-admin-password')
  if (!adminPassword || authHeader !== adminPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { year, month, keys } = await req.json()
    if (!year || !month || !Array.isArray(keys)) {
      return NextResponse.json({ error: 'Missing year, month, or keys' }, { status: 400 })
    }
    await saveOrder(year, month, keys)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 })
  }
}

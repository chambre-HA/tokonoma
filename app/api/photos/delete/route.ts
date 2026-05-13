import { NextRequest, NextResponse } from 'next/server'
import { deletePhoto } from '@/lib/r2'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD
  const authHeader = req.headers.get('x-admin-password')
  if (!adminPassword || authHeader !== adminPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { key } = await req.json()
    if (!key || typeof key !== 'string') {
      return NextResponse.json({ error: 'Missing key' }, { status: 400 })
    }
    await deletePhoto(key)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Delete error:', err)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}

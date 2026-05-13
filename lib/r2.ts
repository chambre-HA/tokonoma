import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'

const accountId = process.env.R2_ACCOUNT_ID
const accessKeyId = process.env.R2_ACCESS_KEY_ID
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY

export const R2_BUCKET = process.env.R2_BUCKET_NAME || 'tokonoma'
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || ''

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId || '',
    secretAccessKey: secretAccessKey || '',
  },
})

export async function uploadPhoto(key: string, body: Buffer | Uint8Array, contentType: string) {
  await r2.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  }))
  return `${R2_PUBLIC_URL}/${key}`
}

export async function listPhotos(prefix: string) {
  const res = await r2.send(new ListObjectsV2Command({
    Bucket: R2_BUCKET,
    Prefix: prefix,
    MaxKeys: 1000,
  }))
  return (res.Contents || []).map(obj => ({
    key: obj.Key!,
    url: `${R2_PUBLIC_URL}/${obj.Key}`,
    size: obj.Size || 0,
    uploadedAt: obj.LastModified?.toISOString() || '',
  }))
}

export async function deletePhoto(key: string) {
  await r2.send(new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: key }))
}

// Caption metadata — stored as photos/{year}/{month}/meta.json
// Shape: { [key: string]: { caption: string } }
export function metaKey(year: number, month: number) {
  return `photos/${year}/${month}/meta.json`
}

export async function getMeta(year: number, month: number): Promise<Record<string, { caption: string }>> {
  try {
    const res = await r2.send(new GetObjectCommand({ Bucket: R2_BUCKET, Key: metaKey(year, month) }))
    const text = await (res.Body as import('@smithy/types').SdkStreamMixin).transformToString()
    return JSON.parse(text)
  } catch {
    return {}
  }
}

export async function saveMeta(year: number, month: number, meta: Record<string, { caption: string }>) {
  await r2.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: metaKey(year, month),
    Body: JSON.stringify(meta),
    ContentType: 'application/json',
    CacheControl: 'no-cache',
  }))
}

// Order manifest — stored as photos/{year}/{month}/order.json
export function orderKey(year: number, month: number) {
  return `photos/${year}/${month}/order.json`
}

export async function getOrder(year: number, month: number): Promise<string[]> {
  try {
    const res = await r2.send(new GetObjectCommand({ Bucket: R2_BUCKET, Key: orderKey(year, month) }))
    const text = await (res.Body as import('@smithy/types').SdkStreamMixin).transformToString()
    return JSON.parse(text)
  } catch {
    return [] // no order file yet
  }
}

export async function saveOrder(year: number, month: number, keys: string[]) {
  await r2.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: orderKey(year, month),
    Body: JSON.stringify(keys),
    ContentType: 'application/json',
    CacheControl: 'no-cache',
  }))
}

export async function getPhotoBuffer(key: string) {
  const res = await r2.send(new GetObjectCommand({ Bucket: R2_BUCKET, Key: key }))
  const bytes = await (res.Body as import('@smithy/types').SdkStreamMixin).transformToByteArray()
  return Buffer.from(bytes)
}

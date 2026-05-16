export interface Principle {
  slug: string
  kanji: string
  romaji: string
  reading: string
  seal: string          // text shown in the seal tag on the hero
  number: string        // 一 二 三…
}

export const PRINCIPLES: Principle[] = [
  { slug: 'omotenashi',    kanji: '款待', romaji: 'Omotenashi',     reading: 'おもてなし',    seal: 'おもてなし · 礼',  number: '一' },
  { slug: 'yohaku',        kanji: '余白', romaji: 'Yohaku no Bi',   reading: 'よはくのび',    seal: 'よはくのび · 禅',  number: '二' },
  { slug: 'jiejing',       kanji: '借景', romaji: 'Shakkei',        reading: 'しゃっけい',    seal: 'しゃっけい · 借',  number: '三' },
  { slug: 'iki',           kanji: '粋',   romaji: 'Iki',            reading: 'いき',          seal: 'いき · 粋',        number: '四' },
  { slug: 'shitsurai',     kanji: '室礼', romaji: 'Shitsurai',      reading: 'しつらい',      seal: 'しつらい · 礼',    number: '五' },
  { slug: 'mono-no-aware', kanji: '物哀', romaji: 'Mono no Aware',  reading: 'もののあわれ',  seal: 'もののあわれ · 哀', number: '六' },
  { slug: 'wabi-sabi',     kanji: '侘寂', romaji: 'Wabi-Sabi',      reading: 'わびさび',      seal: 'わびさび · 寂',    number: '七' },
  { slug: 'yugen',         kanji: '幽玄', romaji: 'Yūgen',          reading: 'ゆうげん',      seal: 'ゆうげん · 玄',    number: '八' },
  { slug: 'yojo',          kanji: '余情', romaji: 'Yojō',           reading: 'よじょう',      seal: 'よじょう · 情',    number: '九' },
  { slug: 'yoin',          kanji: '余韵', romaji: 'Yoin',           reading: 'よいん',        seal: 'よいん · 韵',      number: '十' },
]

export function getPrincipleNav(slug: string) {
  const idx = PRINCIPLES.findIndex(p => p.slug === slug)
  return {
    current: PRINCIPLES[idx],
    prev: idx > 0 ? PRINCIPLES[idx - 1] : null,
    next: idx < PRINCIPLES.length - 1 ? PRINCIPLES[idx + 1] : null,
    index: idx,
    total: PRINCIPLES.length,
  }
}

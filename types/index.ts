export type MonthIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface Photo {
  key: string
  url: string
  month: MonthIndex
  year: number
  caption?: string
  uploadedAt: string
  size: number
}

export const MONTH_LABELS: Record<MonthIndex, string> = {
  1: '一月',
  2: '二月',
  3: '三月',
  4: '四月',
  5: '五月',
  6: '六月',
  7: '七月',
  8: '八月',
  9: '九月',
  10: '十月',
  11: '十一月',
  12: '十二月',
}

export const MONTH_POETIC: Record<MonthIndex, string> = {
  1: '初春',
  2: '梅月',
  3: '桃月',
  4: '槐月',
  5: '榴月',
  6: '荷月',
  7: '巧月',
  8: '桂月',
  9: '菊月',
  10: '阳月',
  11: '葭月',
  12: '腊月',
}

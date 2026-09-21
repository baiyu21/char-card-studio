/** #rrggbb → "r, g, b" */
export function hexToRgbChannels(hex: string): string {
  const raw = hex.replace('#', '').trim()
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw
  const n = Number.parseInt(full, 16)
  if (!Number.isFinite(n) || full.length !== 6) return '94, 231, 255'
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `${r}, ${g}, ${b}`
}

export function slugifyFilename(nameEn: string, nameZh: string): string {
  const en = nameEn
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  if (en) return en
  return nameZh.trim() || 'character'
}

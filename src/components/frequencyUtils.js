export const missingLabel = 'Missing'

export function getFields(dataset, rows) {
  return dataset?.fields?.length ? dataset.fields : Object.keys(rows[0] || {})
}

export function categoricalFields(dataset, rows) {
  const fields = getFields(dataset, rows)
  return fields.filter(field => {
    const present = rows.map(r => r[field]).filter(v => v !== '' && v != null)
    const unique = new Set(present.map(String)).size
    const numeric = present.length > 0 && present.every(v => !Number.isNaN(Number(v)))
    return !numeric || unique <= Math.min(20, Math.max(8, Math.ceil(rows.length * .35)))
  })
}

export function frequencyFor(rows, field) {
  if (!field) return []
  const counts = new Map()
  rows.forEach(row => {
    const raw = row[field]
    const value = raw === '' || raw == null ? missingLabel : String(raw)
    counts.set(value, (counts.get(value) || 0) + 1)
  })
  const total = rows.length
  const validTotal = rows.filter(row => row[field] !== '' && row[field] != null).length
  let cumulative = 0
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([response, frequency]) => {
      const missing = response === missingLabel
      const percent = total ? frequency / total * 100 : 0
      const validPercent = missing || !validTotal ? null : frequency / validTotal * 100
      if (!missing) cumulative += validPercent
      return { response, frequency, percent, validPercent, cumulative: missing ? null : cumulative }
    })
}

export function findDemographicFields(fields) {
  const find = words => fields.find(f => words.some(w => f.toLowerCase().includes(w)))
  const preferred = [
    find(['gender', 'sex']),
    find(['satisfaction', 'satisfied']),
    find(['employment', 'occupation', 'work_status']),
  ].filter(Boolean)
  return [...new Set([...preferred, ...fields])].slice(0, 3)
}

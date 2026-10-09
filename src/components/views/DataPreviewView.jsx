import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Card, EmptyData, ViewHeader } from './ViewShared'

export function DataPreviewView({ dataset, rows, onNavigate }) {
  const [query, setQuery] = useState('')
  const fields = dataset?.fields || Object.keys(rows[0] || {})
  const filtered = useMemo(() => rows.filter(row => Object.values(row).some(v => String(v).toLowerCase().includes(query.toLowerCase()))), [rows, query])
  if (!dataset) return <><ViewHeader title="Data Preview" description="Inspect your raw survey records before analysis."/><EmptyData onNavigate={onNavigate}/></>
  return <><ViewHeader title="Data Preview" description={`${rows.length} rows · ${fields.length} columns`} dataset={dataset}/>
    <Card className="!p-0 overflow-hidden"><div className="flex items-center justify-between border-b border-line p-4"><h2 className="text-sm font-bold">Raw data</h2><label className="flex items-center gap-2 rounded-lg border border-line px-3 py-2"><Search size={15} className="text-muted"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search rows" className="w-32 border-0 bg-transparent text-xs outline-none sm:w-48"/></label></div>
      <div className="max-h-[620px] overflow-auto"><table className="w-full min-w-max border-collapse text-xs"><thead className="sticky top-0 z-10 bg-slate-50"><tr><th className="border-b border-r border-line px-3 py-3 text-left text-slate-500">#</th>{fields.map(f => <th key={f} className="border-b border-r border-line px-4 py-3 text-left font-semibold last:border-r-0">{f}</th>)}</tr></thead><tbody>{filtered.map((row,i) => <tr key={i} className="hover:bg-blue-50/40"><td className="border-b border-r border-line px-3 py-3 text-slate-400">{i+1}</td>{fields.map(f => <td key={f} className="max-w-64 truncate border-b border-r border-line px-4 py-3 last:border-r-0">{row[f] || <span className="text-slate-300">—</span>}</td>)}</tr>)}</tbody></table></div>
      <div className="border-t border-line px-4 py-3 text-[11px] text-muted">Showing {filtered.length} of {rows.length} responses</div>
    </Card></>
}

import { useMemo, useState } from 'react'
import { Card, EmptyData, ViewHeader } from './ViewShared'

export function CrossTabsView({ dataset, rows, onNavigate }) {
  const fields = dataset?.fields || []
  const [rowVar, setRowVar] = useState('')
  const [colVar, setColVar] = useState('')
  const rVar = rowVar || fields[0]
  const cVar = colVar || fields[1] || fields[0]
  const matrix = useMemo(() => {
    if (!rVar || !cVar) return { rs:[], cs:[], counts:{} }
    const rs=[...new Set(rows.map(r=>String(r[rVar] === '' || r[rVar] == null ? 'Missing' : r[rVar])))], cs=[...new Set(rows.map(r=>String(r[cVar] === '' || r[cVar] == null ? 'Missing' : r[cVar])))]
    const counts={}; rows.forEach(r=>{ const a=String(r[rVar] === '' || r[rVar] == null ? 'Missing' : r[rVar]), b=String(r[cVar] === '' || r[cVar] == null ? 'Missing' : r[cVar]); counts[`${a}|||${b}`]=(counts[`${a}|||${b}`]||0)+1 })
    return {rs,cs,counts}
  }, [rows,rVar,cVar])
  if (!dataset) return <><ViewHeader title="Cross Tabs" description="Explore relationships between two survey variables."/><EmptyData onNavigate={onNavigate}/></>
  return <><ViewHeader title="Cross Tabs" description="Build a two-variable frequency matrix." dataset={dataset}/><Card><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold">Rows<select value={rVar} onChange={e=>setRowVar(e.target.value)} className="mt-2 w-full rounded-lg border border-line bg-white p-3 font-normal">{fields.map(f=><option key={f}>{f}</option>)}</select></label><label className="text-xs font-semibold">Columns<select value={cVar} onChange={e=>setColVar(e.target.value)} className="mt-2 w-full rounded-lg border border-line bg-white p-3 font-normal">{fields.map(f=><option key={f}>{f}</option>)}</select></label></div></Card>
    <Card className="mt-4 overflow-x-auto"><h2 className="mb-4 text-sm font-bold">{rVar} × {cVar}</h2><table className="w-full min-w-[520px] border-collapse text-xs"><thead><tr><th className="border border-line bg-slate-50 p-3 text-left">{rVar}</th>{matrix.cs.map(c=><th key={c} className="border border-line bg-slate-50 p-3">{c}</th>)}<th className="border border-line bg-blue-50 p-3">Total</th></tr></thead><tbody>{matrix.rs.map(r=><tr key={r}><th className="border border-line p-3 text-left">{r}</th>{matrix.cs.map(c=><td key={c} className="border border-line p-3 text-center">{matrix.counts[`${r}|||${c}`]||0}</td>)}<td className="border border-line bg-blue-50/50 p-3 text-center font-bold">{matrix.cs.reduce((n,c)=>n+(matrix.counts[`${r}|||${c}`]||0),0)}</td></tr>)}</tbody></table></Card></>
}

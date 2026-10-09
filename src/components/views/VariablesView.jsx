import { Hash, SlidersHorizontal, Type } from 'lucide-react'
import { Card, EmptyData, ViewHeader } from './ViewShared'

function inferType(values) {
  const present = values.filter(v => v !== '' && v != null)
  return present.length && present.every(v => !Number.isNaN(Number(v))) ? 'Numeric' : 'Text'
}

export function VariablesView({ dataset, rows, onNavigate }) {
  if (!dataset) return <><ViewHeader title="Variables" description="Review column types, labels, and missing values."/><EmptyData onNavigate={onNavigate}/></>
  const fields = dataset.fields || Object.keys(rows[0] || {})
  return <><ViewHeader title="Variables" description={`${fields.length} variables detected in your dataset.`} dataset={dataset}/><Card className="!p-0 overflow-x-auto">
    <div className="grid min-w-[480px] grid-cols-[1fr_110px_100px_60px] border-b border-line bg-slate-50 px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:grid-cols-[1fr_150px_140px_80px]"><span>Variable</span><span>Type</span><span>Missing</span><span></span></div>
    {fields.map(field => { const values=rows.map(r=>r[field]); const type=inferType(values); const missing=values.filter(v=>v===''||v==null).length; return <div key={field} className="grid min-w-[480px] min-h-14 grid-cols-[1fr_110px_100px_60px] items-center border-b border-line px-4 text-xs last:border-0 sm:grid-cols-[1fr_150px_140px_80px]"><div className="font-semibold">{field}<p className="mt-1 hidden text-[10px] font-normal text-muted sm:block">{values.find(Boolean) || 'No sample value'}</p></div><span className="flex items-center gap-1.5 text-slate-600">{type === 'Numeric' ? <Hash size={14}/> : <Type size={14}/>} {type}</span><span>{missing} <span className="text-muted">({rows.length ? ((missing/rows.length)*100).toFixed(1) : 0}%)</span></span><button disabled title="Variable editing is not available in this demo" aria-label={`Settings for ${field}`} className="grid h-8 w-8 place-items-center rounded-md border border-line hover:bg-slate-50"><SlidersHorizontal size={14}/></button></div> })}
  </Card></>
}

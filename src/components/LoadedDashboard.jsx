import { CalendarDays, CheckCircle2, FileText, Hash, Info, Type, Users } from 'lucide-react'
import { DynamicAnalysis } from './DynamicAnalysis'
import { UploadZone } from './UploadZone'
import { getFields } from './frequencyUtils'

function Metric({ icon: Icon, label, value, sub, color }) {
  return <article className="flex min-h-[108px] items-center gap-4 rounded-lg border border-slate-200 bg-white p-6 text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,.03)]"><div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${color}`}><Icon size={23}/></div><div><p className="text-[11px] font-semibold text-[#334155]">{label}</p><strong className="mt-1 block text-lg text-[#0f172a]">{value}</strong><p className="mt-1 text-[10px] text-[#64748b]">{sub}</p></div></article>
}

function Variables({ dataset, rows }) {
  const fields = getFields(dataset, rows)
  return <section className="rounded-lg border border-slate-200 bg-white p-6 text-[#0f172a]"><div className="mb-3 flex justify-between"><h2 className="text-sm font-bold">Variables (Columns)</h2><span className="text-[11px] font-semibold text-brand">{fields.length} total</span></div><div className="overflow-hidden rounded-lg border border-[#e2e8f0]">{fields.slice(0,6).map(name=>{ const values=rows.map(r=>r[name]).filter(v=>v!==''&&v!=null); const numeric=values.length&&values.every(v=>!Number.isNaN(Number(v))); return <div key={name} className="flex h-9 items-center gap-3 border-b border-[#e2e8f0] px-3 text-[11px] last:border-0"><span className="text-[#64748b]">{numeric?<Hash size={13}/>:<Type size={13}/>}</span><span className="truncate font-medium">{name}</span><span className="ml-auto rounded bg-blue-50 px-2 py-1 text-[9px] text-blue-700">{numeric?'Numeric':'Text'}</span></div>})}</div>{fields.length>6&&<p className="mt-3 text-[10px] text-[#64748b]">+ {fields.length-6} more variables</p>}</section>
}

export function LoadedDashboard({ dataset, rows = [], onUpload }) {
  const fields = getFields(dataset, rows)
  const missing = rows.reduce((sum,row)=>sum+fields.filter(f=>row[f]===''||row[f]==null).length,0)
  const cells = rows.length * fields.length
  return <>
    <section className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-[22px] font-bold tracking-tight text-[#0f172a] md:text-[24px]">Welcome back, Peter 👋</h1><p className="mt-1 text-sm text-[#64748b]">Here's a live summary of your dataset.</p></div><span className="inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-[11px] font-semibold text-[#334155]"><CheckCircle2 size={16} className="text-emerald-600"/>Dataset: {dataset.name}</span></section>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Metric icon={FileText} label="Total Responses" value={rows.length} sub="Records in dataset" color="bg-blue-50 text-blue-600"/><Metric icon={Users} label="Variables (Columns)" value={fields.length} sub="In your dataset" color="bg-blue-50 text-blue-600"/><Metric icon={CheckCircle2} label="Missing Values" value={`${missing} (${cells ? (missing/cells*100).toFixed(1) : 0}%)`} sub="Across all variables" color="bg-emerald-50 text-emerald-600"/><Metric icon={CalendarDays} label="Date Uploaded" value={new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})} sub={new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})} color="bg-violet-50 text-violet-600"/></div>
    <div className="mt-5 grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]"><div className="space-y-4"><section className="rounded-lg border border-slate-200 bg-white p-6"><h2 className="mb-3 text-sm font-bold text-[#0f172a]">Upload Data</h2><UploadZone onUpload={onUpload} compact/></section><Variables dataset={dataset} rows={rows}/></div><div className="min-w-0"><DynamicAnalysis dataset={dataset} rows={rows}/></div></div>
    <div className="mt-6 flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/70 px-3 py-3 text-[11px] text-[#334155]"><Info size={15} className="text-blue-600"/>Tip: Select any categorical variable to recalculate charts and frequency statistics instantly.</div>
  </>
}

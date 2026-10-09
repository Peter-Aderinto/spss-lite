import { useMemo, useState } from 'react'
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'
import { Clipboard, Download } from 'lucide-react'
import { categoricalFields, findDemographicFields, frequencyFor } from './frequencyUtils'

const colors = ['#2563eb', '#22a66f', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#64748b']
const fmt = value => value == null ? '—' : `${value.toFixed(1)}%`

function Surface({ children, className = '' }) {
  return <section className={`rounded-lg border border-slate-200 bg-white p-6 text-[#0f172a] shadow-[0_1px_2px_rgba(15,23,42,.03)] ${className}`}>{children}</section>
}

function OverviewCard({ field, rows, mode }) {
  const data = useMemo(() => frequencyFor(rows, field), [rows, field])
  return <Surface><div className="mb-3"><h3 className="text-sm font-bold text-[#0f172a]">{field.replaceAll('_', ' ')}</h3><p className="mt-1 text-[10px] text-[#64748b]">{rows.length} responses</p></div><div className="h-[180px]">
    <ResponsiveContainer width="100%" height="100%">
      {mode === 'pie' ? <PieChart><Pie data={data} dataKey="frequency" nameKey="response" cx="50%" cy="48%" outerRadius={65} stroke="#fff" strokeWidth={2}>{data.map((d,i)=><Cell key={d.response} fill={colors[i%colors.length]}/>)}</Pie><Tooltip formatter={(v,n,p)=>[`${v} (${p.payload.percent.toFixed(1)}%)`,n]} contentStyle={{background:'#fff',border:'1px solid #e2e8f0',color:'#0f172a'}}/></PieChart>
        : <BarChart data={data} margin={{top:8,right:4,left:-24,bottom:20}}><CartesianGrid vertical={false} stroke="#e2e8f0"/><XAxis dataKey="response" tick={{fontSize:9,fill:'#334155'}} angle={-18} textAnchor="end" interval={0}/><YAxis tick={{fontSize:9,fill:'#334155'}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{background:'#fff',border:'1px solid #e2e8f0',color:'#0f172a'}}/><Bar dataKey="frequency" fill="#2563eb" radius={[3,3,0,0]}/></BarChart>}
    </ResponsiveContainer>
  </div></Surface>
}

export function DemographicOverview({ dataset, rows }) {
  const fields = categoricalFields(dataset, rows)
  const overview = findDemographicFields(fields)
  if (!overview.length) return null
  return <section className="mb-5"><div className="mb-3"><h2 className="text-base font-bold text-[#0f172a]">Demographic overview</h2><p className="mt-1 text-xs text-[#64748b]">Automatically detected categorical indicators</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{overview.map((field,i)=><OverviewCard key={field} field={field} rows={rows} mode={i===0?'pie':'bar'}/>)}</div></section>
}

export function DynamicAnalysis({ dataset, rows, showOverview = true }) {
  const fields = useMemo(() => categoricalFields(dataset, rows), [dataset, rows])
  const [requested, setRequested] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const selected = fields.includes(requested) ? requested : fields[0]
  const data = useMemo(() => frequencyFor(rows, selected), [rows, selected])
  const download = () => {
    const header='Response,Frequency,Percent,Valid Percent,Cumulative Percent'
    const csv=[header,...data.map(d=>`"${d.response.replaceAll('"','""')}",${d.frequency},${d.percent.toFixed(1)},${d.validPercent?.toFixed(1)??''},${d.cumulative?.toFixed(1)??''}`)].join('\n')
    const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download=`${selected}-frequencies.csv`; a.click(); URL.revokeObjectURL(a.href)
  }
  const copy = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(data.map(d=>[d.response,d.frequency,fmt(d.percent),fmt(d.validPercent),fmt(d.cumulative)].join('\t')).join('\n'))
      setCopyStatus('Table copied.')
    } catch { setCopyStatus('Could not copy. Download CSV instead.') }
  }
  if (!fields.length) return <Surface><p className="text-sm text-[#475569]">No categorical variables were detected in this dataset.</p></Surface>
  return <div>
    {showOverview && <DemographicOverview dataset={dataset} rows={rows}/>}
    <Surface className="mb-4"><label className="block text-xs font-bold text-[#334155]">Analyze variable<select value={selected} onChange={e=>setRequested(e.target.value)} className="mt-2 block w-full rounded-lg border border-[#cbd5e1] bg-white px-3 py-3 text-sm font-semibold text-[#0f172a] outline-none focus:border-blue-500 sm:max-w-md">{fields.map(f=><option key={f} value={f}>{f.replaceAll('_',' ')}</option>)}</select></label></Surface>
    <div className="grid gap-4 lg:grid-cols-2">
      <Surface><h2 className="text-sm font-bold text-[#0f172a]">{selected.replaceAll('_',' ')} distribution</h2><p className="mt-1 text-[10px] text-[#64748b]">Percent of all responses</p><div className="mt-3 h-[290px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{top:20,right:10,left:-12,bottom:34}}><CartesianGrid vertical={false} stroke="#e2e8f0"/><XAxis dataKey="response" tick={{fontSize:10,fill:'#334155'}} angle={-20} textAnchor="end" interval={0}/><YAxis domain={[0,100]} tickFormatter={v=>`${v}%`} tick={{fontSize:10,fill:'#334155'}} axisLine={false} tickLine={false}/><Tooltip formatter={v=>`${Number(v).toFixed(1)}%`} contentStyle={{background:'#fff',border:'1px solid #e2e8f0',color:'#0f172a'}}/><Bar dataKey="percent" radius={[3,3,0,0]}>{data.map((d,i)=><Cell key={d.response} fill={colors[i%colors.length]}/>)}</Bar></BarChart></ResponsiveContainer></div></Surface>
      <Surface><h2 className="text-sm font-bold text-[#0f172a]">{selected.replaceAll('_',' ')} share</h2><p className="mt-1 text-[10px] text-[#64748b]">Frequency and percentage</p><div className="mt-3 h-[290px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data} dataKey="frequency" nameKey="response" outerRadius={95} stroke="#fff" strokeWidth={2}>{data.map((d,i)=><Cell key={d.response} fill={colors[i%colors.length]}/>)}</Pie><Legend wrapperStyle={{fontSize:11,color:'#334155'}}/><Tooltip formatter={(v,n,p)=>[`${v} (${p.payload.percent.toFixed(1)}%)`,n]} contentStyle={{background:'#fff',border:'1px solid #e2e8f0',color:'#0f172a'}}/></PieChart></ResponsiveContainer></div></Surface>
    </div>
    <p role="status" className="mt-3 text-xs text-slate-600">{copyStatus}</p>
    <Surface className="mt-4 !p-0 overflow-hidden"><div className="flex flex-col gap-3 border-b border-[#e2e8f0] p-4 sm:flex-row sm:items-center sm:justify-between"><h2 className="text-sm font-bold text-[#0f172a]">{selected.replaceAll('_',' ')} — Frequency Table</h2><div className="flex gap-2"><button onClick={copy} className="flex items-center gap-1.5 rounded-md border border-[#cbd5e1] px-3 py-2 text-[10px] font-semibold text-[#334155] hover:bg-slate-50"><Clipboard size={13}/>Copy Table</button><button onClick={download} className="flex items-center gap-1.5 rounded-md border border-[#cbd5e1] px-3 py-2 text-[10px] font-semibold text-[#334155] hover:bg-slate-50"><Download size={13}/>Download CSV</button></div></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] border-collapse text-left text-[11px] text-[#334155]"><thead className="bg-[#f8fafc] text-[#0f172a]"><tr>{['Response','Frequency','Percent','Valid Percent','Cumulative Percent'].map(h=><th key={h} className="border-b border-r border-[#e2e8f0] px-4 py-3 font-bold last:border-r-0">{h}</th>)}</tr></thead><tbody>{data.map(d=><tr key={d.response} className={d.response==='Missing'?'bg-amber-50/70':''}><td className="border-b border-r border-[#e2e8f0] px-4 py-3 font-medium">{d.response}</td><td className="border-b border-r border-[#e2e8f0] px-4 py-3">{d.frequency}</td><td className="border-b border-r border-[#e2e8f0] px-4 py-3">{fmt(d.percent)}</td><td className="border-b border-r border-[#e2e8f0] px-4 py-3">{fmt(d.validPercent)}</td><td className="border-b border-[#e2e8f0] px-4 py-3">{fmt(d.cumulative)}</td></tr>)}</tbody></table></div></Surface>
  </div>
}

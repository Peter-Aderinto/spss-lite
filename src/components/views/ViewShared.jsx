import { Database, Upload } from 'lucide-react'

export function ViewHeader({ title, description, dataset }) {
  return <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div><h1 className="text-[24px] font-bold tracking-tight">{title}</h1><p className="mt-1 text-sm text-muted">{description}</p></div>
    {dataset && <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-200 px-3 py-2 text-[11px] font-semibold text-emerald-700"><Database size={15}/>{dataset.name}</span>}
  </div>
}

export function EmptyData({ onNavigate }) {
  return <div className="grid min-h-[360px] place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center">
    <div><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-brand"><Upload/></div><h2 className="mt-4 font-bold">No dataset loaded</h2><p className="mt-2 text-sm text-muted">Upload a CSV file to use this workspace.</p><button onClick={() => onNavigate('upload')} className="mt-5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white">Upload data</button></div>
  </div>
}

export function Card({ children, className = '' }) {
  return <section className={`card-shadow rounded-lg border border-slate-200 bg-white p-6 text-slate-800 ${className}`}>{children}</section>
}

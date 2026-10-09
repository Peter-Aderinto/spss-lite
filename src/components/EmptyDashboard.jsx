import { Info, Sparkles } from 'lucide-react'
import { UploadZone } from './UploadZone'

const features = [
  ['1', 'Automated Frequencies & Percentages', 'We instantly calculate the frequency and percentage for each response in your survey.', '📊', 'bg-emerald-50 text-emerald-600'],
  ['2', 'Cross-Tabulations & Distributions', 'Explore relationships between variables with automated cross-tabs and distributions.', '▦', 'bg-blue-50 text-blue-600'],
  ['3', 'Visual Charts & CSV Tables', 'Explore charts and download dataset or frequency tables as CSV.', '◕', 'bg-violet-50 text-violet-600'],
]

export function EmptyDashboard({ onUpload, onSample }) {
  return (
    <>
      <section className="mb-6">
        <h1 className="text-[22px] font-bold tracking-tight md:text-[24px]">Welcome to SPSS Lite 👋</h1>
        <p className="mt-1 text-sm text-slate-600">Upload your research data to get instant survey insights.</p>
      </section>
      <UploadZone onUpload={onUpload}/>
      <div className="my-5 flex items-center justify-center gap-4">
        <span className="h-px w-24 bg-slate-200"/><span className="text-xs text-slate-600">or</span><span className="h-px w-24 bg-slate-200"/>
      </div>
      <div className="text-center">
        <button onClick={onSample} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Sparkles size={17} className="text-blue-600"/>Don't have a file? Try with Sample Survey Data</button>
      </div>
      <section className="mt-9">
        <h2 className="mb-4 text-base font-bold">What happens after you upload?</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(([n,title,text,visual,color]) => <article key={n} className="card-shadow relative flex min-h-[180px] items-center gap-4 rounded-lg border border-slate-200 bg-white p-6 text-slate-800">
            <span className="absolute left-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">{n}</span>
            <div className={`grid h-20 w-20 shrink-0 place-items-center rounded-xl text-4xl ${color}`}>{visual}</div>
            <div><h3 className="text-sm font-bold leading-snug text-slate-800">{title}</h3><p className="mt-3 text-xs leading-relaxed text-slate-600">{text}</p></div>
          </article>)}
        </div>
      </section>
      <div className="mt-6 flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/70 px-3 py-3 text-[11px] text-slate-600"><Info size={15} className="shrink-0 text-blue-600"/>Tip: Upload a CSV file to get started. Your data is processed locally in your browser and is not stored on our servers.</div>
    </>
  )
}

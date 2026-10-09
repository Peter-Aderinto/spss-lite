import { BarChart3 } from 'lucide-react'

export function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <BarChart3 className="h-8 w-8 text-brand" strokeWidth={2.2} />
      <div>
        <div className="text-[17px] font-bold leading-tight text-[#075fcb]">SPSS Lite</div>
        {!compact && <div className="mt-0.5 text-[10px] font-medium text-slate-700">Research Survey Analyzer</div>}
      </div>
    </div>
  )
}

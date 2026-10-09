import { useRef, useState } from 'react'
import { FolderOpen, UploadCloud } from 'lucide-react'

export function UploadZone({ onUpload, compact = false }) {
  const input = useRef(null)
  const [dragging, setDragging] = useState(false)
  const accept = (files) => {
    const file = files?.[0]
    if (file && (file.name.toLowerCase().endsWith('.csv') || file.type === 'text/csv')) onUpload(file)
  }
  return (
    <div onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); accept(e.dataTransfer.files) }}
      className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed text-center text-slate-800 transition ${dragging ? 'border-brand bg-blue-50' : 'border-[#66aaf4] bg-white'} ${compact ? 'min-h-[220px] p-6' : 'min-h-[290px] p-6 md:min-h-[330px]'}`}>
      <UploadCloud className={`text-brand ${compact ? 'h-11 w-11' : 'h-14 w-14'}`} strokeWidth={1.8}/>
      <h2 className={`mt-4 font-semibold ${compact ? 'text-sm' : 'text-base md:text-lg'}`}>{compact ? 'Drag & drop your CSV file here' : 'Upload your research data to get instant survey insights.'}</h2>
      {!compact && <p className="mt-2 text-sm text-slate-600">Drag & drop your CSV file here</p>}
      <span className="my-3 text-xs text-muted">or</span>
      <input ref={input} type="file" accept=".csv,text/csv" className="hidden" onChange={e => accept(e.target.files)}/>
      <button onClick={() => input.current?.click()} className="flex items-center gap-2 rounded-md bg-brand px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"><FolderOpen size={18}/>Browse Files</button>
      <p className="mt-4 text-xs text-slate-600">Supports CSV files up to 10MB</p>
    </div>
  )
}

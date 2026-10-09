import { Sparkles } from 'lucide-react'
import { UploadZone } from '../UploadZone'
import { ViewHeader } from './ViewShared'

export function UploadView({ dataset, onUpload, onSample }) {
  return <><ViewHeader title="Upload Data" description="Import a CSV survey file to begin your analysis." dataset={dataset}/><UploadZone onUpload={onUpload}/><div className="mt-5 text-center"><button onClick={onSample} className="inline-flex items-center gap-2 rounded-lg border border-brand px-5 py-3 text-sm font-semibold text-brand hover:bg-blue-50"><Sparkles size={17}/>Try with Sample Survey Data</button></div></>
}

import Papa from 'papaparse'
import { BarChart3, Download, FileBarChart, PieChart } from 'lucide-react'
import { DynamicAnalysis } from '../DynamicAnalysis'
import { Card, EmptyData, ViewHeader } from './ViewShared'

function Guard({ dataset, onNavigate, children, title, description }) {
  if (!dataset) return <><ViewHeader title={title} description={description}/><EmptyData onNavigate={onNavigate}/></>
  return children
}
export function AnalysisView(props) { return <Guard {...props} title="Analysis" description="Run descriptive analyses on your survey data."><><ViewHeader title="Analysis" description="Select any categorical variable for a live frequency analysis." dataset={props.dataset}/><DynamicAnalysis dataset={props.dataset} rows={props.rows}/></></Guard> }
export function ChartsView(props) { return <Guard {...props} title="Charts" description="Create publication-ready visualizations."><><ViewHeader title="Charts" description="Visual summaries of your survey responses." dataset={props.dataset}/><DynamicAnalysis dataset={props.dataset} rows={props.rows} showOverview={false}/></></Guard> }
export function ReportsView(props) { return <Guard {...props} title="Reports" description="Compile your findings into a report."><><ViewHeader title="Reports" description="A concise overview of your loaded survey." dataset={props.dataset}/><div className="grid gap-4 sm:grid-cols-3">{[[BarChart3,'Responses',props.rows.length],[PieChart,'Variables',props.dataset.fields?.length||0],[FileBarChart,'Report status','Ready']].map(([Icon,l,v])=><Card key={l}><Icon className="text-brand"/><p className="mt-5 text-xs text-muted">{l}</p><p className="mt-1 text-2xl font-bold">{v}</p></Card>)}</div></></Guard> }
export function ExportView(props) {
  const download=()=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([Papa.unparse(props.rows)],{type:'text/csv'})); a.download=`analyzed-${props.dataset?.name||'survey.csv'}`; a.click(); URL.revokeObjectURL(a.href) }
  return <Guard {...props} title="Export" description="Download your data and analysis results."><><ViewHeader title="Export" description="Download a clean copy of your survey dataset." dataset={props.dataset}/><Card className="flex flex-col items-center py-14 text-center"><div className="grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-brand"><Download/></div><h2 className="mt-4 font-bold">Dataset CSV</h2><p className="mt-2 text-sm text-muted">{props.rows.length} responses ready to export</p><button onClick={download} className="mt-5 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white">Download CSV</button></Card></></Guard>
}

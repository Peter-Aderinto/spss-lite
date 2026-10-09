import { useState } from 'react'
import Papa from 'papaparse'
import { AppShell } from './components/AppShell'
import { DashboardView } from './components/views/DashboardView'
import { UploadView } from './components/views/UploadView'
import { DataPreviewView } from './components/views/DataPreviewView'
import { VariablesView } from './components/views/VariablesView'
import { CrossTabsView } from './components/views/CrossTabsView'
import { SettingsView } from './components/views/SettingsView'
import { AnalysisView, ChartsView, ExportView, ReportsView } from './components/views/SecondaryViews'
import './App.css'

const sampleRows = [
  { Q1_Age: 24, Q2_Gender: 'Male', Q3_Education: 'BSc', Q4_Employment: 'Employed', Q5_Device: 'Mobile Phone' },
  { Q1_Age: 31, Q2_Gender: 'Female', Q3_Education: 'MSc', Q4_Employment: 'Employed', Q5_Device: 'Laptop/Desktop' },
  { Q1_Age: 27, Q2_Gender: 'Female', Q3_Education: 'BSc', Q4_Employment: 'Student', Q5_Device: 'Mobile Phone' },
  { Q1_Age: 42, Q2_Gender: 'Male', Q3_Education: 'PhD', Q4_Employment: 'Self-employed', Q5_Device: 'Laptop/Desktop' },
  { Q1_Age: 22, Q2_Gender: 'Female', Q3_Education: 'BSc', Q4_Employment: 'Student', Q5_Device: 'Mobile Phone' },
  { Q1_Age: 36, Q2_Gender: 'Male', Q3_Education: 'MSc', Q4_Employment: 'Employed', Q5_Device: 'Mobile Phone' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [dataset, setDataset] = useState({ name: 'sample-survey.csv', fields: Object.keys(sampleRows[0]), isSample: true, loadedAt: new Date().toISOString() })
  const [rows, setRows] = useState(sampleRows)
  const [uploadError, setUploadError] = useState('')

  const loadFile = (file) => {
    if (!file) return
    setUploadError('')
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data, meta, errors }) => {
        if (errors.length || !data.length || !meta.fields?.length) {
          setUploadError('Could not load this CSV. Use a header row and consistent columns with at least one data row.')
          return
        }
        setRows(data)
        setDataset({ name: file.name || 'survey_data.csv', fields: meta.fields || Object.keys(data[0] || {}), loadedAt: new Date().toISOString() })
        setActiveTab('dashboard')
      },
      error: () => setUploadError('Could not read this file. Please try another CSV.'),
    })
  }
  const loadSample = () => {
    setRows(sampleRows)
    setDataset({ name: 'sample-survey.csv', fields: Object.keys(sampleRows[0]), isSample: true, loadedAt: new Date().toISOString() })
    setUploadError('')
    setActiveTab('dashboard')
  }

  const props = { dataset, rows, onUpload: loadFile, onSample: loadSample, onNavigate: setActiveTab }
  const views = {
    dashboard: <DashboardView {...props} />, upload: <UploadView {...props} />,
    preview: <DataPreviewView {...props} />, variables: <VariablesView {...props} />,
    analysis: <AnalysisView {...props} />, crosstabs: <CrossTabsView {...props} />,
    charts: <ChartsView {...props} />, reports: <ReportsView {...props} />,
    export: <ExportView {...props} />, settings: <SettingsView {...props} />,
  }

  return <AppShell loaded={Boolean(dataset)} activeTab={activeTab} onTabChange={setActiveTab}>
      <p className="mb-5 rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-slate-700"><strong>Portfolio demo.</strong> {dataset?.isSample ? 'The sample survey responses are fictional.' : 'You are viewing your uploaded CSV.'} Data is processed locally in this browser session; refreshing restores the fictional sample. No credentials or database are required.</p>
      {uploadError && <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{uploadError}</p>}
      {views[activeTab] || views.dashboard}
    </AppShell>
}

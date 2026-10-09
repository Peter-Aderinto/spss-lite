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
  const [dataset, setDataset] = useState(null)
  const [rows, setRows] = useState([])

  const loadFile = (file) => {
    if (!file) return
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data, meta }) => {
        setRows(data)
        setDataset({ name: file.name || 'survey_data.csv', fields: meta.fields || Object.keys(data[0] || {}) })
        setActiveTab('dashboard')
      },
    })
  }
  const loadSample = () => {
    setRows(sampleRows)
    setDataset({ name: 'survey_data.csv', fields: Object.keys(sampleRows[0]) })
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

  return <AppShell loaded={Boolean(dataset)} activeTab={activeTab} onTabChange={setActiveTab}>{views[activeTab] || views.dashboard}</AppShell>
}

import { EmptyDashboard } from '../EmptyDashboard'
import { LoadedDashboard } from '../LoadedDashboard'

export function DashboardView({ dataset, rows, onUpload, onSample }) {
  return dataset
    ? <LoadedDashboard dataset={dataset} rows={rows} onUpload={onUpload}/>
    : <EmptyDashboard onUpload={onUpload} onSample={onSample}/>
}

import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Maximize2 } from 'lucide-react'

const bars = [{ name: 'Mobile Phone', value: 66.6, fill: '#2878e9' }, { name: 'Laptop/Desktop', value: 33.3, fill: '#54bd7a' }]
const pie = [{ name: 'Male', value: 60, count: 90 }, { name: 'Female', value: 40, count: 60 }]

function ChartCard({ title, children }) {
  return <section className="card-shadow rounded-lg border border-slate-200 bg-white p-6 text-slate-800"><div className="flex items-start justify-between"><div><h2 className="text-sm font-bold">{title}</h2><p className="mt-1 text-[10px] text-slate-600">(Single Response)</p></div><Maximize2 size={15}/></div>{children}</section>
}

export function ResponseChart() {
  return <ChartCard title="Q5. Which device do you use most?"><div className="mt-3 h-[260px]">
    <ResponsiveContainer width="100%" height="100%"><BarChart data={bars} margin={{top:16,right:8,left:-10,bottom:4}}><CartesianGrid vertical={false} stroke="#e8edf5"/><XAxis dataKey="name" tick={{fontSize:10}} axisLine={false} tickLine={false}/><YAxis domain={[0,100]} tickFormatter={v=>`${v}%`} tick={{fontSize:10}} axisLine={false} tickLine={false}/><Tooltip formatter={v=>`${v}%`}/><Legend formatter={()=> 'Percent'} wrapperStyle={{fontSize:10}}/><Bar dataKey="value" radius={[2,2,0,0]} barSize={64} label={{position:'top',fontSize:11,fontWeight:700,formatter:v=>`${v}%`}}>{bars.map(d=><Cell key={d.name} fill={d.fill}/>)}</Bar></BarChart></ResponsiveContainer>
  </div></ChartCard>
}

export function GenderChart() {
  return <ChartCard title="Q2. Gender"><div className="mt-3 flex h-[260px] items-center">
    <div className="h-full min-w-0 flex-1"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pie} dataKey="value" innerRadius={0} outerRadius={88} stroke="#fff" label={({value})=>`${value}.0%`} labelLine={false}>{pie.map((_,i)=><Cell key={i} fill={['#2878e9','#54bd7a'][i]}/>)}</Pie><Tooltip formatter={v=>`${v}%`}/></PieChart></ResponsiveContainer></div>
    <div className="w-28 space-y-3 text-xs">{pie.map((d,i)=><div key={d.name}><div className="flex items-center gap-2 font-semibold"><i className="h-2.5 w-2.5 rounded-full" style={{background:['#2878e9','#54bd7a'][i]}}/>{d.name}</div><div className="ml-[18px] mt-1 text-muted">{d.count} ({d.value}.0%)</div></div>)}<div className="pt-2 text-muted">Total: 150</div></div>
  </div></ChartCard>
}

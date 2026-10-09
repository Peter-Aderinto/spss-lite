import { useEffect, useRef, useState } from 'react'
import {
  BarChart3, ChevronDown, CircleHelp, FileBarChart, FileDown, Grid2X2,
  Home, LockKeyhole, Menu, PanelLeftClose, Settings, Sun, Table2, Upload, X
} from 'lucide-react'
import { Logo } from './Logo'

const mainNav = [
  [Home, 'Dashboard', 'dashboard'], [Upload, 'Upload Data', 'upload'],
  [Table2, 'Data Preview', 'preview'], [PanelLeftClose, 'Variables', 'variables'],
  [BarChart3, 'Analysis', 'analysis'],
]
const dataNav = [
  [Grid2X2, 'Cross Tabs', 'crosstabs'], [FileBarChart, 'Charts', 'charts'],
  [FileBarChart, 'Reports', 'reports'], [FileDown, 'Export', 'export'],
]
const mobileNav = [
  [Home, 'Dashboard', 'dashboard'], [Upload, 'Upload', 'upload'],
  [Table2, 'Preview', 'preview'], [PanelLeftClose, 'Variables', 'variables'],
  [Menu, 'More', 'settings'],
]

const navClass = (active) => `flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium transition ${active ? 'bg-blue-50 text-[#0969da]' : 'text-slate-700 hover:bg-slate-50'}`

function Sidebar({ loaded, activeTab, onTabChange }) {
  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-[232px] flex-col border-r border-line bg-white px-4 py-6 lg:flex">
    <div className="px-2"><Logo /></div>
    <nav className="mt-8 space-y-1">
      {mainNav.map(([Icon,label,tab]) => <button key={tab} onClick={() => onTabChange(tab)} className={navClass(activeTab === tab)}><Icon size={18}/>{label}</button>)}
      {dataNav.map(([Icon,label,tab]) => <button key={tab} onClick={() => onTabChange(tab)} className={navClass(activeTab === tab)}><Icon size={18}/>{label}{!loaded && <LockKeyhole className="ml-auto text-slate-300" size={13}/>}</button>)}
    </nav>
    <nav className="mt-auto space-y-1 border-t border-line pt-4">
      <button onClick={() => onTabChange('settings')} className={navClass(activeTab === 'settings')}><Settings size={18}/>Settings</button>
      <a href="https://github.com/Peter-Aderinto/spss-lite#readme" className={navClass(false)}><CircleHelp size={18}/>Help & Guide</a>
    </nav>
  </aside>
}

export function AppShell({ loaded, activeTab, onTabChange, children }) {
  const [menu, setMenu] = useState(false)
  const [profile, setProfile] = useState(false)
  const menuPanel = useRef(null)
  useEffect(() => {
    if (!menu) return
    const previous = document.activeElement
    const panel = menuPanel.current
    panel?.querySelector('button')?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') setMenu(false)
      if (event.key !== 'Tab') return
      const controls = [...panel.querySelectorAll('button, a[href]')]
      const first = controls[0], last = controls.at(-1)
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); previous?.focus() }
  }, [menu])
  const navigate = (tab) => { onTabChange(tab); setMenu(false) }
  return <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
    <Sidebar loaded={loaded} activeTab={activeTab} onTabChange={onTabChange}/>
    {menu && <div className="fixed inset-0 z-40 bg-slate-700/30 lg:hidden" onClick={() => setMenu(false)}>
      <div ref={menuPanel} role="dialog" aria-modal="true" aria-label="Navigation menu" className="h-full w-72 overflow-y-auto bg-white p-5 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between"><Logo/><button aria-label="Close menu" onClick={() => setMenu(false)}><X/></button></div>
        <div className="mt-8 space-y-2">{[...mainNav,...dataNav].map(([Icon,label,tab]) => <button key={tab} onClick={() => navigate(tab)} className={navClass(activeTab === tab)}><Icon size={18}/>{label}</button>)}
          <button onClick={() => navigate('settings')} className={navClass(activeTab === 'settings')}><Settings size={18}/>Settings</button>
        </div>
      </div>
    </div>}
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-line bg-white/95 px-5 backdrop-blur lg:hidden">
      <button aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}><Menu size={24}/></button><Logo compact/><button disabled aria-label="Demo profile" className="h-9 w-9 rounded-full bg-slate-200 text-sm font-semibold text-slate-700">P</button>
    </header>
    <div className="lg:pl-[232px]">
      <div className="hidden h-[72px] items-center justify-end gap-5 px-7 lg:flex xl:px-10">
        <button disabled title="Demo uses light appearance" aria-label="Light appearance (fixed)" className="rounded-full p-2 hover:bg-slate-100"><Sun size={20}/></button>
        <div className="relative"><button aria-expanded={profile} onClick={() => setProfile(v => !v)} className="flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-slate-100"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#d8e5f5] text-sm font-semibold text-slate-700">P</span><span className="text-[13px] font-semibold">Peter Aderinto</span><ChevronDown size={14}/></button>
          {profile && <div className="menu-in absolute right-0 top-12 w-44 rounded-xl border border-line bg-white p-2 text-sm shadow-lg"><p className="p-2 text-xs text-slate-600">Demo profile only. No login or account actions.</p></div>}
        </div>
      </div>
      <main className="mx-auto max-w-[1440px] px-4 pb-28 pt-6 sm:px-6 lg:px-7 lg:pb-6 lg:pt-0 xl:px-10">{children}</main>
    </div>
    <nav className="fixed inset-x-0 bottom-0 z-30 grid h-[76px] grid-cols-5 border-t border-line bg-white px-1 pb-[env(safe-area-inset-bottom)] lg:hidden">
      {mobileNav.map(([Icon,label,tab]) => <button key={tab} onClick={() => tab === 'settings' ? setMenu(true) : onTabChange(tab)} className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${activeTab === tab ? 'text-brand' : 'text-slate-600'}`}><Icon size={20}/><span>{label}</span></button>)}
    </nav>
  </div>
}

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, Clock, Users, FileText, Bell, MapPin, ChevronRight, PieChart } from 'lucide-react';

// Custom SVG Donut Chart for perfect compact sizing without Recharts padding
const Donut = ({ percentage, color, centerText }: { percentage: number, color: string, centerText?: string }) => {
  const r = 24;
  const circ = 2 * Math.PI * r;
  const strokeDasharray = `${(percentage * circ) / 100} ${circ}`;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="32" cy="32" r={r} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100 dark:text-gray-800" />
        <circle cx="32" cy="32" r={r} stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={strokeDasharray} className={color} strokeLinecap="round" />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-[10px] font-bold text-gray-800 dark:text-gray-100 leading-none">{centerText || `${percentage}%`}</span>
      </div>
    </div>
  );
};

const MiniBar = ({ label, percentage, color }: { label: string, percentage: number, color: string }) => (
  <div className="flex items-center gap-2 mb-1.5 last:mb-0">
    <span className="text-[9px] font-semibold text-gray-600 dark:text-gray-400 w-24 truncate">{label}</span>
    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
    <span className="text-[9px] font-bold text-gray-700 dark:text-gray-300 w-6 text-right">{percentage}%</span>
  </div>
);

export default function FacultyDashboard() {
  const [user, setUser] = useState({ name: "Saranya V", role: "HOD", designation: "HOD" });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (stored) setUser({ name: stored.name, role: stored.role, designation: stored.designation || 'Faculty' });
    } catch (e) {}
  }, []);

  return (
    <div className="h-full flex flex-col gap-3 p-4 overflow-hidden bg-gray-50 dark:bg-[#0f172a]">
      
      {/* 1. Top Banner (Fixed Height) */}
      <div className="h-[120px] shrink-0 bg-blue-900 rounded-2xl relative overflow-hidden flex items-center px-6 justify-between border border-blue-800 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/90 to-transparent z-10"></div>
        {/* Placeholder for building image */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-blue-800 opacity-20"></div>
        
        <div className="relative z-20">
          <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Good Morning, {user.designation === 'HOD' ? 'Dr. ' : ''}{user.name} 👋</h2>
          <p className="text-blue-200 text-xs font-medium mb-3">Head of Department – Computer Engineering</p>
          <div className="text-[10px] text-blue-300 font-semibold tracking-wider uppercase">"Monitor • Guide • Support • Build a Stronger Department"</div>
        </div>

        <div className="relative z-20 bg-blue-950/50 backdrop-blur-sm border border-blue-800/50 p-4 rounded-xl hidden md:block">
          <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
            <CalendarIcon size={14} className="text-blue-400" />
            <span>Sat, 4 Oct 2026</span>
          </div>
          <p className="text-blue-200 text-[10px] italic">"Today's effort builds tomorrow's achievers."</p>
        </div>
      </div>

      {/* Main Grid Content - Takes remaining height perfectly on desktop, scrolls on mobile */}
      <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-y-auto md:overflow-hidden hide-scrollbar pb-4 md:pb-0">
        
        {/* ROW 1: Attendance Cards (approx 30% height on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:flex-[3] shrink-0 min-h-[140px] md:min-h-0">
          {/* II Year Attendance */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[11px] font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5"><CalendarIcon size={12} className="text-blue-600"/> II Year Dept Attendance</h3>
              <span className="text-[9px] text-blue-600 font-bold cursor-pointer hover:underline">View Details &rarr;</span>
            </div>
            <div className="flex-1 flex items-center justify-around bg-blue-50/50 dark:bg-slate-700/50 rounded-lg p-2">
              <Donut percentage={87} color="text-blue-500" centerText="52/60" />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><div className="text-[10px]"><span className="text-gray-500 dark:text-gray-400">Present:</span> <span className="font-bold text-gray-800 dark:text-gray-200">52</span></div></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div><div className="text-[10px]"><span className="text-gray-500 dark:text-gray-400">Absentees:</span> <span className="font-bold text-gray-800 dark:text-gray-200">8</span></div></div>
              </div>
            </div>
          </div>
          {/* III Year Attendance */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[11px] font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5"><CalendarIcon size={12} className="text-purple-500"/> III Year Dept Attendance</h3>
            </div>
            <div className="flex-1 flex items-center justify-around bg-purple-50/50 dark:bg-slate-700/50 rounded-lg p-2">
              <Donut percentage={82} color="text-purple-500" centerText="54/66" />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><div className="text-[10px]"><span className="text-gray-500 dark:text-gray-400">Present:</span> <span className="font-bold text-gray-800 dark:text-gray-200">54</span></div></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400"></div><div className="text-[10px]"><span className="text-gray-500 dark:text-gray-400">Absentees:</span> <span className="font-bold text-gray-800 dark:text-gray-200">12</span></div></div>
              </div>
            </div>
          </div>
          {/* Faculty Attendance */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[11px] font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5"><Users size={12} className="text-emerald-500"/> Faculty Attendance (Today)</h3>
            </div>
            <div className="flex-1 flex items-center justify-around bg-emerald-50/50 dark:bg-slate-700/50 rounded-lg p-2">
              <Donut percentage={83} color="text-emerald-500" centerText="5/6" />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><div className="text-[10px]"><span className="text-gray-500 dark:text-gray-400">Present:</span> <span className="font-bold text-gray-800 dark:text-gray-200">5</span></div></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-400"></div><div className="text-[10px]"><span className="text-gray-500 dark:text-gray-400">Absentees:</span> <span className="font-bold text-gray-800 dark:text-gray-200">1</span></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Academics & Approvals (approx 40% height on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:flex-[4] shrink-0 min-h-[180px] md:min-h-0">
          {/* Academics Block (Spans 2 columns on desktop) */}
          <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-3 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2 shrink-0">
              <h3 className="text-[11px] font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5"><PieChart size={12} className="text-blue-600"/> Academic Performance (Overall Average)</h3>
              <select className="text-[9px] bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded px-1 py-0.5"><option>This Semester</option></select>
            </div>
            <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
              <div className="flex-1 bg-blue-50/30 dark:bg-slate-700/40 p-2 rounded-lg flex flex-col justify-center">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">II Year - Subject Avg</span>
                  <span className="text-xs font-black text-gray-900 dark:text-white">78%</span>
                </div>
                <MiniBar label="AI & ML" percentage={82} color="bg-blue-500" />
                <MiniBar label="Web Technologies" percentage={76} color="bg-indigo-400" />
                <MiniBar label="DBMS" percentage={80} color="bg-emerald-400" />
                <MiniBar label="Operating Systems" percentage={75} color="bg-orange-400" />
                <MiniBar label="Computer Networks" percentage={79} color="bg-red-400" />
              </div>
              <div className="flex-1 bg-purple-50/30 dark:bg-slate-700/40 p-2 rounded-lg flex flex-col justify-center">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">III Year - Subject Avg</span>
                  <span className="text-xs font-black text-gray-900 dark:text-white">84%</span>
                </div>
                <MiniBar label="Machine Learning" percentage={86} color="bg-blue-500" />
                <MiniBar label="Mobile App Dev" percentage={82} color="bg-indigo-400" />
                <MiniBar label="Cloud Computing" percentage={88} color="bg-emerald-400" />
                <MiniBar label="Cyber Security" percentage={80} color="bg-orange-400" />
                <MiniBar label="Project Work" percentage={83} color="bg-red-400" />
              </div>
            </div>
          </div>
          {/* Approvals */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2 shrink-0">
              <h3 className="text-[11px] font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5"><FileText size={12} className="text-blue-600"/> Pending Approvals</h3>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              {[
                { l: 'Assignment Extension', c: 3, bg: 'bg-red-50 text-red-600 dark:bg-red-900/30' },
                { l: 'Internal Re-evaluation', c: 1, bg: 'bg-green-50 text-green-600 dark:bg-green-900/30' },
                { l: 'Leave Requests', c: 5, bg: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' },
                { l: 'OD / Event Participation', c: 2, bg: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30' },
                { l: 'Project Title Approval', c: 4, bg: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-[10px] py-1 border-b border-gray-50 dark:border-slate-700/50 last:border-0">
                  <div className="flex items-center gap-1.5"><div className={`w-4 h-4 rounded flex items-center justify-center ${item.bg}`}><FileText size={8}/></div><span className="text-gray-600 dark:text-gray-300 font-medium">{item.l}</span></div>
                  <span className={`font-bold ${item.bg} px-1.5 py-0.5 rounded`}>{item.c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3: Events & Notices (approx 30% height on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:flex-[3] shrink-0 min-h-[160px] md:min-h-0">
          {/* Upcoming Events */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col min-h-0">
            <h3 className="text-[11px] font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5 mb-2 shrink-0"><CalendarIcon size={12} className="text-blue-600"/> Upcoming Events</h3>
            <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-2">
              {[
                { d: '07 Oct', t: 'Department Meeting', s: '10:00 AM - HOD Office' },
                { d: '10 Oct', t: 'Project Review Session', s: '02:00 PM - Seminar Hall' },
                { d: '15 Oct', t: 'Industry Expert Talk', s: '11:00 AM - Main Auditorium' }
              ].map((e,i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="flex flex-col items-center justify-center w-8 h-8 rounded bg-blue-50 dark:bg-slate-700 shrink-0"><span className="text-blue-600 dark:text-blue-400 font-bold text-[10px] leading-tight">{e.d.split(' ')[0]}</span><span className="text-[8px] text-gray-500">{e.d.split(' ')[1]}</span></div>
                  <div className="min-w-0"><p className="text-[10px] font-bold text-gray-800 dark:text-gray-200 truncate">{e.t}</p><p className="text-[8px] text-gray-500 dark:text-gray-400 truncate">{e.s}</p></div>
                </div>
              ))}
            </div>
          </div>
          {/* Calendar Holidays */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col min-h-0">
            <h3 className="text-[11px] font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5 mb-2 shrink-0"><CalendarIcon size={12} className="text-blue-600"/> Calendar Holidays</h3>
            <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-2">
              {[
                { d: '02 Oct', t: 'Gandhi Jayanthi', c: 'text-red-500 bg-red-50' },
                { d: '12 Oct', t: 'Ayutha Pooja', c: 'text-purple-500 bg-purple-50' },
                { d: '13 Oct', t: 'Vijayadashami', c: 'text-orange-500 bg-orange-50' }
              ].map((e,i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className={`flex flex-col items-center justify-center w-8 h-8 rounded shrink-0 ${e.c} dark:bg-slate-700`}><span className="font-bold text-[10px] leading-tight">{e.d.split(' ')[0]}</span><span className="text-[8px]">{e.d.split(' ')[1]}</span></div>
                  <div className="min-w-0"><p className="text-[10px] font-bold text-gray-800 dark:text-gray-200 truncate">{e.t}</p><p className="text-[8px] text-gray-500 dark:text-gray-400 truncate">Holiday - College Closed</p></div>
                </div>
              ))}
            </div>
          </div>
          {/* Notices */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col min-h-0">
            <h3 className="text-[11px] font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1.5 mb-2 shrink-0"><Bell size={12} className="text-blue-600"/> Notices & Circulars</h3>
            <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-2">
              {[
                { t: 'Internal Assessment Schedule Released', d: '3 Oct 2026', c: 'bg-red-500' },
                { t: 'Project Submission Guidelines', d: '1 Oct 2026', c: 'bg-red-400' },
                { t: 'Department Meeting Agenda', d: '29 Sep 2026', c: 'bg-blue-500' },
                { t: 'Placement Training Session', d: '25 Sep 2026', c: 'bg-green-500' }
              ].map((n,i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0"><div className={`w-1.5 h-1.5 rounded-full shrink-0 ${n.c}`}></div><span className="text-[9px] font-medium text-gray-700 dark:text-gray-300 truncate">{n.t}</span></div>
                  <span className="text-[8px] text-gray-400 shrink-0">{n.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

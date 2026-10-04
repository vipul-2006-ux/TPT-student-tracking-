import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, FileText, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockStudents } from '../../data/mockData';

const data = [
  { name: 'Jul', value: 40 },
  { name: 'Aug', value: 30 },
  { name: 'Sep', value: 60 },
  { name: 'Oct', value: 45 },
  { name: 'Nov', value: 73 },
  { name: 'Dec', value: 50 },
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 85 },
];

const AVATAR_URL = "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";

export default function StudentDashboard() {
  const student = mockStudents.find(s => s.regNo === 'A2407066') || mockStudents[0];
  
  // Real-time calendar logic
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust for Monday start
  };
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);
  
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <div className="flex flex-col xl:flex-row gap-4 h-full max-w-7xl mx-auto overflow-hidden">
      
      {/* Left Column (Main Content) */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        
        {/* Navy Banner */}
        <div className="bg-blue-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shrink-0 flex items-center justify-between h-32">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">Welcome back, {student.name.split(' ')[0]}!</h2>
            <button className="bg-[#4ade80] hover:bg-[#22c55e] text-white text-sm font-semibold py-2 px-5 rounded-full transition-colors shadow-sm">
              View Analytics
            </button>
          </div>
          
          {/* Avatar / Illustration */}
          <div className="relative z-10 hidden sm:block">
            <img 
              src={AVATAR_URL}
              alt="Avatar" 
              className="w-24 h-24 rounded-full border-4 border-white shadow-xl bg-blue-100 object-cover"
            />
          </div>

          <div className="absolute right-0 bottom-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-20 translate-y-20 blur-3xl"></div>
          <div className="absolute right-32 top-0 w-40 h-40 bg-blue-400 opacity-20 rounded-full -translate-y-10 blur-2xl"></div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-gray-100 flex-1 flex flex-col min-h-0">
          <h3 className="text-sm font-bold text-gray-800 mb-2 shrink-0">Student performance</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} dy={5} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  cursor={{stroke: '#e5e7eb', strokeWidth: 1, strokeDasharray: '4 4'}}
                />
                <Area type="monotone" dataKey="value" stroke="#1e3a8a" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* My Classes */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 shrink-0">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-gray-800">My Classes</h3>
            <button className="text-xs font-semibold text-blue-900 hover:text-blue-800">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-gray-100 p-3 rounded-2xl flex items-center gap-3 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <BookOpen size={18} />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-800 text-xs truncate">Cloud Computing</h4>
                <p className="text-[10px] text-gray-500 truncate">III Year • V Sem</p>
              </div>
            </div>
            <div className="border border-gray-100 p-3 rounded-2xl flex items-center gap-3 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                <FileText size={18} />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-800 text-xs truncate">Web Technology</h4>
                <p className="text-[10px] text-gray-500 truncate">III Year • V Sem</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column (Widgets) */}
      <div className="w-full xl:w-[280px] flex flex-col gap-4 overflow-hidden shrink-0">
        
        {/* Real-time Calendar Widget */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 shrink-0">
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="text-gray-400 hover:text-blue-600"><ChevronLeft size={18} /></button>
            <h3 className="text-sm font-bold text-gray-800">{monthName} {year}</h3>
            <button onClick={nextMonth} className="text-gray-400 hover:text-blue-600"><ChevronRight size={18} /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-2">
            {['Mo','Tu','We','Th','Fr','Sa','Su'].map(d => (
               <span key={d} className="text-gray-400 font-medium">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-1.5 gap-x-1 text-center text-xs font-medium text-gray-700">
            {/* Previous Month trailing days */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <span key={`prev-${i}`} className="text-gray-300">
                {daysInPrevMonth - firstDay + i + 1}
              </span>
            ))}
            {/* Current Month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = isCurrentMonth && today.getDate() === day;
              return (
                <span 
                  key={`curr-${day}`} 
                  className={isToday ? "w-6 h-6 flex items-center justify-center bg-blue-900 text-white rounded-full mx-auto shadow-sm" : "w-6 h-6 flex items-center justify-center mx-auto"}
                >
                  {day}
                </span>
              );
            })}
            {/* Next Month leading days */}
            {Array.from({ length: 42 - (firstDay + daysInMonth) }).map((_, i) => (
              <span key={`next-${i}`} className="text-gray-300">
                {i + 1}
              </span>
            ))}
          </div>
        </div>

        {/* Personal Notes */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex-1 min-h-0 overflow-hidden flex flex-col">
          <h3 className="text-xs font-bold text-gray-800 mb-3 shrink-0">Personal Notes</h3>
          <ul className="space-y-3 overflow-y-auto pr-1">
            <li className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
              <p className="text-[10px] text-gray-600 leading-snug">Review Cloud Computing unit 3 materials before the weekend test.</p>
            </li>
            <li className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1 flex-shrink-0"></div>
              <p className="text-[10px] text-gray-600 leading-snug">Submit the Web Tech assignment regarding React components.</p>
            </li>
            <li className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1 flex-shrink-0"></div>
              <p className="text-[10px] text-gray-600 leading-snug">Prepare materials for the upcoming group presentation.</p>
            </li>
          </ul>
        </div>

        {/* Recent Documents */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 shrink-0">
          <h3 className="text-xs font-bold text-gray-800 mb-3">Recent Documents</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 border border-gray-50 bg-gray-50/50 rounded-xl hover:border-blue-200 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center font-bold text-[8px] shrink-0">PDF</div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gray-800 truncate">C2_Proficient.pdf</p>
                  <p className="text-[8px] text-gray-400">315 KB • 21 Oct</p>
                </div>
              </div>
              <Download size={14} className="text-gray-400 hover:text-blue-900 shrink-0" />
            </div>
            <div className="flex items-center justify-between p-2 border border-gray-50 bg-gray-50/50 rounded-xl hover:border-blue-200 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center font-bold text-[8px] shrink-0">DOC</div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gray-800 truncate">Computing 5B.docx</p>
                  <p className="text-[8px] text-gray-400">478 KB • 20 Oct</p>
                </div>
              </div>
              <Download size={14} className="text-gray-400 hover:text-blue-900 shrink-0" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

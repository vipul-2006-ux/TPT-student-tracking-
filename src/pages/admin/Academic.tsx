import { useState } from 'react';
import { Book, Calendar, Users, FileText, Settings, Plus, LayoutDashboard, Clock, MapPin, Award } from 'lucide-react';

const TABS = [
  { id: 'academic-year', label: 'Academic Year', icon: Calendar },
  { id: 'programmes', label: 'Programmes', icon: Award },
  { id: 'years-semesters', label: 'Years & Semesters', icon: LayoutDashboard },
  { id: 'subjects', label: 'Subjects Repository', icon: Book },
  { id: 'class-assign', label: 'Classes Allocation', icon: Settings },
  { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
];

export default function Academic() {
  const [activeTab, setActiveTab] = useState('academic-year');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const academicYears = Array.from({length: 27}, (_, i) => 2026 - i);

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 overflow-hidden relative">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex flex-col gap-4 shrink-0 h-full overflow-hidden">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm shrink-0">
          <h2 className="text-xl font-bold text-gray-800">Academic</h2>
          <p className="text-xs text-gray-500 mt-1">Manage core structures and mappings.</p>
        </div>
        
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-y-auto hide-scrollbar p-3 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm font-bold ${
                activeTab === tab.id 
                  ? 'bg-blue-50 text-blue-900 shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <tab.icon size={16} className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-y-auto hide-scrollbar p-6">
        
        {/* 1. Academic Year */}
        {activeTab === 'academic-year' && (
          <div className="space-y-6">
            {!selectedYear ? (
              <>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-bold text-gray-800">Academic Year Management & Performance</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={14}/> Create New Year</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {academicYears.map(year => (
                    <div 
                      key={year} 
                      onClick={() => setSelectedYear(year)}
                      className={`border rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${year === 2026 ? 'border-blue-200 bg-blue-50 relative overflow-hidden' : 'border-gray-200 bg-white'}`}
                    >
                      {year === 2026 && <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Current Active</div>}
                      <div className={`text-2xl font-black mb-1 ${year === 2026 ? 'text-blue-900' : 'text-gray-700'}`}>{year} - {year + 1}</div>
                      <div className={`text-xs font-bold ${year === 2026 ? 'text-blue-700' : 'text-gray-500'}`}>Start Date: June 15, {year}</div>
                      <div className={`text-xs font-bold ${year === 2026 ? 'text-blue-700' : 'text-gray-500'} mb-3`}>End Date: May 30, {year + 1}</div>
                      <button className={`text-[10px] font-bold px-3 py-1 rounded shadow-sm ${year === 2026 ? 'bg-blue-600 text-white border-transparent' : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'}`}>
                        View Performance
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                  <button onClick={() => setSelectedYear(null)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                    <span className="text-xl">←</span>
                  </button>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Performance Report: {selectedYear} - {selectedYear + 1}</h3>
                    <p className="text-xs text-gray-500 mt-1">Detailed academic and operational metrics for this year.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                    <div className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Overall Pass %</div>
                    <div className="text-3xl font-black text-emerald-600">{Math.floor(Math.random() * 20) + 75}.{Math.floor(Math.random() * 9)}%</div>
                  </div>
                  <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                    <div className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Avg Attendance</div>
                    <div className="text-3xl font-black text-blue-600">{Math.floor(Math.random() * 10) + 85}.{Math.floor(Math.random() * 9)}%</div>
                  </div>
                  <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                    <div className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Total Enrollment</div>
                    <div className="text-3xl font-black text-purple-600">{Math.floor(Math.random() * 500) + 2000}</div>
                  </div>
                  <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                    <div className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Top Dept</div>
                    <div className="text-xl font-black text-orange-600 mt-2 truncate">{['Computer', 'Civil', 'Mechanical', 'ECE'][Math.floor(Math.random() * 4)]} Engg.</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex items-center justify-center h-64 shadow-inner">
                  <div className="text-center">
                    <FileText className="mx-auto text-gray-300 mb-3" size={48} />
                    <div className="text-gray-500 font-bold">Detailed Analytics Chart Placeholder</div>
                    <div className="text-xs text-gray-400 mt-1">Showing semester-wise progression for {selectedYear}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. Programmes */}
        {activeTab === 'programmes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-800">Programmes</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={14}/> Add Programme</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { dept: 'Computer Engineering', code: 'CE', scheme: 'M Scheme (240)' },
                { dept: 'CS & IT', code: 'CSIT', scheme: 'N Scheme (240)' },
                { dept: 'AI & ML', code: 'AIML', scheme: 'N Scheme (240)' },
                { dept: 'Electronics and Comm. Engineering', code: 'ECE', scheme: 'M Scheme (240)' },
                { dept: 'Electrical & Electronics Engg', code: 'EEE', scheme: 'M Scheme (240)' },
                { dept: 'Mechanical Engineering', code: 'MECH', scheme: 'OE Scheme (210)' },
                { dept: 'Civil Engineering', code: 'CIV', scheme: 'OE Scheme (210)' },
                { dept: 'Textile Technology', code: 'TEX', scheme: 'OE Scheme (210)' },
                { dept: 'Production Engineering', code: 'PROD', scheme: 'OE Scheme (210)' },
                { dept: 'Architecture', code: 'ARCH', scheme: 'OE Scheme (210)' },
                { dept: 'Science and Humanities', code: 'SH', scheme: 'N/A' },
              ].map((prog, i) => (
                <div key={i} className="border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-1 rounded-bl-xl border-b border-l border-blue-100 uppercase tracking-wider">{prog.code}</div>
                  <div className="flex justify-between items-start mb-2 mt-1">
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded">{prog.scheme}</span>
                    {prog.code !== 'SH' && <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>}
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1 pr-8">{prog.dept}</h4>
                  <p className="text-xs font-bold text-gray-500">Duration: {prog.code === 'SH' ? '1 Year (First Year)' : '3 Years'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Years & Semesters */}
        {activeTab === 'years-semesters' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-800">Years & Semesters Mapping</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {['First Year', 'Second Year', 'Third Year'].map((year, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 p-3 border-b border-gray-200 font-bold text-gray-800 text-sm">{year}</div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Odd Semester */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold text-blue-900">Semester {(i*2)+1}</span>
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded shadow-sm font-bold">Mapped: 26-27</span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs border-b border-gray-50 pb-2">
                          <span className="font-bold text-gray-700 block mb-1">Main Subjects</span>
                          <span className="text-gray-500">6 Core Theory, 3 Practicals</span>
                        </div>
                        <div className="text-xs border-b border-gray-50 pb-2">
                          <span className="font-bold text-gray-700 block mb-1">Audit Courses</span>
                          <span className="text-gray-500">Environmental Science / Ethics</span>
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-gray-700 block mb-1">Non-Audit Courses</span>
                          <span className="text-gray-500">Certificate Course: Basic Computing</span>
                        </div>
                      </div>
                    </div>
                    {/* Even Semester */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold text-blue-900">Semester {(i*2)+2}</span>
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded shadow-sm font-bold">Mapped: 26-27</span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs border-b border-gray-50 pb-2">
                          <span className="font-bold text-gray-700 block mb-1">Main Subjects</span>
                          <span className="text-gray-500">5 Core Theory, 4 Practicals</span>
                        </div>
                        <div className="text-xs border-b border-gray-50 pb-2">
                          <span className="font-bold text-gray-700 block mb-1">Audit Courses</span>
                          <span className="text-gray-500">Employability Skills</span>
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-gray-700 block mb-1">Non-Audit Courses</span>
                          <span className="text-gray-500">Certificate Course: Advanced Skills</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subjects & Faculty Assignment */}
        {activeTab === 'subjects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-800">Subjects & Faculty Repository</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={14}/> Add / Assign Subject</button>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 font-bold text-gray-600 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">Subject Name & Code</th>
                    <th className="px-4 py-3">Dept / Year / Sem</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Assigned Faculty</th>
                    <th className="px-4 py-3">Credits & Hrs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Cloud Computing', code: 'CS501', type: 'Theory', credits: 4, hrs: 5, faculty: 'Prof. RajaRajeswari R' },
                    { name: 'Java Programming Lab', code: 'CS502L', type: 'Practical', credits: 2, hrs: 4, faculty: 'Saranya V (HOD)' },
                    { name: 'Internet of Things', code: 'CS503E', type: 'Elective', credits: 3, hrs: 4, faculty: 'Unassigned' },
                    { name: 'Environmental Science', code: 'AUD101', type: 'Audit', credits: 0, hrs: 2, faculty: 'Prof. Ramesh M' },
                    { name: 'Basic Computing', code: 'NAUD101', type: 'Non-Audit', credits: 0, hrs: 2, faculty: 'External Vendor' },
                  ].map((sub, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-bold text-gray-800">{sub.name}</div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">{sub.code}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs font-bold text-gray-700">Computer Engg</div>
                        <div className="text-[10px] text-gray-400">III Year • Sem V</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          sub.type === 'Theory' ? 'bg-blue-100 text-blue-700' :
                          sub.type === 'Practical' ? 'bg-purple-100 text-purple-700' : 
                          sub.type === 'Audit' ? 'bg-yellow-100 text-yellow-700' :
                          sub.type === 'Non-Audit' ? 'bg-gray-100 text-gray-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>{sub.type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`text-xs font-bold ${sub.faculty === 'Unassigned' ? 'text-red-500' : 'text-emerald-700'}`}>
                          {sub.faculty}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs font-bold text-gray-600">
                        {sub.credits} Cr • {sub.hrs} H/W
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Class Assignment & Room Allocation */}
        {activeTab === 'class-assign' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-800">Classes Allocation</h3>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm">Manage Allocation</button>
              </div>
            </div>
            
            {/* First Year Section */}
            <div className="border border-blue-200 rounded-2xl overflow-hidden mb-6">
              <div className="bg-blue-50 p-3 border-b border-blue-200 font-bold text-blue-900 text-sm flex justify-between items-center">
                <span>SET 1 — FIRST YEAR</span>
                <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-0.5 rounded">Common Practical Facilities</span>
              </div>
              <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Department Classrooms (All Sec A, Qty: 1)</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-700">
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">Computer Engg</div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">CS & IT</div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">AI & ML</div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">ECE</div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">EEE</div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">Mechanical Engg</div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">Civil Engg</div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">Textile Tech</div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">Production Engg</div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">Architecture</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">First-Year Common Facilities</h4>
                  <div className="space-y-2 text-xs font-bold text-gray-600">
                    <div className="flex justify-between border-b border-gray-100 pb-1"><span>Chemistry Lab / Equip. Room</span> <span className="text-blue-600 font-mono">LAB-CHEM-01</span></div>
                    <div className="flex justify-between border-b border-gray-100 pb-1"><span>Physics Lab / Staff Rms</span> <span className="text-blue-600 font-mono">LAB-PHY-01</span></div>
                    <div className="flex justify-between border-b border-gray-100 pb-1"><span>Mathematics Lab / Staff</span> <span className="text-blue-600 font-mono">LAB-MATH-01</span></div>
                    <div className="flex justify-between border-b border-gray-100 pb-1"><span>English Fluency Lab</span> <span className="text-blue-600 font-mono">LAB-ENG-01</span></div>
                    <div className="flex justify-between border-b border-gray-100 pb-1"><span>Engg Drawing Rooms (x2)</span> <span className="text-blue-600 font-mono">DR-01, DR-02</span></div>
                    <div className="flex justify-between border-b border-gray-100 pb-1"><span>CAD Laboratory</span> <span className="text-blue-600 font-mono">LAB-CAD-01</span></div>
                    <div className="flex justify-between"><span>Mechanical Workshop</span> <span className="text-blue-600 font-mono">WS-MECH-01</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second & Third Year Section */}
            <div className="border border-emerald-200 rounded-2xl overflow-hidden">
              <div className="bg-emerald-50 p-3 border-b border-emerald-200 font-bold text-emerald-900 text-sm flex justify-between items-center">
                <span>SET 2 — SECOND & THIRD YEAR</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded">Shared Department Laboratories</span>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                
                {/* Standard Departments */}
                {[
                  { dept: 'Computer Engg', lab: 'Common Computer Lab' },
                  { dept: 'CS & IT', lab: 'Common CS Lab' },
                  { dept: 'AI & ML', lab: 'Common AI Lab' },
                  { dept: 'EEE', lab: 'Common EEE Lab' },
                  { dept: 'Mechanical', lab: 'Common Mech Lab' },
                  { dept: 'Civil Engg', lab: 'Common Civil Lab' },
                  { dept: 'Production Engg', lab: 'Common Production Lab' },
                ].map(d => (
                  <div key={d.dept} className="border border-gray-100 rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <h5 className="font-bold text-gray-800 text-sm mb-2">{d.dept}</h5>
                    <div className="flex gap-2 mb-2">
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded w-full text-center font-bold">2nd Yr (1 Class)</span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded w-full text-center font-bold">3rd Yr (1 Class)</span>
                    </div>
                    <div className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-center font-bold border border-emerald-100">
                      {d.lab} (Shared 2nd/3rd Yr)
                    </div>
                  </div>
                ))}

                {/* ECE Special Case */}
                <div className="border border-purple-200 rounded-xl p-3 bg-purple-50 shadow-sm md:col-span-2 xl:col-span-1">
                  <h5 className="font-bold text-purple-900 text-sm mb-2 flex justify-between">ECE <span className="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.5 rounded">Special Case</span></h5>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <span className="text-[10px] bg-white text-gray-600 px-2 py-1 rounded text-center font-bold border border-purple-100">2nd Yr - Sec A & B</span>
                    <span className="text-[10px] bg-white text-gray-600 px-2 py-1 rounded text-center font-bold border border-purple-100">3rd Yr - Sec A & B</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded text-center font-bold">
                      Shared ECE Lab
                    </div>
                    <div className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded text-center font-bold">
                      Shared Computer Lab
                    </div>
                  </div>
                </div>

                {/* Other Departments with extras */}
                <div className="border border-gray-100 rounded-xl p-3 bg-white shadow-sm">
                  <h5 className="font-bold text-gray-800 text-sm mb-2">Textile Technology</h5>
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded w-full text-center font-bold">2nd Yr (1 Class)</span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded w-full text-center font-bold">3rd Yr (1 Class)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1 py-1 rounded text-center font-bold border border-emerald-100 truncate">Common Textile Lab</span>
                    <span className="text-[10px] bg-orange-50 text-orange-700 px-1 py-1 rounded text-center font-bold border border-orange-100 truncate">Large Textile Lab</span>
                  </div>
                </div>
                
                <div className="border border-gray-100 rounded-xl p-3 bg-white shadow-sm">
                  <h5 className="font-bold text-gray-800 text-sm mb-2">Architecture</h5>
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded w-full text-center font-bold">2nd Yr (1 Class)</span>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded w-full text-center font-bold">3rd Yr (1 Class)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1 py-1 rounded text-center font-bold border border-emerald-100 truncate">Common Arch Lab</span>
                    <span className="text-[10px] bg-orange-50 text-orange-700 px-1 py-1 rounded text-center font-bold border border-orange-100 truncate">Drawing Room (Shared)</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}



        {/* 9. Academic Calendar */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-800">Academic Calendar</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={14}/> Add Event</button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Real-time Calendar View */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-800">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
                  <div className="flex space-x-2">
                    <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">←</button>
                    <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">→</button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <div key={d} className="text-[10px] font-bold text-gray-400 uppercase">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({length: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()}).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2"></div>
                  ))}
                  {Array.from({length: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}).map((_, i) => {
                    const day = i + 1;
                    const isToday = day === new Date().getDate();
                    return (
                      <div key={day} className={`p-2 rounded-lg text-sm font-bold flex items-center justify-center cursor-pointer transition-colors ${
                        isToday ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-blue-50'
                      }`}>
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Event Listings */}
              <div className="space-y-3">
                {[
                  { title: 'Working Days (Current Sem)', value: '92 Days' },
                  { title: 'Declared Holidays', value: '14 Days' },
                  { title: 'Internal Tests Schedule', value: 'Aug 10 - 14 (Test 1)' },
                  { title: 'Model Exams', value: 'Nov 01 - 08' },
                  { title: 'Semester Exams', value: 'Nov 15 - Dec 05' },
                  { title: 'Results Dates', value: 'Jan 10 (Expected)' },
                  { title: 'College Events', value: 'Sports Day (Sept 20)' },
                ].map((cal, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl shadow-sm hover:border-blue-200 transition-colors cursor-pointer bg-gray-50/50">
                    <span className="text-sm font-bold text-gray-700">{cal.title}</span>
                    <span className="text-xs font-bold bg-white text-gray-500 px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">{cal.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

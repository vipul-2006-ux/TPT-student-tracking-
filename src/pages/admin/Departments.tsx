import { useState } from 'react';
import { Building2, Users, UserCheck, Calendar, BookOpen, BarChart3, Clock, ChevronRight, FileText, X } from 'lucide-react';

const DEPARTMENTS = [
  { id: 'cse', name: 'Computer Engineering', hod: 'Saranya V', faculty: 18, students: 360, attendance: 92, testAvg: 85 },
  { id: 'civil', name: 'Civil Engineering', hod: 'Ramesh K', faculty: 15, students: 240, attendance: 88, testAvg: 78 },
  { id: 'mech', name: 'Mechanical Engineering', hod: 'Senthil Kumar', faculty: 22, students: 480, attendance: 91, testAvg: 81 },
  { id: 'eee', name: 'Electrical & Electronics Engg', hod: 'Kavitha M', faculty: 16, students: 300, attendance: 93, testAvg: 84 },
  { id: 'ece', name: 'Electronics & Communication', hod: 'Prakash R', faculty: 20, students: 420, attendance: 90, testAvg: 82 },
];

export default function Departments() {
  const [selectedDeptId, setSelectedDeptId] = useState('cse');
  const [showTimetable, setShowTimetable] = useState(false);
  
  const selectedDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 overflow-hidden relative">
      
      {/* Sidebar: Department List */}
      <div className="w-full md:w-80 flex flex-col gap-4 shrink-0 h-full overflow-hidden">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm shrink-0">
          <h2 className="text-xl font-bold text-gray-800">Departments</h2>
          <p className="text-xs text-gray-500 mt-1">Select a department to view detailed activities and metrics.</p>
        </div>
        
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-y-auto hide-scrollbar p-3 space-y-2">
          {DEPARTMENTS.map(dept => (
            <button
              key={dept.id}
              onClick={() => setSelectedDeptId(dept.id)}
              className={`w-full text-left p-4 rounded-2xl transition-all border ${
                selectedDeptId === dept.id 
                  ? 'bg-blue-50 border-blue-200 shadow-sm' 
                  : 'bg-white border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`font-bold text-sm ${selectedDeptId === dept.id ? 'text-blue-900' : 'text-gray-800'}`}>
                  {dept.name}
                </span>
                <ChevronRight size={16} className={selectedDeptId === dept.id ? 'text-blue-500' : 'text-gray-300'} />
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400">
                <span className="flex items-center gap-1"><Users size={12} /> {dept.students}</span>
                <span className="flex items-center gap-1"><UserCheck size={12} /> {dept.faculty}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Area: Department Dashboard */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto hide-scrollbar pb-10">
        
        {/* Header Summary */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm shrink-0 flex flex-col md:flex-row justify-between md:items-center gap-4 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Building2 size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedDept.name}</h2>
                <p className="text-sm font-bold text-gray-500">Head of Department: <span className="text-blue-600">{selectedDept.hod}</span></p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 relative z-10">
            <div className="bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100 text-center">
              <div className="text-xl font-black text-gray-800">{selectedDept.students}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase">Students</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100 text-center">
              <div className="text-xl font-black text-gray-800">{selectedDept.faculty}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase">Faculty</div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">

          {/* Test Results */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800 flex items-center gap-2"><BarChart3 size={18} className="text-purple-500"/> Internal Test Results</h3>
              <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-2 py-1 rounded-md">Latest Test</span>
            </div>
            
            <div className="flex items-center justify-center mb-4">
              <div className="text-4xl font-black text-gray-800">{selectedDept.testAvg}%</div>
              <div className="text-xs font-bold text-gray-400 ml-2 mt-2">Department<br/>Average</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="text-xs font-bold text-gray-500">Highest Pass %</div>
                <div className="text-sm font-black text-gray-800 mt-1">III Year - A (94%)</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="text-xs font-bold text-gray-500">Needs Attention</div>
                <div className="text-sm font-black text-red-600 mt-1">II Year - B (68%)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timetable Overview */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2"><Calendar size={18} className="text-blue-500"/> Department Timetable Status</h3>
            <button onClick={() => setShowTimetable(true)} className="text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm">View Full Master Timetable</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['II Year - A', 'II Year - B', 'III Year - A'].map((section, idx) => (
              <div key={idx} className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                  <span className="text-sm font-bold text-gray-800">{section}</span>
                  <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase">Active Now</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-800">Current Period (11:00 AM)</div>
                      <div className="text-[10px] font-bold text-gray-500 mt-0.5">Core Subject • Prof. {idx === 0 ? 'RajaRajeswari' : 'Karthik'}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-400 flex items-center justify-center shrink-0">
                      <FileText size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500">Next Period (12:00 PM)</div>
                      <div className="text-[10px] font-bold text-gray-400 mt-0.5">Lab Session</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Timetable Modal */}
      {showTimetable && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 md:p-10">
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-full flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedDept.name} - Master Timetable</h3>
                <p className="text-xs text-gray-500 mt-1">Full schedule view for active academic years.</p>
              </div>
              <button onClick={() => setShowTimetable(false)} className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-semibold border border-blue-100 flex items-center justify-between">
                <span>Note: I Year timetable module is under development and will be added in a future update.</span>
                <span className="bg-white/50 px-2 py-1 rounded text-xs">Coming Soon</span>
              </div>

              {/* II Year */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">II Year - Schedule</h4>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 font-bold text-gray-600 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3">Day</th>
                        <th className="px-4 py-3">09:00 - 10:00</th>
                        <th className="px-4 py-3">10:00 - 11:00</th>
                        <th className="px-4 py-3">11:15 - 12:15</th>
                        <th className="px-4 py-3">13:00 - 14:00</th>
                        <th className="px-4 py-3">14:00 - 15:00</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <tr key={day} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-bold text-gray-700">{day}</td>
                          <td className="px-4 py-3"><div className="font-semibold text-blue-700">Core I</div><div className="text-[10px] text-gray-500">Ramesh</div></td>
                          <td className="px-4 py-3"><div className="font-semibold text-purple-700">Core II</div><div className="text-[10px] text-gray-500">Sangeetha</div></td>
                          <td className="px-4 py-3"><div className="font-semibold text-emerald-700">Lab A</div><div className="text-[10px] text-gray-500">Staff</div></td>
                          <td className="px-4 py-3"><div className="font-semibold text-orange-700">Elective</div><div className="text-[10px] text-gray-500">Kavitha</div></td>
                          <td className="px-4 py-3"><div className="font-semibold text-gray-700">Library</div><div className="text-[10px] text-gray-500">Self</div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* III Year */}
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">III Year - Schedule</h4>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 font-bold text-gray-600 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3">Day</th>
                        <th className="px-4 py-3">09:00 - 10:00</th>
                        <th className="px-4 py-3">10:00 - 11:00</th>
                        <th className="px-4 py-3">11:15 - 12:15</th>
                        <th className="px-4 py-3">13:00 - 14:00</th>
                        <th className="px-4 py-3">14:00 - 15:00</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <tr key={day} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-bold text-gray-700">{day}</td>
                          <td className="px-4 py-3"><div className="font-semibold text-emerald-700">Lab B</div><div className="text-[10px] text-gray-500">Staff</div></td>
                          <td className="px-4 py-3"><div className="font-semibold text-blue-700">Core III</div><div className="text-[10px] text-gray-500">Saranya</div></td>
                          <td className="px-4 py-3"><div className="font-semibold text-orange-700">Project</div><div className="text-[10px] text-gray-500">Guide</div></td>
                          <td className="px-4 py-3"><div className="font-semibold text-purple-700">Core IV</div><div className="text-[10px] text-gray-500">Prakash</div></td>
                          <td className="px-4 py-3"><div className="font-semibold text-gray-700">Seminar</div><div className="text-[10px] text-gray-500">All</div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end shrink-0">
              <button onClick={() => setShowTimetable(false)} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gray-800 text-white hover:bg-gray-900 transition-colors shadow-sm">
                Close Timetable
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

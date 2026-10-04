import { Users, Building2, GraduationCap, Calendar, BarChart3, TrendingUp, AlertCircle, Pin, Activity, Star, UserCheck, ClipboardList } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto hide-scrollbar pb-10">
      
      {/* 1. COLLEGE OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-3xl font-black text-gray-800">4,250</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Total Students</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users size={24} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-3xl font-black text-gray-800">312</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Total Faculty</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <UserCheck size={24} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-3xl font-black text-gray-800">10</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Departments</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Building2 size={24} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-gray-800 mt-1">2026-27</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Active Academic Year</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Calendar size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 shrink-0">
        
        {/* 2. TODAY'S ATTENDANCE */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2"><ClipboardList size={18} className="text-blue-600"/> Today's Attendance</h3>
            <button className="text-[10px] font-bold text-blue-600 hover:underline">View Report &rarr;</button>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Student Attendance</span>
                <span className="text-xl font-black text-blue-900">92%</span>
              </div>
              <div className="w-full h-2 bg-blue-100 rounded-full mb-3 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-600">
                <span className="text-green-600">Present: 3,910</span>
                <span className="text-red-500">Absent: 340</span>
              </div>
            </div>

            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Faculty Attendance</span>
                <span className="text-xl font-black text-emerald-900">98%</span>
              </div>
              <div className="w-full h-2 bg-emerald-100 rounded-full mb-3 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '98%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-600">
                <span className="text-green-600">Present: 305</span>
                <span className="text-red-500">Absent: 7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 shrink-0">
        {/* 4. DEPARTMENT PERFORMANCE */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2"><BarChart3 size={18} className="text-purple-600"/> Department Performance</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Department</th>
                  <th className="py-3 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Attend %</th>
                  <th className="py-3 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Academic %</th>
                  <th className="py-3 px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Computer Engg', att: '94%', aca: '86%', fb: 4.8 },
                  { name: 'Civil Engg', att: '89%', aca: '78%', fb: 4.2 },
                  { name: 'Mechanical Engg', att: '91%', aca: '81%', fb: 4.3 },
                  { name: 'Electrical & Electronics', att: '92%', aca: '84%', fb: 4.4 },
                  { name: 'Artificial Intelligence', att: '96%', aca: '89%', fb: 4.7 }
                ].map((dept, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2 text-xs font-bold text-gray-700">{dept.name}</td>
                    <td className="py-3 px-2 text-xs font-semibold text-gray-600">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${parseInt(dept.att) > 90 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{dept.att}</span>
                    </td>
                    <td className="py-3 px-2 text-xs font-semibold text-gray-600">{dept.aca}</td>
                    <td className="py-3 px-2 text-xs font-bold text-gray-800 text-right flex items-center justify-end gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500"/> {dept.fb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

import { useState } from 'react';
import { mockStudents } from '../../data/mockData';
import { UserCircle } from 'lucide-react';

export default function Timetable() {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const timeslots = [
    { num: 1, time: '08:45am - 09:35am', isBreak: false },
    { num: 2, time: '09:35am - 10:25am', isBreak: false },
    { num: 'B1', time: '10:25am - 10:35am', isBreak: true, label: 'Break (10 Mins)' },
    { num: 3, time: '10:35am - 11:25am', isBreak: false },
    { num: 4, time: '11:25am - 12:15pm', isBreak: false },
    { num: 'L1', time: '12:15pm - 01:15pm', isBreak: true, label: 'Lunch (1 Hour)' },
    { num: 5, time: '01:15pm - 02:05pm', isBreak: false },
    { num: 6, time: '02:05pm - 02:55pm', isBreak: false },
    { num: 'B2', time: '02:55pm - 03:05pm', isBreak: true, label: 'Break (10 Mins)' },
    { num: 7, time: '03:05pm - 03:55pm', isBreak: false },
    { num: 8, time: '03:55pm - 04:45pm', isBreak: false },
    { num: 9, time: '04:50pm - 05:20pm', isBreak: false },
  ];

  const defaultScheduleData: Record<string, string[]> = {
    'MON': ['Weekly Test', 'AIML', '', 'CHN', 'AIML', '', 'ASC-V', '', 'CHN', ''],
    'TUE': ['CC', 'AIML', '', 'CBT', 'CBT', '', 'SPL-II', 'ASC-V', '', 'Phy Edu & Yoga', ''],
    'WED': ['AIML', 'AIML', '', 'IoT', 'IoT', '', 'INS', 'INS', '', 'LDS', 'Lib', 'Counseling Classes'],
    'THU': ['CHN', 'CHN', '', 'INS', 'CC', '', 'CC Lab', 'CC Lab', '', 'CBT', 'CBT'],
    'FRI': ['CBT', 'AIML', '', 'CHN', 'SPL-II', '', 'CC Lab', 'CC Lab', '', 'IoT', 'Special Counseling'],
    'SAT': ['IoT', 'IoT', '', 'ASC-V', 'ASC-V', '', 'CHN', 'CHN', '', 'SPL-II', 'SPL-II'],
  };

  const [scheduleData, setScheduleData] = useState<Record<string, string[]>>(() => {
    try {
      const stored = localStorage.getItem('department_timetable_iii_year');
      return stored ? JSON.parse(stored) : defaultScheduleData;
    } catch {
      return defaultScheduleData;
    }
  });

  const faculties = [
    { code: '240-075414', subject: 'Cloud Computing', faculty: 'Ms.M.Nandha' },
    { code: '240-075501', subject: 'Artificial Intelligence and Machine Learning', faculty: 'Ms.V.Saranya' },
    { code: '240-075415', subject: 'Internet of Things and Digital Twins', faculty: 'Ms.R.RajaRajeswari / Ms.R.Sangeetha' },
    { code: '240-075416', subject: 'Computer Hardware and Networking', faculty: 'Mr. Sri Murugan' },
    { code: '240-075502', subject: 'Component Based Technology', faculty: 'Ms. R.Sangeetha / Ms.R.RajaRajeswari' },
    { code: '240-075108', subject: 'Innovation and Startup', faculty: 'Ms.V.Saranya / Ms.R.Sangeetha' },
    { code: '240-075605', subject: 'Advanced Skills Certification - V', faculty: 'Ms.M.Nandha' },
    { code: '240-075824', subject: 'Leadership Development Skills-V', faculty: 'Ms.M.Nandha' },
    { code: '240-075825', subject: 'Physical Education and Wellness -V', faculty: 'Ms.M.Nandha' }
  ];

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 overflow-hidden">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0">
        <h2 className="text-2xl font-bold text-gray-800">Weekly Timetable</h2>
        <p className="text-sm text-gray-500">DEPARTMENT OF COMPUTER ENGINEERING - ODD - V Semester (Hall: DJB - 402)</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0 overflow-hidden">
        
        {/* Timetable Grid */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col min-h-0 overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto flex-1 hide-scrollbar p-6">
            <table className="w-full text-center border-collapse min-w-[900px]">
              <thead>
                <tr>
                  <th className="border border-gray-200 bg-blue-900 text-white p-3 rounded-tl-2xl w-24">DAYS</th>
                  {timeslots.map((slot, idx) => (
                    <th key={idx} className={`border border-gray-200 p-2 text-xs ${slot.isBreak ? 'bg-orange-100 text-orange-800 w-8' : 'bg-blue-50 text-blue-900 w-24'}`}>
                      {!slot.isBreak && <div className="font-bold text-[10px] mb-1">{slot.num}</div>}
                      <div className="font-semibold text-[9px] whitespace-nowrap opacity-80">{slot.time}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day, rowIndex) => (
                  <tr key={day}>
                    <td className="border border-gray-200 bg-gray-50 font-bold text-gray-800 p-3">{day}</td>
                    
                    {/* Period 1 */}
                    <td className="border border-gray-200 p-2 text-xs font-bold text-gray-700 bg-white hover:bg-blue-50 transition-colors">{scheduleData[day][0] || '-'}</td>
                    {/* Period 2 */}
                    <td className="border border-gray-200 p-2 text-xs font-bold text-gray-700 bg-white hover:bg-blue-50 transition-colors">{scheduleData[day][1] || '-'}</td>
                    
                    {/* Break 1 */}
                    {rowIndex === 0 && <td rowSpan={6} className="border border-gray-200 bg-orange-50/50 p-2 writing-mode-vertical text-xs font-bold text-orange-600 tracking-widest uppercase">Break (10 mins)</td>}
                    
                    {/* Period 3 & 4 (handling colspans manually for exact look if needed, but doing simple cells for react simplicity) */}
                    <td className="border border-gray-200 p-2 text-xs font-bold text-gray-700 bg-white hover:bg-blue-50 transition-colors">{scheduleData[day][3] || '-'}</td>
                    <td className="border border-gray-200 p-2 text-xs font-bold text-gray-700 bg-white hover:bg-blue-50 transition-colors">{scheduleData[day][4] || '-'}</td>
                    
                    {/* Lunch Break */}
                    {rowIndex === 0 && <td rowSpan={6} className="border border-gray-200 bg-orange-50/50 p-2 writing-mode-vertical text-xs font-bold text-orange-600 tracking-widest uppercase">Lunch (1 Hour)</td>}

                    {/* Period 5 & 6 */}
                    <td className="border border-gray-200 p-2 text-xs font-bold text-gray-700 bg-white hover:bg-blue-50 transition-colors">{scheduleData[day][6] || '-'}</td>
                    <td className="border border-gray-200 p-2 text-xs font-bold text-gray-700 bg-white hover:bg-blue-50 transition-colors">{scheduleData[day][7] || '-'}</td>

                    {/* Break 2 */}
                    {rowIndex === 0 && <td rowSpan={6} className="border border-gray-200 bg-orange-50/50 p-2 writing-mode-vertical text-xs font-bold text-orange-600 tracking-widest uppercase">Break (10 mins)</td>}

                    {/* Period 7, 8, 9 */}
                    <td className="border border-gray-200 p-2 text-[10px] font-bold text-gray-700 bg-white hover:bg-blue-50 transition-colors">{scheduleData[day][9] || '-'}</td>
                    <td className="border border-gray-200 p-2 text-[10px] font-bold text-gray-700 bg-white hover:bg-blue-50 transition-colors">{scheduleData[day][10] || '-'}</td>
                    <td className="border border-gray-200 p-2 text-[9px] font-bold text-gray-700 bg-gray-50/80">{scheduleData[day][11] || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Faculty List */}
        <div className="w-full xl:w-80 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col min-h-0 shrink-0">
          <div className="flex items-center gap-2 mb-4 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
              <UserCircle size={18} />
            </div>
            <h3 className="font-bold text-gray-800">Respective Faculty</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 hide-scrollbar">
            {faculties.map((f, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                <p className="text-[9px] font-bold text-blue-600 uppercase tracking-wider mb-1">{f.code}</p>
                <h4 className="font-bold text-xs text-gray-800 leading-tight mb-2">{f.subject}</h4>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-600 bg-white px-2 py-1.5 rounded-lg border border-gray-100">
                  <UserCircle size={12} className="text-blue-400" />
                  {f.faculty}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

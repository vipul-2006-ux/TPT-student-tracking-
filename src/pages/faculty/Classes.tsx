import { useState, useEffect, useMemo } from 'react';
import { Calendar, Users, Edit3, Save, Clock, BookOpen, AlertCircle } from 'lucide-react';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const timeslots = [
  { num: 1, time: '08:45am - 09:35am', isBreak: false },
  { num: 2, time: '09:35am - 10:25am', isBreak: false },
  { num: 'B1', time: '10:25am - 10:35am', isBreak: true, label: 'Break' },
  { num: 3, time: '10:35am - 11:25am', isBreak: false },
  { num: 4, time: '11:25am - 12:15pm', isBreak: false },
  { num: 'L1', time: '12:15pm - 01:15pm', isBreak: true, label: 'Lunch' },
  { num: 5, time: '01:15pm - 02:05pm', isBreak: false },
  { num: 6, time: '02:05pm - 02:55pm', isBreak: false },
  { num: 'B2', time: '02:55pm - 03:05pm', isBreak: true, label: 'Break' },
  { num: 7, time: '03:05pm - 03:55pm', isBreak: false },
  { num: 8, time: '03:55pm - 04:45pm', isBreak: false },
  { num: 9, time: '04:50pm - 05:20pm', isBreak: false },
];

const defaultIIIYearSchedule: Record<string, string[]> = {
  'MON': ['Weekly Test', 'AIML', '', 'CHN', 'AIML', '', 'ASC-V', '', 'CHN', ''],
  'TUE': ['CC', 'AIML', '', 'CBT', 'CBT', '', 'SPL-II', 'ASC-V', '', 'Phy Edu & Yoga', ''],
  'WED': ['AIML', 'AIML', '', 'IoT', 'IoT', '', 'INS', 'INS', '', 'LDS', 'Lib', 'Counseling Classes'],
  'THU': ['CHN', 'CHN', '', 'INS', 'CC', '', 'CC Lab', 'CC Lab', '', 'CBT', 'CBT'],
  'FRI': ['CBT', 'AIML', '', 'CHN', 'SPL-II', '', 'CC Lab', 'CC Lab', '', 'IoT', 'Special Counseling'],
  'SAT': ['IoT', 'IoT', '', 'ASC-V', 'ASC-V', '', 'CHN', 'CHN', '', 'SPL-II', 'SPL-II'],
};

const defaultIIYearSchedule: Record<string, string[]> = {
  'MON': ['Java', 'RDBMS', '', 'Python', 'Web Dev', '', 'EPT', 'EPT', '', 'Club Activity', 'Club Activity'],
  'TUE': ['RDBMS', 'Python', '', 'Java', 'Java', '', 'Web Dev', 'Web Dev', '', 'PE', 'PE'],
  'WED': ['Web Dev', 'EPT', '', 'RDBMS', 'Python', '', 'Java', 'Java', '', 'LDS', 'LDS'],
  'THU': ['Python', 'Java', '', 'Web Dev', 'EPT', '', 'RDBMS', 'RDBMS', '', 'Club Activity', 'Club Activity'],
  'FRI': ['EPT', 'Web Dev', '', 'Java', 'RDBMS', '', 'Python', 'Python', '', 'LDS', 'LDS'],
  'SAT': ['RDBMS', 'Java', '', 'Python', 'Web Dev', '', 'EPT', 'EPT', '', 'PE', 'PE'],
};

export default function FacultyClasses() {
  const [activeTab, setActiveTab] = useState<'my_schedule' | 'edit_department'>('my_schedule');
  const [activeYear, setActiveYear] = useState<'III_Year' | 'II_Year'>('III_Year');
  
  const [scheduleData, setScheduleData] = useState<Record<string, string[]>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentUser = useMemo(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (stored && stored.role === 'Faculty') return stored;
    } catch {}
    return { name: 'Saranya V', designation: 'HOD', role: 'Faculty' };
  }, []);

  const isHOD = currentUser.designation === 'HOD' || currentUser.name === 'Saranya V';

  // Load schedule when year changes
  useEffect(() => {
    const key = `department_timetable_${activeYear.toLowerCase()}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setScheduleData(JSON.parse(stored));
    } else {
      setScheduleData(activeYear === 'III_Year' ? { ...defaultIIIYearSchedule } : { ...defaultIIYearSchedule });
    }
    setIsEditing(false);
  }, [activeYear]);

  const handleCellChange = (day: string, slotIndex: number, value: string) => {
    setScheduleData(prev => {
      const newSchedule = { ...prev };
      newSchedule[day] = [...newSchedule[day]];
      newSchedule[day][slotIndex] = value;
      return newSchedule;
    });
  };

  const handleSave = () => {
    const key = `department_timetable_${activeYear.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(scheduleData));
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Extract logged in user's subjects (Mocking for now)
  const [myClassesToday, setMyClassesToday] = useState([
    { id: 1, time: '09:35am - 10:25am', subject: 'Artificial Intelligence (AIML)', year: 'III Year', room: 'DJB-402', substitute: null as string | null },
    { id: 2, time: '11:25am - 12:15pm', subject: 'Component Based Tech (CBT)', year: 'III Year', room: 'DJB-402', substitute: null as string | null },
    { id: 3, time: '01:15pm - 02:55pm', subject: 'Lab Session', year: 'II Year', room: 'Lab Complex 2', substitute: null as string | null },
  ]);

  const [substituteModal, setSubstituteModal] = useState<{ isOpen: boolean, classId: number | null }>({ isOpen: false, classId: null });
  const [selectedFaculty, setSelectedFaculty] = useState('');

  const otherFaculties = ['Ms. RajaRajeswari R', 'Ms. Sangeetha R', 'Ms. Nandha M', 'Mr. Sree Murugan U K', 'Ms. Yogamalini P'];

  const handleSubstitute = () => {
    if (substituteModal.classId && selectedFaculty) {
      setMyClassesToday(prev => prev.map(cls => 
        cls.id === substituteModal.classId ? { ...cls, substitute: selectedFaculty } : cls
      ));
      setSubstituteModal({ isOpen: false, classId: null });
      setSelectedFaculty('');
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden relative">
      
      {/* Header & Tabs */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Classes & Timetable</h2>
          <p className="text-sm text-gray-500">Manage your daily schedule and department timetables.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl shrink-0">
          <button 
            onClick={() => setActiveTab('my_schedule')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'my_schedule' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            My Schedule Today
          </button>
          <button 
            onClick={() => setActiveTab('edit_department')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'edit_department' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Department Timetable
          </button>
        </div>
      </div>

      {activeTab === 'my_schedule' && (
        <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myClassesToday.map((cls) => (
              <div key={cls.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
                <div className={`absolute top-0 left-0 w-1 h-full ${cls.substitute ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`${cls.substitute ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'} p-2 rounded-lg`}><Clock size={16} /></div>
                  <span className="font-bold text-gray-700 text-sm">{cls.time}</span>
                </div>
                <h3 className="text-lg font-black text-gray-800 mb-1 leading-tight">{cls.subject}</h3>
                <div className="flex items-center justify-between mt-2 mb-4 text-xs font-semibold text-gray-500">
                  <span className="bg-gray-100 px-2.5 py-1 rounded-md text-gray-700">{cls.year}</span>
                  <span className="flex items-center gap-1"><Users size={14} /> {cls.room}</span>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                  {cls.substitute ? (
                    <div className="flex items-center justify-between bg-orange-50/50 p-2 rounded-lg border border-orange-100">
                      <div>
                        <p className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">Substituted By</p>
                        <p className="text-xs font-bold text-gray-800">{cls.substitute}</p>
                      </div>
                      <button onClick={() => setMyClassesToday(prev => prev.map(c => c.id === cls.id ? { ...c, substitute: null } : c))} className="text-[10px] font-bold text-red-500 hover:underline">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setSubstituteModal({ isOpen: true, classId: cls.id })} className="w-full text-center text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2 rounded-xl transition-colors">
                      Request Substitution
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4 mt-6">
            <AlertCircle className="text-blue-500 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-blue-900">Need to make structural changes?</h4>
              <p className="text-sm text-blue-700/80 mt-1">You can switch to the <b>Department Timetable</b> tab to globally view the timetable for the II Year and III Year students. Only the HOD can edit the master timetable.</p>
            </div>
          </div>
        </div>
      )}

      {/* Substitute Modal Overlay */}
      {substituteModal.isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Request Substitute</h3>
            <p className="text-xs text-gray-500 mb-6">Select a faculty member to hand this class over to for today.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Available Faculty</label>
                <select 
                  value={selectedFaculty} 
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" disabled>Select a teacher...</option>
                  {otherFaculties.map((f, i) => (
                    <option key={i} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => { setSubstituteModal({ isOpen: false, classId: null }); setSelectedFaculty(''); }}
                  className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubstitute}
                  disabled={!selectedFaculty}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm ${selectedFaculty ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20' : 'bg-blue-100 text-blue-400 cursor-not-allowed'}`}
                >
                  Confirm Swap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'edit_department' && (
        <div className="flex-1 flex flex-col min-h-0 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 shrink-0 bg-gray-50/50">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveYear('II_Year')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${activeYear === 'II_Year' ? 'bg-blue-900 border-blue-900 text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                II Year Timetable
              </button>
              <button 
                onClick={() => setActiveYear('III_Year')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${activeYear === 'III_Year' ? 'bg-blue-900 border-blue-900 text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                III Year Timetable
              </button>
            </div>

            <div className="flex items-center gap-3">
              {savedSuccess && <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">Saved Successfully!</span>}
              {isHOD && !isEditing && (
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all">
                  <Edit3 size={16} /> Edit Timetable
                </button>
              )}
              {isHOD && isEditing && (
                <button onClick={handleSave} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all shadow-emerald-500/20">
                  <Save size={16} /> Save Changes
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-auto hide-scrollbar p-6">
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
                    
                    {timeslots.map((slot, colIndex) => {
                      if (slot.isBreak && rowIndex === 0) {
                         return <td key={colIndex} rowSpan={6} className="border border-gray-200 bg-orange-50/50 p-2 writing-mode-vertical text-xs font-bold text-orange-600 tracking-widest uppercase">{slot.label}</td>;
                      } else if (slot.isBreak) {
                         return null; // Handled by rowSpan
                      }
                      
                      // Map the 9 actual non-break slots to the 12 array indices
                      // Slot nums: 1,2,3,4,5,6,7,8,9
                      // Array index map we used earlier: 0,1,3,4,6,7,9,10,11
                      const slotMap: Record<number, number> = { 1:0, 2:1, 3:3, 4:4, 5:6, 6:7, 7:9, 8:10, 9:11 };
                      const dataIndex = slotMap[slot.num as number];
                      const val = scheduleData[day] ? scheduleData[day][dataIndex] : '';

                      return (
                        <td key={colIndex} className={`border border-gray-200 p-1 bg-white ${isEditing ? 'hover:bg-blue-50/50' : 'hover:bg-blue-50'} transition-colors`}>
                          {isEditing ? (
                            <input 
                              type="text" 
                              value={val} 
                              onChange={(e) => handleCellChange(day, dataIndex, e.target.value)}
                              className="w-full text-center text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 rounded p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <span className="text-xs font-bold text-gray-700 block p-2">{val || '-'}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Search, Calendar, User, Clock, AlertCircle, X, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

const rawData = `1. A2407008 - Abhinav Krishna A
2. A2407009 - Abishek R M
3. A2407010 - Abishek Krish M
4. A2407011 - Ajith R
5. A2407012 - Arunkumar R
6. A2407013 - Aswanth S T
7. A2407014 - Azarudhin J
8. A2407015 - Chandru E
9. A2407016 - Chandru M
10. A2407017 - Deekshith P
11. A2407018 - Deepak S
12. A2407019 - Dharnis V
13. A2407020 - Dharshana K G
14. A2407021 - Divya Dharshini S
15. A2407022 - Divyadharshini A
16. A2407023 - Gopika M
17. A2407024 - Gugan SP
18. A2407025 - Guru Prakash M
19. A2407026 - Gurupraja A
20. A2407027 - Hari Balaji K
21. A2407028 - Harish V
22. A2407029 - Ishanth Balakrishnan
23. A2407030 - Jaiakash T
24. A2407031 - Jayanth R
25. A2407032 - Kavin L O
26. A2407033 - Kavin V
27. A2407034 - Kishore V
28. A2407035 - Mathibalan M
29. A2407036 - Meiyarasan B K
30. A2407037 - Mouleeswaran G
31. A2407038 - Mougunth Balaji G
32. A2407039 - Mukilarasan N
33. A2407040 - Nagappa V D M
34. A2407041 - Nandhini A
35. A2407042 - Nithesh G
36. A2407043 - Nithishwar M
37. A2407044 - Parthasarathy M
38. A2407045 - Pooja V
39. A2407046 - Punitha S
40. A2407047 - Raam Prakaash Suresh
41. A2407048 - Ratheesh S U
42. A2407049 - Roza Canisius Abinav S
43. A2407051 - Sabarimalaivasan K A
44. A2407052 - Sabarinathan K
45. A2407053 - Saranya V
46. A2407054 - Sarathi P
47. A2407055 - Sathana S
48. A2407056 - Sivaneswaran A
49. A2407057 - Sree Karthika N
50. A2407058 - Srinivasan R
51. A2407059 - Sudharshini Ragavi K S D
52. A2407060 - Surya K
53. A2407061 - Tamilarasan V
54. A2407062 - Vasanth P G
55. A2407063 - Venkatesh S
56. A2407064 - Vetrivel A R
57. A2407065 - Vidhyassri M K
58. A2407066 - Vipul N M
59. A2407067 - Vishwetha H
60. C2507002 - Kumara Gurubhaharan R
61. C2507003 - Mathibalan R
62. C2507004 - Sakthi P
63. C2507005 - Sriharini C P
64. C2507006 - Tamilvanan S
65. C2507007 - Vibin Vignesh S
66. A2307016 - Dhanush M`;

type LeaveDetail = { date: string, periods: string, type: 'Absent' | 'Half Day' | 'Late' | 'OD' };
type Student = { id: string, name: string, percentage: number, leaveDetails: LeaveDetail[] };

const parseStudents = (): Student[] => {
  return rawData.split('\n').map((line, index) => {
    const match = line.match(/^\d+\.\s*([A-Z0-9]+)\s*-\s*(.+)$/);
    if (!match) return null;
    
    const id = match[1];
    const name = match[2];
    
    // Deterministic random generation for mock data
    let percentage = 100;
    const leaveDetails: LeaveDetail[] = [];
    
    // Distribute some lower percentages to showcase the UI
    if (index % 5 === 0) percentage -= 12;
    if (index % 7 === 0) percentage -= 8;
    if (index % 11 === 0) percentage -= 15;
    if (index % 3 === 0) percentage -= 4;

    if (percentage < 100) leaveDetails.push({ date: '12 Sep 2026', periods: 'All Day', type: 'Absent' });
    if (percentage < 90) leaveDetails.push({ date: '28 Sep 2026', periods: 'Period 3, Period 4', type: 'Half Day' });
    if (percentage < 80) leaveDetails.push({ date: '01 Oct 2026', periods: 'Period 1', type: 'Late' });
    if (percentage < 70) leaveDetails.push({ date: '03 Oct 2026', periods: 'Period 6, Period 7', type: 'OD' });
    
    return { id, name, percentage, leaveDetails };
  }).filter(Boolean) as Student[];
};

const students = parseStudents();

const getColorForPercentage = (pct: number) => {
  if (pct >= 90) return 'text-emerald-500 bg-emerald-50 border-emerald-200';
  if (pct >= 80) return 'text-blue-500 bg-blue-50 border-blue-200';
  if (pct >= 75) return 'text-orange-500 bg-orange-50 border-orange-200';
  return 'text-red-600 bg-red-50 border-red-200';
};

const getProgressBarColor = (pct: number) => {
  if (pct >= 90) return 'bg-emerald-500';
  if (pct >= 80) return 'bg-blue-500';
  if (pct >= 75) return 'bg-orange-500';
  return 'bg-red-500';
};

const getTypeColor = (type: string) => {
  switch(type) {
    case 'Absent': return 'bg-red-100 text-red-600 border-red-200';
    case 'Half Day': return 'bg-orange-100 text-orange-600 border-orange-200';
    case 'Late': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'OD': return 'bg-blue-100 text-blue-600 border-blue-200';
    default: return 'bg-gray-100 text-gray-600';
  }
}

export default function FacultyAttendance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Mark Attendance States
  const [markedSuccess, setMarkedSuccess] = useState(false);
  const [attType, setAttType] = useState('Absent');
  const [selectedPeriods, setSelectedPeriods] = useState<number[]>([]);
  const isFullDay = selectedPeriods.length === 8;
  
  const togglePeriod = (p: number) => {
    if (selectedPeriods.includes(p)) setSelectedPeriods(selectedPeriods.filter(x => x !== p));
    else setSelectedPeriods([...selectedPeriods, p]);
  };
  
  const toggleFullDay = () => {
    if (isFullDay) setSelectedPeriods([]);
    else setSelectedPeriods([1, 2, 3, 4, 5, 6, 7, 8]);
  };
  
  const handleMark = () => {
    setMarkedSuccess(true);
    setTimeout(() => setMarkedSuccess(false), 2000);
    setSelectedPeriods([]);
    setAttType('Absent');
  };

  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden relative">
      
      {/* Header & Search */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Attendance Tracker</h2>
          <p className="text-sm text-gray-500">Monitor overall attendance for {students.length} students.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Grid List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {filteredStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Search size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-bold">No students found</p>
            <p className="text-sm">Try searching a different name or ID.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
            {filteredStudents.map((student) => (
              <div 
                key={student.id} 
                onClick={() => setSelectedStudent(student)}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="font-bold text-gray-800 text-sm truncate group-hover:text-blue-600 transition-colors">{student.name}</h3>
                  <p className="text-xs font-semibold text-gray-500 mb-2">{student.id}</p>
                  
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getProgressBarColor(student.percentage)} rounded-full transition-all duration-1000`}
                      style={{ width: `${student.percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${getColorForPercentage(student.percentage)}`}>
                  <span className="font-black text-sm">{student.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal Dialog Box */}
      {selectedStudent && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md transition-opacity" onClick={() => setSelectedStudent(null)}></div>
          
          <div className="relative w-full max-w-xl bg-white max-h-[75vh] rounded-[2.5rem] shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-4 bg-white flex flex-col items-center text-center shrink-0 border-b border-gray-100">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm -mt-12">
                <User size={24} />
              </div>
              <h2 className="text-xl font-black text-gray-800 leading-tight mb-1">{selectedStudent.name}</h2>
              <p className="text-sm font-semibold text-gray-500">{selectedStudent.id}</p>
            </div>
            
            <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-6">
              
              {/* Overall Percentage Card */}
              <div className={`p-5 rounded-2xl border flex items-center justify-between shadow-sm ${getColorForPercentage(selectedStudent.percentage)} bg-opacity-30`}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Overall Attendance</p>
                  <h3 className="text-3xl font-black">{selectedStudent.percentage}%</h3>
                </div>
                {selectedStudent.percentage >= 75 ? (
                  <CheckCircle2 size={40} className="opacity-50" />
                ) : (
                  <AlertCircle size={40} className="opacity-50" />
                )}
              </div>

              {/* Mark Attendance Today Section */}
              <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-blue-500" /> Mark Today's Attendance
                  </h4>
                  {markedSuccess && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Marked!</span>}
                </div>
                
                <div className="flex gap-4 mb-5">
                  <label className="flex items-center gap-1.5 text-sm font-bold cursor-pointer">
                    <input type="radio" name="att_type" checked={attType === 'Absent'} onChange={() => setAttType('Absent')} className="w-4 h-4 text-red-600 focus:ring-red-500" /> <span className="text-red-700">Absent</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-sm font-bold cursor-pointer">
                    <input type="radio" name="att_type" checked={attType === 'OD'} onChange={() => setAttType('OD')} className="w-4 h-4 text-blue-600 focus:ring-blue-500" /> <span className="text-blue-700">OD</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-sm font-bold cursor-pointer">
                    <input type="radio" name="att_type" checked={attType === 'Late'} onChange={() => setAttType('Late')} className="w-4 h-4 text-yellow-600 focus:ring-yellow-500" /> <span className="text-yellow-700">Late</span>
                  </label>
                </div>

                <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="text-[10px] font-black text-gray-500 tracking-wider">SELECT PERIODS</span>
                  <label className="flex items-center gap-1.5 text-xs font-bold cursor-pointer text-blue-600 hover:text-blue-700">
                    <input type="checkbox" checked={isFullDay} onChange={toggleFullDay} className="rounded" /> Full Day
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(p => (
                    <label key={p} className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 p-2 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors">
                      <input type="checkbox" checked={selectedPeriods.includes(p)} onChange={() => togglePeriod(p)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /> Period {p}
                    </label>
                  ))}
                </div>

                <button 
                  onClick={handleMark}
                  disabled={selectedPeriods.length === 0}
                  className={`w-full font-bold py-2.5 rounded-xl shadow-sm transition-all text-sm ${selectedPeriods.length > 0 ? 'bg-blue-900 hover:bg-blue-800 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  Confirm & Mark
                </button>
              </div>

              {/* Leave Details List */}
              <div>
                <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
                  <FileText size={16} className="text-blue-500" /> Leave & Absence History
                </h4>
                
                {selectedStudent.leaveDetails.length === 0 ? (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
                    <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2" />
                    <p className="font-bold text-emerald-800">Perfect Attendance!</p>
                    <p className="text-xs text-emerald-600 mt-1">This student has not taken any leaves.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedStudent.leaveDetails.map((leave, i) => (
                      <div key={i} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-start gap-4 hover:border-blue-200 transition-colors">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100">
                          <Calendar size={18} className="text-gray-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-bold text-sm text-gray-800">{leave.date}</p>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${getTypeColor(leave.type)}`}>
                              {leave.type}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                            <Clock size={12} /> {leave.periods}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-full transition-colors"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

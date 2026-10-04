import { useState, useMemo } from 'react';
import { Search, Download, Plus, AlertCircle, Edit2, CheckCircle2, FileSpreadsheet } from 'lucide-react';

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

const secondYearSubjects = [
  "Java Programming", "RDBMS", "Python Programming", 
  "E-Publishing Tools", "Web Development"
];

const thirdYearSubjects = [
  "Cloud Computing", "AI & ML", "CBT", 
  "CHN", "IOT", "Innovation & Start-up"
];

const secondYearSlipTests = [
  "Java (Sep 4 - Mon)", "Java (Sep 11 - Mon)", 
  "Python (Oct 2 - Mon)", "Python (Oct 9 - Mon)"
];

const thirdYearSlipTests = [
  "Cloud Computing (Sep 4 - Mon)", "Cloud Computing (Sep 11 - Mon)", 
  "AI & ML (Oct 2 - Mon)", "AI & ML (Oct 9 - Mon)"
];

const nonAcademicSubjects = ["Club Activity", "Leadership Skills", "Physical Education", "Naan Mudhalvan", "NM"];

type Exam = {
  id: string;
  name: string;
  isEditable: boolean;
  hideTotals?: boolean;
  subjects: string[];
};

const defaultExams: Exam[] = [
  { id: '1', name: 'Second Year Final Marks', isEditable: false, subjects: secondYearSubjects },
  { id: '2', name: 'Third Year - Internal 1 (Upcoming)', isEditable: true, subjects: thirdYearSubjects },
  { id: '3', name: 'Second Year Slip Tests', isEditable: true, subjects: secondYearSlipTests },
  { id: '4', name: 'Third Year Slip Tests', isEditable: true, subjects: thirdYearSlipTests }
];

const getSeededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return Math.floor((x - Math.floor(x)) * 61) + 40; 
};

type ResultRecord = {
  id: string;
  name: string;
  marks: Record<string, number | string>;
};

const generateInitialMarks = (exam: Exam): ResultRecord[] => {
  return rawData.split('\n').map((line, index) => {
    const match = line.match(/\d+\.\s+([A-Z0-9]+)\s+-\s+(.+)/);
    const id = match ? match[1] : '';
    const name = match ? match[2] : line;
    const marks: Record<string, number | string> = {};
    
    exam.subjects.forEach((sub, i) => {
      marks[sub] = exam.isEditable ? '' : getSeededRandom(index * 10 + i);
    });

    return { id, name, marks };
  });
};

export default function FacultyResults() {
  const [exams, setExams] = useState<Exam[]>(defaultExams);
  const [selectedExamId, setSelectedExamId] = useState<string>(defaultExams[0].id);
  
  const [examDataStore, setExamDataStore] = useState<Record<string, ResultRecord[]>>(() => {
    const store: Record<string, ResultRecord[]> = {};
    defaultExams.forEach(exam => {
      store[exam.id] = generateInitialMarks(exam);
    });
    return store;
  });

  const [searchTerm, setSearchTerm] = useState('');
  
  const currentExam = exams.find(e => e.id === selectedExamId)!;
  const currentStudents = examDataStore[selectedExamId] || [];

  const filteredStudents = useMemo(() => {
    if (!searchTerm) return currentStudents;
    const lowerSearch = searchTerm.toLowerCase();
    return currentStudents.filter(s => 
      s.name.toLowerCase().includes(lowerSearch) || 
      s.id.toLowerCase().includes(lowerSearch)
    );
  }, [currentStudents, searchTerm]);

  const toggleEditMode = () => {
    setExams(prev => prev.map(e => 
      e.id === selectedExamId ? { ...e, isEditable: !e.isEditable } : e
    ));
  };

  const addNewSubject = () => {
    const subjectName = window.prompt("Enter new subject or exam name (e.g., 'Cloud Computing - Oct 9'):");
    if (!subjectName || currentExam.subjects.includes(subjectName)) return;

    // Add subject to exam definition
    setExams(prev => prev.map(e => 
      e.id === selectedExamId ? { ...e, subjects: [...e.subjects, subjectName] } : e
    ));

    // Add empty mark to all students for this new subject
    setExamDataStore(prev => {
      const updatedExam = prev[selectedExamId].map(student => ({
        ...student,
        marks: { ...student.marks, [subjectName]: '' }
      }));
      return { ...prev, [selectedExamId]: updatedExam };
    });
  };

  const deleteSubject = (subjectName: string) => {
    if (!window.confirm(`Are you sure you want to delete the column "${subjectName}"? This will hide all marks for this subject.`)) return;
    
    setExams(prev => prev.map(e => 
      e.id === selectedExamId ? { ...e, subjects: e.subjects.filter(s => s !== subjectName) } : e
    ));
    
    setExamDataStore(prev => {
      const updatedExam = prev[selectedExamId].map(student => {
        const newMarks = { ...student.marks };
        delete newMarks[subjectName];
        return { ...student, marks: newMarks };
      });
      return { ...prev, [selectedExamId]: updatedExam };
    });
  };

  const handleMarkChange = (studentId: string, subject: string, value: string) => {
    if (!currentExam.isEditable) return;
    
    let val: number | string = '';
    const upperVal = value.toUpperCase().trim();
    
    if (upperVal === 'A' || upperVal === 'AB' || upperVal === 'ABSENT') {
      val = 'AB';
    } else if (value !== '') {
      val = Math.min(100, Math.max(0, parseInt(value) || 0));
    }
    
    setExamDataStore(prev => {
      const updatedExam = prev[selectedExamId].map(student => {
        if (student.id === studentId) {
          return { ...student, marks: { ...student.marks, [subject]: val } };
        }
        return student;
      });
      return { ...prev, [selectedExamId]: updatedExam };
    });
  };

  const handleExport = () => {
    const headers = ['Student ID', 'Student Name', ...currentExam.subjects];
    
    const rows = currentStudents.map(s => {
      return [
        s.id,
        s.name,
        ...currentExam.subjects.map(sub => s.marks[sub])
      ];
    });

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${currentExam.name.replace(/ /g, '_')}_Results.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Test Results Master</h2>
          <p className="text-sm text-gray-500">View past marks or enter marks for upcoming exams.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select 
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="bg-blue-50/50 border border-blue-100 text-blue-900 font-bold rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none min-w-[200px]"
          >
            {exams.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
          
          <button onClick={handleExport} className="flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-3 rounded-2xl text-sm font-bold transition-all shadow-md shadow-emerald-500/20">
            <FileSpreadsheet size={18} /> Export
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="shrink-0 flex flex-wrap items-center justify-between gap-4">
         <div className="relative flex-1 min-w-[250px] max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search student..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          {currentExam.isEditable && (
            <button 
              onClick={addNewSubject}
              className="flex items-center gap-2 text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              <Plus size={16} /> Add Column
            </button>
          )}
          {currentExam.isEditable ? (
            <button 
              onClick={toggleEditMode}
              className="flex items-center gap-2 text-sm font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              <Edit2 size={16} /> Editing Enabled
            </button>
          ) : (
            <button 
              onClick={toggleEditMode}
              className="flex items-center gap-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              <Edit2 size={16} /> Enable Editing
            </button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto h-full hide-scrollbar">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-gray-50/80 sticky top-0 z-20 shadow-sm">
                <th className="px-6 py-4 font-bold text-gray-600 text-sm border-b border-gray-200 sticky left-0 bg-gray-50/95 backdrop-blur-sm z-30">
                  Student Name & ID
                </th>
                {currentExam.subjects.map(sub => (
                  <th key={sub} className="px-4 py-4 font-bold text-gray-500 text-xs border-b border-gray-200 text-center uppercase tracking-wider min-w-[120px] group relative">
                    {sub}
                    {currentExam.isEditable && (
                      <button 
                        onClick={() => deleteSubject(sub)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                        title="Delete Column"
                      >
                        <span className="text-[10px] font-bold">X</span>
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => {
                return (
                  <tr key={student.id} className="hover:bg-blue-50/30 transition-colors group">
                    
                    {/* Sticky Student Column */}
                    <td className="px-6 py-3 sticky left-0 bg-white group-hover:bg-blue-50/30 transition-colors border-r border-gray-50 z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 text-sm truncate max-w-[200px]">{student.name}</div>
                          <div className="text-[11px] font-semibold text-gray-400">{student.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Subject Marks Columns */}
                    {currentExam.subjects.map(sub => {
                      const mark = student.marks[sub];
                      const isFail = mark !== '' && (mark as number) < 50;
                      
                      return (
                        <td key={sub} className="px-4 py-3 text-center">
                          {currentExam.isEditable ? (
                            <input 
                              type="text"
                              value={mark}
                              onChange={(e) => handleMarkChange(student.id, sub, e.target.value)}
                              className={`w-16 text-center py-1.5 rounded-lg text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 border transition-all ${
                                isFail ? 'bg-red-50 text-red-600 border-red-200 focus:border-red-400' : 
                                mark === 'AB' ? 'bg-orange-50 text-orange-600 border-orange-200 focus:border-orange-400' :
                                mark === '' ? 'bg-gray-50 text-gray-700 border-gray-200' : 'bg-white text-gray-800 border-gray-200'
                              }`}
                              placeholder="-"
                            />
                          ) : (
                            <span className={`inline-block px-3 py-1.5 rounded-lg text-sm font-bold ${
                              mark === 'AB' ? 'bg-orange-50 text-orange-600' :
                              isFail ? 'bg-red-50 text-red-600' : 'text-gray-700'
                            }`}>
                              {mark}
                            </span>
                          )}
                        </td>
                      );
                    })}

                  </tr>
                );
              })}
              
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={currentExam.subjects.length + 1} className="px-6 py-12 text-center text-gray-400">
                    <AlertCircle size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-bold text-gray-500">No students found</p>
                    <p className="text-sm">Try adjusting your search query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

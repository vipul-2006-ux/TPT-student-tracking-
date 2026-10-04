import { useState, useMemo } from 'react';
import { Plus, Edit2, Trash2, Calendar, BookOpen, Users, CheckCircle2, X, AlertCircle } from 'lucide-react';

const studentDataRaw = `1. A2407008 - Abhinav Krishna A
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

type Student = { id: string, name: string };
const studentsList: Student[] = studentDataRaw.split('\n').map((line) => {
  const match = line.match(/^\d+\.\s*([A-Z0-9]+)\s*-\s*(.+)$/);
  return match ? { id: match[1], name: match[2] } : null;
}).filter(Boolean) as Student[];

type Assignment = {
  id: string;
  title: string;
  subject: string;
  year: string;
  deadline: string;
  status: 'Active' | 'Closed';
};

const initialAssignments: Assignment[] = [
  { id: '1', title: 'Inheritance & Polymorphism', subject: 'Java Programming', year: 'II Year', deadline: '2026-10-15', status: 'Active' },
  { id: '2', title: 'Normalization Forms (1NF, 2NF, 3NF)', subject: 'RDBMS', year: 'II Year', deadline: '2026-10-10', status: 'Active' },
  { id: '3', title: 'Responsive CSS Grid Layouts', subject: 'Web Development', year: 'II Year', deadline: '2026-10-12', status: 'Active' },
  { id: '4', title: 'Web Data Scraping Tool', subject: 'Python Programming', year: 'II Year', deadline: '2026-10-20', status: 'Active' },
  { id: '5', title: 'Creating a Digital Brochure', subject: 'E-Publishing Tools', year: 'II Year', deadline: '2026-10-08', status: 'Closed' },
  { id: '6', title: 'Essay on Time Management', subject: 'Leadership Skills', year: 'II Year', deadline: '2026-10-05', status: 'Closed' },
  { id: '7', title: 'Exception Handling Basics', subject: 'Java Programming', year: 'II Year', deadline: '2026-10-25', status: 'Active' },
  { id: '8', title: 'Interactive JavaScript Quiz App', subject: 'Web Development', year: 'II Year', deadline: '2026-10-22', status: 'Active' },
  { id: '9', title: 'Complex SQL Join Queries', subject: 'RDBMS', year: 'II Year', deadline: '2026-10-18', status: 'Active' },
  { id: '10', title: 'REST API Integration Script', subject: 'Python Programming', year: 'II Year', deadline: '2026-10-28', status: 'Active' },
];

export default function FacultyAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Submission View State
  const [viewAssignment, setViewAssignment] = useState<Assignment | null>(null);
  const [submissionTab, setSubmissionTab] = useState<'completed' | 'pending'>('completed');

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('II Year');
  const [deadline, setDeadline] = useState('');

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setSubject('Java Programming');
    setYear('II Year');
    setDeadline('');
    setModalOpen(true);
  };

  const openEditModal = (assignment: Assignment) => {
    setEditingId(assignment.id);
    setTitle(assignment.title);
    setSubject(assignment.subject);
    setYear(assignment.year);
    setDeadline(assignment.deadline);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if(window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleSave = () => {
    if (!title || !subject || !deadline) return;

    if (editingId) {
      setAssignments(prev => prev.map(a => 
        a.id === editingId ? { ...a, title, subject, year, deadline } : a
      ));
    } else {
      const newAssignment: Assignment = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        subject,
        year,
        deadline,
        status: 'Active'
      };
      setAssignments([newAssignment, ...assignments]);
    }
    setModalOpen(false);
  };

  // Deterministically split students for a given assignment
  const getSubmissionStats = (assignment: Assignment) => {
    // Generate a pseudo-random seed from the ID
    const seed = parseInt(assignment.id, 36) || 1;
    
    // If closed, everyone submitted. Otherwise some subset.
    const completed: Student[] = [];
    const pending: Student[] = [];
    
    studentsList.forEach((s, idx) => {
      if (assignment.status === 'Closed') {
        completed.push(s);
      } else {
        // Roughly 60% completion rate varies by assignment
        if ((idx + seed) % 5 <= 2) {
          completed.push(s);
        } else {
          pending.push(s);
        }
      }
    });

    return { completed, pending };
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Assignment Management</h2>
          <p className="text-sm text-gray-500">Create, edit, and track the {assignments.length} assignments given to students this year.</p>
        </div>
        
        <button onClick={openCreateModal} className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-900/20 transition-all">
          <Plus size={18} /> New Assignment
        </button>
      </div>

      {/* Grid List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10">
          {assignments.map((assignment) => {
            const stats = getSubmissionStats(assignment);
            const progress = (stats.completed.length / studentsList.length) * 100;
            
            return (
              <div 
                key={assignment.id} 
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('button')) return;
                  setViewAssignment(assignment);
                  setSubmissionTab('completed');
                }}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all relative flex flex-col cursor-pointer group"
              >
                
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${assignment.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                    {assignment.status}
                  </span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(assignment)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(assignment.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="font-black text-gray-800 text-lg leading-tight mb-2 group-hover:text-blue-700 transition-colors">{assignment.title}</h3>
                
                <div className="space-y-2 mt-auto mb-4">
                  <p className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                    <BookOpen size={14} className="text-gray-400" /> {assignment.subject}
                  </p>
                  <p className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" /> Deadline: <span className="text-red-500">{assignment.deadline}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-2">
                    <div className={`h-full ${assignment.status === 'Active' ? 'bg-blue-500' : 'bg-gray-400'} rounded-full transition-all`} style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 flex justify-between">
                    <span>{stats.completed.length}/{studentsList.length} Submitted</span>
                    <span className="text-blue-600">View Details &rarr;</span>
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* View Submissions Modal */}
      {viewAssignment && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md transition-opacity" onClick={() => setViewAssignment(null)}></div>
          
          <div className="relative w-full max-w-xl bg-white max-h-[75vh] rounded-[2.5rem] shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-4 bg-white flex flex-col items-center text-center shrink-0 border-b border-gray-100">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm -mt-12">
                <BookOpen size={24} />
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 ${viewAssignment.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
                {viewAssignment.status}
              </span>
              <h2 className="text-xl font-black text-gray-800 leading-tight mb-1">{viewAssignment.title}</h2>
              <span className="text-xs font-bold text-gray-500">{viewAssignment.subject}</span>
            </div>
            
            {/* Tabs */}
            <div className="flex bg-white border-b border-gray-100 shrink-0">
              <button 
                onClick={() => setSubmissionTab('completed')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${submissionTab === 'completed' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                Completed ({getSubmissionStats(viewAssignment).completed.length})
              </button>
              <button 
                onClick={() => setSubmissionTab('pending')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${submissionTab === 'pending' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
              >
                Pending ({getSubmissionStats(viewAssignment).pending.length})
              </button>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar p-4 bg-gray-50/50">
              {submissionTab === 'completed' ? (
                <div className="space-y-2">
                  {getSubmissionStats(viewAssignment).completed.length === 0 && <p className="text-sm text-center p-4 text-gray-500">No students have submitted yet.</p>}
                  {getSubmissionStats(viewAssignment).completed.map(student => (
                    <div key={student.id} className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-800 truncate">{student.name}</h4>
                        <p className="text-xs text-gray-500 font-semibold">{student.id}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Submitted</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {getSubmissionStats(viewAssignment).pending.length === 0 && <p className="text-sm text-center p-4 text-gray-500">All students have submitted this assignment!</p>}
                  {getSubmissionStats(viewAssignment).pending.map(student => (
                    <div key={student.id} className="bg-white p-3 rounded-xl border border-orange-100 shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                        <AlertCircle size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-800 truncate">{student.name}</h4>
                        <p className="text-xs text-gray-500 font-semibold">{student.id}</p>
                      </div>
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">Pending</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <button 
                onClick={() => setViewAssignment(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-full transition-colors"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Create/Edit Modal Dialog */}
      {modalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md transition-opacity" onClick={() => setModalOpen(false)}></div>
          
          <div className="relative w-full max-w-xl bg-white max-h-[75vh] overflow-y-auto hide-scrollbar rounded-[2.5rem] p-8 shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm -mt-12">
              {editingId ? <Edit2 size={24} /> : <Plus size={24} />}
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">{editingId ? 'Edit Assignment' : 'New Assignment'}</h2>
              <p className="text-sm text-gray-500 mt-2 font-medium">Fill in the details for this assignment below.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Assignment Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-semibold text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="e.g. Complex SQL Queries"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Subject</label>
                  <select 
                    value={subject} 
                    onChange={e => setSubject(e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                  >
                    <option value="Java Programming">Java</option>
                    <option value="RDBMS">RDBMS</option>
                    <option value="Python Programming">Python</option>
                    <option value="Web Development">Web Dev</option>
                    <option value="E-Publishing Tools">EPT</option>
                    <option value="Leadership Skills">LDS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Year</label>
                  <select 
                    value={year} 
                    onChange={e => setYear(e.target.value)}
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                  >
                    <option value="II Year">II Year</option>
                    <option value="III Year">III Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Deadline Date</label>
                <input 
                  type="date" 
                  value={deadline} 
                  onChange={e => setDeadline(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-semibold text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setModalOpen(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2">
                  <X size={16} /> Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={!title || !deadline}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} /> {editingId ? 'Save' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

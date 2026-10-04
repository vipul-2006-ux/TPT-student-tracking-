import { useState } from 'react';
import { Calendar, CheckCircle2, Send, Clock } from 'lucide-react';

type Assignment = {
  id: number;
  question: string;
  dueDate: string;
  status: 'pending' | 'submitted';
  subject: string;
  submittedDate?: string;
};

const initialAssignmentsData: Assignment[] = [
  { id: 1, question: "Explain the concept, working principle, and characteristics of Breadth-First Search (BFS) and Uniform Cost Search (UCS) with suitable examples.", dueDate: "06-10-2026", status: "pending", subject: "Artificial Intelligence" },
  { id: 2, question: "Explain the Iterative Deepening Depth-First Search (IDDFS) algorithm with a suitable example. Discuss its working, advantages, and limitations.", dueDate: "08-10-2026", status: "pending", subject: "Artificial Intelligence" },
  { id: 3, question: "Explain the concept and working of Local Beam Search with a suitable example. Discuss its advantages and limitations.", dueDate: "10-10-2026", status: "pending", subject: "Artificial Intelligence" },
  { id: 4, question: "Explain how search is performed in partially observable environments. Describe the working process with a suitable example.", dueDate: "12-10-2026", status: "pending", subject: "Artificial Intelligence" },
  { id: 5, question: "Explain Reinforcement Learning in detail. Describe its components, working process, types, and applications with suitable examples.", dueDate: "14-10-2026", status: "pending", subject: "Artificial Intelligence" },
  { id: 6, question: "Explain the K-Nearest Neighbours (K-NN) algorithm in detail with a suitable example. Describe its working steps, advantages, and limitations.", dueDate: "16-10-2026", status: "pending", subject: "Machine Learning" },
  { id: 7, question: "Explain how Machine Learning is used in Online Fraud Detection. Describe the working process and list the important Machine Learning tools used for fraud detection.", dueDate: "18-10-2026", status: "pending", subject: "Machine Learning" },
  { id: 8, question: "Explain how Machine Learning is used in Product Recommendation Systems with a suitable example. Describe the working process and recommendation techniques.", dueDate: "20-10-2026", status: "pending", subject: "Machine Learning" },
  { id: 9, question: "Explain Generative Moment Matching Networks (GMMNs) in detail. Describe their architecture, working principle, training process, and applications.", dueDate: "22-10-2026", status: "pending", subject: "Machine Learning" },
  { id: 10, question: "Explain Neural Autoregressive Networks in detail. Describe their architecture, working principle, training process, and applications with suitable examples.", dueDate: "24-10-2026", status: "pending", subject: "Machine Learning" },
];

export default function Assignments() {
  const [filter, setFilter] = useState('all');
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignmentsData);

  const handleSubmitWork = (id: number) => {
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === id 
          ? { ...assignment, status: 'submitted', submittedDate: todayStr } 
          : assignment
      )
    );
  };

  const filteredAssignments = assignments.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col gap-6 overflow-hidden">
      
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
          <p className="text-sm text-gray-500 mt-1">View and manage your pending and completed assignments.</p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${filter === 'all' ? 'bg-blue-900 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All Tasks
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${filter === 'pending' ? 'bg-orange-500 text-white shadow-md' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('submitted')}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${filter === 'submitted' ? 'bg-green-500 text-white shadow-md' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
          >
            Submitted
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="grid grid-cols-12 gap-4 px-8 py-4 border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0">
          <div className="col-span-1 text-center">No.</div>
          <div className="col-span-7">Assignment Question</div>
          <div className="col-span-4 text-right">Deadline / Status</div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
          {filteredAssignments.map((item) => (
            <div key={item.id} className={`grid grid-cols-12 gap-4 p-4 rounded-2xl border transition-all items-center ${
              item.status === 'submitted' 
                ? 'bg-green-50/30 border-green-100 opacity-90' 
                : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm cursor-pointer group'
            }`}>
              
              <div className="col-span-1 flex justify-center">
                <div className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-sm transition-colors ${
                  item.status === 'submitted' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-50 text-blue-900 group-hover:bg-blue-900 group-hover:text-white'
                }`}>
                  {item.id}
                </div>
              </div>

              <div className="col-span-7 pr-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    item.status === 'submitted' 
                      ? 'text-green-700 bg-green-100' 
                      : 'text-blue-600 bg-blue-50'
                  }`}>
                    {item.subject}
                  </span>
                  {item.status === 'submitted' && (
                    <span className="text-[10px] font-bold text-green-700 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Sent to Faculty
                    </span>
                  )}
                </div>
                <h3 className={`text-sm font-semibold leading-snug transition-colors ${
                  item.status === 'submitted' 
                    ? 'text-gray-500 line-through' 
                    : 'text-gray-800 group-hover:text-blue-900'
                }`}>
                  {item.question}
                </h3>
              </div>

              <div className="col-span-4 flex flex-col items-end justify-center gap-2">
                {item.status === 'submitted' ? (
                  <>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100 w-full max-w-[150px] justify-center">
                      <CheckCircle2 size={14} /> Submitted: {item.submittedDate}
                    </div>
                    <button 
                      disabled
                      className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-green-700 bg-green-100 px-4 py-1.5 rounded-lg w-full max-w-[150px] text-center cursor-default"
                    >
                      <Clock size={12} /> Under Review
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 w-full max-w-[150px] justify-center">
                      <Calendar size={14} className="text-orange-500" />
                      Due: {item.dueDate}
                    </div>
                    <button 
                      onClick={() => handleSubmitWork(item.id)}
                      className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-white bg-blue-900 hover:bg-blue-800 px-4 py-1.5 rounded-lg shadow-sm transition-transform active:scale-95 w-full max-w-[150px] text-center"
                    >
                      <Send size={12} /> Submit Work
                    </button>
                  </>
                )}
              </div>

            </div>
          ))}
          {filteredAssignments.length === 0 && (
            <div className="p-8 text-center text-gray-500 font-semibold bg-gray-50 rounded-2xl border border-gray-100">
              No assignments found in this category.
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

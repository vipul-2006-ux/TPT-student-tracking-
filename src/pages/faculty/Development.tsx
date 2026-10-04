import { useState, useMemo } from 'react';
import { Award, BookOpen, GraduationCap, FileText, Plus, Target, CheckCircle2, Clock, Check, X, Laptop, Presentation, Briefcase, FileBadge } from 'lucide-react';

const mockDevelopments = [
  { 
    id: 1, 
    faculty: 'RajaRajeswari R',
    type: 'Workshop', 
    title: 'Advanced AI & Machine Learning Workflows', 
    organization: 'IIT Madras', 
    date: 'Sep 15, 2026', 
    status: 'Completed',
    approvalStatus: 'Approved'
  },
  { 
    id: 2, 
    faculty: 'RajaRajeswari R',
    type: 'Publications', 
    title: 'Cloud Optimization Strategies for Academic Portals', 
    organization: 'IEEE International Conference', 
    date: 'Oct 02, 2026', 
    status: 'Upcoming',
    approvalStatus: 'Approved'
  },
  { 
    id: 3, 
    faculty: 'Sangeetha R',
    type: 'Conference', 
    title: 'Modern Web Architectures (React & Vite)', 
    organization: 'Internal Development Team', 
    date: 'Aug 20, 2026', 
    status: 'Completed',
    approvalStatus: 'Pending'
  },
  { 
    id: 4, 
    faculty: 'RajaRajeswari R',
    type: 'Certificate', 
    title: 'AWS Certified Solutions Architect', 
    organization: 'Amazon Web Services', 
    date: 'Oct 15, 2026', 
    status: 'Ongoing',
    approvalStatus: 'Pending'
  },
  { 
    id: 5, 
    faculty: 'Saranya V',
    type: 'Project', 
    title: 'Student Analytics Dashboard API', 
    organization: 'College Internal Project', 
    date: 'Nov 01, 2026', 
    status: 'Ongoing',
    approvalStatus: 'Approved' // HOD doesn't need approval for their own
  }
];

const categoryIcons: Record<string, any> = {
  'Workshop': BookOpen,
  'Conference': Presentation,
  'Certificate': Award,
  'Publications': FileText,
  'Online Course': Laptop,
  'Project': Briefcase
};

const categoryColors: Record<string, string> = {
  'Workshop': 'bg-purple-100 text-purple-700',
  'Conference': 'bg-pink-100 text-pink-700',
  'Certificate': 'bg-amber-100 text-amber-700',
  'Publications': 'bg-blue-100 text-blue-700',
  'Online Course': 'bg-indigo-100 text-indigo-700',
  'Project': 'bg-emerald-100 text-emerald-700'
};

export default function FacultyDevelopment() {
  const [developments, setDevelopments] = useState(mockDevelopments);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New Record Form State
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newType, setNewType] = useState('Workshop');
  const [newStatus, setNewStatus] = useState('Completed');

  const currentUser = useMemo(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (stored && stored.role === 'Faculty') return stored;
    } catch {}
    return { name: 'Saranya V', designation: 'HOD', role: 'Faculty' };
  }, []);

  const isHOD = currentUser.designation === 'HOD' || currentUser.name === 'Saranya V';

  const myDevelopments = developments.filter(d => d.faculty === currentUser.name);
  const pendingApprovals = developments.filter(d => d.approvalStatus === 'Pending' && d.faculty !== currentUser.name);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = {
      id: Date.now(),
      faculty: currentUser.name,
      type: newType,
      title: newTitle,
      organization: newOrg,
      date: newDate || new Date().toLocaleDateString(),
      status: newStatus,
      approvalStatus: isHOD ? 'Approved' : 'Pending'
    };
    setDevelopments([newRecord, ...developments]);
    setShowAddModal(false);
    setNewTitle('');
    setNewOrg('');
    setNewDate('');
  };

  const handleApprove = (id: number) => {
    setDevelopments(prev => prev.map(d => d.id === id ? { ...d, approvalStatus: 'Approved' } : d));
  };

  const handleReject = (id: number) => {
    setDevelopments(prev => prev.map(d => d.id === id ? { ...d, approvalStatus: 'Rejected' } : d));
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Faculty Development</h2>
          <p className="text-sm text-gray-500">Track and manage your professional growth and departmental records.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-5 py-3 rounded-2xl text-sm font-bold transition-all shadow-md shadow-blue-500/20 w-full md:w-auto justify-center"
        >
          <Plus size={18} /> Add Record
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-10 space-y-6">
        
        {/* HOD Approvals Section */}
        {isHOD && pendingApprovals.length > 0 && (
          <div className="bg-amber-50 rounded-3xl border border-amber-200 p-6">
            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
              <FileBadge size={20} className="text-amber-600" /> 
              Pending HOD Approvals ({pendingApprovals.length})
            </h3>
            <div className="space-y-3">
              {pendingApprovals.map(item => {
                const Icon = categoryIcons[item.type] || Target;
                return (
                  <div key={item.id} className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${categoryColors[item.type]}`}>
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1 truncate">{item.faculty} requested approval</div>
                        <h4 className="font-bold text-gray-800 break-words">{item.title}</h4>
                        <div className="text-[11px] font-semibold text-gray-500 flex flex-wrap items-center gap-1.5 mt-1 leading-tight">
                          <span>{item.type}</span> <span className="opacity-50">•</span> <span>{item.organization}</span> <span className="opacity-50">•</span> <span>Status: {item.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => handleApprove(item.id)} className="flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-2 rounded-xl text-xs font-bold transition-colors border border-green-200">
                        <Check size={14} /> Approve
                      </button>
                      <button onClick={() => handleReject(item.id)} className="flex items-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-2 rounded-xl text-xs font-bold transition-colors border border-red-200">
                        <X size={14} /> Reject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Development Timeline (Current User's Records) */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Target size={20} className="text-blue-600" /> 
            My Development Records
          </h3>
          
          <div className="space-y-4">
            {myDevelopments.length === 0 ? (
              <p className="text-gray-400 text-sm italic py-4 text-center font-medium">You haven't added any development records yet.</p>
            ) : (
              myDevelopments.map(item => {
                const Icon = categoryIcons[item.type] || Target;
                return (
                  <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-2xl border border-gray-50 hover:border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${categoryColors[item.type]}`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                        <h4 className="font-bold text-gray-800 text-lg truncate">{item.title}</h4>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Approval Status Badge */}
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold ${
                            item.approvalStatus === 'Approved' ? 'bg-green-50 text-green-700 border border-green-200' :
                            item.approvalStatus === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                            'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {item.approvalStatus === 'Approved' ? <CheckCircle2 size={12} /> : 
                             item.approvalStatus === 'Rejected' ? <X size={12} /> : <Clock size={12} />}
                            {item.approvalStatus === 'Pending' ? 'Pending HOD Approval' : item.approvalStatus}
                          </span>
                          
                          {/* Execution Status Badge */}
                          <span className={`inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold border ${
                            item.status === 'Completed' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                            item.status === 'Ongoing' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                            'bg-gray-50 text-gray-700 border-gray-200'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-semibold text-gray-500">
                        <span className="text-gray-700">{item.organization}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span>{item.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="uppercase tracking-wider text-[10px] bg-gray-100 px-2 py-0.5 rounded-lg text-gray-600 border border-gray-200">{item.type}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-xl shadow-2xl border border-gray-100 flex flex-col max-h-[85vh]">
            <h3 className="text-2xl font-black text-gray-800 mb-6">Add Development Record</h3>
            
            <form onSubmit={handleAddSubmit} className="flex-1 overflow-y-auto hide-scrollbar space-y-5 px-1 pb-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Record Type</label>
                <select 
                  value={newType} 
                  onChange={e => setNewType(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-semibold rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Conference">Conference</option>
                  <option value="Certificate">Certificate</option>
                  <option value="Publications">Publications</option>
                  <option value="Online Course">Online Course</option>
                  <option value="Project">Project</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                <input 
                  type="text" 
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Organization / Venue</label>
                <input 
                  type="text" 
                  required
                  value={newOrg}
                  onChange={e => setNewOrg(e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date (Optional)</label>
                  <input 
                    type="date" 
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Current Status</label>
                  <select 
                    value={newStatus} 
                    onChange={e => setNewStatus(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-semibold rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
              </div>
            </form>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 mt-2 shrink-0">
              <button 
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 rounded-2xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddSubmit}
                type="submit"
                className="px-6 py-3 rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
              >
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

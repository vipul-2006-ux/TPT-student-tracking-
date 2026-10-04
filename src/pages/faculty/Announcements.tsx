import { useState, useEffect } from 'react';
import { Megaphone, Plus, Edit2, Trash2, Calendar, Users, ShieldAlert, CheckCircle2, X } from 'lucide-react';

export type AudienceType = 'Staff' | 'Department' | 'II Year' | 'III Year';

export type Announcement = {
  id: string;
  title: string;
  content: string;
  author: 'Admin' | 'Faculty';
  facultyName: string;
  date: string;
  audience: AudienceType | 'All Students'; // legacy support for mock data
};

const defaultAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Local Government Holiday',
    content: 'Please be informed that the college will remain closed tomorrow due to the local government holiday announcement. All scheduled internal exams are postponed to next Monday.',
    author: 'Admin',
    facultyName: 'Admin',
    date: 'Today',
    audience: 'Staff'
  },
  {
    id: '2',
    title: 'Computer Engineering Faculty Meeting',
    content: 'The mandatory faculty meeting for Computer Engineering department will be held in Lab 2 tomorrow at 10:00 AM. Attendance is strictly monitored.',
    author: 'Admin',
    facultyName: 'Admin',
    date: 'Yesterday',
    audience: 'Department'
  },
  {
    id: '3',
    title: 'Smart India Hackathon Registration',
    content: 'Please register your teams for the upcoming SIH Hackathon by Friday. Contact the department HOD for project approvals.',
    author: 'Faculty',
    facultyName: 'Saranya V',
    date: '2026-10-04',
    audience: 'II Year'
  }
];

export default function FacultyAnnouncements() {
  let currentUser = { name: 'Saranya V' };
  try {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const parsed = JSON.parse(userStr);
      if (parsed.role === 'Faculty' && parsed.name) {
        currentUser = parsed;
      }
    }
  } catch (e) {}

  const [adminSettings, setAdminSettings] = useState({ adminName: 'Admin', profilePhoto: '' });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('adminSettings');
      if (stored) {
        setAdminSettings(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('portal_announcements_v2');
    return saved ? JSON.parse(saved) : defaultAnnouncements;
  });
  
  useEffect(() => {
    localStorage.setItem('portal_announcements_v2', JSON.stringify(announcements));
  }, [announcements]);
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState<AudienceType>('Department');

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setAudience('Department');
    setModalOpen(true);
  };

  const openEditModal = (a: Announcement) => {
    if (a.author === 'Admin') return; 
    setEditingId(a.id);
    setTitle(a.title);
    setContent(a.content);
    setAudience(a.audience as AudienceType);
    setModalOpen(true);
  };

  const handleDelete = (id: string, author: string) => {
    if (author === 'Admin') return; 
    if(window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleSave = () => {
    if (!title || !content) return;

    if (editingId) {
      setAnnouncements(prev => prev.map(a => 
        a.id === editingId ? { ...a, title, content, audience } : a
      ));
    } else {
      const newAnnouncement: Announcement = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        content,
        author: 'Faculty',
        facultyName: currentUser.name,
        date: new Date().toISOString().split('T')[0],
        audience
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }
    setModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>
          <p className="text-sm text-gray-500">View college updates from Admin and post announcements to your students.</p>
        </div>
        
        <button onClick={openCreateModal} className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-900/20 transition-all">
          <Plus size={18} /> Post Announcement
        </button>
      </div>

      {/* Announcements List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-10 space-y-4">
        {announcements.map((announcement) => {
          const isMine = announcement.facultyName === currentUser.name;

          return (
            <div key={announcement.id} className={`bg-white p-6 rounded-3xl border ${announcement.author === 'Admin' ? 'border-red-100' : 'border-blue-100'} shadow-sm relative flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group`}>
              
              {/* Icon Sidebar */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden border ${announcement.author === 'Admin' ? 'border-blue-100 bg-blue-50 text-blue-600' : 'border-blue-100 bg-blue-50 text-blue-600'}`}>
                  {announcement.author === 'Admin' ? (
                    adminSettings.profilePhoto ? (
                      <img src={adminSettings.profilePhoto} alt="Admin" className="w-full h-full object-cover" />
                    ) : (
                      <ShieldAlert size={24} />
                    )
                  ) : (
                    <Megaphone size={24} />
                  )}
                </div>
                <span className={`text-[10px] font-black tracking-wider px-2 py-1 rounded-md ${announcement.author === 'Admin' ? 'bg-blue-100 text-blue-700' : (isMine ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600')}`}>
                  {announcement.author === 'Admin' ? (adminSettings.adminName || 'Administrator') : (isMine ? 'You' : 'Faculty')}
                </span>
              </div>

              {/* Content Area */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-black text-gray-800">{announcement.title}</h3>
                  
                  {/* Actions (Only for Faculty Posts) */}
                  {announcement.author !== 'Admin' && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEditModal(announcement)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(announcement.id, announcement.author)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-4 pr-4">
                  {announcement.content}
                </p>

                <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 pt-3">
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                    <Calendar size={14} /> {announcement.date}
                  </span>
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                    <Users size={14} /> To: <span className="text-gray-700">{announcement.audience}</span>
                  </span>
                  {announcement.author === 'Faculty' && !isMine && (
                    <span className="text-xs font-bold text-blue-500 flex items-center gap-1.5 ml-auto">
                      By: {announcement.facultyName}
                    </span>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Create/Edit Modal Dialog */}
      {modalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md transition-opacity" onClick={() => setModalOpen(false)}></div>
          
          <div className="relative w-full max-w-xl bg-white max-h-[75vh] overflow-y-auto hide-scrollbar rounded-[2.5rem] p-8 shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm -mt-12">
              {editingId ? <Edit2 size={24} /> : <Plus size={24} />}
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">{editingId ? 'Edit Announcement' : 'Post Announcement'}</h2>
              <p className="text-sm text-gray-500 mt-2 font-medium">Broadcast an update.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Announcement Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-semibold text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="e.g. Guest Lecture Tomorrow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Target Audience</label>
                <select 
                  value={audience} 
                  onChange={e => setAudience(e.target.value as any)}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-semibold text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                >
                  <option value="Department">Department</option>
                  <option value="Staff">Staff Only</option>
                  <option value="II Year">II Year</option>
                  <option value="III Year">III Year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Message Content</label>
                <textarea 
                  value={content} 
                  onChange={e => setContent(e.target.value)}
                  rows={4}
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-semibold text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  placeholder="Write your announcement here..."
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setModalOpen(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2">
                  <X size={16} /> Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={!title || !content}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} /> {editingId ? 'Save' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

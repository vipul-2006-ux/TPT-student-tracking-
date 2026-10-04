import { useState, useEffect } from 'react';
import { Megaphone, Calendar, Users, ShieldAlert } from 'lucide-react';
import type { Announcement } from '../faculty/Announcements';

export default function StudentAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const loadAnnouncements = () => {
      const saved = localStorage.getItem('portal_announcements');
      if (saved) {
        const parsed: Announcement[] = JSON.parse(saved);
        // Filter out Admin posts and Staff-only posts for students
        const filtered = parsed.filter(a => a.author !== 'Admin' && a.audience !== 'Staff');
        setAnnouncements(filtered);
      }
    };
    
    loadAnnouncements();
    window.addEventListener('storage', loadAnnouncements);
    return () => window.removeEventListener('storage', loadAnnouncements);
  }, []);

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Faculty Announcements</h2>
          <p className="text-sm text-gray-500">View updates, notices, and important information posted by your professors.</p>
        </div>
      </div>

      {/* Announcements List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-10 space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm relative flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
            
            {/* Icon Sidebar */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600">
                <Megaphone size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md bg-blue-100 text-blue-700">
                Notice
              </span>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                <h3 className="text-lg font-black text-gray-800">{announcement.title}</h3>
              </div>

              <p className="text-gray-600 text-sm font-medium leading-relaxed mb-4 pr-4">
                {announcement.content}
              </p>

              <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 pt-3">
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                  <Calendar size={14} /> {announcement.date}
                </span>
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                  <Users size={14} /> Posted by: <span className="text-gray-700">
                    {announcement.facultyName === 'Vipul N M' ? 'Saranya V' : announcement.facultyName}
                  </span>
                </span>
                <span className="text-xs font-bold text-blue-500 flex items-center gap-1.5 ml-auto">
                  For: {announcement.audience}
                </span>
              </div>
            </div>

          </div>
        ))}
        
        {announcements.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
            <ShieldAlert size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-bold">No announcements yet</p>
            <p className="text-sm">Your faculty hasn't posted anything.</p>
          </div>
        )}
      </div>

    </div>
  );
}

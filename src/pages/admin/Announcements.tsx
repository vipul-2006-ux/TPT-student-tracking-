import React, { useState, useEffect, useRef } from 'react';
import { Megaphone, Send, Image as ImageIcon, Link as LinkIcon, Paperclip, MoreVertical, Building2, Globe, User, X, FileText } from 'lucide-react';

export default function AdminAnnouncements() {
  const [target, setTarget] = useState('college');
  const [department, setDepartment] = useState('Computer Engineering');
  const [recipient, setRecipient] = useState('Faculty');
  const [content, setContent] = useState('');
  
  const [adminSettings, setAdminSettings] = useState({ adminName: 'Admin', profilePhoto: '' });

  // Attachments
  const [attachment, setAttachment] = useState<{ type: 'image' | 'file' | 'link'; data: string; name: string } | null>(null);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize from global storage
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem('adminSettings');
      if (storedAdmin) setAdminSettings(JSON.parse(storedAdmin));
      
      const storedAnnouncements = localStorage.getItem('portal_announcements_v2');
      if (storedAnnouncements) {
        setAnnouncements(JSON.parse(storedAnnouncements));
      } else {
        // Fallback default
        setAnnouncements([
          {
            id: '1',
            title: 'Local Government Holiday',
            content: 'Please be informed that the college will remain closed tomorrow due to the local government holiday announcement. All scheduled internal exams are postponed to next Monday.',
            author: 'Admin',
            facultyName: 'Admin',
            date: 'Today',
            audience: 'Staff',
            target: 'College Wide',
            recipient: 'Faculty Only',
            views: 890
          },
          {
            id: '2',
            title: 'Computer Engineering Faculty Meeting',
            content: 'The mandatory faculty meeting for Computer Engineering department will be held in Lab 2 tomorrow at 10:00 AM. Attendance is strictly monitored.',
            author: 'Admin',
            facultyName: 'Admin',
            date: 'Yesterday',
            audience: 'Department',
            target: 'Computer Engineering',
            recipient: 'Faculty Only',
            views: 120
          }
        ]);
      }
    } catch {}
  }, []);

  const DEPARTMENTS = [
    'Computer Engineering', 'ECE', 'Mechanical Engineering', 
    'Civil Engineering', 'EEE', 'Textile Technology', 
    'Production Engineering', 'Architecture'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 30MB
    const MAX_SIZE = 30 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert('File exceeds the 30MB capacity limit.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment({
        type,
        data: reader.result as string,
        name: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAddLink = () => {
    const url = window.prompt("Enter link URL:");
    if (url) {
      setAttachment({
        type: 'link',
        data: url,
        name: url
      });
    }
  };

  const handlePost = () => {
    if (!content.trim()) return;

    const actualTarget = target === 'college' ? 'College Wide' : department;
    
    const newPost = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Admin Update', // Fallback for faculty UI
      content,
      author: 'Admin',
      facultyName: adminSettings.adminName || 'Admin',
      date: 'Just now',
      audience: actualTarget,
      target: actualTarget,
      recipient,
      attachment,
      views: 0
    };

    const updated = [newPost, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('portal_announcements_v2', JSON.stringify(updated));
    
    // Reset composer
    setContent('');
    setAttachment(null);
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto hide-scrollbar gap-6 max-w-4xl mx-auto w-full pb-10">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-gray-800">Announcements</h2>
        <p className="text-sm text-gray-500 mt-1">Broadcast important information to the entire college or specific departments.</p>
      </div>

      {/* Composer */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex gap-4">
          <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-gray-200">
            {adminSettings.profilePhoto ? (
              <img src={adminSettings.profilePhoto} alt="Admin" className="w-full h-full object-cover" />
            ) : (
              <User size={20} className="text-blue-500" />
            )}
          </div>
          <div className="flex-1 space-y-4">
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What do you want to announce?"
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none"
            />

            {/* Attachment Preview */}
            {attachment && (
              <div className="relative inline-flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl max-w-full">
                {attachment.type === 'image' && <img src={attachment.data} alt="Attached" className="h-10 w-10 rounded-lg object-cover" />}
                {attachment.type === 'file' && <FileText className="text-blue-500" size={24} />}
                {attachment.type === 'link' && <LinkIcon className="text-blue-500" size={24} />}
                <span className="text-sm font-bold text-blue-900 truncate max-w-[200px]">{attachment.name}</span>
                <button 
                  onClick={() => setAttachment(null)}
                  className="p-1 hover:bg-blue-100 rounded-full text-blue-500 ml-2"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <input type="file" accept="image/*" ref={imageInputRef} className="hidden" onChange={e => handleFileUpload(e, 'image')} />
                <button onClick={() => imageInputRef.current?.click()} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Attach Image">
                  <ImageIcon size={18} />
                </button>
                
                <button onClick={handleAddLink} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Add Link">
                  <LinkIcon size={18} />
                </button>

                <input type="file" accept="*/*" ref={fileInputRef} className="hidden" onChange={e => handleFileUpload(e, 'file')} />
                <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Attach Document (Max 30MB)">
                  <Paperclip size={18} />
                </button>
                
                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                
                {/* Target Selection */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1">
                  <button 
                    onClick={() => setTarget('college')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${target === 'college' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Globe size={14} /> College Wide
                  </button>
                  <button 
                    onClick={() => setTarget('department')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${target === 'department' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    <Building2 size={14} /> Department
                  </button>
                </div>
                
                {target === 'department' && (
                  <select 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-700 py-1.5 px-3 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                )}

                <div className="h-6 w-px bg-gray-200 mx-2"></div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">To:</span>
                  <select 
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-700 py-1.5 px-3 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Faculty Only">Faculty Only</option>
                    <option value="Students Only">Students Only</option>
                    <option value="Everyone">Everyone</option>
                  </select>
                </div>
              </div>
              
              <button 
                onClick={handlePost}
                disabled={!content.trim() && !attachment}
                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-500/20"
              >
                <Send size={16} /> Post Announcement
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className={`bg-white p-6 rounded-3xl shadow-sm border ${ann.author === 'Admin' ? 'border-blue-100' : 'border-gray-100'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-gray-200">
                  {ann.author === 'Admin' && adminSettings.profilePhoto ? (
                    <img src={adminSettings.profilePhoto} alt="Admin" className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} className={ann.author === 'Admin' ? "text-blue-500" : "text-gray-500"} />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm leading-tight">{ann.author === 'Admin' ? (adminSettings.adminName || 'Admin') : ann.facultyName}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ann.author === 'Admin' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 bg-gray-100'}`}>
                      {ann.author === 'Admin' ? 'Administrator' : 'Faculty'}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 font-medium">{ann.date}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
            
            {/* Announcement Title for Faculty Posts (if any) */}
            {ann.author === 'Faculty' && ann.title && (
              <h3 className="text-lg font-black text-gray-800 mb-2">{ann.title}</h3>
            )}

            <p className="text-sm text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
              {ann.content}
            </p>

            {/* Render Attachment if exists */}
            {ann.attachment && (
              <div className="mb-4">
                {ann.attachment.type === 'image' && (
                  <div className="rounded-xl overflow-hidden max-w-sm border border-gray-100 shadow-sm">
                    <img src={ann.attachment.data} alt="Attached" className="w-full h-auto" />
                  </div>
                )}
                {ann.attachment.type === 'file' && (
                  <div className="inline-flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <FileText className="text-blue-500" size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{ann.attachment.name}</p>
                      <p className="text-xs text-gray-500">Document Attachment</p>
                    </div>
                  </div>
                )}
                {ann.attachment.type === 'link' && (
                  <a href={ann.attachment.data} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline">
                    <LinkIcon size={16} /> {ann.attachment.name}
                  </a>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-500">
                  {ann.target === 'College Wide' || ann.audience === 'College Wide' ? <Globe size={12} /> : <Building2 size={12} />}
                  {ann.target || ann.audience}
                </div>
                {ann.recipient && (
                  <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg text-xs font-bold text-blue-600">
                    <User size={12} />
                    Sent to: {ann.recipient}
                  </div>
                )}
              </div>
              <div className="text-xs font-bold text-gray-400">
                {ann.views || 0} Views
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

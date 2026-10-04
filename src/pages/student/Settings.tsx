import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings as SettingsIcon, 
  LogOut, 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  HelpCircle, 
  Info, 
  ChevronRight,
  User,
  MessageCircle,
  AlertTriangle,
  Book,
  Building,
  Shield,
  FileText
} from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  
  // States for interactive settings
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState({
    attendance: true,
    assignments: true,
    announcements: true,
    events: false,
    feedback: true
  });

  const handleLogout = () => {
    // In a real app, clear tokens/auth state here
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2 mt-8 first:mt-0">
      <Icon size={16} /> {title}
    </h3>
  );

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
    <div 
      onClick={onChange}
      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}
    >
      <div className={`toggle-circle w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col gap-6 overflow-hidden">
      
      {/* Header */}
      <div className="bg-blue-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between text-white shrink-0 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">Settings</h2>
          <p className="text-sm text-blue-200">Manage your account, preferences, and notifications.</p>
        </div>
        <div className="relative z-10 w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center border-4 border-white/20">
          <SettingsIcon size={32} className="text-white" />
        </div>
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 translate-y-10 blur-2xl"></div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-8">
        
        {/* ACCOUNT */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <SectionTitle icon={User} title="Account" />
          <div 
            onClick={handleLogout}
            className="flex items-center justify-between p-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <LogOut size={18} />
              </div>
              <div>
                <h4 className="font-bold">Logout</h4>
                <p className="text-xs font-semibold opacity-80">Sign out of your account</p>
              </div>
            </div>
            <ChevronRight size={18} />
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <SectionTitle icon={Bell} title="Notifications" />
          <div className="space-y-2">
            {[
              { id: 'attendance', label: 'Attendance Alerts', desc: 'Get notified when you are marked absent' },
              { id: 'assignments', label: 'Assignment Notifications', desc: 'Reminders for upcoming deadlines' },
              { id: 'announcements', label: 'College Announcements', desc: 'Important notices and circulars' },
              { id: 'events', label: 'Event Notifications', desc: 'Updates about symposiums and fests' },
              { id: 'feedback', label: 'Feedback Reminders', desc: 'Reminders to submit faculty feedback' },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{item.label}</h4>
                  <p className="text-[11px] text-gray-500 font-medium">{item.desc}</p>
                </div>
                <ToggleSwitch 
                  checked={notifications[item.id as keyof typeof notifications]} 
                  onChange={() => toggleNotification(item.id as keyof typeof notifications)} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* APPEARANCE & PREFERENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <SectionTitle icon={Sun} title="Appearance" />
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm">
                  {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Dark Mode</h4>
                  <p className="text-[11px] text-gray-500 font-medium">{darkMode ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
              <ToggleSwitch checked={darkMode} onChange={toggleDarkMode} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <SectionTitle icon={Globe} title="Preferences" />
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm">
                  <Globe size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Language</h4>
                  <p className="text-[11px] text-gray-500 font-medium">App Interface</p>
                </div>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white border border-gray-200 text-gray-800 text-sm font-bold rounded-xl px-3 py-2 outline-none focus:border-blue-500"
              >
                <option>English</option>
                <option>Tamil</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </div>

        {/* HELP & SUPPORT */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <SectionTitle icon={HelpCircle} title="Help & Support" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-sm cursor-pointer transition-all text-center flex flex-col items-center justify-center gap-2 group">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors"><Book size={18} /></div>
              <h4 className="font-bold text-gray-800 text-sm">Help Center</h4>
            </div>
            <div className="p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-sm cursor-pointer transition-all text-center flex flex-col items-center justify-center gap-2 group">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors"><MessageCircle size={18} /></div>
              <h4 className="font-bold text-gray-800 text-sm">Contact College</h4>
            </div>
            <div className="p-4 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-sm cursor-pointer transition-all text-center flex flex-col items-center justify-center gap-2 group">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors"><AlertTriangle size={18} /></div>
              <h4 className="font-bold text-gray-800 text-sm">Report a Problem</h4>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <SectionTitle icon={Info} title="About" />
          <div className="space-y-2">
            {[
              { icon: Book, label: 'About the Portal' },
              { icon: Building, label: 'College Information' },
              { icon: Shield, label: 'Privacy Policy' },
              { icon: FileText, label: 'Terms & Conditions' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100 group">
                <div className="flex items-center gap-3">
                  <item.icon size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                  <h4 className="font-bold text-gray-700 text-sm group-hover:text-blue-900 transition-colors">{item.label}</h4>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  Settings, 
  LogOut,
  Bell,
  Search,
  UserCircle,
  Book,
  Megaphone,
  FileBarChart,
  Award,
  Briefcase,
  Building2,
  GraduationCap,
  Activity,
  UserCheck,
  ClipboardList,
  Pin,
  Lock,
  Unlock,
  ShieldAlert
} from 'lucide-react';

// A high-quality 3D avatar URL to act as the pet/avatar
const AVATAR_URL = "https://cdn-icons-png.flaticon.com/512/4140/4140047.png";

export default function MainLayout({ role }: { role: string }) {
  const nav = useNavigate();
  const location = useLocation();

  const [isLocked, setIsLocked] = useState(() => {
    if (role === 'admin') {
      try {
        const stored = localStorage.getItem('adminSettings');
        if (stored) {
          const parsed = JSON.parse(stored);
          return parsed.appLockEnabled === true;
        }
      } catch {}
    }
    return false;
  });
  
  const [pinInput, setPinInput] = useState(['', '', '', '']);
  const [correctPin, setCorrectPin] = useState(() => {
    if (role === 'admin') {
      try {
        const stored = localStorage.getItem('adminSettings');
        if (stored) {
          return JSON.parse(stored).appLockPin || '';
        }
      } catch {}
    }
    return '';
  });
  const [pinError, setPinError] = useState(false);
  const pinRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    setPinError(false);
    const newPin = [...pinInput];
    newPin[index] = value;
    setPinInput(newPin);
    
    if (value && index < 3) {
      pinRefs[index + 1].current?.focus();
    }
    
    if (index === 3 && value) {
      const entered = newPin.join('');
      if (entered === correctPin) {
        setIsLocked(false);
      } else {
        setPinError(true);
        setTimeout(() => {
          setPinInput(['', '', '', '']);
          pinRefs[0].current?.focus();
        }, 500);
      }
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pinInput[index] && index > 0) {
      pinRefs[index - 1].current?.focus();
    }
  };

  if (isLocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">App Locked</h2>
          <p className="text-sm text-gray-500 mt-2 font-medium mb-8">Enter your 4-digit security PIN to unlock the admin portal.</p>
          
          <div className="flex justify-center gap-3 mb-6">
            {pinInput.map((digit, i) => (
              <input
                key={i}
                ref={pinRefs[i]}
                type="password"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(i, e.target.value)}
                onKeyDown={(e) => handlePinKeyDown(i, e)}
                className={`w-12 h-14 text-center text-xl font-bold bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${pinError ? 'border-red-500 text-red-600 bg-red-50' : 'border-gray-200 text-gray-800'}`}
              />
            ))}
          </div>
          
          {pinError && <p className="text-xs font-bold text-red-500 mb-4 animate-pulse">Incorrect PIN. Try again.</p>}
          
          <button onClick={() => {
            sessionStorage.clear();
            localStorage.removeItem('currentUser');
            nav('/login');
          }} className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
            Logout
          </button>
        </div>
      </div>
    );
  }

  let navItems = [];

  if (role === 'student' || role === 'parent') {
    navItems = [
      { name: 'Dashboard', icon: LayoutDashboard, path: `/${role}/dashboard` },
      { name: 'Attendance', icon: Users, path: `/${role}/attendance` },
      ...(role === 'student' ? [{ name: 'Assignments', icon: FileText, path: `/${role}/assignments` }] : []),
      { name: 'Timetable', icon: Calendar, path: `/${role}/timetable` },
      ...(role === 'student' ? [{ name: 'Announcements', icon: Megaphone, path: `/${role}/announcements` }] : []),
      { name: 'Results', icon: BookOpen, path: `/${role}/results` },
      ...(role === 'student' ? [{ name: 'Feedback', icon: MessageSquare, path: `/${role}/feedback` }] : []),
      { name: 'Settings', icon: Settings, path: `/${role}/settings` },
    ];
  } else if (role === 'faculty') {
    navItems = [
      { name: 'Dashboard', icon: LayoutDashboard, path: `/${role}/dashboard` },
      { name: 'My Classes', icon: Users, path: `/${role}/classes` },
      { name: 'Attendance', icon: FileText, path: `/${role}/attendance` },
      { name: 'Assignments', icon: FileText, path: `/${role}/assignments` },
      { name: 'Announcements', icon: Megaphone, path: `/${role}/announcements` },
      { name: 'Test Results', icon: FileBarChart, path: `/${role}/results` },
      { name: 'Faculty Feedback', icon: MessageSquare, path: `/${role}/feedback` },
      { name: 'Development', icon: Award, path: `/${role}/development` },
      { name: 'Settings', icon: Settings, path: `/${role}/settings` },
    ];
  } else if (role === 'admin') {
    navItems = [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
      { name: 'User Management', icon: Users, path: '/admin/users' },
      { name: 'Departments', icon: Building2, path: '/admin/departments' },
      { name: 'Academic Management', icon: Book, path: '/admin/academic' },
      { name: 'Feedback & Reports', icon: FileBarChart, path: '/admin/feedback' },
      { name: 'Announcements', icon: Megaphone, path: '/admin/announcements' },
      { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ];
  }

  return (
    <div className="flex h-screen bg-[#f3f4f6] font-sans overflow-hidden relative">

      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between hidden md:flex h-full">
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-gray-50/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-gray-800 text-lg">TPT Portal</span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname.includes(item.path);
              return (
                <button
                  key={item.name}
                  onClick={() => nav(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                    isActive 
                      ? 'bg-blue-50 text-blue-900' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={18} className={isActive ? 'text-blue-900' : 'text-gray-400'} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="p-3 shrink-0">
          <button 
            onClick={() => nav('/login')} 
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-16 shrink-0 bg-white/50 backdrop-blur-md flex items-center justify-between px-6 z-10 border-b border-gray-100/50">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search students, subjects..." 
                className="w-full bg-white border border-gray-100 rounded-full py-2 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <Link to={role === 'admin' ? '/admin/settings' : `/${role}/profile`} className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:opacity-80 transition-opacity">
              <img src={(() => {
                if (role === 'admin') {
                  try {
                    const adminSettings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
                    if (adminSettings.profilePhoto) return adminSettings.profilePhoto;
                  } catch {}
                }
                return AVATAR_URL;
              })()} alt="Profile" className="w-8 h-8 rounded-full shadow-sm bg-blue-100 object-cover" />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-gray-800 leading-tight">
                  {(() => {
                    try {
                      const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
                      if (role === 'faculty') {
                        return (user && user.role === 'Faculty') ? user.name : 'Saranya V';
                      }
                      if (role === 'student') {
                        return (user && user.role === 'Student') ? user.name : 'Vipul N M';
                      }
                      if (role === 'admin') {
                        try {
                          const adminSettings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
                          return adminSettings.adminName || 'Admin';
                        } catch {
                          return 'Admin';
                        }
                      }
                    } catch {}
                    
                    return role === 'faculty' ? 'Saranya V' : (role === 'student' ? 'Vipul N M' : 'Admin');
                  })()}
                </p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  {(() => {
                    try {
                      const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
                      if (role === 'faculty') {
                        return (user && user.role === 'Faculty') ? (user.designation || 'Faculty') : 'Faculty';
                      }
                      if (role === 'student') {
                        return (user && user.role === 'Student') ? user.role : 'Student';
                      }
                      if (role === 'admin') {
                        try {
                          const adminSettings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
                          if (adminSettings.adminId) {
                            return `${adminSettings.adminId} • ${adminSettings.adminRole || 'Administrator'}`;
                          }
                        } catch {}
                        return 'Administrator';
                      }
                    } catch {}
                    
                    return role === 'faculty' ? 'Faculty' : (role === 'admin' ? 'Administrator' : 'Student');
                  })()}
                </p>
              </div>
            </Link>
          </div>
        </header>

        {/* Non-scrollable Page Content */}
        <div className="flex-1 overflow-hidden p-4 sm:p-6">
          <Outlet />
        </div>
      </main>

    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { 
  User, Building2, Globe, FileText, LifeBuoy, 
  Palette, Sliders, Lock, Info, Save, Upload, Shield, 
  ChevronRight, LogOut, Moon, Sun, Smartphone, Activity, MessageSquare
} from 'lucide-react';

const TABS = [
  { id: 'account', label: 'Admin Account', icon: User },
  { id: 'college', label: 'College Information', icon: Building2 },
  { id: 'portal', label: 'Portal Information', icon: Globe },
  { id: 'support', label: 'Help & Support', icon: LifeBuoy },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'preferences', label: 'System Preferences', icon: Sliders },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'about', label: 'About', icon: Info },
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('account');
  const [theme, setTheme] = useState(() => localStorage.getItem('tpt_theme') || 'light');
  
  useEffect(() => {
    localStorage.setItem('tpt_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);
  
  // Settings State
  const [settings, setSettings] = useState({
    adminName: 'Super Admin',
    profilePhoto: '',
    adminEmail: 'admin@tptportal.edu',
    adminPhone: '+91 98765 43210',
    adminId: 'ADM-9024X',
    adminRole: 'Chief System Administrator',
    adminDept: 'IT Infrastructure',
    adminJoined: '2022-04-15',
    
    collegeName: 'Thiagarajar Polytechnic College',
    collegeAddress: 'Post Box No.12, Junction Main Road, Salem - 636 005',
    principalName: 'Dr.A. Kanakaraj Principal (i/c)',
    collegeWebsite: 'https://tpt.edu.in',
    collegePhone: '0427-2447992',
    officeContact: '0427-2448358',
    collegeEmail: 'tptinfo@tpt.edu.in',
    
    portalName: 'TPT Academic Portal',
    portalDesc: 'Integrated academic management system for staff and students.',
    supportEmail: 'support@tptportal.edu',
    supportPhone: '+91 80000 12345',
    techSupportName: 'IT Administration Dept',
    appLockEnabled: false,
    appLockPin: ''
  });
  
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('adminSettings');
      if (stored) {
        setSettings(prev => ({ ...prev, ...JSON.parse(stored) }));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, profilePhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setSettings(prev => ({ ...prev, profilePhoto: '' }));
  };

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    // Reload to update the top-right header name
    window.location.reload();
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden relative">
      {/* Save Notification Toast */}
      {isSaved && (
        <div className="absolute top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl z-50 animate-fade-in flex items-center gap-2">
          <Shield size={18} /> Settings saved successfully!
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800">Admin Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Configure global platform settings, institutional details, and security.</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-500/20">
          <Save size={18} /> Save All Changes
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* Settings Sidebar */}
        <div className="w-full lg:w-72 shrink-0 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-y-auto hide-scrollbar flex flex-col p-4">
          <div className="space-y-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                    {tab.label}
                  </div>
                  {isActive && <ChevronRight size={16} className="text-blue-500" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-y-auto hide-scrollbar p-6 lg:p-8">
          
          {/* 1. Admin Account */}
          {activeTab === 'account' && (
            <div className="max-w-2xl animate-fade-in space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Admin Account</h3>
                <p className="text-sm text-gray-500">Manage your personal administrator profile.</p>
              </div>

              <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                <label className="h-24 w-24 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden relative group cursor-pointer">
                  {settings.profilePhoto ? (
                    <img src={settings.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} className="text-blue-500" />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload size={20} className="text-white" />
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
                <div>
                  <h4 className="font-bold text-gray-800">Profile Photo</h4>
                  <p className="text-xs text-gray-500 mb-3">JPG, GIF or PNG. Max size of 800K</p>
                  <div className="flex gap-2">
                    <label className="text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors cursor-pointer">
                      Upload
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                    <button onClick={removePhoto} className="text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-colors">Remove</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Admin Name</label>
                  <input type="text" name="adminName" value={settings.adminName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Admin ID</label>
                  <input type="text" name="adminId" value={settings.adminId} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Designation / Role</label>
                  <input type="text" name="adminRole" value={settings.adminRole} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Department</label>
                  <input type="text" name="adminDept" value={settings.adminDept} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                  <input type="email" name="adminEmail" value={settings.adminEmail} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                  <input type="tel" name="adminPhone" value={settings.adminPhone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Date of Joining</label>
                  <input type="date" name="adminJoined" value={settings.adminJoined} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex gap-4">
                <button className="flex items-center gap-2 text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 px-5 py-2.5 rounded-xl transition-colors">
                  <Lock size={16} /> Change Password
                </button>
                <button className="flex items-center gap-2 text-sm font-bold bg-red-50 text-red-600 hover:bg-red-100 px-5 py-2.5 rounded-xl transition-colors ml-auto">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}

          {/* 2. College Information */}
          {activeTab === 'college' && (
            <div className="max-w-2xl animate-fade-in space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">College Information</h3>
                <p className="text-sm text-gray-500">Official institutional details used across reports and certificates.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">College Name</label>
                  <input type="text" name="collegeName" value={settings.collegeName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">College Address</label>
                  <textarea rows={3} name="collegeAddress" value={settings.collegeAddress} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Principal Name</label>
                  <input type="text" name="principalName" value={settings.principalName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Website</label>
                  <input type="url" name="collegeWebsite" value={settings.collegeWebsite} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                  <input type="tel" name="collegePhone" value={settings.collegePhone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Office Contact Number</label>
                  <input type="tel" name="officeContact" value={settings.officeContact} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                  <input type="email" name="collegeEmail" value={settings.collegeEmail} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
              </div>
            </div>
          )}

          {/* 3. Portal Information */}
          {activeTab === 'portal' && (
            <div className="max-w-2xl animate-fade-in space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Portal Information</h3>
                <p className="text-sm text-gray-500">Configure application specific details and support contacts.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Portal Name</label>
                  <input type="text" name="portalName" value={settings.portalName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Portal Description</label>
                  <textarea rows={2} name="portalDesc" value={settings.portalDesc} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Support Email</label>
                  <input type="email" name="supportEmail" value={settings.supportEmail} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Support Phone Number</label>
                  <input type="tel" name="supportPhone" value={settings.supportPhone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Technical Support Contact Name</label>
                  <input type="text" name="techSupportName" value={settings.techSupportName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                </div>
              </div>
            </div>
          )}

          {/* 6. Help & Support */}
          {activeTab === 'support' && (
            <div className="max-w-2xl animate-fade-in space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Help & Support Content</h3>
                <p className="text-sm text-gray-500">Manage articles and FAQs accessible to users.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><LifeBuoy size={24} /></div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-800">Help Center Content</h4>
                    <p className="text-xs text-gray-500 mt-1">Manage guides and tutorials</p>
                  </div>
                </button>
                <button className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all gap-3">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"><MessageSquare size={24} /></div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-800">Frequently Asked Questions</h4>
                    <p className="text-xs text-gray-500 mt-1">Manage common queries</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* 7. Appearance */}
          {activeTab === 'appearance' && (
            <div className="max-w-2xl animate-fade-in space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Appearance</h3>
                <p className="text-sm text-gray-500">Customize the look and feel of the portal.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Theme Preference</h4>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Sun size={24} />
                    <span className="font-bold text-sm">Light Mode</span>
                  </button>
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-900 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Moon size={24} />
                    <span className="font-bold text-sm">Dark Mode</span>
                  </button>
                  <button 
                    onClick={() => setTheme('system')}
                    className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${theme === 'system' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Smartphone size={24} />
                    <span className="font-bold text-sm">System Default</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 8. System Preferences */}
          {activeTab === 'preferences' && (
            <div className="max-w-2xl animate-fade-in space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">System Preferences</h3>
                <p className="text-sm text-gray-500">Global configurations for localization and sessions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Default Language</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>English (UK)</option>
                    <option>English (US)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Session Timeout</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>2 Hours</option>
                    <option>Never (Not Recommended)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Date Format</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Time Format</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>12-hour (AM/PM)</option>
                    <option>24-hour</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 9. Security */}
          {activeTab === 'security' && (
            <div className="max-w-2xl animate-fade-in space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Security Settings</h3>
                <p className="text-sm text-gray-500">Manage authentication rules and review security logs.</p>
              </div>

              <div className="p-4 border border-blue-200 bg-blue-50/50 rounded-xl flex items-center justify-between mb-6">
                <div className="flex gap-4 items-center">
                  <div className="p-2 bg-blue-600 text-white rounded-lg shadow-sm"><Lock size={20}/></div>
                  <div>
                    <h4 className="font-bold text-gray-800">App Lock (Admin Only)</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Require PIN/Biometric authentication upon returning to the portal.</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (!settings.appLockEnabled) {
                      const pin = window.prompt('Set 4-digit PIN for App Lock:');
                      if (pin && /^\d{4}$/.test(pin)) {
                        setSettings(prev => ({ ...prev, appLockEnabled: true, appLockPin: pin }));
                      } else if (pin) {
                        alert('Invalid PIN. Must be exactly 4 digits.');
                      }
                    } else {
                      const confirm = window.confirm('Are you sure you want to disable App Lock?');
                      if (confirm) {
                        setSettings(prev => ({ ...prev, appLockEnabled: false, appLockPin: '' }));
                      }
                    }
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.appLockEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.appLockEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {settings.appLockEnabled && (
                <div className="text-sm font-bold text-blue-600 bg-blue-50 p-4 rounded-xl mb-6 flex items-center gap-2">
                  <Shield size={16} /> App Lock is currently Active. Your 4-digit PIN is configured.
                </div>
              )}
            </div>
          )}

          {/* 10. About */}
          {activeTab === 'about' && (
            <div className="max-w-2xl animate-fade-in space-y-8">
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="h-20 w-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
                  <Globe size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-800">TPT Academic Portal</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md">The unified digital campus platform for Thiagarajar Polytechnic College, empowering students and faculty.</p>
                <div className="mt-4 text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
                  Version 2.4.0 (Stable)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">About TPT</h4>
                  <p className="text-sm font-bold text-gray-800">Thiagarajar Polytechnic College</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Established</h4>
                  <p className="text-sm font-bold text-gray-800">1958</p>
                </div>
                <div className="col-span-2 mt-2">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Thiagarajar Polytechnic College is a premier institution offering diploma programs in engineering and technology. Recognized for its academic excellence, state-of-the-art infrastructure, and strong industry linkages.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

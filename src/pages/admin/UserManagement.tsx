import React, { useState, useEffect } from 'react';
import { UserCheck, Shield, GraduationCap, Search, Plus, Filter, MoreVertical, Edit2, Trash2, Key, X } from 'lucide-react';

import { mockUsers } from "../../data/mockUsers";

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Students');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [showHostelModal, setShowHostelModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.uid.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesTab = false;
    if (activeTab === 'Students' && u.role === 'Student') matchesTab = true;
    if (activeTab === 'Parents' && u.role === 'Parent') matchesTab = true;
    if (activeTab === 'Faculty & HOD' && (u.role === 'Lecturer' || u.role === 'HOD' || u.role === 'Senior Lecturer')) matchesTab = true;
    if (activeTab === 'Hostel' && u.accommodation && u.accommodation.includes('Hostel')) matchesTab = true;

    const matchesDept = deptFilter === 'All Departments' || u.dept === deptFilter || u.role === 'Parent'; // Parents don't strictly have an academic dept filter

    return matchesSearch && matchesTab && matchesDept;
  });

  const handleRoleChange = (newRole: string) => {
    if (selectedUser) {
      setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, role: newRole } : u));
      setShowRoleModal(false);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-sm text-gray-500">Manage Students, Parents, Faculty, and HOD accounts centrally.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowStudentModal(true)} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-500/20">
            <Plus size={18} /> Create Student
          </button>
          <button onClick={() => setShowFacultyModal(true)} className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-purple-500/20">
            <Plus size={18} /> Create Faculty
          </button>
          <button onClick={() => setShowHostelModal(true)} className="flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-500/20">
            <Plus size={18} /> Create Hostel ID
          </button>
          <button onClick={() => setShowAdminModal(true)} className="flex items-center gap-2 bg-orange-600 text-white hover:bg-orange-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-orange-500/20">
            <Plus size={18} /> Create Admin User
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col min-h-0 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 shrink-0 bg-gray-50/50">
          
          {/* Segmented Buttons for Main Roles */}
          <div className="flex bg-gray-200/60 p-1 rounded-xl">
            {['Students', 'Parents', 'Faculty & HOD', 'Hostel'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-blue-700 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select 
                value={deptFilter}
                onChange={e => setDeptFilter(e.target.value)}
                className="bg-white border border-gray-200 text-sm font-semibold rounded-xl pl-9 pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Departments">All Departments</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
                <option value="Production Engineering">Production Engineering</option>
                <option value="Textile Technology">Textile Technology</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Computer Science & Information Technology">Computer Science & Information Technology</option>
                <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
                <option value="Architecture">Architecture</option>
                <option value="Artificial Intelligence (AI) and Machine Learning">Artificial Intelligence (AI) and Machine Learning</option>
                <option value="Science and Humanities">Science and Humanities</option>
              </select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-white border border-gray-200 text-sm font-semibold rounded-xl pl-9 pr-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto hide-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">User Details</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Identifier / Role</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Department</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Accommodation</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{user.name}</div>
                        <div className="text-xs font-semibold text-gray-400">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-700 text-sm">{user.uid}</div>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold mt-1 uppercase tracking-wider ${
                      user.role === 'HOD' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'Lecturer' ? 'bg-blue-100 text-blue-700' :
                      user.role === 'Student' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>{user.role}</span>
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-600">{user.dept}</td>
                  <td className="py-4 px-6">
                    {user.role === 'Student' ? (
                       <span className="inline-flex px-2 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700">
                         {user.accommodation || 'Day Scholar'}
                       </span>
                    ) : <span className="text-gray-400 text-xs font-semibold">N/A</span>}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {(user.role === 'Lecturer' || user.role === 'HOD') && (
                        <button 
                          onClick={() => { setSelectedUser(user); setShowRoleModal(true); }}
                          className="p-2 text-purple-500 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Change Role"
                        >
                          <Shield size={16} />
                        </button>
                      )}
                      <button onClick={() => { if (user.role === 'Student') setShowStudentModal(true); else setShowFacultyModal(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit User">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors" title="Reset Password">
                        <Key size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Change Role</h3>
            <p className="text-xs text-gray-500 mb-6">Modify system access level for <b>{selectedUser.name}</b>.</p>
            
            <div className="space-y-3 mb-6">
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedUser.role === 'Lecturer' ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-blue-300'}`}>
                <div>
                  <div className="font-bold text-gray-800 text-sm">Lecturer</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Standard faculty access.</div>
                </div>
                <input type="radio" name="role" checked={selectedUser.role === 'Lecturer'} onChange={() => handleRoleChange('Lecturer')} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
              </label>

              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedUser.role === 'HOD' ? 'border-purple-500 bg-purple-50 shadow-sm' : 'border-gray-200 hover:border-purple-300'}`}>
                <div>
                  <div className="font-bold text-gray-800 text-sm">HOD</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Full department & metrics access.</div>
                </div>
                <input type="radio" name="role" checked={selectedUser.role === 'HOD'} onChange={() => handleRoleChange('HOD')} className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
              </label>
            </div>

            <button 
              onClick={() => setShowRoleModal(false)}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showStudentModal && <CreateStudentModal onClose={() => setShowStudentModal(false)} />}
      {showFacultyModal && <CreateFacultyModal onClose={() => setShowFacultyModal(false)} />}
      {showHostelModal && <CreateHostelModal onClose={() => setShowHostelModal(false)} users={users} setUsers={setUsers} />}
      {showAdminModal && <CreateAdminModal onClose={() => setShowAdminModal(false)} />}

    </div>
  );
}

function CreateStudentModal({ onClose }: { onClose: () => void }) {
  const [isHostel, setIsHostel] = useState(false);
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 md:p-10">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-full flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Create Student Profile</h3>
            <p className="text-xs text-gray-500 mt-1">Register a new student and generate their portal credentials.</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
          
          {/* Section 1: Personal Details */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span> 
              Personal Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Student Name *</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full Name" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Date of Birth</label>
                <input type="date" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Gender</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Blood Group</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. O+" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Phone Number</label>
                <input type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Email Address</label>
                <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="student@example.com" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Residential Address</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full Address" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Profile Photo</label>
                <input type="file" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Aadhaar / ID Number</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="XXXX XXXX XXXX" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Emergency Contact Numbers</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Multiple numbers separated by comma" />
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100"></div>

          {/* Section 2: Academic Details */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center text-xs">2</span> 
              Academic Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Registration Number *</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. A2407066" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Department *</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Department</option>
                  <option>Civil Engineering</option>
                  <option>Mechanical Engineering</option>
                  <option>Electrical & Electronics Engineering</option>
                  <option>Production Engineering</option>
                  <option>Textile Technology</option>
                  <option>Computer Engineering</option>
                  <option>Computer Science & Information Technology</option>
                  <option>Electronics and Communication Engineering</option>
                  <option>Architecture</option>
                  <option>Artificial Intelligence (AI) and Machine Learning</option>
                  <option>Science and Humanities</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Academic Year</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>2026-27</option>
                  <option>2025-26</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Year</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>I Year</option>
                  <option>II Year</option>
                  <option>III Year</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Semester</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Semester I</option>
                  <option>Semester II</option>
                  <option>Semester III</option>
                  <option>Semester IV</option>
                  <option>Semester V</option>
                  <option>Semester VI</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Admission Date & Year</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 12-08-2024" />
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100"></div>

          {/* Section 3: Parent & Additional Details */}
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">3</span> 
              Parent / Guardian & Additional Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Father Name</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Father's Name" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Father Phone Number</label>
                <input type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Parent Email (Primary)</label>
                <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Mother Name</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Mother's Name" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Mother Phone Number</label>
                <input type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91" />
              </div>
              <div className="space-y-1">
                {/* Spacer to align the grid properly if needed, or we can just let it wrap */}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Hostel / Day Scholar</label>
                <select 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setIsHostel(e.target.value === 'Hostel')}
                >
                  <option value="Day Scholar">Day Scholar</option>
                  <option value="Hostel">Hostel</option>
                </select>
              </div>
              {isHostel && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Hostel ID *</label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. HID-1024" />
                </div>
              )}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Transport / Bus Route</label>
                <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Route 4 (Leave blank if none)" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Scholarship Status</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>None</option>
                  <option>First Graduate</option>
                  <option>Government Quota</option>
                  <option>Merit</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </button>
          <button onClick={() => {
            alert("Student Account Created Successfully!\n\nSystem Note: A Parent account has been automatically generated using the Father's Phone Number. If the parent logs in and has multiple children registered, they will be prompted to select which student profile to view.");
            onClose();
          }} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
            Create Student Account
          </button>
        </div>

      </div>
    </div>
  );
}

function CreateFacultyModal({ onClose }: { onClose: () => void }) {
  const [isHostel, setIsHostel] = useState(false);
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 md:p-10">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-full flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Create Faculty Profile</h3>
            <p className="text-xs text-gray-500 mt-1">Register a new faculty member and configure their department access.</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              {/* Section 1: Personal Details */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">1</span> 
                  Personal Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Faculty Name *</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full Name" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Profile Photo</label>
                    <input type="file" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-100 file:text-blue-700" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Date of Birth</label>
                    <input type="date" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Gender</label>
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select</option><option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Phone Number</label>
                    <input type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Email Address</label>
                    <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Address</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full Address" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Emergency Contact Number</label>
                    <input type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Accommodation</label>
                    <select 
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setIsHostel(e.target.value === 'Hostel')}
                    >
                      <option value="Day Scholar">Day Scholar / Own Residence</option>
                      <option value="Hostel">Hostel</option>
                    </select>
                  </div>
                  {isHostel && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Hostel ID *</label>
                      <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. FAC-HID-101" />
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Faculty Information */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center text-[10px]">2</span> 
                  Faculty Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Faculty ID *</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. FAC001" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Department</label>
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select Department</option>
                      <option>Civil Engineering</option>
                      <option>Mechanical Engineering</option>
                      <option>Electrical & Electronics Engineering</option>
                      <option>Production Engineering</option>
                      <option>Textile Technology</option>
                      <option>Computer Engineering</option>
                      <option>Computer Science & Information Technology</option>
                      <option>Electronics and Communication Engineering</option>
                      <option>Architecture</option>
                      <option>Artificial Intelligence (AI) and Machine Learning</option>
                      <option>Science and Humanities</option>
                    </select>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Designation</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {['Lecturer', 'Senior Lecturer', 'HOD', 'Other'].map(des => (
                        <label key={des} className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
                          <input type="radio" name="designation" className="text-blue-600" />
                          <span className="text-xs font-bold text-gray-700">{des}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Joining Date</label>
                    <input type="date" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Experience (Years)</label>
                    <input type="number" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
                  </div>
                </div>
              </div>

              {/* Section 3: Qualification */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px]">3</span> 
                  Qualification
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Highest Qualification</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. M.E., Ph.D." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Specialization</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Computer Science" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Additional Qualifications</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Certifications, NET/SLET, etc." />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Section 4: Academic Assignment */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="w-5 h-5 rounded-md bg-orange-100 text-orange-600 flex items-center justify-center text-[10px]">4</span> 
                  Academic Assignment
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Subjects</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Select or type subjects" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Academic Year</label>
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"><option>2026-2027</option></select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Year / Semester / Section</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. III Year / V Sem / A Sec" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Classes Assigned</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="List of mapped classes" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Class Advisor?</label>
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center gap-2"><input type="radio" name="advisor" className="text-blue-600" /><span className="text-xs font-bold text-gray-700">Yes</span></label>
                      <label className="flex items-center gap-2"><input type="radio" name="advisor" defaultChecked className="text-blue-600" /><span className="text-xs font-bold text-gray-700">No</span></label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Professional Details */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px]">5</span> 
                  Professional Details
                </h4>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Areas of Expertise</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Machine Learning, Cloud" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Workshops / FDPs</label>
                    <textarea rows={2} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="List of attended FDPs"></textarea>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Publications & Achievements</label>
                    <textarea rows={2} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Journal papers, awards"></textarea>
                  </div>
                </div>
              </div>

              {/* Section 6 & 7: Account & Role Access */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <h4 className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Account & Portal Access</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Username</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Auto-generated" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Password</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Auto-generated" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">System Role</label>
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Faculty Access</option>
                      <option>Senior Lecturer Access (Admin privileges for Dept)</option>
                      <option>HOD Access (Admin privileges for Dept)</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </button>
          <button onClick={() => {
            alert('Faculty Profile Created Successfully!');
            onClose();
          }} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-md shadow-purple-500/20">
            Create Faculty Profile
          </button>
        </div>

      </div>
    </div>
  );
}

function CreateHostelModal({ onClose, users, setUsers }: { onClose: () => void, users: any[], setUsers: any }) {
  const [selectedDept, setSelectedDept] = useState('Computer Engineering');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [hostelId, setHostelId] = useState('');

  const deptStudents = users.filter(u => u.role === 'Student' && u.dept === selectedDept);

  const getDeptPrefix = (dept: string) => {
    const map: any = {
      'Civil Engineering': 'CIV',
      'Mechanical Engineering': 'MECH',
      'Electrical & Electronics Engineering': 'EEE',
      'Production Engineering': 'PROD',
      'Textile Technology': 'TEX',
      'Computer Engineering': 'CE',
      'Computer Science & Information Technology': 'CSIT',
      'Electronics and Communication Engineering': 'ECE',
      'Architecture': 'ARCH',
      'Artificial Intelligence (AI) and Machine Learning': 'AIML',
      'Science and Humanities': 'SH'
    };
    return map[dept] || 'GEN';
  };

  useEffect(() => {
    const prefix = getDeptPrefix(selectedDept);
    // Find highest N among existing hostel residents in this dept
    const existingN = users
      .filter(u => u.dept === selectedDept && u.accommodation && u.accommodation.includes(`Hostel (${prefix}1N`))
      .map(u => {
        const match = u.accommodation.match(new RegExp(`${prefix}1N(\\d+)`));
        return match ? parseInt(match[1]) : 0;
      });
    const maxN = existingN.length > 0 ? Math.max(...existingN) : 0;
    setHostelId(`${prefix}1N${maxN + 1}`);
  }, [selectedDept, users]);

  const handleCreate = () => {
    if (!selectedStudent || !hostelId) {
      alert("Please select a student and enter a Hostel ID.");
      return;
    }
    
    // Update the main state to reflect immediately in the UI list
    setUsers((prev: any[]) => prev.map(u => 
      u.uid === selectedStudent ? { ...u, accommodation: `Hostel (${hostelId})` } : u
    ));

    alert(`Hostel ID ${hostelId} assigned successfully to the student!`);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 md:p-10">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Assign Hostel ID</h3>
            <p className="text-xs text-gray-500 mt-1">Filter by department and assign hostel details to a student.</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase">1. Select Department</label>
            <select 
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-emerald-500"
              value={selectedDept}
              onChange={e => { setSelectedDept(e.target.value); setSelectedStudent(''); }}
            >
              <option>Civil Engineering</option>
              <option>Mechanical Engineering</option>
              <option>Electrical & Electronics Engineering</option>
              <option>Production Engineering</option>
              <option>Textile Technology</option>
              <option>Computer Engineering</option>
              <option>Computer Science & Information Technology</option>
              <option>Electronics and Communication Engineering</option>
              <option>Architecture</option>
              <option>Artificial Intelligence (AI) and Machine Learning</option>
              <option>Science and Humanities</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase">2. Select Student</label>
            <select 
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-emerald-500"
              value={selectedStudent}
              onChange={e => setSelectedStudent(e.target.value)}
            >
              <option value="">-- Choose a Student --</option>
              {deptStudents.map(student => (
                <option key={student.uid} value={student.uid}>{student.name} ({student.uid})</option>
              ))}
            </select>
            {deptStudents.length === 0 && <p className="text-xs text-red-500 mt-1">No students found in this department.</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase">3. Enter Hostel ID</label>
            <input 
              type="text" 
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-emerald-500" 
              placeholder="e.g. HID-204" 
              value={hostelId}
              onChange={e => setHostelId(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            Cancel
          </button>
          <button onClick={handleCreate} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20">
            Assign Hostel ID
          </button>
        </div>

      </div>
    </div>
  );
}

function CreateAdminModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Create Admin User</h3>
            <p className="text-xs text-gray-500 mt-1">Register a new system administrator</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
              <input type="text" placeholder="Admin Name" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-shadow" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Admin ID</label>
              <input type="text" placeholder="ADM-00X" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-shadow" />
            </div>
            <div className="space-y-1.5 col-span-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
              <input type="email" placeholder="admin@tpt.edu" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-shadow" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
              <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-shadow" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-shadow" />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 transition-colors shadow-md shadow-orange-500/20">
            Create Admin
          </button>
        </div>
      </div>
    </div>
  );
}

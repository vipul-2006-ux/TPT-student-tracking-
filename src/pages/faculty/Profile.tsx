import { UserCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FacultyProfile() {
  const [user, setUser] = useState<{name: string, designation: string, phone: string}>({
    name: "Loading...",
    designation: "Loading...",
    phone: "Loading..."
  });

  useEffect(() => {
    const facultyData = [
      { name: 'Saranya V', designation: 'HOD', phone: '+91 73734 20012' },
      { name: 'RajaRajeswari R', designation: 'Lecturer', phone: '+91 90432 42936' },
      { name: 'Sangeetha R', designation: 'Lecturer', phone: '+91 80722 47253' },
      { name: 'Nandha M', designation: 'Lecturer', phone: '+91 86080 99086' },
      { name: 'Sree Murugan U K', designation: 'Lecturer', phone: '+91 94427 66948' },
      { name: 'Yogamalini P', designation: 'Lecturer', phone: '+91 99949 33677' }
    ];

    try {
      const stored = JSON.parse(localStorage.getItem('currentUser') || 'null');
      
      // If the stored user is actually a faculty, try to find them
      if (stored && stored.role === 'Faculty' && stored.name) {
        const found = facultyData.find(f => f.name === stored.name);
        if (found) {
          setUser(found);
          return;
        } else {
          setUser({ name: stored.name, designation: stored.designation || 'Faculty', phone: 'N/A' });
          return;
        }
      }
      
      // If no valid faculty user is stored, forcibly fallback to Saranya V
      setUser(facultyData[0]);
    } catch (e) {
      console.error(e);
      setUser(facultyData[0]);
    }
  }, []);

  const InputField = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col gap-1.5 mb-5">
      <label className="text-sm font-bold text-gray-800 ml-1">{label}</label>
      <input 
        type="text" 
        value={value} 
        readOnly 
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 font-medium focus:outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col gap-6 overflow-hidden p-6 md:p-8">
      
      {/* Header */}
      <div className="bg-blue-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between text-white shrink-0 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">Faculty Profile</h2>
          <p className="text-sm text-blue-200">View your personal and professional details</p>
        </div>
        <div className="relative z-10 w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center border-4 border-white/20">
          <UserCircle size={32} className="text-white" />
        </div>
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 translate-y-10 blur-2xl"></div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-6 pb-6">
        
        {/* Name Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-blue-100 flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-blue-900 shrink-0 mt-1">
             <UserCircle size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">{user.name}</h3>
            <p className="text-gray-600 font-medium mt-1">Designation: <span className="text-gray-800 font-bold">{user.designation}</span></p>
          </div>
        </div>

        {/* Details Form */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <InputField label="Phone Number" value={user.phone} />
            <InputField label="Department" value="Computer Engineering" />
            
            <InputField label="Email Address" value="N/A" />
            <InputField label="Qualifications" value="N/A" />
            
            <InputField label="Years of Experience" value="N/A" />
            <InputField label="Date of Joining" value="N/A" />
            
            <div className="md:col-span-2">
              <InputField label="Residential Address" value="N/A" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

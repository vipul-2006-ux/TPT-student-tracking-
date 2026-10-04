import { UserCircle, MapPin, Mail, Phone, Calendar, CreditCard, BookOpen } from 'lucide-react';

export default function Profile() {
  const student = {
    name: "VIPUL N M",
    rollNo: "A2407066",
    department: "Computer Engineering (SS)",
    aadhaar: "634804198299",
    academicYear: "2025 - 2026",
    course: "Diploma",
    dob: "06-01-2006",
    doa: "",
    email: "srivipul96@gmail.com",
    motherName: "NALINI N",
    motherMobile: "9443081495",
    fatherName: "R MURUGESAN",
    fatherMobile: "9894672451",
    address: "SELVANAGAR",
  };

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
    <div className="max-w-4xl mx-auto h-full flex flex-col gap-6 overflow-hidden">
      
      {/* Header */}
      <div className="bg-blue-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between text-white shrink-0 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">Student Profile</h2>
          <p className="text-sm text-blue-200">View your personal and academic details</p>
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
            <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">{student.name}</h3>
            <p className="text-gray-600 font-medium mt-1">Roll No: <span className="text-gray-800 font-bold">{student.rollNo}</span></p>
            <p className="text-gray-600 font-medium">Department: <span className="text-gray-800 font-bold">{student.department}</span></p>
          </div>
        </div>

        {/* Details Form */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <InputField label="Aadhaar No." value={student.aadhaar} />
            <InputField label="Academic Year" value={student.academicYear} />
            
            <InputField label="Course" value={student.course} />
            <InputField label="Department" value={student.department} />
            
            <InputField label="Date Of Birth" value={student.dob} />
            <InputField label="Date Of Admission" value={student.doa} />
            
            <InputField label="Email" value={student.email} />
            <InputField label="Address" value={student.address} />
            
            <div className="md:col-span-2 my-4 border-t border-gray-100"></div>

            <InputField label="Mother's Name" value={student.motherName} />
            <InputField label="Mother's Mobile No." value={student.motherMobile} />
            
            <InputField label="Father's Name" value={student.fatherName} />
            <InputField label="Father's Mobile No." value={student.fatherMobile} />
          </div>
        </div>

      </div>

    </div>
  );
}

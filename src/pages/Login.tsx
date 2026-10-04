import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import collegeLogo from '../assets/college-logo.jpg';
import { mockUsers } from '../data/mockUsers';

export default function Login() {
  const [role, setRole] = useState<'student' | 'parent' | 'faculty' | 'admin'>('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // OTP states for Admin
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [pendingParent, setPendingParent] = useState<any>(null);
  
  const nav = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === 'admin') {
      if (!otpSent) {
        // Mock sending OTP
        if (identifier) {
          setOtpSent(true);
          // In a real app, you'd trigger an API call here.
        } else {
          setError('Please enter a valid phone number');
        }
        return;
      } else {
        // Mock OTP verification
        if (otp === '1234') {
          nav('/admin/dashboard');
        } else {
          setError('Invalid OTP. Use 1234 for demo.');
        }
        return;
      }
    }

    // Hardcoded credentials verification based on user request
    const validFaculty = [
      { u: 'th1c26', p: 't1923', name: 'Saranya V', designation: 'HOD' },
      { u: 'tc2c26', p: 't2923', name: 'RajaRajeswari R', designation: 'Lecturer' },
      { u: 'tc3c26', p: 't3923', name: 'Sangeetha R', designation: 'Lecturer' },
      { u: 'tc4c26', p: 't4923', name: 'Nandha M', designation: 'Lecturer' },
      { u: 'tc5c26', p: 't5923', name: 'Sree Murugan U K', designation: 'Lecturer' },
      { u: 'tc6c26', p: 't6923', name: 'Yogamalini P', designation: 'Lecturer' }
    ];
    
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();
    const loggedInFaculty = validFaculty.find(f => f.u === cleanId && f.p === cleanPass);
    const isFacultyValid = role === 'faculty' && !!loggedInFaculty;

    const loggedInStudent = mockUsers.find(u => u.role === 'Student' && u.uid.toLowerCase() === identifier.trim().toLowerCase());
    const isStudentValid = role === 'student' && !!loggedInStudent;

    const loggedInParent = mockUsers.find(u => u.role === 'Parent' && u.uid === identifier.trim());
    const isParentValid = role === 'parent' && !!loggedInParent;

    if (isStudentValid) {
      localStorage.setItem('currentUser', JSON.stringify({ name: loggedInStudent.name, role: 'Student' }));
      nav('/student/dashboard');
    } else if (isParentValid) {
      if (loggedInParent.linkedChildren && loggedInParent.linkedChildren.length > 1) {
        setPendingParent(loggedInParent);
      } else {
        localStorage.setItem('currentUser', JSON.stringify({ name: loggedInParent.name, role: 'Parent', linkedStudent: loggedInParent.dept }));
        nav('/parent/dashboard');
      }
    } else if (isFacultyValid) {
      localStorage.setItem('currentUser', JSON.stringify({ name: loggedInFaculty.name, designation: loggedInFaculty.designation, role: 'Faculty' }));
      nav('/faculty/dashboard');
    } else {
      if (
        (role === 'student' && !isStudentValid) ||
        (role === 'parent' && !isParentValid) ||
        (role === 'faculty' && !isFacultyValid)
      ) {
         setError('Invalid credentials for selected role.');
      } else {
         localStorage.setItem('currentUser', JSON.stringify({ name: 'Admin', role: 'Administrator' }));
         nav(`/${role}/dashboard`);
      }
    }
  };

  const getIdentifierLabel = () => {
    switch (role) {
      case 'student': return 'Identifier / Roll Number';
      case 'faculty': return 'Username';
      case 'parent': return 'Phone Number';
      case 'admin': return 'Admin Phone Number';
      default: return 'Identifier';
    }
  };

  const getIdentifierPlaceholder = () => {
    switch (role) {
      case 'student': return 'e.g., A2407066';
      case 'faculty': return 'Enter username';
      case 'parent': return 'Enter phone number';
      case 'admin': return 'Enter phone number';
      default: return 'Enter value';
    }
  };

  const autofillDemo = () => {
    if (role === 'student') { setIdentifier('A2407066'); setPassword(''); }
    if (role === 'parent') { setIdentifier('7806873176'); setPassword(''); }
    if (role === 'faculty') { setIdentifier('th1c26'); setPassword('t1923'); }
    if (role === 'admin') { setIdentifier('9988776655'); setOtpSent(true); setOtp('1234'); }
  };

  return (
    <div className="min-h-screen bg-[#e8f1f5] flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] w-full max-w-md border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg shadow-blue-900/20 p-1 mb-2">
              <img src={collegeLogo} alt="Thiagarajar Polytechnic College Logo" className="w-full h-full object-contain rounded-full" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back 👋</h1>
          <p className="text-sm text-gray-500 mt-2">Login to your account</p>
        </div>
        
        {/* Role Selector */}
        <div className="flex bg-gray-50 p-1 rounded-xl mb-8 border border-gray-100">
          {(['student', 'parent', 'faculty', 'admin'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => { 
                setRole(r); 
                setIdentifier(''); 
                setPassword(''); 
                setError(''); 
                setOtpSent(false); 
                setOtp(''); 
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                role === r 
                  ? 'bg-white text-blue-900 shadow-sm border border-gray-200/60' 
                  : 'bg-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center font-medium">{error}</div>}
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{getIdentifierLabel()}</label>
            <div className="relative flex items-center">
              {(role === 'parent' || role === 'admin') && (
                <span className="absolute left-4 text-gray-400 font-medium">+91</span>
              )}
              <input 
                type="text" 
                value={identifier} 
                onChange={(e) => setIdentifier(e.target.value)} 
                placeholder={getIdentifierPlaceholder()}
                disabled={role === 'admin' && otpSent}
                className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all ${(role === 'parent' || role === 'admin') ? 'pl-12' : ''} ${role === 'admin' && otpSent ? 'opacity-60 cursor-not-allowed' : ''}`}
                required 
              />
            </div>
          </div>

          {role === 'faculty' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter password"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <button type="button" className="text-xs text-blue-900 hover:text-blue-800 font-semibold transition-colors">
                  Forgot Password?
                </button>
              </div>
            </div>
          )}

          {role === 'admin' && otpSent && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Enter OTP</label>
              <input 
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                placeholder="Enter 4-digit OTP (1234)"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-center tracking-widest font-semibold"
                required 
              />
              <div className="flex justify-center mt-3">
                <button type="button" onClick={() => {setOtpSent(false); setOtp('');}} className="text-xs text-blue-900 hover:text-blue-800 font-semibold transition-colors">
                  Change Phone Number
                </button>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-blue-900 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-900/30 transition-all active:scale-[0.98]"
          >
            {role === 'admin' && !otpSent ? 'SEND OTP' : 'LOGIN'}
          </button>
        </form>

        {/* Demo Helper */}
        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <button 
            onClick={autofillDemo} 
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Fill demo credentials
          </button>
        </div>

      </div>

      {/* Child Selection Modal for Parent */}
      {pendingParent && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm flex flex-col shadow-2xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Select Student</h3>
            <p className="text-sm text-gray-500 mb-6">You have multiple children registered. Please select which profile to view.</p>
            
            <div className="space-y-3">
              {pendingParent.linkedChildren.map((child: any) => (
                <button 
                  key={child.uid}
                  onClick={() => {
                    localStorage.setItem('currentUser', JSON.stringify({ name: pendingParent.name, role: 'Parent', linkedStudent: `Parent of: ${child.name} (${child.uid})` }));
                    nav('/parent/dashboard');
                  }}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col gap-1 group"
                >
                  <span className="font-bold text-gray-800 group-hover:text-blue-700">{child.name}</span>
                  <span className="text-xs font-semibold text-gray-400 group-hover:text-blue-500">{child.uid}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setPendingParent(null)}
              className="mt-6 w-full py-2.5 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Cancel Login
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

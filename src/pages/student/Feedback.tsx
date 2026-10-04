import { useState } from 'react';
import { UserCircle, MessageSquare, CheckCircle2, ChevronRight, Star } from 'lucide-react';

const faculties = [
  { id: 'f1', code: '240-075414', subject: 'Cloud Computing', faculty: 'Ms.M.Nandha' },
  { id: 'f2', code: '240-075501', subject: 'Artificial Intelligence and Machine Learning', faculty: 'Ms.V.Saranya' },
  { id: 'f3', code: '240-075415', subject: 'Internet of Things and Digital Twins', faculty: 'Ms.R.RajaRajeswari' },
  { id: 'f4', code: '240-075416', subject: 'Computer Hardware and Networking', faculty: 'Mr. Sri Murugan' },
  { id: 'f5', code: '240-075502', subject: 'Component Based Technology', faculty: 'Ms. R.Sangeetha' },
  { id: 'f6', code: '240-075108', subject: 'Innovation and Startup', faculty: 'Ms.V.Saranya' },
];

const defaultQuestions = [
  "How clearly does the faculty explain the concepts and subject topics during the class?",
  "How effectively does the faculty use examples, practical applications, or demonstrations to improve your understanding?",
  "How effectively does the faculty encourage students to ask questions, participate, and clarify their doubts?",
  "How effectively does the faculty conduct classes, assignments, and assessments to support your learning and academic progress?",
  "How would you rate the overall teaching effectiveness and support provided by the faculty?"
];

const ratingOptions = [
  { score: 5, label: 'Excellent', emoji: '🤩', color: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200 hover:border-green-300' },
  { score: 4, label: 'Very Good', emoji: '😊', color: 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 hover:border-emerald-300' },
  { score: 3, label: 'Good', emoji: '🙂', color: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300' },
  { score: 2, label: 'Needs Improvement', emoji: '😕', color: 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200 hover:border-orange-300' },
  { score: 1, label: 'Poor', emoji: '😞', color: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200 hover:border-red-300' },
];

export default function Feedback() {
  const questions = (() => {
    try {
      const stored = localStorage.getItem('portal_feedback_questions');
      if (stored) return JSON.parse(stored);
    } catch {}
    return defaultQuestions;
  })();

  const [selectedFacultyId, setSelectedFacultyId] = useState(faculties[0].id);
  // Track ratings: { [facultyId]: { [questionIndex]: score } }
  const [ratings, setRatings] = useState<Record<string, Record<number, number>>>({});
  const [submittedFaculties, setSubmittedFaculties] = useState<string[]>([]);

  const selectedFaculty = faculties.find(f => f.id === selectedFacultyId)!;
  const currentRatings = ratings[selectedFacultyId] || {};
  const isFullyRated = Object.keys(currentRatings).length === questions.length;
  const isSubmitted = submittedFaculties.includes(selectedFacultyId);

  const handleRate = (qIndex: number, score: number) => {
    if (isSubmitted) return;
    setRatings(prev => ({
      ...prev,
      [selectedFacultyId]: {
        ...(prev[selectedFacultyId] || {}),
        [qIndex]: score
      }
    }));
  };

  const handleSubmit = () => {
    if (isFullyRated && !isSubmitted) {
      setSubmittedFaculties(prev => [...prev, selectedFacultyId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 overflow-hidden">
      
      {/* Header */}
      <div className="bg-blue-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between text-white shrink-0 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">Faculty Feedback</h2>
          <p className="text-sm text-blue-200">Your feedback helps us improve the quality of education.</p>
        </div>
        <div className="relative z-10 w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center border-4 border-white/20">
          <MessageSquare size={32} className="text-yellow-400" />
        </div>
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 translate-y-10 blur-2xl"></div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0 overflow-hidden">
        
        {/* Left Column: Faculty Selection List */}
        <div className="w-full xl:w-96 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col min-h-0 shrink-0">
          <div className="p-6 border-b border-gray-50 shrink-0">
             <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <UserCircle size={18} className="text-blue-600" /> Select Faculty
             </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
            {faculties.map((f) => {
              const done = submittedFaculties.includes(f.id);
              const active = selectedFacultyId === f.id;
              
              return (
                <div 
                  key={f.id} 
                  onClick={() => setSelectedFacultyId(f.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                    active 
                      ? 'bg-blue-50 border-blue-300 shadow-sm' 
                      : done 
                        ? 'bg-gray-50 border-gray-100 opacity-80 hover:bg-gray-100'
                        : 'bg-white border-gray-100 hover:border-blue-100 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider mb-1 block ${active ? 'text-blue-600' : 'text-gray-400'}`}>
                      {f.code}
                    </span>
                    <h4 className="font-bold text-xs text-gray-800 leading-tight mb-2 max-w-[200px] truncate">{f.subject}</h4>
                    <p className={`text-[10px] font-semibold flex items-center gap-1 ${active ? 'text-blue-800' : 'text-gray-500'}`}>
                      <UserCircle size={12} /> {f.faculty}
                    </p>
                  </div>
                  <div>
                    {done ? (
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <CheckCircle2 size={16} />
                      </div>
                    ) : (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <ChevronRight size={16} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Feedback Form */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col min-h-0 overflow-hidden relative">
          
          <div className="p-6 border-b border-gray-50 shrink-0 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">{selectedFaculty.faculty}</h3>
              <p className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">{selectedFaculty.subject}</p>
            </div>
            {isSubmitted && (
              <span className="flex items-center gap-1.5 text-sm font-bold text-green-700 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                <CheckCircle2 size={18} /> Feedback Submitted
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
            {questions.map((q, idx) => (
              <div key={idx} className={`transition-opacity ${isSubmitted ? 'opacity-60 pointer-events-none' : ''}`}>
                <h4 className="font-bold text-gray-800 text-sm mb-4 leading-relaxed">
                  <span className="text-blue-600 mr-2">{idx + 1}.</span> 
                  {q}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {ratingOptions.map(opt => {
                    const isSelected = currentRatings[idx] === opt.score;
                    return (
                      <button
                        key={opt.score}
                        onClick={() => handleRate(idx, opt.score)}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                          isSelected 
                            ? `${opt.color} scale-105 shadow-sm ring-2 ring-offset-1 ring-${opt.color.split('-')[1]}-400`
                            : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <span className="text-3xl mb-2">{opt.emoji}</span>
                        <span className="text-[10px] font-bold text-center leading-tight">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {!isSubmitted && (
              <div className="pt-4 border-t border-gray-100">
                <button 
                  onClick={handleSubmit}
                  disabled={!isFullyRated}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    isFullyRated 
                      ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Star size={18} className={isFullyRated ? 'text-yellow-400' : ''} /> 
                  {isFullyRated ? 'Submit Feedback' : 'Please complete all questions to submit'}
                </button>
              </div>
            )}
            
          </div>
          
        </div>

      </div>
    </div>
  );
}

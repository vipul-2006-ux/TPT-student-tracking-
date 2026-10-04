import { useState, useMemo } from 'react';
import { MessageSquareQuote, ShieldAlert, Users, Lock, Plus, Trash2, FileQuestion, Edit2 } from 'lucide-react';

const mockFaculty = [
  { name: 'Saranya V', designation: 'HOD', score: 94 },
  { name: 'RajaRajeswari R', designation: 'Lecturer', score: 88 },
  { name: 'Sangeetha R', designation: 'Lecturer', score: 91 },
  { name: 'Nandha M', designation: 'Lecturer', score: 85 },
  { name: 'Sree Murugan U K', designation: 'Lecturer', score: 89 },
  { name: 'Yogamalini P', designation: 'Lecturer', score: 92 }
];

const defaultQuestions = [
  "How clearly does the faculty explain the concepts and subject topics during the class?",
  "How effectively does the faculty use examples, practical applications, or demonstrations to improve your understanding?",
  "How effectively does the faculty encourage students to ask questions, participate, and clarify their doubts?",
  "How effectively does the faculty conduct classes, assignments, and assessments to support your learning and academic progress?",
  "How would you rate the overall teaching effectiveness and support provided by the faculty?"
];

export default function FacultyFeedback() {
  const [questions, setQuestions] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('portal_feedback_questions');
      if (stored) return JSON.parse(stored);
    } catch {}
    return defaultQuestions;
  });

  const saveQuestions = (newQuestions: string[]) => {
    setQuestions(newQuestions);
    localStorage.setItem('portal_feedback_questions', JSON.stringify(newQuestions));
  };

  const currentUser = useMemo(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (stored && stored.role === 'Faculty') return stored;
    } catch {}
    return { name: 'Saranya V', designation: 'HOD', role: 'Faculty' };
  }, []);

  const isHOD = currentUser.designation === 'HOD' || currentUser.name === 'Saranya V';

  const visibleFaculty = isHOD 
    ? mockFaculty 
    : mockFaculty.filter(f => f.name === currentUser.name);

  const handleAddQuestion = () => {
    const q = window.prompt("Enter a new feedback question for the students:");
    if (q && q.trim()) {
      saveQuestions([...questions, q.trim()]);
    }
  };

  const handleEditQuestion = (idx: number) => {
    const currentQ = questions[idx];
    const updatedQ = window.prompt("Edit this question:", currentQ);
    if (updatedQ && updatedQ.trim() && updatedQ !== currentQ) {
      const newQuestions = [...questions];
      newQuestions[idx] = updatedQ.trim();
      saveQuestions(newQuestions);
    }
  };

  const handleDeleteQuestion = (idx: number) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      saveQuestions(questions.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden relative">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 flex items-center justify-between gap-4 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-800">Faculty Feedback</h2>
          <p className="text-sm text-gray-500">
            {isHOD 
              ? 'View department metrics and manage student feedback questionnaires.' 
              : 'View your anonymous student feedback and qualitative reviews.'}
          </p>
        </div>
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
          <MessageSquareQuote size={24} />
        </div>
      </div>

      {!isHOD && (
        <div className="bg-amber-50 text-amber-800 p-4 rounded-2xl border border-amber-200 flex items-start gap-3 shrink-0">
          <Lock className="shrink-0 mt-0.5 text-amber-600" size={18} />
          <div className="text-sm font-medium">
            <span className="font-bold">Restricted View:</span> As a Lecturer, you can only view your own feedback percentage and qualitative reviews. Department-wide metrics and questionnaire management are restricted to the HOD.
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-10 space-y-6">
        
        {/* Scores Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleFaculty.map(faculty => (
            <div key={faculty.name} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex flex-col items-center justify-center text-blue-700 shrink-0">
                <span className="font-black text-lg">{faculty.score}%</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 truncate">{faculty.name}</h3>
                <p className="text-xs font-semibold text-gray-500">{faculty.designation}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Question Management (Only for HOD) */}
        {isHOD && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FileQuestion size={20} className="text-purple-600" /> 
                Manage Feedback Questionnaire
              </h3>
              <button 
                onClick={handleAddQuestion}
                className="flex items-center gap-2 text-sm font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl transition-colors"
              >
                <Plus size={16} /> Add Question
              </button>
            </div>
            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 group">
                  <span className="text-gray-700 font-medium text-sm flex-1">{idx + 1}. {q}</span>
                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditQuestion(idx)}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                      title="Edit Question"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteQuestion(idx)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete Question"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {questions.length === 0 && (
                <p className="text-sm text-gray-400 font-medium italic p-4 text-center">No active questions. Students will not be able to submit feedback.</p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Star, TrendingUp, Users, BookOpen, Clock, MessageSquare, Filter, ChevronDown, Info } from 'lucide-react';

export default function FeedbackReports() {
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedYear, setSelectedYear] = useState('All Years');

  const departments = ['All Departments', 'Computer Engineering', 'ECE', 'Mechanical Engineering', 'Civil Engineering'];
  const years = ['All Years', '1st Year', '2nd Year', '3rd Year'];

  // Mock data for faculty feedback based on the 5 standard questions
  const facultyFeedback = [
    { name: 'Dr. RajaRajeswari R', dept: 'Computer Engineering', year: '3rd Year', subject: 'Cloud Computing', scores: { q1: 4.8, q2: 4.6, q3: 4.9, q4: 4.7, q5: 4.8 }, totalResponses: 142 },
    { name: 'Prof. Saranya V', dept: 'Computer Engineering', year: '2nd Year', subject: 'Java Programming Lab', scores: { q1: 4.5, q2: 4.8, q3: 4.7, q4: 4.8, q5: 4.6 }, totalResponses: 135 },
    { name: 'Dr. Ramesh M', dept: 'ECE', year: '3rd Year', subject: 'Digital Electronics', scores: { q1: 4.9, q2: 4.5, q3: 4.6, q4: 4.4, q5: 4.7 }, totalResponses: 120 },
    { name: 'Prof. Anita K', dept: 'Mechanical Engineering', year: '1st Year', subject: 'Thermodynamics', scores: { q1: 4.2, q2: 4.3, q3: 4.8, q4: 4.1, q5: 4.4 }, totalResponses: 98 },
    { name: 'Dr. Suresh P', dept: 'Civil Engineering', year: '2nd Year', subject: 'Structural Analysis', scores: { q1: 4.7, q2: 4.7, q3: 4.5, q4: 4.6, q5: 4.8 }, totalResponses: 110 },
  ];

  const filteredFeedback = facultyFeedback.filter(f => {
    const matchDept = selectedDept === 'All Departments' || f.dept === selectedDept;
    const matchYear = selectedYear === 'All Years' || f.year === selectedYear;
    return matchDept && matchYear;
  });

  const calculateOverall = (scores: any) => {
    return ((scores.q1 + scores.q2 + scores.q3 + scores.q4 + scores.q5) / 5).toFixed(1);
  };

  const exportToExcel = () => {
    // Generate CSV content
    const headers = ['Faculty Name', 'Department', 'Year', 'Subject', 'Responses', 'Q1: Explanation Clarity', 'Q2: Practical Applications', 'Q3: Doubt Clarification', 'Q4: Class Conduct', 'Q5: Overall Teaching', 'Overall Rating'];
    const rows = filteredFeedback.map(f => [
      f.name,
      f.dept,
      f.year,
      f.subject,
      f.totalResponses,
      f.scores.q1,
      f.scores.q2,
      f.scores.q3,
      f.scores.q4,
      f.scores.q5,
      calculateOverall(f.scores)
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Faculty_Feedback_Report_${selectedDept.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Faculty Feedback & Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Student-submitted performance reviews for academic faculty.</p>
        </div>
        <div className="flex flex-wrap gap-3 justify-end mt-4 md:mt-0">
          <div className="relative">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map(y => <option key={y}>{y}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select 
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(d => <option key={d}>{d}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
          </div>
          <button onClick={exportToExcel} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors">
            <Filter size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Feedback Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Department Faculty Scores</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 font-bold text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 rounded-tl-xl whitespace-nowrap">Faculty Info</th>
                  <th className="px-4 py-3" title="How clearly does the faculty explain the concepts?">Q1: Clarity</th>
                  <th className="px-4 py-3" title="How effectively does the faculty use examples?">Q2: Practical</th>
                  <th className="px-4 py-3" title="How effectively does the faculty encourage questions?">Q3: Doubts</th>
                  <th className="px-4 py-3" title="How effectively does the faculty conduct classes & assessments?">Q4: Conduct</th>
                  <th className="px-4 py-3" title="How would you rate the overall teaching effectiveness?">Q5: Overall</th>
                  <th className="px-4 py-3 rounded-tr-xl text-right whitespace-nowrap">Overall Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredFeedback.map((faculty, i) => {
                  const overall = calculateOverall(faculty.scores);
                  return (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4 min-w-[200px]">
                        <div className="font-bold text-gray-800">{faculty.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{faculty.dept} • {faculty.year}</div>
                        <div className="text-xs text-gray-500">{faculty.subject}</div>
                        <div className="text-[10px] text-blue-600 font-bold mt-1 bg-blue-50 inline-block px-2 py-0.5 rounded">{faculty.totalResponses} Responses</div>
                      </td>
                      <td className="px-4 py-4 font-bold text-gray-600">{faculty.scores.q1.toFixed(1)}</td>
                      <td className="px-4 py-4 font-bold text-gray-600">{faculty.scores.q2.toFixed(1)}</td>
                      <td className="px-4 py-4 font-bold text-gray-600">{faculty.scores.q3.toFixed(1)}</td>
                      <td className="px-4 py-4 font-bold text-gray-600">{faculty.scores.q4.toFixed(1)}</td>
                      <td className="px-4 py-4 font-bold text-gray-600">{faculty.scores.q5.toFixed(1)}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="inline-flex items-center gap-1 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl">
                          <span className="font-black text-green-700 text-lg">{overall}</span>
                          <Star size={14} className="text-green-600 fill-current" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredFeedback.length === 0 && (
              <div className="text-center py-8 text-gray-500 font-bold">No faculty data available for this department.</div>
            )}
          </div>
        </div>

        {/* Calculation Logic & Summary */}
        <div className="space-y-6">
          
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
            <Star className="absolute -right-4 -bottom-4 text-white/10" size={120} />
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2"><Info size={20} /> How is it Calculated?</h2>
            <p className="text-sm text-blue-100 mb-4 line-height-relaxed">
              Student feedback is collected anonymously at the end of each semester based on <strong>5 standard questions</strong>. The final <strong>Overall Rating</strong> is a direct average of these five metrics, each graded on a scale of 1.0 to 5.0.
            </p>
            
            <div className="space-y-3">
              <div className="bg-white/10 p-3 rounded-xl border border-white/20 flex items-start gap-3">
                <BookOpen size={18} className="text-blue-200 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">Q1: Clarity of Explanation</div>
                  <div className="text-[10px] text-blue-200">How clearly the faculty explains the concepts and subject topics.</div>
                </div>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/20 flex items-start gap-3">
                <TrendingUp size={18} className="text-blue-200 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">Q2: Practical Applications</div>
                  <div className="text-[10px] text-blue-200">Effective use of examples, practical applications, or demonstrations.</div>
                </div>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/20 flex items-start gap-3">
                <MessageSquare size={18} className="text-blue-200 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">Q3: Doubt Encouragement</div>
                  <div className="text-[10px] text-blue-200">Encouragement to ask questions, participate, and clarify doubts.</div>
                </div>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/20 flex items-start gap-3">
                <Clock size={18} className="text-blue-200 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">Q4: Class Conduct & Assessments</div>
                  <div className="text-[10px] text-blue-200">Effectiveness in conducting classes, assignments, and assessments.</div>
                </div>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/20 flex items-start gap-3">
                <Star size={18} className="text-blue-200 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">Q5: Overall Teaching Effectiveness</div>
                  <div className="text-[10px] text-blue-200">Rating of overall teaching effectiveness and support.</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="text-xs font-bold text-blue-200 mb-1">Calculation Formula:</div>
              <code className="text-[10px] bg-black/30 px-2 py-1 rounded font-mono block w-full text-center">
                (Q1 + Q2 + Q3 + Q4 + Q5) ÷ 5 = Overall Rating
              </code>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                <div className="text-2xl font-black text-gray-700">4.6</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase mt-1">College Avg</div>
              </div>
              <div className="bg-green-50 p-4 rounded-2xl border border-green-100 text-center">
                <div className="text-2xl font-black text-green-700">92%</div>
                <div className="text-[10px] font-bold text-green-600 uppercase mt-1">Participation</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

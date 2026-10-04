import { useState } from 'react';
import { Award, TrendingUp, CalendarDays, BookOpen, CheckCircle, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const resultsData = [
  { id: 1, date: "September 21, 2026", subject: "CHN", score: 46, max: 50 },
  { id: 2, date: "September 14, 2026", subject: "CC", score: 48, max: 50 },
  { id: 3, date: "September 7, 2026", subject: "AIML", score: 42, max: 50 },
  { id: 4, date: "August 31, 2026", subject: "CBT", score: 45, max: 50 },
  { id: 5, date: "August 24, 2026", subject: "IoT", score: 49, max: 50 },
  { id: 6, date: "August 17, 2026", subject: "CC", score: 44, max: 50 },
  { id: 7, date: "August 10, 2026", subject: "CHN", score: 47, max: 50 },
  { id: 8, date: "August 3, 2026", subject: "AIML", score: 43, max: 50 },
  { id: 9, date: "July 27, 2026", subject: "CBT", score: 48, max: 50 },
  { id: 10, date: "July 20, 2026", subject: "IoT", score: 45, max: 50 },
];

export default function Results() {
  const [filter, setFilter] = useState('all');

  const averageScore = Math.round(resultsData.reduce((acc, curr) => acc + curr.score, 0) / resultsData.length);
  const percentage = Math.round((averageScore / 50) * 100);

  // Reverse data for chronological chart
  const chartData = [...resultsData].reverse().map(item => ({
    name: item.subject,
    score: item.score
  }));

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 overflow-hidden">
      
      {/* Header Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        <div className="md:col-span-2 bg-blue-900 p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">Weekly Test Results</h2>
            <p className="text-sm text-blue-200">Track your performance across ODD - V Semester</p>
          </div>
          <div className="relative z-10 w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center border-4 border-white/20">
            <Award size={32} className="text-yellow-400" />
          </div>
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 translate-y-10 blur-2xl"></div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Average Score</p>
            <div className="flex items-baseline gap-1 mt-1">
              <h3 className="text-3xl font-black text-gray-800">{averageScore}</h3>
              <span className="text-sm font-bold text-gray-400">/ 50</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Overall Perf.</p>
            <div className="flex items-baseline gap-1 mt-1">
              <h3 className="text-3xl font-black text-blue-600">{percentage}%</h3>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <BarChart3 size={24} />
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0 overflow-hidden">
        
        {/* Results List */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col min-h-0 overflow-hidden">
          <div className="p-6 border-b border-gray-50 shrink-0 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" /> Test Scores History
            </h3>
            <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{resultsData.length} Tests</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
            {resultsData.map((item) => {
              const isHigh = item.score >= 45;
              return (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all group cursor-default">
                  
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center transition-colors ${isHigh ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1">{item.subject} Weekly Test</h4>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500">
                        <CalendarDays size={12} /> {item.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-xl font-black ${isHigh ? 'text-green-600' : 'text-blue-600'}`}>
                        {item.score}
                      </span>
                      <span className="text-xs font-bold text-gray-400">/ {item.max}</span>
                    </div>
                    {isHigh ? (
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase tracking-wider mt-1">Excellent</span>
                    ) : (
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider mt-1">Good</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Graph */}
        <div className="w-full xl:w-96 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col min-h-0 shrink-0">
          <div className="mb-6 shrink-0">
             <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-1">
                Performance Trend
             </h3>
             <p className="text-xs text-gray-500">Chronological score progression</p>
          </div>
          
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} dy={10} />
                <YAxis domain={[35, 50]} axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  cursor={{stroke: '#e5e7eb', strokeWidth: 1, strokeDasharray: '4 4'}}
                />
                <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#scoreGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 shrink-0">
             <div className="bg-blue-50 rounded-2xl p-4 flex gap-3">
               <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                 <TrendingUp size={16} />
               </div>
               <div>
                 <p className="text-xs font-bold text-blue-900 mb-1">Consistent Performer</p>
                 <p className="text-[10px] text-blue-700 leading-relaxed">You are maintaining a strong 40+ average across all core subjects. Keep it up!</p>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

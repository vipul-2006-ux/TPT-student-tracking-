import { useState } from 'react';
import { mockStudents } from '../../data/mockData';
import { CheckCircle2, XCircle, Calendar, CalendarOff, Coffee, Utensils, UserCircle } from 'lucide-react';

export default function Attendance() {
  const student = mockStudents.find(s => s.regNo === 'A2407066') || mockStudents[0];
  
  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  // Map of subjects to faculty based on timetable
  const facultyMap: Record<string, string> = {
    'Cloud Computing': 'Ms.M.Nandha',
    'AI & ML': 'Ms.V.Saranya',
    'IoT': 'Ms.R.RajaRajeswari',
    'Comp. Hardware': 'Mr. Sri Murugan',
    'Component Tech': 'Ms.R.Sangeetha',
    'Database Management': 'Ms.M.Nandha',
    'Professional Practice': 'Ms.V.Saranya',
    'Lab Session': 'Ms.R.RajaRajeswari',
    'Project Work': 'Mr. Sri Murugan',
    'Library': 'Ms.R.Sangeetha',
    'Placement': 'Ms.V.Saranya',
  };

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  });

  const getDayTitle = (index: number) => {
    if (index === 0) return "Today's Timetable";
    if (index === 1) return "Yesterday";
    return `${index} Days Ago`;
  };

  const generateTimetable = (dateIndex: number) => {
    const isWeekend = last7Days[dateIndex].getDay() === 0 || last7Days[dateIndex].getDay() === 6;
    if (isWeekend) return []; 
    
    return [
      { type: 'class', slot: 'Period 1', time: '08:45 AM – 09:35 AM', subject: 'Cloud Computing', status: 'present' },
      { type: 'class', slot: 'Period 2', time: '09:35 AM – 10:25 AM', subject: 'AI & ML', status: 'present' },
      { type: 'break', slot: 'Break', time: '10:25 AM – 10:35 AM', subject: 'Tea Break', status: null },
      { type: 'class', slot: 'Period 3', time: '10:35 AM – 11:25 AM', subject: 'Database Management', status: dateIndex % 3 === 0 ? 'absent' : 'present' },
      { type: 'class', slot: 'Period 4', time: '11:25 AM – 12:15 PM', subject: 'Professional Practice', status: 'present' },
      { type: 'break', slot: 'Lunch Break', time: '12:15 PM – 01:15 PM', subject: 'Lunch', status: null },
      { type: 'class', slot: 'Period 5', time: '01:15 PM – 02:05 PM', subject: 'AI & ML', status: 'present' },
      { type: 'class', slot: 'Period 6', time: '02:05 PM – 02:55 PM', subject: 'Lab Session', status: dateIndex % 4 === 0 ? 'absent' : 'present' },
      { type: 'break', slot: 'Break', time: '02:55 PM – 03:05 PM', subject: 'Short Break', status: null },
      { type: 'class', slot: 'Period 7', time: '03:05 PM – 03:55 PM', subject: 'Project Work', status: 'present' },
      { type: 'class', slot: 'Period 8', time: '03:55 PM – 04:45 PM', subject: 'Library', status: 'present' },
      { type: 'class', slot: 'Special Slot', time: '04:50 PM – 05:20 PM', subject: 'Placement', status: 'present' },
    ];
  };

  const holidays = [
    { date: '14 Jan 2026', name: 'Pongal', type: 'Public Holiday' },
    { date: '15 Jan 2026', name: 'Thiruvalluvar Day', type: 'Public Holiday' },
    { date: '26 Jan 2026', name: 'Republic Day', type: 'Public Holiday' },
    { date: '15 Aug 2026', name: 'Independence Day', type: 'Public Holiday' },
    { date: '02 Oct 2026', name: 'Gandhi Jayanti', type: 'Public Holiday' },
    { date: '04 Nov 2026', name: 'Diwali', type: 'Public Holiday' },
    { date: '25 Dec 2026', name: 'Christmas', type: 'Public Holiday' },
  ];

  const renderHorizontalTimetable = (date: Date, index: number) => {
    const data = generateTimetable(index);
    const isWeekend = data.length === 0;
    
    return (
      <div key={index} className={`bg-white p-6 rounded-3xl shadow-sm border border-gray-100 shrink-0 ${index > 0 ? 'opacity-80 hover:opacity-100 transition-opacity' : ''}`}>
        <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            {index === 0 && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
            {getDayTitle(index)}
          </h3>
          <span className="text-sm font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-full">{formatDate(date)}</span>
        </div>
        
        {isWeekend ? (
           <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100">
             <span className="text-2xl mb-2 block">🌴</span>
             <h4 className="font-bold text-gray-700">Weekend</h4>
             <p className="text-xs text-gray-500">No classes scheduled</p>
           </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar snap-x">
            {data.map((item, idx) => {
              const faculty = item.type === 'class' ? facultyMap[item.subject] || 'Faculty' : null;
              
              return (
                <div key={idx} className={`snap-start min-w-[170px] max-w-[170px] p-4 rounded-2xl border flex flex-col justify-between shrink-0 ${item.type === 'break' ? 'bg-orange-50/50 border-orange-100' : 'bg-gray-50/80 border-gray-100 hover:border-blue-200 transition-colors'}`}>
                  
                  <div className="mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${item.type === 'break' ? 'bg-orange-100 text-orange-700' : 'bg-white text-blue-900 shadow-sm border border-gray-100'}`}>
                        {item.slot}
                      </span>
                      {item.type === 'break' && (
                        item.slot === 'Lunch Break' ? <Utensils size={14} className="text-orange-500" /> : <Coffee size={14} className="text-orange-500" />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 mb-1.5 font-medium tracking-tight">{item.time}</p>
                    <h4 className="font-bold text-gray-800 text-[13px] leading-tight mb-2">{item.subject}</h4>
                    
                    {faculty && (
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-blue-700 bg-blue-50/50 p-1.5 rounded-lg">
                        <UserCircle size={12} className="text-blue-500" />
                        {faculty}
                      </div>
                    )}
                  </div>

                  {item.type === 'class' && (
                    <div className="mt-auto">
                      {item.status === 'present' ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-green-600 bg-green-50 px-2 py-1.5 rounded-lg w-full justify-center border border-green-100">
                          <CheckCircle2 size={12} /> Present
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-red-600 bg-red-50 px-2 py-1.5 rounded-lg w-full justify-center border border-red-100">
                          <XCircle size={12} /> Absent
                        </span>
                      )}
                    </div>
                  )}
                  {item.type === 'break' && (
                    <div className="mt-auto flex justify-center pt-2">
                      <span className="text-[11px] text-orange-400 font-bold tracking-widest uppercase">Break Time</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 overflow-hidden">
      
      {/* Header & Overall Percentage */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Attendance Dashboard</h2>
          <p className="text-sm text-gray-500">Monitor your daily presence across all periods and upcoming holidays.</p>
        </div>
        <div className="text-right flex items-center gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Overall</p>
            <p className="text-3xl font-black text-blue-900">{student.attendance}%</p>
          </div>
          <div className="w-14 h-14 rounded-full border-4 border-blue-900 flex items-center justify-center bg-blue-50 text-blue-900 shadow-inner">
             <Calendar size={24} />
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0 overflow-hidden">
        
        {/* Left Column: Last 7 Days Timetables */}
        <div className="flex-1 flex flex-col gap-6 min-h-0 overflow-y-auto pr-2 hide-scrollbar">
          {last7Days.map((date, index) => renderHorizontalTimetable(date, index))}
        </div>

        {/* Right Column: Holiday Timetable */}
        <div className="w-full xl:w-72 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col min-h-0 shrink-0">
          <div className="flex items-center gap-2 mb-6 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <CalendarOff size={18} />
            </div>
            <h3 className="font-bold text-gray-800">College Holidays</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 hide-scrollbar">
            {holidays.map((h, i) => (
              <div key={i} className="relative pl-6 before:absolute before:left-1.5 before:top-2 before:w-2 before:h-2 before:bg-orange-400 before:rounded-full after:absolute after:left-2 after:top-4 after:bottom-[-16px] after:w-[2px] after:bg-gray-100 last:after:hidden">
                <h4 className="font-bold text-sm text-gray-800">{h.name}</h4>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">{h.date}</p>
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded uppercase">{h.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

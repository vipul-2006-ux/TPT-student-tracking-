import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import StudentDashboard from './pages/student/Dashboard';
import Attendance from './pages/student/Attendance';
import Assignments from './pages/student/Assignments';
import Timetable from './pages/student/Timetable';
import Results from './pages/student/Results';
import Feedback from './pages/student/Feedback';
import Profile from './pages/student/Profile';
import Settings from './pages/student/Settings';
import StudentAnnouncements from './pages/student/Announcements';
// Reuse student components for parent since they view the same data
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyProfile from './pages/faculty/Profile';
import FacultyClasses from './pages/faculty/Classes';
import FacultySubjects from './pages/faculty/Subjects';
import FacultyAttendance from './pages/faculty/Attendance';
import FacultyAssignments from './pages/faculty/Assignments';
import FacultyTimetable from './pages/faculty/Timetable';
import FacultyAnnouncements from './pages/faculty/Announcements';
import FacultyResults from './pages/faculty/Results';
import FacultyFeedback from './pages/faculty/Feedback';
import FacultyDevelopment from './pages/faculty/Development';
import FacultyCourses from './pages/faculty/Courses';
import FacultyNotifications from './pages/faculty/Notifications';
import FacultySettings from './pages/faculty/Settings';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import Departments from './pages/admin/Departments';
import Academic from './pages/admin/Academic';
import AdminSettings from './pages/admin/Settings';
import FeedbackReports from './pages/admin/FeedbackReports';
import AdminAnnouncements from './pages/admin/Announcements';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/student" element={<MainLayout role="student" />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="announcements" element={<StudentAnnouncements />} />
          <Route path="results" element={<Results />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/parent" element={<MainLayout role="parent" />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="results" element={<Results />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/faculty" element={<MainLayout role="faculty" />}>
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="profile" element={<FacultyProfile />} />
          <Route path="classes" element={<FacultyClasses />} />
          <Route path="subjects" element={<FacultySubjects />} />
          <Route path="attendance" element={<FacultyAttendance />} />
          <Route path="assignments" element={<FacultyAssignments />} />
          <Route path="timetable" element={<FacultyTimetable />} />
          <Route path="announcements" element={<FacultyAnnouncements />} />
          <Route path="results" element={<FacultyResults />} />
          <Route path="feedback" element={<FacultyFeedback />} />
          <Route path="development" element={<FacultyDevelopment />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/admin" element={<MainLayout role="admin" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="departments" element={<Departments />} />
          <Route path="students" element={<AdminDashboard />} />
          <Route path="faculty" element={<AdminDashboard />} />
          <Route path="academic" element={<Academic />} />
          <Route path="attendance" element={<AdminDashboard />} />
          <Route path="feedback" element={<FeedbackReports />} />
          <Route path="events" element={<AdminDashboard />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="notices" element={<AdminDashboard />} />
          <Route path="activity" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

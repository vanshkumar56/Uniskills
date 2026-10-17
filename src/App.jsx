import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import CreateAccount from "./pages/CreateAccount.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import BasicDetails from "./pages/BasicDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import StudentStep1 from "./pages/student/StudentStep1.jsx";
import StudentStep2 from "./pages/student/StudentStep2.jsx";
import StudentStep3 from "./pages/student/StudentStep3.jsx";
import StudentStep4 from "./pages/student/StudentStep4.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";

import MentorLogin1 from "./pages/mentor/MentorLogin1.jsx";
import MentorLogin2 from "./pages/mentor/MentorLogin2.jsx";
import MentorDashboard from "./pages/mentor/MentorDashboard.jsx";

import AlumniLogin1 from "./pages/alumni/AlumniLogin1.jsx";
import AlumniLogin2 from "./pages/alumni/AlumniLogin2.jsx";
import AlumniDashboard from "./pages/alumni/AlumniDashboard.jsx";
import Compete from "./pages/student/Compete";
import Learning from "./pages/student/Learning";
import MentorShip from "./pages/student/Mentorship";
import MentorOverview from "./pages/mentor/MentorOverview";
import MentorRequests from "./pages/mentor/MentorRequests";
import MentorStudents from "./pages/mentor/MentorStudents";
import MentorSessions from "./pages/mentor/MentorSessions";
import MentorProfile from "./pages/mentor/MentorProfile";
import MentorSettings from "./pages/mentor/MentorSettings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/basic-details" element={<BasicDetails />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Student flow */}
      <Route path="/student/step-1" element={<StudentStep1 />} />
      <Route path="/student/step-2" element={<StudentStep2 />} />
      <Route path="/student/step-3" element={<StudentStep3 />} />
      <Route path="/student/step-4" element={<StudentStep4 />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/competitions" element={<Compete />} />
      <Route path="/student/learning" element={<Learning />} />
      <Route path="/student/mentorship" element={<MentorShip />} />
      {/* Mentor flow */}
      <Route path="/mentor/login-1" element={<MentorLogin1 />} />
      <Route path="/mentor/login-2" element={<MentorLogin2 />} />
      <Route path="/mentor/dashboard" element={<MentorDashboard />} />
      <Route path="/mentor/dashboard" element={<MentorOverview />} />
      <Route path="/mentor/requests" element={<MentorRequests />} />
      <Route path="/mentor/students" element={<MentorStudents />} />
      <Route path="/mentor/sessions" element={<MentorSessions />} />
      <Route path="/mentor/profile" element={<MentorProfile />} />
      <Route path="/mentor/settings" element={<MentorSettings />} />
      {/* Alumni flow */}
      <Route path="/alumni/login-1" element={<AlumniLogin1 />} />
      <Route path="/alumni/login-2" element={<AlumniLogin2 />} />
      <Route path="/alumni/dashboard" element={<AlumniDashboard />} />
    </Routes>
  );
}

export default App;

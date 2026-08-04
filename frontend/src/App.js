import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import JudgeDashboard from "./components/JudgeDashboard";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ProfilePage from "./components/ProfilePage";
import ResultsPage from "./components/ResultsPage";
import FeedbackPage from "./components/FeedbackPage";


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<HomePage />} />
       
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/judge/dashboard" element={<JudgeDashboard />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

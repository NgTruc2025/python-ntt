
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserCircle, LogOut } from 'lucide-react';
import Sidebar from './components/Sidebar';
import FunctionLookup from './components/FunctionLookup';
import KnowledgeBase from './components/KnowledgeBase';
import PracticeArena from './components/PracticeArena';
import LibraryExplorer from './components/LibraryExplorer';
import RegistrationModal from './components/RegistrationModal';
import { Student } from './types';

const App: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [showRegModal, setShowRegModal] = useState(false);

  useEffect(() => {
    const savedStudent = localStorage.getItem('py_master_student');
    if (savedStudent) {
      setStudent(JSON.parse(savedStudent));
    } else {
      setShowRegModal(true);
    }
  }, []);

  const handleRegister = (newStudent: Student) => {
    setStudent(newStudent);
    setShowRegModal(false);
  };

  const handleLogout = () => {
    if (window.confirm("Bạn có muốn xóa thông tin ghi danh hiện tại để thay đổi học sinh khác không?")) {
      localStorage.removeItem('py_master_student');
      setStudent(null);
      setShowRegModal(true);
    }
  };

  return (
    <Router>
      <div className="flex h-screen w-screen bg-slate-50 overflow-hidden">
        {showRegModal && <RegistrationModal onRegister={handleRegister} />}
        
        <Sidebar />
        
        <main className="flex-1 ml-64 h-full relative overflow-hidden flex flex-col">
          {/* Top Header / Student Profile Bar */}
          {student && (
            <div className="absolute top-6 right-8 z-[40] pointer-events-none">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-700">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                  <UserCircle size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none mb-1">Học sinh</span>
                  <span className="text-sm font-black text-slate-800 tracking-tight leading-none">{student.name}</span>
                </div>
                <div className="w-px h-8 bg-slate-200 mx-2"></div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  title="Đăng xuất / Thay đổi thông tin"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<FunctionLookup />} />
              <Route path="/learn" element={<KnowledgeBase />} />
              <Route path="/libraries" element={<LibraryExplorer />} />
              <Route path="/practice" element={<PracticeArena />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;

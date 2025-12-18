
import React, { useState } from 'react';
import { UserPlus, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { Student } from '../types';

interface RegistrationModalProps {
  onRegister: (student: Student) => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    
    setIsSubmitting(true);
    const newStudent: Student = {
      name: name.trim(),
      email: email.trim(),
      enrolledAt: new Date().toISOString(),
      completedTopics: [],
      completedExercises: []
    };
    
    // Giả lập lưu trữ
    localStorage.setItem('py_master_student', JSON.stringify(newStudent));
    
    setTimeout(() => {
      onRegister(newStudent);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
          
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-xl border border-white/30 shadow-2xl">
            <UserPlus size={40} className="text-white" />
          </div>
          
          <h2 className="text-3xl font-black mb-2 tracking-tight">Ghi danh Học tập</h2>
          <p className="text-blue-100 font-medium opacity-90 leading-relaxed">Nhập thông tin để bắt đầu hành trình chinh phục Python và theo dõi tiến độ của bạn.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Họ và tên học sinh</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                required
                type="text"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-base font-bold placeholder:font-medium"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Địa chỉ Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                required
                type="email"
                placeholder="a@school.edu.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-base font-bold placeholder:font-medium"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800">
            <ShieldCheck size={20} className="shrink-0 text-emerald-500" />
            <p className="text-xs font-medium leading-relaxed">Thông tin của bạn được lưu trữ an toàn tại máy bộ nhớ trình duyệt.</p>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-[1.02] active:scale-95"
          >
            {isSubmitting ? (
              <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                Bắt đầu học ngay
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;

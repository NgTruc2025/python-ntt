
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Search, Terminal, Settings, Star, Package } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 translate-x-1'
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <div className="w-64 bg-white h-screen border-r border-slate-200 flex flex-col fixed left-0 top-0 z-50 shadow-sm">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-200">
          Py
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">PyMaster</h1>
          <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Learn Python</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <NavLink to="/" className={navClass}>
          <Search size={20} className="shrink-0" />
          <span className="font-bold text-sm">Tra Cứu Hàm</span>
        </NavLink>
        <NavLink to="/learn" className={navClass}>
          <BookOpen size={20} className="shrink-0" />
          <span className="font-bold text-sm">Kiến Thức</span>
        </NavLink>
        <NavLink to="/libraries" className={navClass}>
          <Package size={20} className="shrink-0" />
          <span className="font-bold text-sm">Thư Viện</span>
        </NavLink>
        <NavLink to="/practice" className={navClass}>
          <Terminal size={20} className="shrink-0" />
          <span className="font-bold text-sm">Luyện Tập</span>
        </NavLink>
      </nav>

      <div className="p-4 mx-4 mb-4 rounded-2xl bg-blue-50/50 border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
           <div className="p-1.5 bg-yellow-100 rounded-lg text-yellow-600">
              <Star size={14} fill="currentColor" />
           </div>
           <span className="text-[11px] font-bold text-slate-700">Tiến trình học</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
           <div className="h-full w-1/3 bg-blue-600 rounded-full"></div>
        </div>
        <div className="mt-2 text-[10px] text-slate-400 font-medium flex justify-between">
           <span>Cấp độ: Người mới</span>
           <span>33%</span>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-3 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors px-2">
           <Settings size={18} />
           <span className="text-xs font-bold">Cài đặt</span>
        </div>
        <div className="px-2 space-y-1">
          <div className="text-[10px] text-slate-300 font-medium uppercase tracking-tighter">
            Powered by Gemini 3 Flash
          </div>
          <div className="text-[10px] text-slate-400 font-bold">
            Copyright © NTTHighschool
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

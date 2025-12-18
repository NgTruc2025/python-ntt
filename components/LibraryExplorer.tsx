
import React, { useState } from 'react';
import { Package, Search, ChevronRight, Terminal, CheckCircle2, Code, Info, Sparkles, Download } from 'lucide-react';
import { pythonLibraries } from '../data';
import { PythonLibrary } from '../types';

const LibraryExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLib, setSelectedLib] = useState<PythonLibrary | null>(null);

  const filteredLibs = pythonLibraries.filter((lib) =>
    lib.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lib.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full bg-slate-50">
      {/* List Sidebar */}
      <div className="w-[380px] border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Package className="text-blue-600" size={24} /> Thư viện Python
          </h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Tìm thư viện (math, pandas...)"
              className="w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-[15px] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredLibs.length > 0 ? (
            filteredLibs.map((lib) => (
              <button
                key={lib.name}
                onClick={() => setSelectedLib(lib)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 group relative ${
                  selectedLib?.name === lib.name 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 translate-x-1' 
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-lg tracking-tight">{lib.name}</span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    selectedLib?.name === lib.name ? 'border-white/40 text-white' : 'border-slate-200 text-slate-400'
                  }`}>
                    {lib.category}
                  </span>
                </div>
                <p className={`text-xs truncate ${selectedLib?.name === lib.name ? 'text-blue-100' : 'text-slate-500'}`}>
                  {lib.description}
                </p>
                {selectedLib?.name === lib.name && (
                  <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60" />
                )}
              </button>
            ))
          ) : (
            <div className="p-12 text-center">
              <Package size={48} className="mx-auto text-slate-200 mb-4 opacity-20" />
              <p className="text-slate-400 font-bold">Không tìm thấy thư viện.</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        {selectedLib ? (
          <div className="max-w-4xl mx-auto px-12 py-16 animate-in fade-in slide-in-from-bottom-6 duration-500">
            <header className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-4 bg-blue-50 text-blue-600 rounded-[24px]">
                    <Package size={36} />
                 </div>
                 <div>
                   <h2 className="text-5xl font-black text-slate-900 tracking-tight">{selectedLib.name}</h2>
                   <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{selectedLib.category}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="text-xs font-bold text-slate-400">{selectedLib.isStandard ? 'Tích hợp sẵn' : 'Cần cài đặt'}</span>
                   </div>
                 </div>
              </div>
              <p className="text-2xl text-slate-600 leading-relaxed font-medium">{selectedLib.description}</p>
            </header>

            <div className="space-y-12">
              {!selectedLib.isStandard && selectedLib.installCommand && (
                <section className="bg-slate-900 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute right-0 top-0 p-8 text-white/5 pointer-events-none group-hover:scale-110 transition-transform">
                    <Download size={140} />
                  </div>
                  <h3 className="text-white font-black text-xl mb-6 flex items-center gap-3">
                    <Terminal size={20} className="text-blue-400" /> Cài đặt bằng PIP
                  </h3>
                  <div className="flex items-center justify-between bg-black/40 p-5 rounded-2xl border border-white/10 group-hover:border-blue-500/30 transition-colors">
                    <code className="text-blue-300 font-mono text-lg">{selectedLib.installCommand}</code>
                    <button 
                      onClick={() => navigator.clipboard.writeText(selectedLib.installCommand!)}
                      className="text-white/40 hover:text-white transition-colors text-xs font-bold"
                    >
                      Copy
                    </button>
                  </div>
                </section>
              )}

              <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-blue-50/50 p-8 rounded-[32px] border border-blue-100/50">
                  <h3 className="flex items-center gap-3 font-black text-blue-900 mb-6 text-xl">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                      <CheckCircle2 size={20} />
                    </div>
                    Tính năng nổi bật
                  </h3>
                  <ul className="space-y-4">
                    {selectedLib.keyFeatures.map((feature, idx) => (
                      <li key={idx} className="flex gap-4 text-[17px] text-slate-700 leading-relaxed font-medium">
                        <span className="text-blue-500 shrink-0 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                  <h3 className="flex items-center gap-3 font-black text-slate-800 mb-6 text-xl">
                    <div className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center">
                      <Info size={20} />
                    </div>
                    Tại sao nên dùng?
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
                    {selectedLib.name} là công cụ tiêu chuẩn {selectedLib.category === 'Thư viện chuẩn' ? 'được xây dựng ngay trong Python' : 'trong ngành'} giúp bạn xử lý các bài toán phức tạp mà không cần tự viết lại mọi thứ từ đầu.
                  </p>
                </div>
              </section>

              <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="flex items-center gap-3 font-black text-slate-900 text-2xl">
                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                      <Code size={20} />
                    </div>
                    Ví dụ sử dụng
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-500 uppercase tracking-widest">
                    <Sparkles size={14} /> Example.py
                  </div>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-8 rounded-3xl font-mono text-[17px] border border-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner">
                  {selectedLib.example}
                </pre>
              </section>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50/30">
            <div className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center mb-8 shadow-xl border border-slate-100 animate-bounce duration-[2000ms]">
               <Package size={48} className="text-blue-200" />
            </div>
            <h2 className="text-3xl font-black text-slate-400">Khám phá Sức mạnh Python</h2>
            <p className="text-slate-400 mt-3 text-lg font-medium max-w-sm text-center leading-relaxed">Chọn một thư viện ở cột bên trái để xem cách nó giúp bạn giải quyết các vấn đề thực tế.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryExplorer;

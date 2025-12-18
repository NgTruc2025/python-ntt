
import React, { useState } from 'react';
import { Search, AlertTriangle, Lightbulb, Info, Code } from 'lucide-react';
import { pythonFunctions } from '../data';
import { PythonFunction } from '../types';

const FunctionLookup: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFunc, setSelectedFunc] = useState<PythonFunction | null>(null);

  // Filter logic
  const filteredFunctions = pythonFunctions.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full bg-slate-50">
      {/* List Column */}
      <div className="w-[380px] border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Tìm hàm (print, len...)"
              className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-base font-medium transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hàm tích hợp (Built-in)</div>
          {filteredFunctions.length > 0 ? (
            filteredFunctions.map((func) => (
              <button
                key={func.name}
                onClick={() => setSelectedFunc(func)}
                className={`w-full text-left p-4 rounded-xl transition-all relative group ${
                  selectedFunc?.name === func.name 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-mono font-black text-lg leading-none">{func.name}()</div>
                <div className={`text-xs mt-2 truncate ${selectedFunc?.name === func.name ? 'text-blue-100' : 'text-slate-400'}`}>
                  {func.description}
                </div>
              </button>
            ))
          ) : (
            <div className="p-10 text-center text-slate-400">
              <p className="font-bold">Không tìm thấy hàm.</p>
              <p className="text-xs mt-2">Hãy thử tên khác nhé!</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Column */}
      <div className="flex-1 overflow-y-auto p-12 bg-white">
        {selectedFunc ? (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    <Code size={32} />
                 </div>
                 <h2 className="text-5xl font-black font-mono text-slate-900 tracking-tight">{selectedFunc.name}()</h2>
              </div>
              <p className="text-2xl text-slate-600 leading-relaxed font-medium">{selectedFunc.description}</p>
            </header>

            <div className="grid grid-cols-1 gap-10">
              <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="flex items-center gap-3 font-black text-slate-800 mb-6 text-xl">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                    <Info size={18} />
                  </div>
                  Cú pháp sử dụng
                </h3>
                <code className="block bg-slate-900 text-blue-300 p-6 rounded-2xl font-mono text-[17px] leading-relaxed shadow-xl border border-slate-800">
                  {selectedFunc.syntax}
                </code>
              </section>

              <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
                <h3 className="flex items-center gap-3 font-black text-slate-800 mb-6 text-xl">
                  <div className="w-8 h-8 bg-indigo-500 text-white rounded-lg flex items-center justify-center">
                    <Code size={18} />
                  </div>
                  Ví dụ minh họa
                </h3>
                <pre className="bg-slate-50 text-slate-700 p-8 rounded-2xl font-mono text-[16px] border border-slate-100 whitespace-pre-wrap leading-relaxed">
                  {selectedFunc.example}
                </pre>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-rose-50 p-8 rounded-3xl border border-rose-100 flex flex-col">
                  <h3 className="flex items-center gap-3 font-black text-rose-700 mb-6 text-xl">
                    <div className="w-8 h-8 bg-rose-500 text-white rounded-lg flex items-center justify-center">
                      <AlertTriangle size={18} />
                    </div>
                    Cẩn thận lỗi!
                  </h3>
                  <ul className="space-y-4">
                    {selectedFunc.commonErrors.map((err, idx) => (
                      <li key={idx} className="flex gap-3 text-rose-800 text-[16px] leading-relaxed font-medium">
                        <span className="text-rose-400 shrink-0 mt-1.5">•</span>
                        {err}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                  <h3 className="flex items-center gap-3 font-black text-emerald-700 mb-6 text-xl">
                    <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center">
                      <Lightbulb size={18} />
                    </div>
                    Mẹo chuyên gia
                  </h3>
                  <div className="p-4 bg-white/50 rounded-2xl">
                    <p className="text-emerald-800 text-[16px] leading-relaxed font-medium italic">"{selectedFunc.tips}"</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-300">
            <div className="w-32 h-32 bg-slate-50 rounded-[40px] flex items-center justify-center mb-6 shadow-inner border border-slate-100">
               <Search size={48} className="opacity-20" />
            </div>
            <p className="text-2xl font-black text-slate-400">Chọn một hàm bên trái</p>
            <p className="text-slate-300 mt-2 font-medium">Để khám phá cách thức hoạt động của nó!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunctionLookup;

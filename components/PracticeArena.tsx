
import React, { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle, XCircle, Loader2, RefreshCw, HelpCircle, Terminal, BookOpen, Code2, Sparkles, ChevronDown, Hash, Target } from 'lucide-react';
import { exercises as initialExercises, knowledgeBase } from '../data';
import { Exercise, AIAnalysisResult, Difficulty } from '../types';
import { analyzeCode, generateAIExercise } from '../services/geminiService';

const PracticeArena: React.FC = () => {
  const [exerciseList, setExerciseList] = useState<Exercise[]>(initialExercises);
  const [selectedEx, setSelectedEx] = useState<Exercise>(initialExercises[0]);
  const [userCode, setUserCode] = useState(initialExercises[0].initialCode);
  const [isChecking, setIsChecking] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showTopicPicker, setShowTopicPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close topic picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowTopicPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check for pending AI exercises from KnowledgeBase
  useEffect(() => {
    const pendingExStr = sessionStorage.getItem('pending_ai_exercise');
    if (pendingExStr) {
      try {
        const pendingEx = JSON.parse(pendingExStr) as Exercise;
        setExerciseList(prev => [pendingEx, ...prev]);
        setSelectedEx(pendingEx);
        setUserCode(pendingEx.initialCode);
        sessionStorage.removeItem('pending_ai_exercise');
      } catch (e) {
        console.error("Failed to parse pending exercise", e);
      }
    }
  }, []);

  useEffect(() => {
    setShowHint(false);
  }, [selectedEx.id]);

  const handleSelectExercise = (ex: Exercise) => {
    setSelectedEx(ex);
    setUserCode(ex.initialCode);
    setResult(null);
  };

  const handleGenerateExercise = async (topic?: string) => {
    setIsGenerating(true);
    setShowTopicPicker(false);
    try {
      const newEx = await generateAIExercise(topic);
      setExerciseList(prev => [newEx, ...prev]);
      handleSelectExercise(newEx);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCheck = async () => {
    if (!userCode.trim()) return;
    setIsChecking(true);
    setResult(null);
    try {
      const analysis = await analyzeCode(userCode, selectedEx.description);
      setResult(analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setIsChecking(false);
    }
  };

  const difficultyStyles = {
    [Difficulty.Easy]: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    [Difficulty.Medium]: 'text-amber-600 bg-amber-50 border-amber-100',
    [Difficulty.Hard]: 'text-rose-600 bg-rose-50 border-rose-100',
  };

  return (
    <div className="flex h-full bg-slate-50 overflow-hidden">
      {/* Exercise List Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 shadow-sm z-20">
        <div className="p-4 border-b border-slate-100 space-y-2">
          <div className="relative" ref={pickerRef}>
            <button
              onClick={() => setShowTopicPicker(!showTopicPicker)}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
            >
              {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
              <span className="text-sm">Tạo bài tập với AI</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${showTopicPicker ? 'rotate-180' : ''}`} />
            </button>

            {showTopicPicker && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200 max-h-[400px] overflow-y-auto">
                <div className="p-3 bg-slate-50 border-b border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Target size={12} /> Chọn chủ đề luyện tập
                  </span>
                </div>
                <button
                  onClick={() => handleGenerateExercise()}
                  className="w-full text-left p-4 hover:bg-blue-50 text-slate-700 font-bold transition-colors flex items-center gap-3 border-b border-slate-50"
                >
                  <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg"><RefreshCw size={14} /></div>
                  Ngẫu nhiên
                </button>
                {knowledgeBase.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => handleGenerateExercise(topic.title)}
                    className="w-full text-left p-4 hover:bg-slate-50 text-slate-600 text-sm font-medium transition-colors flex items-center gap-3 border-b border-slate-50 last:border-0"
                  >
                    <div className="p-1.5 bg-slate-100 text-slate-400 rounded-lg"><Hash size={14} /></div>
                    {topic.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-3 space-y-2">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Danh sách thử thách</div>
          {exerciseList.map((ex) => (
            <button
              key={ex.id}
              onClick={() => handleSelectExercise(ex)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden ${
                selectedEx.id === ex.id 
                  ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/10' 
                  : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              {ex.isAiGenerated && (
                <div className="absolute top-0 right-0 p-1">
                   <Sparkles size={10} className="text-blue-400" />
                </div>
              )}
              <div className={`text-[15px] font-bold mb-2 ${selectedEx.id === ex.id ? 'text-blue-700' : 'text-slate-700'}`}>
                {ex.title}
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${difficultyStyles[ex.difficulty as Difficulty] || difficultyStyles[Difficulty.Easy]}`}>
                  {ex.difficulty}
                </span>
                {selectedEx.id === ex.id && <Code2 size={14} className="text-blue-400" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white px-8 py-8 border-b border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedEx.title}</h2>
                 <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${difficultyStyles[selectedEx.difficulty as Difficulty] || difficultyStyles[Difficulty.Easy]}`}>
                  {selectedEx.difficulty}
                </span>
              </div>
              <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">{selectedEx.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowHint(!showHint)}
                className={`px-5 py-3 rounded-xl transition-all flex items-center gap-2 text-sm font-bold ${
                  showHint ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <HelpCircle size={18} /> Gợi ý
              </button>
              <button
                onClick={handleCheck}
                disabled={isChecking}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 text-base"
              >
                {isChecking ? <Loader2 size={20} className="animate-spin" /> : <Play size={20} fill="currentColor" />}
                Kiểm tra bài
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col bg-slate-900 relative">
            {showHint && (
              <div className="absolute top-4 left-4 right-4 z-10 bg-amber-50 text-amber-900 p-6 rounded-2xl text-base border border-amber-200 shadow-2xl animate-in fade-in slide-in-from-top-4 flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                  <HelpCircle size={24} className="text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Gợi ý từ AI:</h4>
                  <p>{selectedEx.hint}</p>
                </div>
              </div>
            )}
            
            <div className="bg-slate-800/80 backdrop-blur-sm text-slate-400 px-6 py-3 text-xs font-mono border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 uppercase tracking-widest font-bold">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div> editor.py
                </span>
              </div>
              <button 
                onClick={() => setUserCode(selectedEx.initialCode)}
                className="hover:text-white flex items-center gap-2 transition-colors text-xs font-bold"
              >
                <RefreshCw size={14} /> Reset Code
              </button>
            </div>
            
            <div className="flex-1 relative flex">
              <div className="w-14 bg-slate-900/50 border-r border-white/5 flex flex-col pt-6 items-center text-xs font-mono text-slate-600 select-none">
                {Array.from({length: 40}).map((_, i) => <div key={i} className="h-7">{i + 1}</div>)}
              </div>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="flex-1 bg-transparent text-slate-100 p-6 font-mono text-[17px] border-0 resize-none focus:outline-none leading-7"
                spellCheck={false}
              />
            </div>
          </div>

          {/* AI Result Panel */}
          <div className="w-[450px] bg-slate-50 border-l border-slate-200 flex flex-col overflow-y-auto">
             <div className="p-6 bg-white border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                   <BookOpen size={20} className="text-blue-500" />
                   Hướng dẫn & Phản hồi
                </h3>
             </div>
             
             <div className="p-8">
                {!result && !isChecking && (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-6 shadow-sm">
                     <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                       <Terminal size={18} /> Nhiệm vụ:
                     </h4>
                     <p className="text-base text-slate-600 leading-relaxed">{selectedEx.description}</p>
                  </div>
                )}

                {result ? (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <div className={`p-6 rounded-2xl flex items-center gap-5 border-2 ${
                      result.isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
                    }`}>
                      {result.isCorrect ? <CheckCircle size={36} /> : <XCircle size={36} />}
                      <div>
                        <span className="font-black text-xl block leading-none">{result.isCorrect ? 'TUYỆT VỜI!' : 'CỐ GẮNG LÊN!'}</span>
                        <span className="text-sm opacity-70">{result.isCorrect ? 'Bạn đã hoàn thành bài tập' : 'Hãy kiểm tra lại logic code'}</span>
                      </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                      <div className="bg-slate-800 px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center">
                        <span>Terminal Output</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      <pre className="p-6 font-mono text-[14px] text-green-400 whitespace-pre-wrap leading-relaxed">{result.output || '> No output detected'}</pre>
                    </div>

                    <div className="space-y-6">
                       <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">AI Tutor Phân tích</h4>
                          <p className="text-base text-slate-700 leading-relaxed">{result.explanation}</p>
                       </div>
                       {result.suggestion && (
                         <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-xl shadow-blue-100 relative overflow-hidden group">
                           <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
                             <Code2 size={120} />
                           </div>
                           <h4 className="text-xs font-bold text-blue-100 uppercase mb-3 flex items-center gap-2">
                             <Sparkles size={14} /> Gợi ý nâng cấp code
                           </h4>
                           <p className="text-base font-medium leading-relaxed relative z-10">{result.suggestion}</p>
                         </div>
                       )}
                    </div>
                  </div>
                ) : (
                  <div className="h-96 flex flex-col items-center justify-center text-slate-400 text-center space-y-6">
                     {isChecking ? (
                        <>
                           <div className="relative">
                              <Loader2 className="animate-spin text-blue-500" size={48} />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Code2 size={18} className="text-blue-300" />
                              </div>
                           </div>
                           <p className="text-base font-bold text-blue-500 animate-pulse tracking-wide">AI ĐANG ĐỌC CODE CỦA BẠN...</p>
                        </>
                     ) : (
                        <>
                           <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-inner border border-slate-100">
                             <Terminal size={40} className="opacity-10" />
                           </div>
                           <div className="space-y-2">
                              <p className="font-bold text-slate-500 text-lg">Sẵn sàng để bắt đầu?</p>
                              <p className="text-sm text-slate-400 max-w-[250px] leading-relaxed">Viết giải pháp của bạn vào trình soạn thảo và nhấn nút "Kiểm tra bài".</p>
                           </div>
                        </>
                     )}
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeArena;

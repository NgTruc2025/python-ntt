
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, ChevronRight, Hash, ExternalLink, BrainCircuit, CheckCircle2, XCircle, Loader2, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import { knowledgeBase } from '../data';
import { KnowledgeTopic, QuizQuestion } from '../types';
import { generateTopicQuiz, generateAIExercise } from '../services/geminiService';

const KnowledgeBase: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<KnowledgeTopic>(knowledgeBase[0]);
  const [quiz, setQuiz] = useState<QuizQuestion | null>(null);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [isGeneratingEx, setIsGeneratingEx] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const categories = useMemo(() => Array.from(new Set(knowledgeBase.map(k => k.category))), []);

  useEffect(() => {
    setQuiz(null);
    setSelectedOption(null);
    setIsAnswered(false);
  }, [selectedTopic.id]);

  const handleGenerateQuiz = async () => {
    setIsLoadingQuiz(true);
    try {
      const newQuiz = await generateTopicQuiz(selectedTopic.title, selectedTopic.content);
      setQuiz(newQuiz);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  const handleGenerateExerciseForTopic = async () => {
    setIsGeneratingEx(true);
    try {
      const newEx = await generateAIExercise(selectedTopic.title);
      // Save to sessionStorage to pick up in PracticeArena
      sessionStorage.setItem('pending_ai_exercise', JSON.stringify(newEx));
      navigate('/practice');
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingEx(false);
    }
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const renderContent = (content: string) => {
    return content.split('```python').map((part, index) => {
      if (index === 0) {
        return (
          <div key={index} className="space-y-6">
            {part.split('\n').map((line, i) => {
              if (line.startsWith('**')) {
                return <h3 key={i} className="text-2xl font-black text-slate-900 mt-10 mb-4">{line.replace(/\*\*/g, '')}</h3>;
              }
              if (line.trim().startsWith('- ')) {
                const item = line.trim().substring(2);
                const parts = item.split('**');
                return (
                  <div key={i} className="flex gap-3 ml-4 py-1">
                    <span className="text-blue-600 font-bold">•</span>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      {parts.map((p, j) => (j % 2 === 1 ? <strong key={j} className="text-slate-900 font-black">{p}</strong> : p))}
                    </p>
                  </div>
                );
              }
              if (line.trim().length > 0) {
                const parts = line.split('**');
                return (
                  <p key={i} className="text-lg text-slate-700 leading-relaxed">
                    {parts.map((p, j) => (j % 2 === 1 ? <strong key={j} className="text-slate-900 font-black">{p}</strong> : p))}
                  </p>
                );
              }
              return null;
            })}
          </div>
        );
      }
      const [code, ...rest] = part.split('```');
      return (
        <React.Fragment key={index}>
          <div className="relative group my-10">
            <div className="absolute -top-3 left-6 px-3 py-1 bg-slate-800 text-slate-400 text-[10px] rounded font-bold uppercase tracking-widest z-10">Python Example</div>
            <pre className="bg-slate-900 text-slate-50 p-8 rounded-2xl font-mono text-[16px] overflow-x-auto border border-slate-800 shadow-2xl leading-relaxed">
              <code className="block">{code.trim()}</code>
            </pre>
          </div>
          {rest.length > 0 && renderContent(rest.join(''))}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="flex h-full bg-slate-50 overflow-hidden">
      <div className="w-80 border-r border-slate-200 bg-white overflow-y-auto flex flex-col shrink-0">
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <Book size={20} />
            </div>
            Lộ trình học
          </h2>
        </div>
        <div className="flex-1 p-6 space-y-8">
          {categories.map(cat => (
            <div key={cat} className="space-y-2">
              <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Hash size={12} /> {cat}
              </h3>
              {knowledgeBase.filter(k => k.category === cat).map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-[15px] transition-all duration-300 relative group ${
                    selectedTopic.id === topic.id 
                      ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-100 translate-x-1' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {topic.title}
                  {selectedTopic.id === topic.id && <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60" />}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto px-10 py-16 md:px-20">
          <header className="mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-black mb-6 uppercase tracking-widest border border-blue-100">
              <Hash size={12} /> {selectedTopic.category}
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{selectedTopic.title}</h1>
            <div className="h-2 w-24 bg-blue-600 rounded-full"></div>
          </header>
          
          <article className="max-w-none">
            {renderContent(selectedTopic.content)}
          </article>

          {/* Practice Promotion Section */}
          <section className="mt-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[32px] p-10 text-white shadow-2xl shadow-blue-200 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Sparkles size={180} />
            </div>
            <div className="relative z-10 flex-1">
              <h3 className="text-2xl font-black mb-2">Thực hành là cách học tốt nhất!</h3>
              <p className="text-blue-100 text-lg opacity-90 leading-relaxed max-w-lg">
                Bạn đã nắm vững lý thuyết về <strong>{selectedTopic.title}</strong>? Hãy để AI thiết kế riêng cho bạn một bài tập thực hành ngay bây giờ.
              </p>
            </div>
            <button 
              onClick={handleGenerateExerciseForTopic}
              disabled={isGeneratingEx}
              className="relative z-10 px-8 py-4 bg-white text-blue-700 rounded-2xl font-black text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50 shrink-0 shadow-lg"
            >
              {isGeneratingEx ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
              Thực hành với AI
              <ArrowRight size={20} />
            </button>
          </section>

          {/* Quiz Section */}
          <section className="mt-24 pt-16 border-t border-slate-100">
             {!quiz ? (
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-[40px] p-16 text-center space-y-6 border-2 border-dashed border-slate-200 shadow-inner">
                   <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-xl border border-slate-100">
                      <BrainCircuit size={40} className="text-blue-500" />
                   </div>
                   <div className="space-y-2">
                     <h3 className="text-3xl font-black text-slate-900">Thử thách trí nhớ</h3>
                     <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">AI sẽ tạo ra một câu hỏi ngẫu nhiên dựa trên nội dung bạn vừa xem. Bạn đã sẵn sàng chưa?</p>
                   </div>
                   <button 
                     onClick={handleGenerateQuiz}
                     disabled={isLoadingQuiz}
                     className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3 mx-auto disabled:opacity-50 shadow-xl shadow-blue-100"
                   >
                     {isLoadingQuiz ? <Loader2 size={24} className="animate-spin" /> : <BrainCircuit size={24} />}
                     Bắt đầu Quiz AI
                   </button>
                </div>
             ) : (
                <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
                   <div className="bg-blue-600 p-8 text-white flex justify-between items-center">
                      <h3 className="text-xl font-bold flex items-center gap-3"><BrainCircuit size={24} /> Kiểm tra nhanh kiến thức</h3>
                      <button onClick={handleGenerateQuiz} className="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Đổi câu hỏi khác"><RefreshCw size={20} /></button>
                   </div>
                   <div className="p-10 space-y-10">
                      <p className="text-2xl font-black text-slate-900 leading-snug">{quiz.question}</p>
                      <div className="grid grid-cols-1 gap-4">
                         {quiz.options.map((opt, idx) => {
                            let style = "border-slate-200 hover:border-blue-400 hover:bg-blue-50";
                            if (isAnswered) {
                               if (idx === quiz.correctAnswerIndex) style = "bg-emerald-50 border-emerald-500 text-emerald-800 ring-4 ring-emerald-500/10";
                               else if (idx === selectedOption) style = "bg-rose-50 border-rose-500 text-rose-800 ring-4 ring-rose-500/10";
                               else style = "opacity-40 border-slate-100 scale-95";
                            }
                            return (
                               <button
                                 key={idx}
                                 onClick={() => handleSelectOption(idx)}
                                 disabled={isAnswered}
                                 className={`w-full text-left p-6 rounded-2xl border-2 transition-all text-lg font-bold flex justify-between items-center ${style}`}
                               >
                                 <span>{opt}</span>
                                 {isAnswered && idx === quiz.correctAnswerIndex && <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />}
                                 {isAnswered && idx === selectedOption && idx !== quiz.correctAnswerIndex && <XCircle size={24} className="text-rose-500 shrink-0" />}
                               </button>
                            );
                         })}
                      </div>

                      {isAnswered && (
                        <div className={`p-8 rounded-3xl animate-in fade-in slide-in-from-top-4 ${selectedOption === quiz.correctAnswerIndex ? 'bg-emerald-50 text-emerald-900 border border-emerald-100' : 'bg-rose-50 text-rose-900 border border-rose-100'}`}>
                           <h4 className="text-xl font-black mb-2 flex items-center gap-3">
                             {selectedOption === quiz.correctAnswerIndex ? '🌟 Tuyệt vời, bạn đã nhớ bài!' : '⚠️ Có một chút nhầm lẫn rồi...'}
                           </h4>
                           <p className="text-lg opacity-90 leading-relaxed">{quiz.explanation}</p>
                        </div>
                      )}
                   </div>
                </div>
             )}
          </section>

          <footer className="mt-24 pt-10 border-t border-slate-100 flex justify-between items-center text-slate-400 text-sm font-medium">
            <span>PyMaster AI Documentation v1.2</span>
            <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              Góp ý nội dung <ExternalLink size={16} />
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;

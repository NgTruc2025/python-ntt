
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, User, Sparkles, Minus } from 'lucide-react';
import { createAITutorChat } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AITutorChatProps {
  studentName: string;
}

const AITutorChat: React.FC<AITutorChatProps> = ({ studentName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Chào ${studentName}! Mình là PyMaster AI. Bạn có thắc mắc gì về Python cần mình giải đáp không?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      chatRef.current = createAITutorChat(studentName);
    }
  }, [isOpen, studentName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', text: result.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Rất tiếc, mình đang gặp chút trục trặc kết nối. Bạn thử lại sau nhé!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-300 flex items-center justify-center hover:scale-110 transition-all z-[60] group border-4 border-white"
      >
        <MessageSquare size={28} />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white animate-bounce">1</div>
        <span className="absolute right-20 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold">Hỏi AI Tutor ngay!</span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-8 right-8 w-96 bg-white rounded-[32px] shadow-2xl border border-slate-200 flex flex-col z-[60] overflow-hidden transition-all duration-300 ${isMinimized ? 'h-20' : 'h-[600px]'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-black text-sm leading-none">PyMaster AI Tutor</h3>
            <span className="text-[10px] text-blue-100 font-bold uppercase tracking-widest opacity-80">Online & Sẵn sàng</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            {isMinimized ? <MessageSquare size={18} /> : <Minus size={18} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-blue-500" />
                  <span className="text-xs font-bold text-slate-400">AI đang suy nghĩ...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100 shrink-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập câu hỏi của bạn..."
                className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-30 shadow-lg shadow-blue-100"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">Powered by Gemini 3 Flash</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AITutorChat;

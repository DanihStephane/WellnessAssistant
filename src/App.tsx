import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { LanguageSelector } from './components/LanguageSelector';
import { Message, Language, DailyLog } from './types';
import { translations } from './translations';
import { Send, Sparkles } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<Language>('fr');
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: translations.welcome[language],
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input, language),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (input: string, lang: Language): string => {
    const response = translations.energyQuestion[lang];
    return response;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Wellness Assistant</h1>
          </div>
          <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Chat Container */}
          <div className="h-[600px] overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/5 border-t border-white/20">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'fr' ? "Écrivez votre message..." : language === 'en' ? "Type your message..." : "Soraty ny hafatrao..."}
                className="flex-1 p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
              <button
                onClick={handleSend}
                className="px-6 py-4 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white/10 backdrop-blur-lg border-t border-white/20 p-4">
        <div className="max-w-4xl mx-auto text-center text-white/70 text-sm">
          © {new Date().getFullYear()} Wellness Assistant. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

export default App;
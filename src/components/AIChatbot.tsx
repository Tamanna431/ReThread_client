'use client';

import { useState, useRef, useEffect } from 'react';
import { aiAPI } from '@/lib/api';
import { 
  MessageCircle, X, Send, Sparkles, ShoppingBag, 
  Leaf, DollarSign, Loader2, Bot, User, RotateCcw
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestedFollowUps?: string[];
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick Actions shown at the start
  const quickActions = [
    { label: 'Browse Items', value: 'What items do you have in stock right now?', icon: ShoppingBag },
    { label: 'Eco Impact', value: 'How does buying pre-loved fashion help the environment?', icon: Leaf },
    { label: 'Pricing Help', value: 'How should I price my pre-loved clothes for selling?', icon: DollarSign },
    { label: 'Style Advice', value: 'Can you recommend some trending vintage outfits?', icon: Sparkles },
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Show welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: "👋 Hi! I'm the ReThread AI Assistant — your guide to sustainable fashion.\n\nI can help you:\n• Find items currently in our marketplace\n• Get pricing advice for selling your clothes\n• Learn about environmental impact of thrifting\n• Navigate the platform and answer questions\n\nWhat would you like to know?",
          timestamp: new Date(),
          suggestedFollowUps: [
            'What shoes do you have under $60?',
            'How much water does thrifting save?',
            'Help me list my old jacket for sale'
          ]
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Build history array for the API from current messages
  const buildHistory = (): { role: string; content: string }[] => {
    return messages
      .filter(m => m.id !== 'welcome')
      .map(m => ({ role: m.role, content: m.content }));
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = buildHistory();
      const response = await aiAPI.chat({
        message: messageText.trim(),
        history,
      });

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.reply,
        timestamp: new Date(),
        suggestedFollowUps: response.data.suggestedFollowUps || [],
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an issue connecting to my AI brain. Please try again in a moment!",
        timestamp: new Date(),
        suggestedFollowUps: [
          'What items are available?',
          'Tell me about sustainability',
          'How do I sell my clothes?',
        ],
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleFollowUp = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleReset = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-terracotta to-terracotta-dark text-white p-4 rounded-full shadow-2xl hover:shadow-terracotta/40 transition-all transform hover:scale-110 ${
          isOpen ? 'rotate-90' : 'animate-bounce'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[420px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200 flex flex-col" style={{ height: '620px', maxHeight: 'calc(100vh - 150px)' }}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-forest to-forest-light p-4 text-white flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">ReThread AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-xs text-white/80">Powered by Groq AI</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-oat/30 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {/* Avatar for assistant */}
                  {message.role === 'assistant' && (
                    <div className="w-7 h-7 bg-gradient-to-br from-forest to-forest-light rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-terracotta to-terracotta-dark text-white rounded-br-sm'
                        : 'bg-white text-gray-800 shadow-md rounded-bl-sm border border-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    <p className={`text-[10px] mt-2 ${message.role === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {/* Avatar for user */}
                  {message.role === 'user' && (
                    <div className="w-7 h-7 bg-gradient-to-br from-terracotta to-terracotta-dark rounded-full flex items-center justify-center ml-2 flex-shrink-0 mt-1">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Suggested Follow-Up Prompts */}
                {message.role === 'assistant' && message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && (
                  <div className="ml-9 mt-2 flex flex-wrap gap-1.5">
                    {message.suggestedFollowUps.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleFollowUp(prompt)}
                        disabled={isLoading}
                        className="text-xs bg-forest/5 hover:bg-forest/10 text-forest border border-forest/20 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50 text-left leading-tight"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-forest to-forest-light rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-sm p-4 shadow-md border border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-terracotta rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-terracotta rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-terracotta rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions — shown only at start */}
          {messages.length <= 1 && !isLoading && (
            <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">Quick Actions</p>
              <div className="grid grid-cols-2 gap-1.5">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(action.value)}
                    className="flex items-center gap-2 bg-oat hover:bg-terracotta/10 text-forest text-xs px-3 py-2.5 rounded-xl transition-colors font-medium text-left"
                  >
                    <action.icon className="w-3.5 h-3.5 flex-shrink-0 text-terracotta" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about items, pricing, sustainability..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent text-sm bg-oat/30"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-terracotta to-terracotta-dark text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
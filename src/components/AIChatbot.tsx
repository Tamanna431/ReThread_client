'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { aiAPI, itemAPI } from '@/lib/api';
import { 
  MessageCircle, X, Send, Sparkles, ShoppingBag, 
  Leaf, DollarSign, Tag, ChevronRight, Loader2,
  ThumbsUp, ThumbsDown, RotateCcw
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'suggestion' | 'item-listing' | 'recommendation';
  data?: any;
  timestamp: Date;
}

interface QuickAction {
  label: string;
  value: string;
  icon: any;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick Actions
  const quickActions: QuickAction[] = [
    { label: 'List an Item', value: 'list-item', icon: ShoppingBag },
    { label: 'Get Recommendations', value: 'recommendations', icon: Sparkles },
    { label: 'Eco Impact', value: 'eco-impact', icon: Leaf },
    { label: 'Price Check', value: 'price-check', icon: DollarSign },
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: "👋 Hi! I'm your ReThread AI Assistant. I can help you:\n\n• List items with AI-powered pricing\n• Get personalized recommendations\n• Calculate environmental impact\n• Answer questions about sustainable fashion\n\nHow can I help you today?",
          type: 'text',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);

  const handleQuickAction = async (action: string) => {
    switch (action) {
      case 'list-item':
        await handleUserMessage('I want to list an item for sale');
        break;
      case 'recommendations':
        await handleUserMessage('Show me recommendations');
        break;
      case 'eco-impact':
        await handleUserMessage('Tell me about environmental impact');
        break;
      case 'price-check':
        await handleUserMessage('How do I price my item?');
        break;
    }
  };

  const handleUserMessage = async (message: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      type: 'text',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // AI Response Logic
      let aiResponse: Message;

      if (message.toLowerCase().includes('list') || message.toLowerCase().includes('sell')) {
        // Item Listing Flow
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Great! I'll help you list your item. Please tell me:\n\n1. **What is the item?** (e.g., 'Vintage Levi's Jeans')\n2. **What condition is it in?** (New/Like New/Good/Fair)\n\nOr just give me the title and I'll auto-fill everything!",
          type: 'item-listing',
          timestamp: new Date()
        };
      } else if (message.toLowerCase().includes('recommend')) {
        // Recommendations
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'd love to give you personalized recommendations! Please visit an item's detail page and I'll show you AI-curated matches based on your style preferences. ",
          type: 'recommendation',
          timestamp: new Date()
        };
      } else if (message.toLowerCase().includes('eco') || message.toLowerCase().includes('impact')) {
        // Eco Impact
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "🌍 **Environmental Impact Facts:**\n\n• Each pre-loved item saves ~2,500L of water\n• Reduces CO₂ emissions by ~3kg per item\n• Prevents textile waste in landfills\n• Supports circular economy\n\nEvery purchase makes a difference! ",
          type: 'text',
          timestamp: new Date()
        };
      } else if (message.toLowerCase().includes('price')) {
        // Pricing Help
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "💰 **Pricing Tips:**\n\n• Our AI analyzes market trends\n• Considers condition, brand, and rarity\n• Suggests fair prices for both buyers & sellers\n• You can always adjust the AI's suggestion\n\nTry listing an item and see our AI pricing in action!",
          type: 'text',
          timestamp: new Date()
        };
      } else {
        // Default Response
        aiResponse = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Thanks for your message! I can help you with:\n\n• Listing items with AI assistance\n• Finding sustainable fashion\n• Understanding eco-impact\n• Pricing guidance\n\nWhat would you like to know?",
          type: 'text',
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again!",
        type: 'text',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleUserMessage(input);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-terracotta to-terracotta-dark text-white p-4 rounded-full shadow-2xl hover:shadow-terracotta/40 transition-all transform hover:scale-110 ${
          isOpen ? 'rotate-90' : ''
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200 flex flex-col" style={{ height: '600px', maxHeight: 'calc(100vh - 150px)' }}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-forest to-forest-light p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">ReThread AI Assistant</h3>
                <p className="text-xs text-white/80">Always here to help! 💚</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-oat/30 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-terracotta to-terracotta-dark text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none p-4 shadow-md border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-terracotta" />
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length < 3 && (
            <div className="px-4 py-3 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2 font-semibold">Quick Actions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(action.value)}
                    className="flex items-center gap-1.5 bg-oat hover:bg-terracotta/10 text-forest text-xs px-3 py-2 rounded-lg transition-colors font-medium"
                  >
                    <action.icon className="w-3.5 h-3.5" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-terracotta to-terracotta-dark text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
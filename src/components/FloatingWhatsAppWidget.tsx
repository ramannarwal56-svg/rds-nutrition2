import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

export const FloatingWhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');

  const quickQuestions = [
    'Help me choose between Whey Concentrate and Isolate',
    'What is the recommended dosage for Creatine?',
    'Do you ship to my PIN code?',
    'What are the bulk order discounts for gyms?',
  ];

  const handleSendQuery = (text: string) => {
    const encoded = encodeURIComponent(text || 'Hi RND Nutrition, I have a question about your supplements.');
    window.open(`https://wa.me/${BRAND_INFO.supportWhatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Chat Balloon */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="mb-3 w-80 sm:w-96 rounded-3xl bg-neutral-900 border border-neutral-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold font-display">
                    RND
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-300 border-2 border-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">RND Nutrition Support</h4>
                  <span className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                    Online • Typically replies in 5 mins
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-neutral-950/80 space-y-3 text-xs">
              <div className="p-3 rounded-2xl rounded-tl-none bg-neutral-800 text-neutral-200 max-w-[85%] border border-neutral-700/60 leading-relaxed">
                👋 Hello! Welcome to RND Nutrition. How can we help you reach your fitness and physique goals today?
              </div>

              <div>
                <span className="text-[11px] font-semibold text-neutral-400 block mb-2">
                  Frequently Asked Questions:
                </span>
                <div className="space-y-1.5">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendQuery(q)}
                      className="w-full text-left p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-emerald-400 transition-colors text-[11px] flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">{q}</span>
                      <Send className="w-3 h-3 flex-shrink-0 ml-1 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <div className="pt-2 flex items-center gap-2 border-t border-neutral-800">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendQuery(quickMessage);
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => handleSendQuery(quickMessage)}
                  className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold transition-colors cursor-pointer flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center text-[10px] text-neutral-500">
                Direct WhatsApp Support: <strong className="text-neutral-400">9306667128</strong>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circle Button */}
      <motion.button
        id="floating-whatsapp-btn"
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-[0_10px_30px_rgba(16,185,129,0.5)] border-2 border-emerald-300/40 cursor-pointer transition-colors"
        aria-label="Direct WhatsApp Customer Support"
      >
        {/* Pulsing halo */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageSquare className="w-7 h-7 fill-current relative z-10" />

        {/* Online green indicator dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
        </span>

        {/* Tooltip on hover */}
        {!isOpen && (
          <div className="absolute right-16 px-3 py-1.5 rounded-xl bg-neutral-900/95 text-neutral-200 text-xs font-semibold whitespace-nowrap shadow-xl border border-neutral-700/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp (+91 9306667128)
          </div>
        )}
      </motion.button>
    </div>
  );
};

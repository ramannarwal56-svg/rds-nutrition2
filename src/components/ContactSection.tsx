import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, MapPin, Send, CheckCircle2, ShieldCheck, Clock, Award } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate inquiry text to WhatsApp
    const queryText = `*RND NUTRITION INQUIRY*\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    const url = `https://wa.me/${BRAND_INFO.supportWhatsappNumber}?text=${encodeURIComponent(queryText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact-section" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-800/80 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            Customer Support &amp; Inquiries
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Have questions about nutritional dosages, bulk orders, or shipping? 
            Our fitness nutrition experts are available via WhatsApp and email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 cols: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Support Card */}
            <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl relative overflow-hidden group hover:border-neutral-700 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                    Email Support
                  </span>
                  <a
                    href={`mailto:${BRAND_INFO.supportEmail}`}
                    className="text-base sm:text-lg font-bold text-white hover:text-emerald-400 transition-colors mt-0.5 block break-all font-mono"
                  >
                    {BRAND_INFO.supportEmail}
                  </a>
                  <p className="text-xs text-neutral-400 mt-1">
                    Send us your questions, lab certificate requests, or feedback anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Support Card */}
            <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500 text-neutral-950 font-bold shadow-md">
                  <MessageSquare className="w-6 h-6 fill-current" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    Direct WhatsApp Support
                  </span>
                  <a
                    href={`https://wa.me/${BRAND_INFO.supportWhatsappNumber}?text=${encodeURIComponent(
                      'Hi RDS Nutrition, I would like to chat with support.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-white hover:text-emerald-400 transition-colors mt-0.5 block font-mono"
                  >
                    +91 {BRAND_INFO.supportPhone}
                  </a>
                  <p className="text-xs text-neutral-400 mt-1">
                    Instant chat for order dispatch confirmation, tracking, and advice.
                  </p>
                </div>
              </div>
            </div>

            {/* UPI & Payment info */}
            <div className="p-6 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#00875a] text-white flex items-center justify-center font-bold text-lg shadow-md flex-shrink-0">
                  D
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">
                      {(BRAND_INFO as any).payeeName || 'Deepanshu'}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Verified UPI
                    </span>
                  </div>
                  <div className="text-sm font-bold font-mono text-emerald-400 mt-1 select-all">
                    {BRAND_INFO.upiId}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Zero gateway surcharge. Scan Google Pay QR or pay directly via GPay, PhonePe, Paytm &amp; BHIM.
                  </p>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex items-center gap-3 text-xs text-neutral-400">
              <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Customer Desk: Mon – Sat, 9:00 AM – 9:00 PM IST (WhatsApp 24/7)</span>
            </div>
          </div>

          {/* Right 7 cols: Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl relative">
              <h3 className="text-xl font-bold text-white font-display mb-1">
                Send a Message to RND Nutrition
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Fill out the quick form below and submit directly to our official WhatsApp support desk.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Singh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. vikram@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Your Message / Question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what product you are interested in, your training goals, or your shipping location..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-[0_5px_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via WhatsApp (+91 9306667128)</span>
                </button>

                {sent && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Inquiry prepared and forwarded to WhatsApp!</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="mt-20 pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-300">RND Nutrition</span>
            <span>© {new Date().getFullYear()} All Rights Reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <span>Official WhatsApp: <strong className="text-neutral-300 font-mono">9306667128</strong></span>
            <span>Support: <strong className="text-neutral-300 font-mono">rndnutrition285@gmail.com</strong></span>
            <span>UPI ID: <strong className="text-neutral-300 font-mono">{BRAND_INFO.upiId}</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};

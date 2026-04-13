"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <>
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2rem] px-8 py-4 flex items-center justify-between shadow-2xl shadow-indigo-100/30">
            <h1 className="text-xl font-black text-indigo-600 tracking-tighter">Japanese<span className="text-slate-400">Trainer</span></h1>
            <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <a href="#features" className="hover:text-indigo-600 transition">পদ্ধতি</a>
                <a href="#stats" className="hover:text-indigo-600 transition">কমিউনিটি</a>
                <a href="#pricing" className="hover:text-indigo-600 transition">কোর্সসমূহ</a>
            </div>
            <a href="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-600 transition-all shadow-lg">শুরু করুন</a>
        </div>
    </nav>

    <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute kanji-bg text-slate-900/[0.03] top-20 -right-20 select-none">夢</div>
        
        <div className="max-w-4xl px-6 text-center relative z-10">
            <span className="inline-block py-2 px-6 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-pulse">সহজে জাপানিজ শিখুন</span>
            <h2 className="text-5xl md:text-7xl bn-heavy text-slate-900 leading-[1.2] tracking-tight mb-8">
                গভীরভাবে <span className="italic text-indigo-600 font-serif">শিখুন</span>, <br/> মন থেকে <span className="text-slate-400">বলুন।</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                বাংলা ও ইংরেজি ভাষাভাষীদের জন্য বিশেষভাবে তৈরি আমাদের জেন-মডার্ন মেথডোলজি। কাঞ্জি, গ্রামার এবং ভোকাবুলারি শিখুন একদম নতুন আঙ্গিকে।
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all">
                    ফ্রি অ্যাকাউন্ট খুলুন
                </button>
                <button className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 text-slate-600 rounded-[2rem] font-black text-lg hover:bg-slate-50 transition-all">
                    লেসনগুলো দেখুন
                </button>
            </div>
        </div>
    </header>

    <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
                <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.5em] mb-4">আমাদের বিশেষত্ব</h3>
                <h2 className="text-4xl bn-heavy text-slate-900">কেন JapaneseTrainer সেরা?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all group">
                    <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition">🔥</div>
                    <h4 className="text-xl bn-heavy text-slate-900 mb-4">স্ট্রিক মোটিভেশন</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">আপনার প্রতিদিনের শেখার ধারাবাহিকতা বজায় রাখুন আমাদের হাই-এনার্জি স্ট্রিক সিস্টেমের মাধ্যমে।</p>
                </div>

                <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 text-9xl opacity-10 font-black">学</div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-8">🇧🇩</div>
                    <h4 className="text-xl bn-heavy mb-4">বাংলায় সঠিক উচ্চারণ</h4>
                    <p className="text-indigo-100 text-sm leading-relaxed">প্রতিটি শব্দের সাথে পাবেন সঠিক বাংলা উচ্চারণ (Uccharon) এবং অর্থ, যা আপনার শেখা করবে আরও সহজ।</p>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all group">
                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition">🎧</div>
                    <h4 className="text-xl bn-heavy text-slate-900 mb-4">নেটিভ অডিও</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">জাপানিজদের কণ্ঠে স্বচ্ছ অডিও শুনুন এবং আপনার লিসেনিং স্কিলকে নিয়ে যান পরবর্তী ধাপে।</p>
                </div>
            </div>
        </div>
    </section>

    <section id="stats" className="bg-slate-900 py-24 mx-6 rounded-[4rem] text-white relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-[25rem] font-black opacity-[0.03] select-none">連</div>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
            <div>
                <p className="text-4xl bn-heavy mb-2 tracking-tighter">৫০হাজার+</p>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">অ্যাক্টিভ লার্নার</p>
            </div>
            <div>
                <p className="text-4xl bn-heavy mb-2 tracking-tighter">১২০০+</p>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">প্রয়োজনীয় শব্দ</p>
            </div>
            <div>
                <p className="text-4xl bn-heavy mb-2 tracking-tighter">৯৮%</p>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">সফলতার হার</p>
            </div>
            <div>
                <p className="text-4xl bn-heavy mb-2 tracking-tighter">৪.৯/৫</p>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">ইউজার রেটিং</p>
            </div>
        </div>
    </section>

    <footer className="py-20 text-center">
        <h1 className="text-2xl font-black text-slate-300 tracking-tighter mb-8">Japanese<span className="opacity-40">Trainer</span></h1>
        <div className="flex justify-center gap-10 mb-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition">প্রাইভেসি</a>
            <a href="#" className="hover:text-indigo-600 transition">টার্মস</a>
            <a href="#" className="hover:text-indigo-600 transition">সাপোর্ট</a>
        </div>
        <p className="text-xs text-slate-300 font-medium">© ২০২৬ JapaneseTrainer. সর্বস্বত্ব সংরক্ষিত।</p>
    </footer>
    </>

  );
}

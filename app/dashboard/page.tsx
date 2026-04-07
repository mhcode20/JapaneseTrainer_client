"use client"
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Navbar from '../components/Navbar';

interface User {
  username:string,
  email:string,
  img:string,
  id:number
}

const page = () => {
    const [user,setUser] = useState<User>({username:"",email:"",img:"",id:0});
    const [open,setOpen] = useState(false);
    const [test,setTest] = useState(false);
    const [menu,setMenu] = useState(true);
    const router = useRouter();

    const handleLogout = ()=>{
        localStorage.removeItem('jwt');
        router.push("/login");
    }

    useEffect(()=>{
        const token = localStorage.getItem("jwt");
        if(!token){
            handleLogout();
        }
        const fetchUser = async ()=>{
            const response = await fetch("http://localhost:3001/auth/getUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            });

            const data = await response.json();
            console.log(data);
            user.username = data.user.username;
            user.email = data.user.email;
            user.id = data.user.id;
            setTest(true)
            console.log(user);
        }
        fetchUser();
    },[user]);


    
    return (
    <div className="flex flex-col lg:flex-row min-h-screen">
        
        <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between lg:h-screen">
            <div>
                <div className='flex justify-between'>
                <h1 className={`text-xl font-black text-indigo-600 tracking-tighter lg:mb-10 ${menu?'☰':'mb-10'}`}>Japanese<span className="text-slate-400">Trainer</span></h1>
                <div className='text-slate-500 font-black lg:hidden cursor-pointer' onClick={()=>setMenu(!menu)}>{menu?'☰':'⚞'}</div>
                </div>
                <nav className={`space-y-2 lg:h-full ${menu?'h-0 overflow-hidden ':""}`}>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-black shadow-sm">
                        <span>🏠</span> Dashboard
                    </Link>
                    <Link href="/lessons" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl font-bold transition">
                        <span>📖</span> Lessons
                    </Link>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl font-bold transition">
                        <span>🃏</span> Flashcards
                    </a>
                    <a href="#" onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl font-bold transition">
                        <span>🏆</span> Leaderboard
                    </a>
                </nav>
            </div>

            <div className={`bg-indigo-600 rounded-[2rem] p-6 text-white relative overflow-hidden lg:block ${menu?'hidden':'⚞'}`}>
                <p className="text-[10px] font-black uppercase opacity-60 mb-1">Current Plan</p>
                <p className="font-bold mb-4 text-sm text-indigo-100">Pro Samurai</p>
                <button className="w-full py-2 bg-white text-indigo-600 rounded-xl font-black text-xs hover:bg-indigo-50 transition">Manage</button>
            </div>
        </aside>

        <main className="flex-grow p-6 lg:p-12 overflow-y-auto">
            
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-3xl font-black text-slate-900">Kon'nichiwa, Satoshi! 👋</h2>
                    <p className="text-slate-500 font-medium">Ready for your 15-minute daily practice?</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-xl">🔥</span>
                        <span className="font-black text-orange-500">12 Days</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                        <span className="text-xl">💎</span>
                        <span className="font-black text-blue-500">1,420</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                <div className="xl:col-span-2 space-y-8">
                    
                    <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 text-[15rem] font-black opacity-[0.03] select-none pointer-events-none">学</div>
                        
                        <div className="w-32 h-32 bg-indigo-100 rounded-4xl flex items-center justify-center text-5xl shrink-0">🍣</div>
                        
                        <div className="flex-grow text-center md:text-left">
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">In Progress</span>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Food & Dining: Level 2</h3>
                            <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                                <div className="bg-indigo-500 h-full w-[65%] rounded-full"></div>
                            </div>
                            <p className="text-sm text-slate-400 font-bold uppercase">65% Complete</p>
                        </div>
                        
                        <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all shrink-0">
                            Resume
                        </button>
                    </div>

                    <div>
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Quick Practice</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition cursor-pointer group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition">⚡</div>
                                    <h5 className="font-black">Speed Review</h5>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed">Refresh 20 words you learned last week in under 2 minutes.</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:shadow-lg transition cursor-pointer group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition">🎧</div>
                                    <h5 className="font-black">Listening Drill</h5>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed">Identify native speakers' pronunciation in short sentences.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                        <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Daily Challenge</h4>
                        <p className="text-lg font-bold mb-6">Master 10 new Verbs today to earn double XP!</p>
                        <div className="flex items-center gap-4 text-sm font-bold">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700"></div>
                                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-600"></div>
                                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-500"></div>
                            </div>
                            <span className="text-indigo-300">420 Others Online</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Weekly League</h4>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-black text-slate-300">1</span>
                                    <div className="w-8 h-8 rounded-full bg-yellow-100"></div>
                                    <span className="text-sm font-bold">Kenji_99</span>
                                </div>
                                <span className="text-sm font-black text-indigo-600">4.2k XP</span>
                            </div>
                            <div className="flex items-center justify-between bg-indigo-50 -mx-4 px-4 py-2 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-black text-indigo-400">2</span>
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white"></div>
                                    <span className="text-sm font-black text-indigo-900 tracking-tight">You (Satoshi)</span>
                                </div>
                                <span className="text-sm font-black text-indigo-600">3.8k XP</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-black text-slate-300">3</span>
                                    <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                                    <span className="text-sm font-bold">Elena_San</span>
                                </div>
                                <span className="text-sm font-black text-indigo-600">3.5k XP</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-3 border-2 border-slate-100 text-slate-500 rounded-2xl font-black text-xs hover:bg-slate-50 transition">View Full Rankings</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}

export default page

"use client"
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Navbar from '../components/Navbar';
import LessonCard from '../components/LessonCard';

interface User {
    username: string,
    email: string,
    img: string,
    id: number
}

type Lesson = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  icon: string;
  color: string;
  status: string;
  progress: number;
};

const page = () => {
    const [user, setUser] = useState<User>({ username: "", email: "", img: "", id: 0 });
    const [open, setOpen] = useState(false);
    const [test, setTest] = useState(false);
    const [menu, setMenu] = useState(true);
    const [userLessons, setUserLessons] = useState<Lesson[]>();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        router.push("/login");
    }

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            handleLogout();
        }
        const fetchUser = async () => {
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
    }, [user]);

    useEffect(()=>{
        const token = localStorage.getItem("jwt");
        if (!token) {
            handleLogout();
        }
        const fetchUserLessons = async () => {
            const response = await fetch("http://localhost:3001/lesson/my-lessons", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data);
            setUserLessons(data.data);

            
        }
        fetchUserLessons();
    },[]);

    


    return (
        <div className="flex flex-col lg:flex-row min-h-screen">

            <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between lg:h-screen">
                <div>
                    <div className='flex justify-between'>
                        <h1 className={`text-xl font-black text-indigo-600 tracking-tighter lg:mb-10 ${menu ? '☰' : 'mb-10'}`}> xJapanese<span className="text-slate-400">Trainer</span></h1>
                        <div className='text-slate-500 font-black lg:hidden cursor-pointer' onClick={() => setMenu(!menu)}>{menu ? '☰' : '⚞'}</div>
                    </div>
                    <nav className={`space-y-2 lg:h-full ${menu ? 'h-0 overflow-hidden ' : ""}`}>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-black shadow-sm">
                            <span>🏠</span> Dashboard
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl font-bold transition">
                            <span>📖</span> Lessons
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl font-bold transition">
                            <span>🃏</span> Flashcards
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl font-bold transition">
                            <span>🏆</span> Leaderboard
                        </a>
                    </nav>
                </div>

                <div className={`bg-indigo-600 rounded-[2rem] p-6 text-white relative overflow-hidden lg:block ${menu ? 'hidden' : '⚞'}`}>
                    <p className="text-[10px] font-black uppercase opacity-60 mb-1">Current Plan</p>
                    <p className="font-bold mb-4 text-sm text-indigo-100">Pro Samurai</p>
                    <button className="w-full py-2 bg-white text-indigo-600 rounded-xl font-black text-xs hover:bg-indigo-50 transition">Manage</button>
                </div>
            </aside>

            <main className="flex-grow p-6 lg:p-12 lg:pt-0 overflow-y-auto">

                <header className="max-w-7xl mx-auto px-8 py-12">
                    <h2 className="text-4xl font-black text-slate-900 mb-2">Lesson Catalog</h2>
                    <p className="text-slate-500">Choose a category to start practicing your vocabulary.</p>

                    <div className="flex gap-4 mt-8 overflow-x-auto pb-2">
                        <button className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold shadow-md shadow-indigo-100">All Lessons</button>
                        <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-full font-bold hover:bg-slate-50">Beginner</button>
                        <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-full font-bold hover:bg-slate-50">Intermediate</button>
                        <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-full font-bold hover:bg-slate-50">Culture</button>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-8 pb-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {userLessons?.map((item)=>(
                            <LessonCard key={item.id} lesson={item} />
                        ))}
                        <div className="group bg-white rounded-[2.5rem] p-8 border border-slate-200 hover:shadow-2xl hover:shadow-slate-200 transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl">あ</div>
                                <span className="text-xs font-black px-3 py-1 bg-green-100 text-green-700 rounded-full">MASTERED</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Hiragana Basics</h3>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">The foundation of the Japanese writing system. 46 essential characters.</p>
                            <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                                <div className="bg-indigo-500 h-full w-full rounded-full"></div>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-400">
                                <span>46/46 Characters</span>
                                <span>100%</span>
                            </div>
                        </div>

                        <div className="group bg-white rounded-[2.5rem] p-8 border border-slate-200 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-100 transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl">🍣</div>
                                <span className="text-xs font-black px-3 py-1 bg-slate-100 text-slate-500 rounded-full">LEVEL 1</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Food & Dining</h3>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">Essential vocabulary for ordering sushi, ramen, and navigating Izakayas.</p>
                            <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                                <div className="bg-orange-400 h-full w-[45%] rounded-full"></div>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-400">
                                <span>12/30 Words</span>
                                <span>45%</span>
                            </div>
                        </div>

                        <div className="group bg-white rounded-[2.5rem] p-8 border border-slate-200 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100 transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl">🚄</div>
                                <span className="text-xs font-black px-3 py-1 bg-slate-100 text-slate-500 rounded-full">LEVEL 1</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Travel & Transport</h3>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">Learn how to read train signs and ask for directions in Tokyo.</p>
                            <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                                <div className="bg-blue-400 h-full w-[15%] rounded-full"></div>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-400">
                                <span>5/40 Words</span>
                                <span>15%</span>
                            </div>
                        </div>

                        <div className="group bg-white rounded-[2.5rem] p-8 border border-slate-200 hover:border-pink-200 hover:shadow-2xl hover:shadow-pink-100 transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center text-3xl">❤️</div>
                                <span className="text-xs font-black px-3 py-1 bg-pink-50 text-pink-400 rounded-full">INTERMEDIATE</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Feelings & Life</h3>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">Express yourself more naturally with abstract adjectives and emotions.</p>
                            <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                                <div className="bg-pink-400 h-full w-[0%] rounded-full"></div>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-400">
                                <span>0/25 Words</span>
                                <span>0%</span>
                            </div>
                        </div>

                        <div className="group bg-slate-100/50 rounded-[2.5rem] p-8 border border-dashed border-slate-300 relative grayscale opacity-70">
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <div className="bg-white/80 px-4 py-2 rounded-xl shadow-sm font-bold text-slate-500 flex items-center gap-2">
                                    🔒 Reach Level 5 to Unlock
                                </div>
                            </div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl">🏔️</div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-slate-400">Nature & Seasons</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">Cherry blossoms, mountains, and the unique Japanese weather terms.</p>
                            <div className="w-full bg-slate-200 h-2 rounded-full mb-6"></div>
                        </div>

                    </div>
                </main>
            </main>
        </div>
    );
}

export default page

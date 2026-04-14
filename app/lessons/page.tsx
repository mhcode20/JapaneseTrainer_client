"use client"
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Navbar from '../components/Navbar';
import LessonCard from '../components/LessonCard';
import Lunenrolled from '../components/Lunenrolled';
import Aside from '../components/Aside';

interface User {
    username: string,
    email: string,
    img: string,
    id: number
}

type userLesson = {
    id: number;
    title: string;
    description: string;
    created_at: string;
    icon: string;
    color: string;
    difficulty: string;
    status: string;
    progress: number;
};

type Lesson = {
    id: number;
    title: string;
    description: string;
    created_at: string;
    icon: string;
    color: string;
    difficulty: string;
};

const page = () => {
    const [user, setUser] = useState<User>({ username: "", email: "", img: "", id: 0 });
    const [open, setOpen] = useState(false);
    const [test, setTest] = useState(false);
    const [menu, setMenu] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const [userLessons, setUserLessons] = useState<userLesson[]>();
    const [allLessons, setAllLessons] = useState<Lesson[]>()
    const router = useRouter();
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        router.push("/login");
    }

    const handleRefresh = () => {
        console.log(refresh);
        setRefresh(refresh => !refresh);

    }


    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            handleLogout();
        }
        const fetchUser = async () => {
            const response = await fetch(`${BASE_URL}/auth/getUser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            // console.log(data);
            user.username = data.user.username;
            user.email = data.user.email;
            user.id = data.user.id;
            setTest(true)
            // console.log(user);
        }
        fetchUser();
    }, [user]);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            handleLogout();
        }
        const fetchUserLessons = async () => {
            const response = await fetch(`${BASE_URL}/lesson/my-lessons`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            // console.log(data);
            setUserLessons(data.data);
            console.log(BASE_URL)


        }
        fetchUserLessons();
    }, [refresh]);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            handleLogout();
        }
        const fetchUserLessons = async () => {
            const response = await fetch(`${BASE_URL}/lesson/lessons`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            const filtered: Lesson[] = data.data.filter((u: Lesson) => !userLessons?.find(s => s.id === u.id));
            // console.log(filtered);
            setAllLessons(filtered);


        }
        fetchUserLessons();
    }, [userLessons]);


    const onc = () => {
        console.log(allLessons);
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">

            <Aside page={"lessons"}/>

            <main className="flex-grow md:p-6 lg:p-12 lg:pt-0 overflow-y-auto">

                <header className="max-w-7xl mx-auto p-4 md:px-8 py-12">
                    <h2 className="text-4xl font-black text-slate-900 mb-2">Lessons</h2>
                    <p className="text-slate-500">Choose a category to start practicing your vocabulary.</p>

                    <div className="flex gap-4 mt-8 overflow-x-auto pb-2">
                        <button className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold shadow-md shadow-indigo-100">All Lessons</button>
                        <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-full font-bold hover:bg-slate-50">Beginner</button>
                        <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-full font-bold hover:bg-slate-50">Intermediate</button>
                        <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-full font-bold hover:bg-slate-50">Culture</button>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {userLessons?.map((item) => (
                            <LessonCard key={item.id} lesson={item} />
                        ))}
                        {
                            allLessons?.map((item) => (
                                <Lunenrolled key={item.id} lesson={item} refresh={handleRefresh} />
                            ))
                        }
                        

                        

                        <div className="group bg-slate-100/50 rounded-[2.5rem] p-8 border border-dashed border-slate-300 relative grayscale opacity-70">
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <div className="bg-white/80 px-4 py-2 rounded-xl shadow-sm font-bold text-slate-500 flex items-center gap-2">
                                    🔒 Soon
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

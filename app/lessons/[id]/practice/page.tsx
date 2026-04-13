"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Navbar from '@/app/components/Navbar';
import { useParams } from "next/navigation";




interface N5Word {
    japanese: string;
    kanji: string;
    romaji: string;
    english: string;
    category: 'Noun' | 'Verb' | 'Adjective' | 'Adverb';
    difficulty: 1 | 2 | 3;
}

// interface Ques {
//   word: string;
//   kanji: string;
//   meaning_en: string;
//   pronunciation_en: string;
//   meaning_bn: string;
//   pronunciation_bn: string;
//   difficulty: 1 | 2 | 3;
// }

interface QuizQuestion {
    id: number,
    question: string;
    type: string;
    bangla: string;
    correct: string;
    romaji: string;
    kanji: string;
    uccharon: string;
    options: string[];
}

interface QuizStats {
    attempts: number;
    correct: number;
    wrong: number;
    streak: number;
    last_result: "correct" | "wrong" | "none"; // Using a literal union for better type safety
    updated_at: string;
}



// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoiaHJpZG95IiwiaWF0IjoxNzc0NTk2MTI2LCJleHAiOjE4MDA1MTYxMjZ9.JocP3Swe4c7kOo9ar6LpAG6Ks84QxOy1q8AW8XVdyV4";



const page = () => {
    const [q, setQ] = useState<QuizQuestion | null>(null);
    const [qstat, setQstat] = useState<QuizStats>({ attempts: 0, correct: 0, wrong: 0, streak: 0, last_result: "none", updated_at: "" });
    const [showPopup, setShowPopup] = useState(false);
    const [start, setStart] = useState(true);
    const [token, setToken] = useState("");
    const [mcontent, setMcontent] = useState({ classes: "", content: "TEST" });
    const router = useRouter();
    const params = useParams();
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;




    useEffect(() => {
        const token1 = localStorage.getItem("jwt");
        if (!token1) {
            localStorage.removeItem('jwt');
            router.push("/login");
        }
        else {
            setToken(token1);
        }
    }, [start]);

    useEffect(() => {
        getNext();
        // console.log(params.id);
    }, [token])


    const getNext = async () => {
        try {
            const response = await fetch(`${BASE_URL}/lesson/${params.id}/mcq`, {
                method: 'GET', // or 'POST', 'PUT', etc.
                headers: {
                    'Authorization': `Bearer ${token}`, // Key part: adds the bearer token
                    'Content-Type': 'application/json' // Add other headers as needed
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            console.log(data)
            setQ(data);
        } catch (err: any) {
            // setError(err.message);
        } finally {
            // setLoading(false);
        }
    }

    useEffect(() => {
        const getProgress = async () => {

            try {
                const response = await fetch(`${BASE_URL}/progress/${q?.id}`, {
                    method: 'GET', // or 'POST', 'PUT', etc.
                    headers: {
                        'Authorization': `Bearer ${token}`, // Key part: adds the bearer token
                        'Content-Type': 'application/json' // Add other headers as needed
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                console.log(data)
                setQstat(data.stats);
            } catch (err: any) {
                // setError(err.message);
            } finally {
                // setLoading(false);
            }
        }
        getProgress();
    }, [q]);

    const handleAns = async (ans: string | undefined) => {
        // alert(q?.correct_answer)
        // setPop("flex");
        let isCorrect = false;
        setShowPopup(true);
        if (ans === q?.correct) {
            setMcontent({ classes: "w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl border-4 border-white shadow-lg bg-green-500 text-white", content: "✨" })
            isCorrect = true;
        }
        else setMcontent({ classes: "w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl border-4 border-white shadow-lg bg-red-500 text-white", content: "❌" })
        try {
            const response = await fetch(`${BASE_URL}/progress/update`, {
                method: 'post', // or 'POST', 'PUT', etc.
                headers: {
                    'Authorization': `Bearer ${token}`, // Key part: adds the bearer token
                    'Content-Type': 'application/json' // Add other headers as needed
                },
                body: JSON.stringify({
                    vocab_id: q?.id,
                    isCorrect
                })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            // console.log(data)
        } catch (err: any) {
            // setError(err.message);
        }
    }

    const onContinue = () => {
        getNext();
    }

    const onClickDash = () => {
        router.push("/dashboard");
    }

    const onClickEnd = () => {
        router.push("/lessons");
    }

    const formatQuestion = (text: string | null) => {
        if (!text) return "";

        // This regex splits the string but keeps the captured group (the content in parens)
        const parts = text.split(/\((.*?)\)/);

        return (
            <>
                {parts[0]}
                {parts[1] && (
                    <span className="text-blue-500 font-medium"> {/* Add your custom span styling here */}
                        ({parts[1]})
                    </span>
                )}
                {parts[2]}
            </>
        );
    };


    return (
        <>
            <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-slate-200">
                <h1 className="text-xl font-bold text-indigo-600 tracking-tight">Japanese<span className="text-slate-400">Trainer</span></h1>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-slate-500 uppercase font-semibold">Daily Streak</p>
                        <p className="text-sm font-bold text-orange-500">🔥 12 Days</p>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-600 font-bold hover:bg-indigo-200 transition">
                        JS
                    </button>
                </div>
            </nav>


            <main className="max-w-4xl mx-auto mt-10 px-4">

                {/* <div className=" bg-slate-200 h-2 rounded-full mb-8 overflow-hidden top-0 left-0 w-screen fixed z-50">
                    <div className="bg-indigo-500 h-full w-2/3 transition-all duration-500"></div>
                </div> */}

                <div className='fixed top-20 right-20 z-50'>hridoy</div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="space-y-4 order-2 md:order-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Practice Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Current Score</span>
                                    <span className="font-bold text-indigo-600">5</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Accuracy</span>
                                    <span className="font-bold text-green-500">85%</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
                            <p className="text-sm opacity-80">Quick Tip:</p>
                            <p className="text-sm font-medium mt-1">"Ikimasu" (行きます) is the polite form of "to go". Use it when talking to teachers or strangers!</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 order-1 md:order-2">
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100 text-center relative overflow-hidden">

                            <div className="max-w-md mx-auto mb-6">
                                <div
                                    className="bg-white/60 backdrop-blur-md rounded-2xl p-3 border border-white shadow-sm flex items-center justify-between px-6">

                                    <div className="flex gap-5">
                                        <div className="flex flex-col">
                                            <span
                                                className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Correct</span>
                                            <span className="text-sm font-black text-green-600">{qstat.correct}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span
                                                className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Wrong</span>
                                            <span className="text-sm font-black text-red-500">{qstat.wrong}</span>
                                        </div>
                                    </div>

                                    <div className="h-6 w-[1px] bg-slate-200"></div>

                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <span
                                                className="text-[9px] font-black text-orange-400 uppercase tracking-tighter block">Streak</span>
                                            <span className="text-sm font-black text-slate-700 leading-none">{qstat.streak} Times</span>
                                        </div>
                                        <span className="text-xl animate-bounce">🔥</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-12">
                                <h2 className={`text-${(q?.question?.length ?? 0) >= 5 ? "4" : "6"}xl md:text-${(q?.question?.length ?? 0) >= 5 ? "6" : "8"}xl font-bold text-slate-800 mb-4 tracking-tighter`}>{q?.question}</h2>
                                {q?.type !== "bangla" && (<div className="flex justify-center gap-4 text-slate-400 text-sm italic">
                                    <span>{q?.romaji}</span>
                                    <span>•</span>
                                    <span>{q?.kanji}</span>
                                    <span>•</span>
                                    <span>{q?.uccharon}</span>
                                </div>)}
                            </div>

                            <div className="grid grid-cols-1xx sm_place grid-cols-2 gap-4 mb-10">
                                <button className="group p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left" onClick={() => handleAns(q?.options[0])}>
                                    {/* <span className="block text-xs font-bold text-slate-400 group-hover:text-indigo-400 mb-1 uppercase">Option A</span> */}
                                    <span className="text-lg font-semibold">{q?.options?.[0] ?? "Loading..."}</span>
                                </button>
                                <button className="group p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left" onClick={() => handleAns(q?.options[1])}>
                                    {/* <span className="block text-xs font-bold text-slate-400 group-hover:text-indigo-400 mb-1 uppercase">Option B</span> */}
                                    <span className="text-lg font-semibold">{q?.options?.[1] ?? "Loading..."}</span>
                                </button>
                                <button className="group p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left" onClick={() => handleAns(q?.options[2])}>
                                    {/* <span className="block text-xs font-bold text-slate-400 group-hover:text-indigo-400 mb-1 uppercase">Option C</span> */}
                                    <span className="text-lg font-semibold">{q?.options?.[2] ?? "Loading..."}</span>
                                </button>
                                <button className="group p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left" onClick={() => handleAns(q?.options[3])}>
                                    {/* <span className="block text-xs font-bold text-slate-400 group-hover:text-indigo-400 mb-1 uppercase">Option D</span> */}
                                    <span className="text-lg font-semibold">{q?.options?.[3] ?? "Loading..."}</span>
                                </button>
                            </div>

                            <div className="flex justify-between items-center border-t border-slate-100 pt-8">
                                <button onClick={onClickDash} className="text-slate-400 font-bold hover:text-slate-600 px-4 py-2">Dashboard</button>
                                <button onClick={onClickEnd} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:translate-y-0">
                                    End →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {showPopup && (<div id="feedback-modal" className="fixed inset-0 z-50 flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>

                <div id="modal-content" className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 text-center modal-enter">
                    <div id="status-icon" className={`${mcontent.classes}`}>{mcontent.content}
                    </div>

                    <h3 id="status-title" className="text-2xl font-black mb-2">Result</h3>
                    <p id="status-desc" className="text-slate-500 mb-6">The correct answer was <span className="font-bold text-slate-800">{q?.correct}</span>.</p>

                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition shadow-lg" onClick={() => { setShowPopup(false); onContinue(); }}>
                        Continue →
                    </button>
                </div>
            </div>)}
        </>
    )
}

export default page

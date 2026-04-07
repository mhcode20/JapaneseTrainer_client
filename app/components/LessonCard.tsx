import React, { useEffect, useState } from 'react'
import { Lesson } from './inter';
import { useRouter } from 'next/navigation';

// type Lesson = {
//   id: number;
//   title: string;
//   description: string;
//   created_at: string;
//   icon: string;
//   color: string;
//   status: string;
//   progress: number;
// };

export interface LessonProgress {
    status: boolean;
    lesson_id: string;   // string because your API returns "1"
    total_words: number;
    attempted_words: number;
    progress: number;    // percentage (0–100)
}

type Props = {
    lesson: Lesson;
};



const LessonCard = ({ lesson }: Props) => {
    const [uProg, setUProg] = useState<LessonProgress>();
    const [modal, setModal] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const token = localStorage.getItem("jwt");

        const fetchUProg = async () => {
            const response = await fetch(`http://localhost:3001/lesson/${lesson.id}/progress`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data);
            setUProg(data);


        }
        fetchUProg();
    }, []);

    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }

    const onPractice = (num:number) => {
        router.push(`/lessons/${num}/practice`);
    }
    return (
        <>
            <div className="group bg-white rounded-[2.5rem] p-8 border border-slate-200 hover:shadow-2xl hover:shadow-slate-200 transition-all cursor-pointer flex flex-col justify-between" onClick={openModal}>
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-16 h-16 bg-${lesson.color}-100 text-${lesson.color}-600 rounded-2xl flex items-center justify-center text-3xl`}>{lesson.icon}</div>
                    <span className="text-xs font-black px-3 py-1 bg-green-100 text-green-700 rounded-full">{lesson.status.toUpperCase()}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{lesson.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{lesson.description}</p>
                <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                    <div className={`bg-${lesson.color}-500 h-full w-[${uProg?.progress}%] rounded-full`}></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>{uProg?.attempted_words}/{uProg?.total_words} Words</span>
                    <span>{uProg?.progress}%</span>
                </div>
            </div>

            <div id="enroll-modal" className={`fixed inset-0 z-50 flex items-center justify-center p-6 ${modal ? '' : 'hidden'}`}>
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}></div>

                <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden modal-animate">
                    <div className={`h-24 bg-${lesson.color}-600 flex items-center justify-center relative`}>
                        <div className="absolute -bottom-6 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl" id="modal-icon">{lesson.icon}</div>
                    </div>

                    <div className="p-10 pt-12 text-center">
                        <h2 className="text-2xl font-black text-slate-900 mb-2" id="modal-title">{lesson.title}</h2>
                        <p className="text-slate-500 text-sm mb-8" id="modal-desc">{lesson.description}</p>

                        <div className="bg-slate-50 rounded-2xl p-4 mb-8 flex justify-around">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Vocabulary</p>
                                <p className="font-bold text-slate-800" id="modal-count">{uProg?.total_words} Words</p>
                            </div>
                            <div className="w-[1px] bg-slate-200"></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Difficulty</p>
                                <p className="font-bold text-slate-800">N5 Level</p>
                            </div>
                        </div>

                        <div id="modal-actions">
                            <button onClick={()=>onPractice(lesson.id)} className={`w-full bg-${lesson.color}-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all transform hover:-translate-y-1`}>
                                Start Practice →
                            </button>
                        </div>

                        <button onClick={closeModal} className="mt-4 text-xs font-black text-slate-300 uppercase hover:text-slate-500 transition">Maybe Later</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LessonCard
function handleLogout() {
    throw new Error('Function not implemented.');
}


import React, { useEffect, useState } from 'react'

type Lesson = {
    id: number;
    title: string;
    description: string;
    created_at: string;
    icon: string;
    color: string;
};

export interface WCount {
    status: boolean;
    lesson_id: string;   // string because your API returns "1"
    total_words: number;    // percentage (0–100)
}

type Props = {
    lesson: Lesson;
};


{/*
###########################################################################
lot to work    
###########################################################################    
*/}


const Lunenrolled = ({ lesson }: Props) => {
    const [wCount, setWCount] = useState<WCount>();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        const fetchUProg = async () => {
            const response = await fetch(`http://localhost:3001/lesson/${lesson.id}/word-count`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data);
            setWCount(data);


        }
        fetchUProg();
    }, []);

    const openModal = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }

    return (
        <>
            <div className="group bg-white rounded-[2.5rem] p-8 border border-slate-200 hover:shadow-2xl hover:shadow-slate-200 transition-all cursor-pointer" onClick={openModal}>
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-16 h-16 bg-${lesson.color}-100 text-${lesson.color}-600 rounded-2xl flex items-center justify-center text-3xl`}>{lesson.icon}</div>
                    <span className="text-xs font-black px-3 py-1 bg-green-100 text-green-700 rounded-full">None</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{lesson.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{lesson.description}</p>
                <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                    <div className={`bg-${lesson.color}-500 h-full w-0 rounded-full`}></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>{wCount?.total_words} Words</span>
                    <span>%</span>
                </div>
            </div>

            <div id="enroll-modal" className={`fixed inset-0 z-50 flex items-center justify-center p-6 ${modal ? '' : 'hidden'}`}>
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}></div>

                <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden modal-animate">
                    <div className="h-24 bg-indigo-600 flex items-center justify-center relative">
                        <div className="absolute -bottom-6 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl" id="modal-icon">🍣</div>
                    </div>

                    <div className="p-10 pt-12 text-center">
                        <h2 className="text-2xl font-black text-slate-900 mb-2" id="modal-title">Lesson Title</h2>
                        <p className="text-slate-500 text-sm mb-8" id="modal-desc">Lesson description goes here.</p>

                        <div className="bg-slate-50 rounded-2xl p-4 mb-8 flex justify-around">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Vocabulary</p>
                                <p className="font-bold text-slate-800" id="modal-count">0 Words</p>
                            </div>
                            <div className="w-[1px] bg-slate-200"></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase">Difficulty</p>
                                <p className="font-bold text-slate-800">N5 Level</p>
                            </div>
                        </div>

                        <div id="modal-actions">
                            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all transform hover:-translate-y-1">
                                Enroll in Course
                            </button>
                        </div>

                        <button onClick={closeModal} className="mt-4 text-xs font-black text-slate-300 uppercase hover:text-slate-500 transition">Maybe Later</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lunenrolled
function handleLogout() {
    throw new Error('Function not implemented.');
}


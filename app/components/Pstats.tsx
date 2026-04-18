import React, { useEffect, useRef, useState } from 'react'

interface props {
    lesson: number;
    token: string;
}

export interface LessonProgressResponse {
    success: boolean;
    data: LessonProgressData;
}

export interface LessonProgressData {
    lesson_id: number;
    lesson_name: string;

    total_vocab: number;
    attempted_vocab: number;

    total_attempts: number;
    total_correct: number;
    total_wrong: number;

    accuracy: number;        // percentage (e.g. 80.25)
    mastered_words: number;  // count of mastered vocab
}

const Pstats = ({ lesson, token }: props) => {
    const hasRun = useRef(false);
    const hasRun2 = useRef(false);
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;
    const [start, setStart] = useState(true);
    // const [token, setToken] = useState<string>();
    const [lstat, setLstat] = useState<LessonProgressData>();



    // useEffect(() => {
    //     if (hasRun2.current) return; // Skip if already run
    //     hasRun2.current = true;

    //     const token_loader = async () => {
    //         const token1 = await localStorage.getItem("jwt");
    //         if (token1) setToken(token1);
    //     }
    //     token_loader();
    // }, [start]);

    useEffect(() => {
        if (hasRun2.current) return; // Skip if already run
        hasRun2.current = true;


        const getProgress = async () => {

            try {
                const response = await fetch(`${BASE_URL}/lesson/${lesson}/progress`, {
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
                setLstat(data.data);
            } catch (err: any) {
                // setError(err.message);
            } finally {
                // setLoading(false);
            }
        }
        getProgress();

        console.log(lesson);
    }, [token])
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="mb-4 font-bold text-indigo-600 whitespace-pre-line">{lstat?.lesson_name.replace(": ",":\n")}</div>
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Practice Stats</h3>
            <div className="space-y-4">
                {/* <div className="flex justify-between">
                    <span className="text-slate-600">Current Score</span>
                    <span className="font-bold text-indigo-600">5</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-600">Accuracy</span>
                    <span className="font-bold text-green-500">85%</span>
                </div> */}
                {

                    Object.entries(lstat ?? {}).filter(([key]) => key !== "lesson_id" && key !== "lesson_name").map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                            <span className="text-slate-600">{key.split('_')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                .join(' ')}</span>
                            <span className="font-bold text-green-500">{value}{key==="accuracy"?"%":""}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Pstats

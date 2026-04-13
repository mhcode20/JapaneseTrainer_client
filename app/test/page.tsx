"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Navbar from '../components/Navbar';




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
    bangla: string;
    correct: string;
    romaji: string;
    kanji: string;
    uccharon: string;
    options: string[];
}




// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoiaHJpZG95IiwiaWF0IjoxNzc0NTk2MTI2LCJleHAiOjE4MDA1MTYxMjZ9.JocP3Swe4c7kOo9ar6LpAG6Ks84QxOy1q8AW8XVdyV4";



const page = () => {
    const [q, setQ] = useState<QuizQuestion | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showWrong, setShowWrong] = useState(false);
    const [start, setStart] = useState(true);
    const [token, setToken] = useState("");
    const router = useRouter();
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
    }, [token])


    const getNext = async () => {
        try {
            const response = await fetch(`${BASE_URL}/progress/smart`, {
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
            // console.log(data)
            setQ(data);
            console.log(data);
        } catch (err: any) {
            // setError(err.message);
        } finally {
            // setLoading(false);
        }
    }

    const handleAns = async (ans: string | undefined) => {
        // alert(q?.correct_answer)
        // setPop("flex");
        let isCorrect = false;
        if (ans === q?.correct) {
            setShowPopup(true);
            isCorrect = true;
        }
        else setShowWrong(true);
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


    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-100 to-blue-200 p-4 text-black">

                {/* <!-- Title --> */}
                <h1 className="text-3xl font-bold mb-6">Hiragana Practice</h1>

                {/* <!-- Mode Switch (Static) --> */}
                <div className="mb-6">
                    <button className="px-4 py-2 rounded-l bg-indigo-600 text-white">
                        Hiragana → English
                    </button>
                    <button className="px-4 py-2 rounded-r bg-white border text-black">
                        English → Hiragana
                    </button>
                </div>



                {/* <!-- Question (Dummy Data) --> */}
                <div className="text-7xl font-bold mb-8 text-indigo-900">
                    {q?.question}
                </div>

                <div className="mb-6 flex justify-between w-full sm:w-1/3">
                    <div>{q?.romaji} / {q?.uccharon}</div>
                    <div>{q?.kanji}</div>
                </div>

                {/* <!-- Options (Dummy Data) --> */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button className="px-6 py-3 text-xl border rounded bg-white hover:bg-indigo-600 hover:text-white transition" onClick={() => handleAns(q?.options[0])}>
                        {q?.options[0]}
                    </button>
                    <button className="px-6 py-3 text-xl border rounded bg-white hover:bg-indigo-600 hover:text-white transition" onClick={() => handleAns(q?.options[1])}>
                        {q?.options[1]}
                    </button>
                    <button className="px-6 py-3 text-xl border rounded bg-white hover:bg-indigo-600 hover:text-white transition" onClick={() => handleAns(q?.options[2])}>
                        {q?.options[2]}
                    </button>
                    <button className="px-6 py-3 text-xl border rounded bg-white hover:bg-indigo-600 hover:text-white transition" onClick={() => handleAns(q?.options[3])}>
                        {q?.options[3]}
                    </button>
                </div>

                {/* <!-- Score (Dummy) --> */}
                <div className="text-lg font-semibold mb-6">
                    Score: 5
                </div>
                <button className="px-6 py-3 text-xl border rounded bg-white hover:bg-indigo-600 hover:text-white transition" onClick={() => getNext()}>Next</button>

                {/* <!-- Popup Example (Visible Version - Static Demo) --> */}
                {/* <div className={`fixed inset-0 bg-black/50 items-center justify-center ${pop}`}>
            <div className="bg-white p-6 rounded-xl text-center shadow-xl">
            <h2 className="text-xl font-bold text-red-600 mb-2">
                Wrong Answer ❌
            </h2>
            <p className="mb-2">Correct answer:</p>
            <p className="text-3xl font-bold text-indigo-700 mb-4">
                a
            </p>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Continue
            </button>
            </div>
        </div> */}
                {showWrong && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl text-center shadow-xl">
                            <h2 className="text-xl font-bold text-red-600 mb-2">
                                Wrong Answer ❌
                            </h2>
                            <p className="mb-2">Correct answer:</p>
                            <p className="text-3xl font-bold text-indigo-700 mb-4">
                                {q?.correct}
                            </p>
                            <p className="text-3xl font-bold text-green-600 mb-4">
                                {q?.bangla}
                            </p>

                            <button
                                onClick={() => {
                                    setShowWrong(false);
                                    onContinue();
                                }}
                                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {showPopup && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl text-center shadow-xl">
                            <h2 className="text-xl font-bold text-green-600 mb-2">
                                Right Answer ✔
                            </h2>
                            <p className="text-3xl font-bold text-blue-600 mb-4">
                                {q?.bangla}
                            </p>
                            <button
                                onClick={() => {
                                    setShowPopup(false);
                                    onContinue();
                                }}
                                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}



            </div>
        </>
    )
}

export default page

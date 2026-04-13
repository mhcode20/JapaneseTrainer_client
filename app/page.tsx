"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const hiraganaMap: Record<string, string> = {
  あ: "a", い: "i", う: "u", え: "e", お: "o",
  か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
  さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
  た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
  な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
  は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
  ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
  や: "ya", ゆ: "yu", よ: "yo",
  ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
  わ: "wa", を: "wo", ん: "n",
};

const hiraganaList = Object.entries(hiraganaMap);

const getRandomItem = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export default function HiraganaPractice() {
  const [question, setQuestion] = useState<any>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [mode, setMode] = useState<"hiragana" | "english">("hiragana");
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
    generateQuestion();
    console.log(localStorage.getItem("test"))
  }, [mode]);

  function generateQuestion() {
    const random = getRandomItem(hiraganaList);
    const correct = mode === "hiragana" ? random[1] : random[0];

    let wrongOptions = shuffle(hiraganaList)
      .filter((x) => x[0] !== random[0])
      .slice(0, 3)
      .map((x) => (mode === "hiragana" ? x[1] : x[0]));

    const allOptions = shuffle([correct, ...wrongOptions]);

    setQuestion(random);
    setOptions(allOptions);
  }

  function handleAnswer(ans: string) {
    const correct = mode === "hiragana" ? question[1] : question[0];

    if (ans === correct) {
      setScore((prev) => prev + 1);
      generateQuestion();
    } else {
      setCorrectAnswer(correct);
      setShowPopup(true);
    }
  }

  if (!question) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-100 to-blue-200 p-4 text-black">
      <h1 className="text-3xl font-bold mb-4">Hiragana Practice</h1>

      <div className="mb-4">
        <button
          onClick={() => setMode("hiragana")}
          className={`px-4 py-2 rounded-l ${
            mode === "hiragana"
              ? "bg-indigo-600 text-white"
              : "bg-white border text-black"
          }`}
        >
          Hiragana → English
        </button>
        <button
          onClick={() => setMode("english")}
          className={`px-4 py-2 rounded-r ${
            mode === "english"
              ? "bg-indigo-600 text-white"
              : "bg-white border text-black"
          }`}
        >
          English → Hiragana
        </button>
      </div>

      <div className="text-7xl font-bold mb-6 text-indigo-900">
        {mode === "hiragana" ? question[0] : question[1]}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className="px-6 py-3 text-xl border rounded bg-white text-black hover:bg-indigo-600 hover:text-white transition"
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="mt-6 text-lg font-semibold">Score: {score}</div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center shadow-xl">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Wrong Answer ❌
            </h2>
            <p className="mb-2">Correct answer:</p>
            <p className="text-3xl font-bold text-indigo-700 mb-4">
              {correctAnswer}
            </p>
            <button
              onClick={() => {
                setShowPopup(false);
                generateQuestion();
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

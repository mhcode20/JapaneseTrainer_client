"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 to-blue-200 flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl font-extrabold text-indigo-900 mb-4">
          Learn Hiragana the Fun Way 🇯🇵
        </h1>
        <p className="text-lg text-indigo-800 mb-8">
          Practice Japanese Hiragana with interactive quizzes, instant feedback,
          and smart learning modes. Perfect for beginners and daily revision.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/practice"
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
          >
            Start Practicing
          </Link>
          <Link
            href="#features"
            className="px-8 py-3 bg-white text-indigo-700 rounded-xl text-lg font-semibold border hover:bg-indigo-50 transition"
          >
            Learn More
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <div id="features" className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        {[ 
          {
            title: "🎯 Smart Practice",
            desc: "Random questions with multiple choice answers to improve memory retention.",
          },
          {
            title: "🧠 Learn Faster",
            desc: "Instant feedback with correct answers when you make mistakes.",
          },
          {
            title: "🎮 Game Mode",
            desc: "Score points, build streaks, and make learning fun and addictive.",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-xl text-center"
          >
            <h3 className="text-xl font-bold text-indigo-800 mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-20 text-sm text-indigo-700 opacity-70">
        Built for Japanese learners • Hiragana Trainer App
      </div>
    </div>
  );
}

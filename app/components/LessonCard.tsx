import React from 'react'
import { Lesson } from './inter';

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

type Props = {
  lesson: Lesson;
};

const LessonCard = ({lesson}:Props) => {
    return (
        <div className="group bg-white rounded-[2.5rem] p-8 border border-slate-200 hover:shadow-2xl hover:shadow-slate-200 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-6">
                <div className={`w-16 h-16 bg-${lesson.color}-100 text-${lesson.color}-600 rounded-2xl flex items-center justify-center text-3xl`}>{lesson.icon}</div>
                <span className="text-xs font-black px-3 py-1 bg-green-100 text-green-700 rounded-full">MASTERED</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{lesson.title}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">{lesson.description}</p>
            <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                <div className={`bg-${lesson.color}-500 h-full w-[${lesson.progress}%] rounded-full`}></div>
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>46/46 Characters</span>
                <span>{lesson.progress}%</span>
            </div>
        </div>
    )
}

export default LessonCard

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface asideProps {
    page:string;
}
const Aside = ({page}:asideProps) => {
    const [menu, setMenu] = useState(true);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        router.push("/login");
    }
    return (
        <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between lg:h-screen">
            <div>
                <div className='flex justify-between'>
                    <h1 className={`text-xl font-black text-indigo-600 tracking-tighter lg:mb-10 ${menu ? '☰' : 'mb-10'}`}>Japanese<span className="text-slate-400">Trainer</span></h1>
                    <div className='text-slate-500 font-black lg:hidden cursor-pointer' onClick={() => setMenu(!menu)}>{menu ? '☰' : '⚞'}</div>
                </div>
                <nav className={`space-y-2 lg:h-full ${menu ? 'h-0 overflow-hidden ' : ""}`}>
                    <Link href="#" className={`flex items-center gap-3 px-4 py-3 ${page==="dashboard"?"bg-indigo-50 text-indigo-600":"text-slate-500 hover:bg-slate-50"}  rounded-2xl font-black shadow-sm`}>
                        <span>🏠</span> Dashboard
                    </Link>
                    <Link href="/lessons" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl font-bold transition">
                        <span>📖</span> Lessons
                    </Link>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl font-bold transition">
                        <span>🃏</span> Flashcards
                    </a>
                    <a href="#" onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl font-bold transition">
                        <span>🏆</span> Logout
                    </a>
                </nav>
            </div>

            <div className={`bg-indigo-600 rounded-[2rem] p-6 text-white relative overflow-hidden lg:block ${menu ? 'hidden' : '⚞'}`}>
                <p className="text-[10px] font-black uppercase opacity-60 mb-1">Current Plan</p>
                <p className="font-bold mb-4 text-sm text-indigo-100">Pro Samurai</p>
                <button className="w-full py-2 bg-white text-indigo-600 rounded-xl font-black text-xs hover:bg-indigo-50 transition">Manage</button>
            </div>
        </aside>
    )
}

export default Aside

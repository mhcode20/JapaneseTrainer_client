import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import React, { useState } from 'react'

interface User {
  username:string,
  email:string,
  img:string,
  id:number
}

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    
        const handleLogout = ()=>{
            localStorage.removeItem('jwt');
            router.push("/login");
        }
    return (
        <>
            {/* Top Navbar */}
            < div className="flex justify-between items-center px-8 py-5" >
                <h1 className="text-2xl font-bold text-indigo-900">
                    Japanese Trainer
                </h1>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md hover:bg-indigo-50 transition"
                    >
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                            {/* {user.username[0]?.toUpperCase()} */}
                        </div>
                        <span className="text-indigo-800 font-semibold">Profile</span>
                    </button>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl p-2 z-50"
                            >
                                <Link
                                    href="/dashboard"
                                    className="block px-4 py-2 rounded-xl hover:bg-indigo-50 text-indigo-800"
                                >
                                    📋 Dashboard
                                </Link>
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 rounded-xl hover:bg-indigo-50 text-indigo-800"
                                >
                                    👤 My Profile
                                </Link>
                                <Link
                                    href="/settings"
                                    className="block px-4 py-2 rounded-xl hover:bg-indigo-50 text-indigo-800"
                                >
                                    ⚙️ Settings
                                </Link>
                                <Link
                                    href="/progress"
                                    className="block px-4 py-2 rounded-xl hover:bg-indigo-50 text-indigo-800"
                                >
                                    📊 Progress
                                </Link>
                                <hr className="my-2" />
                                <button
                                    className="w-full text-left px-4 py-2 rounded-xl hover:bg-red-50 text-red-600"
                                    onClick={handleLogout}
                                >
                                    🚪 Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div >
        </>
    )
}

export default Navbar

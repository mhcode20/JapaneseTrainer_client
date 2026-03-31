"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { useRouter } from "next/navigation";
import { div } from "framer-motion/client";


export default function LoginPage() {
  const [data, setData] = useState({ username: "", password: "" });
  const router = useRouter();

  const containerStyle = {
    backgroundImage: `url('https://www.transparenttextures.com/patterns/asfalt-light.png')`, // Path to image in your /public folder
    backgroundColor: '#4f46e5'
  };

  useEffect(() => {
    const userData = localStorage.getItem('jwt');
    if (userData !== null) {
      router.push('/dashboard')
    }
  }, [])
  const handleToast = (msg: string, stat: boolean) => {
    if (stat === true) {
      showToast.success(msg, {
        duration: 4000,
        progress: true,
        position: "bottom-right",
        transition: "bounceIn",
        icon: '',
        sound: true,
      });
    }
    else {
      showToast.error(msg, {
        duration: 4000,
        progress: true,
        position: "bottom-right",
        transition: "bounceIn",
        icon: '',
        sound: true,
      });
    }
  }

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value, // dynamic key update
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data)

    const f_data = new FormData();
    f_data.append("username", data.username.toString());
    f_data.append("password", data.password.toString());




    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });


      // handle HTTP errors
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      // console.log(res)

      const result = await res.json();
      // console.log(result)


      handleToast(result.message, result.status);
      if (result.status === true) {
        localStorage.setItem("jwt", result.token);
        router.push("/dashboard");
      }


      // // handle API response
      // if (result.status === true) {
      //     console.log("Success:", result);
      //     alert("✅ Account created successfully!");
      //     // router.push("/login")  // optional redirect
      // } else {
      //     console.warn("API Error:", result);
      //     alert("❌ " + (result.msg || "Signup failed"));
      // }

    } catch (error: any) {
      // console.log(res.text())
      console.error("Network/Error:", error);
      alert("🚫 Server not reachable or CORS error");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-5xl flex flex-col md:flex-row rounded-[3rem] shadow-2xl shadow-indigo-100 overflow-hidden min-h-150">
        
        <div style={containerStyle} className={`md:w-1/2 japanese-pattern p-12 text-white flex flex-col justify-between relative overflow-hidden`}>
            <div className="absolute -bottom-10 -left-10 text-[20rem] font-black opacity-10 pointer-events-none select-none">夢</div>
            
            <div className="relative z-10">
                <h1 className="text-3xl font-black tracking-tighter mb-2">Japanese<span className="opacity-50">Trainer</span></h1>
                <p className="text-indigo-100 font-medium italic">Your journey to fluency begins here.</p>
            </div>

            <div className="relative z-10">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                    <p className="text-xs font-black uppercase tracking-widest text-indigo-200 mb-2">Word of the Day</p>
                    <h3 className="text-4xl font-black mb-1">夢 <span className="text-xl font-normal opacity-70">(Yume)</span></h3>
                    <p className="text-indigo-100">Dream. Something to pursue with heart and soul.</p>
                </div>
            </div>
        </div>

        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <div className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
                <p className="text-slate-500 font-medium">Please enter your details to continue learning.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                    <input onChange={onChangeHandle} type="text" name="username" placeholder="Username" 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-700"/>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2 ml-1">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                        <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot?</a>
                    </div>
                    <input onChange={onChangeHandle} type="password" name="password" placeholder="••••••••" 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-700"/>
                </div>

                <div className="flex items-center gap-3 ml-1">
                    <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"/>
                    <label htmlFor="remember" className="text-sm font-bold text-slate-500 cursor-pointer">Remember me for 30 days</label>
                </div>

                <div className="pt-4 space-y-4">
                    <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-1 active:translate-y-0">
                        Sign In
                    </button>
                    
                    
                </div>
            </form>

            <p className="text-center mt-10 text-slate-500 font-medium">
                New to the platform? <a href="#" className="text-indigo-600 font-black hover:underline">Create an account</a>
            </p>
        </div>
    </div>
    </div>
  );
}
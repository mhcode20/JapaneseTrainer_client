"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import React, { ChangeEvent, useEffect, useState } from "react";
import { showToast } from "nextjs-toast-notify";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

interface frm {
  username: String;
  email: String;
  password: String;
  c_pass: String;
}

export default function RegisterPage() {

  const [data, setData] = useState<frm>({ username: "", email: "", password: "", c_pass: "" })
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value, // dynamic key update
    }));
  };
  useEffect(() => {
    const userData = localStorage.getItem('jwt');
    if (userData !== null) {
      router.push('/dashboard')
    }
  }, []);

  const handleToast = (msg: string) => {
    showToast.success(msg, {
      duration: 4000,
      progress: true,
      position: "bottom-right",
      transition: "bounceIn",
      icon: '',
      sound: true,
    });
  }



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const f_data = new FormData();
    f_data.append("name", data.username.toString());
    f_data.append("email", data.email.toString());
    f_data.append("pass", data.password.toString());




    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // handle HTTP errors
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      // console.log(res)

      const result = await res.json();
      console.log(result);

      handleToast(result.message);
      if (result.status === true) {
        router.push("/login");
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
      console.error("Network/Error:", error);
      alert("🚫 Server not reachable or CORS error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-6">
      {/* <Toaster position="top-right" /> */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-2">
            Create Account ✨
          </h1>
          <p className="text-indigo-700">
            Start your Japanese learning journey 🇯🇵
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-indigo-800 font-semibold mb-1">
              User Name
            </label>
            <input
              type="text"
              name="username"
              onChange={onChangeHandle}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 lowercase"
            />
          </div>

          <div>
            <label className="block text-indigo-800 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={onChangeHandle}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-indigo-800 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={onChangeHandle}
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-indigo-800 font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="c_pass"
              onChange={onChangeHandle}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        {/* <div className="my-6 text-center text-gray-400">or</div> */}

        {/* Social Signup */}
        {/* <div className="flex gap-3">
          <button className="w-full py-3 bg-white border rounded-xl font-semibold text-indigo-700 hover:bg-indigo-50 transition">
            Google
          </button>
          <button className="w-full py-3 bg-white border rounded-xl font-semibold text-indigo-700 hover:bg-indigo-50 transition">
            GitHub
          </button>
        </div> */}

        {/* Footer */}
        <p className="mt-6 text-center text-indigo-700">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
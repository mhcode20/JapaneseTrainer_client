"use client";

import { motion } from "framer-motion";

export default function MasterForm() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-2">
            Master Form 🧩
          </h1>
          <p className="text-indigo-700">
            Reusable form system for all input types
          </p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Text */}
          <FormInput label="Text Input" type="text" placeholder="Enter text" />

          {/* Email */}
          <FormInput label="Email Input" type="email" placeholder="Enter email" />

          {/* Password */}
          <FormInput label="Password Input" type="password" placeholder="Enter password" />

          {/* Number */}
          <FormInput label="Number Input" type="number" placeholder="Enter number" />

          {/* Phone */}
          <FormInput label="Phone Input" type="tel" placeholder="Enter phone number" />

          {/* Date */}
          <FormInput label="Date Input" type="date" />

          {/* Time */}
          <FormInput label="Time Input" type="time" />

          {/* Color */}
          <div>
            <label className="block text-indigo-800 font-semibold mb-1">
              Color Picker
            </label>
            <input type="color" className="w-full h-12 rounded-xl border" />
          </div>

          {/* Select */}
          <div>
            <label className="block text-indigo-800 font-semibold mb-1">
              Select Dropdown
            </label>
            <select className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-400">
              <option>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>

          {/* Multi Select */}
          <div>
            <label className="block text-indigo-800 font-semibold mb-1">
              Multi Select
            </label>
            <select multiple className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-400">
              <option>Item 1</option>
              <option>Item 2</option>
              <option>Item 3</option>
            </select>
          </div>

          {/* Radio */}
          <div>
            <label className="block text-indigo-800 font-semibold mb-2">
              Radio Buttons
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-indigo-700">
                <input type="radio" name="radio" />
                Option A
              </label>
              <label className="flex items-center gap-2 text-indigo-700">
                <input type="radio" name="radio" />
                Option B
              </label>
            </div>
          </div>

          {/* Checkbox */}
          <div>
            <label className="block text-indigo-800 font-semibold mb-2">
              Checkbox
            </label>
            <label className="flex items-center gap-2 text-indigo-700">
              <input type="checkbox" />
              Accept Terms
            </label>
          </div>

          {/* Range */}
          <div>
            <label className="block text-indigo-800 font-semibold mb-1">
              Range Slider
            </label>
            <input type="range" className="w-full" />
          </div>

          {/* File */}
          <div>
            <label className="block text-indigo-800 font-semibold mb-1">
              File Upload
            </label>
            <input type="file" className="w-full" />
          </div>

          {/* Textarea (full width) */}
          <div className="md:col-span-2">
            <label className="block text-indigo-800 font-semibold mb-1">
              Textarea
            </label>
            <textarea
              rows={4}
              placeholder="Write something..."
              className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Switch */}
          <div>
            <label className="block text-indigo-800 font-semibold mb-2">
              Toggle Switch
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full relative" />
            </label>
          </div>

        </form>

        {/* Actions */}
        <div className="mt-10 flex justify-end gap-4">
          <button className="px-6 py-3 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300 transition">
            Cancel
          </button>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg">
            Submit
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- Reusable Input Component ---------------- */

function FormInput({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-indigo-800 font-semibold mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}
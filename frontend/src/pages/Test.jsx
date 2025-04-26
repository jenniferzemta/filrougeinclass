import React from "react";

export default function Test() {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans p-6">
      {/* Sidebar / Profile */}
      <div className="w-1/4 p-4">
        <div className="bg-white rounded-2xl p-6 shadow-md text-center">
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            className="rounded-full mx-auto mb-4"
          />
          <h2 className="font-semibold text-lg">Andre Maspion</h2>
          <p className="text-sm text-gray-500">Verified Student</p>
          <div className="grid grid-cols-3 mt-4 text-xs text-gray-700">
            <div>
              <p className="font-bold text-lg">32</p>
              <p>Total Course</p>
            </div>
            <div>
              <p className="font-bold text-lg">120</p>
              <p>Study Hours</p>
            </div>
            <div>
              <p className="font-bold text-lg">5.0</p>
              <p>Rating</p>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl p-4 shadow-md mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">February 2022</h3>
          <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600">
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} className="font-bold">{d}</div>
            ))}
            {[...Array(31)].map((_, i) => (
              <div
                key={i}
                className={`rounded-full py-1 ${i === 1 ? 'bg-blue-500 text-white font-bold' : 'hover:bg-blue-100'}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2">Schedule class</h4>
          <ul className="text-sm">
            <li className="bg-black text-white p-3 rounded-xl mb-2">
              <p className="text-xs">02 FEB</p>
              <p>Basic HTML and CSS</p>
            </li>
            <li className="bg-white p-3 rounded-xl mb-2">
              <p className="text-xs text-gray-500">04 FEB</p>
              <p>Fundamental Shiba Coin</p>
            </li>
            <li className="bg-white p-3 rounded-xl">
              <p className="text-xs text-gray-500">05 FEB</p>
              <p>How to survive in jungle</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search your favorite course"
            className="w-full max-w-md p-3 rounded-xl bg-white shadow-sm outline-none"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Featured Course</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-2xl">
            <h3 className="font-bold text-lg mb-1">Basic Design System</h3>
            <p className="text-sm">12 Lessons · 40 Hours</p>
            <button className="mt-4 bg-white text-blue-600 font-semibold py-1 px-3 rounded-xl">
              Buy Course
            </button>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="font-bold text-lg mb-1">Machine Learning Basics</h3>
            <p className="text-sm">12 Lessons · 40 Hours</p>
            <button className="mt-4 bg-gray-200 text-gray-700 font-semibold py-1 px-3 rounded-xl">
              Buy Course
            </button>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="font-bold text-lg mb-1">Tutorial Pro Dribble by Ari</h3>
            <p className="text-sm">12 Lessons · 40 Hours</p>
            <button className="mt-4 bg-gray-200 text-gray-700 font-semibold py-1 px-3 rounded-xl">
              Buy Course
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Recommended Course</h2>
        <div className="space-y-3">
          <div className="bg-blue-600 text-white rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="uppercase text-xs mb-1">UI/UX Design</p>
              <p className="font-semibold">Build landing page with figma</p>
            </div>
            <div className="text-sm">24 May 2022 · ⭐ 5.0</div>
          </div>
          <div className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div>
              <p className="uppercase text-xs mb-1 text-gray-400">Technology</p>
              <p className="font-semibold">Fundamentals of machine learning</p>
            </div>
            <div className="text-sm">24 May 2022 · ⭐ 5.0</div>
          </div>
          <div className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div>
              <p className="uppercase text-xs mb-1 text-gray-400">Programming</p>
              <p className="font-semibold">Introduction to data science</p>
            </div>
            <div className="text-sm">24 May 2022 · ⭐ 5.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";

export default function form() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [recipient, setRecipient] = useState("");

  return (
    <section className="h-screen flex flex-col items-center bg-gradient-to-b from-blue-900/20 via-transparent to-transparent">
      <div className="flex justify-center items-center gap-1 rounded-full bg-blue-500/10 backdrop-blur-sm py-2 px-4 mt-20 mb-4">
        <div className="h-1 w-1 bg-blue-500 rounded-full mr-1"></div>
        <p className="text-blue-400 text-xs ">Email Composer</p>
      </div>
      <div className="text-4xl font-bold mb-4 flex gap-2">
        <h1>Schedule Your</h1>
        <h1 className="text-blue-500">Email</h1>
      </div>
      <div className="text-white/70 text-lg  text-center max-w-2xl ">
        Create and schedule your email with precision timing for maximum impact
      </div>
      <div className="w-1/2 h-full flex flex-col bg-[#111] rounded-lg  mt-10 mb-16 px-8">
        <div className="w-full mt-8">
          <label id="email">Your Email</label>
          <input
            id="email"
            type="text"
            className="w-full h-10 bg-blue text-white rounded-md px-4 py-2 mt-2 bg-black "
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="w-full mt-4">
          <label id="name">Your Name</label>
          <input
            id="name"
            type="text"
            className="w-full h-10 bg-blue text-white rounded-md px-4 py-2 mt-2 bg-black "
            placeholder="prince..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div className="w-full mt-4">
          <label id="recipiemt">Recipient Email</label>
          <input
            id="recipiemt"
            type="text"
            className="w-full h-10 bg-blue text-white rounded-md px-4 py-2 mt-2 bg-black "
            placeholder="recipiemt@gmail.com"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          ></input>
        </div>
        <div className="flex justify-end mt-8 ">
          <button className="bg-blue-500 rounded-lg px-4 py-2 backdrop-blur-sm">
            continue
          </button>
        </div>
      </div>
    </section>
  );
}

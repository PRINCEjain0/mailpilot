"use client";
import { sub } from "framer-motion/client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function form() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scheduleTime, setScheduleTime] = useState(null);

  const nextStep = () => {
    if (step == 1) {
      if (!email || !name || !recipient) {
        alert("Please fill all details");
        return;
      }

      setStep(2);
    } else {
      if (!subject || !body) {
        alert("Please fill all details");
        return;
      }
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step == 2) {
      setStep(1);
    } else {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!scheduleTime) {
      alert("Please select a schedule time");
      return;
    }

    const data = {
      email,
      name,
      recipient,
      subject,
      body,
      scheduleTime: scheduleTime.toISOString(),
    };

    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Email scheduled successfully");
    } else {
      alert("Error scheduling email");
    }
  };

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
      <div className="w-1/2 h-full flex flex-col bg-gradient-to-br bg-blue-500/10 via-[#111] to-purple-500/10 rounded-lg  mt-10 mb-16 px-8">
        {step == 1 && (
          <>
            <div className="w-full mt-8">
              <label id="email" className="text-white/70 text-sm ">
                Your Email
              </label>
              <input
                id="email"
                type="text"
                className="w-full h-12 bg-blue text-white rounded-md px-4 py-2 mt-2 bg-black "
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
            </div>
            <div className="w-full mt-6">
              <label id="name" className="text-white/70 text-sm">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full h-12 bg-blue text-white rounded-md px-4 py-2 mt-2 bg-black "
                placeholder="prince..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
            <div className="w-full mt-6">
              <label id="recipiemt" className="text-white/70 text-sm">
                Recipient Email
              </label>
              <input
                id="recipiemt"
                type="text"
                className="w-full h-12 bg-blue text-white rounded-md px-4 py-2 mt-2 bg-black "
                placeholder="recipiemt@gmail.com"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              ></input>
            </div>
            <div className="flex justify-end mt-8 ">
              <button
                className="bg-blue-500 rounded-lg px-4 py-2 backdrop-blur-sm"
                onClick={() => {
                  nextStep();
                }}
              >
                continue
              </button>
            </div>
          </>
        )}
        {step == 2 && (
          <>
            <div className="w-full  mt-8">
              <label id="subject" className="text-white/70 text-sm">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className="w-full h-10 bg-blue text-white rounded-md px-4 py-2 mt-2 bg-black "
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              ></input>
            </div>
            <div className="w-full mt-4">
              <label id="email_content" className="text-white/70 text-sm">
                Email Content
              </label>
              <textarea
                id="email_content"
                type="text"
                className="w-full h-48 bg-blue text-white rounded-md px-4 py-2 mt-2 bg-black "
                placeholder="Enter email content"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex justify-end mt-2 ">
                <button
                  className="bg-blue-500 rounded-lg px-4 py-2 backdrop-blur-sm"
                  onClick={() => {
                    prevStep();
                  }}
                >
                  back
                </button>
              </div>
              <div className="flex justify-end mt-2 ">
                <button
                  className="bg-blue-500 rounded-lg px-4 py-2 backdrop-blur-sm"
                  onClick={() => {
                    nextStep();
                  }}
                >
                  continue
                </button>
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="w-full mt-4">
              <label className="text-white/70  text-sm block mb-2">
                Schedule Time
              </label>
              <DatePicker
                selected={scheduleTime}
                onChange={(date) => setScheduleTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd-MM-yyyy h:mm aa"
                placeholderText="Select date and time"
                className="bg-black text-white px-4 py-2 rounded-md w-full border border-white"
              />
            </div>
            <div className="w-full h-60 flex flex-col bg-black rounded-lg mt-4  ">
              <h1 className="ml-4 mt-4">Email Summary</h1>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-white/50 text-sm pl-4">
                  From:
                </div>
                <div className="col-span-2 text-white/50 text-sm ">{email}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-white/50 text-sm pl-4 ">
                  To:
                </div>
                <div className="col-span-2 text-white/50 text-sm">
                  {recipient}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-white/50 text-sm pl-4">
                  Subject:
                </div>
                <div className="col-span-2 text-white/50 text-sm">
                  {subject}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-white/50 text-sm pl-4">
                  Scheduled for:
                </div>
                <div className="col-span-2 text-white/50 text-sm">
                  {scheduleTime && scheduleTime.toLocaleString()}
                </div>
              </div>
              <hr className="border-t border-white/20 my-2" />
              <div>
                <div className="col-span-1 text-white/50 text-sm pl-4">
                  Content:
                </div>
                <div className="col-span-2 pl-4 text-white/50 text-sm">
                  {body}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex justify-start mt-8 ">
                <button
                  className="bg-blue-500 rounded-lg px-4 py-2 backdrop-blur-sm"
                  onClick={() => {
                    prevStep();
                  }}
                >
                  back
                </button>
              </div>
              <div className="flex justify-start mt-8 ">
                <button
                  className="bg-green-500 rounded-lg px-4 py-2 backdrop-blur-sm"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Schedule Email
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

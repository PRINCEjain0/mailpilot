"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Details() {
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  async function handleForm(e) {
    e.preventDefault();

    const data = {
      toEmail,
      subject,
      body,
      name,
    };

    try {
      const res = await fetch("api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dat = await res.json();
      console.log(dat);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <form onSubmit={handleForm}>
        <input
          value={toEmail}
          placeholder="Write the email address of the party"
          onChange={(e) => {
            setToEmail(e.target.value);
          }}
          className="bg-brown"
        ></input>
        <input
          value={subject}
          placeholder="Write the email address of the party"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          className="bg-brown"
        ></input>
        <input
          value={body}
          placeholder="Write the email address of the party"
          onChange={(e) => {
            setBody(e.target.value);
          }}
          className="bg-brown"
        ></input>
        <input
          value={name}
          placeholder="Write the email address of the party"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="bg-brown"
        ></input>
        <button>click</button>
        <h1 className="text-red-800">dww</h1>
      </form>
    </div>
  );
}

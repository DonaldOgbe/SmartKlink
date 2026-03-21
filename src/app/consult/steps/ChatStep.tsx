"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/consult";

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export default function ChatStep({ messages, setMessages }: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user" as const, text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = [...messages, userMessage].map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      const doctorMessage = {
        sender: "doctor" as const,
        text: data.reply || "Doctor response...",
      };

      setMessages((prev) => [...prev, doctorMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "doctor", text: "Something went wrong." },
      ]);

      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px]">
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}>
            <div
              className={`px-4 py-2 rounded-xl max-w-[70%] text-sm ${
                msg.sender === "user"
                  ? "bg-[#1368FE] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* LOADING */}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-xl bg-gray-100 text-gray-500 text-sm">
              Typing...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded-lg"
        />

        <button
          onClick={sendMessage}
          className="px-6 py-3 bg-[#1368FE] text-white rounded-lg font-semibold">
          Send
        </button>
      </div>
    </div>
  );
}

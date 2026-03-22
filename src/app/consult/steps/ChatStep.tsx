"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal, Stethoscope } from "lucide-react";
import { Message } from "@/types/consult";

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export default function ChatStep({ messages, setMessages }: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

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

      setMessages((prev) => [
        ...prev,
        { sender: "assistant" as const, text: data.reply || "Doctor response..." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant" as const,
          text: "Something went wrong. Please try again.",
        },
      ]);
      console.log(err);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[500px]">
      {/* HEADER */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Stethoscope className="w-4 h-4 text-[#0059cd]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            SmartKlinik Doctor
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {/* Empty state */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-[#0059cd]" />
            </div>
            <p className="text-sm font-medium text-gray-800">
              Describe your symptoms
            </p>
          <p className="text-xs text-gray-400 max-w-[220px]">
            Tell the doctor how you are feeling and they will help you from
            there.
          </p>
          </div>
        )}

        {messages.map((msg, index) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
              {/* Doctor avatar */}
              {!isUser && (
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mb-0.5">
                  <Stethoscope className="w-3 h-3 text-[#0059cd]" />
                </div>
              )}

              <div
                className={`px-4 py-2.5 rounded-2xl max-w-[72%] text-sm leading-relaxed ${
                  isUser
                    ? "bg-[#0059cd] text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}>
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-end gap-2 justify-start">
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-3 h-3 text-[#0059cd]" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-gray-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-[#0059cd] transition">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe your symptoms..."
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none py-1"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-lg bg-[#0059cd] flex items-center justify-center flex-shrink-0 hover:bg-[#0048a8] active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
            <SendHorizonal className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          Press Enter to send
        </p>
      </div>
    </div>
  );
}

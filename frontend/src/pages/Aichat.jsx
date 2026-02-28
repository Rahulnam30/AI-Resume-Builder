// Aichat.jsx
import { useEffect, useRef, useState } from "react";
import { Bot, SendHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axiosInstance from "./../api/axios";
export default function AiChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm the UpToSkills AI Resume Assistant.\nHow can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [responseLoading, setResponseLoading] = useState(false);
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  //chatbot option click outside handler
  const chatbotBtnRef = useRef(null);
  const chatbotContainerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        chatbotContainerRef.current &&
        chatbotBtnRef.current &&
        !chatbotContainerRef.current.contains(e.target) &&
        !chatbotBtnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const messagesRef = useRef(null);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const text = input.trim();
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setResponseLoading(true);
    try {
      const res = await axiosInstance.post("/api/chatbot/chat", {
        message: text,
        prevMsg: messages,
        isLoggedIn,
      });
      console.log(res.data);

      setMessages((prev) => [...prev, { from: "bot", text: res.data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong!, Please try again later" },
      ]);
    }
    setResponseLoading(false);
  }

  return (
    <>
      {/* ===== SLIDING CHATBOT ===== */}
      <div
        ref={chatbotContainerRef}
        className="fixed right-8 bottom-8 w-[360px] h-[520px] flex flex-col bg-white rounded-lg border shadow-sm transition-all duration-500 ease-in-out z-[9999]"
        style={{
          transform: open ? "translateX(0)" : "translateX(120%)",
        }}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-300 select-none">
          AI Resume Assistant
          <span className="cursor-pointer" onClick={() => setOpen(false)}>
            <X />
          </span>
        </div>

        <div
          ref={messagesRef}
          className="flex-1 flex flex-col gap-2 p-4 overflow-x-hidden overflow-y-auto scroll-smooth scrollbar-hide"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[90%] text-sm px-5 py-4 rounded-lg shadow-lg border animate-fade-in  ${m.from === "user" ? "self-end bg-orange-600 text-white rounded-tr-none" : "self-start bg-white text-black rounded-tl-none"}`}
            >
              <ReactMarkdown
                components={{
                  a: ({ href, children }) => (
                    <Link
                      to={href}
                      className="text-blue-600 font-semibold underline"
                    >
                      {children}
                    </Link>
                  ),
                  li: ({ children }) => (
                    <li className="ml-4 mb-2 list-decimal">{children}</li>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-semibold mt-2 mb-1">{children}</h3>
                  ),
                }}
              >
                {m.text}
              </ReactMarkdown>
            </div>
          ))}
          {responseLoading && (
            <div className="max-w-[80%] px-3 py-2 rounded-lg self-start bg-gray-300 text-black rounded-tl-none">
              <div className="flex items-center gap-1 p-2 pb-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce1"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce2"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce3"></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 p-4 border-t border-slate-300">
          <input
            value={input}
            className="flex-1 p-2.5 border-0 outline-none bg-slate-200 text-md text-black rounded-lg select-none"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about resume..."
          />
          <button
            className="bg-orange-600 text-white px-5 py-2 border-0 rounded-lg cursor-pointer"
            onClick={sendMessage}
          >
            <SendHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* ===== FLOATING BUTTON ===== */}
      <button
        ref={chatbotBtnRef}
        className="fixed right-10 bottom-10 z-50 bg-orange-600 p-4 text-white rounded-full shadow-2xl focus:ring-4 focus:ring-orange-300"
        onClick={() => setOpen(true)}
      >
        <Bot size={30} />
      </button>
    </>
  );
}

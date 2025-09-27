import React, { useState, useRef, useEffect } from "react";

const initialMessages = [
  {
    id: 1,
    sender: "Hanna from Alpega",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Hi there! 👋 Want to see Teleroute in action? Schedule a demo with me!",
    time: "04:00 PM",
  },
  {
    id: 2,
    sender: "Hanna from Alpega",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Awesome, let's hit the road together 🚚! For us to prepare the best demo for you, we like to know you and your preferences a bit more. Ready?",
    time: "04:00 PM",
  },
  {
    id: 3,
    sender: "me",
    text: "Yes",
    time: "04:00 PM",
    isUser: true,
  },
  {
    id: 4,
    sender: "Hanna from Alpega",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Great, let's start! Before we dive in, can you tell me your name?",
    time: "04:00 PM",
  },
];

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "me",
        text: input,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isUser: true,
      },
    ]);
    setInput("");
  };

  return (
    <>
      {/* Chat Icon Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-brand-500 hover:bg-brand-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        style={{ boxShadow: "0 4px 24px rgba(37, 99, 235, 0.25)" }}
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 3C7.03 3 3 6.58 3 11c0 2.01 1.01 3.83 2.7 5.19l-1.13 2.26a1 1 0 0 0 1.32 1.32l2.26-1.13A10.2 10.2 0 0 0 12 19c4.97 0 9-3.58 9-8s-4.03-8-9-8Zm0 14c-1.45 0-2.83-.36-4.03-1.03l-.37-.21-2.13 1.06 1.06-2.13-.21-.37A6.98 6.98 0 0 1 5 11c0-3.31 3.13-6 7-6s7 2.69 7 6-3.13 6-7 6Zm-1-5h2v2h-2v-2Zm0-6h2v4h-2V6Z"
          />
        </svg>
      </button>

      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] max-w-full bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-brand-500 text-white rounded-t-2xl">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Hanna"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="font-bold text-lg">Hanna from Alpega</span>
            <button
              className="ml-auto flex items-center justify-center w-9 h-9 rounded-full bg-white text-brand-500 hover:bg-brand-50 hover:text-brand-700 shadow transition"
              style={{ border: "2px solid #e0e1dd" }}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {/* Messages */}
          <div
            className="flex-1 px-4 py-3 bg-gray-50 overflow-y-auto"
            style={{ minHeight: 320, maxHeight: 400 }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.isUser ? "flex justify-end mb-2" : "mb-2"}
              >
                {!msg.isUser && (
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <div
                  className={
                    msg.isUser
                      ? "bg-brand-500 text-white rounded-2xl px-4 py-2 max-w-[70%] text-right shadow"
                      : "bg-gray-200 text-gray-900 rounded-2xl px-4 py-2 max-w-[70%] text-left shadow"
                  }
                >
                  {msg.text}
                  <div className="text-xs text-right mt-1 opacity-70">
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input */}
          <form
            className="flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur border-t"
            onSubmit={handleSend}
          >
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-300"
              placeholder="اكتب رسالة"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-brand-500 hover:bg-brand-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-brand"
              aria-label="Send"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M2 21l21-9-21-9v7l15 2-15 2v7Z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

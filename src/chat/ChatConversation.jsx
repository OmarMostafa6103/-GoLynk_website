import React, { useState, useRef, useEffect } from "react";

const ChatConversation = ({ user, messages, onSendMessage }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const prevMessagesLength = useRef(messages.length);

  // Scroll فقط عند إرسال رسالة جديدة وليس عند تغيير المستخدم
  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  // تصفية الرسائل حسب البحث
  const filteredMessages = searchValue
    ? messages.filter((msg) =>
        msg.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : messages;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <section className="flex-1 bg-gray-50 h-full flex flex-col">
      {/* الهيدر دائماً في الأعلى */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white/90 backdrop-blur">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full border-2 border-gray-200"
          />
          <div>
            <div className="font-bold text-lg">{user.name}</div>
            <div className="text-xs text-gray-400">Online</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            title="بحث"
            onClick={() => setShowSearch((prev) => !prev)}
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="#555" strokeWidth="2" />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                stroke="#555"
                strokeWidth="2"
              />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100" title="اتصال">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path
                d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.58 6.58l.27-.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z"
                stroke="#555"
                strokeWidth="2"
              />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100" title="فيديو">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <rect
                x="2"
                y="7"
                width="15"
                height="10"
                rx="2"
                stroke="#555"
                strokeWidth="2"
              />
              <polygon
                points="17 7 22 12 17 17"
                stroke="#555"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Search in chat (يظهر فقط عند الضغط على أيقونة البحث) */}
      {showSearch && (
        <div className="sticky top-[64px] z-10 px-6 py-3 border-b bg-gray-50 flex items-center gap-2 animate-fade-in">
          <input
            type="text"
            className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="ابحث في الشات..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="p-2 rounded-full bg-brand-600 text-white hover:bg-brand-700"
            onClick={() => setShowSearch(false)}
            title="إغلاق البحث"
          >
            <svg
              width="18"
              height="18"
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
      )}
      {/* Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto min-h-0">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={msg.isUser ? "flex justify-end mb-2" : "mb-2"}
          >
            <div
              className={
                msg.isUser
                  ? "bg-brand-500 text-white rounded-2xl px-4 py-2 max-w-[70%] text-right shadow"
                  : "bg-gray-200 text-gray-900 rounded-2xl px-4 py-2 max-w-[70%] text-left shadow"
              }
            >
              {msg.forwarded && (
                <div className="text-xs text-brand-600 mb-1">مُعاد توجيهها</div>
              )}
              {msg.text.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
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
        className="flex items-center gap-2 px-6 py-4 bg-white/90 backdrop-blur border-t"
        onSubmit={handleSend}
      >
        <button
          type="button"
          className="p-2 rounded-full bg-gray-100"
          title="إيموجي"
        >
          <span role="img" aria-label="emoji">
            😊
          </span>
        </button>
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-300"
          placeholder="اكتب رسالة..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="button"
          className="p-2 rounded-full bg-gray-100"
          title="ريكورد"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#555" strokeWidth="2" />
            <rect x="10" y="8" width="4" height="8" rx="2" fill="#555" />
          </svg>
        </button>
        <button
          type="submit"
          className="bg-brand-500 hover:bg-brand-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-brand"
          aria-label="إرسال"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M2 21l21-9-21-9v7l15 2-15 2v7Z" />
          </svg>
        </button>
      </form>
    </section>
  );
};

export default ChatConversation;

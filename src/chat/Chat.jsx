import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatConversation from "./ChatConversation";

const users = [
  {
    id: 1,
    name: "دعم GoLynk",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "فريق React/RN/Next",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "إبراهيم زكي",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 4,
    name: "أحمد خالد",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    id: 5,
    name: "+20 111 32...",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
  },
];

const initialMessages = {
  1: [
    {
      id: 1,
      sender: "أنت",
      text: "مرحبا! كيف يمكنني مساعدتك؟",
      time: "10:00 ص",
      isUser: true,
    },
    {
      id: 2,
      sender: "دعم GoLynk",
      text: "أهلاً بك!",
      time: "10:01 ص",
      isUser: false,
    },
  ],
  2: [
    {
      id: 1,
      sender: "أنت",
      text: "السلام عليكم يا فريق الريأكت!",
      time: "11:00 ص",
      isUser: true,
    },
    {
      id: 2,
      sender: "فريق React/RN/Next",
      text: "وعليكم السلام!",
      time: "11:01 ص",
      isUser: false,
    },
  ],
  3: [
    {
      id: 1,
      sender: "إبراهيم زكي",
      text: "كله تمام؟",
      time: "12:00 م",
      isUser: false,
    },
  ],
  4: [
    {
      id: 1,
      sender: "أحمد خالد",
      text: "تمام يا باشا!",
      time: "1:00 م",
      isUser: false,
    },
  ],
  5: [
    {
      id: 1,
      sender: "+20 111 32...",
      text: "👍",
      time: "2:00 م",
      isUser: false,
    },
  ],
};

const Chat = () => {
  const [selectedId, setSelectedId] = useState(users[0].id);
  const [messages, setMessages] = useState(initialMessages);
  const selectedUser = users.find((u) => u.id === selectedId);

  // إرسال رسالة جديدة
  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => ({
      ...prev,
      [selectedId]: [
        ...prev[selectedId],
        {
          id: prev[selectedId].length + 1,
          sender: "أنت",
          text,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isUser: true,
        },
      ],
    }));
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      <ChatList
        selectedId={selectedId}
        onSelect={setSelectedId}
        users={users}
      />
      <ChatConversation
        user={selectedUser}
        messages={messages[selectedId]}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chat;

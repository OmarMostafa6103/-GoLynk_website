import React from "react";

const users = [
  {
    id: 1,
    name: "GoLynk Support",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "You reacted ❤️ to ...",
    time: "8/9/2025",
    unread: 0,
  },
  {
    id: 2,
    name: "React/RN/Next Team",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    lastMessage: "~hossam: اللهم ...",
    time: "4:08 PM",
    unread: 2,
  },
  {
    id: 3,
    name: "Ibrahim Zaki",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    lastMessage: "كله تمام أنت ايه الأخبار",
    time: "4:01 PM",
    unread: 1,
  },
  {
    id: 4,
    name: "Ahmed Khaled",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    lastMessage: "تمام ياباشا",
    time: "3:29 PM",
    unread: 0,
  },
  {
    id: 5,
    name: "+20 111 32...",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    lastMessage: "You reacted 👍 to ...",
    time: "11:33 AM",
    unread: 0,
  },
];

const ChatList = ({ selectedId, onSelect }) => {
  return (
    <aside className="w-full md:w-80 bg-white/80 backdrop-blur border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="ابحث أو ابدأ محادثة جديدة"
          className="w-full px-3 py-2 rounded-full bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-brand-400"
          dir="rtl"
        />
      </div>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-brand-50 transition ${
              selectedId === user.id ? "bg-brand-100" : ""
            }`}
            onClick={() => onSelect(user.id)}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-bold truncate">{user.name}</span>
                <span className="text-xs text-gray-400 ml-2">{user.time}</span>
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user.lastMessage}
              </div>
            </div>
            {user.unread > 0 && (
              <span className="bg-brand-600 text-white rounded-full px-2 py-0.5 text-xs font-bold shadow-brand">
                {user.unread}
              </span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChatList;

// Removed CSS reliance; using Tailwind utilities only
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatWidget from "./chat/ChatWidget";
import Home from "./home/Home";
import Footer from "./components/Footer";
import Map from "./map/Map";
import Chat from "./chat/Chat";
import Notifications from "./notifications/Notifications";
import SocialLogin from "./social/SocialLogin";
import Orders from "./orders/Orders";
import Users from "./users/Users";

function App() {
  return (
    <div className="App flex flex-col min-h-screen bg-white text-gray-900 dark:bg-brand-900 dark:text-gray-100">
      <Navbar />
      <ChatWidget />
      <div className="flex-1 px-5 pt-[72px]">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/social-login" element={<SocialLogin />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

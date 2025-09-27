import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

// Minimal-light map style (clean look similar to courier apps)
const lightMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e5f5ec" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#eaeaea" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#dadada" }],
  },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#d6ecff" }],
  },
];

// أمثلة بيانات بسيطة (يمكن ربطها لاحقًا بالباك إند)
const travelers = [
  { id: 1, name: "أحمد", lat: 30.05, lng: 31.24, trip: "القاهرة → الجيزة" },
  {
    id: 2,
    name: "سارة",
    lat: 30.045,
    lng: 31.23,
    trip: "القاهرة → الإسكندرية",
  },
];
const senders = [
  { id: 1, name: "محمد", lat: 30.048, lng: 31.238, item: "شنطة ملابس" },
  { id: 2, name: "منى", lat: 30.042, lng: 31.232, item: "طرد صغير" },
];

// Icons (simple colored circles via inline SVG)
const SENDER_ICON = {
  url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'><circle cx='14' cy='14' r='10' fill='%23ef4444'/></svg>",
  scaledSize: { width: 28, height: 28 },
};
const TRAVELER_ICON = {
  url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'><circle cx='14' cy='14' r='10' fill='%230ea5e9'/></svg>",
  scaledSize: { width: 28, height: 28 },
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCTJ7-rf3o10eljjYnkEdR9szU-ttHeEIA", // مفتاحك الحقيقي
  });

  const [userLocation, setUserLocation] = useState({
    lat: 30.0444,
    lng: 31.2357,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mode, setMode] = useState("sender"); // sender | traveler
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  // الحصول على موقع العميل
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // إذا رفض المستخدم أو حدث خطأ، يبقى الموقع الافتراضي
        }
      );
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="pt-24 pb-10 px-5">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)] gap-5">
        {/* Sidebar panel */}
        <aside className="bg-white rounded-2xl shadow p-4 h-[70vh] lg:h-[calc(100vh-8rem)] overflow-auto order-2 lg:order-1">
          <img
            src={import.meta.env.BASE_URL + "In no time-pana.svg"}
            alt="illustration"
            className="w-full h-44 object-contain rounded-xl mb-4"
          />
          <h2 className="text-2xl font-extrabold mb-1">مرسل ومسافر</h2>
          <p className="text-gray-600 text-sm mb-4">
            اختر دورك: مرسل يعرض مواقع الطرود، أو مسافر يعرض المسافرين القريبين.
          </p>

          {/* Mode toggle */}
          <div className="inline-flex rounded-xl bg-gray-100 p-1 mb-4">
            <button
              className={`px-4 py-2 rounded-lg font-bold ${
                mode === "sender" ? "bg-black text-white" : "text-gray-700"
              }`}
              onClick={() => setMode("sender")}
            >
              مرسل
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-bold ${
                mode === "traveler" ? "bg-black text-white" : "text-gray-700"
              }`}
              onClick={() => setMode("traveler")}
            >
              مسافر
            </button>
          </div>

          {/* Inputs */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 border rounded-xl px-3 py-3">
              <span className="text-sky-600">●</span>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="موقع الالتقاط"
                className="w-full outline-none text-right"
                dir="rtl"
              />
            </label>
            <label className="flex items-center gap-2 border rounded-xl px-3 py-3">
              <span className="text-sky-600">■</span>
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="موقع التسليم"
                className="w-full outline-none text-right"
                dir="rtl"
              />
            </label>
            <button
              onClick={getUserLocation}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3"
            >
              بحث
            </button>
          </div>
        </aside>

        {/* Map area */}
        <div className="rounded-2xl overflow-hidden h-[60vh] lg:h-[calc(100vh-8rem)] order-1 lg:order-2">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={userLocation}
              zoom={13}
              options={{
                styles: lightMapStyle,
                disableDefaultUI: true,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {/* Marker for user location */}
              <Marker position={userLocation} label="أنت" />

              {mode === "sender"
                ? senders.map((s) => (
                    <Marker
                      key={`sender-${s.id}`}
                      position={{ lat: s.lat, lng: s.lng }}
                      icon={SENDER_ICON}
                      label={{ text: "م", color: "white", fontWeight: "700" }}
                      onClick={() =>
                        setSelectedMarker({
                          lat: s.lat,
                          lng: s.lng,
                          title: s.name,
                          subtitle: s.item,
                        })
                      }
                    />
                  ))
                : travelers.map((t) => (
                    <Marker
                      key={`trav-${t.id}`}
                      position={{ lat: t.lat, lng: t.lng }}
                      icon={TRAVELER_ICON}
                      label={{ text: "س", color: "white", fontWeight: "700" }}
                      onClick={() =>
                        setSelectedMarker({
                          lat: t.lat,
                          lng: t.lng,
                          title: t.name,
                          subtitle: t.trip,
                        })
                      }
                    />
                  ))}

              {selectedMarker && (
                <InfoWindow
                  position={{
                    lat: selectedMarker.lat,
                    lng: selectedMarker.lng,
                  }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="text-sm">
                    <div className="font-bold mb-1">{selectedMarker.title}</div>
                    <div className="text-gray-600">
                      {selectedMarker.subtitle}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              جاري تحميل الخريطة...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;

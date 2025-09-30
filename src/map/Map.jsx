import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import MapControls from "./MapControls";
import CreatePanel from "./CreatePanel";
import MapPopup from "./MapPopup";
import {
  createSenderFromPayload,
  createTravelerFromPayload,
} from "./createUtils";

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
  {
    id: 1,
    name: "أحمد",
    lat: 30.05,
    lng: 31.24,
    trips: [
      {
        id: 101,
        title: "رحلة: القاهرة → الجيزة",
        from: "القاهرة",
        to: "الجيزة",
        seats: 2,
      },
    ],
  },
  {
    id: 2,
    name: "سارة",
    lat: 30.045,
    lng: 31.23,
    trips: [
      {
        id: 102,
        title: "رحلة: القاهرة → الإسكندرية",
        from: "القاهرة",
        to: "الإسكندرية",
        seats: 3,
      },
    ],
  },
];

const senders = [
  {
    id: 1,
    name: "محمد",
    lat: 30.048,
    lng: 31.238,
    orders: [
      { id: 201, item: "شنطة ملابس", from: "د/م ١", to: "د/م ٢", type: "طرود" },
    ],
  },
  {
    id: 2,
    name: "منى",
    lat: 30.042,
    lng: 31.232,
    orders: [
      { id: 202, item: "طرد صغير", from: "المنصورة", to: "القاهرة", type: "طرود" },
    ],
  },
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
    googleMapsApiKey: "AIzaSyCTJ7-rf3o10eljjYnkEdR9szU-ttHeEIA", // keep existing key for compatibility
  });

  const mapRef = useRef(null);

  const [userLocation, setUserLocation] = useState({
    lat: 30.0444,
    lng: 31.2357,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mode, setMode] = useState("sender"); // sender | traveler

  // data lists (can be replaced with backend data)
  const [travelersList, setTravelersList] = useState(travelers);
  const [sendersList, setSendersList] = useState(senders);

  const [panelAction, setPanelAction] = useState(null); // 'create-sender' | 'create-traveler' | null
  const [popupOpen, setPopupOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);

  // get user location
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
          // ignore error, keep default
        }
      );
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const onMapLoad = (mapInstance) => {
    mapRef.current = mapInstance;
  };

  const centerAndSelect = (lat, lng, info) => {
    try {
      if (mapRef.current && lat && lng) {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom && mapRef.current.setZoom(14);
      }
    } catch {
      /* ignore */
    }
    setSelectedMarker(info);
    setPopupOpen(false);
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCreateOrder = (payload) => {
    const s = createSenderFromPayload(payload, userLocation);
    setSendersList((prev) => [s, ...prev]);
    setPanelAction(null);
    centerAndSelect(s.lat, s.lng, {
      lat: s.lat,
      lng: s.lng,
      title: s.name,
      subtitle: s.orders?.[0]?.item || "",
    });
  };

  const handleCreateTrip = (payload) => {
    const t = createTravelerFromPayload(payload, userLocation);
    setTravelersList((prev) => [t, ...prev]);
    setPanelAction(null);
    centerAndSelect(t.lat, t.lng, {
      lat: t.lat,
      lng: t.lng,
      title: t.name,
      subtitle: t.trips?.[0]?.title || "",
    });
  };

  const openList = () => {
    setPopupOpen(true);
  };

  const closeList = () => setPopupOpen(false);

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

          <div className="mb-4 flex items-center gap-3">
            <div className="inline-flex rounded-xl bg-gray-100 p-1">
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

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPanelAction("create-traveler")}
                  className="w-full h-12 bg-white border border-sky-400 text-sky-600 font-bold rounded-full shadow-lg"
                >
                  أضف رحلة
                </button>
                <button
                  onClick={() => setPanelAction("create-sender")}
                  className="w-full h-12 bg-white border border-red-400 text-red-600 font-bold rounded-full shadow-lg"
                >
                  أضف طلب
                </button>
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 border rounded-xl px-3 py-3">
              <span className="text-sky-600">●</span>
              <input
                type="text"
                placeholder="موقع الالتقاط"
                className="w-full outline-none text-right"
                dir="rtl"
              />
            </label>
            <label className="flex items-center gap-2 border rounded-xl px-3 py-3">
              <span className="text-sky-600">■</span>
              <input
                type="text"
                placeholder="موقع التسليم"
                className="w-full outline-none text-right"
                dir="rtl"
              />
            </label>
            <div className="flex gap-2">
              <button
                onClick={getUserLocation}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3"
              >
                بحث
              </button>
              <button
                onClick={openList}
                className="w-12 rounded-xl bg-gray-100 flex items-center justify-center"
                title="قائمة"
              >
                ☰
              </button>
            </div>
          </div>
        </aside>

        {/* Map area */}
        <div className="relative rounded-2xl overflow-hidden h-[60vh] lg:h-[calc(100vh-8rem)] order-1 lg:order-2">
          {/* Overlay controls (mobile pills + create buttons) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="pointer-events-auto">
              <MapControls
                mode={mode}
                onToggleMode={setMode}
                onCreateSender={() => setPanelAction("create-sender")}
                onCreateTraveler={() => setPanelAction("create-traveler")}
              />
            </div>
          </div>

          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={userLocation}
              zoom={13}
              onLoad={onMapLoad}
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
                ? sendersList.map((s) => (
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
                          subtitle: s.orders?.[0]?.item || "",
                        })
                      }
                    />
                  ))
                : travelersList.map((t) => (
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
                          subtitle: t.trips?.[0]?.title || "",
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

          {/* Create panel modal */}
          <CreatePanel
            action={panelAction}
            onClose={() => setPanelAction(null)}
            userLocation={userLocation}
            handleCreateOrder={handleCreateOrder}
            handleCreateTrip={handleCreateTrip}
          />

          {/* Popup / list view */}
          {popupOpen && (
            <MapPopup
              mode={mode}
              items={mode === "sender" ? sendersList : travelersList}
              onClose={closeList}
              centerAndSelect={centerAndSelect}
              toggleExpand={toggleExpand}
              expandedIds={expandedIds}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;

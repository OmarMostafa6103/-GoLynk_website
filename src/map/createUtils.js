export function createSenderFromPayload(payload, userLocation) {
  const id = Date.now();
  return {
    id,
    name: payload.receiverName || payload.item || "مرسل جديد",
    lat: payload.lat ?? userLocation?.lat ?? 0,
    lng: payload.lng ?? userLocation?.lng ?? 0,
    orders: [
      {
        id: id + 1,
        item: payload.description || payload.item || "طلب جديد",
        from: payload.pickupAddress || payload.from || "",
        to: payload.deliveryAddress || payload.to || "",
        type: "طرود",
      },
    ],
  };
}

export function createTravelerFromPayload(payload, userLocation) {
  const id = Date.now();
  return {
    id,
    name: payload.title || payload.receiverName || "مسافر جديد",
    lat: payload.lat ?? userLocation?.lat ?? 0,
    lng: payload.lng ?? userLocation?.lng ?? 0,
    trips: [
      {
        id: id + 1,
        title: payload.description || payload.title || "عرض رحلة",
        from: payload.from || payload.pickupAddress || "",
        to: payload.to || payload.deliveryAddress || "",
        seats: payload.seats ?? 1,
      },
    ],
  };
}

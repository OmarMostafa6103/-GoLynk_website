import React, { useState, useRef, useEffect } from "react";
import FormField from "./FormField";
import FileUploader from "./FileUploader";

const OrderForm = ({ onCreate, initialLocation }) => {
  const [description, setDescription] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [phone, setPhone] = useState("");
  const [packageSize, setPackageSize] = useState("medium");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState([]);
  const fileRef = useRef(null);
  const firstInputRef = useRef(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    firstInputRef.current && firstInputRef.current.focus();
  }, []);

  // file handling delegated to FileUploader

  const validate = () => {
    // Basic required fields
    const e = {};
    if (!pickupAddress) e.pickupAddress = "مطلوب عنوان الاستلام";
    if (!deliveryAddress) e.deliveryAddress = "مطلوب عنوان التسليم";
    if (!phone) e.phone = "مطلوب رقم هاتف";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const payload = {
      description,
      receiverName,
      pickupAddress,
      deliveryAddress,
      pickupDate,
      pickupTime,
      deliveryDate,
      deliveryTime,
      phone,
      packageSize,
      weight,
      notes,
      files, // File objects; caller can upload
      lat: initialLocation?.lat || null,
      lng: initialLocation?.lng || null,
    };
    onCreate && onCreate(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-3 text-right" dir="rtl">
      <FormField label="أضف صور للطلب (اختياري)">
        <FileUploader files={files} setFiles={setFiles} fileRef={fileRef} />
      </FormField>

      <FormField label="وصف الطلب">
        <textarea
          className="w-full border rounded-xl p-3 h-28"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="اكتب وصفًا للطلب يساعد السائق/المسافر"
        />
      </FormField>

      <div className="grid grid-cols-1 gap-2">
        <FormField>
          <input
            placeholder="اسم مستلم الشحنة (اختياري)"
            className="w-full border rounded-xl p-2"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
        </FormField>

        <FormField label="عنوان الاستلام" error={errors.pickupAddress}>
          <input
            ref={firstInputRef}
            data-testid="pickup-address"
            className="w-full border rounded-xl p-2"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)}
            aria-invalid={!!errors.pickupAddress}
          />
        </FormField>

        <FormField label="عنوان التسليم" error={errors.deliveryAddress}>
          <input
            data-testid="delivery-address"
            className="w-full border rounded-xl p-2"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            aria-invalid={!!errors.deliveryAddress}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">تاريخ الاستلام</label>
          <input
            type="date"
            className="w-full border rounded-xl p-2"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">وقت الاستلام</label>
          <input
            type="time"
            className="w-full border rounded-xl p-2"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">تاريخ التسليم المتوقع</label>
          <input
            type="date"
            className="w-full border rounded-xl p-2"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">وقت التسليم المتوقع</label>
          <input
            type="time"
            className="w-full border rounded-xl p-2"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm">رقم الهاتف للتواصل</label>
        <input
          data-testid="phone"
          className="w-full border rounded-xl p-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="01012345678"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <div className="text-sm text-red-600 mt-1">{errors.phone}</div>
        )}
      </div>

      <div>
        <label className="block text-sm">حجم الشحنة</label>
        <div className="flex gap-3 mt-2">
          <label
            className={`px-3 py-2 rounded-xl border ${
              packageSize === "small" ? "bg-gray-100" : ""
            }`}
          >
            <input
              type="radio"
              name="size"
              value="small"
              checked={packageSize === "small"}
              onChange={() => setPackageSize("small")}
            />{" "}
            صغرى
          </label>
          <label
            className={`px-3 py-2 rounded-xl border ${
              packageSize === "medium" ? "bg-gray-100" : ""
            }`}
          >
            <input
              type="radio"
              name="size"
              value="medium"
              checked={packageSize === "medium"}
              onChange={() => setPackageSize("medium")}
            />{" "}
            متوسطة
          </label>
          <label
            className={`px-3 py-2 rounded-xl border ${
              packageSize === "large" ? "bg-gray-100" : ""
            }`}
          >
            <input
              type="radio"
              name="size"
              value="large"
              checked={packageSize === "large"}
              onChange={() => setPackageSize("large")}
            />{" "}
            كبيرة
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm">الوزن (كجم) - اختياري</label>
        <input
          className="w-full border rounded-xl p-2"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="مثال: 2.5"
        />
      </div>

      <div>
        <label className="block text-sm">ملاحظات إضافية (اختياري)</label>
        <input
          className="w-full border rounded-xl p-2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-xl"
        >
          أضف الطلب الآن
        </button>
      </div>
    </form>
  );
};

export default OrderForm;

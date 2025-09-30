import React, { useState, useRef, useEffect } from "react";
import FormField from "./FormField";
import FileUploader from "./FileUploader";

const TripForm = ({ onCreate, initialLocation }) => {
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState([]);
  const fileRef = useRef(null);
  const firstInputRef = useRef(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    firstInputRef.current && firstInputRef.current.focus();
  }, []);

  // file handling done via FileUploader

  const validate = () => {
    const e = {};
    if (!from) e.from = "مطلوب نقطة الانطلاق";
    if (!to) e.to = "مطلوب الوجهة";
    if (!phone) e.phone = "مطلوب رقم هاتف";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      description,
      from,
      to,
      seats: Number(seats),
      date,
      time,
      phone,
      notes,
      files,
      lat: initialLocation?.lat || null,
      lng: initialLocation?.lng || null,
    };
    onCreate && onCreate(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-3 text-right" dir="rtl">
      <FormField label="أضف صورة توضح الغرض (اختياري)">
        <FileUploader files={files} setFiles={setFiles} fileRef={fileRef} />
      </FormField>

      <div>
        <label className="block text-sm">وصف العرض للمسافر</label>
        <textarea
          className="w-full border rounded-xl p-3 h-28"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="وصف الطلب أو المساعدة المطلوبة"
        />
      </div>

      <FormField label="نقطة الانطلاق" error={errors.from}>
        <input
          ref={firstInputRef}
          data-testid="from"
          className="w-full border rounded-xl p-2"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          aria-invalid={!!errors.from}
        />
      </FormField>

      <FormField label="الوجهة" error={errors.to}>
        <input
          data-testid="to"
          className="w-full border rounded-xl p-2"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          aria-invalid={!!errors.to}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm">تاريخ الرحلة</label>
          <input
            type="date"
            className="w-full border rounded-xl p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">وقت الرحلة</label>
          <input
            type="time"
            className="w-full border rounded-xl p-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm">عدد المقاعد المتاحة</label>
        <input
          type="number"
          min="1"
          className="w-full border rounded-xl p-2"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm">رقم الهاتف للتواصل</label>
        <input
          data-testid="phone"
          className="w-full border rounded-xl p-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <div className="text-sm text-red-600 mt-1">{errors.phone}</div>
        )}
      </div>

      <div>
        <label className="block text-sm">ملاحظات إضافية</label>
        <input
          className="w-full border rounded-xl p-2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white font-bold py-2 rounded-xl"
        >
          أنشئ طلب الآن
        </button>
      </div>
    </form>
  );
};

export default TripForm;

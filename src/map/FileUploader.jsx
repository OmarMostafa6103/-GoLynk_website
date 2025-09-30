import React from "react";

const FileUploader = ({ files, setFiles, fileRef }) => {
  const onFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected].slice(0, 6));
  };

  const removeFile = (index) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onFiles}
        className="hidden"
      />
      <div
        className="border-2 border-dashed rounded-xl p-4 text-center text-gray-600 cursor-pointer"
        onClick={() => fileRef.current && fileRef.current.click()}
      >
        اضغط لإضافة صور أو اسحبها هنا
      </div>
      {files.length > 0 && (
        <div className="mt-2 grid grid-cols-4 gap-2">
          {files.map((f, i) => (
            <div key={i} className="relative">
              <img
                src={URL.createObjectURL(f)}
                alt={f.name}
                className="w-full h-20 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute top-1 left-1 bg-white rounded-full p-1 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;

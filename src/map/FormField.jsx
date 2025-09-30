import React from "react";

const FormField = ({ label, children, error }) => {
  return (
    <div>
      {label && <label className="block text-sm">{label}</label>}
      {children}
      {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
    </div>
  );
};

export default FormField;

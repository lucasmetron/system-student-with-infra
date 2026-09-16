import React from 'react';

export default function Input({ label, type = 'text', id, placeholder, icon, required, onChange, value, disabled }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="font-label-md text-on-surface flex items-center gap-1">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <div className="relative w-full">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          value={value}
          disabled={disabled}
          className={`w-full h-11 ${icon ? 'pl-10' : 'pl-3'} pr-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:bg-surface-container-low disabled:text-outline`}
        />
      </div>
    </div>
  );
}

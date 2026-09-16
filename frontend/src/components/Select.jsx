import React from 'react';

export default function Select({ label, id, icon, required, options = [], placeholder, onChange, value }) {
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
        <select
          id={id}
          required={required}
          onChange={onChange}
          value={value}
          className={`w-full h-11 ${icon ? 'pl-10' : 'pl-3'} pr-10 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all cursor-pointer`}
          defaultValue={value === undefined ? "" : undefined}
        >
          {placeholder && <option value="" disabled hidden>{placeholder}</option>}
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
          expand_more
        </span>
      </div>
    </div>
  );
}

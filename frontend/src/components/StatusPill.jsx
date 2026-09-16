import React from 'react';

export default function StatusPill({ status, label }) {
  const statusStyles = {
    success: 'bg-[#F0FDF4] text-[#15803D]',
    warning: 'bg-[#FFFBEB] text-[#B45309]',
    error: 'bg-[#FEF2F2] text-[#B91C1C]',
    info: 'bg-surface-container text-primary'
  };

  const style = statusStyles[status] || statusStyles.info;

  return (
    <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full font-label-sm font-semibold whitespace-nowrap ${style}`}>
      {label}
    </span>
  );
}

import React from 'react';

export default function KpiCard({ title, icon, value, trendIcon, trendValue, trendColor = 'tertiary', progress }) {
  const trendColorClass = trendColor === 'tertiary' ? 'text-tertiary' : trendColor === 'error' ? 'text-error' : 'text-on-surface-variant';

  return (
    <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-3 relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <span className="font-label-md text-on-surface-variant">{title}</span>
        <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-headline-xl text-on-surface font-bold">{value}</span>
        {trendValue && (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container font-label-sm font-semibold ${trendColorClass}`}>
            <span className="material-symbols-outlined text-[14px]">{trendIcon}</span>
            {trendValue}
          </span>
        )}
      </div>
      {progress !== undefined && (
        <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
          <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
}

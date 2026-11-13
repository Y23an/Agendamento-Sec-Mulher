import React from 'react';

export default function Card({ title, subtitle, children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-t-4 border-ceamLilas ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4 pb-3 border-b border-gray-100">
          {title && <h2 className="text-lg font-bold text-ceamAzulEscuro">{title}</h2>}
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

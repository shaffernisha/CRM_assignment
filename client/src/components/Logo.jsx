import React from 'react';

const Logo = ({ size = 40 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#2563EB"/>
        <path d="M35 45 L50 35 L65 45 L50 55 Z" fill="white"/>
        <circle cx="35" cy="45" r="6" fill="white"/>
        <circle cx="65" cy="45" r="6" fill="white"/>
        <circle cx="50" cy="35" r="6" fill="white"/>
        <circle cx="50" cy="55" r="6" fill="white"/>
        <path d="M35 60 L50 70 L65 60" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
      </svg>
      <span style={{
        fontSize: size * 0.55,
        fontWeight: '700',
        color: '#2563EB',
        letterSpacing: '0.5px'
      }}>
        BlueTrack CRM
      </span>
    </div>
  );
};

export default Logo;
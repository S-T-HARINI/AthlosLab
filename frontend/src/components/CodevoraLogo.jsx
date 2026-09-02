import React from 'react';

/**
 * Custom Codevora Brand Logo Component
 * Futuristic glowing hexagon with stylized code bracket emblem
 */
const CodevoraLogo = ({ size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="codevoraGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="50%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="codevoraGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#818CF8" />
      </linearGradient>
      <filter id="codevoraGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Outer Glowing Hexagon Frame */}
    <path
      d="M24 4L40 13.24V34.76L24 44L8 34.76V13.24L24 4Z"
      stroke="url(#codevoraGrad1)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(15, 23, 42, 0.7)"
      filter="url(#codevoraGlow)"
    />
    
    {/* Inner Left Bracket */}
    <path
      d="M18 17L13 24L18 31"
      stroke="url(#codevoraGrad2)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Inner Right Bracket */}
    <path
      d="M30 17L35 24L30 31"
      stroke="url(#codevoraGrad2)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Forward Slash */}
    <path
      d="M26 16L22 32"
      stroke="url(#codevoraGrad1)"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export default CodevoraLogo;

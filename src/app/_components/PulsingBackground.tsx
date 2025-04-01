"use client";

export function PulsingBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Large central circle */}
        <circle
          cx="50%"
          cy="50%"
          r="120"
          fill="none"
          stroke="rgba(16, 185, 129, 0.05)"
          strokeWidth="2"
          className="animate-pulse-slow"
          filter="url(#glow)"
        />

        {/* Multiple decorative circles */}
        <circle
          cx="25%"
          cy="30%"
          r="80"
          fill="none"
          stroke="rgba(16, 185, 129, 0.03)"
          strokeWidth="2"
          className="animate-pulse-slower"
          filter="url(#glow)"
        />

        <circle
          cx="75%"
          cy="70%"
          r="100"
          fill="none"
          stroke="rgba(16, 185, 129, 0.04)"
          strokeWidth="2"
          className="animate-pulse-medium"
          filter="url(#glow)"
        />

        <circle
          cx="60%"
          cy="20%"
          r="60"
          fill="none"
          stroke="rgba(16, 185, 129, 0.03)"
          strokeWidth="2"
          className="animate-pulse-fast"
          filter="url(#glow)"
        />

        <circle
          cx="30%"
          cy="80%"
          r="70"
          fill="none"
          stroke="rgba(16, 185, 129, 0.02)"
          strokeWidth="2"
          className="animate-pulse-medium"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
}

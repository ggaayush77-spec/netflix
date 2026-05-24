export function FilmGrain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] opacity-[0.03] overflow-hidden">
      <svg className="absolute w-full h-full">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch">
            <animate attributeName="baseFrequency" values="0.6;0.65;0.6" dur="0.2s" repeatCount="indefinite" />
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
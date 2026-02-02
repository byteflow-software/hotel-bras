export function TransferCarSvg() {
  return (
    <svg
      viewBox="0 0 520 200"
      className="w-full max-w-lg mx-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="260" cy="188" rx="210" ry="10" fill="#00000010" />

      {/* Body - lower */}
      <path
        d="M60 120 L60 155 Q60 165 70 165 L450 165 Q460 165 460 155 L460 120 Z"
        fill="#5A5A5A"
      />

      {/* Body - upper cabin */}
      <path
        d="M100 120 L120 72 Q125 62 140 62 L360 62 Q375 62 380 72 L420 120 Z"
        fill="#5A5A5A"
      />

      {/* Roof */}
      <path
        d="M130 62 Q135 55 145 55 L355 55 Q365 55 370 62"
        fill="none"
        stroke="#4A4A4A"
        strokeWidth="2"
      />

      {/* Roof rack */}
      <rect x="160" y="52" width="180" height="4" rx="2" fill="#4A4A4A" />
      <rect x="180" y="49" width="3" height="5" rx="1" fill="#666" />
      <rect x="320" y="49" width="3" height="5" rx="1" fill="#666" />

      {/* Windshield */}
      <path
        d="M125 118 L145 72 Q148 65 158 65 L240 65 L240 118 Z"
        fill="#8CB4D0"
        opacity="0.7"
      />

      {/* Rear window */}
      <path
        d="M280 65 L362 65 Q370 65 374 72 L398 118 L280 118 Z"
        fill="#8CB4D0"
        opacity="0.7"
      />

      {/* Window divider */}
      <line x1="240" y1="65" x2="240" y2="118" stroke="#4A4A4A" strokeWidth="3" />
      <line x1="280" y1="65" x2="280" y2="118" stroke="#4A4A4A" strokeWidth="3" />

      {/* Side windows */}
      <rect x="244" y="70" width="32" height="44" rx="2" fill="#8CB4D0" opacity="0.6" />

      {/* Door line */}
      <line x1="240" y1="62" x2="240" y2="160" stroke="#4E4E4E" strokeWidth="1" />
      <line x1="340" y1="62" x2="355" y2="160" stroke="#4E4E4E" strokeWidth="1" />

      {/* Fender flares */}
      <path
        d="M80 155 Q80 130 110 125 Q140 130 140 155"
        fill="#4A4A4A"
      />
      <path
        d="M370 155 Q370 130 400 125 Q430 130 430 155"
        fill="#4A4A4A"
      />

      {/* Bumper - front */}
      <rect x="50" y="145" width="30" height="22" rx="4" fill="#3A3A3A" />
      {/* Bumper - rear */}
      <rect x="440" y="145" width="25" height="22" rx="4" fill="#3A3A3A" />

      {/* Headlight */}
      <path
        d="M55 125 L55 142 Q55 145 58 145 L68 145 L68 125 Q68 120 62 120 L60 120 Q55 120 55 125Z"
        fill="#F0D060"
        opacity="0.9"
      />

      {/* Taillight */}
      <path
        d="M455 125 L455 142 Q455 145 452 145 L445 145 L445 125 Q445 120 450 120 L452 120 Q455 120 455 125Z"
        fill="#DC2626"
        opacity="0.8"
      />

      {/* Wheels */}
      {/* Front wheel */}
      <circle cx="110" cy="165" r="26" fill="#222" />
      <circle cx="110" cy="165" r="20" fill="#333" />
      <circle cx="110" cy="165" r="15" fill="#999" stroke="#AAA" strokeWidth="1" />
      <circle cx="110" cy="165" r="6" fill="#555" />
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <line
          key={`fw-${angle}`}
          x1={110 + 6 * Math.cos((angle * Math.PI) / 180)}
          y1={165 + 6 * Math.sin((angle * Math.PI) / 180)}
          x2={110 + 14 * Math.cos((angle * Math.PI) / 180)}
          y2={165 + 14 * Math.sin((angle * Math.PI) / 180)}
          stroke="#777"
          strokeWidth="2"
        />
      ))}

      {/* Rear wheel */}
      <circle cx="400" cy="165" r="26" fill="#222" />
      <circle cx="400" cy="165" r="20" fill="#333" />
      <circle cx="400" cy="165" r="15" fill="#999" stroke="#AAA" strokeWidth="1" />
      <circle cx="400" cy="165" r="6" fill="#555" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <line
          key={`rw-${angle}`}
          x1={400 + 6 * Math.cos((angle * Math.PI) / 180)}
          y1={165 + 6 * Math.sin((angle * Math.PI) / 180)}
          x2={400 + 14 * Math.cos((angle * Math.PI) / 180)}
          y2={165 + 14 * Math.sin((angle * Math.PI) / 180)}
          stroke="#777"
          strokeWidth="2"
        />
      ))}

      {/* Hotel branding on door */}
      <rect x="155" y="100" width="75" height="28" rx="3" fill="#3D2B1F" opacity="0.85" />
      <text
        x="192"
        y="113"
        textAnchor="middle"
        fill="#C9A86C"
        fontSize="9"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        HOTEL BRAS
      </text>
      <text
        x="192"
        y="123"
        textAnchor="middle"
        fill="white"
        fontSize="7"
        fontWeight="600"
        fontFamily="sans-serif"
        letterSpacing="2"
      >
        TRANSLADO
      </text>

      {/* Side skirt accent line */}
      <line x1="70" y1="155" x2="450" y2="155" stroke="#C9A86C" strokeWidth="2" />

      {/* Mirror */}
      <rect x="95" y="90" width="8" height="14" rx="3" fill="#4A4A4A" />
    </svg>
  );
}

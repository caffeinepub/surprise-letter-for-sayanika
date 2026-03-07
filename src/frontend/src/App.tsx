import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

/* ────────────────────────────────────────────────────────────────
   Floating Petals
──────────────────────────────────────────────────────────────── */
interface PetalConfig {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  direction: "right" | "left";
  color: string;
}

const PETAL_COLORS = [
  "oklch(0.88 0.10 350)",
  "oklch(0.82 0.13 5)",
  "oklch(0.92 0.06 15)",
  "oklch(0.78 0.15 358)",
  "oklch(0.95 0.05 8)",
];

function usePetals(count: number): PetalConfig[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: (i * 7.3 + 3) % 97,
    size: 6 + ((i * 3.7) % 10),
    duration: 8 + ((i * 2.3) % 12),
    delay: (i * 1.8) % 14,
    direction: i % 2 === 0 ? "right" : "left",
    color: PETAL_COLORS[i % PETAL_COLORS.length],
  }));
}

function Petal({ config }: { config: PetalConfig }) {
  const animName =
    config.direction === "right" ? "petal-drift" : "petal-drift-left";
  return (
    <div
      style={{
        position: "absolute",
        left: `${config.left}%`,
        top: "-5%",
        width: config.size,
        height: config.size * 0.6,
        borderRadius: "50% 50% 50% 0",
        background: config.color,
        opacity: 0,
        animation: `${animName} ${config.duration}s ease-in ${config.delay}s infinite`,
        willChange: "transform, opacity",
        transform: `rotate(${(config.id * 47) % 360}deg)`,
      }}
    />
  );
}

/* ────────────────────────────────────────────────────────────────
   Sparkles
──────────────────────────────────────────────────────────────── */
interface SparkleConfig {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

function useSparkles(count: number): SparkleConfig[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: (i * 11.3 + 5) % 95,
    top: (i * 13.7 + 10) % 85,
    size: 3 + ((i * 2.1) % 6),
    duration: 2.5 + ((i * 0.7) % 3),
    delay: (i * 0.9) % 5,
  }));
}

function Sparkle({ config }: { config: SparkleConfig }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${config.left}%`,
        top: `${config.top}%`,
        width: config.size,
        height: config.size,
        opacity: 0,
        animation: `sparkle-pulse ${config.duration}s ease-in-out ${config.delay}s infinite`,
        willChange: "transform, opacity",
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 10 10"
        width={config.size}
        height={config.size}
        aria-hidden="true"
      >
        <polygon
          points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4"
          fill="oklch(0.72 0.14 350)"
        />
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Shared Background + Particles Layer
──────────────────────────────────────────────────────────────── */
function BackgroundScene() {
  const petals = usePetals(18);
  const sparkles = useSparkles(14);

  return (
    <>
      {/* ── Floating petals layer ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {petals.map((p) => (
          <Petal key={p.id} config={p} />
        ))}
      </div>

      {/* ── Sparkles layer ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {sparkles.map((s) => (
          <Sparkle key={s.id} config={s} />
        ))}
      </div>

      {/* Decorative corner roses */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          opacity: 0.35,
          fontSize: "32px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        🌹
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          opacity: 0.35,
          fontSize: "32px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        🌸
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          opacity: 0.25,
          fontSize: "24px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        🌺
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          opacity: 0.25,
          fontSize: "24px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        💐
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   Flower Bouquet SVG (top-right corner of letter)
──────────────────────────────────────────────────────────────── */
function FlowerBouquet() {
  return (
    <svg
      viewBox="0 0 100 110"
      width="88"
      height="96"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* Stems */}
      <line
        x1="50"
        y1="108"
        x2="50"
        y2="72"
        stroke="#6b9e5e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="100"
        x2="34"
        y2="76"
        stroke="#6b9e5e"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="100"
        x2="66"
        y2="76"
        stroke="#6b9e5e"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Leaves */}
      <ellipse
        cx="37"
        cy="84"
        rx="9"
        ry="5"
        fill="#7dc068"
        transform="rotate(-30 37 84)"
      />
      <ellipse
        cx="63"
        cy="84"
        rx="9"
        ry="5"
        fill="#7dc068"
        transform="rotate(30 63 84)"
      />
      <ellipse
        cx="50"
        cy="91"
        rx="7"
        ry="4"
        fill="#6db058"
        transform="rotate(5 50 91)"
      />

      {/* Center rose */}
      <circle cx="50" cy="40" r="15" fill="oklch(0.75 0.16 5)" />
      <ellipse cx="50" cy="32" rx="8" ry="12" fill="oklch(0.82 0.14 355)" />
      <ellipse cx="42" cy="38" rx="8" ry="11" fill="oklch(0.80 0.15 5)" />
      <ellipse cx="58" cy="38" rx="8" ry="11" fill="oklch(0.78 0.16 8)" />
      <ellipse cx="50" cy="45" rx="9" ry="7" fill="oklch(0.72 0.18 5)" />
      <circle cx="50" cy="40" r="6" fill="oklch(0.65 0.20 3)" />
      <circle cx="50" cy="38" r="3.5" fill="oklch(0.60 0.22 358)" />

      {/* Left rose */}
      <circle cx="31" cy="56" r="11" fill="oklch(0.80 0.13 350)" />
      <ellipse cx="31" cy="50" rx="6" ry="9" fill="oklch(0.87 0.10 350)" />
      <ellipse cx="25" cy="55" rx="6" ry="8" fill="oklch(0.85 0.11 350)" />
      <ellipse cx="37" cy="55" rx="6" ry="8" fill="oklch(0.83 0.12 355)" />
      <ellipse cx="31" cy="60" rx="7" ry="5" fill="oklch(0.77 0.15 350)" />
      <circle cx="31" cy="56" r="4" fill="oklch(0.70 0.18 348)" />

      {/* Right rose */}
      <circle cx="69" cy="56" r="11" fill="oklch(0.80 0.13 355)" />
      <ellipse cx="69" cy="50" rx="6" ry="9" fill="oklch(0.87 0.10 355)" />
      <ellipse cx="63" cy="55" rx="6" ry="8" fill="oklch(0.85 0.11 355)" />
      <ellipse cx="75" cy="55" rx="6" ry="8" fill="oklch(0.83 0.12 0)" />
      <ellipse cx="69" cy="60" rx="7" ry="5" fill="oklch(0.77 0.15 355)" />
      <circle cx="69" cy="56" r="4" fill="oklch(0.70 0.18 353)" />

      {/* Small buds */}
      <ellipse cx="22" cy="68" rx="5" ry="7" fill="oklch(0.85 0.12 5)" />
      <ellipse cx="22" cy="65" rx="3" ry="5" fill="oklch(0.90 0.09 5)" />
      <ellipse cx="78" cy="68" rx="5" ry="7" fill="oklch(0.85 0.12 0)" />
      <ellipse cx="78" cy="65" rx="3" ry="5" fill="oklch(0.90 0.09 0)" />

      {/* Ribbon bow */}
      <path
        d="M38 104 Q44 98 50 104 Q56 98 62 104 Q56 110 50 106 Q44 110 38 104Z"
        fill="oklch(0.70 0.16 5)"
        opacity="0.85"
      />
      <circle cx="50" cy="104" r="3" fill="oklch(0.62 0.20 5)" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
   Envelope SVG (pure JSX, no image files)
──────────────────────────────────────────────────────────────── */
function Envelope() {
  // Envelope dimensions: 320 × 230
  const W = 320;
  const H = 230;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="100%"
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="env-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.97 0.03 10)" />
          <stop offset="100%" stopColor="oklch(0.90 0.07 5)" />
        </linearGradient>
        <linearGradient id="env-flap-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.93 0.06 10)" />
          <stop offset="100%" stopColor="oklch(0.85 0.10 5)" />
        </linearGradient>
        <linearGradient id="env-bottom" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.88 0.09 8)" />
          <stop offset="100%" stopColor="oklch(0.80 0.12 5)" />
        </linearGradient>
        <filter id="env-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="12"
            floodColor="oklch(0.55 0.20 5)"
            floodOpacity="0.22"
          />
        </filter>
      </defs>

      {/* Drop shadow behind envelope */}
      <g filter="url(#env-shadow)">
        {/* Envelope body */}
        <rect
          x="0"
          y="0"
          width={W}
          height={H}
          rx="6"
          ry="6"
          fill="url(#env-body)"
        />

        {/* Bottom V flap lines (decorative fold marks) */}
        <line
          x1="0"
          y1="0"
          x2={W / 2}
          y2={H * 0.55}
          stroke="oklch(0.80 0.10 5)"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1={W}
          y1="0"
          x2={W / 2}
          y2={H * 0.55}
          stroke="oklch(0.80 0.10 5)"
          strokeWidth="0.8"
          opacity="0.5"
        />

        {/* Bottom triangle flap (V shape pointing to center-bottom) */}
        <polygon
          points={`0,${H} ${W},${H} ${W / 2},${H * 0.55}`}
          fill="url(#env-bottom)"
        />

        {/* Left side flap */}
        <polygon
          points={`0,0 0,${H} ${W / 2},${H * 0.55}`}
          fill="oklch(0.91 0.07 8)"
          opacity="0.85"
        />

        {/* Right side flap */}
        <polygon
          points={`${W},0 ${W},${H} ${W / 2},${H * 0.55}`}
          fill="oklch(0.89 0.08 6)"
          opacity="0.85"
        />

        {/* Border stroke */}
        <rect
          x="0"
          y="0"
          width={W}
          height={H}
          rx="6"
          ry="6"
          fill="none"
          stroke="oklch(0.78 0.12 5)"
          strokeWidth="1.5"
        />

        {/* Subtle inner border */}
        <rect
          x="6"
          y="6"
          width={W - 12}
          height={H - 12}
          rx="3"
          ry="3"
          fill="none"
          stroke="oklch(0.85 0.08 8)"
          strokeWidth="0.8"
          opacity="0.6"
        />
      </g>

      {/* Top flap — closed by default on home page */}
      <g className="envelope-flap">
        {/* Flap triangle */}
        <polygon
          points={`0,0 ${W},0 ${W / 2},${H * 0.5}`}
          fill="url(#env-flap-bg)"
          stroke="oklch(0.78 0.12 5)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Flap inner line */}
        <polygon
          points={`8,0 ${W - 8},0 ${W / 2},${H * 0.47}`}
          fill="none"
          stroke="oklch(0.85 0.08 8)"
          strokeWidth="0.8"
          opacity="0.6"
        />
      </g>

      {/* Wax seal as native SVG */}
      <g
        transform={`translate(${W / 2 - 26}, 8)`}
        style={{ pointerEvents: "none" }}
      >
        <circle cx="26" cy="26" r="24" fill="oklch(0.52 0.22 5)" />
        <circle cx="26" cy="26" r="21" fill="oklch(0.58 0.20 5)" />
        <circle
          cx="26"
          cy="26"
          r="22"
          fill="none"
          stroke="oklch(0.45 0.18 3)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d="M26 37 C13 28 8 19 15 13 C18.5 10.5 23 12 26 17 C29 12 33.5 10.5 37 13 C44 19 39 28 26 37Z"
          fill="oklch(0.97 0.03 5)"
        />
        <path
          d="M26 35 C15 27 11 19 17 14 C20 12 24 13.5 26 18 C28 13.5 32 12 35 14 C41 19 37 27 26 35Z"
          fill="oklch(0.97 0.03 5)"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
   Letter Content
──────────────────────────────────────────────────────────────── */
const LETTER_PARAGRAPHS = [
  "Happy Women's Day, Sayanika aka bhera🌸",
  "It feels a little strange writing something like this to you because we've known each other since class 6, and after all these years you're still one of the few people who has seen almost every version of me — the good ones, the annoying ones, and the completely chaotic ones.",
  "We've had our fair share of ups and downs, but somehow we always managed to stay connected. That's why I feel like what we have is a rare kind of bond, the kind that's hard to find and even harder to replace. And honestly, I cherish all the moments we've shared along the way.",
  "There are also these random little things about you that just stay in my memory. Like the way your face lights up when you receive flowers, or those expressions you make sometimes — cute asf, not going to lie. Moments like that just make me realize how genuine you are.",
  "You might get confused sometimes, you might overthink things here and there, but one thing that has always stayed constant about you is your good heart and intentions.",
  "So on this Women's Day, I just wanted to say that I really appreciate you — not just for who you are today, but for all the years of friendship, memories, and the bond we've built since we were kids.",
  "And thanks as well for tolerating my quirks and occasional annoying behavior all these years… that definitely deserves an award.",
  "Stay amazing.",
  "— Arghya(laden)",
];

/* ────────────────────────────────────────────────────────────────
   Home Page
──────────────────────────────────────────────────────────────── */
function HomePage() {
  const navigate = homeRoute.useNavigate();

  const handleOpen = () => {
    navigate({ to: "/letter" });
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        background: `
          radial-gradient(ellipse 80% 60% at 30% 20%, oklch(0.92 0.07 350 / 0.6) 0%, transparent 60%),
          radial-gradient(ellipse 70% 50% at 70% 80%, oklch(0.88 0.08 5 / 0.5) 0%, transparent 55%),
          radial-gradient(ellipse 90% 80% at 50% 50%, oklch(0.97 0.02 10) 0%, oklch(0.94 0.04 5) 100%)
        `,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BackgroundScene />

      {/* ── Main scene ── */}
      <div
        className="scene-entrance"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
        }}
      >
        {/* Envelope container */}
        <div
          style={{
            position: "relative",
            width: "min(320px, 80vw)",
            minWidth: "260px",
            height: "230px",
          }}
        >
          {/* Envelope — click target */}
          <button
            type="button"
            data-ocid="envelope.canvas_target"
            className="envelope-container"
            onClick={handleOpen}
            aria-label="Click to open envelope"
            style={{
              position: "relative",
              zIndex: 30,
              width: "100%",
              height: "100%",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            <Envelope />
          </button>
        </div>

        {/* Hint text — always visible on home page */}
        <div
          className="envelope-hint"
          style={{
            marginTop: "22px",
            fontFamily: "Georgia, serif",
            fontSize: "13.5px",
            color: "oklch(0.55 0.14 5)",
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: "16px" }}>✉</span>
          <span>click to open</span>
          <span style={{ fontSize: "16px" }}>🌸</span>
        </div>
      </div>

      {/* Keyframe for wax seal glow inline */}
      <style>{`
        @keyframes wax-seal-glow {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; filter: drop-shadow(0 0 6px oklch(0.55 0.22 5 / 0.6)); }
        }
      `}</style>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Letter Page
──────────────────────────────────────────────────────────────── */
function LetterPage() {
  const navigate = letterRoute.useNavigate();

  const handleBack = () => {
    navigate({ to: "/" });
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        background: `
          radial-gradient(ellipse 80% 60% at 30% 20%, oklch(0.92 0.07 350 / 0.6) 0%, transparent 60%),
          radial-gradient(ellipse 70% 50% at 70% 80%, oklch(0.88 0.08 5 / 0.5) 0%, transparent 55%),
          radial-gradient(ellipse 90% 80% at 50% 50%, oklch(0.97 0.02 10) 0%, oklch(0.94 0.04 5) 100%)
        `,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        boxSizing: "border-box",
      }}
    >
      <BackgroundScene />

      {/* Letter card */}
      <div
        className="scene-entrance"
        data-ocid="letter.panel"
        style={{
          position: "relative",
          zIndex: 10,
          width: "min(600px, 92vw)",
          borderRadius: "10px 10px 8px 8px",
          background: "oklch(0.99 0.005 55)",
          boxShadow:
            "0 4px 6px oklch(0.55 0.12 5 / 0.12), 0 20px 60px oklch(0.45 0.18 5 / 0.22), inset 0 1px 0 oklch(1 0 0 / 0.8)",
          border: "1px solid oklch(0.88 0.06 10)",
        }}
      >
        {/* Paper texture lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 27px,
              oklch(0.88 0.04 10 / 0.4) 27px,
              oklch(0.88 0.04 10 / 0.4) 28px
            )`,
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        />

        {/* Back button */}
        <button
          type="button"
          data-ocid="letter.close_button"
          onClick={handleBack}
          title="Back to envelope"
          style={{
            position: "absolute",
            top: "12px",
            left: "14px",
            height: "32px",
            padding: "0 12px",
            borderRadius: "20px",
            background: "oklch(0.88 0.08 5)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            fontSize: "13px",
            color: "oklch(0.45 0.18 5)",
            zIndex: 30,
            fontFamily: "Georgia, serif",
            transition: "background 0.2s, transform 0.15s",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
          onMouseOver={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "oklch(0.78 0.14 5)";
            btn.style.transform = "translateX(-2px)";
          }}
          onMouseOut={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "oklch(0.88 0.08 5)";
            btn.style.transform = "translateX(0)";
          }}
          onFocus={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "oklch(0.78 0.14 5)";
          }}
          onBlur={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "oklch(0.88 0.08 5)";
          }}
        >
          <span style={{ fontSize: "14px" }}>←</span>
          <span>Back</span>
        </button>

        {/* Flower bouquet — top right */}
        <div
          style={{
            position: "absolute",
            top: "-8px",
            right: "14px",
            zIndex: 25,
            pointerEvents: "none",
          }}
        >
          <FlowerBouquet />
        </div>

        {/* Letter scrollable content */}
        <div
          style={{
            maxHeight: "min(70vh, 640px)",
            overflowY: "auto",
            padding: "52px 28px 28px 28px",
            paddingRight: "110px",
            position: "relative",
            zIndex: 10,
            scrollbarWidth: "thin",
            scrollbarColor: "oklch(0.80 0.10 5) transparent",
          }}
        >
          {LETTER_PARAGRAPHS.map((para, idx) => {
            const isTitle = idx === 0;
            const isSign = idx === LETTER_PARAGRAPHS.length - 1;
            const isSignLine = idx === LETTER_PARAGRAPHS.length - 2;
            const paraKey = `para-${idx}-${para.slice(0, 12).replace(/\s+/g, "_")}`;
            return (
              <p
                key={paraKey}
                style={{
                  margin: 0,
                  marginBottom: isTitle ? "22px" : isSignLine ? "4px" : "18px",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: isTitle ? "17px" : isSign ? "15px" : "15px",
                  lineHeight: isTitle ? 1.4 : 1.8,
                  color: isTitle
                    ? "oklch(0.45 0.18 5)"
                    : isSign || isSignLine
                      ? "oklch(0.40 0.15 5)"
                      : "oklch(0.28 0.06 340)",
                  fontWeight: isTitle ? "700" : isSign ? "600" : "400",
                  fontStyle: isSign ? "italic" : "normal",
                  textAlign: isSign || isSignLine ? "right" : "left",
                  letterSpacing: isTitle ? "0.02em" : "0.005em",
                }}
              >
                {para}
              </p>
            );
          })}
        </div>

        {/* Bottom decorative strip */}
        <div
          style={{
            height: "6px",
            background:
              "linear-gradient(90deg, oklch(0.78 0.14 5 / 0.6), oklch(0.85 0.10 350 / 0.4), oklch(0.78 0.14 5 / 0.6))",
            borderRadius: "0 0 8px 8px",
            position: "relative",
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Router Setup (TanStack Router + Hash history for ICP)
──────────────────────────────────────────────────────────────── */
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const letterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/letter",
  component: LetterPage,
});

const routeTree = rootRoute.addChildren([homeRoute, letterRoute]);

const hashHistory = createHashHistory();

const router = createRouter({
  routeTree,
  history: hashHistory,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/* ────────────────────────────────────────────────────────────────
   Main App Export
──────────────────────────────────────────────────────────────── */
export default function App() {
  return <RouterProvider router={router} />;
}

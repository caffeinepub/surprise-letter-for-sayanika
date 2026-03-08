import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect, useRef } from "react";

/* ────────────────────────────────────────────────────────────────
   Floating Particles Background (petals + sparkles)
   Very light opacity — barely noticeable, romantic feel.
──────────────────────────────────────────────────────────────── */
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: "petal" | "sparkle";
  rotation: number;
  rotationSpeed: number;
  hue: number; // 0-360
  wobble: number;
  wobbleSpeed: number;
  wobbleAmp: number;
};

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 22;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawnParticle = (forceY?: number): Particle => ({
      x: rand(0, window.innerWidth),
      y: forceY !== undefined ? forceY : rand(-50, window.innerHeight),
      vx: rand(-0.22, 0.22),
      vy: rand(0.28, 0.7),
      size: rand(4, 9),
      opacity: rand(0.07, 0.18),
      type: Math.random() < 0.62 ? "petal" : "sparkle",
      rotation: rand(0, Math.PI * 2),
      rotationSpeed: rand(-0.012, 0.012),
      hue: Math.random() < 0.5 ? rand(0, 18) : rand(40, 60), // rose-pink or warm gold
      wobble: rand(0, Math.PI * 2),
      wobbleSpeed: rand(0.008, 0.02),
      wobbleAmp: rand(0.4, 1.0),
    });

    particlesRef.current = Array.from({ length: COUNT }, () => spawnParticle());

    const drawPetal = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rotation);
      c.globalAlpha = p.opacity;
      c.fillStyle = `oklch(0.82 0.14 ${p.hue})`;
      c.beginPath();
      // Simple oval petal
      c.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rotation);
      c.globalAlpha = p.opacity * 0.9;
      c.fillStyle = `oklch(0.88 0.10 ${p.hue + 30})`;
      const r = p.size * 0.5;
      // 4-point star
      c.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = i % 2 === 0 ? r : r * 0.38;
        c.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      c.closePath();
      c.fill();
      c.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        // Gentle horizontal wobble
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * p.wobbleAmp * 0.3;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          // Respawn at top
          Object.assign(p, spawnParticle(-20));
        }

        if (p.type === "petal") drawPetal(ctx, p);
        else drawSparkle(ctx, p);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
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
        background: "oklch(0.96 0.02 75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <FloatingParticles />

      {/* Bouquet image — fills the page as the only visual */}
      <div
        style={{
          position: "relative",
          maxWidth: "min(700px, 96vw)",
          width: "100%",
          zIndex: 1,
        }}
      >
        <img
          src="/assets/uploads/image-4-1.png"
          alt="Flower bouquet with letter inside"
          style={{
            width: "100%",
            maxHeight: "90dvh",
            objectFit: "contain",
            display: "block",
          }}
        />

        {/* Invisible hotspot — shaped to the envelope body in the image.
            The envelope is a trapezoid/rectangle with a triangular flap at top.
            We use clip-path polygon to match its actual shape closely.
            Coordinates are percentages of the container (the img).
            Approximate envelope outline:
              top-left  ≈ (28%, 48%)
              top-right ≈ (72%, 48%)
              bottom-right ≈ (72%, 72%)
              bottom-left  ≈ (28%, 72%)
              with a small triangular flap peak at ~(50%, 42%)  */}
        <button
          type="button"
          data-ocid="envelope.canvas_target"
          onClick={handleOpen}
          aria-label="Open letter"
          className="envelope-hotspot"
          style={{
            position: "absolute",
            top: "42%",
            left: "28%",
            width: "44%",
            height: "30%",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            zIndex: 10,
            /* clip-path expressed relative to the button's own bounding box:
               flap peak is at centre-top (50%, 0%),
               body corners follow. */
            clipPath: "polygon(50% 0%, 100% 18%, 100% 100%, 0% 100%, 0% 18%)",
          }}
        />
      </div>

      {/* Subtle pulse keyframe for hotspot */}
      <style>{`
        @keyframes hotspot-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 0px oklch(0.75 0.12 5 / 0));
          }
          50% {
            filter: drop-shadow(0 0 8px oklch(0.75 0.12 5 / 0.35));
          }
        }

        .envelope-hotspot {
          animation: hotspot-pulse 2.4s ease-in-out infinite;
        }

        .envelope-hotspot:hover {
          background: oklch(0.75 0.12 5 / 0.10) !important;
        }

        .envelope-hotspot:active {
          background: oklch(0.65 0.15 5 / 0.14) !important;
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
        background: "oklch(0.96 0.02 75)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        boxSizing: "border-box",
      }}
    >
      <FloatingParticles />

      {/* Letter card */}
      <div
        className="scene-entrance"
        data-ocid="letter.panel"
        style={{
          position: "relative",
          zIndex: 10,
          width: "min(600px, 92vw)",
          borderRadius: "10px 10px 8px 8px",
          background: "oklch(0.97 0.03 75)",
          boxShadow:
            "0 4px 6px oklch(0.55 0.08 75 / 0.12), 0 20px 60px oklch(0.45 0.10 75 / 0.18), inset 0 1px 0 oklch(1 0 0 / 0.8)",
          border: "1px solid oklch(0.88 0.05 75)",
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
              oklch(0.88 0.04 85 / 0.35) 27px,
              oklch(0.88 0.04 85 / 0.35) 28px
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
            background: "oklch(0.90 0.08 85)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            fontSize: "13px",
            color: "oklch(0.38 0.12 75)",
            zIndex: 30,
            fontFamily: "Georgia, serif",
            transition: "background 0.2s, transform 0.15s",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
          onMouseOver={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "oklch(0.80 0.12 85)";
            btn.style.transform = "translateX(-2px)";
          }}
          onMouseOut={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "oklch(0.90 0.08 85)";
            btn.style.transform = "translateX(0)";
          }}
          onFocus={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "oklch(0.80 0.12 85)";
          }}
          onBlur={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "oklch(0.90 0.08 85)";
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
            scrollbarColor: "oklch(0.78 0.10 85) transparent",
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
                    ? "oklch(0.40 0.14 75)"
                    : isSign || isSignLine
                      ? "oklch(0.38 0.12 75)"
                      : "oklch(0.28 0.04 60)",
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
              "linear-gradient(90deg, oklch(0.82 0.14 85 / 0.5), oklch(0.75 0.10 145 / 0.35), oklch(0.82 0.14 85 / 0.5))",
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

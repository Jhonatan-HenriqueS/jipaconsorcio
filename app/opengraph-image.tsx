import { ImageResponse } from "next/og";

export const alt = "JIPA Consórcios — consórcio em Ji-Paraná";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#071a33",
          color: "white",
          fontFamily: "sans-serif",
          padding: "78px 84px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "44px",
            border: "1px solid rgba(255,255,255,.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 280,
            height: 630,
            background: "#c72f3b",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 18,
                height: 18,
                marginRight: 14,
                background: "#c72f3b",
                transform: "rotate(45deg)",
              }}
            />
            JIPA CONSÓRCIOS
          </div>
          <div
            style={{
              width: 780,
              marginTop: 80,
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1.02,
            }}
          >
            Seus planos começam com clareza.
          </div>
          <div style={{ marginTop: 44, color: "#cbd6e2", fontSize: 26 }}>
            Consórcio em Ji-Paraná · Rondônia
          </div>
        </div>
      </div>
    ),
    size,
  );
}

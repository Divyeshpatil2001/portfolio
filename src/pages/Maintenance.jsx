import React from "react";

export default function Maintenance() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 24,
        background: "#0b0b0f",
        color: "#e8e8ee",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      <div>
        <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", margin: "0 0 12px" }}>
          Site under maintenance
        </h1>
        <p style={{ margin: 0, color: "#9a9aa8", fontSize: "1.05rem", lineHeight: 1.6 }}>
          I'm updating my portfolio with my latest experience.
          <br />
          Please check back in a few days.
        </p>
      </div>
    </main>
  );
}

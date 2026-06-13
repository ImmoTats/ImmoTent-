"use client";

import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  format?: "euro" | "number";
  duration?: number;
}

function formatValue(n: number, format: "euro" | "number"): string {
  if (format === "euro") {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Math.round(n));
  }
  return Math.round(n).toLocaleString("de-DE");
}

export default function AnimatedNumber({
  value,
  format = "number",
  duration = 1400,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(eased * value);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <span className="tabular">{formatValue(display, format)}</span>;
}

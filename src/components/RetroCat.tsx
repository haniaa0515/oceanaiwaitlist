import { useEffect, useState } from "react";

const RetroCat = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [catPos, setCatPos] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let raf: number;
    const lerp = () => {
      setCatPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        setIsMoving(dist > 8);

        if (Math.abs(dx) > 2) {
          setDirection(dx > 0 ? "right" : "left");
        }

        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{
        left: catPos.x - 12,
        top: catPos.y - 10,
        transform: `scaleX(${direction === "left" ? -1 : 1})`,
        imageRendering: "pixelated",
      }}
    >
      <svg
        width="24"
        height="20"
        viewBox="0 0 12 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isMoving ? "animate-cat-walk" : ""}
      >
        {/* Ears */}
        <rect x="1" y="0" width="1" height="1" fill="hsl(var(--primary))" />
        <rect x="4" y="0" width="1" height="1" fill="hsl(var(--primary))" />
        {/* Head */}
        <rect x="1" y="1" width="4" height="3" fill="hsl(var(--primary))" />
        {/* Eyes */}
        <rect x="2" y="2" width="1" height="1" fill="hsl(var(--background))" />
        <rect x="4" y="2" width="1" height="1" fill="hsl(var(--background))" />
        {/* Body */}
        <rect x="2" y="4" width="5" height="3" fill="hsl(var(--primary))" />
        {/* Legs */}
        <rect x="2" y="7" width="1" height="2" fill="hsl(var(--primary))" className={isMoving ? "animate-cat-leg-1" : ""} />
        <rect x="4" y="7" width="1" height="2" fill="hsl(var(--primary))" className={isMoving ? "animate-cat-leg-2" : ""} />
        <rect x="6" y="7" width="1" height="2" fill="hsl(var(--primary))" className={isMoving ? "animate-cat-leg-1" : ""} />
        {/* Tail */}
        <rect x="7" y="3" width="1" height="1" fill="hsl(var(--primary))" />
        <rect x="8" y="2" width="1" height="1" fill="hsl(var(--primary))" className={isMoving ? "animate-cat-tail" : ""} />
      </svg>
    </div>
  );
};

export default RetroCat;

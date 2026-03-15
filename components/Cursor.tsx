"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
    };
    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.11;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.11;
      if (ring.current) { ring.current.style.left = pos.current.x + "px"; ring.current.style.top = pos.current.y + "px"; }
      raf.current = requestAnimationFrame(loop);
    };
    const enter = () => ring.current?.classList.add("hovered");
    const leave = () => ring.current?.classList.remove("hovered");
    document.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,[data-hover]").forEach(el => {
      el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave);
    });
    raf.current = requestAnimationFrame(loop);
    return () => { document.removeEventListener("mousemove", move); if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot block" />
      <div ref={ring} className="cursor-ring block" />
    </>
  );
}

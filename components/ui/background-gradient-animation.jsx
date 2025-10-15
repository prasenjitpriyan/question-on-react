'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = 'rgb(108, 0, 162)',
  gradientBackgroundEnd = 'rgb(0, 17, 82)',
  firstColor = '18, 113, 255',
  secondColor = '221, 74, 255',
  thirdColor = '100, 220, 255',
  fourthColor = '200, 50, 50',
  fifthColor = '180, 180, 50',
  pointerColor = '140, 100, 255',
  size = '80%',
  blendingValue = 'hard-light',
  children,
  className,
  interactive = true,
  containerClassName,
}) => {
  const containerRef = useRef(null);
  const interactiveRef = useRef(null);
  const animationRef = useRef(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Smooth animation with requestAnimationFrame
  useEffect(() => {
    if (!interactive || !isMounted) return;

    function animate() {
      if (!interactiveRef.current) return;

      setCurX((prevX) => prevX + (tgX - prevX) / 20);
      setCurY((prevY) => prevY + (tgY - prevY) / 20);

      interactiveRef.current.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [tgX, tgY, curX, curY, interactive, isMounted]);

  const handleMouseMove = (event) => {
    if (!interactiveRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setTgX(event.clientX - rect.left);
    setTgY(event.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTgX(rect.width / 2);
    setTgY(rect.height / 2);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      className={cn(
        'relative overflow-x-hidden min-h-screen w-full',
        containerClassName
      )}
      style={{
        '--gradient-background-start': gradientBackgroundStart,
        '--gradient-background-end': gradientBackgroundEnd,
        '--first-color': firstColor,
        '--second-color': secondColor,
        '--third-color': thirdColor,
        '--fourth-color': fourthColor,
        '--fifth-color': fifthColor,
        '--pointer-color': pointerColor,
        '--size': size,
        '--blending-value': blendingValue,
      }}>
      {/* Fixed Background Layer */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `linear-gradient(40deg, var(--gradient-background-start), var(--gradient-background-end))`,
        }}
      />

      {/* SVG Filter for better blur effect */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Gradient Animation Container */}
      <div
        className="fixed inset-0 -z-10 opacity-60 pointer-events-none blur-2xl"
        aria-hidden="true"
        style={{
          filter: 'url(#blurMe) blur(40px)',
        }}>
        {/* Gradients */}
        <div className="absolute rounded-full bg-[radial-gradient(circle_at_center,_rgba(var(--first-color),0.8)_0,_rgba(var(--first-color),0)_50%)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:center_center] [mix-blend-mode:var(--blending-value)] animate-first" />

        <div className="absolute rounded-full bg-[radial-gradient(circle_at_center,_rgba(var(--second-color),0.8)_0,_rgba(var(--second-color),0)_50%)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-400px)] [mix-blend-mode:var(--blending-value)] animate-second" />

        <div className="absolute rounded-full bg-[radial-gradient(circle_at_center,_rgba(var(--third-color),0.8)_0,_rgba(var(--third-color),0)_50%)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%+400px)] [mix-blend-mode:var(--blending-value)] animate-third" />

        <div className="absolute rounded-full bg-[radial-gradient(circle_at_center,_rgba(var(--fourth-color),0.7)_0,_rgba(var(--fourth-color),0)_50%)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-200px)] [mix-blend-mode:var(--blending-value)] animate-fourth opacity-70" />

        <div className="absolute rounded-full bg-[radial-gradient(circle_at_center,_rgba(var(--fifth-color),0.8)_0,_rgba(var(--fifth-color),0)_50%)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-800px)_calc(50%+800px)] [mix-blend-mode:var(--blending-value)] animate-fifth" />

        {/* Interactive Pointer */}
        {interactive && isMounted && (
          <div
            ref={interactiveRef}
            className="absolute w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_rgba(var(--pointer-color),0.8)_0,_rgba(var(--pointer-color),0)_50%)] [mix-blend-mode:var(--blending-value)] opacity-70 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </div>

      {/* Content */}
      <div className={cn('relative z-0', className)}>{children}</div>
    </div>
  );
};

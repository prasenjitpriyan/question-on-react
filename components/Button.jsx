'use client';
import Link from 'next/link';

const Button = ({ href, text, className = '' }) => {
  return (
    <Link
      href={href}
      className={`text-sm md:text-base font-medium text-transparent bg-gradient-to-b from-white/80 to-white/20 bg-clip-text border border-white/10 px-6 py-2 rounded-full hover:border-white/40 hover:scale-105 transition-all duration-300 ${className}`}>
      {text}
    </Link>
  );
};

export default Button;

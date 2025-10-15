'use client';
import Link from 'next/link';

const Button = ({ href, text, className = '' }) => {
  return (
    <Link
      href={href}
      className={`btn-glass flex items-center gap-2 px-6 py-2.5 rounded-full
                       text-white/90 hover:text-white cursor-pointer hover:scale-105
                       active:scale-95 group ${className}`}>
      {text}
    </Link>
  );
};

export default Button;

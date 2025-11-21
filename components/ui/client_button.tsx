'use client';

import { ButtonHTMLAttributes } from 'react';

export default function ClientButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} suppressHydrationWarning>
      {children}
    </button>
  );
}
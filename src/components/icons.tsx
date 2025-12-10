import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6l3 12h12l3-12" />
      <path d="M9.5 6l1.5 12" />
      <path d="M14.5 6l-1.5 12" />
      <path d="M6 6h12" />
    </svg>
  );
}

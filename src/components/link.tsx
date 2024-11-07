"use client";

import { useRouter } from "next/navigation";

interface LinkProps extends Omit<React.HTMLProps<HTMLAnchorElement>, "href"> {
  to: string;
}

export function Link({to, ...props}: LinkProps) {
  const router = useRouter()

  return (
    <a 
      href={to}
      onClick={(e) => {
        e.preventDefault()
        
        router.push(to)
      }}
      {...props}
    />
  );
};
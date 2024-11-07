"use client";

import { isAppBrowser } from "@/lib/is-mobile";
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

        if(isAppBrowser()) {
          return window.open(window.location.href, "_system");
        }
        
        router.push(to)
      }}
      {...props}
    />
  );
};
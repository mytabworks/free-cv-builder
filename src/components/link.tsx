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
          return alert("Please open this link in a standard browser like Chrome or Edge. It may not work properly in social media browsers.")
        }
        
        router.push(to)
      }}
      {...props}
    />
  );
};
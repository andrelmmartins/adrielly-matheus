"use client";

import { Box, type BoxProps } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface RevealProps extends BoxProps {
  delay?: number;
  children: React.ReactNode;
}

export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -8px 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      className={`reveal${isVisible ? " is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Box>
  );
}

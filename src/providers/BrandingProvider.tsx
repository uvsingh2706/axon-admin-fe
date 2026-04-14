import { useEffect, type ReactNode } from "react";
import { activePlatform, brandTheme } from "@/config/branding";

interface BrandingProviderProps {
  children: ReactNode;
}

export default function BrandingProvider({ children }: BrandingProviderProps) {
  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-platform", activePlatform);
    root.style.setProperty("--brand-font-sans", brandTheme.typography.fontFamily);

    Object.entries(brandTheme.cssVariables).forEach(([token, value]) => {
      root.style.setProperty(token, value);
    });
  }, []);

  return <>{children}</>;
}

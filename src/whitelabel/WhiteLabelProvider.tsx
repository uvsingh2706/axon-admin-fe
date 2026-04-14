import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { getWhiteLabelConfig } from "./config";
import type { ThemeTokenMap, WhiteLabelConfig } from "./types";

interface WhiteLabelContextValue {
  config: WhiteLabelConfig;
}

const WhiteLabelContext = createContext<WhiteLabelContextValue | null>(null);

const FONT_LINK_ID = "white-label-font-link";

function applyTokens(tokens: ThemeTokenMap, previousTokenKeys: string[]) {
  const root = document.documentElement;

  previousTokenKeys.forEach((tokenKey) => {
    if (!(tokenKey in tokens)) {
      root.style.removeProperty(tokenKey);
    }
  });

  Object.entries(tokens).forEach(([token, value]) => {
    root.style.setProperty(token, value);
  });
}

function applyFont(fontFamily: string, fontUrl?: string) {
  const root = document.documentElement;
  root.style.setProperty("--app-font-sans", fontFamily);

  const existing = document.getElementById(FONT_LINK_ID);
  if (existing) {
    existing.remove();
  }

  if (fontUrl) {
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href = fontUrl;
    document.head.appendChild(link);
  }
}

export function WhiteLabelProvider({ children }: { children: ReactNode }) {
  const config = useMemo(() => getWhiteLabelConfig(), []);
  const previousTokenKeys = useRef<string[]>([]);

  useEffect(() => {
    applyTokens(config.tokens, previousTokenKeys.current);
    previousTokenKeys.current = Object.keys(config.tokens);
    applyFont(config.typography.fontFamily, config.typography.fontUrl);
    document.title = `${config.assets.displayName} Admin`;
  }, [config]);

  return <WhiteLabelContext.Provider value={{ config }}>{children}</WhiteLabelContext.Provider>;
}

export function useWhiteLabel() {
  const context = useContext(WhiteLabelContext);
  if (!context) {
    throw new Error("useWhiteLabel must be used inside WhiteLabelProvider");
  }
  return context.config;
}

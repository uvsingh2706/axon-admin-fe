import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "../lib/queryClient";
import { Toaster } from "@/component/ui/sonner";
import BrandingProvider from "./BrandingProvider";

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Single wrapper that composes all providers in the correct order.
 * Keeps main.tsx clean and makes it easy to add future providers
 * (e.g. ThemeProvider, Toaster) without touching the entry file.
 */

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrandingProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
        {/* Devtools only appear in development builds */}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        <Toaster />
      </QueryClientProvider>
    </BrandingProvider>
  );
}

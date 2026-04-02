import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't refetch on window focus for admin panels (avoids unnecessary API calls)
      refetchOnWindowFocus: false,

      // Retry failed requests once before showing error
      retry: 1,

      // Data stays fresh for 5 minutes — reduces redundant network calls
      staleTime: 5 * 60 * 1000,

      // Keep unused query cache for 10 minutes
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      // Retry mutations once on transient failures
      retry: 1,
    },
  },
});

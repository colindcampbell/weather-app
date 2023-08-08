import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: {
    retry: 1,
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchIntervalInBackground: false,
    staleTime: 1000 * 60 * 5, // 5 minutes it's stale
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

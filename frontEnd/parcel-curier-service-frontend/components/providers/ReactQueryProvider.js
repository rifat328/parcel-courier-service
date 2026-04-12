"use client";
//brodcaster for Query Client Brain
import React from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
console.log(
  "DEBUG: Is QueryClientProvider defined?",
  typeof QueryClientProvider,
);
const ReactQueryProvider = ({ children }) => {
  // We put this inside useState so it only gets created once per user session
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;

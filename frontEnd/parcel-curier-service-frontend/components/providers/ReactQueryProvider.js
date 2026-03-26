//brodcaster for Query Client Brain
"use client";

import React from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryProvider = ({ children }) => {
  // We put this inside useState so it only gets created once per user session
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;

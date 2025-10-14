import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import { LoadingAnimation } from "@/components/loading-animation";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  useSmoothScroll();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time for better UX
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 500));

    minLoadTime.then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <LoadingAnimation isLoading={isLoading} />
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

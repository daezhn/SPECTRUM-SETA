import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    // Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Add momentum scrolling for iOS
    document.body.style.webkitOverflowScrolling = "touch" as any;
    
    // Optional: Add custom easing for wheel events
    let scrollTimeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // Skip if zooming
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Scroll has ended, can add custom logic here
      }, 150);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, []);
}

export function scrollToSection(id: string, offset: number = 80) {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}
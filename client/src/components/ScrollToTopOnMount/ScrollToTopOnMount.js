import { useEffect } from "react";

// Basic component so React app loads top of page while traversing links
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default ScrollToTopOnMount;

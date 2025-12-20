import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This goes here because it is JavaScript logic, not CSS!
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // "instant" is usually better for nav, but you can use "smooth"
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
/**
 * Taken from https://dev.to/jmalvarez/check-if-an-element-is-visible-with-react-hooks-27h8
 */
import { useState, useEffect } from 'react';

export const useIsVisible = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}
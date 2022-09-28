import { useEffect, useState } from 'react';

const DEFAULT_DEBOUNCE_DELAY = 500;

function useDebounce<T>(value: T, delay?: number): T {
  const [debounce, setDebounce] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(value);
    }, delay || DEFAULT_DEBOUNCE_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounce;
}

export default useDebounce;

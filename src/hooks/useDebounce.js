import { useEffect, useState } from 'react';

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes
      return () => {
        clearTimeout(handler);
      };
    },
    // recall effect if value or delay changes
    [value, delay]
  );
  return debouncedValue;
}

export default useDebounce;

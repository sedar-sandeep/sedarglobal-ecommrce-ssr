import { useEffect, useState } from 'react';

export const Timeout = () => {
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsTimeout(true);
      return isTimeout;
    }, 200);
  }, []);

  return isTimeout;
};
import { useEffect, useState } from "react";

const useAnimatedCounter = (target: number, duration: number = 1200) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = timestamp - startTime;

      const percentage = Math.min(progress / duration, 1);

      const current = Math.floor(percentage * target);

      setCount(current);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return count;
};

export default useAnimatedCounter;

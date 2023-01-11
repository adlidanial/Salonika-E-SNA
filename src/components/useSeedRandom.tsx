import { useMemo } from "react";

export const useSeedRandom = (): {randomColor: () => string} => {
  
    const randomColor = useMemo(() => {
      return (): string => {
        const digits = "0123456789abcdef";
        let code = "#";
        for (let i = 0; i < 6; i++) {
          code += digits.charAt(Math.floor(Math.random() * 16));
        }
        return code;
      };
    }, []);
  
    return { randomColor };
  };
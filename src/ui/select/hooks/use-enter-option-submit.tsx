import { useEffect } from "react";
import type { RefObject } from "react";

import { OptionType } from "src/constants/article-props";

type UseEnterOptionSubmit = {
  value: OptionType["value"];
  onClick: (value: OptionType["value"]) => void;
  optionRef: RefObject<HTMLLIElement | null>;
};

export const useEnterOptionSubmit = ({ onClick, value, optionRef }: UseEnterOptionSubmit) => {
  useEffect(() => {
    const option = optionRef.current;
    if (!option) return;
    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === option && event.key === "Enter") {
        onClick(value);
      }
    };

    option.addEventListener("keydown", handleEnterKeyDown);
    return () => {
      option.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, [value, onClick, optionRef]);
};

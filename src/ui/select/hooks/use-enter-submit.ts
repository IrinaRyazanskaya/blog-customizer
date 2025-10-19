import { useEffect } from "react";
import type { RefObject } from "react";

type UseEnterSubmit = {
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  placeholderRef: RefObject<HTMLDivElement | null>;
};

export const useEnterSubmit = ({ placeholderRef, onChange }: UseEnterSubmit) => {
  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onChange((isOpen: boolean) => !isOpen);
      }
    };
    placeholderEl.addEventListener("keydown", handleEnterKeyDown);

    return () => {
      placeholderEl.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, []);
};

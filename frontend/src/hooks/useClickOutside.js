import { useEffect } from "react";

export default function useClickOutside(refs, onClickOutside,condition=true) {
  useEffect(() => {
    if (!condition) return;

    function handleClickOutside(event) {
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target)
      );
      if (isOutside) onClickOutside();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs, onClickOutside]);
}

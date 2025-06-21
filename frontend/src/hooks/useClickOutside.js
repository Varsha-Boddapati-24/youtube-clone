import { useEffect } from "react";

// Custom hook to detect clicks outside specified refs
export default function useClickOutside(refs, onClickOutside,condition=true) {
  useEffect(() => {
      // If the condition is false, do not attach the event listener
    if (!condition) return;
// Function to check if the click happened outside of all provided refs
    function handleClickOutside(event) {
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target)
      );
      // If the click was outside all refs, trigger the callback
      if (isOutside) onClickOutside();
    }
// Attach the mousedown event listener
    document.addEventListener("mousedown", handleClickOutside);
     // Clean up the listener when component unmounts 
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs, onClickOutside]);
}

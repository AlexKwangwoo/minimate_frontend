"use client";
import { useEffect } from "react";

const ClickOutside = (ref: any, onClickOutside: () => void) => {
  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event: React.MouseEvent<HTMLElement>) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind
    document.addEventListener<any>("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener<any>("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

export default ClickOutside;

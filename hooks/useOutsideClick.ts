import { useEffect } from "react";

export const useOutsideClick = ({ ref, show, setShow }: any) => {
  useEffect(() => {
    function handleClickOutside(event:any) {
      if (show && ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, show]);
};

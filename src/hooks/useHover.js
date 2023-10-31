import { useEffect, useState } from "react";

export default function useHover(ref) {
    const [isHover, setIsHover] = useState(false);
    const on = () => {
        setIsHover(true);
    };
    const off = () => {
        setIsHover(false);
    };
    useEffect(() => {
        if (!ref.current) {
            return;
        }
        const element = ref.current;
        element.addEventListener("mouseenter", on);
        element.addEventListener("mousemove", on);
        element.addEventListener("mouseleave", off);

        return function () {
            element.removeEventListener("mouseenter", on);
            element.removeEventListener("mousemove", on);
            element.removeEventListener("mouseleave", off);
        };
    }, []);
    return isHover;
}

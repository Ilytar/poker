import { useState, useEffect } from "react";
import useWindowSize from "./useWindowSize";
import useMousePosition from "./useMousePosition";

// минимальное расстояние от подсказки до края экрана
const SAFE_SIZE = 20;

export function usePrompt(promptRef) {
    const mousePosition = useMousePosition();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // тут будет DOMrect
    const [promptRect, setPromptRect] = useState({ width: 0, height: 0 });
    const windowSize = useWindowSize();

    useEffect(() => {
        const prompt = promptRef.current;
        if (prompt) {
            const promptRectCurrent = prompt.getBoundingClientRect();
            // выполняется при первом наведении для получения значений rect
            if (
                promptRectCurrent.width !== promptRect.width ||
                promptRectCurrent.height !== promptRect.height
            ) {
                setPromptRect(promptRectCurrent);
            }
        }
    }, [promptRef, promptRect, mousePosition]);

    useEffect(() => {
        if (promptRect.width !== 0 && promptRect.height !== 0) {
            // отступы от курсора по оси У
            const indentFromCursorOverPrompt = promptRect.height / 3;
            const indentFromCursorUnderPrompt = promptRect.height / 4;
            let newX, newY;

            newX = promptRect.right - mousePosition.x - promptRect.width / 2;
            newY =
                promptRect.bottom -
                mousePosition.y -
                indentFromCursorOverPrompt -
                promptRect.height;
            // если подсказка выходит на безопасное расстояние справа экрана
            if (
                mousePosition.x + promptRect.width / 2 + SAFE_SIZE >
                windowSize.width
            ) {
                newX = promptRect.right - windowSize.width + SAFE_SIZE;
            }
            // если подсказка выходит на безопасное расстояние снизу экрана
            if (
                mousePosition.y +
                    promptRect.height +
                    indentFromCursorUnderPrompt >
                windowSize.height
            ) {
                newY =
                    promptRect.bottom -
                    mousePosition.y +
                    indentFromCursorUnderPrompt;
            }
            // если подсказка выходит на безопасное расстояние слева экрана
            if (mousePosition.x - promptRect.width / 2 < SAFE_SIZE) {
                newX = promptRect.left - SAFE_SIZE;
            }
            setPosition({
                x: newX,
                y: newY,
            });
        }
    }, [mousePosition, promptRect, windowSize]);

    return position;
}

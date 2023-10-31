import { useState } from "react";

export default function useModal(state = false) {
    const [isModalOpen, setIsModalOpen] = useState(state);
    const modalToggleActivity = () => {
        setIsModalOpen((prev) => !prev);
    };

    return { isModalOpen, modalToggleActivity };
}

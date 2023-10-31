import React, { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.scss";
import { useProgress } from "@react-three/drei";

function generateRandom(a, b) {
    const min = Math.ceil(a);
    const max = Math.floor(b);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const folder = "./img/loading_screen_images/";
const loadingScreenImageList = [
    folder + "taverna1.png",
    folder + "taverna2.png",
    folder + "taverna3.png",
    folder + "taverna4.png",
    folder + "taverna5.png",
    folder + "default_loading.png",
    folder + "castle.png",
    folder + "house1.png",
    folder + "house2.png",
];

const LoadingScreen = ({ onStartHandler }) => {
    const { progress } = useProgress();

    const [image, setImage] = useState("");

    useEffect(() => {
        setImage(
            loadingScreenImageList[
                generateRandom(0, loadingScreenImageList.length - 1)
            ]
        );
    }, []);

    useEffect(() => {
        if (progress === 100) {
            onStartHandler(true);
        }
    }, [progress]);
    return (
        <div className={styles.block}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={image} alt="" />
            </div>
            <div className={styles.progressContainer}>
                <div className={styles.progressWrapper}>
                    <div
                        className={styles.mask}
                        style={{
                            backgroundImage:
                                "url('./img/loading_screen_images/mask.png')",
                        }}
                    ></div>

                    <div
                        className={styles.progressLine}
                        style={{ width: progress + "%" }}
                    ></div>
                </div>
                <div className={styles.text}>Загрузка...</div>
            </div>
        </div>
    );
};

export default LoadingScreen;

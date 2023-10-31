import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import useOneOfStagesCorrespondsToCurrentStage from "../../hooks/useOneOfStagesCorrespondsToCurrentStage";
import {
    STAGE_GAME_START,
    STAGE_PLAYER_CHOOSE_DICE_TO_THROW,
    STAGE_RESULT_OF_ROUND,
} from "../../store/data/gameStages";
import { Euler, MathUtils, Quaternion, Vector3 } from "three";

const CameraManagement = ({
    cameraInitPosition,
    cameraInitZoom,
    cameraInitRotation,
}) => {
    const camera = useThree((state) => state.camera);

    const isShowSceneCamera = useOneOfStagesCorrespondsToCurrentStage(
        STAGE_GAME_START,
        STAGE_RESULT_OF_ROUND
    );
    const isShowDiceCamera = useOneOfStagesCorrespondsToCurrentStage(
        STAGE_PLAYER_CHOOSE_DICE_TO_THROW
    );

    // кватернион нужен для плавной анимации
    const [cameraRotation, setCameraRotation] = useState(
        new Quaternion().setFromEuler(new Euler(...cameraInitRotation))
    );
    const [zoom, setZoom] = useState(cameraInitZoom);
    const [cameraPostion, setCameraPosition] = useState(
        new Vector3(...cameraInitPosition)
    );
    const cameraDeltaAnimation = 0.025;

    useFrame(() => {
        camera.position.lerp(cameraPostion, cameraDeltaAnimation);
        camera.quaternion.slerp(cameraRotation, cameraDeltaAnimation);
        if (Math.abs(camera.zoom - zoom) >= cameraDeltaAnimation * 1.01) {
            camera.zoom = MathUtils.lerp(
                camera.zoom,
                zoom,
                cameraDeltaAnimation
            );
            camera.updateProjectionMatrix();
        }
    });

    useEffect(() => {
        if (isShowDiceCamera) {
            setCameraPosition(new Vector3(3, 10, -6));
            setCameraRotation(
                new Quaternion().setFromEuler(new Euler(-2.131, 0.25, -3.32))
            );
            setZoom(6);
        } else if (isShowSceneCamera) {
            setCameraPosition(new Vector3(...cameraInitPosition));
            setCameraRotation(
                new Quaternion().setFromEuler(new Euler(...cameraInitRotation))
            );
            setZoom(cameraInitZoom);
        }
        // камера показывает цену сверху
        else {
            setCameraPosition(new Vector3(0, 10, -1));
            setCameraRotation(
                new Quaternion().setFromEuler(new Euler(-1.67, 0, -3.14))
            );
            setZoom(4);
        }
    }, [isShowDiceCamera, isShowSceneCamera]);

    return null;
};

export default CameraManagement;

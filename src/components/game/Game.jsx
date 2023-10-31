import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import Plane from "./models/Plane";
import Board from "./models/Board";
import Table from "./models/Table";
import DiceData from "./DiceData";
import GameStageHandler from "./GameStageHandler";
import CameraManagement from "./CameraManagement";

const Game = () => {
    const cameraInitPosition = [3, 11, -4];
    const cameraInitZoom = 3;
    const cameraInitRotation = [-1.9, 0.3, 3];

    return (
        <Canvas
            camera={{
                position: cameraInitPosition,
                zoom: cameraInitZoom,
                rotation: cameraInitRotation,
            }}
            style={{
                backgroundColor: "black",
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 0,
            }}
        >
            <Suspense fallback={null}>
                <CameraManagement
                    cameraInitPosition={cameraInitPosition}
                    cameraInitRotation={cameraInitRotation}
                    cameraInitZoom={cameraInitZoom}
                />
                <ambientLight intensity={0.35} />
                <pointLight
                    position={[-22.364, 3.797, -0.803]}
                    intensity={2}
                    decay={2}
                    distance={100}
                    color={"orange"}
                    power={100}
                />
                <rectAreaLight
                    position={[0, 4, 8]}
                    intensity={4}
                    width={6}
                    height={6}
                    color={"white"}
                />
                <Physics
                    gravity={[0, -2.81, 0]}
                    defaultContactMaterial={{ restitution: 0.3 }}
                    allowSleep
                >
                    <Plane />
                    <DiceData />
                    <Board />
                    <Table />
                    <GameStageHandler />
                </Physics>
            </Suspense>
        </Canvas>
    );
};

export default Game;

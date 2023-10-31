import React from "react";
import OpponentDice from "./OpponentDice";
import PlayerDice from "./PlayerDice";
import { Vector3 } from "three";
import { useGLTF } from "@react-three/drei";

const DICE_DARK_LINK =
    "https://cdn.jsdelivr.net/gh/Ilytar/models_poker@main/diceDark.gltf";
const DICE_LIGHT_LINK =
    "https://cdn.jsdelivr.net/gh/Ilytar/models_poker@main/diceLight.gltf";

function getBoundingBoxSize(box) {
    const size = new Vector3();
    box.getSize(size);
    return size;
}

const DiceData = () => {
    const { nodes: nodesLight, materials: materialsLight } =
        useGLTF(DICE_LIGHT_LINK);
    // геометрия не нужна, так как она берётся из первой модели
    const { materials: materialsDark } = useGLTF(DICE_DARK_LINK);
    const geometry = nodesLight.dice.geometry;
    const size = [...getBoundingBoxSize(geometry.boundingBox)];
    const materialLight = materialsLight.diceLight_material;
    const materialDark = materialsDark.diceDark_material;

    return (
        <>
            <OpponentDice
                geometry={geometry}
                material={materialDark}
                size={size}
            />
            <PlayerDice
                geometry={geometry}
                material={materialLight}
                size={size}
            />
        </>
    );
};

useGLTF.preload(DICE_LIGHT_LINK);
useGLTF.preload(DICE_DARK_LINK);
export default DiceData;

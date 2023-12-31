/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.5 board.gltf
*/

import React from "react";
import { useGLTF } from "@react-three/drei";
import Wall from "./Wall";

const link = "https://cdn.jsdelivr.net/gh/Ilytar/models_poker@main/board.gltf";

export default function Board(props) {
    const { nodes, materials } = useGLTF(link);
    const wallMesh = nodes.wall;
    return (
        <>
            <group {...props} dispose={null}>
                <mesh
                    geometry={nodes.board.geometry}
                    material={materials.board_material}
                />
                <mesh
                    geometry={nodes.holeForDice_light2.geometry}
                    material={materials["holeForDice_material.001"]}
                    position={[0.628, 0.651, -1.19]}
                />
                <mesh
                    geometry={nodes.holeForDice_light3.geometry}
                    material={materials["holeForDice_material.002"]}
                    position={[1.104, 0.651, -1.081]}
                />
                <mesh
                    geometry={nodes.holeForDice_light4.geometry}
                    material={materials["holeForDice_material.003"]}
                    position={[1.534, 0.651, -0.896]}
                />
                <mesh
                    geometry={nodes.holeForDice_light5.geometry}
                    material={materials["holeForDice_material.004"]}
                    position={[1.913, 0.651, -0.618]}
                />
                <mesh
                    geometry={nodes.holeForDice_light1.geometry}
                    material={materials.holeForDice_material}
                    position={[0.153, 0.651, -1.225]}
                />
                <mesh
                    geometry={nodes.holeForDice_dark5.geometry}
                    material={materials["holeForDice_material.005"]}
                    position={[-1.913, 0.651, 0.618]}
                />
                <mesh
                    geometry={nodes.holeForDice_dark4.geometry}
                    material={materials["holeForDice_material.006"]}
                    position={[-1.534, 0.651, 0.896]}
                />
                <mesh
                    geometry={nodes.holeForDice_dark3.geometry}
                    material={materials["holeForDice_material.007"]}
                    position={[-1.104, 0.651, 1.081]}
                />
                <mesh
                    geometry={nodes.holeForDice_dark2.geometry}
                    material={materials["holeForDice_material.008"]}
                    position={[-0.628, 0.651, 1.19]}
                />
                <mesh
                    geometry={nodes.holeForDice_dark1.geometry}
                    material={materials["holeForDice_material.009"]}
                    position={[-0.153, 0.651, 1.225]}
                />
                <mesh
                    geometry={nodes.furniture1.geometry}
                    material={materials.furniture_material}
                    position={[1.204, 0.675, -1.635]}
                />
                <mesh
                    geometry={nodes.furniture2.geometry}
                    material={materials["furniture_material.001"]}
                    position={[-1.204, 0.675, -1.635]}
                />
                <mesh
                    geometry={nodes.furniture4.geometry}
                    material={materials["furniture_material.002"]}
                    position={[-1.204, 0.675, 1.635]}
                />
                <mesh
                    geometry={nodes.furniture3.geometry}
                    material={materials["furniture_material.003"]}
                    position={[1.204, 0.675, 1.635]}
                />
                <mesh
                    geometry={nodes.furnitureSmall1.geometry}
                    material={materials["furniture_material.004"]}
                    position={[2.319, 0.635, 0.114]}
                />
                <mesh
                    geometry={nodes.furnitureSmall2.geometry}
                    material={materials["furniture_material.005"]}
                    position={[2.319, 0.635, -0.111]}
                />
                <mesh
                    geometry={nodes.furnitureSmall4.geometry}
                    material={materials["furniture_material.006"]}
                    position={[-2.319, 0.635, -0.111]}
                />
                <mesh
                    geometry={nodes.furnitureSmall3.geometry}
                    material={materials["furniture_material.007"]}
                    position={[-2.319, 0.635, 0.114]}
                />
            </group>
            <Wall mesh={wallMesh} />
        </>
    );
}

useGLTF.preload(link);

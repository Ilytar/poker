import { usePlane } from "@react-three/cannon";

function Plane(props) {
    const [planeRef] = usePlane(() => ({
        position: [0, 0.3, 0],
        rotation: [-Math.PI / 2, 0, 0],
        width: 1,
        height: 1,
        ...props,
    }));

    return <mesh ref={planeRef}></mesh>;
}
export default Plane;

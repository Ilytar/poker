import React from "react";
import { useBox } from "@react-three/cannon";

function getTriangularFacesArray(mesh) {
    // Изначально массив состоит из номеров точек, которые соединяются между собой
    // Грань представлена треугольником, поэтому нужно отделить точки, которые описывают эти треугольники
    let faceCount = mesh.geometry.index.array.length / 3;
    let faces = [];
    for (let i = 0; i < faceCount; i++) {
        let a = mesh.geometry.index.array[i * 3];
        let b = mesh.geometry.index.array[i * 3 + 1];
        let c = mesh.geometry.index.array[i * 3 + 2];
        faces.push([a, b, c]);
    }
    return faces;
}

function getArrayOfConvertedVertexToPoint(vertex) {
    //  Так как вершины идут подряд для всех точек, для удобства следует выделить координаты каждой вершины в виде точки(x,y,z)
    let result = [];
    for (let i = 0; i < vertex.length; i += 3) {
        //  Сюда можно добавить мастштабный коэффициент
        result.push([vertex[i], vertex[i + 1], vertex[i + 2]]);
    }
    return result;
}

function getSquareFacesArray(faces) {
    // Четырёхугольная грань состоит из 2х треугольных
    let result = [];
    for (let i = 0; i < faces.length; i += 2) {
        // Для определения таких граней нужно 6 точек
        // Последняя точка в массиве соединяется с первой точкой массива
        // Можно найти по порядку неповторяющиеся точки (4), они будут определять, как построить рёбра для получения четырёхугольника
        result.push([...faces[i], ...faces[i + 1]]);
    }
    return result;
}

function getDimensionsOfFacesArray(faces, points) {
    // flat - указать, какая координата не объёмная (работаем с плоскостями)
    let result = [];
    for (let face of faces) {
        // опорная точка, от которой находится расстояние до других точек
        let referencePoint = points[face[1]];
        // берём две точки (предположительно одна находится выше по y, а другая имеет такой же y, но другие x и z относительно опорной точки)
        let point0 = points[face[0]];
        let point2 = points[face[2]];
        let height, width;
        // далее определяем, какая точка используется для нахождения высоты, а какая для ширины
        // если у точек одиноковые x и z (в системе gltf), значит точка0 будет использоваться для расчёта высоты
        if (
            referencePoint[0] === point0[0] &&
            referencePoint[2] === point0[2]
        ) {
            height = caclDistanceBetweenTwoPoints(referencePoint, point0);
        } else {
            height = caclDistanceBetweenTwoPoints(referencePoint, point2);
        }
        // если у точек одинаковая высота (y), то точка0 будет использована для расчёта ширины
        if (referencePoint[1] === point0[1]) {
            width = caclDistanceBetweenTwoPoints(referencePoint, point0);
        } else {
            width = caclDistanceBetweenTwoPoints(referencePoint, point2);
        }
        // увеличим высоту, чтобы кубики не покидали игровую область
        result.push([0.01, height * 2, width]);
    }
    return result;
}

function caclDistanceBetweenTwoPoints(point1, point2) {
    // Расстояние между двумя точками в плоскости по формуле:
    return Math.sqrt(
        Math.pow(point1[0] - point2[0], 2) +
            Math.pow(point1[1] - point2[1], 2) +
            Math.pow(point1[2] - point2[2], 2)
    );
}

function getCentersOfPlanesArray(planes, points) {
    // Берём 2 точки, которые образуют диагональ прямоугольника (смежная сторона треугольных граней)
    let result = [];
    for (let plane of planes) {
        let point1 = points[plane[0]];
        let point2 = points[plane[2]];
        result.push([
            (point1[0] + point2[0]) / 2,
            (point1[1] + point2[1]) / 2,
            (point1[2] + point2[2]) / 2,
        ]);
    }
    return result;
}

function getAngularCoefficientsArray(faces, points) {
    // ТУТ нужно идти по граням!
    let result = [];
    for (let i = 0; i < faces.length; i++) {
        let p1 = points[faces[i][0]];
        p1 = [p1[0], p1[2]];
        let p2 = points[faces[i][2]];
        p2 = [p2[0], p2[2]];
        result.push(findAngularCoefficient(p1, p2));
    }
    return result;
}

function findAngularCoefficient(point1, point2) {
    let result = (point2[1] - point1[1]) / (point2[0] - point1[0]);
    return result;
}

function getAngelsArray(kArr) {
    // 3куб - 90 градусов
    let angels = [];
    for (const k of kArr) {
        angels.push(findAngleBetweenLineAndAxis(k));
    }
    return angels;
}

function findAngleBetweenLineAndAxis(angularCoefficient, axis = "z") {
    if (angularCoefficient === Infinity) {
        return 0;
    } else if (angularCoefficient === -Infinity) {
        return 0;
    } else if (angularCoefficient === 0) {
        return Math.PI / 2;
    } else if (angularCoefficient > 0) {
        let res = Math.PI / 2 - Math.atan(angularCoefficient);
        return res;
    } else if (angularCoefficient < 0) {
        let res = -Math.PI / 2 - Math.atan(angularCoefficient);
        return res;
    }
}

function Cube({
    position = [0, 0, 0],
    size = [1, 1, 1],
    rotation = [0, 0, 0],
    ...props
}) {
    const [ref] = useBox(() => ({
        mass: 0,
        position,
        rotation,
        args: size,
    }));
    return (
        <mesh ref={ref} {...props} scale={[1, 1, 1]}>
            <boxGeometry args={size} />
            <meshStandardMaterial transparent={true} opacity={0} />
        </mesh>
    );
}

export default function Wall({ mesh }) {
    const vertexes = mesh.geometry.attributes.position.array;
    const triangularFacesArray = getTriangularFacesArray(mesh);
    const pointsArray = getArrayOfConvertedVertexToPoint(vertexes);
    const squareFacesArray = getSquareFacesArray(triangularFacesArray);
    const dimensionsOfFacesArray = getDimensionsOfFacesArray(
        squareFacesArray,
        pointsArray
    );
    const centersOfPlanesArray = getCentersOfPlanesArray(
        squareFacesArray,
        pointsArray
    );
    const angularCoefficientsArray = getAngularCoefficientsArray(
        squareFacesArray,
        pointsArray
    );
    const angelsArray = getAngelsArray(angularCoefficientsArray);

    return (
        <>
            {squareFacesArray.map((_, i) => (
                <Cube
                    key={"wall_face" + i}
                    position={[...centersOfPlanesArray[i]]}
                    size={[...dimensionsOfFacesArray[i]]}
                    rotation={[0, angelsArray[i], 0]}
                />
            ))}
        </>
    );
}

import { Euler, Quaternion } from "three";

export function getScore(quaternion, isNeedToRoundAngle = false) {
    const eps = 0.01;
    const isZero = (angle) => Math.abs(angle) < eps;
    const isHalfPi = (angle) => Math.abs(angle - 0.5 * Math.PI) < eps;
    const isMinusHalfPi = (angle) => Math.abs(0.5 * Math.PI + angle) < eps;
    const isPiOrMinusPi = (angle) =>
        Math.abs(Math.PI - angle) < eps || Math.abs(Math.PI + angle) < eps;

    const quaternionNormalized = new Quaternion().fromArray(quaternion);
    const euler = new Euler();
    euler.setFromQuaternion(quaternionNormalized, "YZX");

    const rotation = { x: euler.x, z: euler.z };
    if (isNeedToRoundAngle) {
        rotation.x = roundAngle(rotation.x);
        rotation.z = roundAngle(rotation.z);
    }
    if (isZero(rotation.z)) {
        if (isZero(rotation.x)) {
            return 1;
        } else if (isHalfPi(rotation.x)) {
            return 2;
        } else if (isMinusHalfPi(rotation.x)) {
            return 5;
        } else if (isPiOrMinusPi(rotation.x)) {
            return 6;
        } else {
            return null;
        }
    } else if (isHalfPi(rotation.z)) {
        return 3;
    } else if (isMinusHalfPi(rotation.z)) {
        return 4;
    } else {
        return null;
    }
}

export function getRotationByScore(score) {
    switch (score) {
        case 1:
            return [0, 0, 0];
        case 2:
            return [0.5 * Math.PI, 0, 0];
        case 3:
            return [0, 0, 0.5 * Math.PI];
        case 4:
            return [0, 0, -0.5 * Math.PI];
        case 5:
            return [-0.5 * Math.PI, 0, 0];
        case 6:
            return [Math.PI, 0, 0];
        default:
            return [0, 0, 0];
    }
}

function roundAngle(angle) {
    const options = [0, Math.PI, -Math.PI, Math.PI / 2, -Math.PI / 2];
    let minDifference = Infinity;
    let roundAngle;

    for (let i = 0; i < options.length; i++) {
        const difference = Math.abs(angle - options[i]);
        if (difference < minDifference) {
            minDifference = difference;
            roundAngle = options[i];
        }
    }
    return roundAngle;
}

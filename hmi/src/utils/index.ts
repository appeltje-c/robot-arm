/*
 * Copyright (C) 2024
 * Martijn Benjamin (https://github.com/appeltje-c)
 *
 * -----
 * "Robotic Arm Study"
 * -----
 */
import {Vector3} from "three";

/**
 * Calculate degrees from radians
 * @param radians
 */
const toDegrees = (radians: number) => (radians * 180) / Math.PI

/**
 * Calculate radians from degrees
 * @param degrees
 */
const toRadians = (degrees: number) => (degrees * Math.PI) / 180

/**
 *
 * @param clickPoint
 * @param intersectionPoint
 * @param origin
 * @param e1
 * @param e2
 */
const calculateAngle = (clickPoint: Vector3, intersectionPoint: Vector3, origin: Vector3, e1: Vector3, e2: Vector3) => {

    const clickDir = new Vector3()
    const intersectionDir = new Vector3()

    clickDir.copy(clickPoint).sub(origin)
    intersectionDir.copy(intersectionPoint).sub(origin)

    const dote1e1 = e1.dot(e1)
    const dote2e2 = e2.dot(e2)
    const uClick = clickDir.dot(e1) / dote1e1
    const vClick = clickDir.dot(e2) / dote2e2
    const uIntersection = intersectionDir.dot(e1) / dote1e1
    const vIntersection = intersectionDir.dot(e2) / dote2e2
    const angleClick = Math.atan2(vClick, uClick)
    const angleIntersection = Math.atan2(vIntersection, uIntersection)

    return angleIntersection - angleClick
}

/**
 *
 * @param num
 * @param denom
 */
const fmod = (num: number, denom: number) => {

    let k = Math.floor(num / denom)
    k = k < 0 ? k + 1 : k

    return num - k * denom
}

/**
 *
 * @param angle
 */
const minimizeAngle = (angle: number) => {

    let result = fmod(angle, 2 * Math.PI)

    if (Math.abs(result) < 1e-6) {
        return 0.0
    }

    if (result < 0.0) {
        result += 2 * Math.PI
    }

    return result
}

/**
 * Helper method to calculate the offset when determining
 * if we are still within translation limits
 * @todo move to utils
 */
const calculateOffset = (clickPoint: Vector3, normal: Vector3, rayStart: Vector3, rayDir: Vector3) => {

    const vec1 = new Vector3()
    const vec2 = new Vector3()
    const e1 = normal.dot(normal)
    const e2 = normal.dot(clickPoint) - normal.dot(rayStart)
    const e3 = normal.dot(rayDir)

    if (e3 === 0) return -e2 / e1

    vec1.copy(rayDir).multiplyScalar(e1 / e3).sub(normal)
    vec2.copy(rayDir).multiplyScalar(e2 / e3).add(rayStart).sub(clickPoint)

    return -vec1.dot(vec2) / vec1.dot(vec1)
}

export {
    toDegrees,
    toRadians,
    calculateAngle,
    fmod,
    minimizeAngle,
    calculateOffset
}

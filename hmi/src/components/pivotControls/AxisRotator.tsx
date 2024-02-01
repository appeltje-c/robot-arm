import React, {useContext, useRef, useState, useCallback, useMemo, FC} from 'react'
import {ThreeEvent, useThree} from '@react-three/fiber'
import {Line, Html} from '@react-three/drei'
import clamp from 'lodash.clamp'
import {context} from './context'
import {Vector3, Matrix4, Ray, Group, Plane} from 'three'

const clickDir = new Vector3()
const intersectionDir = new Vector3()

const toDegrees = (radians: number) => (radians * 180) / Math.PI
const toRadians = (degrees: number) => (degrees * Math.PI) / 180

const calculateAngle = (
    clickPoint: Vector3,
    intersectionPoint: Vector3,
    origin: Vector3,
    e1: Vector3,
    e2: Vector3
) => {
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

const fmod = (num: number, denom: number) => {
    let k = Math.floor(num / denom)
    k = k < 0 ? k + 1 : k

    return num - k * denom
}

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

const rotMatrix = new Matrix4()
const posNew = new Vector3()
const ray = new Ray()
const intersection = new Vector3()

export const AxisRotator: FC<{ dir1: Vector3; dir2: Vector3; axis: 0 | 1 | 2 }> = ({
                                                                                       dir1,
                                                                                       dir2,
                                                                                       axis
                                                                                   }) => {
    const {
        rotationLimits,
        annotationsClass,
        depthTest,
        scale,
        lineWidth,
        fixed,
        axisColors,
        hoveredColor,
        displayValues,
        opacity,
        onDragStart,
        onDrag,
        onDragEnd,
        userData
    } = useContext(context)

    // @ts-expect-error new in @react-three/fiber@7.0.5
    const camControls = useThree((state) => state.controls) as { enabled: boolean }
    const divRef = useRef<HTMLDivElement>(null!)
    const objRef = useRef<Group>(null!)
    const angle0 = useRef<number>(0)
    const angle = useRef<number>(0)
    const clickInfo = useRef<{
        clickPoint: Vector3
        origin: Vector3
        e1: Vector3
        e2: Vector3
        normal: Vector3
        plane: Plane
    } | null>(null)
    const [isHovered, setIsHovered] = useState(false)

    const onPointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {

            if (displayValues) {
                divRef.current.innerText = `${toDegrees(angle.current).toFixed(0)}º`
                divRef.current.style.display = 'block'
            }

            e.stopPropagation()
            const clickPoint = e.point.clone()
            const origin = new Vector3().setFromMatrixPosition(objRef.current.matrixWorld)
            const e1 = new Vector3().setFromMatrixColumn(objRef.current.matrixWorld, 0).normalize()
            const e2 = new Vector3().setFromMatrixColumn(objRef.current.matrixWorld, 1).normalize()
            const normal = new Vector3().setFromMatrixColumn(objRef.current.matrixWorld, 2).normalize()
            const plane = new Plane().setFromNormalAndCoplanarPoint(normal, origin)
            clickInfo.current = {clickPoint, origin, e1, e2, normal, plane}
            onDragStart({component: 'Rotator', axis, origin, directions: [e1, e2, normal]})
            camControls && (camControls.enabled = false)
            // @ts-ignore - setPointerCapture is not in the type definition
            e.target.setPointerCapture(e.pointerId)
        },
        [camControls, onDragStart, axis, displayValues]
    )

    const onPointerMove = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation()
            if (!isHovered) setIsHovered(true)
            if (clickInfo.current) {
                const {clickPoint, origin, e1, e2, normal, plane} = clickInfo.current
                const [min, max] = rotationLimits?.[axis] || [undefined, undefined]

                ray.copy(e.ray)
                ray.intersectPlane(plane, intersection)
                ray.direction.negate()
                ray.intersectPlane(plane, intersection)
                let deltaAngle = calculateAngle(clickPoint, intersection, origin, e1, e2)
                let degrees = toDegrees(deltaAngle)

                if (e.shiftKey) {
                    degrees = Math.round(degrees / 10) * 10
                    deltaAngle = toRadians(degrees)
                }

                if (min !== undefined && max !== undefined && max - min < 2 * Math.PI) {
                    deltaAngle = minimizeAngle(deltaAngle)
                    deltaAngle = deltaAngle > Math.PI ? deltaAngle - 2 * Math.PI : deltaAngle
                    deltaAngle = clamp(deltaAngle, min - angle0.current, max - angle0.current)
                    angle.current = angle0.current + deltaAngle
                } else {
                    angle.current = minimizeAngle(angle0.current + deltaAngle)
                    angle.current = angle.current > Math.PI ? angle.current - 2 * Math.PI : angle.current
                }

                if (displayValues) {
                    degrees = toDegrees(angle.current)
                    divRef.current.innerText = `${degrees.toFixed(0)}º`
                }
                rotMatrix.makeRotationAxis(normal, deltaAngle)
                posNew.copy(origin).applyMatrix4(rotMatrix).sub(origin).negate()
                rotMatrix.setPosition(posNew)
                onDrag(rotMatrix)
            }
        },
        [onDrag, isHovered, rotationLimits, axis, displayValues]
    )

    const onPointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {

            if (displayValues) {
                divRef.current.style.display = 'none'
            }

            e.stopPropagation()
            angle0.current = angle.current
            clickInfo.current = null
            onDragEnd()
            camControls && (camControls.enabled = true)

            // @ts-ignore - setPointerCapture is not in the type definition
            e.target.releasePointerCapture(e.pointerId)
        },
        [camControls, onDragEnd, displayValues]
    )

    const onPointerOut = useCallback((e: any) => {
        e.stopPropagation()
        setIsHovered(false)
    }, [])

    const matrixL = useMemo(() => {
        const dir1N = dir1.clone().normalize()
        const dir2N = dir2.clone().normalize()
        return new Matrix4().makeBasis(dir1N, dir2N, dir1N.clone().cross(dir2N))
    }, [dir1, dir2])

    const r = fixed ? 0.65 : scale * 0.65

    const arc = useMemo(() => {
        const segments = 32
        const points: Vector3[] = []
        for (let j = 0; j <= segments; j++) {
            const angle = (j * (Math.PI / 2)) / segments
            points.push(new Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0))
        }
        return points
    }, [r])

    return (
        <group
            ref={objRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerOut={onPointerOut}
            matrix={matrixL}
            matrixAutoUpdate={false}>
            <Html position={[r, r, 0]}>
                <div
                    style={{
                        display: 'none',
                        background: '#151520',
                        color: 'white',
                        padding: '6px 8px',
                        borderRadius: 7,
                        whiteSpace: 'nowrap'
                    }}
                    className={annotationsClass}
                    ref={divRef}
                />
            </Html>
            {/* The invisible mesh being raycast */}
            <Line points={arc} lineWidth={lineWidth * 4} visible={false} userData={userData}/>
            {/* The visible mesh */}
            <Line
                transparent
                raycast={() => null}
                depthTest={depthTest}
                points={arc}
                lineWidth={lineWidth}
                color={(isHovered ? hoveredColor : axisColors[axis]) as any}
                opacity={opacity}
                polygonOffset
                polygonOffsetFactor={-10}
            />
        </group>
    )
}

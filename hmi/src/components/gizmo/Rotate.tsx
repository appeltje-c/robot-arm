/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import React, {useContext, useRef, useState, useCallback, useMemo, FC} from 'react'
import {ThreeEvent, useThree} from '@react-three/fiber'
import {Line, Html} from '@react-three/drei'
import clamp from 'lodash.clamp'
import {context} from './context'
import {Vector3, Matrix4, Ray, Group, Plane} from 'three'
import {calculateAngle, toDegrees, toRadians, minimizeAngle} from '@utils'

/**
 * Rotate lets the user drag the gizmo and, with it, the child objects over the configured rotation axis/axes
 */
export const Rotate: FC<{ axis: 0 | 1 | 2 }> = ({axis}) => {

    // get the gizmo config & event implementations from context
    const {
        rotationLimits,
        scale,
        onDragStart,
        onDrag,
        onDragEnd,
        userData
    } = useContext(context)

    // determine directions
    const direction1 =
        axis === 2 ? new Vector3(1, 0, 0) :
            axis === 1 ? new Vector3(0, 0, 1) : new Vector3(0, 1, 0)
    const direction2 =
        axis === 2 ? new Vector3(0, 1, 0) :
            axis === 1 ? new Vector3(1, 0, 0) : new Vector3(0, 0, 1)

    // get a handle on the cam controls to enable/disable while operating the gizmo
    const camControls = useThree((state) => state.controls) as unknown as { enabled: boolean }

    // the label showing the rotated value
    const rotationLabel = useRef<HTMLDivElement>(null!)

    // Object3D group for this Gizmo
    const gizmoGroup = useRef<Group>(null!)

    // ref to keep info where the mouse/pointer click occurred
    const clickInfo = useRef<{
        clickPoint: Vector3
        origin: Vector3
        e1: Vector3
        e2: Vector3
        normal: Vector3
        plane: Plane
    } | null>(null)

    // is the mouse hovering over the gizmo. we change the color when hovering over
    const [isHovered, setIsHovered] = useState(false)

    // the angle calculated on start and used while moving
    const angle0 = useRef<number>(0)
    const angle = useRef<number>(0)

    /**
     * On pointer down (click) we prepare to start dragging
     */
    const onPointerDown = useCallback((event: ThreeEvent<PointerEvent>) => {

        // update label with rotation value
        rotationLabel.current.innerText = `${toDegrees(angle.current).toFixed(0)}°`
        rotationLabel.current.style.display = 'block'

        // avoid handlers firing
        event.stopPropagation()

        // get the xyz vector for the mouse click
        const clickPoint = event.point.clone()

        // @todo learn what is going on here
        const origin = new Vector3().setFromMatrixPosition(gizmoGroup.current.matrixWorld)
        const e1 = new Vector3().setFromMatrixColumn(gizmoGroup.current.matrixWorld, 0).normalize()
        const e2 = new Vector3().setFromMatrixColumn(gizmoGroup.current.matrixWorld, 1).normalize()
        const normal = new Vector3().setFromMatrixColumn(gizmoGroup.current.matrixWorld, 2).normalize()
        const plane = new Plane().setFromNormalAndCoplanarPoint(normal, origin)

        // set the click info
        clickInfo.current = {clickPoint, origin, e1, e2, normal, plane}

        // invoke drag start for rotation operation
        onDragStart({action: 'Rotate', axis, origin, directions: [e1, e2, normal]})

        // disable the cam controls to avoid it fighting with the gizmo movements
        camControls && (camControls.enabled = false)

        // @ts-ignore - setPointerCapture is not in the type definition
        event.target.setPointerCapture(event.pointerId)

    }, [camControls, onDragStart, axis])

    /**
     * Mouse/pointer moving
     */
    const onPointerMove = useCallback((event: ThreeEvent<PointerEvent>) => {

        // avoid handlers firing
        event.stopPropagation()

        if (!isHovered) setIsHovered(true)

        if (clickInfo.current) {

            const {clickPoint, origin, e1, e2, normal, plane} = clickInfo.current

            /**
             * Check if we are still within translation limits
             */
            const [min, max] = rotationLimits?.[axis] || [undefined, undefined]
            const ray = new Ray()
            const intersection = new Vector3()

            ray.copy(event.ray)
            ray.intersectPlane(plane, intersection)
            ray.direction.negate()
            ray.intersectPlane(plane, intersection)

            let deltaAngle = calculateAngle(clickPoint, intersection, origin, e1, e2)
            let degrees = toDegrees(deltaAngle)

            if (event.shiftKey) {
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

            // update label values
            degrees = toDegrees(angle.current)
            rotationLabel.current.innerText = `${degrees.toFixed(0)}°`

            const rotationMatrix = new Matrix4()
            const posNew = new Vector3()

            rotationMatrix.makeRotationAxis(normal, deltaAngle)
            posNew.copy(origin).applyMatrix4(rotationMatrix).sub(origin).negate()
            rotationMatrix.setPosition(posNew)

            // invoke the onDrag method with the calculated rotation matrix
            // @ts-ignore
            onDrag(rotationMatrix)
        }

    }, [onDrag, isHovered, rotationLimits, axis])

    /**
     * Pointer up ends the gizmo interaction
     */
    const onPointerUp = useCallback((event: ThreeEvent<PointerEvent>) => {

        // hide label
        rotationLabel.current.style.display = 'none'

        // avoid handlers firing
        event.stopPropagation()

        angle0.current = angle.current

        // reset click info
        clickInfo.current = null

        // call the onDragEnd
        onDragEnd()

        // give cam controls back
        camControls && (camControls.enabled = true)

        // @ts-ignore - setPointerCapture is not in the type definition
        event.target.releasePointerCapture(event.pointerId)

    }, [camControls, onDragEnd])

    /**
     * In the pointer out we mark hovered as false
     */
    const onPointerOut = useCallback((event: ThreeEvent<PointerEvent>) => {
        // avoid handlers firing
        event.stopPropagation()
        setIsHovered(false)
    }, [])


    /**
     * Gizmo group matrix
     */
    const matrix = useMemo(() => {
        const dir1N = direction1.clone().normalize()
        const dir2N = direction2.clone().normalize()
        return new Matrix4().makeBasis(dir1N, dir2N, dir1N.clone().cross(dir2N))
    }, [direction1, direction2])

    const r = scale * 0.65

    /**
     * Calculate gizmo arc shape
     */
    const arc = useMemo(() => {
        const segments = 32
        const points: Vector3[] = []
        for (let j = 0; j <= segments; j++) {
            const angle = (j * (Math.PI / 2)) / segments
            points.push(new Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0))
        }
        return points
    }, [r])

    // colors of the axes and a hover color
    const axisColors = ['#ff2060', '#20df80', '#2080ff']
    const color = isHovered ? '#ffff40' : axisColors[axis]

    return (
        <group ref={gizmoGroup}
               onPointerDown={onPointerDown}
               onPointerMove={onPointerMove}
               onPointerUp={onPointerUp}
               onPointerOut={onPointerOut}
               matrix={matrix}
               matrixAutoUpdate={false}>

            {/** the label showing the rotation value */}
            <Html position={[r, r, 0]}>
                <div
                    style={{
                        display: 'none',
                        fontFamily: 'monospace',
                        background: '#F84823',
                        color: 'white',
                        padding: '6px 8px',
                        borderRadius: 7,
                        whiteSpace: 'nowrap'
                    }}
                    ref={rotationLabel}
                />
            </Html>

            {/* The invisible mesh being raycast */}
            <Line points={arc} lineWidth={8} visible={false} userData={userData}/>

            {/* The visible mesh */}
            <Line
                transparent
                raycast={() => null}
                points={arc}
                lineWidth={2}
                color={color}
                polygonOffset
                polygonOffsetFactor={-10}
            />

        </group>
    )
}

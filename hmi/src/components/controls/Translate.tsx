import React, {useContext, useCallback, useMemo, useRef, useState, FC} from 'react'
import {ThreeEvent, useThree} from '@react-three/fiber'
import {Line, Html} from '@react-three/drei'
import {context} from './context'
import {Vector3, Matrix4, Group, Quaternion} from 'three'

const vec1 = new Vector3()
const vec2 = new Vector3()

export const calculateOffset = (clickPoint: Vector3, normal: Vector3, rayStart: Vector3, rayDir: Vector3) => {

    const e1 = normal.dot(normal)
    const e2 = normal.dot(clickPoint) - normal.dot(rayStart)
    const e3 = normal.dot(rayDir)

    if (e3 === 0) return -e2 / e1

    vec1.copy(rayDir)
        .multiplyScalar(e1 / e3)
        .sub(normal)

    vec2.copy(rayDir)
        .multiplyScalar(e2 / e3)
        .add(rayStart)
        .sub(clickPoint)

    return -vec1.dot(vec2) / vec1.dot(vec1)
}

const upV = new Vector3(0, 1, 0)
const offsetMatrix = new Matrix4()

export const Translate: FC<{ direction: Vector3; axis: 0 | 1 | 2 }> = ({direction, axis}) => {

    const {
        translation,
        translationLimits,
        annotationsClass,
        scale,
        displayValues,
        onDragStart,
        onDrag,
        onDragEnd,
        userData
    } = useContext(context)

    // @ts-expect-error new in @react-three/fiber@7.0.5
    const camControls = useThree((state) => state.controls) as { enabled: boolean }
    const divRef = useRef<HTMLDivElement>(null!)
    const objRef = useRef<Group>(null!)
    const clickInfo = useRef<{ clickPoint: Vector3; dir: Vector3 } | null>(null)
    const offset0 = useRef<number>(0)
    const [isHovered, setIsHovered] = useState(false)

    const onPointerDown = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            if (displayValues) {
                divRef.current.innerText = `${translation.current[axis].toFixed(2)}`
                divRef.current.style.display = 'block'
            }
            e.stopPropagation()
            const rotation = new Matrix4().extractRotation(objRef.current.matrixWorld)
            const clickPoint = e.point.clone()
            const origin = new Vector3().setFromMatrixPosition(objRef.current.matrixWorld)
            const dir = direction.clone().applyMatrix4(rotation).normalize()
            clickInfo.current = {clickPoint, dir}
            offset0.current = translation.current[axis]
            onDragStart({component: 'Arrow', axis, origin, directions: [dir]})
            camControls && (camControls.enabled = false)
            // @ts-ignore - setPointerCapture is not in the type definition
            e.target.setPointerCapture(e.pointerId)
        },
        [direction, camControls, onDragStart, translation, axis, displayValues]
    )

    const onPointerMove = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation()
            if (!isHovered) setIsHovered(true)
            if (clickInfo.current) {
                const {clickPoint, dir} = clickInfo.current
                const [min, max] = translationLimits?.[axis] || [undefined, undefined]
                let offset = calculateOffset(clickPoint, dir, e.ray.origin, e.ray.direction)
                if (min !== undefined) offset = Math.max(offset, min - offset0.current)
                if (max !== undefined) offset = Math.min(offset, max - offset0.current)
                translation.current[axis] = offset0.current + offset
                if (displayValues) divRef.current.innerText = `${translation.current[axis].toFixed(2)}`
                offsetMatrix.makeTranslation(dir.x * offset, dir.y * offset, dir.z * offset)
                onDrag(offsetMatrix)
            }
        },
        [onDrag, isHovered, translation, translationLimits, axis, displayValues]
    )

    const onPointerUp = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            if (displayValues) divRef.current.style.display = 'none'
            e.stopPropagation()
            clickInfo.current = null
            onDragEnd()
            camControls && (camControls.enabled = true)
            // @ts-ignore - releasePointerCapture & PointerEvent#pointerId is not in the type definition
            e.target.releasePointerCapture(e.pointerId)
        },
        [camControls, onDragEnd, displayValues]
    )

    const onPointerOut = useCallback((e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        setIsHovered(false)
    }, [])

    const {cylinderLength, coneWidth, coneLength, matrixL} = useMemo(() => {
        const coneWidth = scale / 20
        const coneLength = scale / 5
        const cylinderLength = scale - coneLength
        const quaternion = new Quaternion().setFromUnitVectors(upV, direction.clone().normalize())
        const matrixL = new Matrix4().makeRotationFromQuaternion(quaternion)
        return {cylinderLength, coneWidth, coneLength, matrixL}
    }, [direction, scale])

    const axisColors = ['#ff2060', '#20df80', '#2080ff']
    const color_ = isHovered ? '#ffff40' : axisColors[axis]

    return (
        <group ref={objRef}>
            <group
                matrix={matrixL}
                matrixAutoUpdate={false}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerOut={onPointerOut}>
                <Html position={[0, -coneLength, 0]}>
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
                        className={annotationsClass}
                        ref={divRef}
                    />
                </Html>
                {/* The invisible mesh being raycast */}
                <mesh visible={false} position={[0, (cylinderLength + coneLength) / 2.0, 0]} userData={userData}>
                    <cylinderGeometry args={[coneWidth * 1.4, coneWidth * 1.4, cylinderLength + coneLength, 8, 1]}/>
                </mesh>
                {/* The visible mesh */}
                <Line
                    transparent
                    raycast={() => null}
                    points={[0, 0, 0, 0, cylinderLength, 0] as any}
                    lineWidth={2}
                    color={color_ as any}
                    polygonOffset
                    renderOrder={1}
                    polygonOffsetFactor={-10}/>
                <mesh raycast={() => null} position={[0, cylinderLength + coneLength / 2.0, 0]} renderOrder={500}>
                    <coneGeometry args={[coneWidth, coneLength, 24, 1]}/>
                    <meshBasicMaterial transparent={true} color={color_}
                                       polygonOffset
                                       polygonOffsetFactor={-10}/>
                </mesh>
            </group>
        </group>
    )
}

/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import React, {useEffect, useMemo, useImperativeHandle, useRef, forwardRef, MutableRefObject, ReactNode} from 'react'
import {useThree} from '@react-three/fiber'
import {Translate} from './Translate'
import {Rotate} from './Rotate'
import {context, OnDragStartProps, resolveObject} from './context'
import {Vector3, Matrix4, Box3, Object3D, Group, Quaternion} from "three";

const mL0 = new Matrix4()
const mW0 = new Matrix4()
const mP = new Matrix4()
const mPInv = new Matrix4()
const mW = new Matrix4()
const mL = new Matrix4()
const mL0Inv = new Matrix4()
const mdL = new Matrix4()

const bb = new Box3()
const bbObj = new Box3()
const vCenter = new Vector3()
const vSize = new Vector3()
const vAnchorOffset = new Vector3()
const vPosition = new Vector3()

type ControlsProps = {
    /** Scale of the gizmo, 1 */
    scale?: number
    /** Starting rotation */
    rotation?: [number, number, number]
    /** Attached mode, requires a ref to the THREE.Object3D to be transformed */
    object?: Object3D | MutableRefObject<Object3D>
    /** Starting matrix */
    matrix?: Matrix4
    /** BBAnchor, each axis can be between -1/0/+1 */
    anchor?: [number, number, number]
    /** If autoTransform is true, automatically apply the local transform on drag, true */
    autoTransform?: boolean
    /** Allows you to switch individual axes off */
    activeAxes?: [boolean, boolean, boolean]
    disableAxes?: boolean
    disableRotations?: boolean

    /** Limits */
    translationLimits?: [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]
    rotationLimits?: [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]

    /** CSS Classname applied to the HTML annotations */
    annotationsClass?: string
    /** Drag start event */
    onDragStart?: (props: OnDragStartProps) => void
    /** Drag event */
    onDrag?: (local: Matrix4, deltaL: Matrix4, world: Matrix4, deltaW: Matrix4) => void
    /** Drag end event */
    onDragEnd?: () => void
    displayValues?: boolean
    userData?: { [key: string]: any }
    children?: ReactNode
}

export const Controls = forwardRef<Group, ControlsProps>(
    (
        {
            object,
            matrix,
            onDragStart,
            onDrag,
            onDragEnd,
            autoTransform = true,
            anchor,
            disableAxes = false,
            disableRotations = false,
            activeAxes = [true, true, true],
            rotation = [0, 0, 0],
            scale = 1,
            translationLimits,
            rotationLimits,
            displayValues = true,
            annotationsClass,
            userData,
            children
        },
        fRef
    ) => {

        const invalidate = useThree((state) => state.invalidate)
        const parentRef = useRef<Group>(null!)
        const ref = useRef<Group>(null!)
        const gizmoRef = useRef<Group>(null!)
        const childrenRef = useRef<Group>(null!)
        const translation = useRef<[number, number, number]>([0, 0, 0])

        useEffect(() => {

            if (object) {

                const target = resolveObject(object)

                if (target) {

                    // An object has been attached
                    const pivot = ref.current
                    const doesUpdate = target.matrixAutoUpdate
                    target.updateWorldMatrix(true, true)
                    target.matrixAutoUpdate = false
                    pivot.matrix = target.matrix.clone()
                    pivot.children[0].visible = true
                    return () => {
                        if (doesUpdate) {
                            target.matrixAutoUpdate = true
                            target.matrix.decompose(target.position, target.quaternion, target.scale)
                        }
                    }
                }
            }

            if (anchor) {

                const target = resolveObject(object, childrenRef.current)

                if (target) {
                    target.updateWorldMatrix(true, true)
                    mPInv.copy(target.matrixWorld).invert()
                    bb.makeEmpty()
                    target.traverse((obj: any) => {
                        if (!obj.geometry) return
                        if (!obj.geometry.boundingBox) obj.geometry.computeBoundingBox()
                        mL.copy(obj.matrixWorld).premultiply(mPInv)
                        bbObj.copy(obj.geometry.boundingBox)
                        bbObj.applyMatrix4(mL)
                        bb.union(bbObj)
                    })
                    vCenter.copy(bb.max).add(bb.min).multiplyScalar(0.5)
                    vSize.copy(bb.max).sub(bb.min).multiplyScalar(0.5)
                    vAnchorOffset
                        .copy(vSize)
                        .multiply(new Vector3(...anchor))
                        .add(vCenter)
                    vPosition.set(0, 0, 0).add(vAnchorOffset)
                    gizmoRef.current.position.copy(vPosition)
                    invalidate()
                }
            }

        }, [object, anchor, invalidate])

        const config = useMemo(() => ({

                onDragStart: (props: OnDragStartProps) => {

                    mL0.copy(ref.current.matrix)
                    mW0.copy(ref.current.matrixWorld)

                    console.info('mL0', mL0)
                    console.info('mW0', mW0)

                    onDragStart && onDragStart(props)
                    invalidate()
                },

                onDrag: (mdW: Matrix4) => {

                    // Local, Local Delta, World and World Delta
                    console.info(mL, mdL, mW, mdW)

                    /**
                     * What happens when we use the gizmo
                     * */

                        // we receive matrix4 data, we decompose this data so we
                        // can see what translation, rotation or scaling is applied
                    const translation = new Vector3(),
                        rotation = new Quaternion(),
                        scale = new Vector3();

                    mdW.decompose(translation, rotation, scale)
                    mP.copy(parentRef.current.matrixWorld)
                    mPInv.copy(mP).invert()

                    // After applying the delta
                    mW.copy(mW0).premultiply(mdW)
                    mL.copy(mW).premultiply(mPInv)
                    mL0Inv.copy(mL0).invert()
                    mdL.copy(mL).multiply(mL0Inv)

                    if (autoTransform) {
                        console.info('autoTransform', autoTransform)
                        ref.current.matrix.copy(mL)
                    }

                    // Update the attached object, if there is any
                    const target = resolveObject(object)

                    if (target) {
                        console.info('target', target)
                        target.matrix.copy(mL)
                    }

                    if (onDrag) {
                        onDrag(mL, mdL, mW, mdW)
                    }
                    invalidate()
                },

                onDragEnd: () => {
                    if (onDragEnd) onDragEnd()
                    invalidate()
                },

                translation,
                translationLimits,
                rotationLimits,
                scale,
                displayValues,
                userData,
                annotationsClass,
                object
            }),
            [
                object,
                onDragStart,
                onDrag,
                onDragEnd,
                translation,
                invalidate,
                translationLimits,
                rotationLimits,
                scale,
                displayValues,
                userData,
                autoTransform,
                annotationsClass
            ]
        )

        useImperativeHandle(fRef, () => ref.current, [])

        const xDir = new Vector3(1, 0, 0)
        const yDir = new Vector3(0, 1, 0)
        const zDir = new Vector3(0, 0, 1)

        return (
            <context.Provider value={config}>

                <group ref={parentRef}>

                    <group ref={ref} matrix={matrix} matrixAutoUpdate={false}>

                        <group ref={gizmoRef} position={[0, 0, 0]} rotation={rotation}>

                            {!disableAxes && activeAxes[0] && <Translate axis={0} direction={xDir}/>}
                            {!disableAxes && activeAxes[1] && <Translate axis={1} direction={yDir}/>}
                            {!disableAxes && activeAxes[2] && <Translate axis={2} direction={zDir}/>}

                            {!disableRotations && activeAxes[0] && activeAxes[1] &&
                              <Rotate axis={2} dir1={xDir} dir2={yDir}/>}
                            {!disableRotations && activeAxes[0] && activeAxes[2] &&
                              <Rotate axis={1} dir1={zDir} dir2={xDir}/>}
                            {!disableRotations && activeAxes[2] && activeAxes[1] &&
                              <Rotate axis={0} dir1={yDir} dir2={zDir}/>}

                        </group>
                        <group ref={childrenRef}>{children}</group>

                    </group>
                </group>
            </context.Provider>
        )
    }
)

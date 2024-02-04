/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import React, {useEffect, useRef} from 'react'
import {useThree} from '@react-three/fiber'
import {Translate} from './Translate'
import {Rotate} from './Rotate'
import {context} from './context'
import {Vector3, Matrix4, Box3, Group} from 'three'
import {Monumental} from '@types'

// local matrices
const localMatrix0 = new Matrix4()
const localMatrix = new Matrix4()
const localMatrix0Inv = new Matrix4()
const localDeltaMatrix = new Matrix4()

// world matrices
const worldMatrix0 = new Matrix4()
const worldMatrix = new Matrix4()

// parent matrices
const parentMatrix = new Matrix4()
const parentMatrixInv = new Matrix4()

/**
 * The Gizmo component accepts a configuration and the children (meshes) to control.
 *
 * Both Translate as Rotate is handled. The type of operation is depending on the
 * configuration of activeAxis, disableTranslation and disableRotation. Mixing operations
 * is supported. e.g. a gizmo to rotate and translate with.
 */
export const Gizmo = ((
        {
            scale = 1,
            matrix,
            anchor,
            activeAxes = [true, true, true],
            disableTranslation = false,
            disableRotation = false,
            translationLimits,
            rotationLimits,
            userData,
            children
        }: Monumental.GizmoProperties) => {

        // A handle to the underlying canvas invalidation method.
        // [useThree] Accesses R3F's internal state (WebGL), containing renderer, canvas, scene, etc.
        // [state.invalidate] flags the canvas for render, but doesn't render in itself
        const invalidate = useThree((state) => state.invalidate)

        // grouping the gizmo and objects
        const parentGroup = useRef<Group>(null!)
        const matrixGroup = useRef<Group>(null!)
        const gizmoGroup = useRef<Group>(null!)
        const childrenGroup = useRef<Group>(null!)

        useEffect(() => {

            // if an anchor is given we adjust the gizmo position
            if (anchor) {

                // the group under control of this gizmo
                const targetGroup = childrenGroup.current

                // calculate a bounding box to determine gizmo location
                const boundingBox = new Box3()

                if (targetGroup) {

                    // Update the global transform of the object group
                    targetGroup.updateWorldMatrix(true, true)

                    // Invert the matrix
                    parentMatrixInv.copy(targetGroup.matrixWorld).invert()

                    // Clear the bounding box for the new calculation
                    boundingBox.makeEmpty()

                    // traverse over the objects in the targetGroup
                    targetGroup.traverse((object: any) => {

                        // calculate the bounding box for objects with geometry
                        if (!object.geometry) return
                        if (!object.geometry.boundingBox) object.geometry.computeBoundingBox()

                        localMatrix.copy(object.matrixWorld).premultiply(parentMatrixInv)

                        // get the bounding box of this object
                        const objectBoundingBox = new Box3()
                        objectBoundingBox.copy(object.geometry.boundingBox)
                        objectBoundingBox.applyMatrix4(localMatrix)

                        // Computes the union of this boundingBox and objectBoundingBox, setting the upper bound of
                        // boundingBox to the greater of the two boxes' upper bounds and the lower bound of boundingBox
                        // to the lesser of the two boxes' lower bounds.
                        boundingBox.union(objectBoundingBox)
                    })

                    // calculate vectors
                    const vectorCenter = new Vector3()
                    const vectorSize = new Vector3()

                    vectorCenter.copy(boundingBox.max).add(boundingBox.min).multiplyScalar(0.5)
                    vectorSize.copy(boundingBox.max).sub(boundingBox.min).multiplyScalar(0.5)

                    const anchorOffsetVector = new Vector3()
                    const positionVector = new Vector3()

                    anchorOffsetVector
                        .copy(vectorSize)
                        .multiply(new Vector3(...anchor)) // given anchor
                        .add(vectorCenter)

                    positionVector.set(0, 0, 0).add(anchorOffsetVector)

                    // copy the position to the gizmo group to apply gizmo anchor
                    gizmoGroup.current.position.copy(positionVector)

                    invalidate()
                }
            }

        }, [anchor, invalidate])

        /**
         * The Gizmo configuration contains scale, limits and userdata for the gizmo
         * and holds the implementation for both Translate and Rotate matrix updates
         * based on the gizmo mouse pointer events.
         *
         * This configuration is stored in Context, see the context.Provider below
         *
         * With useMemo we only recalculate when the dependencies have changed since the last render, more specific in
         * this case when any of the onDragStart, onDrag, onDragEnd dependencies change
         */
        const configuration = {

            /**
             * onDragStart is invoked by the group onPointerDown with the information on
             * what operation (Translate/Rotate) which axis, origin and direction array
             */
            onDragStart: () => {

                // @todo learn about matrix operations
                localMatrix0.copy(matrixGroup.current.matrix)
                worldMatrix0.copy(matrixGroup.current.matrixWorld)
                invalidate()
            },

            /**
             * onDrag is invoked by the group onPointerMove method
             * which calculated the delta matrix
             */
            onDrag: (worldDeltaMatrix: Matrix4) => {

                // @todo learn about matrix operations
                parentMatrix.copy(parentGroup.current.matrixWorld)
                parentMatrixInv.copy(parentMatrix).invert()

                // After applying the delta
                worldMatrix.copy(worldMatrix0).premultiply(worldDeltaMatrix)
                localMatrix.copy(worldMatrix).premultiply(parentMatrixInv)
                localMatrix0Inv.copy(localMatrix0).invert()
                localDeltaMatrix.copy(localMatrix).multiply(localMatrix0Inv)

                // @todo point of interest, the update of matrix group with change
                matrixGroup.current.matrix.copy(localMatrix)

                invalidate()
            },

            /**
             * Mouse/pointer up
             */
            onDragEnd: () => {
                invalidate()
            },

            translationLimits,
            rotationLimits,
            scale,
            userData
        }

        // direction vectors
        const x = new Vector3(1, 0, 0)
        const y = new Vector3(0, 1, 0)
        const z = new Vector3(0, 0, 1)

        return (
            <context.Provider value={configuration}>

                <group ref={parentGroup}>

                    <group ref={matrixGroup} matrix={matrix} matrixAutoUpdate={false}>

                        <group ref={gizmoGroup}>

                            {
                                !disableTranslation &&
                              <>
                                  {activeAxes[0] && <Translate axis={0} direction={x}/>}
                                  {activeAxes[1] && <Translate axis={1} direction={y}/>}
                                  {activeAxes[2] && <Translate axis={2} direction={z}/>}
                              </>
                            }

                            {
                                !disableRotation &&
                              <>
                                  {activeAxes[0] && activeAxes[1] && <Rotate axis={2} dir1={x} dir2={y}/>}
                                  {activeAxes[0] && activeAxes[2] && <Rotate axis={1} dir1={z} dir2={x}/>}
                                  {activeAxes[2] && activeAxes[1] && <Rotate axis={0} dir1={y} dir2={z}/>}
                              </>
                            }

                        </group>

                        <group ref={childrenGroup}>{children}</group>

                    </group>

                </group>
            </context.Provider>
        )
    }
)

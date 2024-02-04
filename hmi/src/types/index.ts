/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import {ReactNode} from 'react'
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader'
import {Vector3, Mesh, MeshStandardMaterial, Matrix4} from 'three'

/**
 * Types for the project
 *
 * author Martijn Benjamin
 */
export namespace Monumental {

    /**
     * The Node names we expect on a Crane
     */
    export enum CraneNodeName {
        mainColumn = 'main_column',
        upperArm = 'upper_arm',
        elbow = 'elbow',
        lowerArm = 'lower_arm',
        wrist = 'wrist',
        wristExtension = 'wrist_extension',
        hand = 'hand',
        gripper = 'gripper'
    }

    /**
     * Crane Nodes expected in Crane data
     */
    export interface CraneNodes {
        nodes: {
            [CraneNodeName.mainColumn]: CraneNode,
            [CraneNodeName.upperArm]: CraneNode,
            [CraneNodeName.elbow]: CraneNode,
            [CraneNodeName.lowerArm]: CraneNode,
            [CraneNodeName.wrist]: CraneNode,
            [CraneNodeName.wristExtension]: CraneNode,
            [CraneNodeName.hand]: CraneNode,
            [CraneNodeName.gripper]: CraneNode
        }
    }

    /**
     * Crane Node data
     */
    export interface CraneNode {
        position: Vector3,
        scale: Vector3
    }

    /**
     * Since useGLTF does not supply the nodes and materials types we define them ourselves.
     * Seems like missing typing in drei.
     */
    export type DreiGLTF = GLTF & {
        nodes: Record<string, Mesh>
        materials: Record<string, MeshStandardMaterial>
    }

    /**
     * With mesh and crane data we construct each Crane node
     */
    export type MeshProperties = {
        node: Mesh
        data: CraneNode
    }

    /**
     * Properties we receive for a Robot Gizmo
     */
    export type GizmoProperties = {

        // gizmo scale
        scale?: number

        // start matrix
        matrix?: Matrix4

        // gizmo anchor
        anchor?: [number, number, number]

        // axis to operate on
        activeAxes?: [boolean, boolean, boolean]

        // switch off all rotation or translation
        disableTranslation?: boolean
        disableRotation?: boolean

        // translation limits array: x:[start,end] y[start,end] z[start,end]
        translationLimits?: [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]

        // rotation limits array: x:[start,end] y[start,end] z[start,end]
        rotationLimits?: [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]

        // custom data
        userData?: { [key: string]: any }
        children?: ReactNode
    }

    /**
     * The state we hold for a Gizmo
     */
    export type GizmoState = {
        onDragStart: (props: GizmoStart) => void
        onDrag: (local: Matrix4, deltaLocal: Matrix4, world: Matrix4, deltaWorld: Matrix4) => void
        onDragEnd: () => void
        translationLimits?: [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]
        rotationLimits?: [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]
        scale: number
        userData?: { [key: string]: any }
    }

    /**
     * The start event when Gizmo is invoked
     */
    export type GizmoStart = {
        action: 'Translate' | 'Rotate'
        axis: 0 | 1 | 2
        origin: Vector3
        directions: Vector3[]
    }
}

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
     *
     */
    export enum CraneNode {
        mainColumn = 'main_column',
        upperArm = 'upper_arm',
        elbow = 'elbow',
        lowerArm = 'lower_arm',
        wrist = 'wrist',
        wristExtension = 'wrist_extension',
        hand = 'hand',
        gripper = 'gripper'
    }

    export interface CraneData {
        nodes: {
            [CraneNode.mainColumn]: { position: Vector3 },
            [CraneNode.upperArm]: { position: Vector3 },
            [CraneNode.elbow]: { position: Vector3 },
            [CraneNode.lowerArm]: { position: Vector3 },
            [CraneNode.wrist]: { position: Vector3 },
            [CraneNode.wristExtension]: { position: Vector3 },
            [CraneNode.hand]: { position: Vector3 },
            [CraneNode.gripper]: { position: Vector3 }
        }
    }

    export type DreiGLTF = GLTF & {
        nodes: Record<string, Mesh>
        materials: Record<string, MeshStandardMaterial>
    }

    /**
     *
     */
    export type RobotControl = {

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

        // drag events
        onDragStart?: (props: ControlStart) => void
        onDrag?: (local: Matrix4, deltaLocal: Matrix4, world: Matrix4, deltaWorld: Matrix4) => void
        onDragEnd?: () => void

        // custom data
        userData?: { [key: string]: any }
        children?: ReactNode
    }

    /**
     *
     */
    export type ControlStart = {
        action: 'Translate' | 'Rotate'
        axis: 0 | 1 | 2
        origin: Vector3
        directions: Vector3[]
    }

    /**
     *
     */
    export type ControlContext = {
        onDragStart: (props: ControlStart) => void
        onDrag: (mdW: Matrix4) => void
        onDragEnd: () => void
        translation: { current: [number, number, number] }
        translationLimits?: [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]
        rotationLimits?: [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]
        scale: number
        userData?: { [key: string]: any }
    }
}

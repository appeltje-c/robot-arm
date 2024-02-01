/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */

import {Vector3, Mesh, MeshStandardMaterial} from "three";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";

/**
 * Types for the project
 *
 * author Martijn Benjamin
 */
export namespace Monumental {

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
        [CraneNode.mainColumn]: { position: Vector3 },
        [CraneNode.upperArm]: { position: Vector3 },
        [CraneNode.elbow]: { position: Vector3 },
        [CraneNode.lowerArm]: { position: Vector3 },
        [CraneNode.wrist]: { position: Vector3 },
        [CraneNode.wristExtension]: { position: Vector3 },
        [CraneNode.hand]: { position: Vector3 },
        [CraneNode.gripper]: { position: Vector3 }
    }

    export type DreiGLTF = GLTF & {
        nodes: Record<string, Mesh>;
        materials: Record<string, MeshStandardMaterial>;
    };

}

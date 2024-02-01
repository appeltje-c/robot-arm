/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
export namespace Monumental {

    export interface Robot {
        type: RobotType,
        nodes: Array<NodeType>
    }

    export enum RobotType {
        Crane = 'Crane'
    }

    export interface NodeType {
        name: NodeName,
        position: Position,
        rotation: Rotation,
        scale: Scale
    }

    interface Position{

    }

    interface Rotation {
        isEuler: boolean,
        order: RotationOrder,
        x: number,
        y: number,
        z: number
    }

    export interface Scale {
        x: number,
        y: number,
        z: number
    }

    export enum RotationOrder {
        XYZ = 'XYZ'
    }

    export enum NodeName {
        mainColumn = 'main_column',
        upperArm = 'upper_arm',
        elbow = 'elbow',
        lowerArm = 'lower_arm'
    }

    export interface RobotState {

    }
}

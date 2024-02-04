/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import mongoose from "mongoose"

enum CraneNodeName {
    mainColumn = 'main_column',
    upperArm = 'upper_arm',
    elbow = 'elbow',
    lowerArm = 'lower_arm',
    wrist = 'wrist',
    wristExtension = 'wrist_extension',
    hand = 'hand',
    gripper = 'gripper'
}

export interface CraneNode {
    position: [number, number, number],
    scale: [number, number, number]
}

export type RobotStateDocument = mongoose.Document & {
    nodes: {
        [CraneNodeName.mainColumn]: CraneNode
        [CraneNodeName.upperArm]: CraneNode
        [CraneNodeName.elbow]: CraneNode
        [CraneNodeName.lowerArm]: CraneNode
        [CraneNodeName.wrist]: CraneNode
        [CraneNodeName.wristExtension]: CraneNode
        [CraneNodeName.hand]: CraneNode
        [CraneNodeName.gripper]: CraneNode
    }
}

const robotStateSchema = new mongoose.Schema<RobotStateDocument>(
    {
        nodes: {
            [CraneNodeName.mainColumn]: {
                position: Array<number>,
                scale: Array<number>
            },
            [CraneNodeName.upperArm]: {
                position: Array<number>,
                scale: Array<number>
            },
            [CraneNodeName.elbow]: {
                position: Array<number>,
                scale: Array<number>
            },
            [CraneNodeName.lowerArm]: {
                position: Array<number>,
                scale: Array<number>
            },
            [CraneNodeName.wrist]: {
                position: Array<number>,
                scale: Array<number>
            },
            [CraneNodeName.wristExtension]: {
                position: Array<number>,
                scale: Array<number>
            },
            [CraneNodeName.hand]: {
                position: Array<number>,
                scale: Array<number>
            },
            [CraneNodeName.gripper]: {
                position: Array<number>,
                scale: Array<number>
            }
        }
    },
    {
        timestamps: true
    }
)

export const RobotState = mongoose.model<RobotStateDocument>("RobotState", robotStateSchema)

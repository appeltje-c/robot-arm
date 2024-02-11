/*
 * Copyright (C) 2024
 * Martijn Benjamin (https://github.com/appeltje-c)
 *
 * -----
 * "Robotic Arm Study"
 * -----
 */
import mongoose from "mongoose"

enum NodeName {
    mainColumn = 'main_column',
    upperArm = 'upper_arm',
    elbow = 'elbow',
    lowerArm = 'lower_arm',
    wrist = 'wrist',
    wristExtension = 'wrist_extension',
    hand = 'hand',
    gripper = 'gripper'
}

export interface RobotNode {
    position: [number, number, number],
    scale: [number, number, number]
}

export type RobotStateDocument = mongoose.Document & {
    nodes: {
        [NodeName.mainColumn]: RobotNode
        [NodeName.upperArm]: RobotNode
        [NodeName.elbow]: RobotNode
        [NodeName.lowerArm]: RobotNode
        [NodeName.wrist]: RobotNode
        [NodeName.wristExtension]: RobotNode
        [NodeName.hand]: RobotNode
        [NodeName.gripper]: RobotNode
    }
}

const robotStateSchema = new mongoose.Schema<RobotStateDocument>(
    {
        nodes: {
            [NodeName.mainColumn]: {
                position: Array<number>,
                scale: Array<number>
            },
            [NodeName.upperArm]: {
                position: Array<number>,
                scale: Array<number>
            },
            [NodeName.elbow]: {
                position: Array<number>,
                scale: Array<number>
            },
            [NodeName.lowerArm]: {
                position: Array<number>,
                scale: Array<number>
            },
            [NodeName.wrist]: {
                position: Array<number>,
                scale: Array<number>
            },
            [NodeName.wristExtension]: {
                position: Array<number>,
                scale: Array<number>
            },
            [NodeName.hand]: {
                position: Array<number>,
                scale: Array<number>
            },
            [NodeName.gripper]: {
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

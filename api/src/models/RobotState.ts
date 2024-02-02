/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import mongoose from "mongoose"

enum RobotNode {
    mainColumn = 'main_column',
    upperArm = 'upper_arm',
    elbow = 'elbow',
    lowerArm = 'lower_arm',
    wrist = 'wrist',
    wristExtension = 'wrist_extension',
    hand = 'hand',
    gripper = 'gripper'
}

export type RobotStateDocument = mongoose.Document & {
    nodes: {
        [RobotNode.mainColumn]: { position: number[] }
        [RobotNode.upperArm]: { position: number[] }
        [RobotNode.elbow]: { position: number[] }
        [RobotNode.lowerArm]: { position: number[] }
        [RobotNode.wrist]: { position: number[] }
        [RobotNode.wristExtension]: { position: number[] }
        [RobotNode.hand]: { position: number[] }
        [RobotNode.gripper]: { position: number[] }
    }
}

const robotStateSchema = new mongoose.Schema<RobotStateDocument>(
    {
        nodes: {
            'main_column': {
                position: Array<number>
            },
            'upper_arm': {
                position: Array<number>
            },
            'elbow': {
                position: Array<number>
            },
            'lower_arm': {
                position: Array<number>
            },
            'wrist': {
                position: Array<number>
            },
            'wrist_extension': {
                position: Array<number>
            },
            'hand': {
                position: Array<number>
            },
            'gripper': {
                position: Array<number>
            }
        }
    },
    {
        timestamps: true
    }
)

export const RobotState = mongoose.model<RobotStateDocument>("RobotState", robotStateSchema)

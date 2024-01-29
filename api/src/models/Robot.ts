import mongoose from "mongoose"

export type RobotDocument = mongoose.Document & {
    name: string
    type: string
    actuators: string
}

const robotSchema = new mongoose.Schema<RobotDocument>(
    {
        name: {
            type: String,
            unique: true
        },
        type: {
            type: String,
            enum: ['crane', 'truck']
        },
        actuators: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export const Robot = mongoose.model<RobotDocument>("Robot", robotSchema)

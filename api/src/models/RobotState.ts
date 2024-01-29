import mongoose from "mongoose"

export type RobotStateDocument = mongoose.Document & {
    coords: string
}

const robotStateSchema = new mongoose.Schema<RobotStateDocument>(
    {
        coords: {
            type: String,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

export const RobotState = mongoose.model<RobotStateDocument>("RobotState", robotStateSchema)

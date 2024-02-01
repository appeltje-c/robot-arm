/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import {Socket} from 'socket.io/dist/socket'
import {RobotState} from '../models/RobotState'

/**
 * Retrieve the current state of the Robot
 *
 * @param socket Socket to respond on
 */
const getState = async (socket: Socket) => {

    const state = await RobotState.find({})

    const robotState = {
        'main_column': {
            position: [0, 1.462, 0]
        },
        'upper_arm': {
            position: [2.335, 0, 0.094]
        },
        'elbow': {
            position: [2.6, 5.933, 0.074]
        },
        'lower_arm': {
            position: [4.39, -0.984, 0.094]
        },
        'wrist': {
            position: [4.701, 4.949, 0.101]
        },
        'wrist_extension': {
            position: [4.691, 4.611, 0.007]
        },
        'hand': {
            position: [5.368, 3.78, 0.049]
        },
        'gripper': {
            position: [5.805, 3.585, 0.006]
        }
    }

    socket.emit('state', robotState)
}

/**
 * Map the websocket events to controller methods
 *
 * @param socket Socket to respond to
 */
export default function (socket: Socket) {

    socket.on("state:get", () => getState(socket))
}

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
    socket.emit('state', {actuator: [8, 100, -20]})
}

/**
 * Map the websocket events to controller methods
 *
 * @param socket Socket to respond to
 */
export default function (socket: Socket) {

    socket.on("state:get", () => getState(socket))
}

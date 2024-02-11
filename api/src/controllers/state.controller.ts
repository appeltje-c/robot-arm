/*
 * Copyright (C) 2024
 * Martijn Benjamin (https://github.com/appeltje-c)
 *
 * -----
 * "Robotic Arm Study"
 * -----
 */
import {Socket} from 'socket.io/dist/socket'
import {RobotState} from '../models/RobotState'
import logger from '../config/logger'
import data from '../seed.json'

/**
 * Retrieve the current state of the Robot
 *
 * @param socket Socket to respond on
 */
const getState = async (socket: Socket) => {

    const state = await RobotState.findOne({})
    socket.emit('state', state)
}

/**
 * Adding some initial seed data at startup if collection is empty
 */
export const seed = async () => {

    const state = await RobotState.find({})

    if (state.length === 0) {
        logger.info('seeding')
        await RobotState.insertMany(data)
    } else {
        logger.info('not seeding')
    }
}

/**
 * Map the websocket events to controller methods
 *
 * @param socket Socket to respond to
 */
export default function (socket: Socket) {

    socket.on("state:get", () => getState(socket))
}

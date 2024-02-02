/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import 'dotenv/config'
import express from 'express'
import logger from './config/logger'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import stateController, {seed} from './controllers/state.controller'

const app = express()

// First ensure we get a mongo connection
mongoose.connect(process.env.MONGODB_URL, {}).then(() => {

    // seed if needed
    seed().then(() => {

        // Start Express server
        const server = app.listen(process.env.PORT, () => {
            logger.info(`App is running at http://localhost:${process.env.PORT}`)
        })

        // Setup websockets channel
        const io = new Server(server, {cors: {origin: '*'}})

        // 'Bind' the controllers on incoming socket connection
        io.on('connection', socket => {
            stateController(socket)
        })

    })

}).catch(err => {
    logger.error(`MongoDB connection error. Please make sure MongoDB is running. ${err}`)
    process.exit(1)
})

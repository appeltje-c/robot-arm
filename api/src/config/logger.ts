/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import winston from "winston"

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug"
        }),
        new winston.transports.File({filename: "debug.log", level: "debug"})
    ]
})

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level")
}

export default logger

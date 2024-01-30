/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import {Monumental} from '@types'

/**
 * Parses the JSON payload returned by a network request
 *
 * @param  {Response} response  A response from a network request
 * @return {JsonResponse}       The parsed JSON, status from the response
 */
function parseJSON(response: Response): Promise<Monumental.JsonResponse> {
    return new Promise((resolve) => response.json()
        .then((json) => resolve({
            status: response.status, ok: response.ok, json,
        })))
}

/**
 * Requests a path on the API, returning a promise
 *
 * @param  {string} path       The request path
 * @param  {object} [options]  The options to pass to "fetch"
 * @return {Promise}           The request promise
 */
export default function request(path: string, options: any): Promise<any> {

    if (options.body) {
        options['body'] = JSON.stringify(options.body)
    }

    return new Promise((resolve, reject) => {
            fetch('/v1' + path, options).then(response => {
                return parseJSON(response)
            }).then(response => {
                if (response.ok) {
                    return resolve(response.json)
                }
                return reject(response.json)
            }).catch(error => {
                    reject(error.message)
                }
            )
        }
    )
}

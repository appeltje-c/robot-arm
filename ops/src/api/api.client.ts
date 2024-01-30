/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import request from './request'
import {Monumental} from "@types";

export function getState(): Promise<Array<Monumental.JsonResponse>> {
    return request('/state', {
        method: 'GET'
    })
}

/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import {createContext} from 'react'
import {Monumental} from '@types'

export const context = createContext<Monumental.GizmoState>(null!)

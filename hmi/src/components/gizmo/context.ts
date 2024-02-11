/*
 * Copyright (C) 2024
 * Martijn Benjamin (https://github.com/appeltje-c)
 *
 * -----
 * "Robotic Arm Study"
 * -----
 */
import {createContext} from 'react'
import {Robot} from '@types'

export const context = createContext<Robot.GizmoState>(null!)

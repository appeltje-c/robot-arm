/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import {createContext, MutableRefObject} from 'react'
import {Vector3, Matrix4, Object3D} from 'three'

export type OnDragStartProps = {
    component: 'Arrow' | 'Slider' | 'Rotator' | 'Scale'
    axis: 0 | 1 | 2
    origin: Vector3
    directions: Vector3[]
}

export type ControlContext = {
    onDragStart: (props: OnDragStartProps) => void
    onDrag: (mdW: Matrix4) => void
    onDragEnd: () => void
    translation: { current: [number, number, number] }
    translationLimits?: [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]
    rotationLimits?: [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]
    scale: number
    displayValues: boolean
    userData?: { [key: string]: any }
    annotationsClass?: string
}

export const context = createContext<ControlContext>(null!)

const isRef = (object: any): object is MutableRefObject<Object3D> => object && object.current

export const resolveObject = (
    object?: Object3D | MutableRefObject<Object3D>,
    fallback?: Object3D | MutableRefObject<Object3D>
): any => (isRef(object) ? object.current : object ? object : fallback ? resolveObject(fallback) : undefined)

/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import React, {memo} from 'react'
import {AccumulativeShadows, RandomizedLight} from '@react-three/drei'

/**
 * Providing natural looking shadow/light
 */
export const Shadows = memo(() => (
    <AccumulativeShadows temporal frames={100} color="#9d4b4b" colorBlend={0.5} alphaTest={0.9} scale={20}>
        <RandomizedLight amount={8} radius={4} position={[5, 5, -10]}/>
    </AccumulativeShadows>
))

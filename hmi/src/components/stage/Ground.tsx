/*
 * Copyright (C) 2024
 * Martijn Benjamin (https://github.com/appeltje-c)
 *
 * -----
 * "Robotic Arm Study"
 * -----
 */
import React from 'react'
import {Grid} from '@react-three/drei'

/**
 * A drei Grid providing a plane for the model to be presented on
 *
 * @todo move properties to user/app configuration
 */
export const Ground = () => {

    return <Grid position={[0, -0.01, 0]}
                 args={[10.5, 10.5]}
                 cellSize={0.5}
                 cellThickness={0.5}
                 cellColor={'#6f6f6f'}
                 sectionSize={3}
                 sectionThickness={1}
                 sectionColor={'#9d4b4b'}
                 fadeDistance={30}
                 fadeStrength={1}
                 followCamera={false}
                 infiniteGrid={true}/>
}

/*
 * Copyright (C) 2024
 * Martijn Benjamin (https://github.com/appeltje-c)
 *
 * -----
 * "Robotic Arm Study"
 * -----
 */
import React from 'react'
import {Robot} from '@types'

/**
 * Defines a Mesh with material and location
 *
 * @param node The GLTF Mesh
 * @param data The node 3d data
 */
const Mesh = ({node, data}: Robot.MeshProperties) => {

    return (
        <mesh geometry={node.geometry}
              material={node.material}
              position={data.position}
              scale={data.scale}
        />
    )
}

export default Mesh

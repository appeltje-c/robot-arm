/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import React from 'react'
import {Gizmo} from '@components/gizmo'
import {useGLTF} from '@react-three/drei'
import {Monumental} from '@types'

interface CraneProps {
    data: Monumental.CraneData
}

/**
 * The Crane Component takes care of loading the crane model,
 * loads the meshes with initial state and configures the gizmos
 *
 * author Martijn Benjamin
 */
export const Crane = ({data}: CraneProps) => {

    // load the crane model
    // the nodes and materials are missing from the GLTF and extending does resolve, as unknown to avoid this
    const {nodes} = useGLTF('/crane.glb') as unknown as Monumental.DreiGLTF
    const CraneNode = Monumental.CraneNode

    return (
        // A group is almost identical to an object3D. Its purpose is to make working with groups of objects
        // syntactically clearer.
        <group>

            <Gizmo
                activeAxes={[true, false, true]}
                scale={5}
                userData={[CraneNode.mainColumn]}>

                <mesh geometry={nodes[CraneNode.mainColumn].geometry}
                      material={nodes[CraneNode.mainColumn].material}
                      position={data.nodes[CraneNode.mainColumn].position}/>

                <Gizmo activeAxes={[false, true, false]}
                       translationLimits={[undefined, [-1, 1.8], undefined]}
                       disableRotation
                       anchor={[-0.8, 0.5, 0]}
                       scale={1}
                       userData={[CraneNode.upperArm]}>

                    <mesh geometry={nodes[CraneNode.upperArm].geometry}
                          material={nodes[CraneNode.upperArm].material}
                          position={data.nodes[CraneNode.upperArm].position}
                          scale={[0.684, 1, 1]}/>

                    <Gizmo activeAxes={[true, false, true]}
                           rotationLimits={[undefined, [-2, 2], undefined]}
                           disableTranslation
                           anchor={[-0.889, 1, -0.4]}
                           scale={2}
                           userData={[CraneNode.elbow]}>

                        <mesh geometry={nodes[CraneNode.elbow].geometry}
                              material={nodes[CraneNode.elbow].material}
                              position={data.nodes[CraneNode.elbow].position}
                              scale={[0.345, 0.122, 0.345]}/>

                        <mesh geometry={nodes[CraneNode.lowerArm].geometry}
                              material={nodes[CraneNode.lowerArm].material}
                              position={data.nodes[CraneNode.lowerArm].position}
                              scale={[0.684, 1, 1]}/>

                        <Gizmo
                            activeAxes={[true, false, true]}
                            rotationLimits={[undefined, [-2, 2], undefined]}
                            disableTranslation
                            anchor={[-0.75, 1, -0.4]}
                            scale={2}
                            userData={[CraneNode.wrist]}>

                            <mesh geometry={nodes[CraneNode.wrist].geometry}
                                  material={nodes[CraneNode.wrist].material}
                                  position={data.nodes[CraneNode.wrist].position}
                                  scale={[0.345, 0.122, 0.345]}/>

                            <mesh geometry={nodes[CraneNode.wristExtension].geometry}
                                  material={nodes[CraneNode.wristExtension].material}
                                  position={data.nodes[CraneNode.wristExtension].position}
                                  scale={0.264}/>

                            <mesh geometry={nodes[CraneNode.hand].geometry}
                                  material={nodes[CraneNode.hand].material}
                                  position={data.nodes[CraneNode.hand].position}
                                  scale={[1, 0.068, 0.327]}/>

                            <Gizmo activeAxes={[true, false, false]}
                                   translationLimits={[[-0.5, 0.2], undefined, undefined]}
                                   anchor={[0, 0, 0]}
                                   scale={0.75}
                                   userData={[CraneNode.gripper]}>

                                <mesh geometry={nodes[CraneNode.gripper].geometry}
                                      material={nodes[CraneNode.gripper].material}
                                      position={data.nodes[CraneNode.gripper].position}
                                      scale={[-0.01, -0.132, -0.325]}/>

                            </Gizmo>
                        </Gizmo>
                    </Gizmo>
                </Gizmo>
            </Gizmo>

        </group>
    )
}

useGLTF.preload('/crane.glb')

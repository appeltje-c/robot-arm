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
import Mesh from "@components/mesh/Mesh";

interface CraneProps {
    data: Monumental.CraneNodes
}

/**
 * The Crane Component takes care of loading the crane model,
 * loads the meshes with initial state and configures the gizmos
 *
 * author Martijn Benjamin
 */
export const Crane = ({data}: CraneProps) => {

    // load the crane model
    // the nodes and materials are missing from the GLTF typing
    // and extending (DreiGLTF) does not resolve. Casting as unknown to avoid this
    // @todo create/vote github issue with Drei
    const {nodes} = useGLTF('/crane.glb') as unknown as Monumental.DreiGLTF
    const node = Monumental.CraneNodeName

    return (
        // A group is almost identical to an object3D. Its purpose is to make working with groups of objects
        // syntactically clearer.
        <group>

            {/* The rotating main column. Nesting is grouping the meshes and their gizmos together */}
            <Gizmo scale={5}
                   disableTranslation
                   activeAxes={[true, false, true]}
                   userData={[node.mainColumn]}>
                <Mesh node={nodes[node.mainColumn]} data={data.nodes[node.mainColumn]}/>

                {/* The upper arm mesh moving up and down with limits */}
                <Gizmo activeAxes={[false, true, false]}
                       translationLimits={[undefined, [-1, 1.8], undefined]}
                       disableRotation
                       anchor={[-0.8, 0.5, 0]}
                       scale={1}
                       userData={[node.upperArm]}>
                    <Mesh node={nodes[node.upperArm]} data={data.nodes[node.upperArm]}/>

                    {/** The rotating elbow and lower arm with 115º limit */}
                    <Gizmo activeAxes={[true, false, true]}
                           rotationLimits={[undefined, [-2, 2], undefined]}
                           disableTranslation
                           anchor={[-0.827, 1, -0.45]}
                           scale={2}
                           userData={[node.elbow]}>
                        <Mesh node={nodes[node.elbow]} data={data.nodes[node.elbow]}/>
                        <Mesh node={nodes[node.lowerArm]} data={data.nodes[node.lowerArm]}/>

                        {/** The rotating wrist, extension and hand with 115º limit */}
                        <Gizmo activeAxes={[true, false, true]}
                               rotationLimits={[undefined, [-2, 2], undefined]}
                               disableTranslation
                               anchor={[-0.7, 1, -0.3]}
                               scale={2}
                               userData={[node.wrist]}>
                            <Mesh node={nodes[node.wrist]} data={data.nodes[node.wrist]}/>
                            <Mesh node={nodes[node.wristExtension]} data={data.nodes[node.wristExtension]}/>
                            <Mesh node={nodes[node.hand]} data={data.nodes[node.hand]}/>

                            {/** The gripper with open/closing limits */}
                            <Gizmo activeAxes={[true, false, false]}
                                   translationLimits={[[-0.5, 0.2], undefined, undefined]}
                                   anchor={[0, 0, 0]}
                                   scale={0.75}
                                   userData={[node.gripper]}>
                                <Mesh node={nodes[node.gripper]} data={data.nodes[node.gripper]}/>

                            </Gizmo>
                        </Gizmo>
                    </Gizmo>
                </Gizmo>
            </Gizmo>

        </group>
    )
}

// preload for performance
useGLTF.preload('/crane.glb')

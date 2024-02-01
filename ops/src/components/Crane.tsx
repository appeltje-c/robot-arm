// @ts-nocheck
import {PivotControls} from '@components/pivotControls'
import {useGLTF} from '@react-three/drei'
import React from 'react'

export function Crane() {

    // load the crane model
    const {nodes} = useGLTF('/crane.glb')

    return (
        <group>

            {/* Rotation control for the main column */}
            <PivotControls
                disableAxes
                // we constrain the rotation of the main column over x and z
                activeAxes={[true, false, true]}
                disableSliders
                anchor={[-0.7, -1, -0]}
                scale={5}
                lineWidth={5}
                depthTest={false}
                userData={['main_column']}>

                {/* main column mesh */}
                <mesh geometry={nodes['main_column'].geometry}
                      position={[0, 1.462, 0]}>
                    <meshStandardMaterial color="white"/>
                </mesh>

                <PivotControls activeAxes={[false, true, false]}
                               translationLimits={[undefined, [-1, 1.8], undefined]}
                               disableSliders
                               disableRotations
                               disableScaling
                               depthTest={false}
                               anchor={[-0.8, 0.5, 0]}
                               fixed
                               scale={75}
                               userData={['upper_arm']}>

                    <mesh geometry={nodes.upper_arm.geometry}
                          material={nodes.upper_arm.material}
                          position={[2.335, 0, 0.094]}
                          scale={[0.684, 1, 1]}/>

                    <PivotControls
                        // we constrain the rotation of the elbow over x and z
                        activeAxes={[true, false, true]}
                        // limit the rotation reach so we don't bump into ourselves
                        rotationLimits={[undefined, [-2, 2], undefined]}
                        disableAxes
                        disableSliders
                        anchor={[-0.88, 1, -0.4]}
                        fixed
                        scale={80}
                        depthTest={false}
                        lineWidth={2}>

                        <mesh geometry={nodes.elbow.geometry}
                              material={nodes.elbow.material}
                              position={[2.6, 5.933, 0.074]}
                              scale={[0.345, 0.122, 0.345]}/>

                        <mesh geometry={nodes.lower_arm.geometry}
                              material={nodes.lower_arm.material}
                              position={[4.39, -0.984, 0.094]}
                              scale={[0.684, 1, 1]}/>

                        <PivotControls
                            // we constrain the rotation of the elbow over x and z
                            activeAxes={[true, false, true]}
                            rotationLimits={[undefined, [-2, 2], undefined]}
                            disableAxes
                            disableSliders
                            anchor={[-0.75, 1, -0.4]}
                            fixed
                            scale={75}
                            depthTest={true}
                            lineWidth={2}>

                            <mesh geometry={nodes.wrist.geometry}
                                  material={nodes.wrist.material}
                                  position={[4.701, 4.949, 0.101]}
                                  scale={[0.345, 0.122, 0.345]}/>

                            <mesh geometry={nodes.wrist_extension.geometry}
                                  material={nodes.wrist_extension.material}
                                  position={[4.691, 4.611, 0.007]}
                                  scale={0.264}/>

                            <mesh geometry={nodes.hand.geometry}
                                  material={nodes.hand.material}
                                  position={[5.368, 3.78, 0.049]}
                                  scale={[1, 0.068, 0.327]}/>

                            <PivotControls activeAxes={[true, false, false]}
                                           disableScaling
                                           translationLimits={[[-0.5, 0.2], undefined, undefined]}
                                           depthTest={false}
                                           anchor={[0, 0, 0]}
                                           scale={0.75}>

                                <mesh geometry={nodes.gripper.geometry}
                                      material={nodes.gripper.material}
                                      position={[5.805, 3.585, 0.006]}
                                      rotation={[0, 0, 0]}
                                      scale={[-0.01, -0.132, -0.325]}/>

                            </PivotControls>
                        </PivotControls>
                    </PivotControls>
                </PivotControls>
            </PivotControls>

        </group>
    )
}

useGLTF.preload('/crane.glb')

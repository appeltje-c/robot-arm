import React, {memo} from 'react'
import {Canvas} from '@react-three/fiber'
import {
    GizmoHelper,
    GizmoViewport,
    OrbitControls,
    Environment,
    Stats,
    AccumulativeShadows,
    RandomizedLight,
    PerspectiveCamera
} from '@react-three/drei'
import {Crane} from "@components/Crane";
import Ground from "@components/Ground";

export default function App() {

    return (
        <Canvas>
            <PerspectiveCamera
                makeDefault={true}
                fov={40}
                position={[0, 8, 25]}/>

            { /** The Crane Model */}
            <Crane/>

            <Shadows/>

            <Ground/>

            <OrbitControls makeDefault/>

            <Environment preset="city"/>

            <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
                <GizmoViewport labelColor="white" axisHeadScale={1}/>
            </GizmoHelper>

            { /** Adding the Stats widget */}
            <Stats/>

            {/** Print renderer info
             <RendererInfo/>
             */}

        </Canvas>
    )
}

const Shadows = memo(() => (
    <AccumulativeShadows temporal frames={100} color="#9d4b4b" colorBlend={0.5} alphaTest={0.9} scale={20}>
        <RandomizedLight amount={8} radius={4} position={[5, 5, -10]}/>
    </AccumulativeShadows>
))

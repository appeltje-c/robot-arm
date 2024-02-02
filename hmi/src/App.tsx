/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import React, {useState, useEffect} from 'react'
import {Canvas} from '@react-three/fiber'
import {GizmoHelper, GizmoViewport, OrbitControls, Environment, Stats, PerspectiveCamera} from '@react-three/drei'
import {Crane} from '@components/model'
import {Shadows, Ground} from '@components/stage'
import {Monumental} from '@types'
import socketIOClient from 'socket.io-client'

/**
 * The App component defines the hmi visible and control elements
 *
 * author Martijn Benjamin
 */
export default function App() {

    // keep the data for the crane in state
    const [robotData, setRobotData] = useState<Monumental.CraneData>()
    const socket = socketIOClient('/')

    useEffect(() => {

        // no robot data then get it
        if (!robotData) socket.emit("state:get")

        // set received state changes in state
        socket.on("state", (data: Monumental.CraneData) => {
            setRobotData(data)
        })

    }, [socket])

    return (
        <>
            {
                robotData &&
              <Canvas>

                  {/** a camera */}
                <PerspectiveCamera
                  makeDefault
                  fov={40}
                  position={[10, 8, 25]}/>

                  {/** our model */}
                <Crane data={robotData}/>

                  {/** environment elements*/}
                <Shadows/>
                <Ground/>
                <Environment preset="city"/>

                  {/** controls & helper */}
                <OrbitControls makeDefault/>
                <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
                  <GizmoViewport labelColor="white" axisHeadScale={1}/>
                </GizmoHelper>

                  {/** fps & mem stats (add toggle to show / hide) */}
                <Stats/>

              </Canvas>
            }
        </>
    )
}


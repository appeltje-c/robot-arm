/*
 * Copyright (C) 2024
 * Martijn Benjamin (https://github.com/appeltje-c)
 *
 * -----
 * "Robotic Arm Study"
 * -----
 */
import React, {useState, useEffect} from 'react'
import {Canvas} from '@react-three/fiber'
import {GizmoHelper, GizmoViewport, OrbitControls, Environment, Stats, PerspectiveCamera} from '@react-three/drei'
import {Shadows, Ground} from '@components/stage'
import socketIOClient from 'socket.io-client'
import {Robot} from '@types'
import {RobotArm} from "@components/model/RobotArm"

/**
 * The App component defines the hmi visible and control elements
 */
export default function App() {

    // keep the data for the robot in state
    const [robotData, setRobotData] = useState<Robot.RobotNodes>()
    const socket = socketIOClient('/')

    useEffect(() => {

        // no robot data then get it
        if (!robotData) socket.emit("state:get")

        // set received state changes in state
        socket.on("state", (data: Robot.RobotNodes) => {
            setRobotData(data)
        })

    }, [socket])

    console.info(robotData)

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
                <RobotArm data={robotData}/>

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


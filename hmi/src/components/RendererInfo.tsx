/*
 * Copyright (C) 2024 - Martijn Benjamin
 *
 * -----
 * Written for the Monumental technical assessment
 * "Visualizing a Robotic Crane"
 * -----
 */
import {useThree} from '@react-three/fiber'
import {useEffect} from 'react'

/**
 * According to these docs https://docs.pmnd.rs/react-three-fiber/API/hooks#usethree
 * useThree gl is the WebGL renderer which holds some useful information
 *
 */
const WebGLRendererInfo = () => {

    const {gl} = useThree()

    useEffect(() => {

        // @todo make a nice render view of the contents
        console.log(gl.info)

    }, [gl])

    return null
}

export default WebGLRendererInfo

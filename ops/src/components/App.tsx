import React, {useRef, useState} from 'react'
import theme from '@styles'
import {Canvas, useFrame} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import {Grid, ThemeProvider, CssBaseline} from "@mui/material";

function BoxMesh(props: any) {

    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()

    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame
    // @ts-ignore
    useFrame((state, delta) => (ref.current.rotation.x += delta))

    // Return the view, these are regular Three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => (event.stopPropagation(), hover(true))}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
        </mesh>
    )
}

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Grid>
                    <Grid item style={{height: '100vh', backgroundColor: '#efefef'}}>
                        <Canvas>
                            <ambientLight intensity={Math.PI / 2}/>
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
                            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
                            <BoxMesh position={[-1.2, 0, 0]}/>
                            <BoxMesh position={[1.2, 0, 0]}/>
                            <OrbitControls/>
                        </Canvas>
                    </Grid>
                </Grid>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App

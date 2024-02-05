# Robotic Crane Visualisation

> written
> by [Martijn Benjamin](https://www.linkedin.com/in/martijn-benjamin/) ([Appeltje-C](https://github.com/appeltje-c))
> for [Monumental](https://www.monumental.co/)

## Intro

This project is my implementation of the Monumental "Visualizing a Robotic Crane" technical assessment and my 3D and
Robotics study project going forward.

The project consists of an API, React Application and the Blender crane model in the folders:

* api - A NodeJS project displaying backend technology using MongoDB and Websocket connectivity
* model - The Mesh and armature of the Crane modelled in Blender
* hmi - A React Application visualizing the Crane displaying frontend technology using React Three Fiber and the API
  over Websockets for the telemetry data.

## Running the project

The project has been configured to run with Docker. It is possible to run without Docker but requires extra steps to
install MongoDB, seed the data and configure the network. For the sake of brevity this has been left out of the scope of
the implementation. Drop me a message if you want to run it without Docker.

Running the project takes a few steps:

* Make sure Docker is installed running: [https://www.docker.com/get-started/](https://www.docker.com/get-started/)
* Clone the repo and run docker

```shell
git clone https://github.com/appeltje-c/monumental
cd monumental
docker compose up -d
```

When the Docker output reads

<img src="docker.png" alt="drawing" width="500"/>

the project is running, you can open [http://localhost:3000](http://localhost:3000)

To stop the containers

```shell
docker compose down
```

## What's in the box

There are three main projects

[Monumental Hmi](hmi/README.md) : The React App

[Monumental API](./api/README.md) : The API

[Monumental Model](./model/README.md) : The Crane Model

Enjoy!

## Resources

Here is a collection of online resources I used to get familiar with Robotic and 3D concepts.

*Rabbit hole warning*

> Three / Three Fiber / Drei <br/>
> https://github.com/pmndrs/react-three-fiber <br/>
> https://github.com/pmndrs/zustand <br/>
> https://github.com/pmndrs/drei <br/>
> https://github.com/pmndrs/gltfjsx <br/>
>
> ViewPort<br/>
> https://codesandbox.io/p/sandbox/multiple-views-with-uniform-controls-r9w2ob

> Grid <br/>
> https://codesandbox.io/p/sandbox/grid-component-19uq2u

> Camera <br/>
> https://codesandbox.io/p/sandbox/cameracontrols-basic-sew669

> Mesh Control <br/>
> https://codesandbox.io/p/sandbox/object-gizmo-controls-forked-yxfdlj

> Inverse Kinematics <br/>
> https://medium.com/unity3danimation/overview-of-inverse-kinematics-9769a43ba956 <br/>
> https://medium.com/unity3danimation/create-your-own-ik-in-unity3d-989debd86770 <br/>
> https://tmf-code.github.io/inverse-kinematics/#/three-js <br/>
> https://threejs.org/docs/#examples/en/animations/CCDIKSolver <br/>
> https://www.khanacademy.org/computer-programming/inverse-kinematics-robot-arm/5648684600524800 <br/>
> https://github.com/jsantell/THREE.IK <br/>
> https://github.com/lo-th/fullik <br/>
> https://github.com/wylieconlon/kinematics <br/>
> https://threejs.org/examples/#webgl_loader_collada_kinematics <br/>
> https://github.com/pinglu85/IKSolver-for-threejs/tree/main <br/>
> https://github.com/notrueblood/FABRIK-for-threejs-and-beyond.git <br/>

> Matrix4 <br/>
> https://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/ <br/>
> https://threejs.org/docs/#api/en/math/Matrix4 <br/>

> Robot Projects & Inspiration <br/>
> https://hackaday.io/project/12989-thor <br/>
> https://hackaday.io/project/9851-controlling-a-robot-arm-with-blender <br/>
> https://www.sciencedirect.com/science/article/pii/S187705091831072X <br/>
> https://github.com/glumb/robot-gui <br/>
> https://github.com/glumb/kinematics <br/>
> https://github.com/gkjohnson/closed-chain-ik-js.git <br/>
> https://github.com/jsdf/BussIK-js <br/>
>
> Performance <br/>
> https://threejs-journey.com/lessons/performance-tips
>
>

# Learn

> Docs <br/>
> https://docs.pmnd.rs/ <br/>
> https://docs.pmnd.rs/react-three-fiber/getting-started/introduction> <br/>
> https://threejs.org/docs/index.html <br/>
> https://github.com/pmndrs/drei#readme <br/>
>

> Tutorials & Learn by Doing <br/>
> https://sbcode.net/react-three-fiber <br/>
> https://threejs.org/examples/#webgl_animation_keyframes <br/>
>
>
> 


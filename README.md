# Monumental - Robotic Crane Ops

## Run with Docker

- have docker installed

```shell
docker compose up -d
- ```

docker ps

open localhost:3000

```shell
docker compose down
```

## Run without Docker

- yarn install in frontend
- yarn install backend
- load mongo data
- yarn run both

### What's in the box

### ops

describe

### api

describe

The compose file defines an application with three services `ops`, `api` and `storage`.

When deploying the application, docker compose maps port 3000 of the frontend service container to port 3000 of the host
as specified in the file.
Make sure port 3000 on the host is not already being in use.

Todo:

1. API in typescript
2. Websockets
3. Setup viewport with websockets and simple model
4. 

Seed Mongo Data
https://stackoverflow.com/questions/39348478/initialize-data-on-dockerized-mongo

All Typescript

Robot Mock
----------
Typescript
Websockets
Mongoose
MongoDB

Robot Ops
---------

ViewPort
https://codesandbox.io/p/sandbox/multiple-views-with-uniform-controls-r9w2ob

Grid
https://codesandbox.io/p/sandbox/grid-component-19uq2u

Camera
https://codesandbox.io/p/sandbox/cameracontrols-basic-sew669

Mesh Control
https://codesandbox.io/p/sandbox/object-gizmo-controls-forked-yxfdlj?file=%2Fsrc%2FApp.js%3A18%2C1




Inverse Kinematics
https://threejs.org/docs/#examples/en/animations/CCDIKSolver

https://www.khanacademy.org/computer-programming/inverse-kinematics-robot-arm/5648684600524800

https://github.com/jsantell/THREE.IK
https://github.com/lo-th/fullik
https://github.com/wylieconlon/kinematics

https://threejs.org/examples/#webgl_loader_collada_kinematics

http://openrave.org/

========================================================
ASSIGNMENT
========================================================

1. Set up both a backend and frontend that communicate over a WebSocket.

   Used: React, Typescript, Websocket, three.js, three fiber / drei

2. The backend should implement a mock robotic crane, storing its current state. The robotic crane is represented
   by the current actuator positions for each joint:
    - swing rotation in degrees
    - lift elevation in mm
    - elbow rotation in degrees
    - wrist rotation in degrees
    - gripper open/close state in mm

   Used: NodeJS, Typescript, Websockets, mongoose, mongoDB

3. Stream the current state from the backend to the client at a fixed interval over a WebSocket connection.
   Experiment with the frequency to determine what works best for your project.

   Used: Websockets, JSON

4. On the client side, the user interface comprises two parts:
   some UI chrome containing control elements and a canvas displaying a 3D representation of the crane.

   Used: Three Fiber / Blender Model

5. Use WebGL (or a wrapper, such as Three.js) to establish a basic scene that renders a simplified representation
   of the robotic crane. The crane's state should reflect the current pose received from the WebSocket connection.
   Depending on the time available for the project, you can make this 3D representation as simple or visually
   appealing as you prefer.

   Used: Blender Model / Three Fiber / JSON / Websockets

6. The control interface contains some user inputs, one for each actuator. Users should be able to modify one or
   more state values and submit the changes as a control command to the backend via the WebSocket.
   The backend will implement these changes as a motion in the mock robotic state, considering predefined maximum
   speeds and acceleration per actuator. The end result will be a small animation in the frontend.

7. Additionally, the interface provides a means to input a coordinate in 3D space. Upon submitting this
   coordinate to the backend, the application should perform an inverse kinematics calculation to derive a
   desired robotic pose for the crane, applying this to the mock state accordingly.








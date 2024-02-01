
# Monumental Robot Ops

Todo:

- move origin to center of mesh in blender

- add gizmo for moving vertical
- add gizmo for rotation on wrist
- add inverse kinematics based on gripper relocation

- Data comms & storage
- Translation limits & rotation limits
- Gizmo placing




Learn more
https://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/
https://threejs.org/docs/#api/en/math/Matrix4



https://github.com/pmndrs/gltfjsx

CCDIKResolver
https://threejs.org/docs/#examples/en/animations/CCDIKSolver


https://github.com/pmndrs/react-three-fiber

https://github.com/pmndrs/drei

https://github.com/pmndrs/react-spring

https://github.com/pmndrs/zustand

Performance

https://threejs-journey.com/lessons/performance-tips

- do not forget to preload
  useGLTF.preload('/crane.glb')

- mind your materials

- check fps .run without limit on chrome, if it stays close to 60, like 70 or 80, you need to optimize, should run 5/6/700 or higher
  open -a "Google Chrome" --args --disable-gpu-vsync --disable-frame-rate-limit

- Use spector js, check how many draw calls are being made

- Inspect the renderer information




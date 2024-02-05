# Monumental Model

## Process

### Create Model in Blender

When modeling, mind the origins of the meshes.

- Create 1 mesh for those elements that need a gizmo for translating / rotating
- 

of what you want to : move object when replacing origin, only scale and move in edit mode to preserve origin and prevent needing scaling data

### Export to glb/glTF

Blender has an option to export your mesh to glb/glTF

### Convert to JSX

Use [GLB to JSX Converter](https://github.com/pmndrs/gltfjsx) to convert the glb/glTF file from blender 
to a ready to use jsx file.

```shell
  npx gltfjsx Model.glb
```

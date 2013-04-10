cube-mesh
=========
Generates a subdivided cube mesh

Install
=======

    npm install cube-mesh
    
Example
=======

```javascript
require("cube-mesh")(10, [2, 2, 2])
```

`require("cube-mesh")([resolution, scale])`
-------------------------------------------
Returns a subdivided cube mesh

* `resolution` is the number of subdivisions per side (either a scalar or an array)
* `scale` is the size of the side-lengths of the cube (either a scalar or an array)

Credits
=======
(c) 2013 Mikola Lysenko. MIT License
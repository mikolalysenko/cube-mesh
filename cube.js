"use strict"

var fuseVertices = require("fuse-vertices")
  , disjointUnion = require("simplicial-disjoint-union")
  , gridMesh = require("grid-mesh")
  , dup = require("dup")

function defaultArr(v) {
  if(typeof v === "number") {
    return dup(3, v)
  }
  if(v && v.length === 3) {
    return v
  }
  return dup(3, 1)
}

//Creates a cubical mesh
function cubeMesh(resolution, scale) {

  //Unpack default arguments
  resolution = defaultArr(resolution)
  scale = defaultArr(scale)
  
  var positions = []
    , cells = []
    , o  = [0,0,0]
    , dx = [0,0,0]
    , dy = [0,0,0]
    , i, j, k, side
    , u, v
  
  for(i=0; i<3; ++i) {
    resolution[i] = resolution[i]|0
    if(resolution[i] <= 0) {
      return { cells: [], positions: [] }
    }
  }
  
  for(i=0; i<3; ++i) {
    for(j=0; j<3; ++j) {
      o[j] = dx[j] = dy[j] = 0
    }
    
    u = (i+1)%3
    v = (i+2)%3
    
    o[i] = -scale[i] / 2.0
    o[u] = -scale[u] / 2.0
    o[v] = -scale[v] / 2.0
    dx[u] = scale[u] / resolution[u]
    dy[v] = scale[v] / resolution[v]
  
    for(j=0; j<2; ++j) {
      side = gridMesh(resolution[u], resolution[v], o, dx, dy)
      cells = disjointUnion(cells, side.cells, positions.length)
      positions = positions.concat(side.positions)
      
      for(k=0; k<3; ++k) {
        o[k] = -o[k]
        dx[k] = -dx[k]
        dy[k] = -dy[k]
      }
    }
  }

  //Glue 6 sides together
  var mag = 1e20
  for(i=0; i<3; ++i) {
    mag = Math.min(mag, Math.abs(scale[i]) / resolution[i])
  }
  mag = 1e-3 * mag
  console.log(positions, cells, mag)
  var fused = fuseVertices(cells, positions, mag)
  console.log(fused)
  return {
    positions: fused.positions,
    cells: fused.cells
  }
}

module.exports = cubeMesh
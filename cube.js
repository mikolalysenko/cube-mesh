"use strict"

var fuseVertices = require("fuse-vertices")

//Creates a cubical mesh
// resolution is an integer representing number of subdivisions per linear dimension
// scale is a 3d vector representing the scale of the cube
function cubeMesh(resolution, scale) {
  scale = typeof(scale) === "number" ? [scale, scale, scale] : (scale || [1.0, 1.0, 1.0]);
  var radius = resolution >> 1;
  var side_len = 2*radius + 1;
  function p(x,y,s) { 
    return x + side_len * (y + side_len * s); 
  }
  
  var positions = new Array(6 * side_len * side_len);
  var faces = [];  
  
  for(var d=0; d<3; ++d) {
    var u = (d+1)%3;
    var v = (d+2)%3;
    
    for(var s=0; s<2; ++s) {
      var f = 2*d + s;
      var x = new Array(3);
      
      x[u] = -radius;
      x[v] = -radius;
      x[d] = (1 - 2*s) * radius;
    
      for(var j=0; j<side_len; ++j, ++x[v]) {
        x[u] = -radius;
        for(var i=0; i<side_len; ++i, ++x[u]) {
          var pos = new Array(3);
          for(var k=0; k<3; ++k) {
            pos[k] = x[k] * scale[k] / radius;
          }
        
          positions[p(i, j, f)] = pos;
          
          if(i < side_len-1 && j < side_len-1) {
            if(s) {
              faces.push([ p(i,j,f), p(i,j+1,f), p(i+1,j,f) ]);
              faces.push([ p(i+1,j,f), p(i,j+1,f), p(i+1,j+1,f) ]);          
            } else {
              faces.push([ p(i,j,f), p(i+1,j,f), p(i,j+1,f) ]);
              faces.push([ p(i,j+1,f), p(i+1,j,f), p(i+1,j+1,f) ]);
            }
          }
        }
      }
    }
  }

  //Glue 6 faces together and return
  var tol = 0.5 * Math.min(scale[0], Math.min(scale[1], scale[2])) / radius;
  return fuseVertices(positions, faces, tol);
};

module.exports = cubeMesh
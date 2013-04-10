var cubeMesh = require("../cube.js")

require("tap").test("cube", function(t) {
  
  var cube = cubeMesh(1, 1.0)
  
  t.equals(cube.positions.length, 8)
  t.equals(cube.cells.length, 12)
  
  t.end()
})
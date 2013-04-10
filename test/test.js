var cubeMesh = require("../cube.js")
  , euler = require("euler-characteristic")

require("tap").test("cube", function(t) {
  
  var empty_cube = cubeMesh(0)
  t.equals(empty_cube.positions.length, 0)
  t.equals(empty_cube.cells.length, 0)
  
  for(var i=1; i<10; ++i) {
    var cube = cubeMesh(i, 1.0)
    
    t.equals(cube.positions.length, 8 + 12 * (i-1) + 6*(i-1)*(i-1))
    t.equals(cube.cells.length, 2 * 6 * i * i)
    t.equals(euler(cube.cells), 2)
  }
  
  t.end()
})
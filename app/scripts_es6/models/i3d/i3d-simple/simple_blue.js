// simple_blue.js

var simple_blue = {
          actors: {          // directive attributes
            camerasphere: {  // name camerasphere 'csphere'!
              csphere: {form: {r:50.0,visible:true,wireframe:true,transparent:true, 
                          opacity:1.0, color:"blue" },
                        transform:{t:[0.0,0.0,0.0]},
                        children:{}}
            },

            axes: {
              axesorigin: {form: {length:3000.0}},
              axes1: {form: {length:3000.0},
                      transform: {t: [10.0,20.0,0.0],
                                  e: [0.0,0.3,0.0]}
              }
            },
            dlights: {
              dlight0: {form: {color:"blue", directionx:1, directiony:1, 
                               directionz:1},
                        transform: {t: [10.0,40.0,0.0]}
              },
              dlight1: {form: {color:"red", directionx:-1, directiony:-1, 
                directionz:-1}},
              dlight2: {form: {color:"#00ff00", directionx:1, directiony:-1, 
                directionz:-1}}
            },
            cubes: {
              cube0: {form: {type: "'cube.i3d'",
                             textureurl:"./images/glad.png",
                             w:20.0, h:20.0, d:20.0},
                      transform: {t: [0.0,25.0,0.0],
                                  e: [0.0,0.785,0.0],
                                  //q: [0.0,0.3825,0.0,0.9239557],
                                  s: [1.0,2.0,1.0]},
                      children: {}
              }//cube0
            }
          }//actors
};//simple_blue


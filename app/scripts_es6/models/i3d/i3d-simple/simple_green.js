// simple_green.js

var simple_green = {
          actors: {          // directive attributes
            camerasphere: { // name camerasphere 'csphere'!
              csphere: {form: {r:50.0,visible:true,wireframe:true,transparent:true, 
                          opacity:1.0, color:"green" },
                        transform:{t:[0.0,0.0,0.0]},
                        children:{}}
            },

            axes: {
              axes0: {form: {length:3000.0}}
            },
            cubes: {
              cube0: {form: {type: "'cube.i3d'",
                             textureurl:"./images/sky.jpg",
                             w:10.0, h:10.0, d:10.0},
                      transform: { t: [0.0,25.0,0.0],
                                   e: [0.0,0.785,0.0],
                                   s: [0.5,1.0,0.5]},
                      children:{}//children
              }//cube0
            }//cubes
          }//actors
};//simple-green


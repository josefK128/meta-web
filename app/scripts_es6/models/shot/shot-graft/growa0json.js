// growa0json.js
// sequence: grow-anim done once per node (repeat:0)

var growa0json = JSON.stringify({
  delta: {
    timeline: {p: {repeat:0},
               actors:{
                 'i3d:cube0:scale': [{dur:10, p:{x:0.5, y:0.5, z:0.5}}]
              },
    },
    branches: {
      cube0: {children:{
                cube0_2: {form: {type: "'cube.i3d'",
                                   x:0.0, y:0.0, z:0.0, 
                                   textureurl:"./images/sky.jpg",
                                   w:5.0, h:10.0, d:10.0,
                                   color:"blue", transparent:true, opacity:1.0},
                            transform: {t: [-20,-10,0],s:[0.01,0.01,0.01]},
                            children: {}
                },
                cube0_3: {form: {type: "'cube.i3d'",
                                   x:0.0, y:-20.0, z:0.0, 
                                   textureurl:"sky_jpg",
                                   w:5.0, h:10.0, d:10.0,
                                   color:"blue", transparent:true, opacity:1.0},
                            transform: {t: [20,0,0], s:[0.01,0.01,0.01]},
                            children: {}
                }
              }//children
             }//cube0
    }//branches
  }//delta
});//growa0json


